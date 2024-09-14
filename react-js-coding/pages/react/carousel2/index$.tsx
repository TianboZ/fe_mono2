import React, { useEffect, useState } from "react";
import "./style.css";

type CarouselProps = {
  data: {
    src: string;
    title: string;
    alt?: string;
  }[];
  autoPlay?: boolean;
  width?: string;
  height?: string;
  aspectRatio?: string;
  // event
  onItemView?: () => {};
};

const Carousel = ({
  data,
  aspectRatio = "4/3",
  width = "400px",
}: CarouselProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleScrollNext = () => {
    setCurrentIdx((prev) => (prev + 1) % data.length);
  };

  const handleScrollPrev = () => {
    if (currentIdx === 0) {
      setCurrentIdx(data.length - 1);
    } else {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const autoplay = () => {
    const id = setInterval(() => {
      handleScrollNext();
    }, 1000 * 3);

    return () => {
      clearInterval(id);
    };
  };

  useEffect(() => {
    autoplay();
  }, []);

  return (
    <div className="carousel-container" style={{ width }}>
      <div
        className="carousel-content"
        style={{
          transform: `translateX(${-100 * currentIdx}%)`,
        }}
      >
        {data.map((item, i) => (
          <div
            style={{
              width,
              aspectRatio,
            }}
            className="card"
            key={i}
          >
            <img className="image" src={item.src} alt={item.alt} />
          </div>
        ))}
      </div>
      <button className="left-btn" onClick={handleScrollPrev}>
        prev
      </button>
      <button className="right-btn" onClick={handleScrollNext}>
        next
      </button>
      <div className="dots">
        {data.map((_, i) => {
          const isActive = i === currentIdx;
          return (
            <div
              key={i}
              className={isActive ? "dot-active" : "dot"}
              onClick={() => {
                setCurrentIdx(i);
              }}
            >
              x
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DATA = [
  { src: "https://loremflickr.com/640/480/abstract", title: "abstract" },
  { src: "https://loremflickr.com/640/480/animals", title: "animals" },
  { src: "https://loremflickr.com/640/480/business", title: "business" },
  { src: "https://loremflickr.com/640/480/city", title: "city" },
];

const App = () => {
  return (
    <div>
      <Carousel data={DATA} width="400px" aspectRatio="5/3" />
    </div>
  );
};

export default App;
