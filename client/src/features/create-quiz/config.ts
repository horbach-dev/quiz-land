export const validationRules = {
  title: {
    required: 'Обязательное поле',
    minLength: {
      value: 7,
      message: 'Минимальное кол-во символов 7',
    },
    maxLength: {
      value: 30,
      message: 'Максимальное кол-во символов 30',
    },
  },
  description: {
    required: 'Обязательное поле',
    minLength: {
      value: 10,
      message: 'Минимальное кол-во символов 30',
    },
    maxLength: {
      value: 1000,
      message: 'Максимальное кол-во символов 1000',
    },
  },
  questionTitle: {
    required: 'Обязательное поле',
    minLength: {
      value: 7,
      message: 'Минимальное кол-во символов 7',
    },
    maxLength: {
      value: 100,
      message: 'Максимальное кол-во символов 100',
    },
  },
};
