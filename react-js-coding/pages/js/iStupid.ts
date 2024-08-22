const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const size = undefined;

let j = 0;
let k = 0;
for (let i = 0; i < arr.length && i < (size || arr.length); i++) {
  console.log(arr[i]);
  j++;
  k += 1;
  console.log("j:", j, j - 1, "k:", k, k - 1);
}

const api = (query) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("api: ", query);
      resolve(query);
    }, 1000);
  });

const test = async () => {
  while (arr.length > 0) {
    console.log("while loop");
    const item = arr.pop();
    await api(item);
    await test();
    // test();
  }
};

// test().then((res) => {
//   console.log("complete: ", res);
// });

const test2 = async () => {
  while (arr.length > 0) {
    console.log("test 2 while loop");
    const item = arr.pop();
    await api(item);
  }
};

test2();
