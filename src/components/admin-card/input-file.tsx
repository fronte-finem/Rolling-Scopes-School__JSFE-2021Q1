import React, { useEffect } from 'react';

import { Input, InputGroup, Label } from 'components/admin-card/card-style';

interface InputFileProps {
  label: string;
  accept: string;
  onInput: (file: File) => void;
  reset: boolean;
  required?: boolean;
}

export const InputFile: React.FC<InputFileProps> = ({
  label,
  accept,
  onInput,
  reset,
  required = true,
}) => {
  const [file, setFile] = React.useState<File | null>(null);
  const ref = React.useRef<HTMLInputElement>(null);

  const handleInput: React.FormEventHandler<HTMLInputElement> = () => {
    const files = ref.current?.files;
    if (!files) return;
    setFile(files[0]);
    onInput(files[0]);
  };

  useEffect(() => {
    if (!reset) return;
    setFile(null);
    if (ref.current) ref.current.value = '';
  }, [reset]);

  return (
    <InputGroup>
      <Label>
        {label}: {file?.name}
        <Input type="file" accept={accept} onInput={handleInput} required={required} ref={ref} />
      </Label>
    </InputGroup>
  );
};
