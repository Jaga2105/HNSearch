import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import publishedTime from "../helpers/publishedTime";
import Pagination from "./Pagination";
import Shimmer from "./Shimmer";
import { posts_per_page } from "../helpers/constants";

const Home = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPageStartIdx, setCurrentPageStartIdx] = useState(0);
  const [currentPagePosts, setCurrentPagePosts] = useState([]);

  const handleSearchText = (e) => {
    setsearchQuery(e.target.value);
  };
  const getPosts = async () => {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${searchQuery}`
    );
    const data = await response.json();
    console.log(data.hits);
    setPosts(data.hits);
  };

  const getCurrentPagePosts = () => {
    const currentPagePostArr = posts.filter(
      (post, index) =>
        index >= currentPageStartIdx &&
        index < currentPageStartIdx + posts_per_page
    );
    setCurrentPagePosts(currentPagePostArr);
  };
  const handlePageIndex = (currentPage) => {
    setCurrentPageStartIdx((currentPage - 1) * posts_per_page);
  };

  useEffect(() => {
    getPosts();
  }, [searchQuery]);
  useEffect(() => {
    getCurrentPagePosts();
  }, [currentPageStartIdx, posts]);
  console.log(currentPagePosts);
  console.log(posts);
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
      {posts.length === 0 ? (
        <Shimmer />
      ) : (
        <div>
          <div>
            {currentPagePosts.map((post, index) => (
              <div className="p-2 bg-[#e6e6fa] mb-1 rounded-md cursor-pointer">
                <div className="text-lg font-semibold">{post.title}</div>
                <div>
                  <span className="text-sm mr-2">Author: {post.author}</span>
                  <span>|</span>
                  <span className="text-sm ml-2">
                    Published: {publishedTime(post.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            // totalPages={posts.length / posts_per_page}
            currentPageStartIdx={currentPageStartIdx}
            handlePageIndex={handlePageIndex}
            totalPosts={posts.length}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
