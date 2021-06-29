import React from 'react';
import { useParams } from 'react-router-dom';

import { useWordsData } from 'services/data-context';
import { GameActionType } from 'services/game/game-action';
import { useGameContext } from 'services/game/game-context';
import {
  isGameMode,
  isGamePlay,
  isGameReady,
  isWaiting,
  isWordSolved,
} from 'services/game/game-state';
import { StyledProps } from 'types/styled';
import { WordDTO } from 'types/word-dto';

import { StyledCardsField, StyledCardsFieldItem } from './style';

export const CardsField = ({ className }: StyledProps): JSX.Element => {
  const { categoryPath } = useParams<{ categoryPath: string }>();
  const result = useWordsData(categoryPath);
  const { gameState, dispatch } = useGameContext();

  if (typeof result === 'string') return <h2>{result}</h2>;
  const [, words] = result;

  const handleMathWord = (word: WordDTO) => {
    if (!isGamePlay(gameState)) return;
    if (isWordSolved(gameState, word.id)) return;
    dispatch({ type: GameActionType.MATCH_WORD, payload: { word } });
  };

  const [isGame, isReady, isPlay, isWait] = [isGameMode, isGameReady, isGamePlay, isWaiting].map(
    (func) => func(gameState)
  );

  return (
    <div className={className}>
      <StyledCardsField>
        {words.map((dto) => (
          <StyledCardsFieldItem
            key={dto.word}
            wordDTO={dto}
            matchWord={handleMathWord}
            isGameMode={isGame}
            isGameReady={isReady}
            isGamePlay={isPlay}
            isSolved={isWordSolved(gameState, dto.id)}
            isWaiting={isWait}
          />
        ))}
      </StyledCardsField>
    </div>
  );
};
