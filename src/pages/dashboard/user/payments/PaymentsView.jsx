import React, { useMemo, useState } from "react";
import { USER_PAYMENTS } from "@/config/userPayments";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import {
  useCreateUserPayment,
  useUserPayments,
} from "@/features/dash/user/payments";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import { MakePaymentTab } from "./sections/MakePaymentTab";
import { AutomaticPaymentsTab } from "./sections/AutomaticPaymentsTab";
import { PaymentHistoryTab } from "./sections/PaymentHistoryTab";
import { PaymentsSidebar } from "./sections/PaymentsSidebar";
import { AddPaymentMethodModal } from "./components/AddPaymentMethodModal";
import { InvoiceDetailsModal } from "./components/InvoiceDetailsModal";
import { PaymentSuccessModal } from "./components/PaymentSuccessModal";

const PaymentsView = () => {
  const {
    header,
    tabs,
    paymentTypes,
    bills,
    topUpOptions,
    paymentMethods: initialMethods,
    automaticPayments,
    paymentHistory: initialHistory,
  } = USER_PAYMENTS;

  const paymentsQuery = useUserPayments();
  const createPayment = useCreateUserPayment();

  useMutationFeedback(createPayment, {
    successMessage: "Payment submitted.",
    errorTitle: "Payment failed",
  });

  const queriedHistory = useMemo(
    () => unwrapList(paymentsQuery.data),
    [paymentsQuery.data],
  );
  const paymentHistory = queriedHistory.length
    ? queriedHistory
    : initialHistory;

  const [activeTab, setActiveTab] = useState("make-payment");
  const [paymentType, setPaymentType] = useState("bill");
  const [selectedBill, setSelectedBill] = useState(bills[0]);
  const [topUpAmount, setTopUpAmount] = useState(topUpOptions[3].amount);
  const [customTopUp, setCustomTopUp] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState(initialMethods);
  const [selectedMethodId, setSelectedMethodId] = useState(initialMethods[0].id);

  const [isAddMethodOpen, setIsAddMethodOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successDetails, setSuccessDetails] = useState(null);

  const handleAddPaymentMethod = (newMethod) => {
    setPaymentMethods((prev) => [newMethod, ...prev]);
    setSelectedMethodId(newMethod.id);
  };

  const handleSetDefaultMethod = (methodId) => {
    setPaymentMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === methodId,
      })),
    );
  };

  const handleDeleteMethod = (methodId) => {
    setPaymentMethods((prev) => prev.filter((m) => m.id !== methodId));
    if (selectedMethodId === methodId) {
      const remaining = paymentMethods.filter((m) => m.id !== methodId);
      if (remaining.length > 0) setSelectedMethodId(remaining[0].id);
    }
  };

  const handlePayNow = () => {
    if (createPayment.isPending) return;

    const selectedMethod =
      paymentMethods.find((m) => m.id === selectedMethodId) ||
      paymentMethods[0];
    const amount =
      paymentType === "bill"
        ? selectedBill?.amount || "34.90"
        : topUpAmount;
    const itemTitle =
      paymentType === "bill"
        ? `Bill - ${selectedBill?.month || "July 2024"}`
        : `Prepaid Top-Up (CHF ${topUpAmount})`;

    createPayment.mutate(
      {
        description: itemTitle,
        method: selectedMethod?.title || "Visa **** 4242",
        brand: selectedMethod?.brand || "visa",
        amount,
        invoiceRef:
          paymentType === "bill"
            ? selectedBill?.invoiceNumber || "INV-2024-07-8891"
            : `TOP-${Date.now().toString().slice(-6)}`,
      },
      {
        onSuccess: (txn) => {
          setSuccessDetails({
            amount,
            itemTitle,
            methodTitle: selectedMethod?.title || "Visa **** 4242",
            transactionId: txn.id,
            date: txn.date,
          });
          setIsSuccessModalOpen(true);
        },
      },
    );
  };

  return (
    <div className="min-w-0 space-y-5 sm:space-y-6">
      <div className="min-w-0">
        <h2 className="text-xl font-bold text-primary sm:text-2xl sm:text-[1.75rem]">
          {header.title}
        </h2>
        <p className="mt-1 text-sm text-primary/60">{header.subtitle}</p>
      </div>

      <DashboardTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="grid min-w-0 gap-6 xl:grid-cols-3">
        <div className="min-w-0 space-y-6 xl:col-span-2">
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
              isProcessing={createPayment.isPending}
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
            <PaymentHistoryTab
              paymentHistory={paymentHistory}
              onViewInvoice={() => setIsInvoiceModalOpen(true)}
            />
          )}
        </div>

        <div className="min-w-0 space-y-6 xl:sticky xl:top-24 xl:self-start">
          <PaymentsSidebar
            selectedBill={selectedBill}
            onViewInvoice={() => setIsInvoiceModalOpen(true)}
            paymentType={paymentType}
            topUpAmount={topUpAmount}
          />
        </div>
      </div>

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
