import React from "react";

const SignContainer = ({ children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
      {children}
    </div>
  );
};

export default SignContainer;
