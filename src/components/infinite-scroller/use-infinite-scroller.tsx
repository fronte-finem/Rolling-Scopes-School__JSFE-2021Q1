import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { delay } from 'utils/async';

interface Config {
  delayTime?: number;
  minCount: number;
  getSize: () => number;
}

interface Hooks {
  loadMore: () => Promise<void>;
  itemsCount: number;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
}

const DEFAULT_DELAY_TIME = 100;

export function useInfiniteScroller({
  delayTime = DEFAULT_DELAY_TIME,
  minCount,
  getSize,
}: Config): Hooks {
  const [itemsCount, setItemsCount] = useState(minCount);
  const location = useLocation();

  const loadMore = async () => {
    if (itemsCount >= getSize()) return;
    await delay(delayTime);
    setItemsCount(itemsCount + minCount);
  };

  useEffect(() => {
    setItemsCount(minCount);
  }, [location]);

  return { loadMore, itemsCount, setItemsCount };
}
