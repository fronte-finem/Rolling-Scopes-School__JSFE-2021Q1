import React from 'react';
import { useParams } from 'react-router-dom';

import { Card } from 'components/admin-card/card-style';
import { WordCardEditor, WordProps } from 'components/admin-card/word-card-editor';
import { WordCardFront } from 'components/admin-card/word-card-front';
import { mediaUpload } from 'services/rest-api/media-api';
import { wordApiService, WordDocument } from 'services/rest-api/word-api';

interface Props {
  initialWord: WordDocument;
  onUpdate: (word: WordDocument) => void;
  onDelete: (wordId: string) => void;
}

export const WordCard: React.FC<Props> = ({ initialWord, onUpdate, onDelete }) => {
  const wordId = initialWord._id;
  const { categoryId } = useParams<{ categoryId: string }>();
  const [isEdit, setEdit] = React.useState(false);

  const handleEdit = () => setEdit(true);
  const handleCancel = () => setEdit(false);

  const handleDelete = async () => {
    try {
      const response = await wordApiService.remove(categoryId, wordId);
      console.log(response);
      onDelete(wordId);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of word delete request');
    }
  };

  const handleUpdate = async ({ image, audio, ...texts }: WordProps) => {
    try {
      const imageResponse = image && (await mediaUpload(image));
      const audioResponse = audio && (await mediaUpload(audio));
      const { data } = await wordApiService.update(categoryId, wordId, {
        ...texts,
        image: imageResponse?.data || initialWord.image,
        audio: audioResponse?.data || initialWord.audio,
      });
      console.log(data);
      setEdit(false);
      onUpdate(data);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('end of word update request');
    }
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
