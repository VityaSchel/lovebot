export const declOfNum = (number: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2]
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
    ]
}

export const declOfRoubles = (number: number) => {
  const titles = ['рубль', 'рубля', 'рублей']

  return declOfNum(number, titles)
}
