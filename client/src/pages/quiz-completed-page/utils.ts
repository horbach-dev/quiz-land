import { shareURL } from '@tma.js/sdk-react';

import { APP_URL } from '@/shared/constants';

export const getTotalPoints = (algorithm, questions) => {
  if (algorithm === 'WEIGHTED_SCALE') {
    return questions.reduce((acc, val) => {
      let point = 0;

      val.options.forEach((v) => {
        point = Math.max(v?.weight || 0, point);
      });

      return acc + point;
    }, 0);
  }

  return questions.length;
};

export const shareResult = ({ sessionId, quizTitle, score, totalPoints }) => {
  shareURL(
    `${APP_URL}?startapp=${sessionId}splitcompleted`,
    `Мой результат в тесте: ${quizTitle} ${score} из ${totalPoints}`,
  );
};
