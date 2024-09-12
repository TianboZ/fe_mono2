from collections import deque

class MaxStack:
  def __init__(self):
    # stack: stores the actual elements
    # max_stack: stores the maximum element at each state of the stack
    # helper: temporary deque used to assist in pop_max
    self.stack = deque()
    self.max_stack = deque()
    self.helper = deque()

  def push(self, x: int) -> None:
    self.stack.appendleft(x)
    if not self.max_stack:
      self.max_stack.appendleft(x)
    else:
      self.max_stack.appendleft(max(x, self.max_stack[0]))

  def pop(self) -> int:
    self.max_stack.popleft()
    return self.stack.popleft()

  def top(self) -> int:
    return self.stack[0]

  def peekMax(self) -> int:
    if self.max_stack:
      return self.max_stack[0]
    return -1

  def popMax(self) -> int:
    while self.stack and self.stack[0] != self.max_stack[0]:
      self.helper.appendleft(self.stack.popleft())
      self.max_stack.popleft()

    res = 0
    if self.stack and self.stack[0] == self.max_stack[0]:
      self.stack.popleft()
      res = self.max_stack.popleft()

    while self.helper:
      self.push(self.helper.popleft())

    return res
