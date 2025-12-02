import { type ChangeEventHandler } from "react";
import styles from './upload-input.module.css'

// type TChangeParams = {
//   event: ChangeEvent<HTMLInputElement>,
//   onProgress?: (progress: number) => void
//   onCancel?: () => void
//   onImage?: (image: string) => void
//   onDelete?: (callback: (v: string) => Promise<void>) => void
// }

interface IProps {
  id?: string
  name?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const UploadInput = ({ id, name, onChange }: IProps) => {
  return (
    <div className={styles.uploadInput}>
      <input
        id={id}
        type="file"
        name={name}
        onChange={onChange}
        accept="image/png, image/jpeg, image/jpg"
      />
    </div>
  )
}
