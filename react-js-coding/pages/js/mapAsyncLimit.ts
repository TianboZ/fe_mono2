// solution 1
async function mapAsyncLimit2<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  size?: number
): Promise<Array<U>> {
  const ans = [];
  const _size = size || 1;
  for (let i = 0; i < iterable.length; i = i + _size) {
    const chunk = iterable.slice(i, i + _size);
    try {
      const res = await Promise.all(chunk.map((item) => callbackFn(item)));
      ans.push(...res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  return ans;
}

// solution 2, max concurrency
async function mapAsyncLimit<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  size?: number
): Promise<Array<U>> {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      resolve([]);
    }

    const len = iterable.length;
    const res = new Array(len).fill(0);
    console.log("intial res:", res);
    const res2 = [];
    let resolvedCnt = 0;
    let index = -1;

    const runTaskWithIndex = async () => {
      console.log("runTask");
      // base case
      if (resolvedCnt === len) {
        resolve(res);
      }
      if (index >= len - 1) {
        console.log(res);
        return;
      }

      // recursive rule
      const currIdx = index + 1;
      index += 1;
      const item = iterable[currIdx];

      try {
        const data = await callbackFn(item);
        res[currIdx] = data;
        console.log("index: ", currIdx, "val:", data);
        resolvedCnt += 1;
        runTaskWithIndex();
      } catch (err) {
        reject(err);
      }
    };

    const runTask2 = async () => {
      if (resolvedCnt === len) {
        resolve(res2);
      }

      if (iterable.length === 0) {
        console.log("runTask2", res2);
        return;
      }

      // recursive rule
      const idx = len - iterable.length;
      const item = iterable.shift();
      const data = await callbackFn(item);
      resolvedCnt += 1;
      console.log("index: ", idx, "val:", data);
      res2[idx] = data;
      runTask2();
    };

    for (let i = 0; i < len && i < (size || len); i++) {
      // runTaskWithIndex();
      runTask2(); // better than runTask!
    }
  });
}

const iterable = [500, 200, 100, 400, 600, 10];
const callbackFn = (val) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(val);
    }, val);
  });

mapAsyncLimit(iterable, callbackFn, 2).then((res) => {
  console.log("final result:", res);
});
