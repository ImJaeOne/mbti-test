import React from "react";
import { useTestResults } from "../hooks/useTest";
import { mbtiDescriptions } from "../utils/mbtiCalculator";

const TestResult = () => {
  const { data: results, error } = useTestResults();
  console.log(results);
  return (
    <>
      {results?.map((result) => {
        return (
          <div>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              {result.nickname}님의 테스트 결과는 {result.mbti}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {mbtiDescriptions[result.mbti] ||
                "해당 성격 유형에 대한 설명이 없습니다."}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default TestResult;
