"use client";

import { useEffect, useRef, useState } from "react";

export interface BirthLocation {
  displayName: string;
  city: string | null;
  district: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  latitude: number;
  longitude: number;
}

interface Props {
  value?: BirthLocation | null;
  onSelect: (location: BirthLocation | null) => void;
}

export default function BirthPlaceAutocomplete({
  value,
  onSelect,
}: Props) {
  const [query, setQuery] = useState(value?.displayName ?? "");
  const [results, setResults] = useState<BirthLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<BirthLocation | null>(
    value ?? null
  );

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setQuery(value?.displayName ?? "");
    setSelected(value ?? null);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/location/search?q=${encodeURIComponent(query)}`
        );

        const data = await res.json();

        setResults(Array.isArray(data) ? data : []);
        setOpen(true);
      } catch (error) {
        console.error("Location search error:", error);
        setResults([]);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  function handleSelect(location: BirthLocation) {
    setSelected(location);
    setQuery(location.displayName);
    setResults([]);
    setOpen(false);
    onSelect(location);
  }

  function clearSelection() {
    setSelected(null);
    setQuery("");
    setResults([]);
    setOpen(false);
    onSelect(null);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="mb-2">
        <label className="text-sm font-medium text-white">
          Birth Place
        </label>
      </div>

      <div className="relative">
        <input
          type="text"
          autoComplete="off"
          value={query}
          placeholder="Search city, town or village..."
          onChange={(e) => {
            setQuery(e.target.value);

            if (selected) {
              setSelected(null);
              onSelect(null);
            }
          }}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder:text-gray-400 outline-none transition focus:border-yellow-400"
        />

        {selected && (
          <button
            type="button"
            onClick={clearSelection}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {selected && (
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-300">
          <span>✅</span>

          <span className="truncate">
            {selected.displayName}
          </span>
        </div>
      )}

      {loading && (
        <div className="mt-2 text-sm text-gray-400">
          Searching...
        </div>
      )}

      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl">
          {results.map((location, index) => (
            <button
              key={`${location.displayName}-${index}`}
              type="button"
              onClick={() => handleSelect(location)}
              className="block w-full border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-100 last:border-none"
            >
              <div className="font-semibold text-gray-900">
                {location.city ?? location.displayName}
              </div>

              <div className="mt-1 text-sm text-gray-600">
                {location.displayName}
              </div>
            </button>
          ))}
        </div>
      )}

      {!loading &&
        open &&
        query.trim().length >= 2 &&
        results.length === 0 && (
          <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600 shadow-xl">
            No matching locations found.
          </div>
        )}
    </div>
  );
}

