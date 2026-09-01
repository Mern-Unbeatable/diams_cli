import React from "react";
import { CreditCard, Smartphone } from "lucide-react";

export const PaymentMethodIcon = ({ brand, className = "h-5 w-auto" }) => {
  const normalized = (brand || "").toLowerCase();

  if (normalized.includes("visa")) {
    return (
      <span className="inline-flex items-center justify-center font-black tracking-tight text-blue-700 italic font-sans text-sm sm:text-base px-1.5 py-0.5 rounded bg-blue-50/80 border border-blue-200">
        VISA
      </span>
    );
  }

  if (normalized.includes("mastercard")) {
    return (
      <span className="inline-flex items-center justify-center relative w-7 h-5">
        <span className="w-4 h-4 rounded-full bg-red-500 opacity-90 inline-block"></span>
        <span className="w-4 h-4 rounded-full bg-amber-500 opacity-90 -ml-2 inline-block"></span>
      </span>
    );
  }

  if (normalized.includes("twint")) {
    return (
      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-slate-900 text-white font-extrabold text-[11px] tracking-wider">
        TWINT
      </span>
    );
  }

  if (normalized.includes("apple")) {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black text-white font-semibold text-xs">
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.83-11.98-14.36-5.83-8.87-10.42-18.99-13.78-30.36-3.36-11.37-5.04-22.37-5.04-33 0-14.88 3.73-27.42 11.19-37.62 7.46-10.2 16.99-15.42 28.58-15.66 4.96 0 10.36 1.34 16.19 4.02 5.83 2.68 9.54 4.09 11.13 4.23 1.29-.26 5.25-1.74 11.88-4.44 6.63-2.7 12.18-3.9 16.65-3.6 12.37.98 22.09 5.66 29.17 14.04-10.99 6.63-16.32 15.65-15.99 27.06.33 9.46 4.14 17.37 11.43 23.73 7.29 6.36 15.86 9.88 25.71 10.57-2.34 7.07-5.18 14.16-8.52 21.28zM119.22 31.84c0-7.39 2.63-14.37 7.9-20.94 5.27-6.57 11.75-10.53 19.44-11.9 1.09 7.82-1.39 15.22-7.44 22.21-6.05 6.99-12.68 10.53-19.9 10.63z" />
        </svg>
        Pay
      </span>
    );
  }

  return <CreditCard className="text-primary/70" size={18} />;
};
