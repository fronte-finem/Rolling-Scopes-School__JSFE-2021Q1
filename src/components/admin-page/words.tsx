import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Main } from 'app/app-style';
import { WordAddCard } from 'components/admin-card/word-add-card';
import { WordCard } from 'components/admin-card/word-card';
import { AdminHeader } from 'components/admin-header/header';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { Sidebar } from 'components/sidebar/sidebar';
import { useWordsHook } from 'services/data/words-hook';
import { authService } from 'services/rest-api/auth';
import { WordDocument } from 'services/rest-api/word-api';
import { updateArray } from 'utils/array';
import { delay } from 'utils/async';

import { Container } from './admin-page-style';

const SCROLL_PART = 8;

export const AdminPageWords: React.FC = () => {
  const token = authService.getCurrentToken();
  const { category, words, setWords } = useWordsHook();
  const [wordsPart, setWordsPart] = useState(words.slice(0, SCROLL_PART));

  const handleCreate = (data: WordDocument) => {
    setWords([...words, data]);
  };

  const handleDelete = (wordId: string) => {
    setWords(words.filter((word) => word._id !== wordId));
  };

  const handleUpdate = (data: WordDocument) => {
    setWords(updateArray(words, data, (x) => (y) => x._id === y._id));
  };

  const loadMore = async () => {
    if (wordsPart.length >= words.length) return;
    await delay(500);
    const { length } = wordsPart;
    setWordsPart(words.slice(0, length + SCROLL_PART));
  };

  useEffect(() => {
    (async () => {
      await loadMore();
    })();
  }, [words]);

  const cards = [
    ...wordsPart.map((word) => (
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
        <InfiniteScroller height="80vh" loadMore={loadMore}>
          <Container id="scrollable-words-list">{cards}</Container>
        </InfiniteScroller>
      </Main>
    </>
  );

  return token ? page : <Redirect to="/" />;
};
