/*
https://www.youtube.com/watch?v=NZKUirTtxcg&ab_channel=WebDevSimplified


<div ref={cb}  >1</div>

when div is mounted, cb is called, (node: Element) => {...  }

*/

import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import useData from "./useData";

function App() {
  const { isLoading, data, fetchData } = useData();
  const observerRef = useRef<IntersectionObserver>();

  const lastItemRef = useCallback(
    (node: Element) => {
      console.log(node);

      if (isLoading) {
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
    },
    [fetchData]
  );

  // useEffect(() => {
  //   console.log(lastElement)

  //   if (isLoading) {
  //     return
  //   }

  //   if (observerRef.current) {
  //     observerRef.current.disconnect()
  //   }

  //   observerRef.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       fetchData();
  //     }
  //   })

  //   if (lastElement) {
  //     observerRef.current.observe(lastElement)
  //   }

  // }, [lastElement, fetchData])

  if (isLoading && !data) {
    return <div>loading</div>;
  }

  return (
    <div className="app">
      {/* <List data={data} isLoading={isLoading} /> */}
      {data &&
        data.map((d, index) => {
          const last = index === data.length - 1;
          if (last) {
            return (
              <div
                ref={lastItemRef}
                // ref={setLastElement}
                key={index}
              >
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
