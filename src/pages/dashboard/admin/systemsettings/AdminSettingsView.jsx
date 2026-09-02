import {
  SettingsHeader,
  CompanyInfoCard,
  VatCurrencyCard,
  LanguagesCard,
  EmailTemplatesCard,
  SecuritySettingsCard,
  ApiConfigCard,
  PaymentGatewayCard,
  INITIAL_SETTINGS,
} from "./sections";

const AdminSettingsView = () => {
  return (
    <div className="min-h-full space-y-6 text-slate-900 font-sans pb-12">
      {/* 1. Page Header */}
      <SettingsHeader />

      {/* 2. Company Information Card */}
      <CompanyInfoCard initialData={INITIAL_SETTINGS.company} />

      {/* 3. VAT & Currency Card */}
      <VatCurrencyCard initialData={INITIAL_SETTINGS.vatCurrency} />

      {/* 4. Languages Card */}
      <LanguagesCard initialData={INITIAL_SETTINGS.languages} />

      {/* 5. Email Templates Card */}
      <EmailTemplatesCard initialData={INITIAL_SETTINGS.emailTemplate} />

      {/* 6. Security Settings Card */}
      <SecuritySettingsCard initialData={INITIAL_SETTINGS.security} />

      {/* 7. API Configuration Card */}
      <ApiConfigCard initialData={INITIAL_SETTINGS.apiConfig} />

      {/* 8. Payment Gateway Configuration Card */}
      <PaymentGatewayCard initialData={INITIAL_SETTINGS.paymentGateway} />
    </div>
  );
};

export default AdminSettingsView;
