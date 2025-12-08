export const validateDescription =
  (t) =>
  (value = '') => {
    if (!value) {
      return t('validation.required');
    }

    if (value.length < 50) {
      return t('validation.min_length', { value: 50 });
    }

    const length = value
      .replace(/<[^>]*>?/gm, '')
      .replace(/\n\s*\n/g, '\n').length;

    if (length > 3000) {
      return t('validation.length_limit', { value: length - 3000 });
    }
    return true;
  };
