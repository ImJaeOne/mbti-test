import React from "react";

const CommonBtn = ({ text }) => {
  return (
    <button className="w-full text-white py-2 px-3 bg-red-300 hover:bg-red-400 rounded-xl transition-colors">
      {text}
    </button>
  );
};

export default CommonBtn;
