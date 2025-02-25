import { useQuery } from "@tanstack/react-query";
import { authValidation } from "../api/auth";
import useAuthStore from "../zustand/authStore";

export const useAuthValidation = (accessToken, expiresInTime) => {
  const { logout } = useAuthStore((state) => state.logout);
  const { data } = useQuery({
    queryKey: ["authValidation", accessToken],
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
    refetchInterval:
      expiresInTime < 10 ? 1000 : Math.max(expiresInTime * 500, 5000),
  });

  return data;
};
