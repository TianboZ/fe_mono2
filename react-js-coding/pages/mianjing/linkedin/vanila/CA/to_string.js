Function.prototype.toString = (function (...args) {
  const oldToString = Function.prototype.toString;
  return function () {
    return "start:" + oldToString.call(this, ...args) + ":end";
  };
})();

const func1 = (b) => {
  console.log(b);
};

console.log(func1.toString());
