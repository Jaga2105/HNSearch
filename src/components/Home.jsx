import React from "react";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const list = ["Relicensing React, Jest, Flow, and Immutable.js",
                "Build Your Own React",
              "React Native is now open source",
            "Explaining React's license",
          "React 16",
        "React I love you, but you're bringing me down"]
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
          />
        </div>
        <div className="text-sm">Powered by Algolia</div>
      </div>
    </div>
  );
};

export default Home;
