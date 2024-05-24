import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config.js";
import { useSelector } from "react-redux";

function AllPosts() {
  const [post, setPost] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  console.log("userData => ",userData);

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
      {post.map((pt) => {
        console.log("pt --> ",pt);
        return (<div key={pt.$id}>
          <PostCard {...pt} />
        </div>)
})}
    </div>
  );
}

export default AllPosts;
