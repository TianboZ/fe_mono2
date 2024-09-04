const arr = [1, 2, 3, 4];
const arr2 = arr.concat(4.5, [5, 6], [7], [[8, 9]]);
console.log(arr2);

// function concat(...args) {}
Array.prototype.concat2 = function (...items) {
  const arr = [...this];
  items.forEach((i) => {
    if (Array.isArray(i)) {
      i.forEach((j) => {
        arr.push(j);
      });
    } else {
      arr.push(i);
    }
  });
  return arr;
};

console.log(arr.concat2(4.1, [4.2, {}]));

function dup(arr) {
  return [...arr, ...arr];
}

console.log(dup([1.1, 2.1, 3.1]));

function reverse(arr) {
  const res = [...arr];
  let lo = 0;
  let hi = res.length - 1;
  while (lo + 1 < hi) {
    const tmp = res[hi];
    res[hi] = res[lo];
    res[lo] = tmp;
    lo += 1;
    hi -= 1;
  }
  return res;
}

console.log(reverse([100, 200, 300]));

function reverseDuplicate(arr) {
  let reversed = reverse(arr);
  return [...arr, ...reversed];
}

console.log(reverseDuplicate([1, 2, 3]));

const ori = ["a", "b", "c", [1, 2, 3]];
const sliced = ori.slice(3, 4);
ori[3].push(4);
console.log(sliced);
