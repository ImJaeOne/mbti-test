import TestResultList from "../components/TestResults/TestResultList";

const TestResult = () => {
  return (
    <div className=" bg-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-primary-color mb-6">
        다른 사람들의 MBTI는? 
      </h1>
      <TestResultList />
    </div>
  );
};

export default TestResult;
