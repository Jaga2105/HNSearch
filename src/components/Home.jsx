import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const list = [
    "Relicensing React, Jest, Flow, and Immutable.js",
    "Build Your Own React",
    "React Native is now open source",
    "Explaining React's license",
    "React 16",
    "React I love you, but you're bringing me down",
  ];
  const [searchQuery, setsearchQuery] = useState("")
  const [posts, setPosts] = useState([])

  const handleSearchText = (e) => {
    setsearchQuery(e.target.value)
  };
  const getPosts = async()=>{
    const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    const data = await response.json();
    setPosts(data.hits)
  }
  useEffect(()=>{
    getPosts()
  },[])
  console.log(posts)
  return (
    <div className="mx-40">
      <div className="flex justify-between py-4 px-2 shadow-md mb-10">
        <div className="text-xl">HNSearch</div>
        <div className="flex justify-center items-center w-2/4 border-2 focus-within:border-gray-400 px-4 py-2 rounded-md">
          <FaSearch style={{ color: "gray" }} className="mr-4" />
          <input
            type="text"
            name="searchQuery"
            className="w-full outline-none"
            placeholder="Search here"
            onChange={(e) => handleSearchText(e)}
          />
        </div>
        <div className="text-sm">Powered by Algolia</div>
      </div>
      <div>
        {posts.map((post, index) => (
          <div className="p-2 bg-[#e6e6fa] mb-2 rounded-md cursor-pointer">
            <div className="text-lg font-semibold">{post.title}</div>
            <div>
              <span className="text-sm mr-2">author: {post.author}</span>
              <span className="text-sm">published: {post.created_at}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
