export default (timestamp) => {
  const d1 = timestamp.split('T')[0];
  const [year, m, day] = d1.split('-');
  const date = new Date(year, parseInt(m, 10) - 1, day);  // 2009-11-10
  const month = date.toLocaleString('default', { month: 'long' });
  const dateString = `${month} ${day}, ${year}`;
  return dateString;
}