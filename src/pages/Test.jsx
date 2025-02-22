import TestForm from "../components/Test/TestForm";
import { calculateMBTI, mbtiDescriptions } from "../utils/mbtiCalculator";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../zustand/authStore";
import {
  useCreateTestResult,
  useDeleteTestResult,
  useTestResult,
  useToggleTestResult,
} from "../hooks/useTest";

const Test = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data, error } = useTestResult(user.userId);
  const createTestMutation = useCreateTestResult();
  const updateTestMutation = useToggleTestResult();
  const deleteTestMutation = useDeleteTestResult();

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

  const handleToggle = (id, visibility) => {
    updateTestMutation.mutate({ id, visibility });
  };

  const handleDelete = (id) => {
    deleteTestMutation.mutate(id);
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
            <div
              key={data.userId}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-red-500">
                  {data.nickname}
                </span>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    onClick={() => handleToggle(data.id, data.visibility)}
                  >
                    {data.visibility ? "비공개로 전환" : "공개로 전환"}
                  </button>
                  <button
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(data.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <h1 className="flex justify-between text-2xl font-bold text-gray-800">
                <span className="text-red-600">{data.result}</span>
                <span className="text-gray-500 text-sm">{data.date}</span>
              </h1>
              <p className="text-gray-700 mt-4">
                {mbtiDescriptions[data.result] ||
                  "해당 성격 유형에 대한 설명이 없습니다."}
              </p>
            </div>
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
