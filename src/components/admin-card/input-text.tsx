import React, { useEffect } from 'react';

import { Input, InputGroup, Label } from 'components/admin-card/card-style';

interface InputTextProps {
  label: string;
  onInput: (value: string) => void;
  reset: boolean;
  initialValue?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  reset,
  onInput,
  initialValue = '',
}) => {
  const [value, setValue] = React.useState(initialValue);
  const ref = React.useRef<HTMLInputElement>(null);

  const handleInput: React.FormEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.value);
    onInput(event.currentTarget.value);
    ref.current?.reportValidity();
  };

  useEffect(() => {
    if (reset) setValue(initialValue);
  }, [reset]);

  return (
    <InputGroup>
      <Label>
        {label}:
        <Input type="text" value={value} onInput={handleInput} required ref={ref} />
      </Label>
    </InputGroup>
  );
};
