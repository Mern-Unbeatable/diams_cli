import { USER_OVERVIEW } from "@/config/userOverview";
import { useAuth } from "@/context/AuthContext";
import ExclusiveOffersSection from "./sections/ExclusiveOffersSection";
import LatestBillCard from "./sections/LatestBillCard";
import MainLineCard from "./sections/MainLineCard";
import OverviewSidebar from "./sections/OverviewSidebar";
import UsageCard from "./sections/UsageCard";

const OverviewView = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-primary sm:text-[1.75rem]">
          Welcome back {user.name}
        </h2>
        <p className="mt-1 text-sm text-primary/60">{USER_OVERVIEW.subtitle}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <MainLineCard />

          <div className="grid gap-6 lg:grid-cols-2">
            <UsageCard />
            <LatestBillCard />
          </div>

          <ExclusiveOffersSection />
        </div>

        <OverviewSidebar />
      </div>
    </div>
  );
};

export default OverviewView;
