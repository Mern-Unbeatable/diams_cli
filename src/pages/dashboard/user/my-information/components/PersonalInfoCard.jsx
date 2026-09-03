import {
  Calendar,
  Camera,
  ChevronRight,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

export const PersonalInfoCard = ({ personalInfo, onEdit, onChangeAvatar }) => {
  return (
    <section className="rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-6">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-primary">
          Personal Information
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-primary/80 shadow-2xs transition-colors hover:bg-gray-50 hover:text-primary"
        >
          Edit
        </button>
      </div>

      {/* Main Content: Avatar on Left, Details List on Right */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 sm:gap-8">
        {/* Avatar Container */}
        <div className="flex flex-col items-center justify-center text-center shrink-0 mx-auto md:mx-0 pt-2">
          <div className="relative">
            {/* Avatar Circle */}
            <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-[#1e88e5] text-2xl sm:text-3xl font-extrabold text-white shadow-md shadow-blue-500/20">
              {personalInfo.avatarInitials || "AM"}
            </div>

            {/* Camera Upload Button */}
            <button
              type="button"
              onClick={onChangeAvatar}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-primary/70 shadow-sm transition-all hover:bg-gray-50 hover:text-btnPrimary"
              title="Change Profile Photo"
              aria-label="Change Profile Photo"
            >
              <Camera size={15} />
            </button>
          </div>

          <p className="mt-3 text-xs font-bold text-primary">Profile Photo</p>
          <p className="mt-0.5 text-[10px] text-primary/45">
            JPG, PNG, or GIF, Max 5 MB
          </p>
        </div>

        {/* Details List */}
        <div className="flex-1 min-w-0 divide-y divide-gray-100">
          {/* Full Name */}
          <div
            onClick={onEdit}
            className="flex items-center justify-between py-3 first:pt-0 cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
                <User size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-primary/45">
                  Full Name
                </p>
                <p className="text-xs sm:text-sm font-bold text-primary truncate">
                  {personalInfo.fullName}
                </p>
              </div>
            </div>
            <ChevronRight
              size={15}
              className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </div>

          {/* Date of Birth */}
          <div
            onClick={onEdit}
            className="flex items-center justify-between py-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
                <Calendar size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-primary/45">
                  Date of Birth
                </p>
                <p className="text-xs sm:text-sm font-bold text-primary truncate">
                  {personalInfo.dob}
                </p>
              </div>
            </div>
            <ChevronRight
              size={15}
              className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </div>

          {/* Email Address */}
          <div
            onClick={onEdit}
            className="flex items-center justify-between py-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
                <Mail size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-primary/45">
                  Email Address
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs sm:text-sm font-bold text-primary truncate">
                    {personalInfo.email}
                  </p>
                  {personalInfo.isEmailVerified && (
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-200/50">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ChevronRight
              size={15}
              className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </div>

          {/* Phone Number */}
          <div
            onClick={onEdit}
            className="flex items-center justify-between py-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
                <Phone size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-primary/45">
                  Phone Number
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs sm:text-sm font-bold text-primary truncate">
                    {personalInfo.phone}
                  </p>
                  {personalInfo.isPhoneVerified && (
                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-200/50">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <ChevronRight
              size={15}
              className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </div>

          {/* Address */}
          <div
            onClick={onEdit}
            className="flex items-center justify-between py-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
                <MapPin size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-primary/45">
                  Address
                </p>
                <p className="text-xs sm:text-sm font-bold text-primary truncate">
                  {personalInfo.address}
                </p>
              </div>
            </div>
            <ChevronRight
              size={15}
              className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </div>

          {/* Language */}
          <div
            onClick={onEdit}
            className="flex items-center justify-between py-3 last:pb-0 cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-primary/60 border border-gray-100">
                <Globe size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-primary/45">
                  Language
                </p>
                <p className="text-xs sm:text-sm font-bold text-primary truncate">
                  {personalInfo.language}
                </p>
              </div>
            </div>
            <ChevronRight
              size={15}
              className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
