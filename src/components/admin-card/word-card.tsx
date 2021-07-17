import React from 'react';

import { Card } from 'components/admin-card/card-style';
import { WordCardEditor } from 'components/admin-card/word-card-editor';
import { WordCardFront } from 'components/admin-card/word-card-front';
import { WordProps } from 'services/data/service';
import { WordDocument } from 'services/rest-api/word-api';

interface Props {
  initialWord: WordDocument;
  onUpdate: (word: WordDocument, wordProps: WordProps) => Promise<void>;
  onDelete: (wordId: string) => Promise<void>;
}

export const WordCard: React.FC<Props> = ({ initialWord, onUpdate, onDelete }) => {
  const wordId = initialWord._id;
  const [isEdit, setEdit] = React.useState(false);

  const handleEdit = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleDelete = () => onDelete(wordId);

  const handleUpdate = async (wordProps: WordProps) => {
    await onUpdate(initialWord, wordProps);
    setEdit(false);
  };

  return (
    <Card big>
      {isEdit ? (
        <WordCardEditor initialWord={initialWord} onSubmit={handleUpdate} onCancel={handleCancel} />
      ) : (
        <WordCardFront initialWord={initialWord} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </Card>
  );
};
