// @ts-nocheck

// const tasks = {
//   a: {
//     job: function (callback) {
//       console.log("Tasks A running");
//     },
//     dependency: ["c", "b"],
//   },
//   b: {
//     job: function (callback) {
//       console.log("Tasks B running");
//     },
//     dependency: [],
//   },
//   c: {
//     job: function (callback) {
//       console.log("Tasks C running");
//     },
//     dependency: ["b"],
//   },
// };

// function runTasks(tasks) {
//   while (Array.from(Object.keys(tasks)).length) {
//     const len = Array.from(Object.keys(tasks));
//     for (const item of len) {
//       if (tasks[item]["dependency"].length === 0) {
//         const func = tasks[item]["job"];
//         func();
//         deleteAllOccurance(tasks, item);
//         delete tasks[item];
//       }
//     }
//   }
// }
// function deleteAllOccurance(tasks, name) {
//   const keys = Array.from(Object.keys(tasks));
//   for (const key of keys) {
//     let array = tasks[key].dependency;
//     array = array.filter((x) => x != name);
//     tasks[key].dependency = array;
//   }
// }
// runTasks(tasks);

// const obj = { a: 1, b: 2 };
// Object.entries(obj).forEach((entry) => {
//   console.log(entry);
//   const [k, v] = entry;
//   console.log(k, v);
// });

// const map = new Map<number, string[]>();
// map.set(1, ["1"]);
// map.set(2, ["2"]);
// map.forEach((val, key, entry) => {
//   console.log(key, val);
// });

import taskGraphRunner from "task-graph-runner";
// const taskGraphRunner = require("graph-runner");

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
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });

const t = Date.now();

async function task(name) {
  console.log(`start ${name} at: `, Date.now() - t);
  const result = await exec(name);
  console.log(`end ${name} at`, Date.now() - t);
  return result;
}

// taskGraphRunner(111);
const results = taskGraphRunner({ graph, task }).then((res) => {
  console.log(res);
});
