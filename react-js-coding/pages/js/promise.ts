const apiCall = (arg): Promise<number> =>
  new Promise((resolve, reject) => {
    // if (Math.random() >= 0.8) {
    //   reject("asdflalkdfj");
    // }
    setTimeout(() => {
      resolve(arg);
    }, arg);
  });

apiCall(12)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

const p2 = Promise.resolve(111);
console.log("p2 is promise:", p2 instanceof Promise);

function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    if (unresolved === 0) {
      resolve(results);
      return;
    }

    iterable.forEach(async (item, index) => {
      try {
        const value = await item;
        results[index] = value;
        unresolved -= 1;

        if (unresolved === 0) {
          resolve(results);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}

promiseAll([...[1000, 1000, 1000].map((i) => apiCall(i)), 2000]).then((res) => {
  console.log(res);
});
