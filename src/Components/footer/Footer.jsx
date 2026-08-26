import { Link } from "react-router";
import { ChevronDown } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa6";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { BRAND } from "../../config/navigation";
import {
  APP_STORE_URL,
  FOOTER_CONTACT,
  FOOTER_DESCRIPTION,
  FOOTER_INFO_LINKS,
  FOOTER_NAV_LINKS,
  FOOTER_SOCIALS,
  PLAY_STORE_URL,
} from "../../config/footer";

const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
};

const FooterColumn = ({ title, children }) => (
  <div>
    <h3 className="mb-5 text-base font-semibold text-white">{title}</h3>
    {children}
  </div>
);

const FooterLinkList = ({ links }) => (
  <ul className="space-y-3">
    {links.map(({ label, path }) => (
      <li key={path}>
        <Link
          to={path}
          className="text-sm text-white transition-colors duration-200 hover:text-textAccent"
        >
          {label}
        </Link>
      </li>
    ))}
  </ul>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <Link to={BRAND.homePath}>
              <img
                src={BRAND.logo}
                alt={BRAND.name}
                className="h-12 w-auto"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white">
              {FOOTER_DESCRIPTION}
            </p>

            <div className="mt-6 flex items-center gap-4">
              {FOOTER_SOCIALS.map(({ label, href, icon }) => {
                const Icon = SOCIAL_ICONS[icon];
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-white transition-colors duration-200 hover:text-textAccent"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Navigation">
            <FooterLinkList links={FOOTER_NAV_LINKS} />
          </FooterColumn>

          <FooterColumn title="Information">
            <FooterLinkList links={FOOTER_INFO_LINKS} />
          </FooterColumn>

          <FooterColumn title="Contact">
            <ul className="space-y-3 text-sm text-white">
              <li>{FOOTER_CONTACT.phone}</li>
              <li>
                <a
                  href={`mailto:${FOOTER_CONTACT.email}`}
                  className="transition-colors duration-200 hover:text-textAccent"
                >
                  {FOOTER_CONTACT.email}
                </a>
              </li>
              <li>{FOOTER_CONTACT.hours}</li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Download the App">
            <div className="flex flex-col gap-3">
              <a
                href={APP_STORE_URL}
                className="inline-flex items-center gap-3 rounded-md border border-white/30 bg-black px-4 py-2.5 text-white transition-colors duration-200 hover:border-white"
              >
                <SiApple size={22} />
                <span className="text-left text-xs leading-tight">
                  Download on the
                  <span className="block text-sm font-semibold">App Store</span>
                </span>
              </a>

              <a
                href={PLAY_STORE_URL}
                className="inline-flex items-center gap-3 rounded-md border border-white/30 bg-black px-4 py-2.5 text-white transition-colors duration-200 hover:border-white"
              >
                <SiGoogleplay size={20} />
                <span className="text-left text-xs leading-tight">
                  Get it on
                  <span className="block text-sm font-semibold">Google Play</span>
                </span>
              </a>
            </div>
          </FooterColumn>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-secondary pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-white">
            © {currentYear} {BRAND.name}. All Rights Reserved.
          </p>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-medium text-white"
          >
            English
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
