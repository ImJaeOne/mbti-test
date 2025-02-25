import React, { useEffect } from "react";
import useAuthStore from "../../zustand/authStore";
import { formatTime } from "../../utils/formatExpiretTime";
import { useAuthValidation } from "../../hooks/useAuth";

const ExpireTimer = () => {
  const { accessToken, expiresInTime, setExpiresInTime, restoreSession } =
    useAuthStore();

  useAuthValidation(accessToken, expiresInTime);

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

  return (
    <span className="text-sm hidden md:block">{formatTime(expiresInTime)}</span>
  );
};

export default ExpireTimer;
