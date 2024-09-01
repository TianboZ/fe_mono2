/*

Memoize Async Functions in JavaScript
https://dev.to/devsmitra/maximizing-performance-how-to-memoize-async-functions-in-javascript-4on8#:~:text=All%20you%20need%20to%20do,the%20result%20in%20the%20cache.


*/

// const cache = {};

// const fakeAPICall = async (userId) => {
//   if (userId in cache) {
//     return Promise.resolve(cache[userId]);
//   }

//   console.log("API call made");
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const response = { userId, name: "John Doe" };
//       cache[userId] = response;
//       resolve(response);
//     }, 100);
//   });
// };

// const cache2: Record<
//   string,
//   {
//     status: "pending" | "success" | "error";
//     value: any;
//   }
// > = {};

// const fakeAPICall2 = async (userId) => {
//   if (cache2[userId]) {
//     return Promise.resolve(cache2[userId].value);
//   }

//   console.log("fakeAPICall2");

//   const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const response = { userId, name: "John Doe" };
//       cache2[userId] = { status: "success", value: response };
//       resolve(response);
//     }, 100);
//   });

//   cache2[userId] = {
//     status: "pending",
//     value: p,
//   };

//   return p;
// };

// Promise.all([fakeAPICall(1), fakeAPICall(1), fakeAPICall(1)]).then(console.log);
// Promise.all([fakeAPICall2(1), fakeAPICall2(1), fakeAPICall2(1)]).then((res) => {
//   console.log(res, cache2);
// });

const memoAsyncFunc = (func: (...args: any[]) => Promise<any>) => {
  const cache = new Map<
    string,
    {
      value: any;
      status: "pending" | "success" | "error";
    }
  >();

  return function (...args) {
    const query = JSON.stringify(args);

    if (cache.has(query)) {
      return Promise.resolve(cache.get(query)?.value); // promisify
    }

    const p = new Promise(async (resolve, reject) => {
      try {
        const res = await func(...args);
        cache.set(query, {
          status: "success",
          value: res,
        });
        console.log(cache);
        resolve(res);
      } catch (err) {
        cache.set(query, {
          status: "error",
          value: err,
        });
        reject(err);
      }
    });

    // simpler way
    const p2 = func(...args)
      .then((res) => {
        cache.set(query, { value: res, status: "success" });
        console.log(res);
        return res;
      })
      .catch((err) => {
        cache.set(query, { value: err, status: "error" });
        console.log(err);
      });

    cache.set(query, {
      status: "pending",
      value: p2,
    });

    return p2;
  };
};

const fakeAPICall3 = (query) =>
  new Promise((resolve) => {
    console.log("fakeAPICall3 invoke, query:", query);
    setTimeout(() => {
      resolve(query);
    }, 1000);
  });

const memorizedFunc = memoAsyncFunc(fakeAPICall3);

Promise.all([
  memorizedFunc(1),
  memorizedFunc(1),
  memorizedFunc(1),
  memorizedFunc(1),
  memorizedFunc(2),
]).then((res) => {
  console.log(res);
});
