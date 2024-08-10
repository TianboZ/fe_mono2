/*
google `html accessbility`
https://www.programiz.com/html/accessibility
https://medium.com/@zmactavish/15-html-tags-for-accessibility-2738183cbc3



*/
import React from "react";

const App = () => {
  return (
    <div>
      <button tabIndex={1} aria-label="Close">
        X
      </button>
      <span tabIndex={2} id="logo">
        Be Accessible
      </span>
      <img src="logo.png" alt="ttt" aria-labelledby="logo"></img>
      <button tabIndex={3}>button 2</button>
    </div>
  );
};

export default App;
