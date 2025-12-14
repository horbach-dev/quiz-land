import type { IFormData } from '@/features/create-quiz/types';
import type { TQuiz } from '@/shared/types/quiz';

export const validateDescription =
  ({ min, max }, t) =>
  (value = '') => {
    if (!value) {
      return t('validation.required');
    }

    if (value.length < min) {
      return t('validation.min_length', { value: min });
    }

    const length = value.replace(/<[^>]*>?/gm, '').replace(/\n\s*\n/g, '\n').length;

    if (length > max) {
      return t('validation.length_limit', { value: length - max });
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

export const getDefaultValues = (data: TQuiz): IFormData => {
  return {
    title: data.title,
    description: data.description,
    loadedImg: data.poster,
    poster: setImage(data.poster),
    timeLimit: data.timeLimit,
    timeLimitChoice: data.timeLimitChoice,
    resultFeedbacks: data.resultFeedbacks,
    questions: data.questions.map((question) => {
      return {
        order: question.order,
        image: setImage(question.image),
        text: question.text,
        loadedImg: question.image,
        type: question.type || 'SINGLE_CHOICE',
        field: question.field || 'TEXT',
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
