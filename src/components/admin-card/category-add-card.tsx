import React from 'react';

import { CardAddFront } from 'components/admin-card/card-add-front';
import { CategoryCardEditor } from 'components/admin-card/category-card-editor';
import { categoryApiService, CategoryDocument } from 'services/rest-api/category-api';

import { Card } from './card-style';

interface Props {
  onCreate: (category: CategoryDocument) => void;
}

export const CategoryAddCard: React.FC<Props> = ({ onCreate }) => {
  const [isEdit, setEdit] = React.useState(false);

  const handleAdd = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleCreate = async (name: string) => {
    try {
      const { data } = await categoryApiService.create({ name });
      console.log(data);
      setEdit(false);
      onCreate(data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of category create request');
    }
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
