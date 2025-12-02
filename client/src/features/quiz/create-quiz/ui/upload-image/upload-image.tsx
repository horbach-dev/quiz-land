import { Field, FieldDescription, FieldError, FieldLabel } from "@/shared/shadcn/ui/field";
import { UploadInput } from "@/shared/ui/upload-input";
import { uploadQuizImage } from "@/features/quiz/api/upload-quiz-image";
import { deleteQuizImage } from "@/features/quiz/api/delete-quiz-image";
import {useEffect, useState} from "react";
import {BASE_URL} from "@/constants.ts";
import {Button} from "@/shared/ui/Button";
import {Trash2, Images} from "lucide-react";
import styles from './upload-image.module.css'

interface IProps {
  id: string;
  label: string;
  description: string;
  error?: string;
  onChange: (value: string | null) => void;
}

export const UploadImageField = ({ id, label, description, error: formError, onChange }: IProps) => {
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (formError) setError(formError)
  }, [formError])

  const uploadPoster = ({ target }) => {
    setError(null);
    const file = target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'poster');

      uploadQuizImage(formData, setProgress).then((result) => {
        onChange(result.fileName);
        setImage(result.tempPath);
      }).catch((err) => {
        setError(err.response?.data?.message);
      })
    }
  }

  const deleteImage = async () => {
    if (image) {
      onChange(null);
      setIsDeleting(true);
      deleteQuizImage(image)
        .then(() => setImage(null))
        .finally(() => setIsDeleting(false))
    }
  }

  const isShowProgress = progress > 0 && progress !== 100

  return (
    <Field>
      <FieldLabel htmlFor={id}>
        {label}
      </FieldLabel>

      <div className={styles.content}>
        {image ? (
          <div className={styles.image}>
            <img
              src={BASE_URL + image}
              alt='Постер'
            />
            <Button
              size='sm'
              loading={isDeleting}
              onClick={deleteImage}
              after={<Trash2 />}
            >
              Удалить изображение
            </Button>
          </div>
        ) : (
          <UploadInput
            id={id}
            onChange={uploadPoster}
          />
        )}

        {isShowProgress && (
          <div className={styles.progress}>
            <p>Загрузка {progress} %</p>
            <span style={{ width: `${progress}%` }} />
          </div>
        )}

        {!image && !isShowProgress && (
          <div className={styles.preview}>
            <Images />
            <p>Загрузить из галереи</p>
          </div>
        )}
      </div>

      {error ? (
        <FieldError>
          {error}
        </FieldError>
      ) : (
        <FieldDescription>
          {description}
        </FieldDescription>
      )}
    </Field>
  )
}
