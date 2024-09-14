import React, { useState } from "react";

export type CommentData = {
  id: string;
  content: string;
  timestamp: string;
  replies?: CommentData[];
};

type CommentProps = {
  comment: CommentData;
  handleCommentAction: (
    type: "edit" | "add" | "delete",
    content: CommentData,
    id?: string
  ) => void;
};
const Comment = ({ comment, handleCommentAction }: CommentProps) => {
  const [inputValue, setInputValue] = useState("");
  const [mode, setMode] = useState<"edit" | "reply">();
  const [showInput, setShowInput] = useState(false);

  const handleReplyClick = () => {
    setMode("reply");
    setShowInput(!showInput);
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitReply = () => {
    // reply new comment
    handleCommentAction(
      "add",
      { id: Date.now().toString(), content: inputValue, timestamp: Date.now() },
      comment.id
    );
    setInputValue("");
    setShowInput(false);
  };

  const handleDeleteClick = () => {
    handleCommentAction("delete", undefined, comment.id);
  };

  const handleEditClick = () => {
    setShowInput(true);
    setInputValue(comment.content);
    setMode("edit");
  };

  const handleSubmitEdit = () => {
    handleCommentAction(
      "edit",
      {
        content: inputValue,
        timestamp: Date.now().toString(),
        id: comment.id,
        replies: comment.replies,
      },
      comment.id
    );
    setInputValue("");
    setShowInput(false);
  };

  return (
    <div style={{ border: "1px solid red" }}>
      <div>{comment.content}</div>
      <div>{comment.timestamp}</div>
      <div>
        <button onClick={handleEditClick}>edit</button>
        <button onClick={handleReplyClick}>reply</button>
        <button onClick={handleDeleteClick}>delete</button>
      </div>
      <div>
        {showInput && (
          <div>
            <input value={inputValue} onChange={handleInput} />
            {mode === "reply" && (
              <button onClick={handleSubmitReply}>submit</button>
            )}
            {mode === "edit" && (
              <button onClick={handleSubmitEdit}>submit</button>
            )}
          </div>
        )}
      </div>
      <div
        style={{
          paddingLeft: "20px",
        }}
      >
        {comment.replies?.map((c, i) => (
          <Comment
            comment={c}
            key={i}
            handleCommentAction={handleCommentAction}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
