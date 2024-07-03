import React, { useEffect, useState } from "react";
import { socket } from "./App";
import { Msg } from "../server";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ roomId, username }) => {
  const [chats, setChats] = useState<Msg[]>([]);
  const [msg, setMsg] = useState("");
  const [roomInfo, setRoomInfo] = useState();

  useEffect(() => {
    socket.on("msg_receive", (data) => {
      console.log("data:", data);
      setChats((prev) => [...prev, data]);
    });
    socket.on("room_info", (data) => {
      console.log("room_info", data);
      setRoomInfo(data);
    });
  }, []);

  const handleSendMsg = () => {
    socket.emit("msg_send", {
      roomId,
      data: msg,
      user: username,
      time: Date.now(),
    });
    setMsg("");
  };

  return (
    <div>
      <div>room id: {roomId}</div>
      <div>current user: {username}</div>
      <div>users in room: </div>
      <div>
        {roomInfo?.users.map((d, i) => (
          <div>{d}</div>
        ))}
      </div>
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid red",
        }}
      >
        <ScrollToBottom className="chat-container">
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
                  {data.data}
                  <div className=" rounded   bg-cyan-300 m-1">
                    <div className=" text-sm">from: {data.user}</div>
                    <div className=" text-sm">{data.time}</div>
                  </div>
                </div>
              </div>
              // <pre className=" text-yellow-600" key={i}>
              //   {JSON.stringify(data, null, 2)}
              // </pre>
            );
          })}
        </ScrollToBottom>
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
