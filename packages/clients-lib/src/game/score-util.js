const CalcScore = (atts) => {
  return atts.reduce((acc, cur) => {
    const val = cur.correct ? 10 : -5;
    acc += val;
    return acc;
  }, 0);
};

const CountAttempts = (atts, value) => {
  if (!value) {
    return atts.length;
  }
  return atts.filter(att => att.correct === value).length;
};

const Values = { correct: 10, incorrect: -5 };


export default {
  CalcScore,
  CountAttempts,
  Values,
}