import React, { useState } from "react";
import { CommentData, HandleCommentActionProps } from "./useCommentTree";

type CommentProps = {
  comment?: CommentData;
  handleCommentAction: (props: HandleCommentActionProps) => void;
};

const Comment = ({ comment, handleCommentAction }: CommentProps) => {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"edit" | "reply">();

  if (!comment) {
    return null;
  }

  const toggleShowInput = () => {
    setShowInput(!showInput);
  };

  const handleCommentChange = (e) => {
    setInput(e.target.value);
  };

  const handleReplyClick = () => {
    setMode("reply");
    setInput("");
    toggleShowInput();
  };

  const handleReplySubmit = () => {
    if (input) {
      const newComment: CommentData = {
        id: Date.now().toString(),
        content: input,
        votes: 0,
        timestamp: Date.now(),
      };
      handleCommentAction({
        action: "Reply",
        id: comment.id,
        comment: newComment,
      });
      toggleShowInput();
      setInput("");
    }
  };

  const handleEditClick = () => {
    setMode("edit");
    toggleShowInput();
    setInput(comment.content);
  };

  const handleEditSubmit = () => {
    if (input) {
      const newComment: CommentData = {
        ...comment,
        content: input,
        timestamp: Date.now(),
      };
      handleCommentAction({
        action: "Edit",
        id: comment.id,
        comment: newComment,
      });
      toggleShowInput();
      setInput("");
    }
  };

  const handleDelete = () => {
    handleCommentAction({ action: "Delete", id: comment.id });
  };
  const time = new Date(comment.timestamp);
  return (
    <div style={{ border: "solid 1px blue" }}>
      <div>{comment.content}</div>
      <div>{time.toLocaleString()}</div>
      <div>{comment.votes}</div>
      <div style={{ display: "flex" }}>
        <button onClick={handleReplyClick}>
          {showInput && mode === "reply" ? "cancel" : "reply"}
        </button>
        <button onClick={handleEditClick}>
          {showInput && mode === "edit" ? "cancel" : "edit"}
        </button>
        <button onClick={handleDelete}>delete</button>
      </div>
      {showInput && (
        <>
          <textarea
            value={input}
            onChange={handleCommentChange}
            rows={3}
            placeholder="add comment"
            cols={50}
          />
          {mode === "edit" && (
            <button onClick={handleEditSubmit}>save edit</button>
          )}
          {mode === "reply" && (
            <button onClick={handleReplySubmit}>add reply</button>
          )}
        </>
      )}
      {comment.replies?.map((c, i) => (
        <div key={i} style={{ marginLeft: 20 }}>
          <Comment comment={c} handleCommentAction={handleCommentAction} />
        </div>
      ))}
    </div>
  );
};

export default Comment;
