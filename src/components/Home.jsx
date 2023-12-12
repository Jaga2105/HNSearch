import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import publishedTime from "../helpers/publishedTime";
import Pagination from "./Pagination";
import Shimmer from "./Shimmer";
import { posts_per_page } from "../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults, searchText } from "../store/reducers/searchSlice";

const Home = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPageStartIdx, setCurrentPageStartIdx] = useState(0);
  const [currentPagePosts, setCurrentPagePosts] = useState([]);
  const dispatch = useDispatch();
  const searchCache = useSelector((state) => state.search.searchCache);
  console.log(searchCache);

  const handleSearchText = (e) => {
    dispatch(searchText(e.target.value));
    setsearchQuery(e.target.value);
  };
  const getPosts = async () => {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?query=${searchQuery}`
    );
    const data = await response.json();
    setPosts(data.hits);
    dispatch(cacheResults({ [searchQuery]: data.hits }));
    console.log("testing");
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
    // This is the logic for debouncing which makes app performant
    //  by reducing unwanted API calls
    const timer = setTimeout(() => {
      // It results for the searchQuery is already in the cacheResults
      // then it will not make an API call
      if (!searchCache[searchQuery]) {
        getPosts();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  useEffect(() => {
    getCurrentPagePosts();
  }, [currentPageStartIdx, posts]);
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
            {currentPagePosts.map((post) => (
              <div
                key={post.story_id}
                className="p-2 bg-[#e6e6fa] mb-1 rounded-md cursor-pointer"
              >
                <div className="text-lg font-semibold">{post.title}</div>
                <div>
                  <span className="text-sm mr-2 font-light">
                    Author: {post.author}
                  </span>
                  <span className="font-light">|</span>
                  <span className="text-sm ml-2 font-light">
                    {publishedTime(post.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Pagination
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
