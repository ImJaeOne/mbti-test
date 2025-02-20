import React from "react";

const SignInputWrapper = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 justify-center items-center w-full bg-white shadow-lg rounded-lg p-8 mb-8"
    >
      {children}
    </form>
  );
};

export default SignInputWrapper;
