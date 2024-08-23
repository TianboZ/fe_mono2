// https://leetcode.com/discuss/interview-question/3138674/Uber-Technical-Phone-Screen-(JS-focus)

/**
 * Write mapAsyncWithLimit() function that:
 * - Takes an array of inputs (inputs arg)
 * - Calls an asynchronous function with each input (iterateeFn arg)
 * - Can only have a limit number of asynchronous functions running concurrently (limit arg)
 * - Calls callback function after all inputs have been processed (callback arg)
 */

function fetchUsernameById(id, callback) {
  // Simulates async request
  const randomRequestTime = Math.floor(Math.random() * 1000);

  setTimeout(() => {
    callback(`Username ${id}`);
  }, randomRequestTime);
}

const promisify = (func) => {
  return function (id) {
    return new Promise((resolve, reject) => {
      func(id, resolve);
    });
  };
};

function mapAsyncWithLimit(inputs, limit, iterateeFn, callback) {
  // Implement here
  // Hint: Create some intermediate callback fn here to pass to iterateeFn

  return new Promise((resolve, reject) => {
    const total = inputs.length;
    const cb = promisify(iterateeFn);
    const users = [];
    let resolvedCnt = 0;

    const runTask = async () => {
      // base case
      if (resolvedCnt === total) {
        callback(users);
        resolve(users);
        return;
      }

      if (inputs.length === 0) {
        return;
      }

      // recursive rule
      const idx = total - inputs.length;
      const id = inputs.shift();
      try {
        const res = await cb(id);
        console.log(res);
        resolvedCnt += 1;
        users[idx] = res;
        await runTask();
      } catch (err) {
        reject(err);
      }
    };

    for (let i = 0; i < limit; i++) {
      runTask();
    }
  });
}

mapAsyncWithLimit([1, 2, 3, 4, 5], 2, fetchUsernameById, (allResults) => {
  // This callback body runs after all inputs have been successfully processed
  console.log("allResults:", allResults);
  // Should log: ["Username 2", "Username 1", "Username 3", "Username 4", "Username 5"]
  // Note - order may not be same because of random async callback resolve time
});
