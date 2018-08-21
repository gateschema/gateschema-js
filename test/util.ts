function genNumber(length = 6) {
  return Number(
    Math.random()
      .toString()
      .slice(-length)
  );
}

function genString(length = 6) {
  return Array.apply(null, { length })
    .map((_: any) => String.fromCharCode(randomInt(65, 90)))
    .join('');
}

function randomInt(min: number, max: number) {
  return min + Math.round(Math.random() * (max - min));
}

export { genNumber, genString, randomInt };
