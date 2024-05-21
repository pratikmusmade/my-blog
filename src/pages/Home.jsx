import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config.js";
import { Container, PostCard } from "../components";
function Home() {
  // console.log("Inside Home"); 
  const [post, setPost] = useState([]);
  useEffect(() => {

    

    appwriteService.getPosts([]).then((posts) => {
      // console.log(" AllPost.jsx page --> ", posts);
      if (posts) {
        setPost(posts.documents);
      }
      
    });
  }, []);
  if (post.length === 0) {
    return <h1>No Posts</h1>;
  }
  return (
    <div>
      <Container>
        Home
        {post.map((pt) => (
          <div key={pt.$id}>
            <PostCard post={pt} />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Home;
