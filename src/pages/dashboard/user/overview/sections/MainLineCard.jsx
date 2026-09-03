// import { Link } from "react-router";
// import { ArrowRight, CheckCircle2, Pencil, Smartphone } from "lucide-react";
// import { USER_OVERVIEW } from "@/config/userOverview";

// const MainLineCard = () => {
//   const { mainLine } = USER_OVERVIEW;

//   return (
//     <section className="relative overflow-hidden rounded-xl bg-primary p-5 sm:p-6 lg:p-7">
//       <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
//         <div>
//           <div className="flex flex-wrap items-center gap-2.5">
//             <span className="text-sm font-medium text-white/80">{mainLine.label}</span>
//             <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
//               {mainLine.status}
//             </span>
//           </div>

//           <div className="mt-3 flex flex-wrap items-center gap-2">
//             <p className="text-2xl font-bold text-white sm:text-[1.75rem]">
//               {mainLine.phone}
//             </p>
//             <button
//               type="button"
//               className="rounded-md p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
//               aria-label="Edit phone number"
//             >
//               <Pencil size={16} />
//             </button>
//           </div>
//           <p className="mt-1 text-sm text-white/65">{mainLine.plan}</p>

//           <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-8">
//             <div>
//               <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
//                 Next billing date
//               </p>
//               <p className="mt-1 text-sm font-semibold text-white">{mainLine.nextBillingDate}</p>
//               <p className="text-xs text-white/55">{mainLine.nextBillingHint}</p>
//             </div>
//             <div>
//               <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
//                 Balance to pay
//               </p>
//               <p className="mt-1 text-sm font-semibold text-white">{mainLine.balance}</p>
//               <p className="flex items-center gap-1 text-xs text-emerald-400">
//                 <CheckCircle2 size={13} />
//                 {mainLine.balanceStatus}
//               </p>
//             </div>
//           </div>

//           <Link
//             to={mainLine.managePath}
//             className="mt-6 inline-flex items-center gap-2 rounded-lg bg-btnPrimary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
//           >
//             Manage my line
//             <ArrowRight size={16} />
//           </Link>
//         </div>

//         <div className="hidden justify-end lg:flex">
//           <div className="relative flex h-36 w-44 items-center justify-center">
//             <div className="absolute inset-0 rounded-xl bg-white/5" />
//             <div className="relative flex h-28 w-40 flex-col items-center justify-center rounded-xl border border-white/15 bg-linear-to-br from-[#1a4a8a] to-[#0d2f5c] shadow-xl">
//               <Smartphone size={28} className="text-textAccent" strokeWidth={1.5} />
//               <span className="mt-2 text-xs font-bold tracking-wide text-white">NovaSky</span>
//               <span className="mt-3 h-8 w-12 rounded-md bg-white/20" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MainLineCard;

import { Link } from "react-router";
import { ArrowRight, Check, Pencil } from "lucide-react";
import { USER_OVERVIEW } from "@/config/userOverview";

const MainLineCard = () => {
  const { mainLine } = USER_OVERVIEW;

  return (
    <section className="relative overflow-hidden rounded-xl bg-[#051139] p-6 sm:p-8 lg:px-10 lg:py-8 border border-white/5 shadow-2xl">
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Content Area */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Main Info Header */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-400">
                {mainLine.label}
              </span>
              <span className="rounded bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-400">
                {mainLine.status}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {mainLine.phone}
              </h2>
              <button
                type="button"
                className="text-slate-400 transition-colors hover:text-white"
                aria-label="Edit phone number"
              >
                <Pencil size={15} />
              </button>
            </div>

            <p className="mt-1 text-sm text-slate-400 font-medium">
              {mainLine.plan}
            </p>
          </div>

          {/* CTA Button */}
          <div>
            <Link
              to={mainLine.managePath}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 active:scale-[0.98]"
            >
              Manage my line
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Middle Stats & SIM Section */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center lg:gap-12">
          {/* Next Billing Date */}
          <div className="lg:border-l lg:border-slate-700/60 lg:pl-8">
            <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Next billing date
            </p>
            <p className="mt-2 text-base font-bold text-white leading-snug">
              {mainLine.nextBillingDate}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {mainLine.nextBillingHint}
            </p>
          </div>

          {/* Balance */}
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Balance to pay
            </p>
            <p className="mt-2 text-base font-bold text-white">
              {mainLine.balance}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Check size={10} strokeWidth={3} />
              </span>
              {mainLine.balanceStatus}
            </p>
          </div>

          {/* Right Side: SIM Image Placeholder */}
          <div className="flex items-center justify-center pl-2">
            <div className="relative h-28 w-24 sm:h-32 sm:w-28 transition-transform hover:scale-105 duration-300">
              <img
                src="/sim.png" /* Replace with your SIM image asset path */
                alt="NovaSky SIM Card"
                className="h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(37,99,235,0.3)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainLineCard;
