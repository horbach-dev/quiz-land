import { useState } from "react";
import clsx from "clsx";
import placeholderImg from './placeholder.jpg';
import styles from './poster.module.css';

interface IProps {
  image?: string;
  title?: string;
}

export const Poster = ({ image, title }: IProps) => {
  const [currentImage, setCurrentImage] = useState(image)
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={clsx(styles.poster, isLoading && styles.posterLoading)}>
      {image && (
        <img
          className={clsx(styles.image, !isLoading && styles.imageLoaded)}
          src={currentImage || image}
          alt={title}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(true)
            setCurrentImage(placeholderImg)
          }}
        />
      )}
    </div>
  )
}
