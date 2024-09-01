const currTime = Date.now();
const getTime = () => {
  return Date.now() - currTime;
};

function taskA(done) {
  throw new Error("task a failed");
  console.log("A start at:", getTime());
  console.log("Task A Completed");
  done();
  console.log("A end at:", getTime());
}
function taskB(done) {
  console.log("b start at:", getTime());
  setTimeout(function () {
    console.log("Task B Completed");
    done();
    console.log("b end at:", getTime());
  }, 2000);
}

function taskC(done) {
  console.log("c start at:", getTime());
  setTimeout(function () {
    console.log("Task C Completed");
    done();
    console.log("c end at:", getTime());
  }, 100);
}
function taskD(done) {
  throw new Error("task d fail");
  console.log("d start at:", getTime());
  console.log("Task D Completed");
  done();
  console.log("d end at:", getTime());
}
function taskE(done) {
  console.log("e start at:", getTime());
  console.log("Task E Completed");
  done();
  console.log("e end at:", getTime());
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

const promisify = (func) => {
  return function () {
    return new Promise((resolve, reject) => {
      func(resolve);
    });
  };
};

function runAsyncGraph(graph, callback) {
  try {
    const promiseCache = {}; // <taskId: taskPromise>
    // find topo order
    const runTask = async (taskId) => {
      // base case
      if (promiseCache[taskId] !== undefined) {
        return promiseCache[taskId];
      }

      // recursive rule
      const dep = graph[taskId].dependency || [];

      const generatePromise = async () => {
        await Promise.all(dep.map((_taskId) => runTask(_taskId)));
        const task = graph[taskId].task;
        const promisedTask = promisify(task);
        await promisedTask();
      };

      promiseCache[taskId] = generatePromise();
      await promiseCache[taskId];
    };

    for (let entry of Object.entries(graph)) {
      const [task, info] = entry;
      runTask(task);
    }
  } catch (error) {
    console.log(error);
  }
}

runAsyncGraph(asyncGraph);

// what if some task failed, dont run other tasks
// hanlde monitroing
