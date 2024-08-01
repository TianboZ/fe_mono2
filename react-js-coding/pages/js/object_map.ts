/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#description
*/

const obj = {
  1: 1, // number 1 becomes  string '1'
  // "1": 1,  wrong! An object literal cannot have multiple properties with the same name.
};

console.log(obj, obj["1"]);

const wrongMap = new Map();
wrongMap[1] = 1; // '1': 1, set property like this is wrong!
wrongMap.set("2", 2);

console.log(wrongMap);

const arr = [1];
const arr2 = [1];

wrongMap.set(arr, 1);
wrongMap.set(arr2, 1); //  { '2' => 2, [ 1 ] => 1, [ 1 ] => 1, '1': 1 }
console.log(wrongMap);

export default function getElementsByClassName(
  element: Element,
  classNames: string
): Array<Element> {
  res = [];

  const dfs = (element: Element) => {
    // base case
    if (!element) {
      return;
    }

    // recursive rule
    if (element.className === classNames) {
      res.push(element);
    }
    for (const child in element.children) {
      dfs(child);
    }
  };

  dfs(element);
  return res;
}
