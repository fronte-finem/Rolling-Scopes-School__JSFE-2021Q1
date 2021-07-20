import React from 'react';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { CategoryLink } from 'components/card-category/category';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { useInfiniteScroller } from 'components/infinite-scroller/use-infinite-scroller';
import { Sidebar } from 'components/sidebar/sidebar';
import { HerokuLoading } from 'components/spinner/heroku-loading';
import { useDataContext } from 'services/data/context';
import { useGameContext } from 'services/game/context';
import { StyledProps } from 'types/styled';

import { StyledCategories, StyledCategoriesItem } from './page-categories-style';

const SCROLL_PART = 8;

export const PageCategories: React.FC<StyledProps> = observer(({ className }) => {
  const dataService = useDataContext();
  const game = useGameContext();

  const { loadMore, itemsCount } = useInfiniteScroller({
    minCount: SCROLL_PART,
    getSize: () => dataService.categories.length,
  });

  const spinner = <HerokuLoading />;

  const nav = (
    <nav className={className}>
      <InfiniteScroller
        height="80vh"
        loadMore={loadMore}
        haveMore={itemsCount < dataService.categories.length}
      >
        <StyledCategories>
          {dataService.categories.slice(0, itemsCount).map((category) => (
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
  );

  return (
    <>
      <Sidebar />
      <Header />
      <Main>{dataService.isPending ? spinner : nav}</Main>
    </>
  );
});
