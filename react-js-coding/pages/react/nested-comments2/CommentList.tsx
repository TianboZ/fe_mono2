import React, { useState } from "react";
import useComment from "./useComment";
import Comment from "./Comment";

const CommentList = () => {
  const { data, handleCommentAction } = useComment();
  const [inputValue, setInputValue] = useState("");
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitComment = () => {
    handleCommentAction("add", {
      id: Date.now().toString(),
      content: inputValue,
      timestamp: Date.now(),
      replies: [],
    });
    setInputValue("");
  };

  return (
    <div>
      <input
        value={inputValue}
        placeholder="add comment"
        onChange={handleInput}
      />
      <button onClick={handleSubmitComment}>submit</button>
      {data?.map((d, i) => (
        <Comment
          key={i}
          comment={d}
          handleCommentAction={handleCommentAction}
        />
      ))}
    </div>
  );
};

export default CommentList;
