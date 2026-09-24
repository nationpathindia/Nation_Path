"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Edit3,
  ExternalLink,
  Globe2,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  MoreVertical,
  Pin,
  Play,
  Plus,
  Radio,
  RefreshCw,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type Segment =
  | "sports"
  | "india"
  | "world"
  | "business"
  | "breaking";

type EventStatus =
  | "draft"
  | "scheduled"
  | "live"
  | "paused"
  | "completed"
  | "archived";

type UpdateStatus =
  | "draft"
  | "scheduled"
  | "published"
  | "corrected"
  | "archived";

type VerificationStatus =
  | "unverified"
  | "under_review"
  | "verified"
  | "partially_verified"
  | "correction_required";

type UpdateType =
  | "update"
  | "breaking"
  | "analysis"
  | "statement"
  | "result"
  | "alert"
  | "correction"
  | "summary";

interface LiveEvent {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  segment: Segment;
  status: EventStatus;
  coverImage?: string | null;
  coverImageAlt?: string | null;
  isFeatured: boolean;
  showOnHomepage: boolean;
  showInLiveCenter: boolean;
  enableAutomation: boolean;
  startAt?: string | null;
  endAt?: string | null;
  updateCount: number;
  lastUpdateAt?: string | null;
  lastPublishedAt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  canonicalUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    updates: number;
    sources: number;
    articleLinks: number;
    automationRules: number;
  };
}

interface LiveUpdate {
  id: string;
  eventId: string;
  headline?: string | null;
  content: string;
  type: UpdateType;
  status: UpdateStatus;
  verificationStatus: VerificationStatus;
  isBreaking: boolean;
  isPinned: boolean;
  publishedAt?: string | null;
  scheduledAt?: string | null;
  sourceName?: string | null;
  sourceUrl?: string | null;
  sourceType?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  videoUrl?: string | null;
  embedUrl?: string | null;
  verificationNotes?: string | null;
  correctionOfId?: string | null;
  isAutomated: boolean;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name?: string | null;
    email?: string | null;
  } | null;
  source?: {
    id: string;
    name: string;
    type: string;
    url?: string | null;
    trustLevel?: string | null;
  } | null;
}

const SEGMENTS: { value: Segment; label: string }[] = [
  { value: "sports", label: "Sports" },
  { value: "india", label: "India" },
  { value: "world", label: "World" },
  { value: "business", label: "Business" },
  { value: "breaking", label: "Breaking / Special" },
];

const UPDATE_TYPES: { value: UpdateType; label: string }[] = [
  { value: "update", label: "Update" },
  { value: "breaking", label: "Breaking" },
  { value: "analysis", label: "Analysis" },
  { value: "statement", label: "Statement" },
  { value: "result", label: "Result" },
  { value: "alert", label: "Alert" },
  { value: "correction", label: "Correction" },
  { value: "summary", label: "Summary" },
];

