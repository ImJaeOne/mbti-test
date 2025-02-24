import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTestResult,
  deleteTestResult,
  getTestResults,
  updateTestResultVisibility,
  updateProfileTestUser,
} from "../api/test";
import { TEST_QUERY_KEY } from "../constants/queryKey";

export const useTestResult = (userId) => {
  return useQuery({
    queryKey: [TEST_QUERY_KEY, userId],
    queryFn: async () => {
      try {
        const testResults = await getTestResults();
        return testResults.find((result) => result.userId === userId) || null;
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
    queryKey: [TEST_QUERY_KEY],
    queryFn: async () => {
      try {
        const testResults = await getTestResults();
        return testResults || null;
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
      queryClient.invalidateQueries([TEST_QUERY_KEY]);
    },
  });
};

export const useToggleTestResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTestResultVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries([TEST_QUERY_KEY]);
    },
  });
};

export const useDeleteTestResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries([TEST_QUERY_KEY]);
    },
  });
};

export const useUpdateProfileTestUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileTestUser,
    onSuccess: () => {
      queryClient.invalidateQueries([TEST_QUERY_KEY]);
    },
  });
};
