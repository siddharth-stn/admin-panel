import { Outlet } from "react-router";
import "../Styles/styles.css";
import SidePanel from "./common/SidePanel";
import Header from "./common/Header";

export default function CommonLayout() {
  return (
    <div className="website-wrapper w-full h-screen grid grid-cols-[minmax(250px,300px)_1fr]">
      <section className="side-panel-wrapper col-start-1 col-end-2">
        <SidePanel />
      </section>
      <section className="main-content-wrapper col-start-2">
        <div className="header-wrapper">
          <Header />
        </div>
        <div className="outlet-wrapper h-full">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
