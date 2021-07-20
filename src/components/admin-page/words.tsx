import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { WordAddCard } from 'components/admin-card/word-add-card';
import { WordCard } from 'components/admin-card/word-card';
import { AdminHeader } from 'components/admin-header/header';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { useInfiniteScroller } from 'components/infinite-scroller/use-infinite-scroller';
import { useAuthTestHook } from 'components/modal/modal-auth';
import { Sidebar } from 'components/sidebar/sidebar';
import { HerokuLoading } from 'components/spinner/heroku-loading';
import { useDataContext } from 'services/data/context';
import { WordProps } from 'services/data/service';
import { AuthTokenStore, WordDocument } from 'services/rest-api/config';

import { Container } from './admin-page-style';

const SCROLL_PART = 3;

export const AdminPageWords: React.FC = observer(() => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dataService = useDataContext();
  const { setRestApiError } = useAuthTestHook();

  const words = dataService.getWordsByCategoryId(categoryId);

  const { loadMore, itemsCount, setItemsCount } = useInfiniteScroller({
    minCount: SCROLL_PART,
    getSize: () => words.length,
  });

  const handleCreate = async (wordProps: WordProps) => {
    const result = await dataService.createWord(categoryId, wordProps);
    if (result.isError) {
      setRestApiError(result);
    } else {
      setItemsCount((count) => count + 1);
    }
  };

  const handleUpdate = async (word: WordDocument, wordProps: WordProps) => {
    const result = await dataService.updateWord(categoryId, word, wordProps);
    result.isError && setRestApiError(result);
  };

  const handleDelete = async (wordId: string) => {
    const result = await dataService.deleteWord(categoryId, wordId);
    result.isError && setRestApiError(result);
  };

  const spinner = <HerokuLoading />;

  const content = (
    <InfiniteScroller height="80vh" loadMore={loadMore} haveMore={itemsCount < words.length}>
      <Container>
        {[
          ...words
            .slice(0, itemsCount)
            .map((word) => (
              <WordCard
                key={word._id}
                initialWord={word}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            )),
          <WordAddCard key="add new word" onCreate={handleCreate} />,
        ]}
      </Container>
    </InfiniteScroller>
  );

  const page = (
    <>
      <Sidebar />
      <Header isAdmin>
        <AdminHeader
          category={dataService.getCategoryById(categoryId)?.name}
          words={dataService.getWordsByCategoryId(categoryId).length}
        />
      </Header>
      <Main>{dataService.isPending ? spinner : content}</Main>
    </>
  );

  return AuthTokenStore.get() ? page : <Redirect to="/" />;
});
