import React from "react";
import appwriteService from "../../appwrite/config.js";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="post-card">
        <div className="post-image-container">
          <img src={appwriteService.getFilePreview({ $id })} alt="404" srcset="" />
        </div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
