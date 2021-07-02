import React from 'react';
import { useParams } from 'react-router-dom';

import { Card } from 'components/card/card';
import { useWordsData } from 'services/data/data-context';
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
import { StyledProps } from 'types/styled';

import { StyledCardsField, StyledCardsFieldItem } from './cards-field-style';

export const CardsField = ({ className }: StyledProps): JSX.Element => {
  const { category } = useParams<{ category: string }>();
  const result = useWordsData(category);
  const { gameState, dispatch } = useGameContext();

  if (typeof result === 'string') return <h2>{result}</h2>;
  const [, words] = result;

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
