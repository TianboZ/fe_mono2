arch:
socket.io
for FE and BE

milestones

1. FE, BE setup, intialize socket.io instance
2. create a Room: FE, BE (10)
3. create a chat list

- FE send msg
- BE receive msg, broadcast to all users in the room

4. display username

optimization:

- UI/UX

  - give notif for how is online offline
  - auto scorll
  - lazy laod, window viraluzation
  - i18n
    RTL
  - a11y

- functions:
- push room info: Map<roomid, list of msg[]>
  1. users
  2. give notif for how is online offline
