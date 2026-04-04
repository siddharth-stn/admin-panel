import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CommonLayout from "./components/CommonLayout";
import { BrowserRouter, Route, Routes } from "react-router";
import AddTestimonial from "./pages/testimonial/AddTestimonial";
import ViewTestimonial from "./pages/testimonial/ViewTestimonial";
import Dashboard from "./pages/Dashboard";
import AddWhyChoose from "./pages/choice/AddWhyChoose";
import ViewWhyChoose from "./pages/choice/ViewWhyChoose";
import AddColour from "./pages/colour/AddColour";
import ViewColour from "./pages/colour/ViewColour";
import AddMaterial from "./pages/material/AddMaterial";
import ViewMaterial from "./pages/material/ViewMaterial";
import AddCategory from "./pages/category/AddCategory";
import ViewCategory from "./pages/category/ViewCategory";
import AddSubCategory from "./pages/sub-category/AddSubCategory";
import ViewSubCategory from "./pages/sub-category/ViewSubCategory";
import AddSubSubCategory from "./pages/sub-sub-category/AddSubSubCategory";
import ViewSubSubCategory from "./pages/sub-sub-category/ViewSubSubCategory";
import AddProduct from "./pages/product/AddProduct";
import ViewProduct from "./pages/product/ViewProduct";
import Login from "./pages/Login";

// App entry point — renders the route tree inside StrictMode and BrowserRouter.
// CommonLayout is a layout route: it renders the sidebar + header chrome,
// and each child route renders inside its <Outlet />.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout route — wraps every page with sidebar + header */}
        <Route path="/" element={<Login />} />
        <Route element={<CommonLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
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
          <Route path="colour/add-colour" element={<AddColour />} />
          <Route path="colour/view-colour" element={<ViewColour />} />
          <Route path="material/add-material" element={<AddMaterial />} />
          <Route path="material/view-material" element={<ViewMaterial />} />
          <Route path="category/add-category" element={<AddCategory />} />
          <Route path="category/view-category" element={<ViewCategory />} />
          <Route
            path="sub-category/add-sub-category"
            element={<AddSubCategory />}
          />
          <Route
            path="sub-category/view-sub-category"
            element={<ViewSubCategory />}
          />
          <Route
            path="sub-sub-category/add-sub-sub-category"
            element={<AddSubSubCategory />}
          />
          <Route
            path="sub-sub-category/view-sub-sub-category"
            element={<ViewSubSubCategory />}
          />
          <Route path="product/add-product" element={<AddProduct />} />
          <Route path="product/view-product" element={<ViewProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
