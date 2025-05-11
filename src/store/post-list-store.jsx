import { createContext, useReducer } from "react";

export const PostList = createContext({
    postList: [],
    addPost: () =>{},
    addInitialPosts: ()=> {},
    deletePost: () =>{},
    addComment: () => {},
});

const getRandomDate = () => {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 2); // 2 years ago
    const end = new Date();
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);
    return randomDate.toISOString().split('T')[0];
};

const randomCommentsPool = [
    "Great post!",
    "Thanks for sharing.",
    "Interesting perspective.",
    "I totally agree.",
    "Well said!",
    "This is very helpful.",
    "Nice work!",
    "Looking forward to more posts like this.",
    "I learned something new today.😊",
    "Keep it up!👍",
    "👍",
    "🙌"
];

const getRandomComments = () => {
    const count = Math.floor(Math.random() * 15); 
    const comments = [];
    for(let i = 0; i < count; i++){
        const text = randomCommentsPool[Math.floor(Math.random() * randomCommentsPool.length)];
        const userId = "user_" + Math.floor(Math.random() * 1000);
        comments.push({
            id: Date.now() + i,
            text,
            userId,
        });
    }
    return comments;
};

const postListReducer =(currPostList, action) =>{
    let newPostList = currPostList;
    if (action.type === 'DELETE_POST'){
        newPostList= currPostList.filter((post)=> post.id !== action.payload.postId) ;
    }
    else if(action.type === 'ADD_INITIAL_POSTS'){
        const existingIds = new Set(currPostList.map(post => post.id));
        const newPosts = action.payload.posts
            .filter(post => !existingIds.has(post.id))
            .map(post => ({
                ...post,
                publishdate: post.publishdate || getRandomDate(),
                comments: post.comments && post.comments.length > 0 ? post.comments : getRandomComments(),
            }));
        newPostList = [...newPosts, ...currPostList];
    }
    else if(action.type === 'ADD_POST'){
        newPostList = [ action.payload , ...currPostList];
    }
    else if(action.type === 'ADD_COMMENT'){
        newPostList = currPostList.map(post => {
            if(post.id === action.payload.postId){
                return {
                    ...post,
                    comments: [...(post.comments || []), action.payload.comment]
                };
            }
            return post;
        });
    }
    return newPostList;
}
const PostListProvider  = ({ children }) => {
    const [postList , dispatchPostList] =useReducer(postListReducer ,[]);
    
    const addPost = (userId,postTitle,postBody,reaction,tags,publishdate) => {
        dispatchPostList({
            type: 'ADD_POST',
            payload:    {
                id: Date.now(),
                title: postTitle,
                body : postBody,
                publishdate: publishdate,
                reactions: reaction,
                userId : userId ,
                tags : tags,
                comments: [], // initialize comments array
            }
        })
    };

    const addInitialPosts = (posts) => {
        dispatchPostList({
            type: 'ADD_INITIAL_POSTS',
            payload:{
                posts,
            },
        });
    };
    
    const deletePost = (postId) => {
        dispatchPostList({
            type: "DELETE_POST",
            payload : {
                postId,
            },
        });
    };

    const addComment = (postId, comment) => {
        dispatchPostList({
            type: 'ADD_COMMENT',
            payload: {
                postId,
                comment,
            },
        });
    };

    return <PostList.Provider value ={{postList, addPost, addInitialPosts, deletePost, addComment}}>{children}</PostList.Provider>
}

export default PostListProvider;
