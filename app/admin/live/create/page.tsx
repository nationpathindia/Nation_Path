"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  Globe2,
  Image as ImageIcon,
  Loader2,
  Radio,
  Save,
  Trophy,
  Flag,
  Building2,
  Zap,
  AlertCircle,
} from "lucide-react";

type LiveSegment =
  | "sports"
  | "india"
  | "world"
  | "business"
  | "breaking";

type LiveEventStatus =
  | "draft"
  | "scheduled"
  | "live"
  | "paused"
  | "completed"
  | "archived";

const SEGMENTS: {
  value: LiveSegment;
  label: string;
  description: string;
  icon: typeof Radio;
}[] = [
  {
    value: "sports",
    label: "Sports",
    description: "Matches, tournaments and major sporting events",
    icon: Trophy,
  },
  {
    value: "india",
    label: "India",
    description: "National politics, government and major India events",
    icon: Flag,
  },
  {
    value: "world",
    label: "World",
    description: "International affairs, conflicts and global events",
    icon: Globe2,
  },
  {
    value: "business",
    label: "Business",
    description: "Markets, economy, companies and business events",
    icon: Building2,
  },
  {
    value: "breaking",
    label: "Breaking / Special",
    description: "Major breaking stories and special live coverage",
    icon: Zap,
  },
];

