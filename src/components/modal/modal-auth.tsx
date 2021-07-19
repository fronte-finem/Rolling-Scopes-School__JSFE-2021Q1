import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { button } from 'components/button/button-style';
import { Modal } from 'components/modal/modal';
import { useModalContext } from 'components/modal/modal-context';
import { RestApiResponse } from 'services/rest-api/axios-response';

export const BtnSubmit = styled.button`
  ${button};
  --fg: #fff;
  --fg-hover: #fff;
  --fg-active: #111;
  --bg: #084;
  --bg-hover: #0a4;
  --bg-active: #0f4;
  width: 120px;
  height: 30px;
`;

export const AuthErrorModal: React.FC = () => {
  const { setModalShow } = useModalContext();
  const history = useHistory();

  const onSubmit = () => {
    setModalShow(false);
  };

  useEffect(() => {
    return () => history.push('/');
  }, []);

  const footer = (
    <>
      <BtnSubmit type="button" onClick={onSubmit}>
        OK
      </BtnSubmit>
    </>
  );

  return (
    <Modal title="Auth Error" footer={footer}>
      <h2>Access token expired or invalid 😔</h2>
      <p>Admin mode closed...</p>
    </Modal>
  );
};

type DispatchRestApiResponse = React.Dispatch<
  React.SetStateAction<RestApiResponse<unknown> | null>
>;

export const useAuthTestHook = (): { setRestApiError: DispatchRestApiResponse } => {
  const { setModalShow, setModalContent } = useModalContext();
  const [restApiError, setRestApiError] = useState<null | RestApiResponse<unknown>>(null);

  useEffect(() => {
    if (restApiError?.isErrorToken) {
      setModalContent(<AuthErrorModal />);
      setModalShow(true);
    }
  }, [restApiError]);

  return { setRestApiError };
};
