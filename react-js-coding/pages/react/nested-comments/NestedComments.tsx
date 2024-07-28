import React, { useState } from "react";
import useCommentTree from "./useCommentTree";
import DATA from "./data.json";
import Comment from "./Comment";

const NestedComments = () => {
  const [inputValue, setInputValue] = useState("");
  const { comments, handleCommentAction } = useCommentTree(DATA);

  const handleCommentChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue) {
      handleCommentAction({
        action: "NewComment",
        comment: {
          id: Date.now().toString(),
          content: inputValue,
          replies: [],
          votes: 0,
          timestamp: Date.now(),
        },
      });
      setInputValue("");
    }
  };

  return (
    <div>
      <textarea
        value={inputValue}
        onChange={handleCommentChange}
        rows={3}
        placeholder="add comment"
        cols={50}
      />
      <button onClick={handleSubmit}>add comment</button>
      <div>
        {comments.map((data, i) => (
          <Comment
            key={i}
            comment={data}
            handleCommentAction={handleCommentAction}
          />
        ))}
      </div>
    </div>
  );
};

export default NestedComments;
