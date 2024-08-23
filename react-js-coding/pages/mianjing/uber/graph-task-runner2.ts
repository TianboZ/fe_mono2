// @ts-nocheck
const graph = new Map([
  ["a", ["d"]], // task-a depends on task-d
  ["b", ["d", "a"]],
  ["c", ["d"]],
  ["e", []],
  ["f", ["b"]],
]);

const exec = (name) =>
  new Promise((resolve) => {
    console.log("task:", name, "start at:", Date.now() - t);
    setTimeout(() => {
      console.log(name);
      resolve(name);
      console.log("task:", name, " end at: ", Date.now() - t);
    }, 1000);
  });

const t = Date.now();

const run = (graph) => {
  const orders = [];

  // return true if has cycle
  const checkCycle = () => {
    const visit = {}; // key: task   value: 0 == visiting  1 == visited

    const dfs = (node) => {
      // base case
      if (visit[node] === 0) {
        console.log("cycle");
        throw new Error("cycle");
        // return true;
      }

      if (visit[node] === 1) {
        return false;
      }

      // recursive rule
      visit[node] = 0;
      const neis = graph.get(node);
      neis &&
        neis.forEach((nei) => {
          if (dfs(nei)) {
            return true;
          }
        });
      visit[node] = 1;
      orders.push(node);
      return false;
    };

    // console.log(graph);
    graph.forEach((val, key) => {
      console.log(val, key);
      if (!visit[key]) {
        dfs(key);
      }
    });
  };

  checkCycle();

  console.log(orders);

  // after cycle check
  const promises = {}; // key is task, value is promise

  const runTask = async (task) => {
    // base caes
    if (promises[task]) {
      return promises[task];
    }

    // recursive rule
    const taskP2 = (async () => {
      const depTasks = graph.get(task) || [];
      console.log("depTasks", depTasks);
      const depTasksPromise = depTasks.map((t) => runTask(t));
      await Promise.all(depTasksPromise);
      await exec(task);
    })();

    promises[task] = taskP2;
    await taskP2;
  };

  graph.forEach((val, key) => {
    if (!promises[key]) {
      runTask(key);
    }
  });
};

try {
  run(graph);
} catch (err) {
  console.log(err);
}
