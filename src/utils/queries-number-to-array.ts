export default function queriesNumberToArray(queriesNumber: number): number[] {
  const arr = [];
  for (let i = 1; i <= queriesNumber; i += 1) {
    arr.push(i);
  }
  return arr;
}
