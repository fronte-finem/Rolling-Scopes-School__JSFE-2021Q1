import React from 'react';

import { BtnClose } from 'components/button/button';

import { useModalContext } from './modal-context';
import { BtnCloseContainer, ModalBody, ModalFooter, ModalHeader } from './modal-style';

interface ModalProps {
  title: string;
  footer?: JSX.Element;
}

export const Modal: React.FC<ModalProps> = ({ title, children, footer }) => {
  const { setModalShow } = useModalContext();

  const handleClose = () => setModalShow(false);

  return (
    <>
      <ModalHeader>
        <h3>{title}</h3>
        <BtnCloseContainer>
          <BtnClose onClick={handleClose} />
        </BtnCloseContainer>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{footer}</ModalFooter>
    </>
  );
};
