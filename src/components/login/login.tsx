import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Modal } from 'components/modal/modal';
import { useModalContext } from 'components/modal/modal-context';
import { authService } from 'services/rest-api/auth';

import {
  BtnCancel,
  BtnLogin,
  ErrorMsg,
  ErrorWrapper,
  Form,
  Input,
  InputWrapper,
  Label,
  Wrapper,
} from './login-style';

const TITLE = 'Login';
const INPUT_PLACEHOLDER = 'admin';

export const Login: React.FC = () => {
  const { setModalShow } = useModalContext();
  const [isUsernameError, setUsernameError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginRequest, setLoginRequest] = useState(false);
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const history = useHistory();

  const onLogin = () => {
    setModalShow(false);
    history.push('/admin');
  };

  const handleCancel = () => {
    setUsername('');
    setPassword('');
    setErrorMsg('');
    setUsernameError(false);
    setPasswordError(false);
  };

  const handleUsernameInput: React.FormEventHandler<HTMLInputElement> = (event) => {
    setUsername(event.currentTarget.value);
    setUsernameError(!usernameRef.current?.reportValidity());
  };

  const handlePasswordInput: React.FormEventHandler<HTMLInputElement> = (event) => {
    setPassword(event.currentTarget.value);
    setPasswordError(!passwordRef.current?.reportValidity());
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!formRef.current?.reportValidity()) {
      event.preventDefault();
      setUsernameError(!usernameRef.current?.reportValidity());
      setPasswordError(!passwordRef.current?.reportValidity());
    }
  };

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!username || !password) return;
    setLoginRequest(true);
    const result = await authService.login({ username, password });
    if (result.data) {
      setErrorMsg('');
      onLogin();
    } else if (result.errorData) {
      setErrorMsg(JSON.stringify(result.errorData));
    }
    setLoginRequest(false);
  };

  const usernameId = 'username';
  const passwordId = 'password';
  const loginFormId = 'login-form';

  const footer = (
    <>
      <BtnCancel type="button" disabled={isLoginRequest} onClick={handleCancel}>
        Cancel
      </BtnCancel>
      <BtnLogin type="submit" disabled={isLoginRequest} form={loginFormId} onClick={handleSubmit}>
        Login
      </BtnLogin>
    </>
  );

  return (
    <Modal title={TITLE} footer={footer}>
      <Form id={loginFormId} onSubmit={handleLogin} ref={formRef}>
        <Wrapper>
          <InputWrapper>
            <Label htmlFor={usernameId}>username</Label>
            <Input
              onInput={handleUsernameInput}
              type="text"
              value={username}
              placeholder={INPUT_PLACEHOLDER}
              required
              id={usernameId}
              isError={isUsernameError}
              ref={usernameRef}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor={passwordId}>password</Label>
            <Input
              onInput={handlePasswordInput}
              type="password"
              value={password}
              placeholder={INPUT_PLACEHOLDER}
              required
              id={passwordId}
              isError={isPasswordError}
              ref={passwordRef}
            />
          </InputWrapper>
          <ErrorWrapper>{errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}</ErrorWrapper>
        </Wrapper>
      </Form>
    </Modal>
  );
};
