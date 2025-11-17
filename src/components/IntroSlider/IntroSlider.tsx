import { useState, type AnimationEvent } from "react";
import { useAppStore } from "@/stores/appStore";
import clsx from "clsx";
import { ArrowLeft, ArrowDown, ChevronsRight } from "lucide-react";
import { IntroSliderContent } from "./IntroSliderContent";
import { IntroSliderTrack } from "./IntroSliderTrack";
import { slides } from "./config";
import styles from "./IntroSlider.module.css";

export const IntroSlider = () => {
  const [isClose, setIsClose] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const appStore = useAppStore();

  const handleNext = () => {
    setCurrentSlide(prevSlide => {
      if (prevSlide === slides.length - 1) {
        setIsClose(true)
        return prevSlide;
      }

      return prevSlide + 1;
    });
  }

  const handlePrev = () => {
    setCurrentSlide(prevSlide => {
      if (prevSlide === 0) {
        return 0
      }

      return prevSlide - 1
    });
  }

  const handleCloseIntro = (e: AnimationEvent) => {
    if (e.target === e.currentTarget && currentSlide === slides.length - 1) {
      appStore.setIntro(false)
    }
  }

  return (
    <section
      className={
        clsx(
          styles.container,
          isClose && styles.containerClose,
          appStore.intro.withAnimation && styles.containerWithAnimation
        )
    }
      onAnimationEnd={handleCloseIntro}
    >
      <IntroSliderTrack
        slides={slides}
        currentSlide={currentSlide}
      />
      <IntroSliderContent
        slides={slides}
        currentSlide={currentSlide}
      />
      <div className={styles.footer}>
        <button
          disabled={currentSlide === 0}
          className={styles.btnPrev}
          onClick={handlePrev}
        >
          <ArrowLeft className={styles.arrow} />
          <span>{'назад'}</span>
        </button>
        <button className={styles.btnNext} onClick={handleNext}>
          {currentSlide === 0 && (
            <ArrowDown
              size={24}
              color={'#fff'}
              className={styles.arrowBounce}
            />
          )}
          <span>{currentSlide === slides.length - 1 ? 'Начать': 'Далее'}</span>
          <ChevronsRight className={styles.arrow} />
        </button>
      </div>
    </section>
  )
}
