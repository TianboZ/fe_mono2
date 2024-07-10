import React, { useEffect, useState } from 'react';
import { Msg } from '../server';
import { socket } from './App';

const Chat = ({ room }) => {
  const [chats, setChats] = useState<Msg[]>([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    socket.on('msg_boradcast', (data) => {
      console.log('msg_boradcast', data);
      setChats((prev) => [...prev, data]);
    });
  }, []);

  const sendMsg = () => {
    socket.emit('msg_send', { content: msg, time: '111111', room });
    setMsg('');
  };

  return (
    <div>
      chat list
      <div>
        {chats.map((c, i) => (
          <div key={i} className="  bg-blue-500">
            <div>{c.content}</div>
            <div className="   m-4 bg-yellow-400">{c.username}</div>
          </div>
        ))}
      </div>
      <input
        className=" text-black"
        value={msg}
        placeholder="msg"
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />
      <button onClick={sendMsg}>send msg</button>
    </div>
  );
};
export default Chat;
