type ThrottleFunction<T extends any[]> = (...args: T) => any;

export default function throttle<T extends any[]>(
  func: ThrottleFunction<T>,
  wait: number
): ThrottleFunction<T> {
  let shouldThrottle = false;
  return function (...args) {
    if (shouldThrottle) {
      return;
    }
    shouldThrottle = true;
    func.call(this, ...args);
    // func(...args);
    setTimeout(() => {
      shouldThrottle = false;
    }, wait);
  };
}

const func = () => {
  console.log(1);
};

const throttleFunc = throttle(func, 100);
for (let i = 0; i < 1000; i++) {
  throttleFunc();
}

setTimeout(() => {
  throttleFunc.call(null);
}, 1000);

setTimeout(() => {
  throttleFunc();
}, 1105);
