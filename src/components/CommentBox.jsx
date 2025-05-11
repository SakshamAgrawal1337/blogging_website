import React, { useState } from "react";

const CommentBox = ({ postId, comments = [], username, addComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (commentText.trim() === "") return;

    const newComment = {
      id: Date.now(),
      text: commentText.trim(),
      userId: username,
    };

    addComment(postId, newComment);
    setCommentText("");
  };

  return (
    <div className="comments-dashboard border p-3">
      <h6>Comments</h6>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="border-bottom pb-2 mb-2">
            <b>{comment.userId}</b>: {comment.text}
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      <div className="add-comment d-flex mt-2">
        {username ? (
          <>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
            />
            <button className="btn btn-primary" onClick={handleAddComment}>
              Add
            </button>
          </>
        ) : (
          <p>Please sign in to add comments.</p>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
