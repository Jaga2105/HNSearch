import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { posts_per_page } from "../helpers/constants";
const Pagination = ({currentPageStartIdx, handlePageIndex, totalPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages=totalPosts/posts_per_page;

  const handlePageDecrease = () => {
    if (currentPage > 1) {
      handlePageIndex(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };
  const handlePageIncrease = () => {
    if (currentPage < totalPages) {
      handlePageIndex(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="flex justify-between my-6 py-2 ">
        <div className="font-semibold">Showing {currentPageStartIdx+1} to {totalPosts<currentPageStartIdx+posts_per_page ? totalPosts : currentPageStartIdx+posts_per_page } of {totalPosts}  </div>
      <div className="flex">
        <div className={`flex justify-center items-center px-2 py-1 mr-2 rounded-full h-8 w-8 shadow-md bg-gray-100 ${currentPage===1 ? 'cursor-not-allowed' : 'cursor-pointer text-black hover:bg-blue-400 hover:text-white'}`}>
          <IoIosArrowBack onClick={handlePageDecrease} />
        </div>
        <div className={`flex justify-center items-center px-2 py-1 mr-2 rounded-full text-black cursor-pointer h-8 w-8 shadow-md bg-gray-100 ${currentPage===totalPages ? 'cursor-not-allowed' : "cursor-pointer text-black hover:bg-blue-400 hover:text-white"}`}>
          <IoIosArrowForward onClick={handlePageIncrease} />
        </div>
      </div>
    </div>
  );
};
export default Pagination;
