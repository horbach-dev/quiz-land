import { useCallback, useEffect, useState } from 'react';

interface IProps {
  totalSteps: number;
  initialStep: number;
  transitionDelay?: number;
  onEndReached?: () => void;
}

export function useSessionNavigation({
  totalSteps,
  initialStep = 0,
  transitionDelay = 300,
  onEndReached,
}: IProps) {
  const [step, setStep] = useState(initialStep);
  const [isTransition, setIsTransition] = useState(false);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, [step]);

  const goToNextStep = useCallback(() => {
    if (isTransition) return;

    if (step === totalSteps - 1) {
      onEndReached?.();
      return;
    }

    setIsTransition(true);
    setTimeout(() => {
      setIsTransition(false);
      setStep((prevStep) => prevStep + 1);
    }, transitionDelay);
  }, [step, totalSteps, isTransition, transitionDelay, onEndReached]);

  const goToPrevStep = useCallback(() => {
    if (isTransition) return;
    if (step === 0) return;

    setIsTransition(true);
    setTimeout(() => {
      setIsTransition(false);
      setStep((prevStep) => prevStep - 1);
    }, transitionDelay);
  }, [step, isTransition, transitionDelay]);

  return {
    step,
    isTransition,
    goToNextStep,
    goToPrevStep,
  };
}
