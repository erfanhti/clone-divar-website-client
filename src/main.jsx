import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import defaultOptions from "./configs/reactQueryConfig.js";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/fonts.css";

const queryClient = new QueryClient({ defaultOptions });

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  // </StrictMode>
);
