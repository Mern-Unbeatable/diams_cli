import { Calendar, ChevronDown } from "lucide-react";
import { COUNTRIES } from "@/config/personalInfo";

const labelClass = "mb-1.5 block text-sm font-bold text-primary";
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-primary outline-none transition-colors placeholder:text-gray-400 focus:border-btnPrimary";

const PersonalAccountForm = () => {
  return (
    <>
      <section className="mt-10">
        <h2 className="text-lg font-bold text-primary">Personal information</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              First name
            </label>
            <input id="firstName" type="text" className={inputClass} />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last name
            </label>
            <input id="lastName" type="text" className={inputClass} />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <input id="email" type="email" className={inputClass} />
        </div>

        <div className="mt-4">
          <label htmlFor="phone" className={labelClass}>
            Phone number
          </label>
          <div className="flex gap-2">
            <div className="relative shrink-0">
              <select
                className={`${inputClass} w-[108px] appearance-none pr-8`}
                defaultValue="+41"
                aria-label="Country code"
              >
                <option value="+41">🇨🇭 +41</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            <input
              id="phone"
              type="tel"
              placeholder="76 123 45 67"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="dob" className={labelClass}>
            Date of birth
          </label>
          <div className="relative">
            <input
              id="dob"
              type="text"
              placeholder="DD / MM / YYYY"
              className={`${inputClass} pr-11`}
            />
            <Calendar
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-primary">Residential address</h2>

        <div className="mt-5">
          <label htmlFor="street" className={labelClass}>
            Street and number
          </label>
          <input
            id="street"
            type="text"
            placeholder="e.g. Rue de la Gare 12"
            className={inputClass}
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1.4fr]">
          <div>
            <label htmlFor="postalCode" className={labelClass}>
              Postal code
            </label>
            <input
              id="postalCode"
              type="text"
              placeholder="e.g. 1003"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="city" className={labelClass}>
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="e.g. Lausanne"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="country" className={labelClass}>
            Country
          </label>
          <div className="relative">
            <select id="country" className={`${inputClass} appearance-none pr-10`}>
              {COUNTRIES.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PersonalAccountForm;
