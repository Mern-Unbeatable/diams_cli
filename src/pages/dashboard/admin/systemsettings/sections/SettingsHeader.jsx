const SettingsHeader = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
        System Settings
      </h1>
      <p className="mt-1 text-sm text-slate-500 sm:text-base">
        Configure company details, VAT, languages, templates, security, APIs and payment gateway connections.
      </p>
    </div>
  );
};

export default SettingsHeader;
