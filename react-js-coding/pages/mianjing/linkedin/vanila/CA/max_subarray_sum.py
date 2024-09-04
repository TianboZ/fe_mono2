
from typing import List

'''
soluiton;
dynamic programming

transformation function:
opt[i] = max(opt[i - 1] + nums[i], nums[i])
opt[i] means the sum of subarray that including nums[i]

complexity:
n is lenght of array 
O(n)

'''

def maxSubArray( nums: List[int]):
  opt = [None for _ in range(len(nums))]
  opt[0] = nums[0]
  maxsum = nums[0]
  start = 0
  end = 0
  startTemp = 0
  
  for i in range(1, len(nums)):
    n = nums[i]
    if opt[i - 1] + n > n:
      opt[i] = opt[i - 1] + n 
    else:
      opt[i] = n
      # record potential new range start index
      
      startTemp = i 
      
    
    if opt[i] > maxsum:
      maxsum = opt[i]
      # update max subarray sum range
      start = startTemp
      end = i
    
  print(start, end)
  print('max:',maxsum)
  return maxsum

arr = [0, -1, 1, 1, 1, -1, -1, 3, -1, 0]
maxSubArray(arr)
