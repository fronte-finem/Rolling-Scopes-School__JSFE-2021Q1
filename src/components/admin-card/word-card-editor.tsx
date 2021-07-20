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
            label="word"
            onInput={handleInput('word')}
            reset={reset}
            initialValue={wordProps.word}
          />
          <InputText
            label="translation"
            onInput={handleInput('translation')}
            reset={reset}
            initialValue={wordProps.translation}
          />
          <InputFile
            label="audio"
            accept="audio/*"
            onInput={handleInput('audio')}
            reset={reset}
            required={isFilesRequired}
          />
          <InputFile
            label="image"
            accept="image/*"
            onInput={handleInput('image')}
            reset={reset}
            required={isFilesRequired}
          />
        </InputsContainer>

        <BtnBottomContainer>
          <BtnCancel type="button" onClick={handleCancel}>
            Cancel
          </BtnCancel>
          <BtnUpdate type="submit">{initialWord ? 'Update' : 'Create'}</BtnUpdate>
        </BtnBottomContainer>
      </Wrapper>
    </Form>
  );
};
