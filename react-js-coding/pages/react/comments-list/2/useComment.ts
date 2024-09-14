import { useEffect, useState } from "react";
import { CommentData } from "./Comment";
import MOCK from "./data.json";

type CommentHookRes = {
  data: CommentData[] | undefined;
  handleCommentAction: (
    type: "edit" | "add" | "delete",
    content: CommentData,
    id?: string
  ) => void;
};

const useComment = (): CommentHookRes => {
  const [data, setData] = useState<CommentData[]>([]);

  useEffect(() => {
    // api call
    setData(MOCK);
  }, []);

  const handleCommentAction = (
    type: "edit" | "add" | "delete",
    newComment: CommentData,
    id?: string
  ) => {
    if (type === "add") {
      if (id) {
        // reply comment
        const insertById = (comments: CommentData[]): CommentData[] => {
          return comments.map((comment) => {
            if (comment.id === id) {
              comment.replies = [newComment, ...(comment.replies || [])];
              return comment;
            }
            const newReplies = insertById(comment.replies || []);
            comment.replies = newReplies;
            return comment;
          });
        };

        setData(insertById(data));
      } else {
        // add new comment
        setData([newComment, ...(data || [])]);
      }
    }

    if (type === "edit") {
      // todo
      const editById = (comments: CommentData[]): CommentData[] => {
        return comments.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              ...newComment,
            };
          }
          comment.replies = editById(comment.replies || []);
          return comment;
        });
      };
      setData(editById(data));
    }

    if (type === "delete") {
      const removeById = (comments: CommentData[]): CommentData[] => {
        const target = comments.find((c) => c.id === id);
        if (target) {
          return comments.filter((c) => c.id !== id);
        } else {
          return comments.map((c) => ({
            ...c,
            replies: removeById(c.replies || []),
          }));
        }
      };
      setData(removeById(data));
    }
  };

  return {
    data,
    handleCommentAction,
  };
};

export default useComment;
