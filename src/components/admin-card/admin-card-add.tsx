import React from 'react';

import { CardAddFront } from 'components/admin-card/card-add-front';
import { CardEditorCategory } from 'components/admin-card/card-editor-category';
import { CardEditorWord } from 'components/admin-card/card-editor-word';
import { WordProps } from 'services/data/service';
import { useMountedState } from 'utils/is-mounted-hook';

import { StyledCard } from './card-style';

interface EditorProps<T> {
  onSubmit: (data: T) => Promise<void>;
  onCancel: () => void;
}

interface Props<T> {
  title: string;
  getEditor: (props: EditorProps<T>) => JSX.Element;
  onCreate: (props: T) => Promise<void>;
  bigCard?: boolean;
}

export function CardAdd<T>({ title, getEditor, onCreate, bigCard }: Props<T>): JSX.Element {
  const [isEdit, setEdit] = React.useState(false);
  const isMounted = useMountedState(() => setEdit(false));

  const handleAdd = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleCreate = async (props: T) => {
    await onCreate(props);
    isMounted && setEdit(false);
  };

  const front = <CardAddFront title={title} onAdd={handleAdd} />;
  const editor = getEditor({ onCancel: handleCancel, onSubmit: handleCreate });

  return <StyledCard big={bigCard}>{isEdit ? editor : front}</StyledCard>;
}

enum ControlName {
  ADD_CATEGORY = 'Add new Category',
  ADD_WORD = 'Add new Word',
}

interface CreateCategoryProps {
  onCreate: (name: string) => Promise<void>;
}

export const CardAddCategory: React.FC<CreateCategoryProps> = ({ onCreate }) => {
  const getEditor = ({ onSubmit, onCancel }: EditorProps<string>) => (
    <CardEditorCategory isCreator onSubmit={onSubmit} onCancel={onCancel} />
  );
  return <CardAdd title={ControlName.ADD_CATEGORY} getEditor={getEditor} onCreate={onCreate} />;
};

interface CreateWordProps {
  onCreate: (wordProps: WordProps) => Promise<void>;
}

export const CardAddWord: React.FC<CreateWordProps> = ({ onCreate }) => {
  const getEditor = ({ onSubmit, onCancel }: EditorProps<WordProps>) => (
    <CardEditorWord isCreator onSubmit={onSubmit} onCancel={onCancel} />
  );
  return <CardAdd title={ControlName.ADD_WORD} getEditor={getEditor} onCreate={onCreate} bigCard />;
};
