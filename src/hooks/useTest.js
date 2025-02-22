import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTestResult, getTestResults } from "../api/test";

export const useTestResult = (userId) => {
  return useQuery({
    queryKey: ["testResults", userId],
    queryFn: async () => {
      try {
        const testResults = await getTestResults();
        return testResults.find((result) => result.userId === userId);
      } catch (error) {
        console.error("테스트 결과 불러오는데 문제가 발생했습니다.", error);
        return null;
      }
    },
    enabled: !!userId,
  });
};

export const useTestResults = () => {
  return useQuery({
    queryKey: ["testResults"],
    queryFn: async () => {
      try {
        const testResults = await getTestResults();
        return testResults;
      } catch (error) {
        console.error("테스트 결과 불러오는데 문제가 발생했습니다.", error);
        return null;
      }
    },
  });
};

export const useCreateTestResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
    },
  });
};
