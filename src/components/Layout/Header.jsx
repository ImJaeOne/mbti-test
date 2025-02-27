import { Link } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import ExpireTimer from "./ExpireTimer";

const Header = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    alert("로그아웃되었습니다.");
  };

  return (
    <header className="fixed top-0 w-full h-20 px-6 flex justify-between items-center bg-red-300 text-white z-50">
      <Link to="/">홈</Link>

      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <nav
        className={`absolute md:relative top-20 md:top-auto right-0 w-full md:w-auto bg-white text-red-200 md:text-white md:bg-transparent flex flex-col md:flex-row items-center md:gap-4 md:p-0 transition-all ${
          menuOpen ? "block" : "hidden"
        } md:flex`}
      >
        {accessToken ? (
          <>
            <ExpireTimer />
            <span className="text-sm hidden md:block">{user.nickname}님</span>
            <Link to="/profile" className="p-2 hover:text-red-400 md:p-0">
              프로필
            </Link>
            <Link to="/test" className="p-2 hover:text-red-400 md:p-0">
              테스트
            </Link>
            <Link to="/result" className="p-2 hover:text-red-400 md:p-0">
              결과보기
            </Link>
            <button
              className="p-2 md:bg-red-400 md:hover:bg-red-500 md:px-2 md:py-1 md:rounded-lg md:transition-colors"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link
            className="bg-red-400 hover:bg-red-500 px-2 py-1 rounded-lg transition-colors"
            to="/login"
          >
            로그인
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
