import React from 'react';

export function useMountedState(onUnmount: () => void): boolean {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      onUnmount();
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
}
