import React from "react";

const CommonBtn = ({ text }) => {
  return (
    <button className="w-full text-white py-2 px-3 bg-red-300 rounded-xl">
      {text}
    </button>
  );
};

export default CommonBtn;
