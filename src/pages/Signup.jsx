import React from "react";
import SignContainer from "../components/Sign/SignContainer";
import SignInput from "../components/Sign/SignInput";
import SignInputWrapper from "../components/Sign/SignInputWrapper";
import CommonBtn from "../components/common/CommonBtn";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <SignContainer>
      <div className="text-3xl font-bold text-primary-color mb-6">회원가입</div>
      <SignInputWrapper>
        <SignInput type="email" placeholder="아이디" />
        <SignInput type="password" placeholder="비밀번호" />
        <SignInput type="text" placeholder="닉네임" />
        <CommonBtn text="로그인" />
      </SignInputWrapper>
      <div className="flex gap-2">
        이미 계정이 있으신가요?
        <Link to="/login" className="text-red-300">
          로그인
        </Link>
      </div>
    </SignContainer>
  );
};

export default Signup;
