import { useQuery } from "@tanstack/react-query";
import { authValidation } from "../api/auth";
import useAuthStore from "../zustand/authStore";
import { AUTH_QUERY_KEY } from "../constants/queryKey";

export const useAuthValidation = (accessToken, expiresInTime) => {
  const { logout } = useAuthStore((state) => state);
  const { data } = useQuery({
    queryKey: [AUTH_QUERY_KEY, accessToken],
    queryFn: async () => {
      try {
        return await authValidation(accessToken);
      } catch (error) {
        alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        logout();
        return null;
      }
    },
    enabled: !!accessToken,
    staleTime: expiresInTime * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: expiresInTime < 1 && 1000,
  });

  return data;
};
