const gcd = (num1, num2) => {
  greater_num = Math.max(num1, num2);
  smaller_num = Math.min(num1, num2);
  while (smaller_num != 0) {
    m = greater_num % smaller_num;
    multiple = Math.floor(greater_num / smaller_num);
    // console.log(`${greater_num} = ${smaller_num} * ${multiple} + ${m}`)
    greater_num = smaller_num;
    smaller_num = m;
  }
  return greater_num;
};

const gcdRecursive = (num1, num2) => {
  if (num2 == 0) return num1;
  return gcdRecursive(num2, num1 % num2);
};

num1 = 654;
num2 = 546;

console.log(gcd(num1, num2));
console.log(gcdRecursive(num1, num2));
