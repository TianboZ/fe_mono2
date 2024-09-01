/**
 * Write mapAsyncWithLimit() function that:
 * - Takes an array of inputs (inputs arg)
 * - Calls an asynchronous function with each input (iterateeFn arg)
 * - Can only have a limit number of asynchronous functions running concurrently (limit arg)
 * - Calls callback function after all inputs have been processed (callback arg)
 */

function fetchUsernameById(id, callback) {
  // Simulates async request
  const randomRequestTime = Math.floor(Math.random() * 100) + 200;

  setTimeout(() => {
    callback(`Username ${id}`);
  }, randomRequestTime);
}

const promisify = (func) => {
  return function (id, cb) {
    return new Promise((resolve, reject) => {
      func(id, (...args) => {
        if (cb) {
          cb();
        }
        resolve(...args);
      });
    });
  };
};

function mapAsyncWithLimit(inputs, limit, iterateeFn, callback) {
  // Implement here
  // Hint: Create some intermediate callback fn here to pass to iterateeFn
  const func = promisify(iterateeFn);
  const total = inputs.length;
  let resolvedCnt = 0;
  const ans = [];

  const runTask = async () => {
    console.log("runTask");
    // baes case
    if (inputs.length === 0) {
      return;
    }

    // recursive rule
    const idx = total - inputs.length;
    id = inputs.shift();

    try {
      const res = await func(id);
      console.log("res");
      ans[idx] = res;
      resolvedCnt += 1;

      if (resolvedCnt === total) {
        // all resolved
        callback(ans);
      }
    } catch (err) {
      // todo
      console.log(err);
    }

    await runTask();
  };

  for (let i = 0; i < limit && i < inputs.length; i++) {
    runTask();
  }
}

mapAsyncWithLimit([1, 2, 3, 4, 5], 2, fetchUsernameById, (allResults) => {
  // This callback body runs after all inputs have been successfully processed
  console.log(allResults);
  // Should log: ["Username 2", "Username 1", "Username 3", "Username 4", "Username 5"]
  // Note - order may not be same because of random async callback resolve time
});
