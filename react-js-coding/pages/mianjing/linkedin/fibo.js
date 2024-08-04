/*

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

*/

const memo = {};

const fibo = (n) => {
  // basecase
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  // recursive rule
  if (n in memo) {
    return memo[n];
  }
  const res = fibo(n - 2) + fibo(n - 1);
  memo[n] = res;
  return res;
};

console.log(fibo(1000));
