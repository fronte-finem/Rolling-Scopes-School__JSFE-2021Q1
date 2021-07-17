import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { Main } from 'app/app-style';
import { CategoryAddCard } from 'components/admin-card/category-add-card';
import { CategoryCard } from 'components/admin-card/category-card';
import { AdminHeader } from 'components/admin-header/header';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { Sidebar } from 'components/sidebar/sidebar';
import { useDataContext } from 'services/data/data-context';
import { authService } from 'services/rest-api/auth';
import { CategoryCardData, CategoryDocument } from 'services/rest-api/category-api';
import { updateItem } from 'utils/array';
import { delay } from 'utils/async';

import { Container } from './admin-page-style';

const SCROLL_PART = 8;

export const AdminPageCategories: React.FC = () => {
  const { categoriesData, setCategoriesData, updateData } = useDataContext();
  const [categoriesPart, setCategoriesPart] = useState(categoriesData.slice(0, SCROLL_PART));
  const history = useHistory();
  const token = authService.getCurrentToken();

  const loadMore = async () => {
    if (categoriesPart.length >= categoriesData.length) return;
    await delay(500);
    const { length } = categoriesPart;
    setCategoriesPart(categoriesData.slice(0, length + SCROLL_PART));
  };

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    (async () => {
      await loadMore();
    })();
  }, [categoriesData]);

  const handleCreate = (category: CategoryDocument) => {
    setCategoriesData([...categoriesData, { category, words: 0 }]);
  };

  const handleUpdate = (data: CategoryCardData) => {
    setCategoriesData(
      updateItem(categoriesData, data, (x) => (y) => x.category._id === y.category._id)
    );
  };

  const handleDelete = (deletedCategory: CategoryDocument) => {
    setCategoriesData(
      categoriesData.filter(({ category }) => category._id !== deletedCategory._id)
    );
  };

  const handleGoToWords = (category: CategoryDocument) => {
    history.push(`/admin/category/${category._id}`);
  };

  const cards = [
    ...categoriesPart.map((data) => (
      <CategoryCard
        key={data.category.name}
        data={data}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onGoToWords={handleGoToWords}
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
};
