import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { CategoryAddCard } from 'components/admin-card/category-add-card';
import { CategoryCard } from 'components/admin-card/category-card';
import { AdminHeader } from 'components/admin-header/header';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { Sidebar } from 'components/sidebar/sidebar';
import { useDataContext } from 'services/data/context';
import { authService } from 'services/rest-api/auth';
import { CategoryDocument } from 'services/rest-api/category-api';
import { delay } from 'utils/async';

import { Container } from './admin-page-style';

const SCROLL_PART = 8;

export const AdminPageCategories: React.FC = observer(() => {
  const dataService = useDataContext();
  const [categoriesPart, setCategoriesPart] = useState(
    dataService.categories.slice(0, SCROLL_PART)
  );
  const history = useHistory();
  const token = authService.getCurrentToken();

  const loadMore = async () => {
    if (categoriesPart.length >= dataService.categories.length) return;
    await delay(500);
    const { length } = categoriesPart;
    setCategoriesPart(dataService.categories.slice(0, length + SCROLL_PART));
  };

  useEffect(() => {
    (async () => {
      await loadMore();
    })();
  }, [dataService.categories]);

  const handleCreate = async (name: string) => {
    await dataService.createCategory(name);
  };

  const handleUpdate = async (category: CategoryDocument, name: string) => {
    await dataService.updateCategory(category, name);
  };

  const handleDelete = async (category: CategoryDocument) => {
    await dataService.deleteCategory(category);
  };

  const handleGoToWords = (category: CategoryDocument) => {
    history.push(`/admin/category/${category._id}`);
  };

  const cards = [
    // ...categoriesPart.map((category) => (
    ...dataService.categories.map((category) => (
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
  ];

  const page = (
    <>
      <Sidebar />
      <Header isAdmin>
        <AdminHeader />
      </Header>
      <Main>
        <InfiniteScroller height="80vh" loadMore={loadMore}>
          <Container>{cards}</Container>
        </InfiniteScroller>
      </Main>
    </>
  );

  return token ? page : <Redirect to="/" />;
});
