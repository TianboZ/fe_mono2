/*
functional requirement:
- nesting
- comment add/delete/edit
- reply comment
- like/dislike
- sorting

non-functional req:
- render long list: virtualization
- scability
- accessbility

HLD:


Data:
type CommentProps = {
  id: string;
  content: stirng;
  replies: CommentProps[];
  time: string;
}


*/

import React from "react";
import NestedComments from "./NestedComments";

const App = () => {
  return (
    <div>
      <NestedComments />
    </div>
  );
};

export default App;
