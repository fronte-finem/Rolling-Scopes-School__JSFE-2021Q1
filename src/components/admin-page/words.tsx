import React from 'react';
import { Redirect } from 'react-router-dom';

import { Main } from 'app/app-style';
import { WordAddCard } from 'components/admin-card/word-add-card';
import { WordCard } from 'components/admin-card/word-card';
import { AdminHeader } from 'components/admin-header/header';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { authService } from 'services/admin/auth';
import { useWordsHook } from 'services/data/words-hook';
import { WordDocument } from 'services/rest-api/word-api';
import { updateArray } from 'utils/array';

import { Container } from './admin-page-style';

export const AdminPageWords: React.FC = () => {
  const token = authService.getCurrentToken();
  const { category, words, setWords } = useWordsHook();

  const handleCreate = (data: WordDocument) => {
    setWords([...words, data]);
  };

  const handleDelete = (wordId: string) => {
    setWords(words.filter((word) => word._id !== wordId));
  };

  const handleUpdate = (data: WordDocument) => {
    setWords(updateArray(words, data, (x) => (y) => x._id === y._id));
  };

  const cards = [
    ...words.map((word) => (
      <WordCard
        key={word.word}
        initialWord={word}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    )),
    <WordAddCard key="add new word" onCreate={handleCreate} />,
  ];

  const page = (
    <>
      <Sidebar />
      <Header isAdmin>
        <AdminHeader category={category?.name} words={words.length} />
      </Header>
      <Main>
        <Container>{cards}</Container>
      </Main>
    </>
  );

  return token ? page : <Redirect to="/" />;
};
