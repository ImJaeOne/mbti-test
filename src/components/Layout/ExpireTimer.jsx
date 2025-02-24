import React, { useEffect } from "react";
import useAuthStore from "../../zustand/authStore";
import useAuth from "../../hooks/useAuth";
import { formatTime } from "../../utils/formatExpiretTime";

const ExpireTimer = () => {
  useAuth();

  const { accessToken, expiresInTime, setExpiresInTime } = useAuthStore();

  useEffect(() => {
    if (!expiresInTime) return;

    const interval = setInterval(() => {
      setExpiresInTime(expiresInTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [accessToken, expiresInTime]);

  return (
    <span className="text-sm hidden md:block">{formatTime(expiresInTime)}</span>
  );
};

export default ExpireTimer;
