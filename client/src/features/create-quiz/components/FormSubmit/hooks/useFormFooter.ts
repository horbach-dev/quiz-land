import { useEffect, useState } from 'react';

export const useFormFooter = (formRef) => {
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
        formRef.current.contains(document.activeElement);

      setIsShow(!isHide);
    };

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
    // eslint-disable-next-line
  }, []);

  return { isShow };
};
