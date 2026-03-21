import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CommonLayout from "./components/CommonLayout";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./pages/Dashboard";
import Testimonial from "./pages/Testimonial";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="testimonial" element={<Testimonial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
