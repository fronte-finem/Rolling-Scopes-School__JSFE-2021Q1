import React from 'react';

import {
  BtnBottomContainer,
  BtnCancel,
  BtnUpdate,
  Form,
  InputsContainer,
  Wrapper,
} from 'components/admin-card/card-style';
import { InputFile } from 'components/admin-card/input-file';
import { InputText } from 'components/admin-card/input-text';
import { WordProps } from 'services/data/service';
import { WordDocument } from 'services/rest-api/config';
import { useMountedState } from 'utils/is-mounted-hook';

enum ControlName {
  INPUT_LABEL_WORD = 'word',
  INPUT_LABEL_TRANSLATION = 'translation',
  INPUT_LABEL_IMAGE = 'image',
  INPUT_LABEL_AUDIO = 'audio',
  BTN_CREATE = 'Create',
  BTN_UPDATE = 'Update',
  BTN_CANCEL = 'Cancel',
}

enum MediaType {
  IMAGE = 'audio/*',
  AUDIO = 'image/*',
}

interface Props {
  initialWord?: WordDocument;
  onSubmit: (props: WordProps) => Promise<void>;
  onCancel: () => void;
  isFilesRequired?: boolean;
}

export const WordCardEditor: React.FC<Props> = ({
  initialWord,
  onSubmit,
  onCancel,
  isFilesRequired = false,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [reset, setReset] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const isMounted = useMountedState(() => setLoading(false));
  const [wordProps, setWordProps] = React.useState<WordProps>({
    word: initialWord?.word || '',
    translation: initialWord?.translation || '',
    image: undefined,
    audio: undefined,
  });

  const handleCancel = () => {
    setReset(true);
    onCancel();
  };

  function handleInput<K extends keyof WordProps>(key: K) {
    return (value: WordProps[K]) => {
      setReset(false);
      setWordProps({ ...wordProps, [key]: value });
    };
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    if (!formRef.current || !formRef.current.reportValidity()) {
      event.preventDefault();
      return;
    }
    setLoading(true);
    await onSubmit({ ...wordProps });
    isMounted && setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <Wrapper isLoading={loading}>
        <InputsContainer>
          <InputText
            label={ControlName.INPUT_LABEL_WORD}
            onInput={handleInput('word')}
            reset={reset}
            initialValue={wordProps.word}
          />
          <InputText
            label={ControlName.INPUT_LABEL_TRANSLATION}
            onInput={handleInput('translation')}
            reset={reset}
            initialValue={wordProps.translation}
          />
          <InputFile
            label={ControlName.INPUT_LABEL_AUDIO}
            accept={MediaType.AUDIO}
            onInput={handleInput('audio')}
            reset={reset}
            required={isFilesRequired}
          />
          <InputFile
            label={ControlName.INPUT_LABEL_IMAGE}
            accept={MediaType.IMAGE}
            onInput={handleInput('image')}
            reset={reset}
            required={isFilesRequired}
          />
        </InputsContainer>

        <BtnBottomContainer>
          <BtnCancel type="button" onClick={handleCancel}>
            {ControlName.BTN_CANCEL}
          </BtnCancel>
          <BtnUpdate type="submit">
            {initialWord ? ControlName.BTN_UPDATE : ControlName.BTN_CREATE}
          </BtnUpdate>
        </BtnBottomContainer>
      </Wrapper>
    </Form>
  );
};
