import clsx from 'clsx';
import { ArrowDown, ArrowLeft, ChevronsRight } from 'lucide-react';
import { type AnimationEvent, useState } from 'react';

import { useAppStore } from '@/shared/store';

import { slides } from './config.ts';
import styles from './IntroSlider.module.css';
import { IntroSliderContent } from './IntroSliderContent.tsx';
import { IntroSliderTrack } from './IntroSliderTrack.tsx';

export const IntroSlider = () => {
  const [isClose, setIsClose] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const setShowIntro = useAppStore((state) => state.setShowIntro);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => {
      if (prevSlide === slides.length - 1) {
        setIsClose(true);
        return prevSlide;
      }

      return prevSlide + 1;
    });
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => {
      if (prevSlide === 0) {
        return 0;
      }

      return prevSlide - 1;
    });
  };

  const handleCloseIntro = (e: AnimationEvent) => {
    if (e.target === e.currentTarget && currentSlide === slides.length - 1) {
      setShowIntro(false);
    }
  };

  return (
    <section
      className={clsx(styles.container, isClose && styles.containerClose)}
      onAnimationEnd={handleCloseIntro}
    >
      <IntroSliderTrack slides={slides} currentSlide={currentSlide} />
      <IntroSliderContent slides={slides} currentSlide={currentSlide} />
      <div className={styles.footer}>
        <button
          type='button'
          disabled={currentSlide === 0}
          className={styles.btnPrev}
          onClick={handlePrev}
        >
          <ArrowLeft className={styles.arrow} />
          <span>{'назад'}</span>
        </button>
        <button type='button' className={styles.btnNext} onClick={handleNext}>
          {currentSlide === 0 && (
            <ArrowDown size={24} color={'#fff'} className={styles.arrowBounce} />
          )}
          <span>{currentSlide === slides.length - 1 ? 'Начать' : 'Далее'}</span>
          <ChevronsRight className={styles.arrow} />
        </button>
      </div>
    </section>
  );
};
