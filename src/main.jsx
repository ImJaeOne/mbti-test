import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const kakaoApiKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

const loadKakaoSDK = () => {
  const script = document.createElement("script");
  script.src = "https://developers.kakao.com/sdk/js/kakao.js";
  script.async = true;
  script.onload = () => {
    if (window.Kakao) {
      window.Kakao.init(kakaoApiKey);
    }
  };
  document.head.appendChild(script);
};

loadKakaoSDK();

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </StrictMode>
);
