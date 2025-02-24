import React, { useEffect } from "react";
import useAuthStore from "../../zustand/authStore";
import { formatTime } from "../../utils/formatExpiretTime";
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

  useEffect(() => {
    if (!expiresInTime) return;

    const interval = setInterval(() => {
      setExpiresInTime(expiresInTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresInTime]);

  useEffect(() => {
    if (expiresInTime === 0) {
      authValidation(accessToken).catch(() => {
        alert("토큰이 만료되었습니다. 다시 로그인 해주세요.");
        logout();
      });
    }
  }, [expiresInTime, accessToken, logout]);

  return (
    <span className="text-sm hidden md:block">{formatTime(expiresInTime)}</span>
  );
};

export default ExpireTimer;
