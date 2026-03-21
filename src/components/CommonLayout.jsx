import { Outlet } from "react-router";
import "../Styles/styles.css";

export default function CommonLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
