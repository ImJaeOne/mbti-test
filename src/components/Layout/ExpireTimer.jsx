import React, { useEffect, useState } from "react";
import useAuthStore from "../../zustand/authStore";
import useAuth from "../../hooks/useAuth";

const ExpireTimer = () => {
  useAuth();

  const { accessToken, expiresInTime, setExpiresInTime } = useAuthStore(
    (state) => state
  );
  const [expiresIn, setExpiresIn] = useState(expiresInTime);

  useEffect(() => {
    if (!expiresIn) {
      setExpiresIn(expiresInTime);
    }

    const interval = setInterval(() => {
      setExpiresIn((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [accessToken]);

  useEffect(() => {
    if (expiresIn !== expiresInTime) {
      setExpiresInTime(expiresIn);
    }
  }, [expiresIn]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  return (
    <span className="text-sm hidden md:block">{formatTime(expiresIn)}</span>
  );
};

export default ExpireTimer;
