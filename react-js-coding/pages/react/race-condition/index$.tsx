/*
https://www.youtube.com/watch?v=_4Kjw_VVPHA&ab_channel=Learnersbucket
https://www.youtube.com/shorts/fXD9Ct03Q6k
https://www.youtube.com/shorts/iXGOVcAe_xo

method:
1. useEffect + AbortController
2. useEffect + flag

**/
import React, { useEffect, useState } from "react";

const getRandom = () => Math.random() * 5000;

const apiCall = (v, cb, flag) => {
  console.log("random num:", getRandom);

  return new Promise((resolve) => {
    setTimeout(() => {
      if (flag !== undefined && !flag[0]) {
        return;
      }
      cb(v);
      resolve(v);
    }, getRandom());
  });
};

const api2 = async (query) => {
  const resp = await fetch(
    `https://dummyjson.com/products/search?q=${query}&delay=${getRandom()}`
  );
  const data = await resp.json();
  return data;
};

const RaceCondition = () => {
  const [value, setValue] = useState("");
  const [latestValue, setLatestValue] = useState();
  const [latestValue2, setLatestValue2] = useState();

  useEffect(() => {
    if (value) {
      apiCall(value, setLatestValue).then((res) => {
        // setLatestValue(res);
      });
    }
  }, [value]);

  // fix race condition
  useEffect(() => {
    const flag = [true];
    if (value) {
      apiCall(value, setLatestValue2, flag).then((res) => {
        if (flag[0]) {
          // setLatestValue2(res);
        }
      });
    }
    return () => {
      flag[0] = false;
    };
  }, [value]);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div>latestValue: {JSON.stringify(latestValue, null, 2)}</div>
      <div>latestValue2: {JSON.stringify(latestValue2, null, 2)}</div>
    </div>
  );
};

export default RaceCondition;
