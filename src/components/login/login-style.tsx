import styled, { css } from 'styled-components';

import { button } from 'components/button/button-style';

export const Form = styled.form`
  width: 100%;
  height: 100%;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, auto) 1fr;
  row-gap: 20px;
  width: 100%;
  height: 100%;
`;

export const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, auto);
  column-gap: 10px;
  row-gap: 10px;
`;

export const Label = styled.label`
  display: block;
`;

export const Input = styled.input<{ isError: boolean }>`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 0;
  outline: 0;
  font-size: 30px;

  background: ${({ isError }) => (isError ? '#f84' : '#fff')};
  box-shadow: 0 0 0 5px ${({ isError }) => (isError ? '#0004' : '#fff1')};

  &::placeholder {
    color: #0004;
  }
`;

export const ErrorWrapper = styled.div`
  align-self: flex-end;
`;

export const ErrorMsg = styled.div`
  color: #f00;
`;

const btn = css`
  ${button};
  --fg: #fff;
  --fg-hover: #fff;
  --fg-active: #111;
  width: 120px;
  height: 30px;
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
