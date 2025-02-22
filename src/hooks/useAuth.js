import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../zustand/authStore";
import { authValidation } from "../api/auth";

const useAuth = () => {
  const { accessToken, expiresInTime, logout } = useAuthStore((state) => state);

  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const user = await authValidation(accessToken);
        return user;
      } catch (error) {
        alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        logout();
        return null;
      }
    },
    staleTime: 1000 * expiresInTime,
    refetchInterval: 900 * expiresInTime,
    retry: 1,
    enabled: !!accessToken,
  });

  return { user, error };
};

export default useAuth;
