import express from "express";
import router from "./router";
import path from "path";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import moment from "moment";
import { HISTORY, USERS, User, getUser, joinUser, removeUser } from "./utils";

const { PORT = 3001 } = process.env;

const app = express();

// Middleware that parses JSON and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Serve API requests from the router
app.use("/api", router);

// Serve app production bundle
app.use(express.static("dist/app"));

// Handle client routing, return all requests to the app
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist/app/index.html"));
});

// Create an HTTP server
const httpServer = createServer(app);

// event naming format [domain:action]
export type Msg = {
  content: string;
  time: string;
  user: string;
  roomId: string;
};
export type ServerToClientEvents = {
  // chat
  msg_broadcast: (data: Msg) => void;
  room_info: (data: User[]) => void;
  chat_his: (data: Msg[]) => void;
};

export type ClientToServerEvents = {
  // chat
  msg_send: (arg: Msg) => void;
  room_join: (
    data: {
      roomId: string;
      userName: string;
    },
    cb: any
  ) => void;
};

// Initialize Socket.IO with the HTTP server
const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(
  httpServer,
  {
    cors: {
      origin: "*", // Adjust the CORS settings as needed
    },
  }
);

io.on("connection", (socket) => {
  console.log(
    "A user connected, socket id: ",
    socket.id
    // "socket headers: ",
    // socket.request.headers
  );

  // broadcase

  // emit events

  // receive events
  socket.on("msg_send", (data) => {
    console.log(data);
    // io.emit('msg_broadcast', data);
    const user = getUser(socket.id);
    if (user) {
      io.to([user.room]).emit("msg_broadcast", { ...data, user: user.name });

      // add to history
      if (user.room in HISTORY) {
        HISTORY[user.room].push({ ...data, user: user.name });
      } else {
        HISTORY[user.room] = [{ ...data, user: user.name }];
      }
    }
  });

  socket.on("room_join", (data, cb) => {
    console.log(
      "user id: ",
      socket.id,
      "join room id: ",
      data,
      "rooms",
      socket.rooms
    );

    socket.join(data.roomId);
    cb();
    const user: User = {
      name: data.userName,
      room: data.roomId,
      id: socket.id,
    };
    joinUser(user);
    // broadcast
    io.to(user.room).emit("msg_broadcast", {
      user: "bot",
      roomId: user.room,
      time: moment().toString(),
      content: `${data.userName} joined room!`,
    });

    io.to(user.room).emit("room_info", USERS);
    console.log("users: ", USERS);

    io.to(user.room).emit("chat_his", HISTORY[user.room] || []);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    const user = getUser(socket.id);
    if (user) {
      removeUser(user.id);
      io.to([user.room]).emit("msg_broadcast", {
        content: `${user.name} has left room`,
        time: moment().toString(),
        roomId: user.room,
        user: "bot",
      });

      io.to(user.room).emit("room_info", USERS);
    }
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
