"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

/* ============================================================
   TYPES
============================================================ */

interface IngestedFeed {
  id: string;
  title: string;
  source: { name: string; category: string } | null;
  priorityScore: number;
  keywords: string[];
  status: string;
  publishedAt: string;
}

interface QualityAssessment {
  score: number;
  breakdown?: {
    sourceEvidence?: number;
    factualCompleteness?: number;
    clarity?: number;
    structure?: number;
    context?: number;
    seo?: number;
    readerValue?: number;
    riskLevel?: number;
  };
  flags?: string[];
  missingInformation?: string[];
  reasoning?: string;
}

interface EnhancementChange {
  module: string;
  changed: boolean;
  summary: string;
  reason?: string;
}

interface PreviewData {
  articleId: string;
  title: string;
  modules: string[];
  before: Record<string, any>;
  after: Record<string, any>;
  changes: EnhancementChange[];
  qualityAssessment?: QualityAssessment;
  aiEnhanced?: boolean;
  applied?: boolean;
  snapshotCreated?: boolean;
  previewId?: string;
}

type StatusFilter = "all" | "pending" | "processed";

type CategoryFilter =
  | "all"
  | "Government"
  | "India"
  | "World"
  | "Business"
  | "Technology"
  | "Automobiles"
  | "Legal"
  | "Science"
  | "Health"
  | "Sports"
  | "Entertainment";

type ModalStep = "selection" | "preview" | null;

type ApplyAction =
  | "apply_all"
  | "apply_selected"
  | "discard"
  | "restore_original";

/* ============================================================
   CONSTANTS
============================================================ */

const AI_MODULES = [
  {
    id: "mainStory",
    title: "Main Story",
    desc: "Deep analysis",
    default: true,
  },
  {
    id: "brief",
    title: "Brief",
    desc: "Sharp 60-word summary",
    default: true,
  },
  {
    id: "keyHighlights",
    title: "Key Highlights",
    desc: "Structured data",
    default: true,
  },
  {
    id: "keyTakeaways",
    title: "Key Takeaways",
    desc: "5 data-driven points",
    default: true,
  },
  {
    id: "whyItMatters",
    title: "Why It Matters",
    desc: "Broader impact",
    default: true,
  },
  {
    id: "background",
    title: "Background",
    desc: "Historical context",
    default: true,
  },
  {
    id: "expertOpinion",
    title: "Expert Opinion",
    desc: "Analyst perspectives",
    default: true,
  },
  {
    id: "whatsNext",
    title: "What's Next",
    desc: "Upcoming developments",
    default: true,
  },
  {
    id: "timeline",
    title: "Timeline",
    desc: "Chronological events",
    default: false,
  },
  {
    id: "factChecks",
    title: "Fact-Check",
    desc: "Verify claims",
    default: false,
  },
  {
    id: "faqs",
    title: "FAQs",
    desc: "Practical questions",
    default: true,
  },
  {
    id: "suggestedCategory",
    title: "Auto Category",
    desc: "AI categorization",
    default: true,
  },
  {
    id: "seo",
    title: "SEO Metadata",
    desc: "Title, Desc, Keywords",
    default: true,
  },
];

/* ============================================================
   HELPERS
============================================================ */

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (diffInSeconds < 60) return "Just now";

  if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  }

  if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getPriorityInfo(score: number) {
  if (score >= 100) {
    return {
      label: "Can Publish",
      color:
        "text-red-400 bg-red-900/30 border-red-800",
      icon: "🔥",
    };
  }

  if (score >= 70) {
    return {
      label: "Recommended",
      color:
        "text-green-400 bg-green-900/30 border-green-800",
      icon: "⭐",
    };
  }

  if (score >= 40) {
    return {
      label: "Moderate",
      color:
        "text-yellow-400 bg-yellow-900/30 border-yellow-800",
      icon: "⚠️",
    };
  }

  return {
    label: "Avoid",
    color:
      "text-gray-400 bg-gray-800/50 border-gray-700",
    icon: "🚫",
  };
}

function prettyModuleName(moduleId: string) {
  const found = AI_MODULES.find(
    (module) => module.id === moduleId
  );

  return (
    found?.title ||
    moduleId
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase())
  );
}

function safeArray(value: any): any[] {
  return Array.isArray(value) ? value : [];
}

function safeText(value: any): string {
  if (typeof value === "string") return value;

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return "";
}

