import React, { useEffect } from "react";
import useAuthStore from "../../zustand/authStore";
import { formatTime } from "../../utils/formatExpiretTime";
import { useQuery } from "@tanstack/react-query";
import { authValidation } from "../../api/auth";

const ExpireTimer = () => {
  const {
    accessToken,
    expiresInTime,
    setExpiresInTime,
    logout,
    restoreSession,
  } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, []);

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
    refetchInterval: Math.max(expiresInTime * 500, 5000),
  });

  useEffect(() => {
    if (!expiresInTime) return;

    const interval = setInterval(() => {
      setExpiresInTime(expiresInTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresInTime]);

  return (
    <span className="text-sm hidden md:block">{formatTime(expiresInTime)}</span>
  );
};

export default ExpireTimer;
