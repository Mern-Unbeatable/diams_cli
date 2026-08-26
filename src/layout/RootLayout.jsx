import { Outlet } from 'react-router';
import NavbarLayout from './NavbarLayout';
import FooterLayout from './FooterLayout';

const RootLayout = () => {
  return (
    <>
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
