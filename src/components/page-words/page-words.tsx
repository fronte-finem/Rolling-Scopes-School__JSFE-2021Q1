import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { Card } from 'components/card-word/card';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { StyledCardsField, StyledCardsFieldItem } from 'components/page-words/page-words-style';
import { Sidebar } from 'components/sidebar/sidebar';
import { HerokuLoading } from 'components/spinner/heroku-loading';
import { useDataContext } from 'services/data/context';
import { useGameContext } from 'services/game/context';
import { WordDocument } from 'services/rest-api/word-api';
import { useWordsStatsService } from 'services/word-stat/context';
import { StyledProps } from 'types/styled';
import { delay } from 'utils/async';

const SCROLL_PART = 8;

export interface PageWordsProps extends StyledProps {
  isDifficultWords?: boolean;
  words?: WordDocument[];
}

export const PageWords: React.FC<PageWordsProps> = observer(({ isDifficultWords = false }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const dataService = useDataContext();
  const [itemsCount, setItemsCount] = useState(SCROLL_PART);
  const wordsStatsService = useWordsStatsService();
  const game = useGameContext();

  const words = isDifficultWords
    ? wordsStatsService.getDifficultWords(dataService.words)
    : dataService.getWordsByCategoryId(categoryId);

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

  const loadMore = async () => {
    if (itemsCount >= words.length) return;
    await delay(200);
    setItemsCount(itemsCount + SCROLL_PART);
  };

  useEffect(() => {
    setItemsCount(SCROLL_PART);
  }, [categoryId]);

  const spinner = <HerokuLoading />;

  const cardsField = (
    <InfiniteScroller height="80vh" loadMore={loadMore}>
      <StyledCardsField>
        {words.slice(0, itemsCount).map((wordDoc) => (
          <StyledCardsFieldItem key={wordDoc.word}>
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
        ? 'No difficult words'
        : `Category "${dataService.getCategoryById(categoryId)?.name || ''}" have 0 words`}
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
