import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import styles from './quiz-session-timer.module.css'

interface IProps {
  timeSpent: RefObject<number>
}

export const QuizSessionTimer = ({ timeSpent }: IProps) => {
  const initialSeconds = timeSpent?.current || 0
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  // eslint-disable-next-line react-hooks/purity
  const startTimeRef = useRef(performance.now() - initialSeconds * 1000);
  const animationRef = useRef<number | null>(null);

  const updateTimer = useCallback((timestamp: number) => {
    const elapsedMilliseconds = timestamp - startTimeRef.current;
    const currentSeconds = Math.floor(elapsedMilliseconds / 1000);

    if (currentSeconds !== totalSeconds) {
      // eslint-disable-next-line react-hooks/immutability
      if (timeSpent?.current !== undefined) timeSpent.current = currentSeconds;
      setTotalSeconds(currentSeconds);
    }

    // eslint-disable-next-line react-hooks/immutability
    animationRef.current = requestAnimationFrame(updateTimer);
  }, [totalSeconds]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(updateTimer);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateTimer]);

  const formatTime = useCallback((seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const pad = (num: number) => num.toString().padStart(2, '0');

    return `${hrs ? `${pad(hrs)}:` : ''}${pad(mins)}:${pad(secs)}`;
  }, []);

  return (
    <div className={styles.timer}>
      {formatTime(totalSeconds)}
    </div>
  )
}
