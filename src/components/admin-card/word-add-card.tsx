import React from 'react';

import { CardAddFront } from 'components/admin-card/card-add-front';
import { Card } from 'components/admin-card/card-style';
import { WordCardEditor } from 'components/admin-card/word-card-editor';
import { WordProps } from 'services/data/service';
import { useMountedState } from 'utils/is-mounted-hook';

enum ControlName {
  CARD_TITLE = 'Add new Word',
}

interface Props {
  onCreate: (wordProps: WordProps) => Promise<void>;
}

export const WordAddCard: React.FC<Props> = ({ onCreate }) => {
  const [isEdit, setEdit] = React.useState(false);
  const isMounted = useMountedState(() => setEdit(false));

  const handleAdd = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleCreate = async (wordProps: WordProps) => {
    await onCreate(wordProps);
    isMounted && setEdit(false);
  };

  const front = <CardAddFront title={ControlName.CARD_TITLE} onAdd={handleAdd} />;
  const editor = <WordCardEditor onSubmit={handleCreate} onCancel={handleCancel} />;

  return <Card big>{isEdit ? editor : front}</Card>;
};
