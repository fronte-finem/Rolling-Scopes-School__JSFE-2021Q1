import React from 'react';

import { Card, EditorProps, FrontProps } from 'components/admin-card/admin-card';
import { CardEditorCategory } from 'components/admin-card/card-editor-category';
import { CardFrontCategory } from 'components/admin-card/card-front';
import { CategoryDocument, WordDocument } from 'services/rest-api/config';

interface Props {
  category: CategoryDocument;
  words: WordDocument[];
  onUpdate: (category: CategoryDocument, name: string) => Promise<void>;
  onDelete: (category: CategoryDocument) => Promise<void>;
  onGoToWords: (category: CategoryDocument) => void;
}

export const CardCategory: React.FC<Props> = ({
  category,
  words,
  onUpdate,
  onDelete,
  onGoToWords,
}) => {
  const handleAddWord = () => onGoToWords(category);

  const getFront = ({ handleEdit }: FrontProps) => {
    const handleDelete = () => onDelete(category);
    return (
      <CardFrontCategory
        category={category}
        onDelete={handleDelete}
        onUpdate={handleEdit}
        onAddWord={handleAddWord}
        words={words}
      />
    );
  };

  const getEditor = ({ handleCancel, postUpdate }: EditorProps) => {
    const handleUpdate = async (name: string) => {
      await onUpdate(category, name);
      postUpdate();
    };
    return (
      <CardEditorCategory
        initialName={category.name}
        onCancel={handleCancel}
        onSubmit={handleUpdate}
      />
    );
  };

  return <Card getFront={getFront} getEditor={getEditor} />;
};
