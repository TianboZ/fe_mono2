import React, { useEffect, useState } from "react";

type ProgressBarProps = {
  percent: number;
};
const ProgressBar = ({ percent, onStart, idx }: ProgressBarProps) => {
  useEffect(() => {
    onStart(idx);
  }, []);
  return <div>{percent}</div>;
};

type Progress = {
  id: string;
  percent: number;
  isRunning: boolean;
};

const runningCnt = 0;

const App = () => {
  const [data, setData] = useState<Progress[]>([]);

  const handleStart = (idx) => {
    setInterval(() => {
      setData((prev) => {
        return prev.map((p, i) => {
          if (i === idx) {
            let next = p.percent;
            if (next < 100) {
              next++;
            }
            return {
              ...p,
              percent: next,
            };
          } else {
            return p;
          }
        });
      });
    }, 100);
  };

  useEffect(() => {
    // find next avaliable
    const idx = data.findIndex((item) => item.percent === 0);
    // handleStart(idx);
  }, [data]);

  return (
    <div>
      <button
        onClick={() => {
          setData([...data, { id: Date.now(), percent: 0, isRunning: false }]);
        }}
      >
        add
      </button>
      {data.map((item, i) => (
        <ProgressBar
          key={i}
          percent={item.percent}
          onStart={handleStart}
          idx={i}
        />
      ))}
    </div>
  );
};

export default App;
