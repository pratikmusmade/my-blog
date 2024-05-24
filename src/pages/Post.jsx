import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { useSelector } from "react-redux";
import { Button, Container } from "../components/index.js";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          appwriteService.getFilePreview(post.featuredImage).then((res) => {
            console.log(res.href);
            if (res) setImageSrc(res.href);
          });
        } else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deleteDocument(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div>
          <img src={imageSrc} alt={post.title} />
          {isAuthor && (
            <div>
              <Link to={`/edit-post/${post.$id}`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{post.content && parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
