import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config.js";

function AllPosts() {
  const [post, setPost] = useState([]);


  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      console.log(" AllPost.jsx page --> ", posts);
      if (posts) {
        setPost(posts.documents);
      }
    });
  }, []);

  

  return (
    <div>
      {post.map((pt) => (
        <div key={pt.$id}>
          <PostCard post={pt} />
        </div>
      ))}
    </div>
  );
}

export default AllPosts;
