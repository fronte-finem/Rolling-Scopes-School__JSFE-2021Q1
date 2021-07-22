import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { Card } from 'components/card-word/card';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { useInfiniteScroller } from 'components/infinite-scroller/use-infinite-scroller';
import { StyledCardsField, StyledCardsFieldItem } from 'components/page-words/page-words-style';
import { Sidebar } from 'components/sidebar/sidebar';
import { HerokuLoading } from 'components/spinner/heroku-loading';
import { useDataContext } from 'services/data/context';
import { useGameContext } from 'services/game/context';
import { WordDocument } from 'services/rest-api/config';
import { useWordsStatsService } from 'services/word-stat/context';
import { StyledProps } from 'types/styled';

const SCROLL_PART = 8;

const NO_DIFFICULT_WORDS = 'No difficult words';
const getNoWordsMsg = (categoryName?: string) => `Category "${categoryName || ''}" have 0 words`;

export interface PageWordsProps extends StyledProps {
  isDifficultWords?: boolean;
  words?: WordDocument[];
}

export const PageWords: React.FC<PageWordsProps> = observer(({ isDifficultWords = false }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dataService = useDataContext();
  const wordsStatsService = useWordsStatsService();
  const game = useGameContext();

  const words = isDifficultWords
    ? wordsStatsService.getDifficultWords(dataService.words)
    : dataService.getWordsByCategoryId(categoryId);

  const { loadMore, itemsCount } = useInfiniteScroller({
    minCount: SCROLL_PART,
    getSize: () => words.length,
  });

  const handleMathWord = (word: WordDocument) => {
    if (!game.isGamePlay) return false;
    if (game.isWordSolved(word._id)) return true;
    game.matchWord(word._id);
    return game.isWordMatch(word._id);
  };

  const handleStartRepeat = () => {
    if (game.isGameReady) {
      game.start(words, isDifficultWords ? '' : categoryId);
    } else {
      game.vocalize();
    }
  };

  const showBtnStartRepeat = game.isGameMode && words.length > 0;

  const spinner = <HerokuLoading />;

  const cardsField = (
    <InfiniteScroller height="80vh" loadMore={loadMore} haveMore={itemsCount < words.length}>
      <StyledCardsField>
        {words.slice(0, itemsCount).map((wordDoc) => (
          <StyledCardsFieldItem key={wordDoc._id}>
            <Card
              data={wordDoc}
              matchWord={handleMathWord}
              isGameMode={game.isGameMode}
              isGameReady={game.isGameReady}
              isGamePlay={game.isGamePlay}
              isSolved={game.isWordSolved(wordDoc._id)}
            />
          </StyledCardsFieldItem>
        ))}
      </StyledCardsField>
    </InfiniteScroller>
  );

  const noWordsMessage = (
    <h2 style={{ margin: '50px', textAlign: 'center' }}>
      {isDifficultWords
        ? NO_DIFFICULT_WORDS
        : getNoWordsMsg(dataService.getCategoryById(categoryId)?.name)}
    </h2>
  );

  const content = words.length === 0 ? noWordsMessage : cardsField;

  return (
    <>
      <Sidebar />
      <Header showBtnStartRepeat={showBtnStartRepeat} onStartRepeat={handleStartRepeat} />
      <Main>{dataService.isPending ? spinner : content}</Main>
    </>
  );
});
