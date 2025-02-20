import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <main className='mt-20 w-[80%] bg-slate-500 flex justify-center items-center'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
