import React, { useEffect, useState } from "react";

interface EventEmitterProps {
  on(eventName: string, listener: Function): EventEmitterProps;
  off(eventName: string, listener: Function): EventEmitterProps;
  emit(eventName: string, ...args: Array<any>): boolean;
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.
class EventEmitter implements EventEmitterProps {
  _events: Record<string, Function[]>;

  constructor() {
    this._events = {};
  }

  on(eventName: string, listener: Function): EventEmitterProps {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(listener);
    return this;
  }

  off(eventName: string, listener: Function): EventEmitterProps {
    const listners = this._events[eventName];
    if (!listners || listners.length === 0) {
      return this;
    }

    const idx = listners.findIndex((item) => item === listener);

    if (idx >= 0) {
      listners.splice(idx, 1);
    }

    return this;
  }

  emit(eventName: string, ...args: Array<any>): boolean {
    const listners = this._events[eventName];

    if (!listners || listners.length === 0) {
      return false;
    }

    listners.forEach((item) => {
      item(...args);
    });

    return true;
  }
}

const eventEmitter = new EventEmitter();

const App = () => {
  const [data, setData] = useState([1, 2, 3, 4.5]);

  useEffect(() => {
    eventEmitter.on("add", (item) => {
      setData((prev) => [...prev, item]);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          eventEmitter.emit("add", Math.random() * 100);
        }}
      >
        add data
      </button>
      <button onClick={() => {}}>add data async</button>
      <div>
        {data.map((d) => (
          <div>{d}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
