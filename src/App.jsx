import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material";
import theme from "./mui/theme";
import Layout from "./layouts/Layout";
import { CityProvider } from "./context/CityProvider";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CityProvider>
        <BrowserRouter>
          <Layout>
            <Router />
            <ReactQueryDevtools />
          </Layout>
        </BrowserRouter>
      </CityProvider>
    </ThemeProvider>
  );
}

export default App;
