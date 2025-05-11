import { useContext, useRef } from "react";
import {PostList} from "../store/post-list-store";
import { AuthContext } from "../store/auth-store";

const CreatePost = () =>{
    const {addPost} =useContext(PostList);
    const { username, users } = useContext(AuthContext);

    const postTitleElement =useRef();
    const postBodyElement =useRef();
    const reactionElement = useRef();
    const tagsElement =useRef();
    

    const onHandelSubmit= (event) =>{
      event.preventDefault();
      const userId = username;

      if (!users[userId]) {
        alert("User ID is not valid. Please sign in or sign up.");
        return;
      }

      const postTitle = postTitleElement.current.value;
      const postBody = postBodyElement.current.value;
      const tags = tagsElement.current.value.split(' ');
      const reaction = reactionElement.current.value;
      const publishdate = new Date().toISOString().split('T')[0]; 

      postTitleElement.current.value ="";
      postBodyElement.current.value ="";
      reactionElement.current.value ="";
      tagsElement.current.value ="";

      addPost(userId,postTitle,postBody,reaction,tags,publishdate);
    }

    return(
        <form className ="create-post-form" onSubmit={onHandelSubmit}>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Post Title </label>
    <input type="text"ref ={postTitleElement} className="form-control" id="title" aria-describedby="emailHelp" placeholder = "Hope you are good ..."/>
  </div>
 
  <div className="mb-3">
    <label htmlFor="body" className="form-label">Post Description </label>
    <textarea rows="4" ref ={postBodyElement} type="text" className="form-control" id="body" aria-describedby="emailHelp" placeholder = "Tell us more about it ..."/>
  </div>
  <div className="mb-3">
    <label htmlFor="tags" className="form-label">Hash Tags </label>
    <input type="text" ref ={tagsElement} className="form-control" id="tags" aria-describedby="emailHelp" placeholder = "Mention Related Hash Tags!"/>
  </div>
  <div className="mb-3">
    <label htmlFor="reaction" className="form-label">Expected Reaction</label>
    <input type="number" ref ={reactionElement} className="form-control" id="reaction" aria-describedby="emailHelp" placeholder = "What might thought about your Post Reaction .. "/>
  </div>
 
  <button type="submit" className="btn btn-primary">Post</button>
</form>
    );

}
 export default CreatePost;
