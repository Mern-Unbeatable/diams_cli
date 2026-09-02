import {
  CollaboratorAccountSettingsCard,
  CollaboratorChangePasswordCard,
} from "./sections";

const CollaboratorProfileSettingsView = () => {
  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* 2-Column Responsive Grid Layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* 1. Account Settings Card */}
        <CollaboratorAccountSettingsCard />

        {/* 2. Change Password Card */}
        <CollaboratorChangePasswordCard />
      </div>
    </div>
  );
};

export default CollaboratorProfileSettingsView;
