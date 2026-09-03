const DataDonutChart = ({ usedData, totalData, usedPercentage }) => {
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset =
    circumference - (usedPercentage / 100) * circumference;

  return (
    <div className="relative mx-auto flex h-36 w-36 shrink-0 items-center justify-center sm:mx-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="52"
          className="stroke-gray-100"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="60"
          cy="60"
          r="52"
          className="stroke-btnPrimary transition-all duration-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-xl font-bold leading-none text-primary sm:text-2xl">
          {usedData}
        </span>
        <p className="text-[10px] font-bold uppercase tracking-wide text-primary/45">
          GB
        </p>
        <p className="mt-0.5 text-[9px] text-primary/40">of {totalData} GB</p>
      </div>
    </div>
  );
};

export default DataDonutChart;
