import React, { useState } from "react";
import { USER_PAYMENTS } from "@/config/userPayments";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import { MakePaymentTab } from "./sections/MakePaymentTab";
import { AutomaticPaymentsTab } from "./sections/AutomaticPaymentsTab";
import { PaymentHistoryTab } from "./sections/PaymentHistoryTab";
import { PaymentsSidebar } from "./sections/PaymentsSidebar";
import { AddPaymentMethodModal } from "./components/AddPaymentMethodModal";
import { InvoiceDetailsModal } from "./components/InvoiceDetailsModal";
import { PaymentSuccessModal } from "./components/PaymentSuccessModal";

const PaymentsView = () => {
  const { header, tabs, paymentTypes, bills, topUpOptions, paymentMethods: initialMethods, automaticPayments, paymentHistory: initialHistory } = USER_PAYMENTS;

  const [activeTab, setActiveTab] = useState("make-payment");
  const [paymentType, setPaymentType] = useState("bill");
  const [selectedBill, setSelectedBill] = useState(bills[0]);
  const [topUpAmount, setTopUpAmount] = useState(topUpOptions[3].amount); // 50.00
  const [customTopUp, setCustomTopUp] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState(initialMethods);
  const [selectedMethodId, setSelectedMethodId] = useState(initialMethods[0].id);
  const [paymentHistory, setPaymentHistory] = useState(initialHistory);

  // Modals state
  const [isAddMethodOpen, setIsAddMethodOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successDetails, setSuccessDetails] = useState(null);

  // Add new payment method handler
  const handleAddPaymentMethod = (newMethod) => {
    setPaymentMethods((prev) => [newMethod, ...prev]);
    setSelectedMethodId(newMethod.id);
  };

  // Set Default payment method
  const handleSetDefaultMethod = (methodId) => {
    setPaymentMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === methodId,
      }))
    );
  };

  // Delete payment method
  const handleDeleteMethod = (methodId) => {
    setPaymentMethods((prev) => prev.filter((m) => m.id !== methodId));
    if (selectedMethodId === methodId) {
      const remaining = paymentMethods.filter((m) => m.id !== methodId);
      if (remaining.length > 0) setSelectedMethodId(remaining[0].id);
    }
  };

  // Pay Now Handler
  const handlePayNow = () => {
    setIsProcessing(true);

    const selectedMethod = paymentMethods.find((m) => m.id === selectedMethodId) || paymentMethods[0];
    const amount = paymentType === "bill" ? (selectedBill?.amount || "34.90") : topUpAmount;
    const itemTitle = paymentType === "bill" ? `Bill - ${selectedBill?.month || "July 2024"}` : `Prepaid Top-Up (CHF ${topUpAmount})`;

    setTimeout(() => {
      setIsProcessing(false);

      const txnId = `TXN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const newTxn = {
        id: txnId,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        description: itemTitle,
        method: selectedMethod?.title || "Visa **** 4242",
        brand: selectedMethod?.brand || "visa",
        amount: amount,
        status: "Successful",
        invoiceRef: paymentType === "bill" ? (selectedBill?.invoiceNumber || "INV-2024-07-8891") : `TOP-${Date.now().toString().slice(-6)}`,
      };

      setPaymentHistory((prev) => [newTxn, ...prev]);

      setSuccessDetails({
        amount,
        itemTitle,
        methodTitle: selectedMethod?.title || "Visa **** 4242",
        transactionId: txnId,
        date: newTxn.date,
      });

      setIsSuccessModalOpen(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-primary sm:text-[1.75rem]">
          {header.title}
        </h2>
        <p className="mt-1 text-sm text-primary/60">
          {header.subtitle}
        </p>
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
          {activeTab === "make-payment" && (
            <MakePaymentTab
              paymentTypes={paymentTypes}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              bills={bills}
              selectedBill={selectedBill}
              setSelectedBill={setSelectedBill}
              topUpOptions={topUpOptions}
              topUpAmount={topUpAmount}
              setTopUpAmount={setTopUpAmount}
              customTopUp={customTopUp}
              setCustomTopUp={setCustomTopUp}
              paymentMethods={paymentMethods}
              selectedMethodId={selectedMethodId}
              setSelectedMethodId={setSelectedMethodId}
              onOpenAddMethod={() => setIsAddMethodOpen(true)}
              onPayNow={handlePayNow}
              isProcessing={isProcessing}
              onDeleteMethod={handleDeleteMethod}
              onSetDefaultMethod={handleSetDefaultMethod}
            />
          )}

          {activeTab === "automatic-payments" && (
            <AutomaticPaymentsTab
              automaticPayments={automaticPayments}
              paymentMethods={paymentMethods}
              onOpenAddMethod={() => setIsAddMethodOpen(true)}
            />
          )}

          {activeTab === "payment-history" && (
            <PaymentHistoryTab paymentHistory={paymentHistory} />
          )}
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <PaymentsSidebar
            selectedBill={selectedBill}
            onViewInvoice={() => setIsInvoiceModalOpen(true)}
            paymentType={paymentType}
            topUpAmount={topUpAmount}
          />
        </div>
      </div>

      {/* Interactive Modals */}
      <AddPaymentMethodModal
        isOpen={isAddMethodOpen}
        onClose={() => setIsAddMethodOpen(false)}
        onAddMethod={handleAddPaymentMethod}
      />

      <InvoiceDetailsModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        bill={selectedBill}
      />

      <PaymentSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        paymentDetails={successDetails}
      />
    </div>
  );
};

export default PaymentsView;
