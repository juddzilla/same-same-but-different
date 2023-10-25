import ValidateAttempt from './validate-attempt';

const CalcScore = (atts) => {
  if (!atts) {
    return 0;
  }
  return atts.reduce((acc, cur) => {
    const val = cur.correct ? 10 : -5;
    acc += val;
    return acc;
  }, 0);
};

const CountAttempts = (atts, value) => {
  if (!atts) {
    return 0;
  }
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