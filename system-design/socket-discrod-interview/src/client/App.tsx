import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { helper } from '../server/utils';
import { io, Socket } from 'socket.io-client';
import { ClientToServerEvent, ServerToClientEvent } from '../server';
import Chat from './Chat';

export const socket: Socket<ServerToClientEvent, ClientToServerEvent> =
  io('localhost:3001');

function App(): JSX.Element {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [login, setlogin] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connect to server! ');
    });
  }, []);

  const joinRoom = () => {
    if (!username || !room) {
      return;
    }

    socket.emit('room_join', room, username);
    setlogin(true);
  };

  return (
    <Router>
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <div>
            {login ? (
              <Chat room={room} />
            ) : (
              <div>
                <input
                  className=" text-black"
                  value={username}
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <input
                  className=" text-black"
                  value={room}
                  placeholder="room id"
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                />
                <div>
                  <button onClick={joinRoom}> join room</button>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
