import { useEffect } from 'react';

import { updateSessionTime } from '../api/update-session-time';

const SECONDS = 10;

export const useQuizSessionTimer = (sessionId) => {
  useEffect(() => {
    if (!sessionId) return;

    const intervalId = setInterval(() => {
      updateSessionTime({ sessionId, seconds: SECONDS });
    }, SECONDS * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [sessionId]);
};
