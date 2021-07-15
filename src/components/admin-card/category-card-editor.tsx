import React from 'react';

import {
  BtnBottomContainer,
  BtnCancel,
  BtnUpdate,
  Form,
  InputsContainer,
  Wrapper,
} from 'components/admin-card/card-style';
import { InputText } from 'components/admin-card/input-text';

interface Props {
  initialName: string;
  onCancel: () => void;
  onSubmit: (name: string) => Promise<void>;
}

export const CategoryCardEditor: React.FC<Props> = ({ initialName, onCancel, onSubmit }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isLoading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(initialName);

  const handleInput = (value: string) => setName(value);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    if (name === initialName || !formRef.current || !formRef.current.reportValidity()) {
      event.preventDefault();
      return;
    }
    setLoading(true);
    try {
      await onSubmit(name);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <Wrapper isLoading={isLoading}>
        <InputsContainer>
          <InputText label="Category Name" onInput={handleInput} reset={false} />
        </InputsContainer>
        <BtnBottomContainer>
          <BtnCancel type="button" onClick={onCancel}>
            Cancel
          </BtnCancel>
          <BtnUpdate type="submit">{initialName ? 'Update' : 'Create'}</BtnUpdate>
        </BtnBottomContainer>
      </Wrapper>
    </Form>
  );
};
