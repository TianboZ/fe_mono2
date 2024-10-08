/*

take away:
handing loading 

*/

import React, { useState, useEffect } from "react";
import "./styles.css";

const INITIAL_STATE = [
  { id: 1, isActive: false, shouldHide: false },
  { id: 2, isActive: false, shouldHide: false },
  { id: 3, isActive: false, shouldHide: false },
  { id: 4, isActive: false, shouldHide: false },
  { id: 5, isActive: false, shouldHide: true },
  { id: 6, isActive: false, shouldHide: false },
  { id: 7, isActive: false, shouldHide: false },
  { id: 8, isActive: false, shouldHide: false },
  { id: 9, isActive: false, shouldHide: false },
];

const Lights = ({}) => {
  const [lightsState, setLightsState] = useState(INITIAL_STATE);
  const [orders, setOrders] = useState([]);
  const [isDeactiving, setIsDeactivating] = useState(false);

  const handleCellClick = (idx) => {
    if (isDeactiving) {
      return;
    }

    const newState = [...lightsState];
    newState[idx] = {
      ...newState[idx],
      isActive: true,
    };
    setLightsState(newState);
    setOrders([...orders, idx]);
  };

  const deactivateCell = (idx) =>
    new Promise((resolve) => {
      setTimeout(() => {
        setLightsState((prev) => {
          const newState = [...prev];
          newState[idx] = { ...newState[idx], isActive: false };
          return newState;
        });
        resolve();
      }, 300);
    });

  const handleResetRecur = async (_orders) => {
    if (_orders.length === 0) {
      return;
    }

    const idx = _orders.pop();
    await deactivateCell(idx);
    await handleResetRecur(_orders);
  };

  const resetWhile = async (_orders) => {
    while (_orders.length > 0) {
      const idx = _orders.pop();
      await deactivateCell(idx);
    }
  };

  useEffect(() => {
    if (orders.length === 8) {
      setIsDeactivating(true);
      // resetWhile([...orders]).then(() => {
      //   setLightsState(INITIAL_STATE);
      //   setOrders([]);
      //   setIsDeactivating(false);
      // });

      handleResetRecur([...orders]).then(() => {
        setLightsState(INITIAL_STATE);
        setOrders([]);
        setIsDeactivating(false);
      });
    }
  }, [orders]);

  return (
    <div>
      <div>
        debug
        {JSON.stringify(orders, null, 2)}
        <pre>{JSON.stringify(lightsState, null, 2)}</pre>
        <div>{isDeactiving ? "deactivting" : "not deactiveing"}</div>
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(3, 1fr)`,
        }}
      >
        {lightsState.map((cell, idx) => (
          <div
            className={`cell ${cell.isActive ? "cell-active" : ""}  ${
              cell.shouldHide ? "cell-hide" : ""
            } `}
            key={idx}
            onClick={() => {
              handleCellClick(idx);
            }}
          >
            {cell.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Lights />
    </div>
  );
}
