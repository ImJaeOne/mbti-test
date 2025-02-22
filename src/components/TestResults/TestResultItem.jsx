import React from "react";
import { mbtiDescriptions } from "../../utils/mbtiCalculator";

const TestResultItem = ({ isOwner, result, handleToggle, handleDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-red-500">
          {result.nickname}
        </span>
        {isOwner ? (
          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300 transition"
              onClick={() => handleToggle(result.id, result.visibility)}
            >
              비공개로 전환
            </button>
            <button
              className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              onClick={() => handleDelete(result.id)}
            >
              삭제
            </button>
          </div>
        ) : null}
      </div>
      <h1 className="flex justify-between text-2xl font-bold text-gray-800">
        <span className="text-red-600">{result.result}</span>
        <span className="text-gray-500 text-sm">{result.date}</span>
      </h1>
      <p className="text-gray-700 mt-4">
        {mbtiDescriptions[result.result] ||
          "해당 성격 유형에 대한 설명이 없습니다."}
      </p>
    </div>
  );
};

export default TestResultItem;
