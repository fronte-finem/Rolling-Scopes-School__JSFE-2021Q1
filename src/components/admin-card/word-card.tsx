import React from 'react';

import { CardEditorWord } from 'components/admin-card/card-editor-word';
import { CardFrontWord } from 'components/admin-card/card-front';
import { Card } from 'components/admin-card/card-style';
import { WordProps } from 'services/data/service';
import { WordDocument } from 'services/rest-api/config';
import { useMountedState } from 'utils/is-mounted-hook';

interface Props {
  initialWord: WordDocument;
  onUpdate: (word: WordDocument, wordProps: WordProps) => Promise<void>;
  onDelete: (wordId: string) => Promise<void>;
}

export const WordCard: React.FC<Props> = ({ initialWord, onUpdate, onDelete }) => {
  const wordId = initialWord._id;
  const [isEdit, setEdit] = React.useState(false);
  const isMounted = useMountedState(() => setEdit(false));

  const handleEdit = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleDelete = () => onDelete(wordId);

  const handleUpdate = async (wordProps: WordProps) => {
    await onUpdate(initialWord, wordProps);
    isMounted && setEdit(false);
  };

  const front = (
    <CardFrontWord initialWord={initialWord} onEdit={handleEdit} onDelete={handleDelete} />
  );
  const editor = (
    <CardEditorWord initialWord={initialWord} onSubmit={handleUpdate} onCancel={handleCancel} />
  );

  return <Card big>{isEdit ? editor : front}</Card>;
};
