/**
 * Public site shell: navbar + page outlet + footer.
 */
import { Outlet } from "react-router";
import Navbar from "@/Components/navigation/public/Navbar";
import Footer from "@/Components/navigation/public/Footer";
import ScrollToTop from "@/Components/common/ScrollToTop";

const PublicLayout = () => {
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

export default PublicLayout;
