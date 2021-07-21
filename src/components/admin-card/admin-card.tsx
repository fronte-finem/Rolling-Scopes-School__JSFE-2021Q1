import React from 'react';

import { StyledCard } from 'components/admin-card/card-style';
import { useMountedState } from 'utils/is-mounted-hook';

export interface FrontProps {
  handleEdit: () => void;
}

export interface EditorProps {
  postUpdate: () => void;
  handleCancel: () => void;
}

interface Props {
  getFront: (props: FrontProps) => JSX.Element;
  getEditor: (props: EditorProps) => JSX.Element;
  isBig?: boolean;
}

export const Card: React.FC<Props> = ({ getFront, getEditor, isBig }) => {
  const [isEdit, setEdit] = React.useState(false);
  const isMounted = useMountedState(() => setEdit(false));

  const handleEdit = () => setEdit(true);
  const handleCancel = () => setEdit(false);
  const postUpdate = () => {
    isMounted && setEdit(false);
  };

  const front = getFront({ handleEdit });
  const editor = getEditor({ postUpdate, handleCancel });

  return <StyledCard big={isBig}>{isEdit ? editor : front}</StyledCard>;
};
