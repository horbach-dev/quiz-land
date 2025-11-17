// import { ageRange } from "./config";

export type TQuestionValue = { value: string, label: string, point: number };

export type TQuestion = {
  id: number;
  question: string;
  type: 'option' | 'select' | 'multi';
  options: TQuestionValue[]
  default?: TQuestionValue
}

export const questions: TQuestion[] = [
  {
    id: 1,
    question: "Что больше всего привлекает тебя в игре?",
    type: 'select',
    options: [
      { label: "Эмоции, быстрые выигрыши", point: 10, value: "casino" },
      { label: "Адреналин ставки и прогнозов", point: 10, value: "betting" },
      { label: "Чувство контроля и 'инвестирования'", point: 10, value: "trading" },
      { label: "Сложно сказать", point: 5, value: 'unknow' }
    ]
  },
  {
    id: 2,
    question: "Как часто ты играешь / ставишь / торгуешь?",
    type: 'select',
    options: [
      { label: "Редко или почти никогда", point: 0, value: 'easy' },
      { label: "Раз в неделю", point: 5, value: 'medium' },
      { label: "Несколько раз в неделю", point: 10, value: 'hard' },
      { label: "Почти каждый день", point: 22.5, value: 'legend' }
    ]
  },
  {
    id: 3,
    question: "Бывало, что игра затягивала тебя дольше, чем ты хотел?",
    type: 'select',
    options: [
      { label: "Нет, никогда", point: 0, value: 'easy' },
      { label: "Иногда, но редко", point: 5, value: 'medium' },
      { label: "Часто", point: 15, value: 'hard' },
      { label: "Практически всегда", point: 20, value: 'legend' },
    ]
  },
  {
    id: 4,
    question: "Что из этого было у тебя?",
    type: 'select',
    options: [
      { label: "Потери незначительные", point: 5, value: 'easy' },
      { label: "Проигрывал деньги, но отыгрывался", point: 10, value: 'medium' },
      { label: "Играл в долг или тратил последние", point: 25, value: 'hard' },
      { label: "Предпочитаю не отвечать", point: 5, value: 'legend' }
    ]
  },
  {
    id: 5,
    question: "Пробовал ли ты остановиться?",
    type: 'select',
    options: [
      { label: "Легко получается", point: 0, value: 'easy' },
      { label: "Пробовал, иногда получалось", point: 10, value: 'medium' },
      { label: "Пробовал, но всё равно возвращался", point: 15, value: 'hard' },
      { label: "Да, но срыв всегда неизбежен", point: 22.5, value: 'legend' }
    ]
  }
]
