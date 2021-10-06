values = shuffle([3, 1, 7, 9, 10, 130]);

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const barChart = (values) => {
  const maxValue = Math.max(...values);

  const totalSpace = `${maxValue}`.length + 1;

  for (let i = 1; i <= maxValue; i++) {
    let verticalValue = `${maxValue - i + 1}`;

    const reqSpace = totalSpace - verticalValue.length;

    let s = `${" ".repeat(reqSpace)}${verticalValue} | `;

    for (v of values) {
      if (maxValue - v >= i) {
        s += "      ";
      } else {
        s += "****  ";
      }
    }
    console.log(s);
  }
  let line = `-----`;
  let bot = " ".repeat(totalSpace + 3);
  for (v of values) {
    line += `------`;
    bot += ` ${v}    `;
  }
  console.log(line);
  console.log(bot);
};

barChart(values);

/*

  4 1
  4 2
  4 3
  4 4
  4 5



      ***
      * *
   **** *
   * ** *
**** ** *
* ** ** *
* ** ** *


[3,5,7]
*/
