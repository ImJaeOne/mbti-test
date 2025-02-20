import React from "react";
import SignContainer from "../components/Sign/SignContainer";
import SignInput from "../components/Sign/SignInput";
import SignInputWrapper from "../components/Sign/SignInputWrapper";
import CommonBtn from "../components/common/CommonBtn";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <SignContainer>
      <div className="text-3xl font-bold text-primary-color mb-6">로그인</div>
      <SignInputWrapper>
        <SignInput type="email" placeholder="아이디" />
        <SignInput type="password" placeholder="비밀번호" />
        <CommonBtn text="로그인" />
      </SignInputWrapper>
      <div className="flex gap-2">
        계정이 없으신가요?
        <Link to="/signup" className="text-red-300">
          회원가입
        </Link>
      </div>
    </SignContainer>
  );
};

export default Login;
