import { Outlet } from "react-router";
import "../Styles/styles.css";
import SidePanel from "./common/SidePanel";
import Header from "./common/Header";

/**
 * CommonLayout — shared layout route used by every page.
 *
 * Uses a CSS Grid with two columns:
 *   Column 1 (250-300px) → SidePanel (navigation)
 *   Column 2 (remaining)  → Header (breadcrumb) + page content via <Outlet />
 */
export default function CommonLayout() {
  return (
    <div className="website-wrapper w-full h-screen grid grid-cols-[minmax(250px,300px)_1fr]">
      {/* Left column — sidebar navigation */}
      <section className="side-panel-wrapper col-start-1 col-end-2 ">
        <SidePanel />
      </section>

      {/* Right column — header + routed page content */}
      <section className="main-content-wrapper col-start-2">
        <div className="header-wrapper">
          <Header />
        </div>
        <div className="outlet-wrapper h-full">
          {/* Child route component renders here */}
          <Outlet />
        </div>
      </section>
    </div>
  );
}
