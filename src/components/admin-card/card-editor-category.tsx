import React from 'react';

import { CardEditor } from 'components/admin-card/card-editor';
import { InputsContainer } from 'components/admin-card/card-style';
import { InputText } from 'components/admin-card/input-text';

enum ControlName {
  INPUT_LABEL_CATEGORY = 'Category Name',
}

interface Props {
  initialName?: string;
  isCreator?: boolean;
  onCancel: () => void;
  onSubmit: (name: string) => Promise<void>;
}

export const CardEditorCategory: React.FC<Props> = ({
  initialName,
  isCreator,
  onCancel,
  onSubmit,
}) => {
  const [name, setName] = React.useState(initialName);

  const handleInput = (value: string) => setName(value);

  const handleSubmit = async () => {
    name && (await onSubmit(name));
  };

  return (
    <CardEditor
      isCreator={isCreator}
      canUpdate={!!name && name !== initialName}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      <InputsContainer>
        <InputText
          initialValue={name}
          label={ControlName.INPUT_LABEL_CATEGORY}
          onInput={handleInput}
          reset={false}
        />
      </InputsContainer>
    </CardEditor>
  );
};
