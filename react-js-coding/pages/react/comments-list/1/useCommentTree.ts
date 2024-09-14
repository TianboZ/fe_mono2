import { useState } from "react";

export type CommentData = {
  id: string;
  content: string;
  replies?: CommentData[];
  votes: number;
  timestamp: string;
};

export type HandleCommentActionProps = {
  action: "NewComment" | "Delete" | "Edit" | "Reply";
  id?: string;
  comment?: CommentData;
};

const useCommentTree = (initial) => {
  const [comments, setComments] = useState<CommentData[]>(initial);

  const handleCommentAction = ({
    action,
    id,
    comment,
  }: HandleCommentActionProps) => {
    if (action === "NewComment") {
      setComments([comment, ...comments]);
    }

    if (action === "Delete") {
      const remove = (comments: CommentData[], id) => {
        const c = comments.find((c) => c.id === id);
        if (c) {
          return comments.filter((c) => c.id !== id);
        }
        return comments.map((c) => {
          if (c.replies?.length) {
            return {
              ...c,
              replies: remove(c.replies, id),
            };
          }
          return c;
        });
      };

      setComments(remove(comments, id));
    }

    if (action === "Edit") {
      const edit = (comments: CommentData[], id, newComment: CommentData) => {
        return comments.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              ...newComment,
              replies: [...(c.replies || [])],
            };
          }
          if (c.replies?.length) {
            return {
              ...c,
              replies: edit(c.replies, id, newComment),
            };
          }
          return c;
        });
      };
      setComments(edit(comments, id, comment));
    }

    if (action === "Reply") {
      const insert = (comments: CommentData[], id, newComment: CommentData) => {
        return comments.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              replies: [newComment, ...(c.replies || [])],
            };
          }
          if (c.replies?.length) {
            return {
              ...c,
              replies: insert(c.replies, id, newComment),
            };
          }
          return c;
        });
      };
      setComments(insert(comments, id, comment));
    }
  };

  return {
    comments,
    handleCommentAction,
  };
};

export default useCommentTree;
