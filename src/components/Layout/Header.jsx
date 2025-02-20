import { Link } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";

const Header = () => {
  const { accessToken, logout } = useAuthStore((state) => state);

  const handleLogout = () => {
    logout();
    alert("로그아웃되었습니다.");
  };

  return (
    <header className="fixed top-0 w-[100%] h-20 px-12 flex justify-between items-center text-lg bg-red-300 text-white">
      <div className="">
        <Link to="/">홈</Link>
      </div>
      <div className="flex gap-3 items-center">
        {accessToken ? (
          <>
            <Link to="/profile">프로필</Link>
            <Link to="/test">테스트</Link>
            <Link to="/result">결과보기</Link>
            <button
              className="bg-red-400 hover:bg-red-500 px-2 py-1 rounded-lg transition-colors"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              className="bg-red-400 hover:bg-red-500 px-2 py-1 rounded-lg transition-colors"
              to="/login"
            >
              로그인
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
