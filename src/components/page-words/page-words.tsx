import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Main } from 'app/app-style';
import { Card } from 'components/card/card';
import { Header } from 'components/header/header';
import { InfiniteScroller } from 'components/infinite-scroller/infinite-scroller';
import { StyledCardsField, StyledCardsFieldItem } from 'components/page-words/page-words-style';
import { Sidebar } from 'components/sidebar/sidebar';
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

export const PageWords: React.FC<PageWordsProps> = observer(
  ({ className, isDifficultWords = false }) => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const dataService = useDataContext();
    const wordsStatsService = useWordsStatsService();
    const game = useGameContext();

    const someWords = isDifficultWords
      ? wordsStatsService.getDifficultWords(dataService.words)
      : dataService.getWordsByCategoryId(categoryId);
    const [wordsPart, setWordsPart] = useState(someWords.slice(0, SCROLL_PART));

    const handleMathWord = (word: WordDocument) => {
      if (!game.isGamePlay) return false;
      if (game.isWordSolved(word._id)) return true;
      game.matchWord(word._id);
      return game.isWordMatch(word._id);
    };

    const handleStartRepeat = () => {
      if (game.isGameReady) {
        game.start(someWords, isDifficultWords ? '' : categoryId);
      } else {
        game.vocalize();
      }
    };

    const showBtnStartRepeat = game.isGameMode && someWords.length > 0;

    const loadMore = async () => {
      if (wordsPart.length >= someWords.length) return;
      await delay(500);
      const { length } = wordsPart;
      setWordsPart(someWords.slice(0, length + SCROLL_PART));
    };

    useEffect(() => {
      setWordsPart([]);
    }, [categoryId]);

    useEffect(() => {
      (async () => {
        await loadMore();
      })();
    }, [dataService.words, someWords]);

    const cards = wordsPart.map((wordDoc) => (
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
                  : `Category "${
                      dataService.getCategoryById(categoryId)?.name || ''
                    }" have 0 words`}
              </h2>
            ) : (
              <InfiniteScroller height="80vh" loadMore={loadMore}>
                <StyledCardsField>{cards}</StyledCardsField>
              </InfiniteScroller>
            )}
          </div>
        </Main>
      </>
    );
  }
);
