import { useState } from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AutoComplete />
    </>
  );
}

export default App;
