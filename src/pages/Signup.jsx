import React, { useState } from "react";
import SignContainer from "../components/Sign/SignContainer";
import SignInput from "../components/Sign/SignInput";
import SignInputWrapper from "../components/Sign/SignInputWrapper";
import CommonBtn from "../components/common/CommonBtn";
import { Link, useNavigate } from "react-router-dom";
import { authRegister } from "../api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    id: "",
    password: "",
    nickname: "",
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
      const result = await authRegister(inputData);
      if (result) {
        console.log("회원가입 완료:", result.message);
        alert("회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <SignContainer>
      <div className="text-3xl font-bold text-primary-color mb-6">회원가입</div>
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
        <SignInput
          type="text"
          placeholder="닉네임"
          name="nickname"
          value={inputData.nickname}
          onChange={handleChange}
        />
        <CommonBtn text="회원가입" />
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
