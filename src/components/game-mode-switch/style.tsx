import styled from 'styled-components';

export const StyledGameModeSwitch = styled.button`
  --size: 30px;
  --pos: 5%;
  --left: -110%;
  --right: 10%;

  position: relative;
  width: 150px;
  height: 50px;
  border: 5px solid #222;
  border-radius: var(--size);
  background: transparent;
  overflow: hidden;

  &.play {
    --pos: calc(95% - var(--size));
    --left: 10%;
    --right: -110%;
  }
`;

export const Switch = styled.div`
  position: absolute;
  top: calc(50% - var(--size) / 2);
  left: var(--pos);
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: #222;
  transition: 300ms;
`;

const Mode = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 24px;
  transition: 300ms;
`;

export const ModeTrain = styled(Mode)`
  right: var(--right);
`;

export const ModePlay = styled(Mode)`
  left: var(--left);
`;
