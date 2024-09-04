/*

lodash repeat()

*/
function repeat(string, n) {
  if (n <= 0) {
    return "";
  }
  if (n === 1) {
    return string;
  }

  // Recursively compute half of the repetitions
  const half = repeat(string, Math.floor(n / 2));

  // If n is even, just concatenate the half with itself
  if (n % 2 === 0) {
    return half + half;
  } else {
    // If n is odd, concatenate the half with itself plus one more string
    return half + half + string;
  }
}

// Example usage:
console.log(repeat("abc", 10)); // Output: 'abcabcabc'
console.log(repeat("x", 5)); // Output: 'xxxxx'
console.log(repeat("abc", 0)); // Output: ''
