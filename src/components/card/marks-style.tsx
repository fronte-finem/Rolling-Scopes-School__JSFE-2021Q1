import styled from 'styled-components';

export const MarksList = styled.ul<{ show: boolean }>`
  width: 100%;
  height: 50px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 10px;
  padding: 0 5px;

  background: #0004;
  border-radius: 25px;
  opacity: ${({ show }) => (show ? '1' : '0')};
  pointer-events: none;
`;

export const MarkItem = styled.li`
  --size: 40px;
  flex: 0 0 var(--size);
  width: var(--size);
  height: var(--size);
`;
