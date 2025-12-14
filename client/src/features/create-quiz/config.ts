import type { TFunction } from 'i18next';

export const validationRules = (t: TFunction<'translation', undefined>) => ({
  title: {
    required: t('validation.required'),
    minLength: {
      value: 7,
      message: t('validation.min_length', { value: 7 }),
    },
    maxLength: {
      value: 50,
      message: t('validation.max_length', { value: 50 }),
    },
  },
  description: {
    required: t('validation.required'),
    minLength: {
      value: 100,
      message: t('validation.min_length', { value: 100 }),
    },
  },
  time_limit: {
    max: {
      value: 420,
      message: t('validation.time_limit'),
    },
  },
  questions: {
    required: t('validation.questions.required'),
    minLength: {
      value: 2,
      message: t('validation.questions.min_length', { value: 2 }),
    },
  },
  question: {
    required: t('validation.required'),
    minLength: {
      value: 7,
      message: t('validation.min_length', { value: 7 }),
    },
    maxLength: {
      value: 100,
      message: t('validation.max_length', { value: 100 }),
    },
  },
  options: {
    required: t('validation.options.required'),
    minLength: {
      value: 2,
      message: t('validation.options.min_length', { value: 2 }),
    },
  },
  option: {
    maxLength: {
      value: 100,
      message: t('validation.max_length', { value: 100 }),
    },
  },
  resultFeedbacks: {
    number: {
      required: t('validation.options.required'),
    },
    text: {
      required: t('validation.options.required'),
    },
  },
});
