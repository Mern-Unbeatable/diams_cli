import { useState } from "react";
import { NavLink, Link } from "react-router";
import { Menu, User, X } from "lucide-react";
import {
  ACCOUNT_PATH,
  BRAND,
  MAIN_NAV_LINKS,
} from "@/config/navigation";

const navLinkClass = ({ isActive }) =>
  [
    "text-sm font-medium tracking-wide transition-colors duration-200",
    isActive ? "text-textAccent" : "text-white hover:text-textAccent",
  ].join(" ");

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-primary">
      <div className="relative mx-auto flex h-20 container items-center px-6 lg:px-10">
        <Link to={BRAND.homePath} className="shrink-0" onClick={closeMenu}>
          <img
            src={BRAND.logo}
            alt={BRAND.name}
            className="h-12 w-auto lg:h-14"
          />
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
          {MAIN_NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink to={path} className={navLinkClass} end={path === "/"}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden lg:block">
          <Link
            to={ACCOUNT_PATH}
            className="inline-flex items-center gap-2 rounded-md bg-btnPrimary px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
          >
            My Account
            <User size={18} strokeWidth={2.25} />
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-secondary px-6 py-5 lg:hidden">
          <ul className="flex flex-col gap-4">
            {MAIN_NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={navLinkClass}
                  end={path === "/"}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to={ACCOUNT_PATH}
            className="mt-6 inline-flex w-full items-center justify-center rounded-md gap-2 bg-btnPrimary px-5 py-3 text-sm font-semibold text-white"
            onClick={closeMenu}
          >
            My Account
            <User size={18} strokeWidth={2.25} />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
