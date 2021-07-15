import React from 'react';
import { useParams } from 'react-router-dom';

import { CardAddFront } from 'components/admin-card/card-add-front';
import { Card } from 'components/admin-card/card-style';
import { WordCardEditor, WordProps } from 'components/admin-card/word-card-editor';
import { mediaUpload } from 'services/rest-api/media-api';
import { wordApiService, WordDocument } from 'services/rest-api/word-api';

interface Props {
  onCreate: (data: WordDocument) => void;
}

export const WordAddCard: React.FC<Props> = ({ onCreate }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isEdit, setEdit] = React.useState(false);

  const handleAdd = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleCreate = async ({ image, audio, ...texts }: WordProps) => {
    if (!image || !audio) return;
    try {
      const imageResponse = await mediaUpload(image);
      const audioResponse = await mediaUpload(audio);
      const { data } = await wordApiService.create(categoryId, {
        ...texts,
        image: imageResponse.data,
        audio: audioResponse.data,
      });
      console.log(data);
      setEdit(false);
      onCreate(data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of word create request');
    }
  };

  return (
    <Card big>
      {isEdit ? (
        <WordCardEditor onSubmit={handleCreate} onCancel={handleCancel} isFilesRequired />
      ) : (
        <CardAddFront title="Add new Word" onAdd={handleAdd} />
      )}
    </Card>
  );
};
