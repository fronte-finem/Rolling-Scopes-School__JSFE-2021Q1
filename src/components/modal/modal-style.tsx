import styled from 'styled-components';

interface ModalLayerProps {
  readonly show?: boolean;
}

const TRANSITION = '500ms';

export const ModalLayer = styled.div<ModalLayerProps>`
  --opacity: ${({ show }) => (show ? '1' : '0')};
  --pointer-events: ${({ show }) => (show ? 'all' : 'none')};

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  background: #000a;
  backdrop-filter: blur(10px);
  opacity: var(--opacity);
  pointer-events: var(--pointer-events);

  transition: all ${TRANSITION} linear;
`;

export const ModalBox = styled.section<ModalLayerProps>`
  --pos: ${({ show }) => (show ? '50%' : '-50%')};
  --c1: #08f;
  --c2: #024;

  position: fixed;
  top: var(--pos);
  left: 50%;
  min-width: 300px;
  width: min(calc(100% - 40px), 500px);
  transform: translate(-50%, -50%);
  z-index: 11;
  background: var(--c1);
  color: var(--c2);
  clip-path: inset(0% 0% 0% 0% round 20px);

  transition: all ${TRANSITION};
`;

export const ModalHeader = styled.header`
  position: relative;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--c2);
  color: var(--c1);
`;

export const ModalBody = styled.div`
  height: 300px;
  padding: 20px 20px;
`;

export const ModalFooter = styled.footer`
  height: 50px;
  background: var(--c2);
  color: var(--c1);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const BtnCloseContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;
