import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleLoginToggleBtn = () => {
    setIsLogin(!isLogin);
  };
  return (
    <header className="fixed top-0 w-[100%] h-20 px-12 flex justify-between items-center text-lg bg-slate-300">
      <div className="">
        <Link to="/">홈</Link>
      </div>
      <button onClick={handleLoginToggleBtn}>
        {isLogin ? "로그아웃" : "로그인"}
      </button>
      <div className="flex gap-3">
        {isLogin ? (
          <>
            <Link to="/profile">프로필</Link>
            <Link to="/test">테스트</Link>
            <Link to="/result">결과보기</Link>
          </>
        ) : (
          <>
            {" "}
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
