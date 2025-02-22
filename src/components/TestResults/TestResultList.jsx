import React from "react";
import {
  useDeleteTestResult,
  useTestResults,
  useToggleTestResult,
} from "../../hooks/useTest";
import useAuthStore from "../../zustand/authStore";
import TestResultItem from "./TestResultItem";

const TestResultList = () => {
  const { user } = useAuthStore();
  const { data, error } = useTestResults();
  const updateTestMutation = useToggleTestResult();
  const deleteTestMutation = useDeleteTestResult();

  const handleToggle = (id, visibility) => {
    updateTestMutation.mutate({ id, visibility });
  };

  const handleDelete = (id) => {
    deleteTestMutation.mutate(id);
  };

  const results = data?.filter((result) => result.visibility === true);

  return (
    <div className=" bg-white flex flex-col justify-center items-center">
      <div className="w-[80%] flex flex-col gap-6">
        {results?.map((result) => (
          <TestResultItem
          key={result.id}
            isOwner={user.userId === result.userId}
            result={result}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TestResultList;
