import { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";


type Props = {};

type PostType = {
  _id:string
  title: string;
  image: string;
  createdAt: string;
  summary: string;
  content: string;
  author: {
    username: string;
  };
};

export default function HomePage({}: Props) {
  const [posts, setPosts] = useState<PostType[]>([]);

  
  // Get all the posts upon loading the page
  useEffect(() => {
    // async function getPost() {
    //   const res = await axios.get('http://localhost:3000/post')
    //   setPosts(res.data)
    //   console.log(res)
      
    // }

    // getPost()
    axios.get("http://localhost:3000/post").then((res) => {
      setPosts(res.data);
    });
    
  }, []);

  console.log(posts);

  return (
    <>
      {/* <Post />
      <Post />
      <Post /> */}
      {posts.length > 0 &&
         posts.map((post) => (
          <Post
          key={post._id}
            id = {post._id}
            title={post.title}
            image={post.image}
            createdAt={post.createdAt}
            summary={post.summary}
            content= {post.content}
            author={post.author.username}
            
          />
        ))}
    </>
  );
}
