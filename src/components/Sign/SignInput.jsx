import React from "react";

const SignInput = ({ type, placeholder, name, value, onChange }) => {
  return (
    <input
      className="w-full p-4 border border-gray-300 rounded-lg"
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default SignInput;
