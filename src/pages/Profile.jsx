import React, { useState } from "react";
import SignContainer from "../components/Sign/SignContainer";
import SignInput from "../components/Sign/SignInput";
import SignInputWrapper from "../components/Sign/SignInputWrapper";
import CommonBtn from "../components/common/CommonBtn";
import { updateProfile } from "../api/auth";
import useAuthStore from "../zustand/authStore";
import { useTestResult, useUpdateProfileTestUser } from "../hooks/useTest";

const Login = () => {
  const { user, accessToken, setUser } = useAuthStore();
  const [inputData, setInputData] = useState({
    avatar: "",
    nickname: user.nickname,
  });
  const { data: test } = useTestResult(user.userId);
  const updateUserMutation = useUpdateProfileTestUser();

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
      const result = await updateProfile({
        ...inputData,
        accessToken: accessToken,
      });
      if (result) {
        setUser({ nickname: result.nickname });
        alert("프로필이 성공적으로 업데이트 되었습니다.");
      }
      updateUserMutation.mutate({
        id: test.id,
        nickname: result.nickname,
      });
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패하였습니다.");
    }
  };

  return (
    <SignContainer>
      <div className="text-3xl font-bold text-primary-color mb-6">프로필</div>
      <SignInputWrapper onSubmit={handleSubmit}>
        <SignInput
          type="text"
          placeholder="닉네임"
          name="nickname"
          value={inputData.nickname}
          onChange={handleChange}
        />
        <CommonBtn text="프로필 업데이트" />
      </SignInputWrapper>
    </SignContainer>
  );
};

export default Login;
