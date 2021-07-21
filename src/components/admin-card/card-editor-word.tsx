import React from 'react';

import { CardEditor } from 'components/admin-card/card-editor';
import { InputsContainer } from 'components/admin-card/card-style';
import { InputFile } from 'components/admin-card/input-file';
import { InputText } from 'components/admin-card/input-text';
import { WordProps } from 'services/data/service';
import { WordDocument } from 'services/rest-api/config';

enum ControlName {
  INPUT_LABEL_WORD = 'word',
  INPUT_LABEL_TRANSLATION = 'translation',
  INPUT_LABEL_IMAGE = 'image',
  INPUT_LABEL_AUDIO = 'audio',
}

enum MediaType {
  IMAGE = 'image/*',
  AUDIO = 'audio/*',
}

interface Props {
  initialWord?: WordDocument;
  isCreator?: boolean;
  onCancel: () => void;
  onSubmit: (props: WordProps) => Promise<void>;
}

export const CardEditorWord: React.FC<Props> = ({ initialWord, isCreator, onCancel, onSubmit }) => {
  const [reset, setReset] = React.useState(false);
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

  const handleSubmit = () => onSubmit({ ...wordProps });

  return (
    <CardEditor
      isCreator={isCreator}
      canUpdate={
        !!wordProps.word &&
        !!wordProps.translation &&
        (wordProps.word !== initialWord?.word ||
          wordProps.translation !== initialWord?.translation ||
          !!wordProps.image ||
          !!wordProps.audio)
      }
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    >
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
          required={false}
        />
        <InputFile
          label={ControlName.INPUT_LABEL_IMAGE}
          accept={MediaType.IMAGE}
          onInput={handleInput('image')}
          reset={reset}
          required={false}
        />
      </InputsContainer>
    </CardEditor>
  );
};
