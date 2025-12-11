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
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, [step]);

  const goToNextStep = useCallback(() => {
    if (isHide) return;

    if (step === totalSteps - 1) {
      onEndReached?.();
      return;
    }

    setIsHide(true);
    setTimeout(() => {
      setIsHide(false);
      setStep((prevStep) => prevStep + 1);
    }, transitionDelay);
  }, [step, totalSteps, isHide, transitionDelay, onEndReached]);

  const goToPrevStep = useCallback(() => {
    if (isHide) return;
    if (step === 0) return;

    setIsHide(true);
    setTimeout(() => {
      setIsHide(false);
      setStep((prevStep) => prevStep - 1);
    }, transitionDelay);
  }, [step, isHide, transitionDelay]);

  return {
    step,
    isHide,
    goToNextStep,
    goToPrevStep,
  };
}
