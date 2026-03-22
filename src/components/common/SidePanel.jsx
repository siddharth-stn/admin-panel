import { NavLink } from "react-router";
import {
  Quote,
  ShieldCheck,
  Palette,
  Atom,
  ChartBarStacked,
  Blocks,
  FileBox,
  Box,
  UserPen,
} from "lucide-react";
import { useState } from "react";

/**
 * SidePanel — sidebar navigation displayed on every page.
 *
 * Structure:
 *   1. Hamburger toggle button (visible only on small screens)
 *   2. <aside> containing three link groups:
 *      - Brand / logo area ("Admin Panel")
 *      - Dashboard link (home)
 *      - Page navigation links (Testimonial, Choice, Colour, etc.)
 */
export default function SidePanel() {
  // Tracks which collapsible menus are open (e.g., { testimonial: true, choice: false })
  const [openMenus, setOpenMenus] = useState({ testimonial: false });

  // Toggles a menu's open/closed state by name
  function handleClick(menuName) {
    setOpenMenus((prev) => {
      return { ...prev, [menuName]: !prev[menuName] };
    });
  }

  return (
    <>
      {/* Hamburger button — toggles sidebar visibility on mobile (sm:hidden) */}
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="w-full h-full"
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {/* Brand / logo */}
          <ul className="space-y-2">
            <li>
              <div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white group">
                <span className="ml-3 text-2xl font-extrabold">
                  Admin Panel
                </span>
              </div>
            </li>
          </ul>

          {/* Dashboard link — separated from other nav items */}
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center p-2 text-[15px] font-bold rounded-lg group ${
                    isActive
                      ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                      : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <span className="ml-3 flex gap-2 items-center">
                  <UserPen size={20} />
                  Dashboard
                </span>
              </NavLink>
            </li>
          </ul>

          {/* Page navigation links — some items have collapsible sub-menus */}
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700 text-[15px] font-bold">
            {/* Testimonial — collapsible menu with Add/View sub-links */}
            <li>
              <div
                onClick={() => handleClick("testimonial")}
                className="flex items-center p-2 rounded-lg group text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3 flex gap-2 items-center">
                  <Quote className="rotate-180" size={20} />
                  Testimonial
                </span>
              </div>
              <div
                className={`testimonial-subMenu-wrapper mt-2 ml-9 ${openMenus.testimonial ? "block" : "hidden"}`}
              >
                <NavLink
                  to="/testimonial/add-testimonial"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group  ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">Add Testimonial</span>
                </NavLink>
                <NavLink
                  to="/testimonial/view-testimonial"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">View Testimonial</span>
                </NavLink>
              </div>
            </li>
            {/* Why Choose Us — collapsible menu with Add/View sub-links */}
            <li>
              <div
                onClick={() => {
                  handleClick("choice");
                }}
                className="flex items-center p-2 rounded-lg group text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3 flex gap-2 items-center">
                  <ShieldCheck size={20} />
                  Why Choose us
                </span>
              </div>
              <div
                className={`testimonial-subMenu-wrapper mt-2 ml-9 ${openMenus.choice ? "block" : "hidden"}`}
              >
                <NavLink
                  to="/choice/add-why-choose"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group  ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">Add Why Choose Us</span>
                </NavLink>
                <NavLink
                  to="/choice/view-why-choose"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">View Why Choose Us</span>
                </NavLink>
              </div>
            </li>
            {/* Colour — collapsible menu with Add/View sub-links */}
            <li>
              <div
                onClick={() => {
                  handleClick("colour");
                }}
                className="flex items-center p-2 rounded-lg group text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3 flex gap-2 items-center">
                  <Palette size={20} />
                  Colour
                </span>
              </div>
              <div
                className={`colour-subMenu-wrapper mt-2 ml-9 ${openMenus.colour ? "block" : "hidden"}`}
              >
                <NavLink
                  to="/colour/add-colour"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">Add Colour</span>
                </NavLink>
                <NavLink
                  to="/colour/view-colour"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">View Colour</span>
                </NavLink>
              </div>
            </li>
            {/* Material — collapsible menu with Add/View sub-links */}
            <li>
              <div
                onClick={() => {
                  handleClick("material");
                }}
                className="flex items-center p-2 rounded-lg group text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3 flex gap-2 items-center">
                  <Atom size={20} />
                  Material
                </span>
              </div>
              <div
                className={`material-subMenu-wrapper mt-2 ml-9 ${openMenus.material ? "block" : "hidden"}`}
              >
                <NavLink
                  to="/material/add-material"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">Add Material</span>
                </NavLink>
                <NavLink
                  to="/material/view-material"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">View Material</span>
                </NavLink>
              </div>
            </li>
            {/* Category — collapsible menu with Add/View sub-links */}
            <li>
              <div
                onClick={() => {
                  handleClick("category");
                }}
                className="flex items-center p-2 rounded-lg group text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3 flex gap-2 items-center">
                  <ChartBarStacked size={20} />
                  Category
                </span>
              </div>
              <div
                className={`category-subMenu-wrapper mt-2 ml-9 ${openMenus.category ? "block" : "hidden"}`}
              >
                <NavLink
                  to="/category/add-category"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">Add Category</span>
                </NavLink>
                <NavLink
                  to="/category/view-category"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">View Category</span>
                </NavLink>
              </div>
            </li>
            {/* Sub Category — collapsible menu with Add/View sub-links */}
            <li>
              <div
                onClick={() => {
                  handleClick("sub-category");
                }}
                className="flex items-center p-2 rounded-lg group text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3 flex gap-2 items-center">
                  <Blocks size={20} />
                  Sub Category
                </span>
              </div>
              <div
                className={`sub-category-subMenu-wrapper mt-2 ml-9 ${openMenus["sub-category"] ? "block" : "hidden"}`}
              >
                <NavLink
                  to="/sub-category/add-sub-category"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">Add Sub Category</span>
                </NavLink>
                <NavLink
                  to="/sub-category/view-sub-category"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">View Sub Category</span>
                </NavLink>
              </div>
            </li>
            {/* Sub Sub Category — collapsible menu with Add/View sub-links */}
            <li>
              <div
                onClick={() => {
                  handleClick("sub-sub-category");
                }}
                className="flex items-center p-2 rounded-lg group text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3 flex gap-2 items-center">
                  <FileBox size={20} />
                  Sub Sub Category
                </span>
              </div>
              <div
                className={`sub-sub-category-subMenu-wrapper mt-2 ml-9 ${openMenus["sub-sub-category"] ? "block" : "hidden"}`}
              >
                <NavLink
                  to="/sub-sub-category/add-sub-sub-category"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">Add Sub Sub Category</span>
                </NavLink>
                <NavLink
                  to="/sub-sub-category/view-sub-sub-category"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">View Sub Sub Category</span>
                </NavLink>
              </div>
            </li>
            {/* Product — collapsible menu with Add/View sub-links */}
            <li>
              <div
                onClick={() => {
                  handleClick("product");
                }}
                className="flex items-center p-2 rounded-lg group text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3 flex gap-2 items-center">
                  <Box size={20} />
                  Product
                </span>
              </div>
              <div
                className={`product-subMenu-wrapper mt-2 ml-9 ${openMenus.product ? "block" : "hidden"}`}
              >
                <NavLink
                  to="/product/add-product"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">Add Product</span>
                </NavLink>
                <NavLink
                  to="/product/view-product"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded-lg group ${
                      isActive
                        ? "bg-gray-100 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="">View Product</span>
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
