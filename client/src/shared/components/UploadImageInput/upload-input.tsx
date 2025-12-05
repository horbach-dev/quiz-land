import {type ChangeEvent, useRef, useState} from "react";
import styles from './upload-input.module.css'
import {Images, Trash2} from "lucide-react";
import {Button} from "@/shared/components/Button";

interface IProps {
  id?: string
  name?: string
  onDelete?: () => void
  onChange: (
    file: File,
    onProgress: (value: number) => void,
    onLoaded: () => void
  ) => void
}

export const UploadImageInput = ({ id, name, onDelete, onChange }: IProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [progress, setProgress] = useState<number | null>(0);

  const handleDelete = () => {
    if (inputRef.current?.value) inputRef.current.value = ''
    setImage(null)
    setProgress(0)
    onDelete?.()
  }

  const onLoaded = () => {
    setProgress(0)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProgress(0)
    const file = e.target.files?.[0]
    const reader = new FileReader()

    if (file) {
      reader.onload = function(e) {
        if (e.target?.result) setImage(e.target.result)
      };

      reader.readAsDataURL(file);
      onChange(file, setProgress, onLoaded)
    }
  }

  return (
    <div className={styles.uploadInput}>
      <div className={styles.uploadInputContent}>
        <input
          id={id}
          type="file"
          name={name}
          disabled={!!image}
          ref={inputRef}
          onChange={handleChange}
          accept="image/png, image/jpeg, image/jpg"
        />

        <div className={styles.uploadInputPreview}>
          <Images className={styles.uploadInputIcon} />
          <p>Загрузить изображение</p>
        </div>

        {image && (
          <img
            className={styles.uploadInputImage}
            src={image as string}
            alt={name}
          />
        )}

        {!!progress && (
          <div className={styles.uploadInputProgress}>
            <p>Загрузка {progress} %</p>
            <span style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {image && (
        <Button
          size='sm'
          after={<Trash2 />}
          className={styles.uploadInputDelete}
          onClick={handleDelete}
        >
          Удалить изображение
        </Button>
      )}
    </div>
  )
}
