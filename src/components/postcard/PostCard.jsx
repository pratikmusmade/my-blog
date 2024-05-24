import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config.js";
import { Link } from "react-router-dom";
import conf from "../../conf/conf.js";
function PostCard({ $id, title, featuredImage }) {

  const [imageSrc,setImageSrc] = useState("")
  useEffect(()=>{
    appwriteService.getFilePreview(featuredImage).then(res=>{
      console.log(res.href);
      if(res) setImageSrc(res.href)
    })
  },[])

  return (
    <Link to={`/post/${$id}`}>
      <div className="post-card">
        <div className="post-image-container">
          <img src={imageSrc} alt="404"  />
        </div>
        <h2>{title }</h2>
      </div>
    </Link>
  );
}



export default PostCard;
