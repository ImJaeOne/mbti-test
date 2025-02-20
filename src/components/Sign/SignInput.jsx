import React from "react";

const SignInput = ({ type, placeholder }) => {
  return (
    <input
      className="w-full p-4 border border-gray-300 rounded-lg"
      type={type}
      placeholder={placeholder}
    />
  );
};

export default SignInput;
