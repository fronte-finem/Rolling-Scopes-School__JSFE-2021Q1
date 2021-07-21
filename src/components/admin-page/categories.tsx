import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { CardAddCategory } from 'components/admin-card/admin-card-add';
import { CardCategory } from 'components/admin-card/admin-card-category';
import { AdminHeader } from 'components/admin-header/header';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { useInfiniteScroller } from 'components/infinite-scroller/use-infinite-scroller';
import { useAuthTestHook } from 'components/modal/modal-auth';
import { Sidebar } from 'components/sidebar/sidebar';
import { HerokuLoading } from 'components/spinner/heroku-loading';
import { useDataContext } from 'services/data/context';
import { AuthTokenStore, CategoryDocument } from 'services/rest-api/config';

import { Container } from './admin-page-style';

const SCROLL_PART = 3;

export const AdminPageCategories: React.FC = observer(() => {
  const dataService = useDataContext();
  const history = useHistory();
  const { setRestApiError } = useAuthTestHook();

  const { loadMore, itemsCount, setItemsCount } = useInfiniteScroller({
    minCount: SCROLL_PART,
    getSize: () => dataService.categories.length,
  });

  const handleCreate = async (name: string) => {
    const result = await dataService.createCategory(name);
    if (result.isError) {
      setRestApiError(result);
    } else {
      setItemsCount((count) => count + 1);
    }
  };

  const handleUpdate = async (category: CategoryDocument, name: string) => {
    const result = await dataService.updateCategory(category, name);
    result.isError && setRestApiError(result);
  };

  const handleDelete = async (category: CategoryDocument) => {
    const result = await dataService.deleteCategory(category);
    result.isError && setRestApiError(result);
  };

  const handleGoToWords = (category: CategoryDocument) => {
    history.push(`/admin/category/${category._id}`);
  };

  const spinner = <HerokuLoading />;

  const content = (
    <InfiniteScroller
      height="80vh"
      loadMore={loadMore}
      haveMore={itemsCount < dataService.categories.length}
    >
      <Container>
        {[
          ...dataService.categories
            .slice(0, itemsCount)
            .map((category) => (
              <CardCategory
                key={category._id}
                category={category}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onGoToWords={handleGoToWords}
                words={dataService.getWordsByCategoryId(category._id)}
              />
            )),
          <CardAddCategory key="creator" onCreate={handleCreate} />,
        ]}
      </Container>
    </InfiniteScroller>
  );

  const page = (
    <>
      <Sidebar />
      <Header isAdmin>
        <AdminHeader />
      </Header>
      <Main>{dataService.isPending ? spinner : content}</Main>
    </>
  );

  return AuthTokenStore.get() ? page : <Redirect to="/" />;
});
