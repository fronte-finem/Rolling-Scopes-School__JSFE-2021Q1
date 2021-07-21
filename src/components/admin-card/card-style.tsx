import styled, { css, keyframes } from 'styled-components';

import { button } from 'components/button/button-style';

export const StyledCard = styled.div<{ big?: boolean }>`
  position: relative;
  width: 300px;
  height: ${({ big }) => (big ? '400px' : '300px')};
  border: 1px solid #0008;
  border-radius: 20px;
  background: #0004;
  backdrop-filter: blur(5px);
  overflow: hidden;
`;

const moveBg = keyframes`
  0% {
    background-position: 0 0;
  }
  0% {
    background-position: 40px 40px;
  }
`;

interface WrapperProps {
  isLoading: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'unset')};
  opacity: ${({ isLoading }) => (isLoading ? '0.5' : '1')};

  &::after {
    --a: 1s ${moveBg} infinite linear;

    pointer-events: ${({ isLoading }) => (isLoading ? 'unset' : 'none')};
    opacity: ${({ isLoading }) => (isLoading ? '1' : '0')};
    animation: ${({ isLoading }) => (isLoading ? 'var(--a)' : 'unset')};

    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: repeating-linear-gradient(90deg, #fff8 0% 50%, #0008 50% 100%);
    background-position: 0 0;
    background-size: 40px 40px;
  }
`;

export const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  width: 100%;
  padding: 0 20px;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  padding: 0 20px;
`;

export const CategoryName = styled.h2`
  text-align: center;
`;

export const ImageContainer = styled.div`
  z-index: -1;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  aspect-ratio: 1 / 1;
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  mask: linear-gradient(#fff0, #fff 20% 80%, #fff0);
`;

export const DescriptionContainer = styled.dl`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  padding: 0 10px;
`;

const wrapper = css`
  padding: 5px 10px;
  border-radius: 10px;
  color: #fff;
  background: #0002;
  backdrop-filter: blur(2px);
`;

export const DescriptionWrapper = styled.div`
  ${wrapper};
`;

export const AudioWrapper = styled.div`
  ${wrapper};
  cursor: pointer;
  background: #8088;
  transition: all 200ms;
  &:hover {
    background: #c0c8;
  }
  &:active {
    background: #f0f8;
  }
`;

const outline = css`
  --x: 1px var(--с);
  text-shadow: -1px -1px var(--x), 1px -1px var(--x), -1px 1px var(--x), 1px 1px var(--x);
`;

export const DescriptionTerm = styled.dt`
  --с: #fff4;
  ${outline};
  font-size: 24px;
  font-weight: bold;
  color: #111;
  font-family: monospace;
  user-select: none;
`;

export const DescriptionValue = styled.dd`
  --с: #0008;
  ${outline};
  text-align: center;
  font-size: 30px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BtnCloseContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const BtnBottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  background: linear-gradient(#fff0, #0008);
`;

export const Form = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  padding: 0 10px;
`;

export const InputGroup = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  font-size: 20px;
  font-family: monospace;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 20px;
  font-family: sans-serif;
`;

const btn = css`
  ${button};
  --fg: #fff;
  --fg-hover: #fff;
  --fg-active: #111;
  width: 120px;
  height: 30px;
`;

export const BtnUpdate = styled.button`
  ${btn};
  --bg: #f80;
  --bg-hover: #fa0;
  --bg-active: #ff0;
`;

export const BtnAddWord = styled.button`
  ${btn};
  --bg: #08f;
  --bg-hover: #0af;
  --bg-active: #0ff;
`;

export const BtnCancel = styled.button`
  ${btn};
  --bg: #f44;
  --bg-hover: #f66;
  --bg-active: #f88;
`;

export const BtnLogin = styled.button`
  ${btn};
  --bg: #084;
  --bg-hover: #0a4;
  --bg-active: #0f4;
`;
