import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

import { StyledProps } from 'types/styled';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledEmoList = styled.ul.attrs((props: { amount?: number; tangent?: number }) => ({
  amount: props.amount || 0,
  tangent: props.tangent?.toFixed(3) || 0,
}))`
  --amount: ${(props) => props.amount};
  --tangent: ${(props) => props.tangent};
  //--emo-size: 150px;
  --emo-size: min(20vh, 20vw);
  --space: 1;
  //--radius: calc(0.5 * (1 + var(--space)) * var(--emo-size) / var(--tangent));
  --radius: min(20vh, 20vw);
  --size: calc(2 * var(--radius) + var(--emo-size));
  position: relative;
  display: block;
  width: var(--size);
  height: var(--size);
  //background: #0008;
  //border-radius: 50%;
  animation: 12s ${rotate} linear infinite;
`;

export const EmoItem = styled.li.attrs((props: { index?: number }) => ({
  index: props.index || 0,
}))`
  --index: ${(props) => props.index};
  --angle: calc(var(--index) * 1turn / var(--amount));
  --position: calc(50% - var(--emo-size) / 2);
  position: absolute;
  top: var(--position);
  left: var(--position);
  display: block;
  width: var(--emo-size);
  height: var(--emo-size);
  transform: rotate(var(--angle)) translate(var(--radius)) rotate(calc(-1 * var(--angle)));
`;

export const Emo = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
  animation: 12s ${rotate} linear infinite reverse;
`;

export const EmoList: FC<StyledProps & { emos: string[] }> = ({ className, emos }) => {
  const amount = emos.length;
  const tangent = Math.tan(Math.PI / amount);
  return (
    <StyledEmoList className={className} amount={amount} tangent={tangent}>
      {emos.map((emo, index) => (
        <EmoItem key={emo} index={index + 1}>
          <Emo>
            <use href={`./svg/emoji.svg#${emo}`} />
          </Emo>
        </EmoItem>
      ))}
    </StyledEmoList>
  );
};
