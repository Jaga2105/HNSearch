import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import publishedTime from "../helpers/publishedTime";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { commentReplies } from "../store/reducers/commentSlice";
import { FaArrowUp } from "react-icons/fa";
import { Grid } from "react-loader-spinner";

const PostDetails = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [showingCommentsCount, setShowingCommentsCount] = useState(10);
  const showingComments = postDetails?.children?.slice(0, showingCommentsCount);
  const [showScrolltoTop, setShowScrolltoTop] = useState(false);

  const getPostDetails = async () => {
    const response = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
    const data = await response.json();
    setPostDetails(data);
  };
  const handleSrolltoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    getPostDetails();
  }, []);
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        window.document.body.offsetHeight - 30
      ) {
        setShowingCommentsCount((prev) => prev + 10);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [showingCommentsCount]);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setShowScrolltoTop(true);
      } else if (scrolled <= 300) {
        setShowScrolltoTop(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, [showScrolltoTop]);
  return (
    <div>
        {Object.keys(postDetails).length===0 ? (
            <div className="flex justify-center items-center h-[600px]">
            <Grid
            height="80"
            width="80"
            color="#3b82f6"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
           </div>
        ) : (
            <div className="mx-60">
      <div className="bg-violet-200 py-4 px-2 text-center mt-2 rounded-sm">
        <div className="text-2xl font-semibold">{postDetails.title}</div>
        <div>
          <span className="text-sm mr-2">{postDetails.type}</span>
          <span className="font-light">|</span>
          <span className="text-sm ml-2">{postDetails.points} points</span>
        </div>
      </div>
      <div className="mt-4">
        <Comments comments={showingComments} />
      </div>
      {showScrolltoTop && (
        <div
          className="fixed right-16 bottom-10 p-4 bg-violet-200 rounded-full shadow-md shadow-violet-400 cursor-pointer"
          onClick={handleSrolltoTop}
        >
          <FaArrowUp />
        </div>
      )}
    </div>
        )}
    
    </div>
  );
};

const Comments = ({ comments }) => {
  const showRepliesArr = useSelector((state) => state.comment.repliesArr);
  console.log(comments);
  return (
    <div>
      {comments?.map((child) => (
        <Comment
          key={child.objectID}
          commentDetails={child}
          showRepliesArr={showRepliesArr}
        />
      ))}
    </div>
  );
};

const Comment = ({ commentDetails, showRepliesArr }) => {
  const dispatch = useDispatch();
  const handleShowReplies = (id) => {
    console.log(id);
    dispatch(commentReplies(id));
  };
  return (
    <div>
      <div key={commentDetails.id}>
        <div className="flex mb-2">
          <div className="h-10 rounded-full flex items-center justify-center bg-gray-200 mr-2">
            <span className="text-lg w-10 text-center">
              {commentDetails.author.substr(0, 1).toUpperCase()}
            </span>
          </div>
          <div>
            <span className="font-semibold mr-2">{commentDetails.author}</span>
            <span className="text-sm ml-2">
              &#8226;
              <span className="ml-1">
                {publishedTime(commentDetails.created_at)}
              </span>
            </span>
            <div className="max-w-full text-ellipsis overflow-hidden">
              {parse(`<div>${commentDetails?.text}</div>`)}
            </div>
            {commentDetails?.children.length > 0 && (
              <div
                className="flex items-center mt-2 cursor-pointer"
                onClick={() => handleShowReplies(commentDetails?.id)}
              >
                <div className="h-5 w-5 text-lg flex items-center justify-center border-2 border-gray-400 rounded-full mr-2">
                  {showRepliesArr?.includes(commentDetails.id) ? "-" : "+"}
                </div>
                <div className="text-sm font-light hover:underline">
                  {showRepliesArr?.includes(commentDetails.id)
                    ? "Hide replies"
                    : `${commentDetails.children.length} more replies`}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="ml-10">
          {commentDetails?.children &&
            showRepliesArr?.includes(commentDetails.id) && (
              <Comments comments={commentDetails.children} />
            )}
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};

export default PostDetails;
