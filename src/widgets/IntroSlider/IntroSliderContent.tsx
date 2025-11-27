import clsx from "clsx";
import styles from "./IntroSlider.module.css";

interface IProps {
  slides: any[]
  currentSlide: number
}

export const IntroSliderContent = ({ slides, currentSlide }: IProps) => {
  return (
    <div
      style={{
        width: `${slides.length * 100}%`,
        transform: `translateX(-${currentSlide * 100}vw)`
      }}
      className={styles.slider}
    >
      {slides.map((item, idx) => (
        <div
          key={item.id}
          className={styles.sliderItem}
        >
          <img
            alt={item.title}
            className={styles.sliderImage}
            src={item.image}
          />
          <div className={clsx(styles.sliderInfo, currentSlide === idx && styles.sliderInfoShow)}>
            <p className={styles.sliderItemTitle}>
              {item.title}
            </p>
            <p
              className={styles.sliderItemDescription}
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
