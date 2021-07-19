import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { CategoryLink } from 'components/card-category/category';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { Sidebar } from 'components/sidebar/sidebar';
import { useDataContext } from 'services/data/context';
import { useGameContext } from 'services/game/context';
import { StyledProps } from 'types/styled';
import { delay } from 'utils/async';

import { StyledCategories, StyledCategoriesItem } from './page-categories-style';

const SCROLL_PART = 8;

export const PageCategories: React.FC<StyledProps> = observer(({ className }) => {
  const dataService = useDataContext();
  const [categoriesPart, setCategoriesPart] = useState(
    dataService.categories.slice(0, SCROLL_PART)
  );
  const game = useGameContext();

  const loadMore = async () => {
    if (categoriesPart.length >= dataService.categories.length) return;
    await delay(500);
    const { length } = categoriesPart;
    setCategoriesPart(dataService.categories.slice(0, length + SCROLL_PART));
  };

  useEffect(() => {
    setCategoriesPart([]);
  }, []);

  useEffect(() => {
    (async () => {
      await loadMore();
    })();
  }, [dataService.categories]);

  return (
    <>
      <Sidebar />
      <Header />
      <Main>
        <nav className={className}>
          <InfiniteScroller height="80vh" loadMore={loadMore}>
            <StyledCategories>
              {categoriesPart.map((category) => (
                <StyledCategoriesItem key={category._id}>
                  <CategoryLink
                    category={category}
                    isGameMode={game.isGameMode}
                    words={dataService.getWordsByCategoryId(category._id)}
                  />
                </StyledCategoriesItem>
              ))}
            </StyledCategories>
          </InfiniteScroller>
        </nav>
      </Main>
    </>
  );
});
