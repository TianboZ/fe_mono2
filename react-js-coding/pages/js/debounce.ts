export default function debounce(func: Function, wait: number): Function {
  let timeoutiD: ReturnType<typeof setTimeout> | null = null;

  return function (...args: any[]) {
    if (timeoutiD) {
      clearTimeout(timeoutiD);
    }
    timeoutiD = setTimeout(() => {
      func.call(this, ...args);
    }, wait);
  };
}

console.log(11);

const obj = {
  a: 1,
  hi: () => {
    console.log("hi");
  },
  hello: function () {
    console.log(`hello: ${this.name}`);
    console.log(`a: `, this.a);
    console.log("this: ", this);
  },

  // Arrow function expressions should only be used for non-method functions because they do not have their own this. Let's see what happens when we try to use them as methods:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_separate_this
  hello2: () => {
    console.log(`this: `, this);
  },
};

// obj.hello({ name: 1 });
// obj.hi();

console.log("obj.hello()");
obj.hello();
console.log("-------");

console.log("obj.hello.call(this);");
obj.hello.call(this);
console.log("-------");

console.log("obj.hello.call({ name: tb, a: xxxx })");
obj.hello.call({ name: "tb", a: "xxxx" });
console.log("-------");

obj.hello2.call({ name: 1 });
