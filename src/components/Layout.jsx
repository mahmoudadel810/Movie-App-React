import { Outlet } from "react-router-dom";
import AppNavbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Topbar from "./Topbar/Topbar";

export default function Layout({ children }) {
  return (
    <>
      <AppNavbar />
      <Outlet>{children}</Outlet>
      <Topbar />
      <Footer />
    </>
  );
}
