import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import publishedTime from "../helpers/publishedTime";
import Pagination from "./Pagination";
import Shimmer from "./Shimmer";
import { posts_per_page } from "../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { cacheResults, searchText } from "../store/reducers/searchSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPageStartIdx, setCurrentPageStartIdx] = useState(0);
  const [currentPagePosts, setCurrentPagePosts] = useState([]);
  const dispatch = useDispatch();
  const searchCache = useSelector((state) => state.search.searchCache);

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
    <div className="mx-20 lg:mx-40">
      <div className="flex justify-between items-center py-4 px-2 md:px-4 shadow-md bg-blue-400 mt-2 rounded-t-md">
        <div className="text-lg sm:text-xl text-white">HNSearch</div>
        <div className="flex justify-center items-center w-2/4 bg-white focus-within:border-gray-400 px-4 py-2 rounded-md">
          <FaSearch style={{ color: "gray" }} className="mr-4" />
          <input
            type="text"
            name="searchQuery"
            className="w-full outline-none"
            placeholder="Search here"
            onChange={(e) => handleSearchText(e)}
            autoComplete="off"
          />
        </div>
        <div className="text-xs sm:text-sm text-white">Powered by Algolia</div>
      </div>
      {posts.length === 0 ? (
        <Shimmer />
      ) : (
        <div>
          <div className="rounded-b-md bg-gray-100">
            {currentPagePosts.map((post) => (
              <Link to={`/post/${post.objectID}`}>
              <div
                key={post.objectID}
                className="px-2 md:px-4 py-2 cursor-pointer hover:bg-gray-200"
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
              </Link>
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
