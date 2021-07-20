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
import { useMountedState } from 'utils/is-mounted-hook';

interface Props {
  initialName: string;
  onCancel: () => void;
  onSubmit: (name: string) => Promise<void>;
}

export const CategoryCardEditor: React.FC<Props> = ({ initialName, onCancel, onSubmit }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isLoading, setLoading] = React.useState(false);
  const isMounted = useMountedState(() => setLoading(false));
  const [name, setName] = React.useState(initialName);

  const handleInput = (value: string) => setName(value);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    if (name === initialName || !formRef.current || !formRef.current.reportValidity()) {
      event.preventDefault();
      return;
    }
    setLoading(true);
    await onSubmit(name);
    isMounted && setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <Wrapper isLoading={isLoading}>
        <InputsContainer>
          <InputText
            initialValue={name}
            label="Category Name"
            onInput={handleInput}
            reset={false}
          />
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
