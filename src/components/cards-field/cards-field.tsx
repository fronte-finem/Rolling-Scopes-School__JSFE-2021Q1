import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useWordsData } from 'services/data-context';
import { GameActionType, GameContext, GameDispatch, GameState, GameStatus } from 'services/game';
import { StyledProps } from 'types/styled';

import { StyledCardsField, StyledCardsFieldItem } from './style';

function useGameEnd(categoryPath: string, gameState: GameState, dispatch: GameDispatch) {
  useEffect(() => {
    if (
      gameState.status !== GameStatus.INITIAL &&
      gameState.activeCategory &&
      gameState.activeCategory.path !== categoryPath
    ) {
      dispatch({ type: GameActionType.END });
    }
  }, [categoryPath]);
}

export const CardsField = ({ className }: StyledProps): JSX.Element => {
  const { categoryPath } = useParams<{ categoryPath: string }>();
  const result = useWordsData(categoryPath);
  const { gameState, dispatch } = useContext(GameContext);
  useGameEnd(categoryPath, gameState, dispatch);

  if (typeof result === 'string') return <h2>{result}</h2>;
  const [category, words] = result;

  const handleStartGame = () => {
    if (gameState.status === GameStatus.INITIAL) {
      dispatch({ type: GameActionType.START, payload: { category, words: [...words] } });
    } else {
      dispatch({ type: GameActionType.VOCALIZE });
    }
  };

  return (
    <div className={className}>
      <StyledCardsField>
        {words.map((dto) => (
          <StyledCardsFieldItem key={dto.word} wordDTO={dto} />
        ))}
      </StyledCardsField>
      <button type="button" onClick={handleStartGame}>
        {gameState.status === GameStatus.INITIAL ? 'START GAME' : 'REPEAT WORD'}
      </button>
    </div>
  );
};
