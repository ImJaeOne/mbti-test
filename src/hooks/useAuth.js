import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../zustand/authStore";
import { authValidation } from "../api/auth";

const useAuth = () => {
  const { accessToken, setUser, logout } = useAuthStore((state) => state);

  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const user = await authValidation(accessToken);
        return user;
      } catch (error) {
        logout();
        alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        return null;
      }
    },
    staleTime: 1000 * 30,
    refetchInterval: 30000,
    retry: 1,
    enabled: !!accessToken, // 액세스 토큰이 존재할 때만 시도
  });

  return { user, error };
};

export default useAuth;
