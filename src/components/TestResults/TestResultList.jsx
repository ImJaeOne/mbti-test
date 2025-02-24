import React from "react";
import {
  useDeleteTestResult,
  useTestResults,
  useToggleTestResult,
} from "../../hooks/useTest";
import useAuthStore from "../../zustand/authStore";
import TestResultItem from "./TestResultItem";
import Loading from "../common/Loading";

const TestResultList = () => {
  const user = useAuthStore((state) => state.user);
  const { data, isPending } = useTestResults();
  const updateTestMutation = useToggleTestResult();
  const deleteTestMutation = useDeleteTestResult();

  if(isPending){
    return <Loading/>
  }

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
