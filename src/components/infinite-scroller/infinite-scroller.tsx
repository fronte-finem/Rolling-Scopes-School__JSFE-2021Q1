import React, { useEffect, useRef, useState } from 'react';

import { Container, Loading } from 'components/infinite-scroller/infinite-scroller-style';

interface InfiniteScrollerProps {
  height: string;
  loadMore: () => Promise<void>;
}

export const InfiniteScroller: React.FC<InfiniteScrollerProps> = ({
  height,
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
      {children}
      <Loading ref={loadingRef} isLoading={isLoading}>
        <span>Loading...</span>
      </Loading>
    </Container>
  );
};
