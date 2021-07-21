import React from 'react';

import {
  BtnBottomContainer,
  BtnCancel,
  BtnUpdate,
  Form,
  Wrapper,
} from 'components/admin-card/card-style';
import { useMountedState } from 'utils/is-mounted-hook';

enum ControlName {
  BTN_CREATE = 'Create',
  BTN_UPDATE = 'Update',
  BTN_CANCEL = 'Cancel',
}

interface Props {
  isCreator?: boolean;
  canUpdate: boolean;
  onCancel: () => void;
  onSubmit: () => Promise<void>;
}

export const CardEditor: React.FC<Props> = ({
  isCreator,
  canUpdate,
  onCancel,
  onSubmit,
  children,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isLoading, setLoading] = React.useState(false);
  const isMounted = useMountedState(() => setLoading(false));

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    if (!formRef.current || !formRef.current.reportValidity()) {
      event.preventDefault();
      return;
    }
    setLoading(true);
    await onSubmit();
    isMounted && setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <Wrapper isLoading={isLoading}>
        {children}
        <BtnBottomContainer>
          <BtnCancel type="button" onClick={onCancel}>
            {ControlName.BTN_CANCEL}
          </BtnCancel>
          <BtnUpdate type="submit" disabled={!canUpdate}>
            {isCreator ? ControlName.BTN_CREATE : ControlName.BTN_UPDATE}
          </BtnUpdate>
        </BtnBottomContainer>
      </Wrapper>
    </Form>
  );
};
