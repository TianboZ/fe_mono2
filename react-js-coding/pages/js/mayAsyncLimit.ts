// solution 1
export default async function mapAsyncLimit<T, U>(
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

export default async function mapAsyncLimit2<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  size?: number
): Promise<Array<U>> {
  return new Promise((resolve, reject) => {
    let resolved = 0; //  count processed promise
    let nextIdx = 0;
    const results: U[] = [];

    if (!iterable.length) {
      resolve([]);
    }

    const processItem = async (i) => {
      // base case
      if (resolved === iterable.length) {
        resolve(results);
        return;
      }
      if (i === iterable.length) {
        return;
      }

      // recursive rule
      try {
        nextIdx++;
        const item = iterable[i];
        const res = await callbackFn(item);
        results[i] = res;
        resolved++;
        processItem(nextIdx);
      } catch (error) {
        reject(error);
      }
    };

    for (
      let i = 0;
      i < Math.min(iterable.length, size || iterable.length);
      i++
    ) {
      processItem(i);
    }
  });
}
