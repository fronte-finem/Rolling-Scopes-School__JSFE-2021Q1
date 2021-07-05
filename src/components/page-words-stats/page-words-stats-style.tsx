import styled from 'styled-components';

export const Btn = styled.button`
  width: 300px;
  height: 50px;
  border: none;
  background: #0008;
  color: #fff;
  text-transform: capitalize;
  transition: all 200ms;

  &:hover {
    background: #000a;
  }
  &:active {
    background: #000d;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  width: 100%;
  padding: 20px 0;

  @media (max-width: 800px) {
    flex-direction: column;
    row-gap: 20px;
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 50px;

  @media (max-width: 800px) {
    padding: 50px 25px;
  }
  @media (max-width: 600px) {
    padding: 50px 15px;
  }
  @media (max-width: 400px) {
    padding: 50px 5px;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  height: 70vh;

  &::-webkit-scrollbar {
    width: 16px;
    height: 16px;
    padding: 2px;
  }

  &::-webkit-scrollbar-track {
    background-color: #0002;
  }

  &::-webkit-scrollbar-thumb {
    background: #0004;
    box-shadow: inset 0 0 5px #0008;
    &:hover {
      background: #0006;
    }
    &:active {
      background: #0008;
    }
  }
  &::-webkit-scrollbar-corner {
    background: #fff0;
  }
`;
