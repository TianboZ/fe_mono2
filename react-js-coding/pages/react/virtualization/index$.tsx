/**
 * https://techmade.medium.com/senior-frontend-interview-how-to-build-a-virtualized-list-from-scratch-7f8b9d5d56d4
 *
 *https://www.youtube.com/watch?v=Yz4eK-4LKXg&t=1s&ab_channel=Rajtalkstech

 */
import React, { useCallback, useState } from "react";
import throttle from "lodash-es/throttle";

const colorNames = ["Red", "Green", "Blue", "Yellow", "Purple", "Orange"];

const PADDING_NODES_CNT = 2;

function getRandomColorName() {
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  return colorNames[randomIndex];
}

function VirtualizedList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(
    0,
    Math.ceil(scrollTop / itemHeight) - PADDING_NODES_CNT
  );
  const endIndex = Math.min(
    startIndex +
      Math.ceil(containerHeight / itemHeight) +
      PADDING_NODES_CNT * 2,
    items.length
  );
  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = useCallback(
    throttle((event) => {
      setScrollTop(event.target.scrollTop);
    }, 100),
    []
  );

  console.log(startIndex, endIndex);
  return (
    <div
      style={{ height: `${containerHeight}px`, overflowY: "scroll" }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: `${items.length * itemHeight}px`,
        }}
      >
        <div
          style={{
            position: "relative",
            height: `${visibleItems.length * itemHeight}px`,
            // top: `${startIndex * itemHeight}px`,   transform is better perf
            transform: `translateY(${startIndex * itemHeight}px)`,
          }}
        >
          {visibleItems.map((item) => (
            <div key={item.id} style={{ height: `${itemHeight}px` }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const items = Array(1000)
    .fill(0)
    .map((_, i) => {
      return {
        id: i,
        content: (
          <div
            style={{ backgroundColor: getRandomColorName(), height: "100%" }}
          >
            {i}
          </div>
        ),
      };
    });

  console.log(items);
  return (
    <div style={{ backgroundColor: "lightslategray", marginTop: 300 }}>
      <VirtualizedList containerHeight={600} itemHeight={70} items={items} />
    </div>
  );
};

export default App;
