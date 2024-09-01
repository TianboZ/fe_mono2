// https://leetcode.com/discuss/interview-question/1875258/Uber-or-Phone-Screen-or-Run-async-graph
function taskA(done) {
  console.log("Task A Completed");
  done();
}
function taskB(done) {
  setTimeout(function () {
    console.log("Task B Completed");
    done();
  }, 2000);
}
function taskC(done) {
  setTimeout(function () {
    console.log("Task C Completed");
    done();
  }, 200);
}
function taskD(done) {
  console.log("Task D Completed");
  done();
}
function taskE(done) {
  console.log("Task E Completed");
  done();
}

const asyncGraph = {
  a: {
    task: taskA,
  },
  b: {
    task: taskB,
  },
  c: {
    task: taskC,
  },
  d: {
    dependency: ["a", "b"],
    task: taskD,
  },
  e: {
    dependency: ["c", "d"],
    task: taskE,
  },
};

function runAsyncGraph(graph, callback) {
  // implement
  const promisify = (func) =>
    new Promise((resolve, reject) => {
      func(resolve);
    });

  const promiseCache = {}; // key is task, value is promise

  const runTask = async (task) => {
    // base case
    if (promiseCache[task] !== undefined) {
      return promiseCache[task];
    }

    // recursive rule
    const generatePromise = async () => {
      const depTasks = asyncGraph[task].dependency || [];
      const depTasksPromises = depTasks.map((_t) => runTask(_t));
      await Promise.all(depTasksPromises);
      let taskFunc = asyncGraph[task].task;
      const taskPromise = promisify(taskFunc);
      await taskPromise;
    };

    const taskP = generatePromise();
    promiseCache[task] = taskP;
    await taskP;
  };

  for (const [k, v] of Object.entries(graph)) {
    if (promiseCache[k] === undefined) {
      runTask(k);
    }
  }
}

runAsyncGraph(asyncGraph);
