import { Outlet } from "react-router";
import NavbarLayout from "./NavbarLayout";
import FooterLayout from "./FooterLayout";
import ScrollToTop from "@/Components/utility/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <header className="h-20">
        <NavbarLayout />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <FooterLayout />
      </footer>
    </>
  );
};

export default RootLayout;
