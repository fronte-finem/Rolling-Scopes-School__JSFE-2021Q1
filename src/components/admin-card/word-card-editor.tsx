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
import { WordDocument } from 'services/rest-api/word-api';

interface WordTexts {
  word: string;
  translation: string;
}

interface WordFiles {
  image: File | null;
  audio: File | null;
}

export type WordProps = WordTexts & WordFiles;

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

  const [texts, setTexts] = React.useState<WordTexts>({
    word: initialWord?.word || '',
    translation: initialWord?.translation || '',
  });
  const [files, setFiles] = React.useState<WordFiles>({
    image: null,
    audio: null,
  });

  const handleCancel = () => {
    setReset(true);
    onCancel();
  };

  const handleTextInput = (key: keyof WordTexts) => (value: string) => {
    setReset(false);
    setTexts({ ...texts, [key]: value });
  };

  const handleFileInput = (key: keyof WordFiles) => (value: File) => {
    setReset(false);
    setFiles({ ...files, [key]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    if (!formRef.current || !formRef.current.reportValidity()) {
      event.preventDefault();
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ ...texts, ...files });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <Wrapper isLoading={loading}>
        <InputsContainer>
          <InputText
            label="word"
            onInput={handleTextInput('word')}
            reset={reset}
            initialValue={texts.word}
          />
          <InputText
            label="translation"
            onInput={handleTextInput('translation')}
            reset={reset}
            initialValue={texts.translation}
          />
          <InputFile
            label="audio"
            accept="audio/*"
            onInput={handleFileInput('audio')}
            reset={reset}
            required={isFilesRequired}
          />
          <InputFile
            label="image"
            accept="image/*"
            onInput={handleFileInput('image')}
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
