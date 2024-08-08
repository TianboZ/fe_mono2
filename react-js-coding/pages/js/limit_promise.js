/*

function buildTask(tasks) -> Promise

task takes 1 sec

*/

const tasks = [5, 1, 3, 2, 4];

function buildTask(tasks) {
  return tasks.map((task, i) => {
    // did not run UNTIL call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`task${i + 1}`);
        resolve(`task${task}`);
      }, task * 100); // delay from 0 to 10 sec
    });
  });
}

const taskPromises = buildTask(tasks);

// console.log(taskPromises);

// runTasksInParallel(tasks) -> promise

function runTasksInParallel(takes) {
  return Promise.all(takes);
}

// const singleTaskPromise = runTasksInParallel(taskPromises);

// runTasksInBatches(tasks, 2)

const runTask = (task) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(`task${task}`);
    }, task * 1000);
  });

const runTasksInBatches = async (tasks, limit) => {
  for (let i = 0; i < tasks.length; i = i + limit) {
    const items = tasks.slice(i, i + limit);
    // console.log(items);
    // console.log(items.length);
    const promises = items.map((item) => runTask(item));
    const res = await Promise.all(promises);
    console.log(res);
  }
};

runTasksInBatches(tasks, 2);

const runTasksInBatches2 = (tasks, limit) => {
  // console.log("tasks", tasks);

  const dfs = async () => {
    // base case: terminate thread when no tasks left
    if (tasks.length === 0) {
      return;
    }

    // recursive rule: find the next executable task
    const task = tasks.shift();
    const res = await runTask(task);
    console.log(res);
    dfs();
  };

  // initi thread
  for (let i = 0; i < limit; i++) {
    dfs();
  }
};

// runTasksInBatches2(tasks, 3);