const VERIFICATION_OPTIONS: {
  value: VerificationStatus;
  label: string;
}[] = [
  { value: "unverified", label: "Unverified" },
  { value: "under_review", label: "Under Review" },
  { value: "verified", label: "Verified" },
  { value: "partially_verified", label: "Partially Verified" },
  { value: "correction_required", label: "Correction Required" },
];

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTime(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function segmentLabel(segment: Segment) {
  return (
    SEGMENTS.find((item) => item.value === segment)?.label ||
    segment
  );
}

function statusClass(status: string) {
  switch (status) {
    case "live":
      return "bg-red-50 text-red-700 border-red-200";

    case "published":
    case "verified":
      return "bg-green-50 text-green-700 border-green-200";

    case "scheduled":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "paused":
    case "under_review":
    case "partially_verified":
      return "bg-amber-50 text-amber-700 border-amber-200";

    case "correction_required":
    case "corrected":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "archived":
      return "bg-gray-100 text-gray-600 border-gray-200";

    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusClass(
        status
      )}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span
        className={`relative h-5 w-9 rounded-full transition ${
          checked ? "bg-[#163C80]" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>

      {label}
    </button>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: typeof Radio;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </span>

        <Icon className="h-4 w-4 text-[#163C80]" />
      </div>

      <div className="text-2xl font-bold text-gray-900">
        {value}
      </div>
    </div>
  );
}

export default function LiveEventWorkspace() {
  const params = useParams();

  const eventId = String(params?.id || "");

  const [event, setEvent] = useState<LiveEvent | null>(null);
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);

  const [loading, setLoading] = useState(true);
  const [updatesLoading, setUpdatesLoading] = useState(false);
  const [savingEvent, setSavingEvent] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(
    null
  );
  const [actionId, setActionId] = useState<string | null>(null);

  const [error, setError] = useState("");

  const [timelineFilter, setTimelineFilter] = useState<
    "all" | UpdateStatus | VerificationStatus
  >("all");

  const [updateType, setUpdateType] =
    useState<UpdateType>("update");

  const [updateStatus, setUpdateStatus] =
    useState<UpdateStatus>("published");

  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("unverified");

  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [isBreaking, setIsBreaking] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [eventStatus, setEventStatus] =
    useState<EventStatus>("draft");

  const [eventDescription, setEventDescription] = useState("");
  const [showHomepage, setShowHomepage] = useState(false);
  const [showLiveCenter, setShowLiveCenter] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [enableAutomation, setEnableAutomation] =
    useState(false);

  const [showEventSettings, setShowEventSettings] =
    useState(false);

  /* =========================================================
     SAFE JSON RESPONSE
  ========================================================= */

  const parseResponse = async (response: Response) => {
    return response.json().catch(() => ({
      success: false,
      error: `Request failed with status ${response.status}`,
    }));
  };

  /* =========================================================
     LOAD EVENT
  ========================================================= */

  const loadEvent = useCallback(async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/live/events/${eventId}`,
        {
          cache: "no-store",
          credentials: "include",
        }
      );

      const json = await parseResponse(response);

      if (!response.ok || !json.success) {
        throw new Error(
          json.error || "Failed to load live event"
        );
      }

      const data: LiveEvent = json.data;

      setEvent(data);
      setEventStatus(data.status);
      setEventDescription(data.description || "");
      setShowHomepage(Boolean(data.showOnHomepage));
      setShowLiveCenter(Boolean(data.showInLiveCenter));
      setIsFeatured(Boolean(data.isFeatured));
      setEnableAutomation(Boolean(data.enableAutomation));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load live event"
      );
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  /* =========================================================
     LOAD UPDATES
  ========================================================= */

  const loadUpdates = useCallback(async () => {
    if (!eventId) return;

    try {
      setUpdatesLoading(true);

      const response = await fetch(
        `/api/admin/live/updates?eventId=${encodeURIComponent(
          eventId
        )}&limit=100`,
        {
          cache: "no-store",
          credentials: "include",
        }
      );

      const json = await parseResponse(response);

      if (!response.ok || !json.success) {
        throw new Error(
          json.error || "Failed to load live updates"
        );
      }

      setUpdates(json.data?.updates || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load updates"
      );
    } finally {
      setUpdatesLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    loadEvent();
    loadUpdates();
  }, [loadEvent, loadUpdates]);

  /* =========================================================
     FILTERED TIMELINE
  ========================================================= */

  const filteredUpdates = useMemo(() => {
    if (timelineFilter === "all") {
      return updates;
    }

    return updates.filter(
      (update) =>
        update.status === timelineFilter ||
        update.verificationStatus === timelineFilter
    );
  }, [timelineFilter, updates]);

  /* =========================================================
     EVENT STATUS
  ========================================================= */

  async function updateEventStatus(
    nextStatus: EventStatus
  ) {
    if (!event || savingEvent) return;

    try {
      setSavingEvent(true);
      setError("");

      const response = await fetch(
        `/api/admin/live/events/${event.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      const json = await parseResponse(response);

      if (!response.ok || !json.success) {
        throw new Error(
          json.error || "Failed to update event status"
        );
      }

      setEvent(json.data);
      setEventStatus(json.data.status);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update event"
      );
    } finally {
      setSavingEvent(false);
    }
  }

  /* =========================================================
     EVENT SETTINGS
  ========================================================= */

  async function saveEventSettings() {
    if (!event || savingEvent) return;

    try {
      setSavingEvent(true);
      setError("");

      const response = await fetch(
        `/api/admin/live/events/${event.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            description: eventDescription.trim(),
            status: eventStatus,
            showOnHomepage: showHomepage,
            showInLiveCenter: showLiveCenter,
            isFeatured,
            enableAutomation,
          }),
        }
      );

      const json = await parseResponse(response);

      if (!response.ok || !json.success) {
        throw new Error(
          json.error || "Failed to save event settings"
        );
      }

      setEvent(json.data);
      setEventStatus(json.data.status);
      setShowHomepage(Boolean(json.data.showOnHomepage));
      setShowLiveCenter(Boolean(json.data.showInLiveCenter));
      setIsFeatured(Boolean(json.data.isFeatured));
      setEnableAutomation(Boolean(json.data.enableAutomation));

      setShowEventSettings(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save event settings"
      );
    } finally {
      setSavingEvent(false);
    }
  }

  /* =========================================================
     RESET COMPOSER
  ========================================================= */

  function resetComposer() {
    setEditingId(null);
    setUpdateType("update");
    setUpdateStatus("published");
    setVerificationStatus("unverified");
    setHeadline("");
    setContent("");
    setSourceName("");
    setSourceUrl("");
    setImageUrl("");
    setImageAlt("");
    setScheduledAt("");
    setIsBreaking(false);
    setIsPinned(false);
  }

  /* =========================================================
     EDIT UPDATE
  ========================================================= */

  function editUpdate(update: LiveUpdate) {
    setError("");

    setEditingId(update.id);
    setUpdateType(update.type);
    setUpdateStatus(update.status);
    setVerificationStatus(update.verificationStatus);
    setHeadline(update.headline || "");
    setContent(update.content);
    setSourceName(update.sourceName || "");
    setSourceUrl(update.sourceUrl || "");
    setImageUrl(update.imageUrl || "");
    setImageAlt(update.imageAlt || "");

    setScheduledAt(
      update.scheduledAt
        ? new Date(update.scheduledAt)
            .toISOString()
            .slice(0, 16)
        : ""
    );

    setIsBreaking(update.isBreaking);
    setIsPinned(update.isPinned);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================================================
     SAVE / UPDATE LIVE UPDATE
  ========================================================= */

  async function submitUpdate(
    eventObject: FormEvent,
    forcedStatus?: UpdateStatus,
    forcedVerification?: VerificationStatus
  ) {
    eventObject.preventDefault();

    if (!eventId) return;

    const finalStatus =
      forcedStatus ?? updateStatus;

    const finalVerification =
      forcedVerification ?? verificationStatus;

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      setError("Live update content is required.");
      return;
    }

    if (
      finalStatus === "scheduled" &&
      !scheduledAt
    ) {
      setError(
        "Please select a future date and time for scheduled publication."
      );
      return;
    }

    if (
      finalStatus === "scheduled" &&
      scheduledAt
    ) {
      const scheduledDate = new Date(scheduledAt);

      if (
        Number.isNaN(scheduledDate.getTime()) ||
        scheduledDate <= new Date()
      ) {
        setError(
          "Scheduled publish time must be in the future."
        );
        return;
      }
    }

    try {
      setPublishing(true);
      setError("");

      const payload = {
        eventId,
        headline: headline.trim() || null,
        content: trimmedContent,
        type: updateType,
        status: finalStatus,
        verificationStatus: finalVerification,
        isBreaking,
        isPinned,

        scheduledAt:
          finalStatus === "scheduled"
            ? scheduledAt
              ? new Date(
                  scheduledAt
                ).toISOString()
              : null
            : null,

        sourceName:
          sourceName.trim() || null,

        sourceUrl:
          sourceUrl.trim() || null,

        sourceType: "manual",

        imageUrl:
          imageUrl.trim() || null,

        imageAlt:
          imageAlt.trim() || null,
      };

      const isEditing = Boolean(editingId);

      const url = isEditing
        ? `/api/admin/live/updates/${editingId}`
        : "/api/admin/live/updates";

      const response = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await parseResponse(response);

      if (!response.ok || !json.success) {
        throw new Error(
          json.error ||
            (isEditing
              ? "Failed to update live update"
              : "Failed to create live update")
        );
      }

      resetComposer();

      await Promise.all([
        loadUpdates(),
        loadEvent(),
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save live update"
      );
    } finally {
      setPublishing(false);
    }
  }

  /* =========================================================
     SAVE DRAFT
     
     IMPORTANT:
     Does NOT depend on setState completing before submit.
     Directly passes draft status to submitUpdate().
  ========================================================= */

  async function saveDraft() {
    const fakeSubmitEvent = {
      preventDefault: () => undefined,
    } as FormEvent;

    await submitUpdate(
      fakeSubmitEvent,
      "draft",
      "under_review"
    );
  }

  /* =========================================================
     DELETE / ARCHIVE UPDATE
  ========================================================= */

  async function archiveUpdate(updateId: string) {
    if (deletingId) return;

    const confirmed = window.confirm(
      "Delete this live update?\n\nIt will be removed from the active timeline and kept in editorial history as archived."
    );

    if (!confirmed) return;

    try {
      setDeletingId(updateId);
      setError("");

      const response = await fetch(
        `/api/admin/live/updates/${updateId}`,
        {
          method: "DELETE",
          credentials: "include",
          cache: "no-store",
        }
      );

      const json = await parseResponse(response);

      if (!response.ok || !json.success) {
        throw new Error(
          json.error || "Failed to delete live update"
        );
      }

      if (editingId === updateId) {
        resetComposer();
      }

      /*
       * Immediately remove from active UI.
       * API also archives it in DB.
       */
      setUpdates((current) =>
        current.filter(
          (item) => item.id !== updateId
        )
      );

      await Promise.all([
        loadUpdates(),
        loadEvent(),
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete live update"
      );
    } finally {
      setDeletingId(null);
    }
  }

  /* =========================================================
     QUICK PUBLISH
  ========================================================= */

  async function quickPublish(updateId: string) {
    if (actionId) return;

    try {
      setActionId(updateId);
      setError("");

      const response = await fetch(
        `/api/admin/live/updates/${updateId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: "published",
            publishedAt: new Date().toISOString(),
          }),
        }
      );

      const json = await parseResponse(response);

      if (!response.ok || !json.success) {
        throw new Error(
          json.error || "Failed to publish update"
        );
      }

      await Promise.all([
        loadUpdates(),
        loadEvent(),
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to publish update"
      );
    } finally {
      setActionId(null);
    }
  }

  /* =========================================================
     PIN / UNPIN
  ========================================================= */

  async function togglePin(update: LiveUpdate) {
    if (actionId) return;

    try {
      setActionId(update.id);
      setError("");

      const response = await fetch(
        `/api/admin/live/updates/${update.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            isPinned: !update.isPinned,
          }),
        }
      );

      const json = await parseResponse(response);

      if (!response.ok || !json.success) {
        throw new Error(
          json.error || "Failed to update pin"
        );
      }

      await loadUpdates();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update pin"
      );
    } finally {
      setActionId(null);
    }
  }

  /* =========================================================
     DISTRIBUTION TOGGLES
  ========================================================= */

  async function updateDistribution(
    field:
      | "showInLiveCenter"
      | "showOnHomepage"
      | "isFeatured"
      | "enableAutomation",
    value: boolean
  ) {
    if (!event) return;

  const previous = {
  showInLiveCenter: showLiveCenter,
  showHomepage,
  isFeatured,
  enableAutomation,
};
    if (field === "showInLiveCenter") {
      setShowLiveCenter(value);
    }

    if (field === "showOnHomepage") {
      setShowHomepage(value);
    }

    if (field === "isFeatured") {
      setIsFeatured(value);
    }

    if (field === "enableAutomation") {
      setEnableAutomation(value);
    }

    try {
      setError("");

      const response = await fetch(
        `/api/admin/live/events/${event.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            [field]: value,
          }),
        }
      );

      const json = await parseResponse(response);

      if (!response.ok || !json.success) {
        throw new Error(
          json.error || "Failed to update distribution"
        );
      }

      setEvent(json.data);

      setShowLiveCenter(
        Boolean(json.data.showInLiveCenter)
      );
      setShowHomepage(
        Boolean(json.data.showOnHomepage)
      );
      setIsFeatured(
        Boolean(json.data.isFeatured)
      );
      setEnableAutomation(
        Boolean(json.data.enableAutomation)
      );
    } catch (err) {
      setShowLiveCenter(
        previous.showInLiveCenter
      );
      setShowHomepage(
        previous.showHomepage
      );
      setIsFeatured(
        previous.isFeatured
      );
      setEnableAutomation(
        previous.enableAutomation
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update distribution"
      );
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#163C80]" />
      </div>
    );
  }

  /* =========================================================
     EVENT NOT FOUND
  ========================================================= */

  if (!event) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          <h1 className="mb-2 text-lg font-bold">
            Live event unavailable
          </h1>

          <p className="text-sm">
            {error ||
              "The requested live event could not be loaded."}
          </p>

          <Link
            href="/admin/live"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#163C80] px-4 py-2 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Live Center
          </Link>
        </div>
      </div>
    );
  }

  const publishedCount = updates.filter(
    (item) => item.status === "published"
  ).length;

  const pendingCount = updates.filter(
    (item) =>
      item.verificationStatus === "under_review" ||
      item.verificationStatus === "unverified"
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F5EF]">
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <Link
                href="/admin/live"
                className="mt-1 rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50"
                title="Back"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>

              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#163C80]/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[#163C80]">
                    <Radio className="h-3.5 w-3.5" />
                    {segmentLabel(event.segment)}
                  </span>

                  <StatusBadge status={event.status} />

                  {event.enableAutomation && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
                      <Sparkles className="h-3.5 w-3.5" />
                      Automation
                    </span>
                  )}
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                  {event.title}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Started {formatDate(event.startAt)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    {updates.length} updates
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Globe2 className="h-4 w-4" />
                    /live/{event.slug}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {event.status !== "live" &&
                event.status !== "completed" &&
                event.status !== "archived" && (
                  <button
                    type="button"
                    disabled={savingEvent}
                    onClick={() =>
                      updateEventStatus("live")
                    }
                    className="inline-flex items-center gap-2 rounded-lg bg-[#163C80] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#102f67] disabled:opacity-60"
                  >
                    {savingEvent ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    Go Live
                  </button>
                )}

              {event.status === "live" && (
                <>
                  <button
                    type="button"
                    disabled={savingEvent}
                    onClick={() =>
                      updateEventStatus("paused")
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-700 hover:bg-amber-100 disabled:opacity-60"
                  >
                    <Clock className="h-4 w-4" />
                    Pause
                  </button>

                  <button
                    type="button"
                    disabled={savingEvent}
                    onClick={() =>
                      updateEventStatus("completed")
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-2.5 text-sm font-bold text-green-700 hover:bg-green-100 disabled:opacity-60"
                  >
                    <Check className="h-4 w-4" />
                    Complete
                  </button>
                </>
              )}

              {event.status === "paused" && (
                <button
                  type="button"
                  disabled={savingEvent}
                  onClick={() =>
                    updateEventStatus("live")
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-[#163C80] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#102f67]"
                >
                  <Play className="h-4 w-4" />
                  Resume Live
                </button>
              )}

              {event.status === "completed" && (
                <button
                  type="button"
                  disabled={savingEvent}
                  onClick={() =>
                    updateEventStatus("archived")
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Archive
                </button>
              )}

              <Link
                href={`/live/${event.slug}`}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <ExternalLink className="h-4 w-4" />
                View Live
              </Link>

              <button
                type="button"
                onClick={() =>
                  setShowEventSettings(
                    (value) => !value
                  )
                }
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Edit3 className="h-4 w-4" />
                Settings
              </button>
            </div>
          </div>

          {/* ===================================================
              EVENT SETTINGS
          =================================================== */}

          {showEventSettings && (
            <div className="border-t border-gray-200 bg-gray-50 p-5">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="lg:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Event Description
                  </label>

                  <textarea
                    value={eventDescription}
                    onChange={(e) =>
                      setEventDescription(
                        e.target.value
                      )
                    }
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Event Status
                  </label>

                  <select
                    value={eventStatus}
                    onChange={(e) =>
                      setEventStatus(
                        e.target.value as EventStatus
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#163C80]"
                  >
                    <option value="draft">
                      Draft
                    </option>
                    <option value="scheduled">
                      Scheduled
                    </option>
                    <option value="live">
                      Live
                    </option>
                    <option value="paused">
                      Paused
                    </option>
                    <option value="completed">
                      Completed
                    </option>
                    <option value="archived">
                      Archived
                    </option>
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-5 pt-7">
                  <Toggle
                    checked={isFeatured}
                    onChange={setIsFeatured}
                    label="Featured"
                  />

                  <Toggle
                    checked={showHomepage}
                    onChange={setShowHomepage}
                    label="Homepage"
                  />

                  <Toggle
                    checked={showLiveCenter}
                    onChange={setShowLiveCenter}
                    label="Live Center"
                  />

                  <Toggle
                    checked={enableAutomation}
                    onChange={setEnableAutomation}
                    label="Automation"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowEventSettings(false)
                  }
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={saveEventSettings}
                  disabled={savingEvent}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#163C80] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
                >
                  {savingEvent ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Total Updates"
            value={updates.length}
            icon={MessageSquare}
          />

          <StatCard
            label="Published"
            value={publishedCount}
            icon={Send}
          />

          <StatCard
            label="Review / Unverified"
            value={pendingCount}
            icon={ShieldCheck}
          />

          <StatCard
            label="Sources"
            value={event._count?.sources ?? 0}
            icon={Globe2}
          />
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
          {/* ===================================================
              MAIN
          =================================================== */}

          <main className="min-w-0">
            {/* =================================================
                COMPOSER
            ================================================= */}

            <section className="mb-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#163C80]/10 p-2 text-[#163C80]">
                    {editingId ? (
                      <Edit3 className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </div>

                  <div>
                    <h2 className="font-bold text-gray-900">
                      {editingId
                        ? "Edit Live Update"
                        : "Add Live Update"}
                    </h2>

                    <p className="text-xs text-gray-500">
                      Publish verified newsroom updates to
                      the timeline.
                    </p>
                  </div>
                </div>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetComposer}
                    disabled={publishing}
                    className="text-sm font-semibold text-gray-500 hover:text-gray-900 disabled:opacity-50"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form
                id="live-update-form"
                onSubmit={submitUpdate}
                className="p-5"
              >
                <div className="mb-4 grid gap-3 md:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">
                      Update Type
                    </label>

                    <select
                      value={updateType}
                      onChange={(e) =>
                        setUpdateType(
                          e.target.value as UpdateType
                        )
                      }
                      disabled={publishing}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-[#163C80] disabled:bg-gray-50"
                    >
                      {UPDATE_TYPES.map((item) => (
                        <option
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">
                      Publish Status
                    </label>

                    <select
                      value={updateStatus}
                      onChange={(e) =>
                        setUpdateStatus(
                          e.target.value as UpdateStatus
                        )
                      }
                      disabled={publishing}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-[#163C80] disabled:bg-gray-50"
                    >
                      <option value="draft">
                        Draft
                      </option>
                      <option value="scheduled">
                        Scheduled
                      </option>
                      <option value="published">
                        Published
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">
                      Verification
                    </label>

                    <select
                      value={verificationStatus}
                      onChange={(e) =>
                        setVerificationStatus(
                          e.target.value as VerificationStatus
                        )
                      }
                      disabled={publishing}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium outline-none focus:border-[#163C80] disabled:bg-gray-50"
                    >
                      {VERIFICATION_OPTIONS.map(
                        (item) => (
                          <option
                            key={item.value}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Headline
                  </label>

                  <input
                    value={headline}
                    onChange={(e) =>
                      setHeadline(e.target.value)
                    }
                    disabled={publishing}
                    placeholder="Short live update headline (optional)"
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm font-semibold outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10 disabled:bg-gray-50"
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Update
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <textarea
                    value={content}
                    onChange={(e) =>
                      setContent(e.target.value)
                    }
                    disabled={publishing}
                    rows={6}
                    placeholder="Write the latest verified development..."
                    className="w-full resize-y rounded-lg border border-gray-300 px-3 py-3 text-sm leading-6 outline-none focus:border-[#163C80] focus:ring-2 focus:ring-[#163C80]/10 disabled:bg-gray-50"
                  />
                </div>

                {updateStatus === "scheduled" && (
                  <div className="mb-4 max-w-sm">
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Schedule Publish
                    </label>

                    <input
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) =>
                        setScheduledAt(e.target.value)
                      }
                      disabled={publishing}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#163C80] disabled:bg-gray-50"
                    />
                  </div>
                )}

                <div className="mb-4 grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Source Name
                    </label>

                    <input
                      value={sourceName}
                      onChange={(e) =>
                        setSourceName(e.target.value)
                      }
                      disabled={publishing}
                      placeholder="Reuters, AP, Official statement, etc."
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#163C80] disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Source URL
                    </label>

                    <input
                      value={sourceUrl}
                      onChange={(e) =>
                        setSourceUrl(e.target.value)
                      }
                      disabled={publishing}
                      placeholder="https://..."
                      type="url"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#163C80] disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="mb-4 grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                      <ImageIcon className="h-4 w-4" />
                      Image URL
                    </label>

                    <input
                      value={imageUrl}
                      onChange={(e) =>
                        setImageUrl(e.target.value)
                      }
                      disabled={publishing}
                      placeholder="Optional image URL"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#163C80] disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                      Image Alt
                    </label>

                    <input
                      value={imageAlt}
                      onChange={(e) =>
                        setImageAlt(e.target.value)
                      }
                      disabled={publishing}
                      placeholder="Describe the image"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#163C80] disabled:bg-gray-50"
                    />
                  </div>
                </div>

                <div className="mb-5 flex flex-wrap gap-5">
                  <Toggle
                    checked={isBreaking}
                    onChange={setIsBreaking}
                    label="Breaking Update"
                    disabled={publishing}
                  />

                  <Toggle
                    checked={isPinned}
                    onChange={setIsPinned}
                    label="Pin to Timeline"
                    disabled={publishing}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-gray-500">
                    {verificationStatus ===
                    "verified"
                      ? "Verified update ready for publication."
                      : "Editorial verification status will be visible in the newsroom."}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={saveDraft}
                      disabled={publishing}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {publishing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Save Draft
                    </button>

                    <button
                      type="submit"
                      disabled={publishing}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EA661B] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#d95710] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {publishing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : updateStatus ===
                        "scheduled" ? (
                        <Calendar className="h-4 w-4" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}

                      {editingId
                        ? "Update Live"
                        : updateStatus ===
                          "scheduled"
                        ? "Schedule Update"
                        : updateStatus ===
                          "published"
                        ? "Publish Update"
                        : "Save Update"}
                    </button>
                  </div>
                </div>
              </form>
            </section>

            {/* =================================================
                TIMELINE
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Live Timeline
                  </h2>

                  <p className="text-sm text-gray-500">
                    {updates.length} newsroom updates
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={timelineFilter}
                    onChange={(e) =>
                      setTimelineFilter(
                        e.target.value as
                          | "all"
                          | UpdateStatus
                          | VerificationStatus
                      )
                    }
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium outline-none focus:border-[#163C80]"
                  >
                    <option value="all">
                      All Updates
                    </option>

                    <option value="published">
                      Published
                    </option>

                    <option value="scheduled">
                      Scheduled
                    </option>

                    <option value="draft">
                      Drafts
                    </option>

                    <option value="under_review">
                      Under Review
                    </option>

                    <option value="verified">
                      Verified
                    </option>

                    <option value="correction_required">
                      Correction Required
                    </option>

                    <option value="archived">
                      Archived
                    </option>
                  </select>

                  <button
                    type="button"
                    onClick={loadUpdates}
                    disabled={updatesLoading}
                    className="rounded-lg border border-gray-300 bg-white p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-60"
                    title="Refresh"
                  >
                    <RefreshCw
                      className={`h-4 w-4 ${
                        updatesLoading
                          ? "animate-spin"
                          : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {updatesLoading &&
              updates.length === 0 ? (
                <div className="flex min-h-[240px] items-center justify-center">
                  <Loader2 className="h-7 w-7 animate-spin text-[#163C80]" />
                </div>
              ) : filteredUpdates.length ===
                0 ? (
                <div className="px-6 py-16 text-center">
                  <MessageSquare className="mx-auto mb-3 h-10 w-10 text-gray-300" />

                  <h3 className="font-semibold text-gray-800">
                    No live updates yet
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Publish the first update using the
                    newsroom composer.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredUpdates.map(
                    (update) => {
                      const deleting =
                        deletingId === update.id;

                      const actionLoading =
                        actionId === update.id;

                      return (
                        <article
                          key={update.id}
                          className={`relative p-5 transition hover:bg-gray-50 ${
                            update.isPinned
                              ? "border-l-4 border-l-[#EA661B] bg-orange-50/30"
                              : ""
                          }`}
                        >
                          <div className="flex gap-4">
                            <div className="hidden shrink-0 flex-col items-center sm:flex">
                              <div
                                className={`mt-1 h-3 w-3 rounded-full border-2 border-white shadow ${
                                  update.isBreaking
                                    ? "bg-red-600"
                                    : update.status ===
                                      "published"
                                    ? "bg-[#163C80]"
                                    : "bg-gray-400"
                                }`}
                              />

                              <div className="mt-2 w-px flex-1 bg-gray-200" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-wide text-[#163C80]">
                                  {formatTime(
                                    update.publishedAt ||
                                      update.createdAt
                                  )}
                                </span>

                                <StatusBadge
                                  status={
                                    update.status
                                  }
                                />

                                <StatusBadge
                                  status={
                                    update.verificationStatus
                                  }
                                />

                                {update.isBreaking && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white">
                                    <Zap className="h-3 w-3" />
                                    Breaking
                                  </span>
                                )}

                                {update.isPinned && (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-[10px] font-bold uppercase text-orange-700">
                                    <Pin className="h-3 w-3" />
                                    Pinned
                                  </span>
                                )}

                                {update.isAutomated && (
                                  <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2 py-1 text-[10px] font-bold uppercase text-purple-700">
                                    <Sparkles className="h-3 w-3" />
                                    Auto
                                  </span>
                                )}
                              </div>

                              {update.headline && (
                                <h3 className="mb-1 text-base font-bold text-gray-950">
                                  {update.headline}
                                </h3>
                              )}

                              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                                {update.content}
                              </p>

                              {(update.sourceName ||
                                update.sourceUrl) && (
                                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                  <Globe2 className="h-3.5 w-3.5" />

                                  {update.sourceName && (
                                    <span className="font-semibold text-gray-700">
                                      {
                                        update.sourceName
                                      }
                                    </span>
                                  )}

                                  {update.sourceUrl && (
                                    <a
                                      href={
                                        update.sourceUrl
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[#163C80] hover:underline"
                                    >
                                      Source
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  )}
                                </div>
                              )}

                              {update.imageUrl && (
                                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                                  <img
                                    src={
                                      update.imageUrl
                                    }
                                    alt={
                                      update.imageAlt ||
                                      update.headline ||
                                      "Live update"
                                    }
                                    className="max-h-[360px] w-full object-cover"
                                  />
                                </div>
                              )}

                              {update.verificationNotes && (
                                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                                  <span className="font-bold">
                                    Verification note:
                                  </span>{" "}
                                  {
                                    update.verificationNotes
                                  }
                                </div>
                              )}

                              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                <div className="text-xs text-gray-400">
                                  {update.author
                                    ?.name
                                    ? `By ${update.author.name}`
                                    : "Editorial desk"}{" "}
                                  ·{" "}
                                  {formatDate(
                                    update.createdAt
                                  )}
                                </div>

                                <div className="flex items-center gap-1">
                                  {update.status !==
                                    "published" &&
                                    update.status !==
                                      "archived" && (
                                      <button
                                        type="button"
                                        disabled={
                                          actionLoading ||
                                          deleting
                                        }
                                        onClick={() =>
                                          quickPublish(
                                            update.id
                                          )
                                        }
                                        className="rounded-lg p-2 text-green-700 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        title="Publish"
                                      >
                                        {actionLoading ? (
                                          <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                          <Send className="h-4 w-4" />
                                        )}
                                      </button>
                                    )}

                                  <button
                                    type="button"
                                    disabled={
                                      actionLoading ||
                                      deleting
                                    }
                                    onClick={() =>
                                      togglePin(
                                        update
                                      )
                                    }
                                    className={`rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                                      update.isPinned
                                        ? "bg-orange-50 text-orange-700"
                                        : "text-gray-500 hover:bg-gray-100"
                                    }`}
                                    title={
                                      update.isPinned
                                        ? "Unpin"
                                        : "Pin"
                                    }
                                  >
                                    <Pin className="h-4 w-4" />
                                  </button>

                                  <button
                                    type="button"
                                    disabled={
                                      actionLoading ||
                                      deleting ||
                                      Boolean(
                                        publishing
                                      )
                                    }
                                    onClick={() =>
                                      editUpdate(
                                        update
                                      )
                                    }
                                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                    title="Edit"
                                  >
                                    <Edit3 className="h-4 w-4" />
                                  </button>

                                  <button
                                    type="button"
                                    disabled={
                                      deleting ||
                                      Boolean(
                                        deletingId
                                      )
                                    }
                                    onClick={() =>
                                      archiveUpdate(
                                        update.id
                                      )
                                    }
                                    className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    title="Delete"
                                  >
                                    {deleting ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>
              )}
            </section>
          </main>

          {/* ===================================================
              RIGHT SIDEBAR
          =================================================== */}

          <aside className="space-y-5">
            {/* =================================================
                EVENT INFO
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">
                  Event Overview
                </h2>

                <MoreVertical className="h-4 w-4 text-gray-400" />
              </div>

              {event.coverImage ? (
                <div className="mb-4 overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={event.coverImage}
                    alt={
                      event.coverImageAlt ||
                      event.title
                    }
                    className="h-40 w-full object-cover"
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-32 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
                  <Radio className="h-8 w-8 text-gray-300" />
                </div>
              )}

              <p className="text-sm leading-6 text-gray-600">
                {event.description ||
                  "No event description has been added."}
              </p>

              <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">
                    Segment
                  </span>

                  <span className="font-semibold text-gray-800">
                    {segmentLabel(event.segment)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">
                    Started
                  </span>

                  <span className="text-right font-semibold text-gray-800">
                    {formatDate(event.startAt)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">
                    Last update
                  </span>

                  <span className="text-right font-semibold text-gray-800">
                    {formatDate(
                      event.lastUpdateAt
                    )}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-gray-500">
                    Last published
                  </span>

                  <span className="text-right font-semibold text-gray-800">
                    {formatDate(
                      event.lastPublishedAt
                    )}
                  </span>
                </div>
              </div>
            </section>

            {/* =================================================
                VISIBILITY
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-bold text-gray-900">
                Distribution
              </h2>

              <div className="space-y-4">
                <Toggle
                  checked={showLiveCenter}
                  onChange={(value) =>
                    updateDistribution(
                      "showInLiveCenter",
                      value
                    )
                  }
                  label="Show in Live Center"
                />

                <Toggle
                  checked={showHomepage}
                  onChange={(value) =>
                    updateDistribution(
                      "showOnHomepage",
                      value
                    )
                  }
                  label="Show on Homepage"
                />

                <Toggle
                  checked={isFeatured}
                  onChange={(value) =>
                    updateDistribution(
                      "isFeatured",
                      value
                    )
                  }
                  label="Featured Event"
                />

                <Toggle
                  checked={enableAutomation}
                  onChange={(value) =>
                    updateDistribution(
                      "enableAutomation",
                      value
                    )
                  }
                  label="Enable Automation"
                />
              </div>
            </section>

            {/* =================================================
                AUTOMATION
            ================================================= */}

            <section className="rounded-2xl border border-purple-200 bg-purple-50/50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-lg bg-purple-100 p-2 text-purple-700">
                  <Sparkles className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Live Automation
                  </h2>

                  <p className="text-xs text-gray-500">
                    Source-driven live updates
                  </p>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-purple-200 bg-white p-3 text-sm">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold text-gray-700">
                    Status
                  </span>

                  <span
                    className={`font-bold ${
                      enableAutomation
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {enableAutomation
                      ? "Enabled"
                      : "Disabled"}
                  </span>
                </div>

                <p className="text-xs leading-5 text-gray-500">
                  Automation rules, source schedules,
                  verification and auto-publish controls
                  are managed separately.
                </p>
              </div>

              <Link
                href={`/admin/live/automation?eventId=${event.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-purple-800"
              >
                <Sparkles className="h-4 w-4" />
                Manage Automation
              </Link>
            </section>

            {/* =================================================
                SOURCES
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Sources
                  </h2>

                  <p className="text-xs text-gray-500">
                    Connected live sources
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">
                  {event._count?.sources ?? 0}
                </span>
              </div>

              <Link
                href={`/admin/live/sources?eventId=${event.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Globe2 className="h-4 w-4" />
                Manage Sources
              </Link>
            </section>

            {/* =================================================
                LINKED ARTICLES
            ================================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Related Articles
                  </h2>

                  <p className="text-xs text-gray-500">
                    NationPath coverage
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">
                  {event._count?.articleLinks ?? 0}
                </span>
              </div>

              <Link
                href={`/admin/live/${event.id}/articles`}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <MessageSquare className="h-4 w-4" />
                Manage Articles
              </Link>
            </section>

            {/* =================================================
                PUBLIC URL
            ================================================= */}

            <section className="rounded-2xl border border-[#163C80]/20 bg-[#163C80]/5 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-[#163C80]" />

                <h2 className="font-bold text-gray-900">
                  Public Live URL
                </h2>
              </div>

              <code className="block break-all rounded-lg bg-white p-3 text-xs text-gray-600">
                /live/{event.slug}
              </code>

              <Link
                href={`/live/${event.slug}`}
                target="_blank"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#163C80] hover:underline"
              >
                Open public page
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}