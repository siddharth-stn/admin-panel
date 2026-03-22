import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CommonLayout from "./components/CommonLayout";
import { BrowserRouter, Route, Routes } from "react-router";
import AddTestimonial from "./pages/testimonial/AddTestimonial";
import ViewTestimonial from "./pages/testimonial/ViewTestimonial";
import Dashboard from "./pages/Dashboard";
import Colour from "./pages/Colour";
import Material from "./pages/Material";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import SubSubCategory from "./pages/SubSubCategory";
import Product from "./pages/Product";
import AddWhyChoose from "./pages/choice/AddWhyChoose";
import ViewWhyChoose from "./pages/choice/ViewWhyChoose";

// App entry point — renders the route tree inside StrictMode and BrowserRouter.
// CommonLayout is a layout route: it renders the sidebar + header chrome,
// and each child route renders inside its <Outlet />.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout route — wraps every page with sidebar + header */}
        <Route element={<CommonLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="testimonial/add-testimonial"
            element={<AddTestimonial />}
          />
          <Route
            path="testimonial/view-testimonial"
            element={<ViewTestimonial />}
          />
          <Route path="choice/add-why-choose" element={<AddWhyChoose />} />
          <Route path="choice/view-why-choose" element={<ViewWhyChoose />} />
          <Route path="colour" element={<Colour />} />
          <Route path="material" element={<Material />} />
          <Route path="category" element={<Category />} />
          <Route path="sub-category" element={<SubCategory />} />
          <Route path="sub-sub-category" element={<SubSubCategory />} />
          <Route path="product" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
