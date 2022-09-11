import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchByUserId, fetchpostsData } from "./store/Post";
import "./Posts.css"

export default function Posts() {
  const [input, setInput] = useState("");

  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
  const Posts = useSelector((state) => state.post.postsData);
  const uniqueObjArray = [1,2,3,4,5,6,7,8,9,10];
  const [currentId,setCurrentId]=useState()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchpostsData());
  }, []);

  const getAllPosts = () => {
    dispatch(fetchpostsData())
    setCurrentId()
  }

  const filterbyUserId = (userId) => {
    dispatch(
      fetchByUserId(userId)
    )
    setCurrentId(userId)
  }

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="main">
      <h1>Example of Redux Toolkit with Redux Thunk</h1>
      <div className="body_container">
        <div className="side">
          <div>
            <h1>Get All Posts</h1>
            <button onClick={()=>getAllPosts()}>All Posts</button>
          </div>
          <div>
            <h1>Get the posts by userId</h1>
            {uniqueObjArray?.map((item,index)=>{
            return(
              <div key={index}>
                <button onClick={()=>filterbyUserId(item)}>userId: {item}</button>
              </div>
            )
          })}
          </div>
        </div>

        <div className="posts">
          <h1>Blog Posts with Title</h1>
          <h1>{currentId?`Posts By userId: ${currentId}`:"Posts by All Users"}</h1>
          <div className="all_posts">
            {Posts?.map((item,index)=>{
              return(
                <div key={index} className="post_container">
                  <p className="image">{item.userId}</p>
                  <div>
                    <p className="title">{item.title}</p>
                    <p className="description">{item.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
    </div>
  );
}