const STATUSES: {
  value: LiveEventStatus;
  label: string;
  description: string;
}[] = [
  {
    value: "draft",
    label: "Draft",
    description: "Save without making the event live",
  },
  {
    value: "scheduled",
    label: "Scheduled",
    description: "Prepare the event for a future start",
  },
  {
    value: "live",
    label: "Live",
    description: "Publish the event as active coverage",
  },
  {
    value: "paused",
    label: "Paused",
    description: "Temporarily stop active coverage",
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CreateLiveEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [description, setDescription] = useState("");

  const [segment, setSegment] =
    useState<LiveSegment>("breaking");

  const [status, setStatus] =
    useState<LiveEventStatus>("draft");

  const [coverImage, setCoverImage] = useState("");
  const [coverImageAlt, setCoverImageAlt] = useState("");

  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const [isFeatured, setIsFeatured] = useState(false);
  const [showOnHomepage, setShowOnHomepage] = useState(false);
  const [showInLiveCenter, setShowInLiveCenter] = useState(true);
  const [enableAutomation, setEnableAutomation] = useState(false);

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveMode, setSaveMode] = useState<"draft" | "normal">("normal");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);

    if (!slugEdited) {
      setSlug(slugify(value));
    }

    if (!seoTitle) {
      setSeoTitle(value);
    }
  };

  const validate = () => {
    if (!title.trim()) {
      return "Event title is required.";
    }

    if (!segment) {
      return "Please select a live segment.";
    }

    if (!slug.trim()) {
      return "Event slug is required.";
    }

    if (startAt && endAt) {
      const start = new Date(startAt);
      const end = new Date(endAt);

      if (
        !Number.isNaN(start.getTime()) &&
        !Number.isNaN(end.getTime()) &&
        end <= start
      ) {
        return "End time must be after start time.";
      }
    }

    if (status === "scheduled" && !startAt) {
      return "Start time is required for a scheduled event.";
    }

    return "";
  };

  const submit = async (
    event: FormEvent<HTMLFormElement>,
    requestedMode: "draft" | "normal"
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaveMode(requestedMode);

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      const finalStatus =
        requestedMode === "draft" ? "draft" : status;

      const response = await fetch("/api/admin/live/events", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          description: description.trim() || null,

          segment,
          status: finalStatus,

          coverImage: coverImage.trim() || null,
          coverImageAlt: coverImageAlt.trim() || null,

          isFeatured,
          showOnHomepage,
          showInLiveCenter,
          enableAutomation,

          startAt: startAt
            ? new Date(startAt).toISOString()
            : null,

          endAt: endAt
            ? new Date(endAt).toISOString()
            : null,

          seoTitle: seoTitle.trim() || null,
          seoDescription: seoDescription.trim() || null,
          seoKeywords: seoKeywords
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          canonicalUrl: canonicalUrl.trim() || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(
          result.error ||
            result.message ||
            "Failed to create live event."
        );
      }

      const createdEvent = result.data;

      setSuccess("Live event created successfully.");

      if (createdEvent?.id) {
        window.setTimeout(() => {
          router.push(`/admin/live/${createdEvent.id}`);
          router.refresh();
        }, 500);
      } else {
        window.setTimeout(() => {
          router.push("/admin/live");
          router.refresh();
        }, 500);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create live event."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa]">
      <div className="mx-auto max-w-[1250px] px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-6">
          <Link
            href="/admin/live"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#163C80]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Live Center
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-700">
                <Radio className="h-3.5 w-3.5" />
                Live Center
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Create Live Event
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create reusable live coverage for sports, India,
                world, business or breaking events.
              </p>
            </div>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div>
              <p className="font-bold">Unable to save event</p>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
            <Check className="h-5 w-5" />
            {success}
          </div>
        )}

        <form
          onSubmit={(event) => submit(event, "normal")}
          className="space-y-5"
        >
          {/* BASIC INFORMATION */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-bold text-slate-900">
                Basic Information
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Define the identity and editorial purpose of this
                live event.
              </p>
            </div>

            <div className="grid gap-5 p-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Event Title <span className="text-red-500">*</span>
                </label>

                <input
                  value={title}
                  onChange={(event) =>
                    handleTitleChange(event.target.value)
                  }
                  placeholder="e.g. Asia Cup 2026 Live Updates"
                  maxLength={180}
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Slug <span className="text-red-500">*</span>
                </label>

                <input
                  value={slug}
                  onChange={(event) => {
                    setSlugEdited(true);
                    setSlug(slugify(event.target.value));
                  }}
                  placeholder="asia-cup-2026-live-updates"
                  maxLength={180}
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#163C80] focus:bg-white focus:ring-2 focus:ring-[#163C80]/10"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Public URL: /live/{slug || "event-slug"}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Short editorial description of this live coverage..."
                  rows={4}
                  maxLength={600}
                  className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {description.length}/600
                </p>
              </div>
            </div>
          </section>

          {/* SEGMENT */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-bold text-slate-900">
                Live Segment
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Every event belongs to one permanent Live Center
                segment.
              </p>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {SEGMENTS.map((item) => {
                const Icon = item.icon;
                const active = segment === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setSegment(item.value)}
                    className={`relative rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-[#163C80] bg-[#163C80]/[0.04] ring-2 ring-[#163C80]/10"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {active && (
                      <span className="absolute right-3 top-3 rounded-full bg-[#163C80] p-1 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}

                    <div
                      className={`mb-3 inline-flex rounded-lg p-2 ${
                        active
                          ? "bg-[#163C80] text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <p className="font-bold text-slate-900">
                      {item.label}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* STATUS + SCHEDULE */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-bold text-slate-900">
                Status & Schedule
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Control when this live event becomes active.
              </p>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Event Status
                </label>

                <div className="space-y-2">
                  {STATUSES.map((item) => {
                    const active = status === item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setStatus(item.value)}
                        className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition ${
                          active
                            ? "border-[#163C80] bg-[#163C80]/[0.04]"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {item.label}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {item.description}
                          </p>
                        </div>

                        <span
                          className={`h-4 w-4 rounded-full border-2 ${
                            active
                              ? "border-[#163C80] bg-[#163C80]"
                              : "border-slate-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CalendarClock className="h-4 w-4 text-slate-500" />
                    Start Time
                  </label>

                  <input
                    type="datetime-local"
                    value={startAt}
                    onChange={(event) =>
                      setStartAt(event.target.value)
                    }
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CalendarClock className="h-4 w-4 text-slate-500" />
                    End Time
                  </label>

                  <input
                    type="datetime-local"
                    value={endAt}
                    onChange={(event) =>
                      setEndAt(event.target.value)
                    }
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* VISIBILITY + AUTOMATION */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-bold text-slate-900">
                Visibility & Automation
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Decide where the event appears and whether automated
                source processing is enabled.
              </p>
            </div>

            <div className="grid gap-3 p-5 lg:grid-cols-2">
              <Toggle
                label="Featured Event"
                description="Highlight this event inside Live Center."
                checked={isFeatured}
                onChange={setIsFeatured}
              />

              <Toggle
                label="Show on Homepage"
                description="Allow the event to appear in homepage live modules."
                checked={showOnHomepage}
                onChange={setShowOnHomepage}
              />

              <Toggle
                label="Show in Live Center"
                description="Make the event available through the public Live Center."
                checked={showInLiveCenter}
                onChange={setShowInLiveCenter}
              />

              <Toggle
                label="Enable Automation"
                description="Allow connected live sources and automation rules to process updates."
                checked={enableAutomation}
                onChange={setEnableAutomation}
              />
            </div>
          </section>

          {/* COVER IMAGE */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-bold text-slate-900">
                Cover Image
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Optional hero image for the public live event page.
              </p>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <ImageIcon className="h-4 w-4 text-slate-500" />
                  Image URL
                </label>

                <input
                  value={coverImage}
                  onChange={(event) =>
                    setCoverImage(event.target.value)
                  }
                  placeholder="https://..."
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Image Alt Text
                </label>

                <input
                  value={coverImageAlt}
                  onChange={(event) =>
                    setCoverImageAlt(event.target.value)
                  }
                  placeholder="Describe the cover image"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                />
              </div>

              {coverImage && (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 lg:col-span-2">
                  <img
                    src={coverImage}
                    alt={coverImageAlt || title || "Live event cover"}
                    className="max-h-[360px] w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </section>

          {/* SEO */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="font-bold text-slate-900">
                SEO
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search metadata for the permanent public live event
                URL.
              </p>
            </div>

            <div className="grid gap-5 p-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  SEO Title
                </label>

                <input
                  value={seoTitle}
                  onChange={(event) =>
                    setSeoTitle(event.target.value)
                  }
                  maxLength={70}
                  placeholder="SEO title"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {seoTitle.length}/70
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  SEO Description
                </label>

                <textarea
                  value={seoDescription}
                  onChange={(event) =>
                    setSeoDescription(event.target.value)
                  }
                  rows={3}
                  maxLength={160}
                  placeholder="Search engine description..."
                  className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {seoDescription.length}/160
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  SEO Keywords
                </label>

                <input
                  value={seoKeywords}
                  onChange={(event) =>
                    setSeoKeywords(event.target.value)
                  }
                  placeholder="asia cup, live updates, cricket, sports"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Separate keywords with commas.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Canonical URL
                </label>

                <input
                  value={canonicalUrl}
                  onChange={(event) =>
                    setCanonicalUrl(event.target.value)
                  }
                  placeholder="Optional canonical URL"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                />
              </div>
            </div>
          </section>

          {/* ACTION BAR */}
          <div className="sticky bottom-0 z-20 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="mx-auto flex max-w-[1250px] flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/admin/live"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Link>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  disabled={saving}
                  onClick={(event) => {
                    const form = event.currentTarget.form;

                    if (form) {
                      const submitEvent = new Event("submit", {
                        bubbles: true,
                        cancelable: true,
                      }) as unknown as FormEvent<HTMLFormElement>;

                      submit(submitEvent, "draft");
                    }
                  }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && saveMode === "draft" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Draft
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#163C80] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#12336d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && saveMode === "normal" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Radio className="h-4 w-4" />
                  )}
                  Create Live Event
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition ${
        checked
          ? "border-[#163C80]/30 bg-[#163C80]/[0.035]"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-800">
          {label}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#163C80]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </span>
    </button>
  );
}