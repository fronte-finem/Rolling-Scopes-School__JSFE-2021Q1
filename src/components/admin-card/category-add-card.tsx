import React from 'react';

import { CardAddFront } from 'components/admin-card/card-add-front';
import { CategoryCardEditor } from 'components/admin-card/category-card-editor';
import { useMountedState } from 'utils/is-mounted-hook';

import { Card } from './card-style';

enum ControlName {
  CARD_TITLE = 'Add new Category',
}

interface Props {
  onCreate: (name: string) => Promise<void>;
}

export const CategoryAddCard: React.FC<Props> = ({ onCreate }) => {
  const [isEdit, setEdit] = React.useState(false);
  const isMounted = useMountedState(() => setEdit(false));

  const handleAdd = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleCreate = async (name: string) => {
    await onCreate(name);
    isMounted && setEdit(false);
  };

  const front = <CardAddFront title={ControlName.CARD_TITLE} onAdd={handleAdd} />;
  const editor = (
    <CategoryCardEditor initialName="" onCancel={handleCancel} onSubmit={handleCreate} />
  );

  return <Card>{isEdit ? editor : front}</Card>;
};
