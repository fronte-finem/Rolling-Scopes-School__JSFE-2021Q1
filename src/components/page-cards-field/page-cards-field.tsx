import React from 'react';
import { useParams } from 'react-router-dom';

import { Card } from 'components/card/card';
import { getWords } from 'services/data/data-context';
import { WordDTO } from 'services/data/dto-word';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import {
  isGameMode,
  isGamePlay,
  isGameReady,
  isWordMatch,
  isWordSolved,
} from 'services/game/game-state';
import { useWordsStatsContext } from 'services/stats/words-stats-context';
import { StyledProps } from 'types/styled';

import { StyledCardsField, StyledCardsFieldItem } from './page-cards-field-style';

export interface PageCardsFieldProps extends StyledProps {
  isDifficultWords?: boolean;
}

export const PageCardsField = ({
  className,
  isDifficultWords = false,
}: PageCardsFieldProps): JSX.Element => {
  const { category } = useParams<{ category: string }>();
  const { wordsData, categoriesData, getDifficultWords } = useWordsStatsContext();
  const { gameState, dispatch } = useGameContext();

  const words = isDifficultWords
    ? React.useRef(getDifficultWords()).current
    : getWords(category, categoriesData, wordsData);
  if (words.length === 0)
    return <h2>{isDifficultWords ? 'No difficult words' : `Category "${category}" not found`}</h2>;

  const handleMathWord = (word: WordDTO) => {
    if (!isGamePlay(gameState)) return false;
    if (isWordSolved(gameState, word.id)) return true;
    dispatch({ type: GameActionType.MATCH_WORD, payload: { word } });
    return isWordMatch(gameState, word.id);
  };

  const [isGame, isReady, isPlay] = [isGameMode, isGameReady, isGamePlay].map((func) =>
    func(gameState)
  );

  return (
    <div className={className}>
      <StyledCardsField>
        {words.map((dto) => (
          <StyledCardsFieldItem key={dto.word}>
            <Card
              wordDTO={dto}
              matchWord={handleMathWord}
              isGameMode={isGame}
              isGameReady={isReady}
              isGamePlay={isPlay}
              isSolved={isWordSolved(gameState, dto.id)}
            />
          </StyledCardsFieldItem>
        ))}
      </StyledCardsField>
    </div>
  );
};
