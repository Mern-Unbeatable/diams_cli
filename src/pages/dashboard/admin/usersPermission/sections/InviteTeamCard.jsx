import { useState } from "react";
import { USER_ROLES } from "./usersData";

const InviteTeamCard = ({ onInvite }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Support Agent");

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (onInvite) {
      onInvite({ email: email.trim(), role });
    }
    setEmail("");
  };

  return (
    <div className="w-full max-w-xl rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold tracking-tight text-[#2ea5ff] sm:text-2xl">
        Invite your team
      </h2>
      <p className="mt-1 text-xs text-slate-400 sm:text-sm leading-relaxed">
        Easily add new members to a role by entering their email addresses
        below. Once invited, they&apos;ll receive an email with a link to join.
      </p>

      <form
        onSubmit={handleSendInvite}
        className="mt-5 flex flex-wrap items-center gap-3"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="flex-1 min-w-[200px] rounded-xl border border-slate-100 bg-[#f0f9ff] px-4 py-2.5 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500 sm:text-sm"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-700 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm cursor-pointer"
        >
          {USER_ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-xl bg-[#2ea5ff] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-500 active:scale-95 sm:text-sm"
        >
          Send Invite
        </button>
      </form>
    </div>
  );
};

export default InviteTeamCard;
