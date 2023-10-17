// cartesian from: https://stackoverflow.com/a/43053803
// shuffle from: https://stackoverflow.com/a/2450976
export default () => {
  const colors = [1,2,3];
  const fill = [1,2,3];
  const shapes = [1,2,3];
  const quantity = [1,2,3];
  const cartesian =
      (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

  const all = cartesian(colors, fill, quantity, shapes);

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  return shuffle(all);
}