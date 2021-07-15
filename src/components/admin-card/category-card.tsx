import React from 'react';

import { CategoryCardEditor } from 'components/admin-card/category-card-editor';
import { CategoryCardFront } from 'components/admin-card/category-card-front';
import {
  categoryApiService,
  CategoryCardData,
  CategoryDocument,
} from 'services/rest-api/category-api';

import { Card } from './card-style';

interface Props {
  data: CategoryCardData;
  onUpdate: (data: CategoryCardData) => void;
  onDelete: (category: CategoryDocument) => void;
  onGoToWords: (category: CategoryDocument) => void;
}

export const CategoryCard: React.FC<Props> = ({ data, onUpdate, onDelete, onGoToWords }) => {
  const [isEdit, setEdit] = React.useState(false);

  const handleEdit = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleAddWord = () => onGoToWords(data.category);

  const handleUpdate = async (name: string) => {
    try {
      const response = await categoryApiService.update({ ...data.category, name });
      console.log(response);
      handleCancel();
      const { category, words } = data;
      onUpdate({ words, category: { ...category, ...response.data } });
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of category update request');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await categoryApiService.remove(data.category);
      console.log(response);
      onDelete(data.category);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of category delete request');
    }
  };

  return (
    <Card>
      {isEdit ? (
        <CategoryCardEditor
          initialName={data.category.name}
          onCancel={handleCancel}
          onSubmit={handleUpdate}
        />
      ) : (
        <CategoryCardFront
          data={data}
          onDelete={handleDelete}
          onUpdate={handleEdit}
          onAddWord={handleAddWord}
        />
      )}
    </Card>
  );
};
