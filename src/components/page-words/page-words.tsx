import React, { useEffect, useState } from 'react';

import { Main } from 'app/app-style';
import { Card } from 'components/card/card';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { StyledCardsField, StyledCardsFieldItem } from 'components/page-words/page-words-style';
import { Sidebar } from 'components/sidebar/sidebar';
import { useWordsHook } from 'services/data/words-hook';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import {
  isGameMode,
  isGamePlay,
  isGameReady,
  isWordMatch,
  isWordSolved,
} from 'services/game/game-state';
import { WordDocument } from 'services/rest-api/word-api';
import { useWordsStatsContext } from 'services/stats/words-stats-context';
import { StyledProps } from 'types/styled';
import { delay } from 'utils/async';

const SCROLL_PART = 8;

export interface PageCardsFieldProps extends StyledProps {
  isDifficultWords?: boolean;
}

export const PageWords = ({
  className,
  isDifficultWords = false,
}: PageCardsFieldProps): JSX.Element => {
  const { category, words } = useWordsHook();
  const { getDifficultWords } = useWordsStatsContext();
  const { gameState, dispatch } = useGameContext();

  const someWords = isDifficultWords ? React.useRef(getDifficultWords()).current : words;
  const [wordsPart, setWordsPart] = useState(someWords.slice(0, SCROLL_PART));

  const handleMathWord = (word: WordDocument) => {
    if (!isGamePlay(gameState)) return false;
    if (isWordSolved(gameState, word._id)) return true;
    dispatch({ type: GameActionType.MATCH_WORD, payload: { word } });
    return isWordMatch(gameState, word._id);
  };

  const handleStartRepeat = () => {
    if (isGameReady(gameState)) {
      dispatch({
        type: GameActionType.START,
        payload: { routePath: category?._id || '', words: someWords },
      });
    } else {
      dispatch({ type: GameActionType.VOCALIZE });
    }
  };

  const [isGame, isReady, isPlay] = [isGameMode, isGameReady, isGamePlay].map((func) =>
    func(gameState)
  );

  const showBtnStartRepeat = isGame && someWords.length > 0;

  const loadMore = async () => {
    if (wordsPart.length >= someWords.length) return;
    await delay(500);
    const { length } = wordsPart;
    setWordsPart(someWords.slice(0, length + SCROLL_PART));
  };

  useEffect(() => {
    setWordsPart([]);
  }, [category]);

  useEffect(() => {
    (async () => {
      await loadMore();
    })();
  }, [someWords]);

  const cards = wordsPart.map((data) => (
    <StyledCardsFieldItem key={data.word}>
      <Card
        data={data}
        matchWord={handleMathWord}
        isGameMode={isGame}
        isGameReady={isReady}
        isGamePlay={isPlay}
        isSolved={isWordSolved(gameState, data._id)}
      />
    </StyledCardsFieldItem>
  ));

  return (
    <>
      <Sidebar />
      <Header showBtnStartRepeat={showBtnStartRepeat} onStartRepeat={handleStartRepeat} />
      <Main>
        <div className={className}>
          {wordsPart.length === 0 ? (
            <h2 style={{ margin: '50px', textAlign: 'center' }}>
              {isDifficultWords
                ? 'No difficult words'
                : `Category "${category?.name || ''}" have 0 words`}
            </h2>
          ) : (
            <InfiniteScroller height="60vw" loadMore={loadMore}>
              <StyledCardsField>{cards}</StyledCardsField>
            </InfiniteScroller>
          )}
        </div>
      </Main>
    </>
  );
};
