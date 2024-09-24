import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Theme from "./components/theme/Theme.jsx";
import { GlobalProvider } from "./reducers/global/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ThemeProvider>
    <GlobalProvider>
        <Theme>
          <App />
        </Theme>
    </GlobalProvider>
      </ThemeProvider>
  </StrictMode>
);
