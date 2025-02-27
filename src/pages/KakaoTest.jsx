import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTestResultById } from "../api/test";
import { mbtiDescriptions } from "../utils/mbtiCalculator";
import Loading from "../components/common/Loading";

const KakoTest = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getTestResultById(id);
        setResult(data);
      } catch (error) {
        console.error("결과를 불러오는 중 오류 발생:", error);
      }
    };

    fetchResult();
  }, [id]);

  if (!result) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800">
        {result.nickname}님의 MBTI 결과
      </h1>
      <h2 className="text-red-600 text-xl mt-4">{result.result}</h2>
      <p className="text-gray-700 mt-4">
        {mbtiDescriptions[result.result] || "설명이 없습니다."}
      </p>
    </div>
  );
};

export default KakoTest;
