import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 40px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  justify-content: center;

  @media (max-width: 800px) {
    padding: 40px 25px;
  }
  @media (max-width: 600px) {
    padding: 40px 15px;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
  }
`;
