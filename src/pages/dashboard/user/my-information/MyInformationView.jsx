import { useState } from "react";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import { USER_MY_INFORMATION } from "@/config/userMyInformation";
import { PersonalInfoCard } from "./components/PersonalInfoCard";
import { AccountInfoCard } from "./components/AccountInfoCard";
import { AccountSecurityCard } from "./components/AccountSecurityCard";
import { ProfileCompletionCard } from "./components/ProfileCompletionCard";
import { NeedHelpCard } from "./components/NeedHelpCard";
import { EditPersonalInfoModal } from "./components/EditPersonalInfoModal";
import { ChangePasswordModal } from "./components/ChangePasswordModal";
import { ChangePinModal } from "./components/ChangePinModal";
import { UploadAvatarModal } from "./components/UploadAvatarModal";

const MyInformationView = () => {
  const {
    header,
    tabs,
    personalInfo: initialPersonalInfo,
    accountInfo: initialAccountInfo,
    securitySummary,
  } = USER_MY_INFORMATION;

  const [activeTab, setActiveTab] = useState("profile");
  const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
  const [accountInfo, setAccountInfo] = useState(initialAccountInfo);

  // Modals state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isPinOpen, setIsPinOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  // Handlers
  const handleSavePersonalInfo = (updated) => {
    setPersonalInfo((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleSaveAvatar = (newInitials) => {
    setPersonalInfo((prev) => ({
      ...prev,
      avatarInitials: newInitials,
    }));
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

      {/* Top Tabs */}
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Main Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Personal Information */}
          <PersonalInfoCard
            personalInfo={personalInfo}
            onEdit={() => setIsEditOpen(true)}
            onChangeAvatar={() => setIsAvatarOpen(true)}
          />

          {/* Card 2: Account Information */}
          <AccountInfoCard
            accountInfo={accountInfo}
            onChangePassword={() => setIsPasswordOpen(true)}
            onChangePin={() => setIsPinOpen(true)}
          />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Card 1: Account Security */}
          <AccountSecurityCard securitySummary={securitySummary} />

          {/* Card 2: Complete your profile */}
          <ProfileCompletionCard onComplete={() => setIsEditOpen(true)} />

          {/* Card 3: Need Help? */}
          <NeedHelpCard />
        </div>
      </div>

      {/* Interactive Modals */}
      <EditPersonalInfoModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        personalInfo={personalInfo}
        onSave={handleSavePersonalInfo}
      />

      <ChangePasswordModal
        isOpen={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
      />

      <ChangePinModal
        isOpen={isPinOpen}
        onClose={() => setIsPinOpen(false)}
      />

      <UploadAvatarModal
        isOpen={isAvatarOpen}
        onClose={() => setIsAvatarOpen(false)}
        currentInitials={personalInfo.avatarInitials}
        onSave={handleSaveAvatar}
      />
    </div>
  );
};

export default MyInformationView;
