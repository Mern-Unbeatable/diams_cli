import { useState } from "react";
import { USER_ESIM } from "@/config/userEsim";
import { EsimActiveCard } from "./components/EsimActiveCard";
import { EsimInstallCard } from "./components/EsimInstallCard";
import { EsimManageSection } from "./components/EsimManageSection";
import { EsimPromoCard } from "./components/EsimPromoCard";
import { EsimInfoCard } from "./components/EsimInfoCard";
import { EsimHelpCard } from "./components/EsimHelpCard";
import { EsimFooter } from "./components/EsimFooter";
import { RenameEsimModal } from "./components/RenameEsimModal";
import { DeleteEsimModal } from "./components/DeleteEsimModal";
import { NewEsimModal } from "./components/NewEsimModal";
import { TransferEsimModal } from "./components/TransferEsimModal";
import { EsimDetailsModal } from "./components/EsimDetailsModal";
import { EsimGuideModal } from "./components/EsimGuideModal";
import { EsimFaqModal } from "./components/EsimFaqModal";

const EsimView = () => {
  const { header, installTabs, activeEsim } = USER_ESIM;

  const [activeTab, setActiveTab] = useState("qr-code");
  const [esimData, setEsimData] = useState(activeEsim);

  // Modals state
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isNewEsimOpen, setIsNewEsimOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  // Handlers
  const handleRenameSave = (newName) => {
    setEsimData((prev) => ({
      ...prev,
      customName: newName,
    }));
  };

  const handleDeleteConfirm = () => {
    setEsimData((prev) => ({
      ...prev,
      status: "Deactivated",
    }));
  };

  const handleGenerateNew = () => {
    setEsimData((prev) => ({
      ...prev,
      status: "Enabled",
      activationCode: `C${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      activatedOn: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      lastUsed: "Just now",
    }));
    setActiveTab("qr-code");
  };

  return (
    <div className="space-y-6 pb-4">
      {/* Top Header */}
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
          {/* Active Card */}
          <EsimActiveCard esimData={esimData} />

          {/* Install eSIM Section */}
          <EsimInstallCard
            installTabs={installTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            esimData={esimData}
            onOpenTransferModal={() => setIsTransferOpen(true)}
            onOpenGuideModal={() => setIsGuideOpen(true)}
          />

          {/* Manage your eSIM Section */}
          <EsimManageSection
            onRename={() => setIsRenameOpen(true)}
            onDelete={() => setIsDeleteOpen(true)}
            onGetNew={() => setIsNewEsimOpen(true)}
          />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Freedom of eSIM Promo Card */}
          <EsimPromoCard onLearnMore={() => setIsGuideOpen(true)} />

          {/* eSIM Information Card */}
          <EsimInfoCard
            esimData={esimData}
            onOpenDetailsModal={() => setIsDetailsOpen(true)}
          />

          {/* Need help? Card */}
          <EsimHelpCard
            onOpenGuide={() => setIsGuideOpen(true)}
            onOpenFaq={() => setIsFaqOpen(true)}
          />
        </div>
      </div>

      {/* Footer */}
      <EsimFooter />

      {/* Interactive Modals */}
      <RenameEsimModal
        isOpen={isRenameOpen}
        onClose={() => setIsRenameOpen(false)}
        currentName={esimData.customName}
        onSave={handleRenameSave}
      />

      <DeleteEsimModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        esimData={esimData}
        onConfirmDelete={handleDeleteConfirm}
      />

      <NewEsimModal
        isOpen={isNewEsimOpen}
        onClose={() => setIsNewEsimOpen(false)}
        onGeneratedNew={handleGenerateNew}
      />

      <TransferEsimModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        esimData={esimData}
      />

      <EsimDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        esimData={esimData}
      />

      <EsimGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <EsimFaqModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
    </div>
  );
};

export default EsimView;
