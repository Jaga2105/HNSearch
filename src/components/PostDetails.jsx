import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import publishedTime from "../helpers/publishedTime";
import parse from "html-react-parser";

const PostDetails = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});

  const getPostDetails = async () => {
    const response = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
    const data = await response.json();
    setPostDetails(data);
  };
  useEffect(() => {
    getPostDetails();
  }, []);
  console.log(postDetails);
  return (
    <div className="mx-40 w-[80%]">
      <div className="bg-violet-200 py-4 px-2">
        <div className="text-2xl font-semibold">{postDetails.title}</div>
        <div>
          <span className="text-sm mr-2">{postDetails.type}</span>
          <span className="font-light">|</span>
          <span className="text-sm ml-2">{postDetails.points} points</span>
        </div>
      </div>
      <div>
        <div>Comments</div>
        <Comment commentDetails={postDetails?.children} />
      </div>
    </div>
  );
};

const Comment = ({ commentDetails }) => {
  const [showReplies, setShowReplies] = useState(false);
  const handleShowReplies = () => {
    setShowReplies((prev) => !prev);
  };
  return (
    <div>
      {commentDetails?.map((comment, index) => (
        <div key={comment.objectID}>
          <div className="flex mb-2">
            <div className="h-10 rounded-full flex items-center justify-center bg-gray-200 mr-2">
              <span className="text-lg w-10 text-center">
                {comment.author.substr(0, 1).toUpperCase()}
              </span>
            </div>
            <div>
              <span className="font-semibold mr-2">{comment.author}</span>
              <span className="text-sm ml-2">
                &#8226;
                <span className="ml-1">
                  {publishedTime(comment.created_at)}
                </span>
              </span>
              <div>{parse(comment?.text)}</div>
              {comment.children.length > 0 && (
                <div
                  className="flex items-center mt-2 cursor-pointer"
                  onClick={handleShowReplies}
                >
                  <div className="h-5 w-5 text-lg flex items-center justify-center border-2 border-gray-400 rounded-full mr-2">
                    {showReplies ? "-" : "+"}
                  </div>
                  {!showReplies && (
                    <div className="text-sm font-light hover:underline">
                      {comment.children.length} more replies
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="ml-10">
            {comment?.children && showReplies && (
              <Comment commentDetails={comment.children} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostDetails;
