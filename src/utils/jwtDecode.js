import { jwtDecode } from "jwt-decode";

export const getTokenExpiration = (accessToken) => {
  if (!accessToken) return null;

  try {
    const decoded = jwtDecode(accessToken);
    return decoded.exp ? Math.floor(decoded.exp - Date.now() / 1000) : null;
  } catch (error) {
    console.error("토큰 디코딩 실패:", error);
    return null;
  }
};
