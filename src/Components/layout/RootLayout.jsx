/**
 * Public site shell: navbar + page outlet + footer.
 */
import { Outlet } from "react-router";
import Navbar from "@/Components/common/Navbar";
import Footer from "@/Components/common/Footer";
import ScrollToTop from "@/Components/utility/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <header className="h-20">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default RootLayout;
