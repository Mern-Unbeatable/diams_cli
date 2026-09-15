import {
  CollaboratorAccountSettingsCard,
  CollaboratorChangePasswordCard,
} from "./sections";

const CollaboratorProfileSettingsView = () => {
  return (
    <div className="min-h-full text-slate-900">
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
        <CollaboratorAccountSettingsCard />
        <CollaboratorChangePasswordCard />
      </div>
    </div>
  );
};

export default CollaboratorProfileSettingsView;
