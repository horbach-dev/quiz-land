import {useState} from "react";
import clsx from "clsx";
import styles from "./image.module.css";

interface IProps {
  image: string | null;
  title: string;
  placeholder?: string;
}

export const ImageWithLoading = ({ image, title, placeholder }: IProps) => {
  const [currentImage, setCurrentImage] = useState(image)
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={clsx(styles.container, isLoading && styles.containerLoading)}>
      {image && (
        <img
          className={clsx(styles.image, !isLoading && styles.imageLoaded)}
          src={currentImage || image}
          alt={title}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            if (placeholder) {
              setIsLoading(true)
              setCurrentImage(placeholder)
            } else {
              setIsLoading(false)
            }
          }}
        />
      )}
    </div>
  )
}
