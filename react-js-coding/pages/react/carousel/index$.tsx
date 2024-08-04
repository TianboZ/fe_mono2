import React from "react";
import Carousel from "./Carousel";
import "./style.css";

const images = [
  { src: "https://loremflickr.com/640/480/abstract", title: "abstract" },
  { src: "https://loremflickr.com/640/480/animals", title: "animals" },
  { src: "https://loremflickr.com/640/480/business", title: "business" },
  { src: "https://loremflickr.com/640/480/city", title: "city" },
];

const App = () => {
  return <Carousel images={images} width={500} aspectRatio="3/2" />;
};

export default App;
