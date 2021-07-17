import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { WordAddCard } from 'components/admin-card/word-add-card';
import { WordCard } from 'components/admin-card/word-card';
import { AdminHeader } from 'components/admin-header/header';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { Sidebar } from 'components/sidebar/sidebar';
import { useDataContext } from 'services/data/context';
import { WordProps } from 'services/data/service';
import { authService } from 'services/rest-api/auth';
import { WordDocument } from 'services/rest-api/word-api';
import { delay } from 'utils/async';

import { Container } from './admin-page-style';

const SCROLL_PART = 8;

export const AdminPageWords: React.FC = observer(() => {
  const token = authService.getCurrentToken();
  const { categoryId } = useParams<{ categoryId: string }>();
  const dataService = useDataContext();
  const [wordsPart, setWordsPart] = useState(
    dataService.getWordsByCategoryId(categoryId).slice(0, SCROLL_PART)
  );

  const handleCreate = async (wordProps: WordProps) => {
    await dataService.createWord(categoryId, wordProps);
  };

  const handleDelete = async (wordId: string) => {
    await dataService.deleteWord(categoryId, wordId);
  };

  const handleUpdate = async (word: WordDocument, wordProps: WordProps) => {
    await dataService.updateWord(categoryId, word, wordProps);
  };

  const loadMore = async () => {
    const words = dataService.getWordsByCategoryId(categoryId);
    if (wordsPart.length >= words.length) return;
    await delay(500);
    const { length } = wordsPart;
    setWordsPart(words.slice(0, length + SCROLL_PART));
  };

  useEffect(() => {
    (async () => {
      await loadMore();
    })();
  }, [dataService.words]);

  const cards = [
    // ...wordsPart.map((word) => (
    ...dataService
      .getWordsByCategoryId(categoryId)
      .map((word) => (
        <WordCard
          key={word._id}
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
        <AdminHeader
          category={dataService.getCategoryById(categoryId)?.name}
          words={dataService.getWordsByCategoryId(categoryId).length}
        />
      </Header>
      <Main>
        <InfiniteScroller height="80vh" loadMore={loadMore}>
          <Container id="scrollable-words-list">{cards}</Container>
        </InfiniteScroller>
      </Main>
    </>
  );

  return token ? page : <Redirect to="/" />;
});
