export const validateDescription = (value = '') => {
  if (!value) {
    return 'Обязательное поле';
  }

  if (value.length < 50) {
    return 'Минимальное кол-во символов: 50';
  }

  const length = value.replace(/<[^>]*>?/gm, '').replace(/\n\s*\n/g, '\n').length;

  if (length > 3000) {
    return `Превышен лимит символов на ${length - 3000} шт.`;
  }
  return true;
};
