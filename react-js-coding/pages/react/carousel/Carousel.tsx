/*
https://www.youtube.com/watch?v=Kx8XlKRBZx8&ab_channel=WebDevSimplified

*/
import React, { useEffect, useRef, useState } from "react";

type CarouselProps = {
  images: {
    src: string;
  }[];
  width: number;
  aspectRatio: string;
};
const Carousel = ({
  images,
  width = 800,
  aspectRatio = "4/3",
}: CarouselProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const intervalRef = useRef();

  const handleNextClick = () => {
    // cancelAutoplay();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrevClick = () => {
    // cancelAutoplay();
    if (currentIdx === 0) {
      setCurrentIdx(images.length - 1);
    } else {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleClickDot = (i) => {
    setCurrentIdx(i);
  };

  const cancelAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log("interval!!!");
      handleNextClick();
    }, 1000 * 3);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <div className="carousel-container" style={{ width: `${width}px` }}>
        <div className="carousel-content">
          {images.map((img, i) => (
            <div
              key={i}
              className="card"
              style={{
                width: `${width}px`,
                aspectRatio,
                transform: `translateX(${-100 * currentIdx}%)`,
              }}
            >
              <img alt={img.alt} src={img.src} className="image" />
            </div>
          ))}
        </div>
        <button onClick={handlePrevClick} className="left-btn">{`<`}</button>
        <button onClick={handleNextClick} className="right-btn">{`>`}</button>
        <div className="pagination">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                handleClickDot(i);
              }}
              className={i === currentIdx ? "dot-active" : "dot"}
            >
              x
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
