"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import BirthPlaceAutocomplete, {
  BirthLocation,
} from "./BirthPlaceAutocomplete";

export default function KundaliBirthForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState<BirthLocation | null>(null);

  const [unknownBirthTime, setUnknownBirthTime] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!location) {
      alert("Please select your birth place from the suggestions.");
      return;
    }

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/astro/birth-profile", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: form.get("name"),

        dateOfBirth: form.get("dateOfBirth"),

        birthTime: unknownBirthTime
          ? null
          : form.get("birthTime"),

        isBirthTimeApproximate: unknownBirthTime,

        birthPlace: location.displayName,

        location,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Unable to save profile.");
      return;
    }

    router.refresh();
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <input
          required
          name="name"
          placeholder="Enter your full name"
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Date of Birth
        </label>

        <input
          required
          name="dateOfBirth"
          type="date"
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Birth Time
        </label>

        <input
          type="time"
          name="birthTime"
          disabled={unknownBirthTime}
          className="w-full rounded-xl border border-white/10 bg-white/5 p-3 disabled:opacity-50"
        />

        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={unknownBirthTime}
            onChange={(e) =>
              setUnknownBirthTime(e.target.checked)
            }
          />

          I don't know my exact birth time
        </label>
      </div>

      <BirthPlaceAutocomplete
        value={location}
        onSelect={setLocation}
      />

      <button
        disabled={loading}
        className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : "Generate Free Kundali"}
      </button>
    </form>
  );
}