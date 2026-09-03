import { useState } from "react";
import { USER_SECURITY } from "@/config/userSecurity";
import { SecurityOptionsCard } from "./components/SecurityOptionsCard";
import { SecurityLevelCard } from "./components/SecurityLevelCard";
import { ConnectedDevicesCard } from "./components/ConnectedDevicesCard";
import { SecurityHelpCard } from "./components/SecurityHelpCard";
import { TwoFactorModal } from "./components/TwoFactorModal";
import { ChangePasswordModal } from "./components/ChangePasswordModal";
import { RecoveryEmailModal } from "./components/RecoveryEmailModal";
import { PhoneNumberModal } from "./components/PhoneNumberModal";
import { DevicesModal } from "./components/DevicesModal";
import { SafetyTipsModal } from "./components/SafetyTipsModal";
import { DeleteAccountModal } from "./components/DeleteAccountModal";
import { LoginAlertsModal } from "./components/LoginAlertsModal";

const SecurityView = () => {
  const { header, banner, settings: initialSettings, securityLevel, connectedDevices } = USER_SECURITY;

  const [settings, setSettings] = useState(initialSettings);

  // Modals state
  const [activeModal, setActiveModal] = useState(null);

  const handleSettingClick = (settingId) => {
    switch (settingId) {
      case "2fa":
        setActiveModal("2fa");
        break;
      case "password":
        setActiveModal("password");
        break;
      case "recovery-email":
        setActiveModal("email");
        break;
      case "phone-number":
        setActiveModal("phone");
        break;
      case "device-management":
        setActiveModal("devices");
        break;
      case "login-alerts":
        setActiveModal("alerts");
        break;
      case "delete-account":
        setActiveModal("delete");
        break;
      default:
        break;
    }
  };

  const handleToggle2FA = (isEnabled) => {
    setSettings((prev) =>
      prev.map((s) =>
        s.id === "2fa"
          ? {
              ...s,
              status: isEnabled ? "Enabled" : "Disabled",
              statusVariant: isEnabled ? "green" : "red",
            }
          : s
      )
    );
  };

  const handleUpdateEmail = (newEmail) => {
    setSettings((prev) =>
      prev.map((s) =>
        s.id === "recovery-email"
          ? {
              ...s,
              extraInfo: newEmail,
            }
          : s
      )
    );
  };

  const handleUpdatePhone = (newPhone) => {
    setSettings((prev) =>
      prev.map((s) =>
        s.id === "phone-number"
          ? {
              ...s,
              extraInfo: newPhone,
            }
          : s
      )
    );
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-primary sm:text-[1.75rem]">
          {header.title}
        </h2>
        <p className="mt-1 text-sm text-primary/60">{header.subtitle}</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <SecurityOptionsCard
            banner={banner}
            settings={settings}
            onItemClick={handleSettingClick}
          />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Security Level Card */}
          <SecurityLevelCard securityLevel={securityLevel} />

          {/* Connected Devices Card */}
          <ConnectedDevicesCard
            devices={connectedDevices}
            onManageDevices={() => setActiveModal("devices")}
          />

          {/* Need Help? Card */}
          <SecurityHelpCard
            onOpenSafetyTips={() => setActiveModal("safety-tips")}
          />
        </div>
      </div>

      {/* Interactive Modals */}
      <TwoFactorModal
        isOpen={activeModal === "2fa"}
        onClose={() => setActiveModal(null)}
        isEnabled={settings.find((s) => s.id === "2fa")?.status === "Enabled"}
        onToggle={handleToggle2FA}
      />

      <ChangePasswordModal
        isOpen={activeModal === "password"}
        onClose={() => setActiveModal(null)}
      />

      <RecoveryEmailModal
        isOpen={activeModal === "email"}
        onClose={() => setActiveModal(null)}
        initialEmail={
          settings.find((s) => s.id === "recovery-email")?.extraInfo ||
          "abdoulaye.sow@email.com"
        }
        onSave={handleUpdateEmail}
      />

      <PhoneNumberModal
        isOpen={activeModal === "phone"}
        onClose={() => setActiveModal(null)}
        initialPhone={
          settings.find((s) => s.id === "phone-number")?.extraInfo ||
          "+41 76 123 45 67"
        }
        onSave={handleUpdatePhone}
      />

      <DevicesModal
        isOpen={activeModal === "devices"}
        onClose={() => setActiveModal(null)}
        initialDevices={connectedDevices}
      />

      <SafetyTipsModal
        isOpen={activeModal === "safety-tips"}
        onClose={() => setActiveModal(null)}
      />

      <DeleteAccountModal
        isOpen={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
      />

      <LoginAlertsModal
        isOpen={activeModal === "alerts"}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};

export default SecurityView;
