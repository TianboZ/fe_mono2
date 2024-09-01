const fakeAPICall3 = (query) =>
  new Promise((resolve) => {
    console.log("fakeAPICall3 invoke, query:", query);
    setTimeout(() => {
      resolve(query);
    }, 1000);
  });

const memoAsyncFunc = (fun) => {
  const cache = {};
  return function (...args) {
    const query = JSON.stringify(...args);

    if (cache[query] !== undefined) {
      return Promise.resolve(cache[query]);
    }

    const generatePromise = async () => {
      try {
        const res = await fun(...args);
        cache[query] = res;
        return res;
      } catch (error) {
        cache[query] = error;
      }
    };

    const promise = generatePromise();
    cache[query] = promise;
    return promise;
  };
};

const api1 = memoAsyncFunc(fakeAPICall3);
Promise.all([api1(1), api1(1), api1(1), api1(2)]).then((res) => {
  console.log("all done, res:", res);
});