function formatValue(value: any): string {
  if (value === null || value === undefined) return "";

  if (typeof value === "string") return value;

  if (
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function getQualityTone(score: number) {
  if (score >= 80) {
    return {
      label: "Strong",
      icon: "🟢",
      className:
        "text-green-400 bg-green-900/20 border-green-800/60",
      bar: "bg-green-500",
    };
  }

  if (score >= 60) {
    return {
      label: "Needs Review",
      icon: "🟡",
      className:
        "text-yellow-400 bg-yellow-900/20 border-yellow-800/60",
      bar: "bg-yellow-500",
    };
  }

  return {
    label: "High Review Required",
    icon: "🔴",
    className:
      "text-red-400 bg-red-900/20 border-red-800/60",
    bar: "bg-red-500",
  };
}

/* ============================================================
   COMPONENT
============================================================ */

export default function AINewsroomPage() {
  const router = useRouter();

  /* ----------------------------------------------------------
     FEEDS
  ---------------------------------------------------------- */

  const [feeds, setFeeds] = useState<IngestedFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningIngest, setRunningIngest] = useState(false);
  const [runningCleanup, setRunningCleanup] = useState(false);
  const [fetchingTopic, setFetchingTopic] = useState(false);

  const [activeStatus, setActiveStatus] =
    useState<StatusFilter>("all");

  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("all");

  const [activeTopic, setActiveTopic] =
    useState<string | null>(null);

  const [trendingTopics, setTrendingTopics] =
    useState<string[]>([]);

  const [trendsLoading, setTrendsLoading] =
    useState(true);

  const [feedCount, setFeedCount] =
    useState(0);

  /* ----------------------------------------------------------
     AI MODAL
  ---------------------------------------------------------- */

  const [modalStep, setModalStep] =
    useState<ModalStep>(null);

  const [isEditorial, setIsEditorial] =
    useState(false);

  const [selectedModules, setSelectedModules] =
    useState<Record<string, boolean>>(
      AI_MODULES.reduce(
        (acc, mod) => ({
          ...acc,
          [mod.id]: mod.default,
        }),
        {}
      )
    );

  const [previewData, setPreviewData] =
    useState<PreviewData | null>(null);

  const [processingFeedId, setProcessingFeedId] =
    useState<string | null>(null);

  const [isSaving, setIsSaving] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("mainStory");

  const [selectedPreviewModules, setSelectedPreviewModules] =
    useState<Record<string, boolean>>({});

  const [applyAction, setApplyAction] =
    useState<ApplyAction | null>(null);

  /* ============================================================
     FETCH TRENDING
  ============================================================ */

  useEffect(() => {
    async function fetchTrending() {
      try {
        setTrendsLoading(true);

        const res = await fetch(
          "/api/admin/ingestion/trending"
        );

        const data = await res.json();

        if (
          data.success &&
          Array.isArray(data.topics)
        ) {
          setTrendingTopics(data.topics);
        }
      } catch (error) {
        console.error(
          "Failed to fetch trends",
          error
        );
      } finally {
        setTrendsLoading(false);
      }
    }

    fetchTrending();

    const trendsInterval = setInterval(
      fetchTrending,
      600000
    );

    return () =>
      clearInterval(trendsInterval);
  }, []);

  /* ============================================================
     FETCH FEEDS
  ============================================================ */

  useEffect(() => {
    fetchFeeds();

    const intervalId = setInterval(
      fetchFeeds,
      60000
    );

    return () =>
      clearInterval(intervalId);
  }, [
    activeStatus,
    activeCategory,
    activeTopic,
  ]);

  /* ============================================================
     AUTO CLEANUP
  ============================================================ */

  useEffect(() => {
    const cleanupInterval =
      setInterval(async () => {
        try {
          await fetch(
            "/api/admin/ingestion/cleanup",
            {
              method: "POST",
            }
          );
        } catch (error) {
          console.error(
            "Silent auto-cleanup failed:",
            error
          );
        }
      }, 15 * 60 * 1000);

    return () =>
      clearInterval(cleanupInterval);
  }, []);

  /* ============================================================
     FETCH FEEDS FUNCTION
  ============================================================ */

  async function fetchFeeds() {
    setLoading(true);

    try {
      const params =
        new URLSearchParams();

      if (activeStatus !== "all") {
        params.set(
          "status",
          activeStatus
        );
      }

      if (activeCategory !== "all") {
        params.set(
          "category",
          activeCategory
        );
      }

      if (activeTopic) {
        params.set(
          "topic",
          activeTopic
        );
      }

      const res = await fetch(
        `/api/admin/ingestion/feeds?${params.toString()}`
      );

      const data = await res.json();

      setFeeds(
        Array.isArray(data.feeds)
          ? data.feeds
          : []
      );

      setFeedCount(
        Number(data.count || 0)
      );
    } catch (error) {
      console.error(
        "Failed to fetch feeds:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /* ============================================================
     CLEANUP
  ============================================================ */

  async function handleManualCleanup() {
    if (
      !confirm(
        "🧹 Purane processed feeds delete karein?"
      )
    ) {
      return;
    }

    setRunningCleanup(true);

    try {
      const res = await fetch(
        "/api/admin/ingestion/cleanup",
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(
          `✅ Cleanup successful! Removed ${
            data.deleted || 0
          } feeds.`
        );

        fetchFeeds();
      } else {
        alert(
          `❌ Cleanup failed: ${
            data.error || "Unknown error"
          }`
        );
      }
    } catch (error: any) {
      alert(
        `Cleanup error: ${
          error?.message || "Unknown error"
        }`
      );
    } finally {
      setRunningCleanup(false);
    }
  }

  /* ============================================================
     TOPIC
  ============================================================ */

  async function handleTopicClick(
    topic: string
  ) {
    const newActiveTopic =
      topic === activeTopic
        ? null
        : topic;

    setActiveTopic(
      newActiveTopic
    );

    if (newActiveTopic) {
      setFetchingTopic(true);

      try {
        const res = await fetch(
          "/api/admin/ingestion/topic",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              topic: newActiveTopic,
            }),
          }
        );

        if (res.ok) {
          await fetchFeeds();
        }
      } catch (error) {
        console.error(
          "Auto-fetch failed:",
          error
        );
      } finally {
        setFetchingTopic(false);
      }
    } else {
      fetchFeeds();
    }
  }

  /* ============================================================
     MANUAL INGESTION
  ============================================================ */

  async function handleRunIngestion() {
    setRunningIngest(true);

    try {
      const res = await fetch(
        "/api/admin/ingestion/run",
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert(
          `✅ Success! ${
            data.added || 0
          } new items fetched.`
        );

        fetchFeeds();
      } else {
        alert(
          `❌ Error: ${
            data.error || "Ingestion failed"
          }`
        );
      }
    } catch {
      alert(
        "Failed to run ingestion."
      );
    } finally {
      setRunningIngest(false);
    }
  }

  /* ============================================================
     GENERATION
  ============================================================ */

  function handleGenerateClick(
    feedId: string
  ) {
    setProcessingFeedId(feedId);
    setIsEditorial(false);
    setPreviewData(null);
    setModalStep("selection");
    setApplyAction(null);

    setSelectedModules(
      AI_MODULES.reduce(
        (acc, mod) => ({
          ...acc,
          [mod.id]: mod.default,
        }),
        {}
      )
    );
  }

  function toggleModule(
    moduleId: string
  ) {
    setSelectedModules(
      (prev) => ({
        ...prev,
        [moduleId]:
          !prev[moduleId],
      })
    );
  }

  function togglePreviewModule(
    moduleId: string
  ) {
    setSelectedPreviewModules(
      (prev) => ({
        ...prev,
        [moduleId]:
          !prev[moduleId],
      })
    );
  }

  /* ============================================================
     GENERATE PREVIEW
  ============================================================ */

  async function handleGeneratePreview() {
    if (!processingFeedId) {
      return;
    }

    const modulesToGenerate =
      Object.entries(
        selectedModules
      )
        .filter(
          ([, selected]) =>
            selected
        )
        .map(
          ([moduleId]) =>
            moduleId
        );

    if (
      modulesToGenerate.length === 0
    ) {
      alert(
        "Please select at least one module."
      );
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(
        "/api/admin/ingestion/generate",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            feedId:
              processingFeedId,
            action: "preview",
            modulesToGenerate,
            isEditorial,
          }),
        }
      );

      const result =
        await res.json();

      if (!res.ok) {
        throw new Error(
          result.error ||
            "Generation failed"
        );
      }

      const generated =
        result.data;

      setPreviewData(
        generated
      );

      const moduleSelection =
        modulesToGenerate.reduce(
          (
            acc: Record<
              string,
              boolean
            >,
            moduleId: string
          ) => {
            acc[moduleId] = true;
            return acc;
          },
          {}
        );

      setSelectedPreviewModules(
        moduleSelection
      );

      setModalStep("preview");
      setActiveSection(
        modulesToGenerate.includes(
          "mainStory"
        )
          ? "mainStory"
          : modulesToGenerate[0]
      );
    } catch (error: any) {
      alert(
        `Error: ${
          error?.message ||
          "Failed to generate preview"
        }`
      );
    } finally {
      setIsSaving(false);
    }
  }

  /* ============================================================
     6D APPLY API
  ============================================================ */

  async function handleApply(
    action: ApplyAction
  ) {
    if (
      !previewData?.articleId
    ) {
      return;
    }

    let modules: string[] =
      previewData.modules ||
      [];

    if (
      action ===
      "apply_selected"
    ) {
      modules =
        Object.entries(
          selectedPreviewModules
        )
          .filter(
            ([, selected]) =>
              selected
          )
          .map(
            ([moduleId]) =>
              moduleId
          );

      if (
        modules.length === 0
      ) {
        alert(
          "Please select at least one enhancement module."
        );
        return;
      }
    }

    if (
      action ===
      "restore_original"
    ) {
      if (
        !confirm(
          "⚠️ Original snapshot restore karna hai? Current AI enhancement changes revert ho jayenge."
        )
      ) {
        return;
      }
    }

    if (
      action === "discard"
    ) {
      if (
        !confirm(
          "Discard enhancement preview? Article content apply nahi hoga."
        )
      ) {
        return;
      }
    }

    if (
      action ===
      "apply_all"
    ) {
      if (
        !confirm(
          "Apply ALL AI enhancement modules to this draft?"
        )
      ) {
        return;
      }
    }

    setApplyAction(action);
    setIsSaving(true);

    try {
      const res = await fetch(
        "/api/admin/ingestion/enhance/apply",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            articleId:
              previewData.articleId,

            previewId:
              previewData.previewId,

            action,

            modules,

            enhancedContent:
              previewData.after,
          }),
        }
      );

      const result =
        await res.json();

      if (!res.ok || !result.success) {
        throw new Error(
          result.error ||
            "Enhancement action failed"
        );
      }

      /* --------------------------------------------------------
         RESTORE / DISCARD
      -------------------------------------------------------- */

      if (
        action === "discard"
      ) {
        alert(
          "🗑️ Enhancement discarded."
        );

        closeModal();
        await fetchFeeds();
        return;
      }

      if (
        action ===
        "restore_original"
      ) {
        alert(
          "↩️ Original article restored successfully."
        );

        closeModal();
        await fetchFeeds();

        if (
          result.articleId
        ) {
          router.push(
            `/admin/posts/edit/${result.articleId}`
          );
        }

        return;
      }

      /* --------------------------------------------------------
         APPLY SUCCESS
      -------------------------------------------------------- */

      alert(
        action ===
          "apply_selected"
          ? "✅ Selected AI enhancements applied successfully."
          : "✅ All AI enhancements applied successfully."
      );

      const articleId =
        result.articleId ||
        previewData.articleId;

      closeModal();
      await fetchFeeds();

      router.push(
        `/admin/posts/edit/${articleId}`
      );
    } catch (error: any) {
      alert(
        `❌ ${
          error?.message ||
          "Enhancement action failed"
        }`
      );
    } finally {
      setApplyAction(null);
      setIsSaving(false);
    }
  }

  /* ============================================================
     CLOSE MODAL
  ============================================================ */

  function closeModal() {
    if (isSaving) {
      return;
    }

    setModalStep(null);
    setPreviewData(null);
    setProcessingFeedId(null);
    setApplyAction(null);
  }

  /* ============================================================
     SCROLL
  ============================================================ */

  function scrollToSection(
    id: string
  ) {
    setActiveSection(id);

    const element =
      document.getElementById(
        `preview-${id}`
      );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  /* ============================================================
     SELECTED COUNTS
  ============================================================ */

  const selectedGenerationCount =
    useMemo(
      () =>
        Object.values(
          selectedModules
        ).filter(Boolean)
          .length,
      [selectedModules]
    );

  const selectedPreviewCount =
    useMemo(
      () =>
        Object.values(
          selectedPreviewModules
        ).filter(Boolean)
          .length,
      [selectedPreviewModules]
    );

  /* ============================================================
     CATEGORIES
  ============================================================ */

  const categories: {
    value: CategoryFilter;
    label: string;
    color: string;
    icon: string;
  }[] = [
    {
      value: "all",
      label: "All",
      color: "bg-gray-700",
      icon: "📰",
    },
    {
      value: "Government",
      label: "Govt",
      color: "bg-red-700",
      icon: "🏛️",
    },
    {
      value: "India",
      label: "India",
      color: "bg-blue-700",
      icon: "🇮🇳",
    },
    {
      value: "World",
      label: "World",
      color: "bg-purple-700",
      icon: "🌍",
    },
    {
      value: "Business",
      label: "Business",
      color: "bg-green-700",
      icon: "💼",
    },
    {
      value: "Technology",
      label: "Tech",
      color: "bg-cyan-700",
      icon: "🚀",
    },
    {
      value: "Automobiles",
      label: "Autos",
      color: "bg-yellow-700",
      icon: "🚗",
    },
    {
      value: "Legal",
      label: "Legal",
      color: "bg-indigo-700",
      icon: "⚖️",
    },
    {
      value: "Science",
      label: "Science",
      color: "bg-orange-700",
      icon: "🔬",
    },
    {
      value: "Health",
      label: "Health",
      color: "bg-pink-700",
      icon: "🏥",
    },
    {
      value: "Sports",
      label: "Sports",
      color: "bg-emerald-700",
      icon: "🏏",
    },
    {
      value: "Entertainment",
      label: "Entertainment",
      color: "bg-rose-700",
      icon: "🎬",
    },
  ];

  /* ============================================================
     LOADING
  ============================================================ */

  if (
    loading &&
    feeds.length === 0
  ) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <div className="text-orange-400 animate-pulse text-lg font-semibold">
          Loading AI Newsroom...
        </div>
      </div>
    );
  }

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#050816] text-white p-4 md:p-6">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-orange-500">
              ⚡
            </span>
            AI Newsroom
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Auto-fetch, enrich, review and
            generate premium news drafts.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={fetchFeeds}
            className="px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-xs font-semibold transition"
          >
            🔄 Refresh
          </button>

          <button
            onClick={
              handleManualCleanup
            }
            disabled={
              runningCleanup
            }
            className="px-3 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-800 text-red-400 rounded-lg text-xs font-semibold transition flex items-center gap-2 disabled:opacity-50"
          >
            {runningCleanup
              ? "🧹 Cleaning..."
              : "🗑️ Clean Old"}
          </button>

          <button
            onClick={
              handleRunIngestion
            }
            disabled={
              runningIngest
            }
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-xs font-bold text-white transition flex items-center gap-2"
          >
            {runningIngest
              ? "Fetching..."
              : "📥 Run Ingestion"}
          </button>
        </div>
      </div>

      {/* ======================================================
          TRENDING
      ====================================================== */}

      <div className="mb-5 bg-gray-900/50 rounded-lg border border-gray-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 animate-pulse">
              🔥
            </span>

            <h2 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              Trending in India
            </h2>
          </div>

          {activeTopic && (
            <button
              onClick={() =>
                handleTopicClick(
                  activeTopic
                )
              }
              className="text-xs bg-orange-600/20 text-orange-400 px-3 py-1 rounded border border-orange-600/30 hover:bg-orange-600/30 transition"
            >
              ✕ Clear:{" "}
              <span className="text-white">
                {activeTopic}
              </span>
            </button>
          )}
        </div>

        {trendingTopics.length >
        0 ? (
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map(
              (
                topic,
                index
              ) => (
                <button
                  key={index}
                  onClick={() =>
                    handleTopicClick(
                      topic
                    )
                  }
                  disabled={
                    fetchingTopic
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${
                    activeTopic ===
                    topic
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-gray-800 text-gray-400 border-gray-700 hover:text-white hover:border-gray-600"
                  }`}
                >
                  {topic}
                </button>
              )
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500 text-xs">
            {trendsLoading
              ? "Loading..."
              : "No trending topics"}
          </div>
        )}
      </div>

      {/* ======================================================
          FILTERS
      ====================================================== */}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 bg-gray-900/30 rounded-lg px-4 py-2.5 border border-gray-800">
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <span className="text-gray-500">
            Showing:
          </span>

          <span className="text-white font-semibold">
            {feedCount} feeds
          </span>

          {activeTopic && (
            <span className="text-orange-400 bg-orange-900/20 px-2 py-0.5 rounded border border-orange-800/50">
              Topic:{" "}
              {activeTopic}
            </span>
          )}
        </div>

        <div className="flex gap-1 bg-gray-800/50 p-1 rounded-lg">
          {(
            [
              "all",
              "pending",
              "processed",
            ] as StatusFilter[]
          ).map(
            (status) => (
              <button
                key={status}
                onClick={() =>
                  setActiveStatus(
                    status
                  )
                }
                className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition ${
                  activeStatus ===
                  status
                    ? "bg-orange-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {status ===
                "all"
                  ? "All"
                  : status ===
                    "pending"
                  ? "Pending"
                  : "Processed"}
              </button>
            )
          )}
        </div>
      </div>

      {/* ======================================================
          CATEGORY TABS
      ====================================================== */}

      <div className="mb-5 flex flex-wrap gap-1.5">
        {categories.map(
          (cat) => (
            <button
              key={cat.value}
              onClick={() =>
                setActiveCategory(
                  cat.value
                )
              }
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                activeCategory ===
                cat.value
                  ? `${cat.color} text-white border-transparent shadow-md`
                  : "bg-gray-800/30 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {cat.icon}{" "}
              {cat.label}
            </button>
          )
        )}
      </div>

      {/* ======================================================
          NEWS TABLE
      ====================================================== */}

      {feeds.length ===
      0 ? (
        <div className="text-center py-16 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
          <div className="text-4xl mb-3">
            📭
          </div>

          <p className="text-gray-400 text-sm font-medium">
            No feeds found for
            this filter.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/20 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-800/60 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-semibold">
                  Status
                </th>

                <th className="px-4 py-3 font-semibold">
                  Priority
                </th>

                <th className="px-4 py-3 font-semibold">
                  Published
                </th>

                <th className="px-4 py-3 font-semibold">
                  Source
                </th>

                <th className="px-4 py-3 font-semibold">
                  Title &
                  Keywords
                </th>

                <th className="px-4 py-3 font-semibold text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800">
              {feeds.map(
                (feed) => {
                  const priorityInfo =
                    getPriorityInfo(
                      feed.priorityScore
                    );

                  return (
                    <tr
                      key={
                        feed.id
                      }
                      className="hover:bg-gray-800/30 transition group"
                    >
                      <td className="px-4 py-3">
                        {feed.status ===
                        "processed" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-900/30 text-green-400 border border-green-800/50">
                            ✅ Done
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-900/30 text-yellow-400 border border-yellow-800/50">
                            ⏳ Pending
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border w-fit ${priorityInfo.color}`}
                        >
                          {
                            priorityInfo.icon
                          }{" "}
                          {
                            feed.priorityScore
                          }
                        </span>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-white font-medium">
                          {formatTimeAgo(
                            feed.publishedAt
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-gray-300 font-medium">
                          {feed
                            .source
                            ?.name ||
                            "Unknown"}
                        </div>

                        <div className="text-gray-500 text-[10px]">
                          {feed
                            .source
                            ?.category ||
                            "General"}
                        </div>
                      </td>

                      <td className="px-4 py-3 max-w-md">
                        <div
                          className={`font-medium mb-1.5 line-clamp-2 transition ${
                            feed.status ===
                            "processed"
                              ? "text-gray-500"
                              : "text-white group-hover:text-orange-400"
                          }`}
                        >
                          {
                            feed.title
                          }
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {feed.keywords
                            .slice(
                              0,
                              3
                            )
                            .map(
                              (
                                kw,
                                i
                              ) => (
                                <span
                                  key={
                                    i
                                  }
                                  className="text-[10px] bg-blue-900/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-800/30"
                                >
                                  #
                                  {
                                    kw
                                  }
                                </span>
                              )
                            )}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-right">
                        {feed.status ===
                        "processed" ? (
                          <button
                            onClick={() =>
                              router.push(
                                `/admin/posts/edit/${feed.id}`
                              )
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md text-[11px] font-bold text-white transition"
                          >
                            👁️ View
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleGenerateClick(
                                feed.id
                              )
                            }
                            disabled={
                              processingFeedId ===
                              feed.id
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 rounded-md text-[11px] font-bold text-white transition"
                          >
                            {processingFeedId ===
                            feed.id
                              ? "Processing..."
                              : "✨ Generate"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ======================================================
          AI MODAL
      ====================================================== */}

      {modalStep &&
        processingFeedId && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() =>
              !isSaving &&
              closeModal()
            }
          >
            <div
              className="bg-[#0a0f1e] border border-orange-500/20 rounded-xl max-w-6xl w-full h-[88vh] flex flex-col overflow-hidden shadow-2xl ring-1 ring-white/10"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              {/* ==================================================
                  MODAL HEADER
              ================================================== */}

              <div className="px-5 py-3 border-b border-orange-500/10 flex items-center justify-between bg-[#0a0f1e]">
                <div>
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    {modalStep ===
                    "selection"
                      ? "⚙️ Configure Generation"
                      : "✨ AI Enhancement Preview"}
                  </h2>

                  <p className="text-xs text-gray-400 mt-0.5">
                    {modalStep ===
                    "selection"
                      ? "Select article type and AI modules."
                      : "Review, compare and selectively apply AI enhancements."}
                  </p>
                </div>

                <button
                  onClick={
                    closeModal
                  }
                  disabled={
                    isSaving
                  }
                  className="p-1.5 hover:bg-white/10 rounded-md transition text-gray-400 hover:text-white"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* ==================================================
                  SELECTION
              ================================================== */}

              {modalStep ===
              "selection" ? (
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="mb-6">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">
                      Article Type
                    </label>

                    <div className="flex bg-gray-800/50 p-1 rounded-lg border border-gray-700/50 w-fit">
                      <button
                        onClick={() =>
                          setIsEditorial(
                            false
                          )
                        }
                        className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                          !isEditorial
                            ? "bg-orange-600 text-white shadow-sm"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        📰 Standard
                        Report
                      </button>

                      <button
                        onClick={() =>
                          setIsEditorial(
                            true
                          )
                        }
                        className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                          isEditorial
                            ? "bg-orange-600 text-white shadow-sm"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        ✍️ Editorial /
                        Op-Ed
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Modules to Generate
                    </label>

                    <span className="text-[10px] text-orange-400">
                      {
                        selectedGenerationCount
                      }{" "}
                      selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {AI_MODULES.map(
                      (mod) => (
                        <button
                          type="button"
                          key={
                            mod.id
                          }
                          onClick={() =>
                            toggleModule(
                              mod.id
                            )
                          }
                          className={`text-left p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedModules[
                              mod.id
                            ]
                              ? "border-orange-500/50 bg-orange-500/10"
                              : "border-gray-700/50 bg-gray-800/30 hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                selectedModules[
                                  mod.id
                                ]
                                  ? "border-orange-500 bg-orange-500"
                                  : "border-gray-600"
                              }`}
                            >
                              {selectedModules[
                                mod.id
                              ] && (
                                <svg
                                  className="h-2.5 w-2.5 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={
                                      3
                                    }
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>

                            <div>
                              <h4 className="font-semibold text-xs text-white">
                                {
                                  mod.title
                                }
                              </h4>

                              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">
                                {
                                  mod.desc
                                }
                              </p>
                            </div>
                          </div>
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : (
                /* ==================================================
                   PREVIEW
                ================================================== */

                <div className="flex-1 flex overflow-hidden">
                  {/* SIDEBAR */}

                  <div className="w-52 border-r border-gray-800 bg-[#0d1220] flex flex-col overflow-y-auto hidden md:flex">
                    <div className="p-3 border-b border-gray-800">
                      <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        Preview Sections
                      </h3>
                    </div>

                    <nav className="flex-1 p-2 space-y-0.5">
                      {[
                        [
                          "mainStory",
                          "📝 Main Story",
                        ],
                        [
                          "brief",
                          "⚡ Brief",
                        ],
                        [
                          "keyHighlights",
                          "⭐ Highlights",
                        ],
                        [
                          "keyTakeaways",
                          "💡 Takeaways",
                        ],
                        [
                          "whyItMatters",
                          "🌍 Why It Matters",
                        ],
                        [
                          "background",
                          "📜 Background",
                        ],
                        [
                          "expertOpinion",
                          "🎙️ Experts",
                        ],
                        [
                          "whatsNext",
                          "🔮 What's Next",
                        ],
                        [
                          "timeline",
                          "📅 Timeline",
                        ],
                        [
                          "factChecks",
                          "🔍 Fact Checks",
                        ],
                        [
                          "faqs",
                          "❓ FAQs",
                        ],
                        [
                          "seo",
                          "🔎 SEO",
                        ],
                      ].map(
                        ([
                          id,
                          label,
                        ]) => {
                          const hasContent =
                            previewData?.after?.[
                              id
                            ] !==
                              undefined &&
                            previewData
                              ?.after?.[
                              id
                            ] !== null;

                          if (
                            !hasContent
                          ) {
                            return null;
                          }

                          return (
                            <button
                              key={
                                id
                              }
                              onClick={() =>
                                scrollToSection(
                                  id
                                )
                              }
                              className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${
                                activeSection ===
                                id
                                  ? "bg-orange-500/20 text-orange-400 font-medium"
                                  : "text-gray-400 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {
                                label
                              }
                            </button>
                          );
                        }
                      )}
                    </nav>

                    {/* MODULE SELECTION */}

                    <div className="border-t border-gray-800 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          Apply Modules
                        </h3>

                        <span className="text-[9px] text-orange-400">
                          {
                            selectedPreviewCount
                          }
                          /
                          {
                            previewData
                              ?.modules
                              ?.length
                          }
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {(
                          previewData?.modules ||
                          []
                        ).map(
                          (
                            moduleId
                          ) => (
                            <label
                              key={
                                moduleId
                              }
                              className="flex items-center gap-2 cursor-pointer text-[10px] text-gray-300 hover:text-white"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  selectedPreviewModules[
                                    moduleId
                                  ] !==
                                  false
                                }
                                onChange={() =>
                                  togglePreviewModule(
                                    moduleId
                                  )
                                }
                                className="accent-orange-500"
                              />

                              <span>
                                {prettyModuleName(
                                  moduleId
                                )}
                              </span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* MAIN PREVIEW */}

                  <div className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth bg-[#0a0f1e]">
                    {/* ==================================================
                       QUALITY SCORE
                    ================================================== */}

                    {previewData?.qualityAssessment && (
                      <div
                        className={`rounded-xl border p-4 ${
                          getQualityTone(
                            previewData
                              .qualityAssessment
                              .score
                          ).className
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">
                            {
                              getQualityTone(
                                previewData
                                  .qualityAssessment
                                  .score
                              ).icon
                            }
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                              <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider">
                                  AI Data Quality
                                  Score
                                </h3>

                                <div className="flex items-baseline gap-2 mt-1">
                                  <span className="text-3xl font-black">
                                    {
                                      previewData
                                        .qualityAssessment
                                        .score
                                    }
                                  </span>

                                  <span className="text-sm opacity-70">
                                    / 100
                                  </span>
                                </div>
                              </div>

                              <span className="text-[10px] font-bold px-2 py-1 rounded bg-black/20 border border-white/10">
                                {
                                  getQualityTone(
                                    previewData
                                      .qualityAssessment
                                      .score
                                  ).label
                                }
                              </span>
                            </div>

                            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  getQualityTone(
                                    previewData
                                      .qualityAssessment
                                      .score
                                  ).bar
                                }`}
                                style={{
                                  width: `${Math.max(
                                    0,
                                    Math.min(
                                      100,
                                      previewData
                                        .qualityAssessment
                                        .score
                                    )
                                  )}%`,
                                }}
                              />
                            </div>

                            {previewData
                              .qualityAssessment
                              .reasoning && (
                              <p className="text-[10px] text-gray-300 mt-3 leading-relaxed">
                                {
                                  previewData
                                    .qualityAssessment
                                    .reasoning
                                }
                              </p>
                            )}

                            {previewData
                              .qualityAssessment
                              .flags
                              ?.length ? (
                              <div className="mt-3">
                                <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">
                                  Quality Flags
                                </div>

                                <div className="flex flex-wrap gap-1.5">
                                  {previewData.qualityAssessment.flags.map(
                                    (
                                      flag,
                                      index
                                    ) => (
                                      <span
                                        key={
                                          index
                                        }
                                        className="px-2 py-1 rounded bg-black/20 border border-white/10 text-[9px]"
                                      >
                                        ⚠️{" "}
                                        {
                                          flag
                                        }
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            ) : null}

                            {previewData
                              .qualityAssessment
                              .missingInformation
                              ?.length ? (
                              <div className="mt-3">
                                <div className="text-[10px] font-bold uppercase text-gray-500 mb-1">
                                  Missing Information
                                </div>

                                <div className="space-y-1">
                                  {previewData.qualityAssessment.missingInformation.map(
                                    (
                                      item,
                                      index
                                    ) => (
                                      <div
                                        key={
                                          index
                                        }
                                        className="text-[10px] text-gray-400"
                                      >
                                        •{" "}
                                        {
                                          item
                                        }
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ==================================================
                       WHAT CHANGED
                    ================================================== */}

                    <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 overflow-hidden">
                      <div className="px-4 py-3 border-b border-orange-500/10 flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-orange-400">
                            🔄 What Changed
                          </h3>

                          <p className="text-[10px] text-gray-500 mt-0.5">
                            AI enhancement comparison
                          </p>
                        </div>

                        <span className="text-[10px] text-gray-400">
                          {
                            previewData
                              ?.changes
                              ?.filter(
                                (
                                  change
                                ) =>
                                  change.changed
                              )
                              .length
                          }{" "}
                          changed
                        </span>
                      </div>

                      <div className="p-3 space-y-2">
                        {previewData?.changes
                          ?.length ? (
                          previewData.changes.map(
                            (
                              change,
                              index
                            ) => (
                              <div
                                key={
                                  `${change.module}-${index}`
                                }
                                className="flex items-start gap-3 bg-black/20 rounded-lg p-3"
                              >
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                                    change.changed
                                      ? "bg-green-500/20 text-green-400"
                                      : "bg-gray-700 text-gray-500"
                                  }`}
                                >
                                  {change.changed
                                    ? "✓"
                                    : "—"}
                                </div>

                                <div className="min-w-0">
                                  <div className="text-[11px] font-semibold text-white">
                                    {prettyModuleName(
                                      change.module
                                    )}
                                  </div>

                                  <div className="text-[10px] text-gray-400 mt-0.5">
                                    {
                                      change.summary
                                    }
                                  </div>

                                  {change.reason && (
                                    <div className="text-[9px] text-gray-500 mt-1">
                                      {
                                        change.reason
                                      }
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="text-xs text-gray-500">
                            No change information
                            returned.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ==================================================
                       BEFORE / AFTER
                    ================================================== */}

                    <div className="rounded-xl border border-gray-800 overflow-hidden">
                      <div className="px-4 py-3 bg-gray-900/60 border-b border-gray-800">
                        <h3 className="text-sm font-bold text-white">
                          🌓 Before / After
                        </h3>

                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Current article vs AI
                          enhancement preview
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="border-b lg:border-b-0 lg:border-r border-gray-800">
                          <div className="px-4 py-2 bg-red-900/10 border-b border-gray-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                              Original / Current
                            </span>
                          </div>

                          <div className="p-4 text-xs text-gray-300">
                            {safeText(
                              previewData
                                ?.before
                                ?.content
                            ) ? (
                              <div
                                className="prose prose-invert prose-xs max-w-none leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    safeText(
                                      previewData
                                        ?.before
                                        ?.content
                                    ),
                                }}
                              />
                            ) : (
                              <div className="text-gray-500">
                                Current content
                                unavailable in
                                preview.
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="px-4 py-2 bg-green-900/10 border-b border-gray-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">
                              AI Enhanced Preview
                            </span>
                          </div>

                          <div className="p-4 text-xs text-gray-300">
                            {safeText(
                              previewData
                                ?.after
                                ?.mainStory
                            ) ? (
                              <div
                                className="prose prose-invert prose-xs max-w-none leading-relaxed"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    safeText(
                                      previewData
                                        ?.after
                                        ?.mainStory
                                    ),
                                }}
                              />
                            ) : (
                              <div className="text-gray-500">
                                Enhanced Main Story
                                unavailable.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ==================================================
                       MAIN STORY
                    ================================================== */}

                    {previewData?.after
                      ?.mainStory && (
                      <div
                        id="preview-mainStory"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">
                          📝 Main Story
                        </h3>

                        <div className="bg-white/5 rounded-lg p-4 text-xs leading-relaxed text-gray-200 border border-gray-800">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                safeText(
                                  previewData
                                    .after
                                    .mainStory
                                ),
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* ==================================================
                       BRIEF
                    ================================================== */}

                    {previewData?.after
                      ?.brief && (
                      <div
                        id="preview-brief"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          ⚡ Brief
                        </h3>

                        <p className="bg-white/5 rounded-lg p-4 text-xs text-gray-200 border border-gray-800 leading-relaxed">
                          {safeText(
                            previewData
                              .after
                              .brief
                          )}
                        </p>
                      </div>
                    )}

                    {/* ==================================================
                       KEY HIGHLIGHTS
                    ================================================== */}

                    {previewData?.after
                      ?.keyHighlights && (
                      <div
                        id="preview-keyHighlights"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          ⭐ Key Highlights
                        </h3>

                        <div className="bg-white/5 rounded-lg p-4 space-y-2 border border-gray-800">
                          {typeof previewData
                            .after
                            .keyHighlights ===
                          "object" ? (
                            Object.entries(
                              previewData
                                .after
                                .keyHighlights
                            ).map(
                              ([
                                key,
                                value,
                              ]) =>
                                value ? (
                                  <div
                                    key={
                                      key
                                    }
                                    className="text-xs"
                                  >
                                    <span className="text-gray-500 font-semibold capitalize">
                                      {key.replace(
                                        /([A-Z])/g,
                                        " $1"
                                      )}
                                      :
                                    </span>

                                    <span className="text-white ml-2">
                                      {formatValue(
                                        value
                                      )}
                                    </span>
                                  </div>
                                ) : null
                            )
                          ) : (
                            <div className="text-xs text-gray-300">
                              {formatValue(
                                previewData
                                  .after
                                  .keyHighlights
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ==================================================
                       TAKEAWAYS
                    ================================================== */}

                    {safeArray(
                      previewData
                        ?.after
                        ?.keyTakeaways
                    ).length >
                      0 && (
                      <div
                        id="preview-keyTakeaways"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          💡 Key Takeaways
                        </h3>

                        <ul className="bg-white/5 rounded-lg p-4 space-y-2 border border-gray-800">
                          {safeArray(
                            previewData
                              ?.after
                              ?.keyTakeaways
                          ).map(
                            (
                              takeaway,
                              index
                            ) => (
                              <li
                                key={
                                  index
                                }
                                className="text-xs flex items-start gap-2 text-gray-200"
                              >
                                <span className="text-orange-400 font-bold">
                                  {index +
                                    1}
                                  .
                                </span>

                                <span>
                                  {formatValue(
                                    takeaway
                                  )}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* ==================================================
                       WHY IT MATTERS
                    ================================================== */}

                    {previewData?.after
                      ?.whyItMatters && (
                      <div
                        id="preview-whyItMatters"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          🌍 Why It Matters
                        </h3>

                        <div className="bg-white/5 rounded-lg p-4 space-y-3 border border-gray-800">
                          {typeof previewData
                            .after
                            .whyItMatters ===
                          "object" ? (
                            Object.entries(
                              previewData
                                .after
                                .whyItMatters
                            ).map(
                              ([
                                key,
                                value,
                              ]) =>
                                value ? (
                                  <div
                                    key={
                                      key
                                    }
                                  >
                                    <div className="text-[10px] text-gray-500 mb-0.5 uppercase tracking-wide font-semibold">
                                      {key.replace(
                                        /([A-Z])/g,
                                        " $1"
                                      )}
                                    </div>

                                    <div className="text-xs text-gray-200 leading-relaxed">
                                      {formatValue(
                                        value
                                      )}
                                    </div>
                                  </div>
                                ) : null
                            )
                          ) : (
                            <div className="text-xs text-gray-200">
                              {formatValue(
                                previewData
                                  .after
                                  .whyItMatters
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ==================================================
                       BACKGROUND
                    ================================================== */}

                    {previewData?.after
                      ?.background && (
                      <div
                        id="preview-background"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          📜 Background
                        </h3>

                        <div className="bg-white/5 rounded-lg p-4 text-xs leading-relaxed text-gray-200 border border-gray-800">
                          {formatValue(
                            previewData
                              .after
                              .background
                          )}
                        </div>
                      </div>
                    )}

                    {/* ==================================================
                       EXPERT OPINION
                    ================================================== */}

                    {safeArray(
                      previewData
                        ?.after
                        ?.expertOpinion
                    ).length >
                      0 && (
                      <div
                        id="preview-expertOpinion"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          🎙️ Expert Opinions
                        </h3>

                        <div className="space-y-2">
                          {safeArray(
                            previewData
                              ?.after
                              ?.expertOpinion
                          ).map(
                            (
                              expert,
                              index
                            ) => (
                              <div
                                key={
                                  index
                                }
                                className="bg-white/5 rounded-lg p-4 border-l-2 border-orange-500 border border-gray-800"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="font-bold text-xs text-white">
                                    {safeText(
                                      expert?.expert
                                    ) ||
                                      "Expert"}
                                  </div>

                                  {expert?.designation && (
                                    <div className="text-[10px] text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded">
                                      (
                                      {
                                        expert.designation
                                      }
                                      )
                                    </div>
                                  )}
                                </div>

                                {expert?.quote && (
                                  <div className="text-xs italic text-gray-300">
                                    "
                                    {
                                      expert.quote
                                    }
                                    "
                                  </div>
                                )}

                                {expert?.perspective && (
                                  <div className="text-[10px] text-gray-500 mt-2 pt-2 border-t border-gray-700">
                                    {
                                      expert.perspective
                                    }
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* ==================================================
                       WHAT'S NEXT
                    ================================================== */}

                    {previewData?.after
                      ?.whatsNext && (
                      <div
                        id="preview-whatsNext"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          🔮 What's Next
                        </h3>

                        <div className="bg-white/5 rounded-lg p-4 text-xs leading-relaxed text-gray-200 border border-gray-800">
                          {formatValue(
                            previewData
                              .after
                              .whatsNext
                          )}
                        </div>
                      </div>
                    )}

                    {/* ==================================================
                       TIMELINE
                    ================================================== */}

                    {safeArray(
                      previewData
                        ?.after
                        ?.timeline
                    ).length >
                      0 && (
                      <div
                        id="preview-timeline"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          📅 Timeline
                        </h3>

                        <div className="bg-white/5 rounded-lg p-4 space-y-3 border border-gray-800">
                          {safeArray(
                            previewData
                              ?.after
                              ?.timeline
                          ).map(
                            (
                              item,
                              index
                            ) => (
                              <div
                                key={
                                  index
                                }
                                className="flex gap-3 border-b border-gray-700 pb-2 last:border-0 last:pb-0"
                              >
                                <div className="text-orange-400 font-bold text-[10px] w-20 flex-shrink-0 pt-0.5">
                                  {formatValue(
                                    item?.year
                                  ) ||
                                    formatValue(
                                      item?.date
                                    )}
                                </div>

                                <div className="flex-1">
                                  <div className="font-semibold text-xs text-white">
                                    {formatValue(
                                      item?.title
                                    )}
                                  </div>

                                  <div className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                                    {formatValue(
                                      item?.description
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* ==================================================
                       FACT CHECK
                    ================================================== */}

                    {safeArray(
                      previewData
                        ?.after
                        ?.factChecks
                    ).length >
                      0 && (
                      <div
                        id="preview-factChecks"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          🔍 Fact-Checks
                        </h3>

                        <div className="bg-white/5 rounded-lg p-4 space-y-3 border border-gray-800">
                          {safeArray(
                            previewData
                              ?.after
                              ?.factChecks
                          ).map(
                            (
                              fact,
                              index
                            ) => (
                              <div
                                key={
                                  index
                                }
                                className="border-l-2 border-orange-500 pl-3 py-0.5"
                              >
                                <div className="font-semibold text-xs text-white">
                                  {formatValue(
                                    fact?.claim
                                  )}
                                </div>

                                <div
                                  className={`text-[10px] font-bold mt-0.5 uppercase ${
                                    fact?.verdict ===
                                    "VERIFIED"
                                      ? "text-green-400"
                                      : fact?.verdict ===
                                        "FALSE"
                                      ? "text-red-400"
                                      : fact?.verdict ===
                                        "MISLEADING"
                                      ? "text-yellow-400"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {formatValue(
                                    fact?.verdict
                                  )}
                                </div>

                                <div className="text-[10px] text-gray-400 mt-0.5">
                                  {formatValue(
                                    fact?.explanation
                                  )}
                                </div>

                                {fact?.source && (
                                  <div className="text-[10px] text-orange-400 mt-0.5">
                                    Source:{" "}
                                    {
                                      fact.source
                                    }
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* ==================================================
                       FAQ
                    ================================================== */}

                    {safeArray(
                      previewData
                        ?.after
                        ?.faqs
                    ).length >
                      0 && (
                      <div
                        id="preview-faqs"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          ❓ FAQs
                        </h3>

                        <div className="bg-white/5 rounded-lg p-4 space-y-3 border border-gray-800">
                          {safeArray(
                            previewData
                              ?.after
                              ?.faqs
                          ).map(
                            (
                              faq,
                              index
                            ) => (
                              <div
                                key={
                                  index
                                }
                                className="pb-2 border-b border-gray-700 last:border-0 last:pb-0"
                              >
                                <div className="font-bold text-xs text-white">
                                  Q:{" "}
                                  {formatValue(
                                    faq?.question
                                  )}
                                </div>

                                <div className="text-xs text-gray-300 mt-1 pl-2 border-l-2 border-gray-600">
                                  A:{" "}
                                  {formatValue(
                                    faq?.answer
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* ==================================================
                       SEO
                    ================================================== */}

                    {(previewData?.after
                      ?.seoTitle ||
                      previewData?.after
                        ?.metaDescription ||
                      previewData?.after
                        ?.metaKeywords ||
                      previewData?.after
                        ?.urlSlug) && (
                      <div
                        id="preview-seo"
                        className="scroll-mt-2"
                      >
                        <h3 className="text-sm font-bold text-orange-400 mb-2">
                          🔎 SEO Metadata
                        </h3>

                        <div className="bg-white/5 rounded-lg p-4 space-y-2 text-xs border border-gray-800">
                          <div>
                            <span className="text-gray-500 font-semibold w-20 inline-block">
                              Title:
                            </span>

                            <span className="text-white">
                              {formatValue(
                                previewData
                                  .after
                                  .seoTitle
                              )}
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-500 font-semibold w-20 inline-block">
                              Desc:
                            </span>

                            <span className="text-white">
                              {formatValue(
                                previewData
                                  .after
                                  .metaDescription
                              )}
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-500 font-semibold w-20 inline-block">
                              Keywords:
                            </span>

                            <span className="text-white">
                              {formatValue(
                                previewData
                                  .after
                                  .metaKeywords
                              )}
                            </span>
                          </div>

                          <div>
                            <span className="text-gray-500 font-semibold w-20 inline-block">
                              Slug:
                            </span>

                            <span className="text-orange-400">
                              {formatValue(
                                previewData
                                  .after
                                  .urlSlug
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================
                  FOOTER
              ======================================================== */}

              <div className="px-5 py-3 border-t border-orange-500/10 flex flex-wrap items-center justify-between gap-3 bg-[#0a0f1e]">
                {modalStep ===
                "selection" ? (
                  <>
                    <button
                      onClick={
                        closeModal
                      }
                      disabled={
                        isSaving
                      }
                      className="px-4 py-2 rounded-md border border-gray-700 hover:bg-white/5 transition text-xs text-gray-300"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={
                        handleGeneratePreview
                      }
                      disabled={
                        isSaving ||
                        selectedGenerationCount ===
                          0
                      }
                      className="px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-700 transition font-semibold text-xs text-white flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving
                        ? "Generating..."
                        : `✨ Generate (${selectedGenerationCount})`}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          setModalStep(
                            "selection"
                          )
                        }
                        disabled={
                          isSaving
                        }
                        className="px-3 py-2 rounded-md border border-gray-700 hover:bg-white/5 transition text-xs text-gray-300"
                      >
                        ← Edit Modules
                      </button>

                      <button
                        onClick={() =>
                          handleApply(
                            "discard"
                          )
                        }
                        disabled={
                          isSaving
                        }
                        className="px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 border border-gray-700 transition text-xs text-gray-300 disabled:opacity-50"
                      >
                        {applyAction ===
                        "discard"
                          ? "Discarding..."
                          : "🗑️ Discard"}
                      </button>

                      <button
                        onClick={() =>
                          handleApply(
                            "restore_original"
                          )
                        }
                        disabled={
                          isSaving
                        }
                        className="px-3 py-2 rounded-md bg-red-900/20 hover:bg-red-900/40 border border-red-800/60 transition text-xs text-red-400 disabled:opacity-50"
                      >
                        {applyAction ===
                        "restore_original"
                          ? "Restoring..."
                          : "↩️ Restore Original"}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          handleApply(
                            "apply_selected"
                          )
                        }
                        disabled={
                          isSaving ||
                          selectedPreviewCount ===
                            0
                        }
                        className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold text-xs text-white disabled:opacity-50"
                      >
                        {applyAction ===
                        "apply_selected"
                          ? "Applying..."
                          : `✓ Apply Selected (${selectedPreviewCount})`}
                      </button>

                      <button
                        onClick={() =>
                          handleApply(
                            "apply_all"
                          )
                        }
                        disabled={
                          isSaving
                        }
                        className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition font-semibold text-xs text-white shadow-lg shadow-green-600/20 disabled:opacity-50"
                      >
                        {applyAction ===
                        "apply_all"
                          ? "Applying..."
                          : "✅ Apply All"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
    </div>
  );
}