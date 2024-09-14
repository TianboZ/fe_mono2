/*
https://www.youtube.com/watch?v=NZKUirTtxcg&ab_channel=WebDevSimplified


<div ref={cb}  >1</div>

when div is mounted, cb is called, (node: Element) => {...  }

*/

import React, { useCallback, useEffect, useRef, useState } from "react";
import useData from "./useData";

function App() {
  const { isLoading, data, fetchData } = useData();
  const observerRef = useRef<IntersectionObserver>();

  const lastElementRef = (node) => {
    console.log("lastElementRef called");
    if (isLoading) {
      console.log("returned due to isloading!");
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    });

    if (node) {
      observerRef.current.observe(node);
    }
  };

  if (isLoading && !data) {
    return <div>loading</div>;
  }

  return (
    <div
      className="app"
      style={{
        height: 500,
        backgroundColor: "wheat",
        overflow: "scroll",
      }}
    >
      {data &&
        data.map((d, index) => {
          const last = index === data.length - 1;
          if (last) {
            return (
              <div ref={lastElementRef} key={index}>
                {d.name}
              </div>
            );
          }
          return <div key={index}>{d.name}</div>;
        })}
      <div>{data && isLoading && "loading more"}</div>
      <button onClick={fetchData}>fetch more</button>
    </div>
  );
}

export default App;
