class Solution:
  def findRepeatedDnaSequences(self, s: str) -> List[str]:
    visit = set()
    res = set()
    size = len(s)
    L = 10
    for i in range(size):
      if i + L > size:
        break
      
      sub = s[i: i + L]
      print(sub)
      if sub in visit:
        res.add(sub)
      else:
        visit.add(sub)
    print(res)
    return list(res)
        