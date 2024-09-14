import { useEffect, useRef } from "react";
import useDataAPI from "./useDataAPI";

const App = () => {
  const { data, isLoading, fetchMore } = useDataAPI();
  const bottomRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((ele) => {
      if (ele[0].isIntersecting && !isLoading) {
        fetchMore();
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      console.log("cleanup");
      observer.disconnect();
    };
  }, [fetchMore]);

  return (
    <div
      style={{ height: "500px", backgroundColor: "wheat", overflow: "scroll" }}
    >
      {(!data || isLoading) && <div>loading</div>}
      {data &&
        data.map((d, index) => {
          return <div key={index}>{d.name}</div>;
        })}
      <div
        ref={bottomRef}
        style={{ backgroundColor: "blue", visibility: "hidden" }}
      >
        bottom
      </div>
    </div>
  );
};
export default App;
