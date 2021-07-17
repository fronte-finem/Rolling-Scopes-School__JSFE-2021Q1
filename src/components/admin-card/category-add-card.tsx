import React from 'react';

import { CardAddFront } from 'components/admin-card/card-add-front';
import { CategoryCardEditor } from 'components/admin-card/category-card-editor';

import { Card } from './card-style';

interface Props {
  onCreate: (name: string) => Promise<void>;
}

export const CategoryAddCard: React.FC<Props> = ({ onCreate }) => {
  const [isEdit, setEdit] = React.useState(false);

  const handleAdd = () => setEdit(true);
  const handleCancel = () => setEdit(false);
  const handleCreate = async (name: string) => {
    await onCreate(name);
    setEdit(false);
  };

  return (
    <Card>
      {isEdit ? (
        <CategoryCardEditor initialName="" onCancel={handleCancel} onSubmit={handleCreate} />
      ) : (
        <CardAddFront title="Add new Category" onAdd={handleAdd} />
      )}
    </Card>
  );
};
