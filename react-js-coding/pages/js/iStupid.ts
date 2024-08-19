const arr = [1, 2, 3, 4, 5];

const size = undefined;

let j = 0;
let k = 0;
for (let i = 0; i < arr.length && i < (size || arr.length); i++) {
  console.log(arr[i]);
  j++;
  k += 1;
  console.log("j:", j, j - 1, "k:", k, k - 1);
}
