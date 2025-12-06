export const validationRules = {
  title: {
    required: 'Обязательное поле',
    minLength: {
      value: 7,
      message: 'Минимальное кол-во символов: 7',
    },
    maxLength: {
      value: 30,
      message: 'Максимальное кол-во символов: 30',
    },
  },
  description: {
    required: 'Обязательное поле',
  },
  questionTitle: {
    required: 'Обязательное поле',
    minLength: {
      value: 7,
      message: 'Минимальное кол-во символов: 7',
    },
    maxLength: {
      value: 100,
      message: 'Максимальное кол-во символов: 100',
    },
  },
};
