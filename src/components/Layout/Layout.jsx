import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Layout = () => {
  useAuth();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Header />
      <main className="flex-grow w-full bg-gray-50 flex justify-center items-center pt-20 ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
