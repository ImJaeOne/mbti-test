import React, { useState } from "react";
import SignContainer from "../components/Sign/SignContainer";
import SignInput from "../components/Sign/SignInput";
import SignInputWrapper from "../components/Sign/SignInputWrapper";
import CommonBtn from "../components/common/CommonBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authLogin } from "../api/auth";
import useAuthStore from "../zustand/authStore";
import { getTokenExpiration } from "../utils/jwtDecode";

const Login = () => {
  const { setUser, setAccessToken, setExpiresInTime } = useAuthStore(
    (state) => state
  );
  const { state } = useLocation();

  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authLogin(inputData);
      if (result) {
        const { accessToken, avatar, nickname, userId } = result;
        const expiresInTime = getTokenExpiration(accessToken);
        setUser({ avatar, nickname, userId });
        setAccessToken(accessToken, expiresInTime);
        setExpiresInTime(expiresInTime);
        alert("로그인이 완료되었습니다.");
        if (state) {
          navigate(state.redirectedFrom);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <SignContainer>
      <div className="text-3xl font-bold text-primary-color mb-6">로그인</div>
      <SignInputWrapper onSubmit={handleSubmit}>
        <SignInput
          type="email"
          placeholder="아이디"
          name="id"
          value={inputData.id}
          onChange={handleChange}
        />
        <SignInput
          type="password"
          placeholder="비밀번호"
          name="password"
          value={inputData.password}
          onChange={handleChange}
        />
        <CommonBtn text="로그인" />
      </SignInputWrapper>
      <div className="flex gap-2">
        계정이 없으신가요?
        <Link
          to="/signup"
          className="text-red-300 hover:text-red-400 transition-colors"
        >
          회원가입
        </Link>
      </div>
    </SignContainer>
  );
};

export default Login;
