export const ProfileCompletionCard = ({ onComplete }) => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0c1a30] via-[#091527] to-[#040a14] p-5 text-white shadow-md border border-slate-800 space-y-4">
      <div className="flex items-center gap-4">
        {/* Progress Ring */}
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
            {/* Background Ring */}
            <path
              className="text-slate-800 stroke-current"
              strokeWidth="3.5"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            {/* Progress Arc (75%) */}
            <path
              className="text-[#38bdf8] stroke-current transition-all duration-1000 ease-out"
              strokeDasharray="75, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-xs font-extrabold text-[#38bdf8]">
            75%
          </span>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h4 className="text-xs sm:text-sm font-bold text-white">
            Complete your profile
          </h4>
          <p className="text-[10px] sm:text-[11px] text-white/60 mt-0.5 leading-tight">
            The more complete your profile is, the more personalized and secure
            your experience will be.
          </p>
        </div>
      </div>

      {/* Button */}
      <div>
        <button
          type="button"
          onClick={onComplete}
          className="w-full rounded-xl bg-btnPrimary py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-btnPrimary/90 active:scale-[0.99]"
        >
          Complete My Profile
        </button>
      </div>
    </section>
  );
};
