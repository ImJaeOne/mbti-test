import TestForm from "../components/Test/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import { useCreateTestResult, useTestResult } from "../hooks/useTest";

const Test = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data, error } = useTestResult(user.userId);
  const createTestMutation = useCreateTestResult();

  const handleTestSubmit = async (answers) => {
    const mbtiResult = calculateMBTI(answers);
    createTestMutation.mutate(
      {
        userId: user.userId,
        nickname: user.nickname,
        mbti: mbtiResult,
      },
      {
        onSuccess: () => {
          navigate("/result");
        },
      }
    );
  };

  const handleNavigateToResults = () => {
    navigate("/result");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-[80%] h-full overflow-y-auto">
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
              {data.nickname}님의 테스트 결과는 {data.result}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[data.result] ||
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
