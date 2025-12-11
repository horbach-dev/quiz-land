import type { TQuiz } from '@/shared/types/quiz';

export const validateDescription =
  (t) =>
  (value = '') => {
    if (!value) {
      return t('validation.required');
    }

    if (value.length < 50) {
      return t('validation.min_length', { value: 50 });
    }

    const length = value.replace(/<[^>]*>?/gm, '').replace(/\n\s*\n/g, '\n').length;

    if (length > 3000) {
      return t('validation.length_limit', { value: length - 3000 });
    }
    return true;
  };

const setImage = (image?: string | null) => {
  let result = '';

  if (image) {
    const chunks = image.split('/');
    result = chunks[chunks.length - 1];
  }

  return result;
};

export const getDefaultValues = (data: TQuiz) => {
  return {
    title: data.title,
    description: data.description,
    loadedImg: data.poster,
    poster: setImage(data.poster),
    questions: data.questions.map((question) => {
      return {
        image: setImage(question.image),
        text: question.text,
        loadedImg: question.image,
        field: question.field || 'text',
        options: question.options.map((option) => {
          return {
            text: option.text,
            image: setImage(option.image),
            loadedImg: option.image,
            isCorrect: option.isCorrect,
          };
        }),
      };
    }),
  };
};
