import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full"
        role="status"
      ></div>
    </div>
  );
};

export default Loading;
