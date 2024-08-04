function memorize(func) {
  const cache = new Map();

  return function (...args) {
    const query = JSON.stringify(args);
    if (cache.has(query)) {
      return cache.get(query);
    } else {
      const res = func.call(this, ...args);
      cache.set(query, res);
      return res;
    }
  };
}

const costFunc = (num) => {
  for (let i = 0; i < 1000000000; i++) {}
  return num;
};

const memoFunc = memorize(costFunc);

console.log(memoFunc(100));
console.log(memoFunc(100));
console.log(memoFunc(100));
console.log(memoFunc(200));
console.log(memoFunc(200));
console.log(memoFunc(200));
