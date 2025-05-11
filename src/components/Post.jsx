import { AiTwotoneDelete } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as faThumbsUpSolid,
  faThumbsDown as faThumbsDownSolid,
  faComment as faCommentSolid
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpRegular,
  faThumbsDown as faThumbsDownRegular,
  faComment as faCommentRegular,
} from "@fortawesome/free-regular-svg-icons";
import { useContext, useState, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { AuthContext } from "../store/auth-store";
import CommentBox from "./CommentBox";

const Post = ({ post }) => {
  const { deletePost, addComment } = useContext(PostList);
  const { username } = useContext(AuthContext);

  const randomUserIdRef = useRef("user_" + Math.floor(Math.random() * 1000));

  const totalReactionsRef = useRef(Math.floor(Math.random() * 501));
  const initialLike = useRef(Math.floor(Math.random() * (totalReactionsRef.current + 1)));
  const initialDislike = useRef(totalReactionsRef.current - initialLike.current);

  const [likeCount, setLikeCount] = useState(initialLike.current);
  const [dislikeCount, setDislikeCount] = useState(initialDislike.current);
  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const [isLikeBouncing, setIsLikeBouncing] = useState(false);
  const [isDislikeBouncing, setIsDislikeBouncing] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [isCommentButtonAnimated, setIsCommentButtonAnimated] = useState(false);
  const [commentButtonColor, setCommentButtonColor] = useState("inherit"); 

  // Color states for Like and Dislike buttons
  const [likeButtonColor, setLikeButtonColor] = useState("inherit"); 
  const [dislikeButtonColor, setDislikeButtonColor] = useState("inherit"); 

  const commentCount = post.comments?.length || 0;
  const reactionCount = likeCount + dislikeCount;

  const handleLikeClick = () => {
    setIsLikeBouncing(true);
    setTimeout(() => setIsLikeBouncing(false), 1000);

    if (likeActive) {
      setLikeActive(false);
      setLikeCount((count) => Math.max(0, count - 1));
      setLikeButtonColor("inherit"); 
    } else {
      setLikeActive(true);
      setLikeCount((count) => count + 1);
      setLikeButtonColor("#007bff"); 
      if (dislikeActive) {
        setDislikeActive(false);
        setDislikeCount((count) => Math.max(0, count - 1));
        setDislikeButtonColor("inherit"); 
      }
    }
  };

  const handleDislikeClick = () => {
    setIsDislikeBouncing(true);
    setTimeout(() => setIsDislikeBouncing(false), 1000);

    if (dislikeActive) {
      setDislikeActive(false);
      setDislikeCount((count) => Math.max(0, count - 1));
      setDislikeButtonColor("inherit"); 
    } else {
      setDislikeActive(true);
      setDislikeCount((count) => count + 1);
      setDislikeButtonColor("red"); 

      if (likeActive) {
        setLikeActive(false);
        setLikeCount((count) => Math.max(0, count - 1));
        setLikeButtonColor("inherit"); 
      }
    }
  };

  const handleCommentClick = () => {
    // Trigger animation
    setIsCommentButtonAnimated(true);

    setShowComments((prevState) => !prevState);

    if (!showComments) {
      setCommentButtonColor("#007bff"); 
    } else {
      setCommentButtonColor("inherit"); 
    }

    setTimeout(() => setIsCommentButtonAnimated(false), 1000); 
  };

  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-start">
          {post.title}
          {/* <span
            className="badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
            style={{ cursor: "pointer" }}
          >
            <AiTwotoneDelete />
          </span> */}
        </h5>

        <p className="card-text">{post.body}</p>

        <div className="mb-2">
          <p><b>Posted by:</b> {post.userId ? (typeof post.userId === 'number' ? `user_${post.userId}` : post.userId) : randomUserIdRef.current}</p>
          <p><b>Posted on:</b> {post.publishDate || post.publishdate || "N/A"}</p>
        </div>

        {post.tags?.length > 0 ? (
          post.tags.map((tag) => (
            <span key={tag} className="badge bg-primary me-1">#{tag}</span>
          ))
        ) : (
          <p>No tags available</p>
        )}

        <div className="alert alert-success mt-3">
          This post has {reactionCount} reactions and {Math.floor(Math.random() * 1000)} views.
        </div>

        {/* {commentCount < reactionCount && (
          <div className="alert alert-info">
            This post has {commentCount} comments.
          </div>
        )} */}
    

        
        <div className="d-flex align-items-center mb-3" style={{ gap: "20px", marginLeft: "2rem" }}>
             <div className="d-flex align-items-center" style={{ gap: "6px" }}>

          {/* Comment Button */}
          <button
            onClick={handleCommentClick}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
            }}
            title={showComments ? "Hide Comments" : "Show Comments"}
          >
            <FontAwesomeIcon
              icon={showComments ? faCommentSolid : faCommentRegular}
              beatFade={isCommentButtonAnimated} // Apply animation on click
              style={{
                fontSize: "1.7rem",
                color: commentButtonColor,   // Use dynamic color based on state
                transition: "color 0.3s ease", // Smooth transition for color change
              }}
            />
          </button>
            <span>  
          
             {commentCount} </span>
             </div>

          {/* Like Button */}
          <div className="d-flex align-items-center" style={{ gap: "6px" }}>
            <FontAwesomeIcon
              icon={likeActive ? faThumbsUpSolid : faThumbsUpRegular}
              bounce={isLikeBouncing}
              onClick={handleLikeClick}
              style={{
                color: likeButtonColor, // Dynamic color based on like button state
                cursor: "pointer",
                fontSize: "1.7rem",
                transition: "color 0.3s ease", 
              }}
            />
            <span>{likeCount}</span>
          </div>

          {/* Dislike Button */}
          <div className="d-flex align-items-center" style={{ gap: "6px" }}>
            <FontAwesomeIcon
              icon={dislikeActive ? faThumbsDownSolid : faThumbsDownRegular}
              bounce={isDislikeBouncing}
              onClick={handleDislikeClick}
              style={{
                color: dislikeButtonColor, // Dynamic color based on dislike button state
                cursor: "pointer",
                fontSize: "1.7rem",
                transition: "color 0.3s ease", 
              }}
            />
            <span>{dislikeCount}</span>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <CommentBox
            postId={post.id}
            comments={post.comments}
            username={username || randomUserIdRef.current}
            addComment={addComment}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
