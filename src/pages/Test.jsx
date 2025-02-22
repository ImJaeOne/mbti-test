import React, { useState } from "react";
import TestForm from "../components/Test/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { createTestResult, getTestResults } from "../api/test";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import { useQuery } from "@tanstack/react-query";

const Test = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState({
    mbti: "",
    nickname: "",
  });
  const { user } = useAuthStore();

  const { data, error } = useQuery({
    queryKey: ["testResults"],
    queryFn: async () => {
      try {
        const testResults = await getTestResults();
        const existTestResult = testResults.find(
          (result) => result.userId === user.userId
        );
        return existTestResult;
      } catch (error) {
        console.error("테스트 결과 불러오는데 문제가 발생했습니다.", error);
      }
    },
  });

  console.log(data);
  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    await createTestResult({
      userId: user.userId,
      nickname: user.nickname,
      mbti: mbtiResult,
    });
    navigate("/result");
  };

  const handleNavigateToResults = () => {
    navigate("/result");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full h-full overflow-y-auto">
        {!data ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              MBTI 테스트
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {data.mbti}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[data.mbti] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
            <button
              onClick={handleNavigateToResults}
              className="w-full bg-primary-color text-red-300 py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
            >
              결과 페이지로 이동하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Test;
