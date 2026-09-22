import { Outlet } from "react-router";
import NavbarLayout from "@/Components/navigation/public/NavbarLayout";
import FooterLayout from "@/Components/navigation/public/FooterLayout";
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
