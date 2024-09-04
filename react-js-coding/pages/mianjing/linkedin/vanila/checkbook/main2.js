const numToEng = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
  11: "Eleven",
  12: "Twelve",
  13: "Thirteen",
  14: "Fourteen",
  15: "Fifteen",
  16: "Sixteen",
  17: "Seventeen",
  18: "Eighteen",
  19: "Nineteen",
  20: "Twenty",
  30: "Thirty",
  40: "Forty",
  50: "Fifty",
  60: "Sixty",
  70: "Seventy",
  80: "Eighty",
  90: "Ninety",
  100: "Hundred",
  1000: "Thousand",
  1000000: "Million",
};

// max: 99,999,999
//       m   t h
const numToStr = (num, strings = []) => {
  // base case
  if (num === 0) {
    console.log(strings);
    if (strings.length === 0) {
      return "Zero";
    }
    return strings.join(" ");
  }

  if (num < 20) {
    console.log(strings);
    strings.push(numToEng[num]);
    return strings.join(" ");
  }

  // recursive rule
  if (num < 100) {
    // 78
    const tens = Math.floor(num / 10); // 7
    strings.push(numToEng[tens * 10]); // 7

    return numToStr(num % 10, strings);
  }

  if (num < 1000) {
    // 789
    const hundreds = Math.floor(num / 100); // 7
    strings.push(numToEng[hundreds]);
    strings.push("Hundred");
    return numToStr(num % 100, strings);
  }

  if (num < 1000000) {
    // 123,456
    const thous = Math.floor(num / 1000); // 123 thous
    const thousEng = numToStr(thous);
    strings.push(thousEng);
    strings.push("Thousand");
    return numToStr(num % 1000, strings);
  }

  if (num <= 99999999) {
    // 23,456,789
    const millions = Math.floor(num / 1000000); // 23 milli
    const millionInEng = numToStr(millions);
    strings.push(millionInEng);
    strings.push("Million");
    return numToStr(num % 1000000, strings);
  }
};

console.log(numToStr(789));
console.log(numToStr(123456));
console.log(numToStr(12345678));

const getNums = (num) => {
  const integer = Math.floor(num);
  let fraction = (num - integer).toFixed(2);
  fraction = fraction.slice(2) + "/100";
  return [integer, fraction];
};

console.log(getNums(100.34));
