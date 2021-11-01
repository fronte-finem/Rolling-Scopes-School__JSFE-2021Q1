import React from 'react';

import { Card, EditorProps, FrontProps } from 'components/admin-card/admin-card';
import { CardEditorWord } from 'components/admin-card/card-editor-word';
import { CardFrontWord } from 'components/admin-card/card-front';
import { WordProps } from 'services/data/service';
import { WordDocument } from 'services/rest-api/config';

interface Props {
  initialWord: WordDocument;
  onUpdate: (word: WordDocument, wordProps: WordProps) => Promise<void>;
  onDelete: (wordId: string) => Promise<void>;
}

export const CardWord: React.FC<Props> = ({ initialWord, onUpdate, onDelete }) => {
  const wordId = initialWord._id;

  const getFront = ({ handleEdit }: FrontProps) => {
    const handleDelete = () => onDelete(wordId);
    return <CardFrontWord initialWord={initialWord} onEdit={handleEdit} onDelete={handleDelete} />;
  };

  const getEditor = ({ handleCancel, postUpdate }: EditorProps) => {
    const handleUpdate = async (wordProps: WordProps) => {
      await onUpdate(initialWord, wordProps);
      postUpdate();
    };
    return (
      <CardEditorWord initialWord={initialWord} onSubmit={handleUpdate} onCancel={handleCancel} />
    );
  };

  return <Card isBig getFront={getFront} getEditor={getEditor} />;
};
