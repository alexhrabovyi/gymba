export default function beautifyNum(num: number) {
  const beautyNum = num.toString().split('').reverse();

  let spaces = 0;
  let count = 0;

  beautyNum.forEach((n, i) => {
    if (count % 3 === 0 && i !== 0) {
      beautyNum.splice(i + spaces, 0, ' ');
      spaces += 1;
    }

    count += 1;
  });

  return beautyNum.reverse().join('');
}
