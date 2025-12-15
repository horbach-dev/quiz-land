
export const getTotalPoints = (algorithm, questions) => {
  if (algorithm === 'WEIGHTED_SCALE') {
    return questions.reduce((acc, val) => {
      let point = 0;

      val.options.forEach((v) => {
        point = Math.max(v?.weight || 0, point);
      });

      return acc + point;
    }, 0)
  }

  return questions.length
}
