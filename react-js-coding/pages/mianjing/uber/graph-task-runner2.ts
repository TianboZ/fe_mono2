const graph = new Map([
  ["a", ["d"]], // task-a depends on task-d
  ["b", ["d", "a"]],
  ["c", ["d"]],
  ["d", []],
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

const run = (graph: Map<string, string[]>) => {
  const orders: string[] = [];

  // return true if has cycle
  // const checkCycle = () => {
  //   const visit = {}; // key: task   value: 0 == visiting  1 == visited

  //   const dfs = (node) => {
  //     // base case
  //     if (visit[node] === 0) {
  //       console.log("cycle");
  //       throw new Error("cycle");
  //       // return true;
  //     }

  //     if (visit[node] === 1) {
  //       return false;
  //     }

  //     // recursive rule
  //     visit[node] = 0;
  //     const neis = graph.get(node);
  //     neis &&
  //       neis.forEach((nei) => {
  //         if (dfs(nei)) {
  //           return true;
  //         }
  //       });
  //     visit[node] = 1;
  //     orders.push(node);
  //     return false;
  //   };

  //   // console.log(graph);
  //   graph.forEach((val, key) => {
  //     console.log(val, key);
  //     if (!visit[key]) {
  //       dfs(key);
  //     }
  //   });
  // };

  // checkCycle();

  // console.log(orders);

  // after cycle check
  const promiseMap: Record<string, Promise<any>> = {}; // key is task, value is promise

  const runTask = async (task: string): Promise<any> => {
    // base caes
    // return the existing promise if already in progress or complete
    if (promiseMap[task]) {
      // console.log("basecase:", task);
      return promiseMap[task];
    }

    // recursive rule

    // create a promise and store it in the cache immediately
    const taskP = (async () => {
      const depTasks: string[] = graph.get(task) || [];
      // console.log("depTasks", depTasks);
      const depTasksP = depTasks.map((t) => runTask(t));
      await Promise.all(depTasksP);
      return await exec(task);
    })();

    promiseMap[task] = taskP;
    return await taskP;
  };

  graph.forEach((val, key) => {
    if (!promiseMap[key]) {
      runTask(key).then((res) => {
        console.log("runtask:", res);
      });
    }
  });
};

try {
  run(graph);
} catch (err) {
  console.log(err);
}
