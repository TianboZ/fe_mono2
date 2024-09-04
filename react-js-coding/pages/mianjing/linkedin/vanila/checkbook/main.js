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

console.log(numToStr(789));

const numToStr = (num, strings = []) => {
  console.log(num);
  // base case
  if (num == 0) {
    if (strings.length === 0) {
      return "Zero";
    }
    return strings.join(" ");
  }

  if (num < 20) {
    strings.push(numToEng[num]);
    return strings.join(" ");
  }

  // recusrvie rule
  if (num < 100) {
    const tens = Math.floor(num / 10); // 55 / 10 == 5
    strings.push(numToEng[tens * 10]);
    return numToStr(num % 10, strings);
  }

  if (num < 1000) {
    const hunds = Math.floor(num / 100); // 550 / 100 == 5 hunds
    strings.push(numToEng[hunds]);
    strings.push("Hundred");
    return numToStr(num % 100, strings);
  }

  if (num < 1000000) {
    const thous = Math.floor(num / 1000); // 550,100 / 1000 == 550 thous
    const thousInEng = numToStr(thous);
    strings.push(thousInEng);
    strings.push("Thousand");
    return numToStr(num % 1000, strings);
  }

  if (num <= 99999999) {
    const mills = Math.floor(num / 1000000); // 99,900,100 / 1000000 == 99 mills
    const millsInEng = numToStr(mills);
    strings.push(millsInEng);
    strings.push("Million");
    return numToStr(num % 1000000, strings);
  }
};

/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function (num, numString = []) {
  // baes case
  if (num === 0) {
    if (numString.length === 0) {
      return "Zero";
    }
    return numString.join(" ");
  }

  if (num < 20) {
    // console.log("20", num);
    numString.push(numToEng[num]);
    return numString.join(" ");
  }

  // recursive rule
  if (num < 100) {
    // console.log("100", num);
    var tens = Math.floor(num / 10);
    numString.push(numToEng[tens * 10]);
    return numberToWords(num % 10, numString);
  }

  if (num < 1000) {
    // console.log("1000", num);
    var hundred = Math.floor(num / 100);
    numString.push(numToEng[hundred]);
    numString.push("Hundred");
    return numberToWords(num % 100, numString);
  }

  if (num < 1000000) {
    // console.log("1000000", num);
    var thousands = Math.floor(num / 1000);
    numString.push(numberToWords(thousands));
    numString.push("Thousand");
    return numberToWords(num % 1000, numString);
  }

  if (num <= 99999999) {
    // console.log("99999999", num);
    var millions = Math.floor(num / 1000000);
    numString.push(numberToWords(millions));
    numString.push("Million");
    return numberToWords(num % 1000000, numString);
  }

  // Handle numbers greater than 99,999,999 by returning "Out of range"
  return "Out of range";
};

console.log(numToStr(99999999.0));
console.log(numberToWords(99999999.0)); // Ninety Nine Million Nine Hundred Ninety Nine Thousand Nine Hundred Ninety Nine

console.log(numToStr(1920.0));
console.log(numberToWords(1920.0));
// console.log(numberToWords(20.0));
// console.log(numberToWords(0.0)); // zero
