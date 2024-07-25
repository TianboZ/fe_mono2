import express from "express";
import router from "./router";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import { addUser, getUser } from "./utils";

const PORT = 3001;

const app = express();

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());
app.use(cors({ origin: "*" }));

// Serve API requests from the router
app.use("/api", router);

// Serve app production bundle
app.use(express.static("dist/app"));

// Handle client routing, return all requests to the app
app.get("*", (_req, res) => {
  res.send("<p>hello</p>");
});

const httpServer = createServer(app);

export type User = {
  id: string;
  username: string;
  room: string;
};

export type Msg = {
  content: string;
  time: string;
  username: string;
};

export type ClientToServerEvent = {
  room_join: (room: string, username: string) => void;
  msg_send: (msg: Msg) => void;
};

export type ServerToClientEvent = {
  msg_boradcast: (data: Msg) => void;
};

const io = new Server<ClientToServerEvent, ServerToClientEvent>(httpServer, {
  // options
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a client connect!", socket.id);

  socket.on("room_join", (room, username) => {
    const user: User = { id: socket.id, username, room };
    // join the room
    socket.join(user.room);
    console.log(room, username);

    // add users to DB
    addUser(user);
    console.log("USERS", user);

    // boradcast who is online
  });

  socket.on("msg_send", (data) => {
    const u = getUser(socket.id);
    if (u) {
      // broadcast
      io.to(u?.room).emit("msg_boradcast", { ...data, username: u.username });
      console.log("msg_boradcast", { ...data, username: u.username });
    }
  });

  socket.on("disconnect", () => {
    // broaccast who is offline
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
