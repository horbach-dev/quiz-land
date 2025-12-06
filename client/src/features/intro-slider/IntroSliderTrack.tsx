import clsx from 'clsx';

import styles from './IntroSlider.module.css';

interface IProps {
  slides: any[];
  currentSlide: number;
}

export const IntroSliderTrack = ({ slides, currentSlide }: IProps) => {
  return (
    <div style={{ gridTemplateColumns: `repeat(${slides.length}, 1fr)` }} className={styles.track}>
      {slides.map((slide, idx) => {
        const isFill = currentSlide >= idx;

        return (
          <div key={slide.id} className={styles.trackItem}>
            <span
              className={clsx(styles.trackItemProgress, isFill && styles.trackItemProgressFill)}
            />
          </div>
        );
      })}
    </div>
  );
};
