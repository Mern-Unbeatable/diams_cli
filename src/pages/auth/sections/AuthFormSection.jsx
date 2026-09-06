import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { AUTH_PAGE } from "@/config/auth";
import { DUMMY_USERS, getRoleDashboardPath, ROLE_LABELS } from "@/config/dummyAuth";
import { BRAND, LOGO_CLASS } from "@/config/navigation";
import { useAuth } from "@/context/AuthContext";

const labelClass = "mb-2 block text-sm font-bold text-primary";
const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-primary outline-none transition-colors placeholder:text-gray-400 focus:border-btnPrimary";

const AuthFormSection = () => {
  const { logo, brandName, form } = AUTH_PAGE;
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleHint, setGoogleHint] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setGoogleHint("");

    const result = login(email, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    navigate(getRoleDashboardPath(result.user.role), { replace: true });
  };

  const fillDemoAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
    setGoogleHint("");
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-12 xl:px-16">
      <div className="w-full max-w-[420px]">
        <div className="mb-10 lg:hidden">
          <Link to={BRAND.homePath}>
            <img src={logo} alt={brandName} className={LOGO_CLASS} />
          </Link>
        </div>

        <div>
          <h2 className="text-[1.75rem] font-bold leading-tight text-primary sm:text-[1.875rem]">
            {form.title}
          </h2>
          <p className="mt-2 text-sm text-primary/55 sm:text-[0.9375rem]">
            {form.subtitle}
          </p>
        </div>

        {/* <div className="mt-6 rounded-xl border border-gray-200 bg-[#f8fbff] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary/45">
            Demo accounts
          </p>
          <div className="mt-3 space-y-2">
            {DUMMY_USERS.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemoAccount(account)}
                className="flex w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-left text-xs text-primary shadow-sm ring-1 ring-gray-100 transition-colors hover:ring-btnPrimary/40"
              >
                <span>
                  <span className="font-bold">{ROLE_LABELS[account.role]}</span>
                  <span className="mt-0.5 block text-primary/55">{account.email}</span>
                </span>
                <span className="font-mono text-primary/70">{account.password}</span>
              </button>
            ))}
          </div>
        </div> */}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="auth-email" className={labelClass}>
              {form.emailLabel}
            </label>
            <div className="relative">
              <Mail
                size={18}
                strokeWidth={1.75}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                placeholder={form.emailPlaceholder}
                className={inputClass}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password" className={labelClass}>
              {form.passwordLabel}
            </label>
            <div className="relative">
              <Lock
                size={18}
                strokeWidth={1.75}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder={form.passwordPlaceholder}
                className={`${inputClass} pr-11`}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-primary"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-0.5">
            <label className="inline-flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-btnPrimary focus:ring-btnPrimary/30"
              />
              <span className="text-sm text-primary/70">{form.rememberMe}</span>
            </label>

            <Link
              to={form.forgotPasswordPath}
              className="text-sm font-bold text-primary transition-opacity hover:opacity-80"
            >
              {form.forgotPassword}
            </Link>
          </div>

          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-btnPrimary px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Lock size={18} strokeWidth={2} />
            {form.submit}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-primary/45">{form.divider}</span>
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={() =>
            setGoogleHint("Google sign-in is not available in this demo. Use an account above.")
          }
          className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-gray-50"
        >
          <FcGoogle size={20} />
          {form.google}
        </button>

        {googleHint ? (
          <p className="mt-3 text-center text-xs text-primary/55">{googleHint}</p>
        ) : null}

        <p className="mt-8 text-center text-sm text-primary/55">
          {form.noAccount}{" "}
          <Link
            to={form.createAccountPath}
            className="font-bold text-primary transition-opacity hover:opacity-80"
          >
            {form.createAccount}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthFormSection;
