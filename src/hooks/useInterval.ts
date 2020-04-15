import { useRef, useEffect } from 'react';

/**
 * Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export default function useInterval(callback: Function | undefined, delay: number | null) {
  const savedCallback: any = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
