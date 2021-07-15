import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { Main } from 'app/app-style';
import { CategoryAddCard } from 'components/admin-card/category-add-card';
import { CategoryCard } from 'components/admin-card/category-card';
import { AdminHeader } from 'components/admin-header/header';
import { Header } from 'components/header/header';
import { Sidebar } from 'components/sidebar/sidebar';
import { useDataContext } from 'services/data/data-context';
import { authService } from 'services/rest-api/auth';
import { CategoryCardData, CategoryDocument } from 'services/rest-api/category-api';
import { updateArray } from 'utils/array';

import { Container } from './admin-page-style';

export const AdminPageCategories: React.FC = () => {
  const { categoriesData, setCategoriesData, updateData } = useDataContext();
  const history = useHistory();
  const token = authService.getCurrentToken();

  useEffect(() => {
    updateData();
  }, []);

  const handleCreate = (category: CategoryDocument) => {
    setCategoriesData([...categoriesData, { category, words: 0 }]);
  };

  const handleUpdate = (data: CategoryCardData) => {
    setCategoriesData(
      updateArray(categoriesData, data, (x) => (y) => x.category._id === y.category._id)
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
    ...categoriesData.map((data) => (
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
        <Container>{cards}</Container>
      </Main>
    </>
  );

  return token ? page : <Redirect to="/" />;
};
