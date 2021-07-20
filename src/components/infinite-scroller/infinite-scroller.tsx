import React, { useEffect, useRef, useState } from 'react';

import {
  Container,
  HaveMore,
  Loading,
  ShadowLayer,
  WrapperLayer,
} from 'components/infinite-scroller/infinite-scroller-style';
import { SvgIcon } from 'components/svg-icon/svg-icon';

interface InfiniteScrollerProps {
  height: string;
  haveMore: boolean;
  loadMore: () => Promise<void>;
}

export const InfiniteScroller: React.FC<InfiniteScrollerProps> = ({
  height,
  haveMore,
  loadMore,
  children,
}) => {
  const [isLoading, setLoading] = useState(false);
  const loadingRef = useRef<HTMLDivElement>(null);

  const intersectionObserver = new IntersectionObserver(
    async (entries: IntersectionObserverEntry[]) => {
      if (entries.length === 0 || !entries[0].isIntersecting) return;
      setLoading(true);
      await loadMore();
      setLoading(false);
    }
  );

  useEffect(() => {
    if (loadingRef.current) intersectionObserver.observe(loadingRef.current);

    return () => {
      if (loadingRef.current) intersectionObserver.unobserve(loadingRef.current);
      intersectionObserver.disconnect();
    };
  }, [loadMore]);

  return (
    <Container height={height}>
      <WrapperLayer>
        <ShadowLayer height={height}>
          {haveMore && (
            <>
              <HaveMore isLeft>
                <SvgIcon src="./svg/sprite.svg" name="icon-arrow-down" />
              </HaveMore>
              <HaveMore isRight>
                <SvgIcon src="./svg/sprite.svg" name="icon-arrow-down" />
              </HaveMore>
            </>
          )}
        </ShadowLayer>
      </WrapperLayer>
      {children}
      <Loading ref={loadingRef} isLoading={isLoading}>
        <span>Loading...</span>
      </Loading>
    </Container>
  );
};
