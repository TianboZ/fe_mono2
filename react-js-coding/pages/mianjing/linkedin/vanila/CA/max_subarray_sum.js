/*


*/

const maxSubArray = function (nums) {
  const opt = [];
  opt.push(nums[0]);
  let res = nums[0];

  // keep range
  let start = 0;
  let end = 0;
  let tmpStart = 0;

  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];
    if (n + opt[opt.length - 1] > n) {
      opt.push(n + opt[opt.length - 1]);
    } else {
      opt.push(n);
      // new range
      tmpStart = i;
      end = i;
    }

    if (opt[i] > res) {
      res = opt[i];
      end = i;
      start = tmpStart;
    }
  }
  console.log(start, end);
  return res;
};

const arr = [0, -1, 1, 1, 1, -1, -1, 3, -1, 0];
console.log(maxSubArray(arr));
