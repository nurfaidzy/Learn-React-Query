import { useState } from "react";
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
import axios from "axios";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );

  const { data } = response;
  console.log(data);

  return data;
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery("posts", fetchPosts);
  console.log(isLoading);

  return (
    <>
      <ul>
        {isError && (
          <>
            <p>Error with result : {error.toString()}</p>
          </>
        )}
        {isLoading && (
          <>
            <p>Loading</p>
          </>
        )}
        {data !== undefined &&
          data.map((post) => (
            <li
              key={post.id}
              className="post-title"
              onClick={() => setSelectedPost(post)}
            >
              {post.title}
            </li>
          ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
