import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import styles from "./create-quiz-form.module.css";
import {FieldError} from "@/shared/shadcn/ui/field.tsx";
import {Button} from "@/shared/components/Button";
import {BadgePlus} from "lucide-react";
import clsx from "clsx";

const portalContainer = document.getElementById("footer")!;

export const CreateQuizFormSubmit = ({ formRef, isDisabled, isLoading, onSubmit }) => {
  const [isShow, setIsShow] = useState<boolean>(true);

  useEffect(() => {
    const checkFocus = () => {
      const isInput =
        document.activeElement?.tagName === 'INPUT' &&
        document.activeElement?.getAttribute('type') !== 'file';
      const isTextArea = document.activeElement?.tagName === 'TEXTAREA';

      const isHide =
        formRef.current &&
        (isInput || isTextArea) &&
        formRef.current.contains(document.activeElement)

      setIsShow(!isHide)
    }

    const formElement = formRef.current;
    if (formElement) {
      formElement.addEventListener('focusin', checkFocus);
      formElement.addEventListener('focusout', checkFocus);
    }

    // Очищаем слушатели при размонтировании компонента
    return () => {
      if (formElement) {
        formElement.removeEventListener('focusin', checkFocus);
        formElement.removeEventListener('focusout', checkFocus);
      }
    };
  }, []);

  return createPortal(
    <div className={clsx(styles.footer, isShow && styles.footerShow)}>
      {isDisabled && (
        <FieldError>
          Проверьте поля на ошибки
        </FieldError>
      )}
      <Button
        className={styles.button}
        loading={isLoading}
        disabled={isDisabled}
        type='submit'
        onClick={onSubmit}
        after={<BadgePlus />}
      >
        Создать квиз
      </Button>
    </div>,
    portalContainer
  )
}
