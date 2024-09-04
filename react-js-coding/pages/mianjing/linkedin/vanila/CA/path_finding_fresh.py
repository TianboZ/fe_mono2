print(1)

dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]]

from collections import deque, defaultdict

# find shortest path 
class Solution:
  def findPath(self, grid, start, end):
    queue = deque([]) # [[r, c], [r1, c2]  ]
    visit = set()
    prev = defaultdict(list)  # <cor, list of prev cor>, e.g. <(2, 2), [(1, 2), (2, 1)... ]>
    
    # init
    queue.append((start[0], start[1]))
    visit.add((start[0], start[1]))

    # terminate
    while queue:
      # expand 
      curr = queue.popleft()
      r, c = curr
      
      if r == end[0] and c == end[1]:
        # find target node
        # break
        pass
      
      # generate 
      for dir in dirs:
        dx, dy = dir
        r2 = r + dx
        c2 = c + dy
        if self.isValid(r2, c2, grid) and (r2, c2) not in visit and grid[r2][c2] == 1:
          queue.append((r2, c2))
          visit.add((r2, c2))
          
          # add prev cordinate to map
          prev[(r2, c2)].append((r, c))
          
    # print(prev)
    for [k, v] in prev.items():
      print(k, v)
      
      
    # build start -> end path
    curr = (end[0], end[1])
    res = []
    while curr:
      res.append(curr)
      next = prev.get(curr, None)
      if not next:
        break
      curr = next[0]
    res.reverse()
    print(res)
    
    
  def findPath2(self, grid, start, end):  
    self.end = end
    path = []
    visit = set()
    self.dfs(start[0], start[1], grid, visit, path)
    
  # find all path from start to target
  def dfs(self, r, c, grid, visit, path):
    # baes case
    if (r, c) in visit:
      return
    
    if [r, c] == self.end:
      # find target
      res = list(path) + [(r, c)]
      print(res)
      return
    
    # recursive rule
    visit.add((r, c))
    path.append((r, c))
    
    for dir in dirs:
      dx, dy = dir
      r2 = r + dx
      c2 = c + dy
      if self.isValid(r2, c2, grid) and (r2, c2) not in visit and grid[r2][c2] == 1:
        self.dfs(r2, c2, grid, visit, path)
        
    # back tracking
    visit.remove((r, c))
    path.pop()
    
  def isValid(selr, x, y, grid):
    return 0 <= x < len(grid) and 0 <= y < len(grid[0])
  
# test
sol = Solution()

grid = [
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [1, 1, 1, 1]
]

sol.findPath2(grid, [0, 1], [3, 3])