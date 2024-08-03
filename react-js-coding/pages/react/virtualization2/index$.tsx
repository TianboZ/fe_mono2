import React, { ReactNode, useCallback, useState } from "react";
import throttle from "lodash-es/throttle";

const BUFFER = 2;

type ListProps<T> = {
  data: T[];
  height: number;
  itemHeight: number;
  renderData: (d: T) => ReactNode;
};

const List = <T,>({ data, renderData, height, itemHeight }: ListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback(
    throttle((e) => {
      setScrollTop(e.target.scrollTop);
    }),
    []
  );

  const startIdx =
    Math.floor(scrollTop / itemHeight) - BUFFER < 0
      ? 0
      : Math.floor(scrollTop / itemHeight) - BUFFER;

  const endIdx =
    startIdx + Math.ceil(height / itemHeight) + BUFFER * 2 >= data.length
      ? data.length
      : startIdx + Math.ceil(height / itemHeight) + BUFFER * 2;

  const visibleItems = data.slice(startIdx, endIdx);

  return (
    <div>
      <div>
        debug
        <div>scrolltop: {scrollTop}</div>
        <div>
          start idx: {startIdx}, end idx: {endIdx}
        </div>
        <div>visible items length: {visibleItems.length}</div>
        <div>{`translateY(${startIdx * itemHeight}px)`}</div>
      </div>
      <div
        style={{
          height: `${height}px`,
          overflow: "scroll",
          backgroundColor: "wheat",
          width: 400,
        }}
        onScroll={handleScroll}
      >
        <div
          style={{
            height: `${itemHeight * data.length}px`,
          }}
        >
          <div
            style={{
              height: `${visibleItems.length * itemHeight}px`,
              position: "relative",
              transform: `translateY(${startIdx * itemHeight}px)`,
            }}
          >
            {visibleItems.map((d, i) => {
              if (typeof renderData === "function") {
                return renderData(d);
              }
              return (
                <div
                  key={i}
                  style={{
                    height: `${itemHeight}px`,
                    backgroundColor: d % 2 == 0 ? "blue" : "yellow",
                  }}
                >
                  {d}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const data = Array(100)
    .fill(1)
    .map((data, i) => i);

  return (
    <div>
      <List
        data={data}
        itemHeight={40}
        height={500}
        renderData={(data) => {
          return (
            <div
              style={{
                height: 40,
                backgroundColor: data % 2 === 0 ? "blue" : "yellow",
              }}
            >
              renderProps: {data}
            </div>
          );
        }}
      />
    </div>
  );
};

export default App;
