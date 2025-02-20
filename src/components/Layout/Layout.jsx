import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Header />
      <main className="flex-grow w-full bg-gray-100 flex justify-center items-center pt-10 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
