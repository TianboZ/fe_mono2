import React, { useEffect, useRef, useState } from "react";
import { socket } from "./App";
import { Msg } from "../server";
import moment from "moment";
import { User } from "../server/utils";

const Chat = ({ roomId, username }) => {
  const [chats, setChats] = useState<Msg[]>([]);
  const [msg, setMsg] = useState("");
  const chatRef = useRef<HTMLElement>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on("msg_broadcast", (data) => {
      console.log("data:", data);
      setChats((prev) => [...prev, data]);
      setTimeout(() => {
        chatRef.current.scrollTop = chatRef.current?.scrollHeight;
      }, 10);
    });

    socket.on("room_info", (users) => {
      setUsers([...(users || [])]);
    });
  }, []);

  const handleSendMsg = () => {
    socket.emit("msg_send", {
      content: msg,
      time: moment(),
    });
    setMsg("");
  };

  return (
    <div>
      <div>room id: {roomId}</div>
      <div>current user: {username}</div>
      <div>users in room: </div>
      <div>
        {users.map((d, i) => (
          <div>{d.name}</div>
        ))}
      </div>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid red",
          height: "400px",
          width: "500px",
          overflow: "auto",
        }}
        ref={chatRef}
      >
        {chats.map((data, i) => {
          const isCurrentUser = data.user === username;
          return (
            <div
              key={i}
              className={` mb-4 flex ${
                !isCurrentUser ? "justify-start" : "justify-end"
              } `}
            >
              <div
                className={`  text-black ${
                  isCurrentUser
                    ? "bg-yellow-300   text-right"
                    : " bg-blue-600 text-left"
                }`}
              >
                {data.content}
                <div className=" rounded   bg-cyan-300 m-1">
                  <div className=" text-sm">from: {data.user}</div>
                  <div className=" text-sm">{data.time}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <input
          className="  text-black"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMsg();
            }
          }}
        />
        <button onClick={handleSendMsg}>send</button>
      </div>
    </div>
  );
};

export default Chat;
