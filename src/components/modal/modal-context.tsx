import React from 'react';

import { ModalBox, ModalLayer } from 'components/modal/modal-style';

interface IModalContext {
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent: React.Dispatch<React.SetStateAction<JSX.Element | string>>;
}

const ModalContext = React.createContext<IModalContext | undefined>(undefined);

export const ModalContextProvider: React.FC = ({ children }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<JSX.Element | string>('');
  const ref = React.useRef<HTMLElement>(null);

  const initialValue: IModalContext = {
    modalShow,
    setModalShow,
    setModalContent,
  };

  const handleExternalClose = (event: React.MouseEvent<HTMLElement>) => {
    if (ref.current && ref.current.contains(event.target as Node)) return;
    setModalShow(false);
  };

  React.useEffect(() => {
    document.body.classList.toggle('modal', modalShow);
  }, [modalShow]);

  return (
    <ModalContext.Provider value={initialValue}>
      {children}
      <ModalLayer show={modalShow} onClick={handleExternalClose} />
      <ModalBox show={modalShow} ref={ref}>
        {modalContent}
      </ModalBox>
    </ModalContext.Provider>
  );
};

export const useModalContext = (): IModalContext => {
  const context = React.useContext(ModalContext);

  if (context === undefined) {
    throw Error('ModalContext must be used inside of a ModalContextProvider');
  }

  return context;
};
