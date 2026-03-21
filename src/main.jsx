import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CommonLayout from "./components/CommonLayout";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
