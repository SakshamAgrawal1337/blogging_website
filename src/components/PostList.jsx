import { useContext, useEffect, useState } from 'react';
import Post from './Post';
import {PostList as PostListData} from '../store/post-list-store';
import WelcomeMessage from './WelcomeMessage';
import LoadingSpinner from "./LoadingSpinner";

const PostList = ({ searchTag }) => {
  const [fetching, setFetching] = useState(false);
  const { postList, addInitialPosts } = useContext(PostListData);

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://dummyjson.com/posts', { signal })
      .then(res => res.json())
      .then(data => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
    return () => {
      // cleaning up use effect
      controller.abort();
    };
  }, []);



  const filteredPosts = postList.filter(post =>
    searchTag === '' ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTag.toLowerCase())))
  );

  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && filteredPosts.length === 0 && <WelcomeMessage />}
      {!fetching && filteredPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
