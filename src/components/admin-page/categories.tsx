import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { CategoryAddCard } from 'components/admin-card/category-add-card';
import { CategoryCard } from 'components/admin-card/category-card';
import { AdminHeader } from 'components/admin-header/header';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { useAuthTestHook } from 'components/modal/modal-auth';
import { Sidebar } from 'components/sidebar/sidebar';
import { HerokuLoading } from 'components/spinner/heroku-loading';
import { useDataContext } from 'services/data/context';
import { authService } from 'services/rest-api/auth';
import { CategoryDocument } from 'services/rest-api/category-api';
import { delay } from 'utils/async';

import { Container } from './admin-page-style';

const SCROLL_PART = 3;

export const AdminPageCategories: React.FC = observer(() => {
  const dataService = useDataContext();
  const [itemsCount, setItemsCount] = useState(SCROLL_PART);
  const history = useHistory();
  const token = authService.getCurrentToken();
  const { setRestApiError } = useAuthTestHook();

  const loadMore = async () => {
    if (itemsCount >= dataService.categories.length) return;
    await delay(200);
    setItemsCount(itemsCount + SCROLL_PART);
  };

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
    <InfiniteScroller height="80vh" loadMore={loadMore}>
      <Container>
        {[
          ...dataService.categories
            .slice(0, itemsCount)
            .map((category) => (
              <CategoryCard
                key={category.name}
                category={category}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onGoToWords={handleGoToWords}
                words={dataService.getWordsByCategoryId(category._id)}
              />
            )),
          <CategoryAddCard key="creator" onCreate={handleCreate} />,
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

  return token ? page : <Redirect to="/" />;
});
