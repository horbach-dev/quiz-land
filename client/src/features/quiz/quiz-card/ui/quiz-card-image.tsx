import {useState} from "react";
import clsx from "clsx";
import styles from './quiz-card.module.css'

const loadedImages = new Set()

export const QuizCardImage = ({ title, image }) => {
  const [isImageLoaded, setImageLoaded] = useState(loadedImages.has(image));

  if (!image) return null;

  return (
    <div className={clsx(styles.image, isImageLoaded && styles.imageLoaded)}>
      <img
        alt={title}
        src={image}
        loading='lazy'
        onLoad={() => {
          loadedImages.add(image);
          setImageLoaded(true)
        }}
        onError={() => setImageLoaded(false)}
      />
    </div>
  )
}
