import React from 'react';

import { CategoryCardEditor } from 'components/admin-card/category-card-editor';
import { CategoryCardFront } from 'components/admin-card/category-card-front';
import { CategoryDocument } from 'services/rest-api/category-api';
import { WordDocument } from 'services/rest-api/word-api';

import { Card } from './card-style';

interface Props {
  category: CategoryDocument;
  onUpdate: (category: CategoryDocument, name: string) => Promise<void>;
  onDelete: (category: CategoryDocument) => Promise<void>;
  onGoToWords: (category: CategoryDocument) => void;
  words: WordDocument[];
}

export const CategoryCard: React.FC<Props> = ({
  category,
  onUpdate,
  onDelete,
  onGoToWords,
  words,
}) => {
  const [isEdit, setEdit] = React.useState(false);

  const handleEdit = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleAddWord = () => onGoToWords(category);

  const handleUpdate = (name: string) => onUpdate(category, name);
  const handleDelete = () => onDelete(category);

  return (
    <Card>
      {isEdit ? (
        <CategoryCardEditor
          initialName={category.name}
          onCancel={handleCancel}
          onSubmit={handleUpdate}
        />
      ) : (
        <CategoryCardFront
          category={category}
          onDelete={handleDelete}
          onUpdate={handleEdit}
          onAddWord={handleAddWord}
          words={words}
        />
      )}
    </Card>
  );
};
