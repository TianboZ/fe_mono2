// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

class EventEmitter {
  _events: Record<string, any[]>;

  constructor() {
    this._events = {};
  }

  on(event: string, cb: any) {
    const cbs = this._events[event];
    if (cbs) {
      cbs.push(cb);
    } else {
      this._events[event] = [cb];
    }
    return this;
  }

  off(event: string, cb: any) {
    const cbs = this._events[event];

    if (cbs) {
      cbs = cbs.filter((e) => e !== cb);
    }
    return this;
  }

  // in real node.js EventEmitter class, emit return true of false, true means the event has listner, and listner is invoked
  async emit(event: string, ...args: any[]): Promise<any> {
    const cbs = this._events[event];
    if (cbs) {
      // cbs.forEach(cb => cb())

      // return result
      const promises = cbs.map((cb) => cb(...args));
      const res = await Promise.all(promises);
      return res;
    }
  }
}

const em = new EventEmitter();

em.on("print", (arg) => {
  console.log("hi", arg);
  return "h1 returned";
});

em.on("print", (arg) => {
  console.log("hi2", arg);
  return "h2 returned";
});

function print2() {
  console.log("print2");
}
em.on("print2", print2);
em.off("print2", print2);

// console.log(em.emit("print", [1, 2])); // Promise { <pending> }
em.emit("print", [1, 2]).then((res) => {
  console.log(res);
});

const fetchAPI = (...arg): Promise<any> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(...arg);
      // console.log(arg);
    }, 1000 * 3);
  });

em.on("async", fetchAPI);

em.emit("async", 100).then((res) => {
  console.log(res);
});
