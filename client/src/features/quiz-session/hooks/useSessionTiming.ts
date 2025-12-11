import { useEffect, useRef } from 'react';

import { updateSessionTime } from '../api/update-session-time';

export function useSessionTiming(sessionId?: string, initialTime: number = 0) {
  const timeSpent = useRef(initialTime);

  useEffect(() => {
    if (!sessionId) return;

    return () => {
      if (sessionId) {
        updateSessionTime({
          sessionId: sessionId,
          // eslint-disable-next-line react-hooks/exhaustive-deps
          seconds: timeSpent.current,
        }).catch(() => {});
      }
    };
  }, [sessionId]);

  return { timeSpent };
}
