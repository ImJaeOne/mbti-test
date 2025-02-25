import React from "react";
import { mbtiDescriptions } from "../../utils/mbtiCalculator";

const TestResultItem = ({ user, data, handleToggle, handleDelete }) => {
  const isOwner = user.userId === data.userId;
  const handleShare = (user, data) => {
    if (!window.Kakao) {
      console.error("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      console.error("Kakao SDK가 초기화되지 않았습니다.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${user.nickname}의 mbti는${data.result}`,
        description: mbtiDescriptions[data.result],
        imageUrl: user.avatar || "https://via.placeholder.com/300",
        link: {
          mobileWebUrl: `${import.meta.env.VITE_MBTI_URL}/result/${data.id}`,
          webUrl: `${import.meta.env.VITE_MBTI_URL}/result/${data.id}`,
        },
      },
      buttons: [
        {
          title: "결과 보기",
          link: {
            mobileWebUrl: `${import.meta.env.VITE_MBTI_URL}/result/${data.id}`,
            webUrl: `${import.meta.env.VITE_MBTI_URL}/result/${data.id}`,
          },
        },
      ],
    });
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-red-500">{data.nickname}</span>
        {isOwner ? (
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
            <button
              className="px-3 py-1 text-sm bg-yellow-300 rounded-md hover:bg-yellow-500 transition"
              onClick={() => handleShare(user, data)}
            >
              카카오톡 공유하기
            </button>
          </div>
        ) : null}
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
  );
};

export default TestResultItem;
