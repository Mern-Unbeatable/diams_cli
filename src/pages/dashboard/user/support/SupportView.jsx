import { useState } from "react";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import { USER_SUPPORT } from "@/config/userSupport";
import { SupportHeroCard } from "./components/SupportHeroCard";
import { PopularTopicsSection } from "./components/PopularTopicsSection";
import { RecentTicketsSection } from "./components/RecentTicketsSection";
import { ContactUsCard } from "./components/ContactUsCard";
import { SupportFaqCard } from "./components/SupportFaqCard";
import { StillNeedHelpCard } from "./components/StillNeedHelpCard";
import { SupportTicketsTab } from "./components/SupportTicketsTab";
import { SupportFaqTab } from "./components/SupportFaqTab";
import { LiveChatModal } from "./components/LiveChatModal";
import { NewTicketModal } from "./components/NewTicketModal";
import { TicketDetailsModal } from "./components/TicketDetailsModal";
import { FaqDetailModal } from "./components/FaqDetailModal";

const SupportView = () => {
  const {
    header,
    tabs,
    searchBanner,
    popularTopics,
    recentTickets: initialTickets,
    frequentlyAskedQuestions,
  } = USER_SUPPORT;

  const [activeTab, setActiveTab] = useState("overview");
  const [tickets, setTickets] = useState(initialTickets);

  // Modals state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedFaq, setSelectedFaq] = useState(null);

  const handleCreateTicket = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const handleTopicClick = (topic) => {
    setActiveTab("faq");
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

      {/* Navigation Tabs */}
      <DashboardTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Overview + My Tickets share the right-side panels */}
      {(activeTab === "overview" || activeTab === "tickets") && (
        <div className="grid min-w-0 gap-6 xl:grid-cols-3">
          <div className="min-w-0 space-y-6 xl:col-span-2">
            {activeTab === "overview" && (
              <>
                <SupportHeroCard
                  banner={searchBanner}
                  onSearch={() => setActiveTab("faq")}
                />

                <PopularTopicsSection
                  topics={popularTopics}
                  onSelectTopic={handleTopicClick}
                  onViewAll={() => setActiveTab("faq")}
                />

                <RecentTicketsSection
                  tickets={tickets}
                  onSelectTicket={(t) => setSelectedTicket(t)}
                />
              </>
            )}

            {activeTab === "tickets" && (
              <SupportTicketsTab
                tickets={tickets}
                onOpenNewTicket={() => setIsNewTicketOpen(true)}
                onSelectTicket={(t) => setSelectedTicket(t)}
              />
            )}
          </div>

          <div className="min-w-0 space-y-6 xl:sticky xl:top-24 xl:self-start">
            <ContactUsCard
              onStartChat={() => setIsChatOpen(true)}
              onOpenNewTicket={() => setIsNewTicketOpen(true)}
            />

            <SupportFaqCard
              faqs={frequentlyAskedQuestions}
              onSelectFaq={(faq) => setSelectedFaq(faq)}
              onViewAllFaq={() => setActiveTab("faq")}
            />

            <StillNeedHelpCard onStartChat={() => setIsChatOpen(true)} />
          </div>
        </div>
      )}

      {/* TAB 3: FAQ Tab */}
      {activeTab === "faq" && (
        <SupportFaqTab faqs={frequentlyAskedQuestions} />
      )}

      {/* Modals */}
      <LiveChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <NewTicketModal
        isOpen={isNewTicketOpen}
        onClose={() => setIsNewTicketOpen(false)}
        onCreateTicket={handleCreateTicket}
      />

      <TicketDetailsModal
        isOpen={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
        ticket={selectedTicket}
      />

      <FaqDetailModal
        isOpen={!!selectedFaq}
        onClose={() => setSelectedFaq(null)}
        faq={selectedFaq}
      />
    </div>
  );
};

export default SupportView;
