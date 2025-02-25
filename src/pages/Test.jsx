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
import Loading from "../components/common/Loading";
import TestResultItem from "../components/TestResults/TestResultItem";

const Test = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { data: [data] = [], isPending } = useTestResult(user.userId);
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

  if (isPending) {
    return <Loading />;
  }

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
            <TestResultItem
              user={user}
              data={data}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
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
