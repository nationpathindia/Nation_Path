"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface IngestedFeed {
  id: string;
  title: string;
  source: { name: string; category: string } | null;
  priorityScore: number;
  keywords: string[];
  status: string;
  publishedAt: string;
}

type StatusFilter = "all" | "pending" | "processed";
type CategoryFilter = "all" | "Government" | "India" | "World" | "Business" | "Technology" | "Automobiles" | "Legal" | "Science" | "Health" | "Sports" | "Entertainment";

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function getPriorityInfo(score: number) {
  if (score >= 100) return { label: "Can Publish", color: "text-red-400 bg-red-900/30 border-red-800", icon: "🔥" };
  if (score >= 70) return { label: "Recommended", color: "text-green-400 bg-green-900/30 border-green-800", icon: "⭐" };
  if (score >= 40) return { label: "Moderate", color: "text-yellow-400 bg-yellow-900/30 border-yellow-800", icon: "⚠️" };
  return { label: "Avoid", color: "text-gray-400 bg-gray-800/50 border-gray-700", icon: "🚫" };
}

const AI_MODULES = [
  { id: 'mainStory', title: 'Main Story', desc: 'Deep analysis', default: true },
  { id: 'brief', title: 'Brief', desc: 'Sharp 60-word summary', default: true },
  { id: 'keyHighlights', title: 'Key Highlights', desc: 'Structured data', default: true },
  { id: 'keyTakeaways', title: 'Key Takeaways', desc: '5 data-driven points', default: true },
  { id: 'whyItMatters', title: 'Why It Matters', desc: 'Broader impact', default: true },
  { id: 'background', title: 'Background', desc: 'Historical context', default: true },
  { id: 'expertOpinion', title: 'Expert Opinion', desc: 'Analyst perspectives', default: true },
  { id: 'whatsNext', title: "What's Next", desc: 'Upcoming developments', default: true },
  { id: 'timeline', title: 'Timeline', desc: 'Chronological events', default: false },
  { id: 'factChecks', title: 'Fact-Check', desc: 'Verify claims', default: false },
  { id: 'faqs', title: 'FAQs', desc: 'Practical questions', default: true },
  { id: 'suggestedCategory', title: 'Auto Category', desc: 'AI categorization', default: true },
  { id: 'seo', title: 'SEO Metadata', desc: 'Title, Desc, Keywords', default: true },
];

export default function AINewsroomPage() {
  const [feeds, setFeeds] = useState<IngestedFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningIngest, setRunningIngest] = useState(false);
  const [runningCleanup, setRunningCleanup] = useState(false);
  const [fetchingTopic, setFetchingTopic] = useState(false);
  
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [trendsLoading, setTrendsLoading] = useState(true);
  const [feedCount, setFeedCount] = useState(0);

  // ✅ COMPACT MODAL STATES
  const [modalStep, setModalStep] = useState<'selection' | 'preview' | null>(null);
  const [isEditorial, setIsEditorial] = useState(false);
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>(
    AI_MODULES.reduce((acc, mod) => ({ ...acc, [mod.id]: mod.default }), {})
  );
  const [previewData, setPreviewData] = useState<any>(null);
  const [processingFeedId, setProcessingFeedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('mainStory');
  
  const router = useRouter();

  useEffect(() => {
    async function fetchTrending() {
      try {
        setTrendsLoading(true);
        const res = await fetch('/api/admin/ingestion/trending');
        const data = await res.json();
        if (data.success && data.topics.length > 0) setTrendingTopics(data.topics);
      } catch (error) { console.error("Failed to fetch trends", error); } 
      finally { setTrendsLoading(false); }
    }
    fetchTrending();
    const trendsInterval = setInterval(fetchTrending, 600000);
    return () => clearInterval(trendsInterval);
  }, []);

  useEffect(() => {
    fetchFeeds();
    const intervalId = setInterval(() => { fetchFeeds(); }, 60000);
    return () => clearInterval(intervalId);
  }, [activeStatus, activeCategory, activeTopic]);

  useEffect(() => {
    const cleanupInterval = setInterval(async () => {
      try { await fetch('/api/admin/ingestion/cleanup', { method: 'POST' }); } 
      catch (error) { console.error('Silent auto-cleanup failed:', error); }
    }, 15 * 60 * 1000);
    return () => clearInterval(cleanupInterval);
  }, []);

  async function fetchFeeds() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeStatus !== "all") params.set("status", activeStatus);
      if (activeCategory !== "all") params.set("category", activeCategory);
      if (activeTopic) params.set("topic", activeTopic);
      const res = await fetch(`/api/admin/ingestion/feeds?${params.toString()}`);
      const data = await res.json();
      setFeeds(data.feeds || []);
      setFeedCount(data.count || 0);
    } catch (error) { console.error("Failed to fetch feeds:", error); } 
    finally { setLoading(false); }
  }

  async function handleManualCleanup() {
    if (!confirm('🧹 Purane processed feeds delete karein?')) return;
    setRunningCleanup(true);
    try {
      const res = await fetch('/api/admin/ingestion/cleanup', { method: 'POST' });
      const data = await res.json();
      if (res.ok) { alert(`✅ Cleanup successful! Removed ${data.deleted || 0} feeds.`); fetchFeeds(); } 
      else { alert(`❌ Cleanup failed: ${data.error}`); }
    } catch (error: any) { alert(`Cleanup error: ${error.message}`); } 
    finally { setRunningCleanup(false); }
  }

  async function handleTopicClick(topic: string) {
    const newActiveTopic = topic === activeTopic ? null : topic;
    setActiveTopic(newActiveTopic);
    if (newActiveTopic) {
      setFetchingTopic(true);
      try {
        const res = await fetch('/api/admin/ingestion/topic', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: newActiveTopic })
        });
        if (res.ok) await fetchFeeds();
      } catch (error) { console.error('Auto-fetch failed:', error); } 
      finally { setFetchingTopic(false); }
    } else { fetchFeeds(); }
  }

  async function handleRunIngestion() {
    setRunningIngest(true);
    try {
      const res = await fetch("/api/admin/ingestion/run", { method: "POST" });
      const data = await res.json();
      if (res.ok) { alert(`✅ Success! ${data.added} new items fetched.`); fetchFeeds(); } 
      else { alert(`❌ Error: ${data.error}`); }
    } catch (error) { alert("Failed to run ingestion."); } 
    finally { setRunningIngest(false); }
  }

  function handleGenerateClick(feedId: string) {
    setProcessingFeedId(feedId);
    setIsEditorial(false);
    setModalStep('selection');
  }

  function toggleModule(moduleId: string) {
    setSelectedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  }

  async function handleGeneratePreview() {
    if (!processingFeedId) return;
    const modulesToGenerate = Object.entries(selectedModules).filter(([_, isSelected]) => isSelected).map(([moduleId, _]) => moduleId);
    if (modulesToGenerate.length === 0) { alert("Please select at least one module."); return; }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/ingestion/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedId: processingFeedId, action: 'preview', modulesToGenerate, isEditorial }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      setPreviewData(result.data);
      setModalStep('preview');
      setActiveSection('mainStory');
    } catch (error: any) { alert(`Error: ${error.message}`); } 
    finally { setIsSaving(false); }
  }

  async function handleApproveAndSave() {
    if (!processingFeedId) return;
    setIsSaving(true);
    const modulesToGenerate = Object.entries(selectedModules).filter(([_, isSelected]) => isSelected).map(([moduleId, _]) => moduleId);
    try {
      const saveRes = await fetch("/api/admin/ingestion/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedId: processingFeedId, action: 'save', modulesToGenerate, isEditorial }),
      });
      const saveResult = await saveRes.json();
      if (saveRes.ok && saveResult.success) {
        setModalStep(null); setPreviewData(null); setProcessingFeedId(null);
        if (saveResult.articleId) router.push(`/admin/posts/edit/${saveResult.articleId}`);
        else alert("Article saved but no ID returned.");
      } else { throw new Error(saveResult.error || "Save failed"); }
    } catch (error: any) { alert(`Save Error: ${error.message}`); } 
    finally { setIsSaving(false); fetchFeeds(); }
  }

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`preview-${id}`);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ✅ NEW: Rule-Based Data Quality Score Calculator (100% Hallucination-Free)
  const calculateConfidenceScore = (data: any) => {
    if (!data) return { score: 0, checks: { date: false, authority: false, location: false, verified: false } };
    let score = 0;
    let checks = { date: false, authority: false, location: false, verified: false };

    // 1. Check for Exact Date (Not "Date TBA" or "unspecified")
    if (data.timeline && data.timeline.some((t: any) => t.year && t.year !== "Date TBA" && !t.year.toLowerCase().includes("unspecified"))) {
      score += 25; checks.date = true;
    }
    // 2. Check for Named Authority
    if (data.keyHighlights?.authority && data.keyHighlights.authority.length > 3 && !data.keyHighlights.authority.toLowerCase().includes("unspecified") && data.keyHighlights.authority !== "N/A") {
      score += 25; checks.authority = true;
    }
    // 3. Check for Specific Location
    if (data.keyHighlights?.location && data.keyHighlights.location.length > 3 && data.keyHighlights.location !== "N/A") {
      score += 25; checks.location = true;
    }
    // 4. Check for Verified Facts
    if (data.factChecks && data.factChecks.some((fc: any) => fc.verdict === "VERIFIED" && !fc.source.toLowerCase().includes("unspecified"))) {
      score += 25; checks.verified = true;
    }

    return { score, checks };
  };

  const categories: { value: CategoryFilter; label: string; color: string; icon: string }[] = [
    { value: "all", label: "All", color: "bg-gray-700", icon: "📰" },
    { value: "Government", label: "Govt", color: "bg-red-700", icon: "🏛️" },
    { value: "India", label: "India", color: "bg-blue-700", icon: "🇮🇳" },
    { value: "World", label: "World", color: "bg-purple-700", icon: "🌍" },
    { value: "Business", label: "Business", color: "bg-green-700", icon: "💼" },
    { value: "Technology", label: "Tech", color: "bg-cyan-700", icon: "🚀" },
    { value: "Automobiles", label: "Autos", color: "bg-yellow-700", icon: "🚗" },
    { value: "Legal", label: "Legal", color: "bg-indigo-700", icon: "⚖️" },
    { value: "Science", label: "Science", color: "bg-orange-700", icon: "🔬" },
    { value: "Health", label: "Health", color: "bg-pink-700", icon: "🏥" },
    { value: "Sports", label: "Sports", color: "bg-emerald-700", icon: "🏏" },
    { value: "Entertainment", label: "Entertainment", color: "bg-rose-700", icon: "🎬" },
  ];

  if (loading && feeds.length === 0) {
    return <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center"><div className="text-orange-400 animate-pulse text-lg font-semibold">Loading AI Newsroom...</div></div>;
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-4 md:p-6">
      {/* Header & Actions */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3"><span className="text-orange-500">⚡</span> AI Newsroom</h1>
          <p className="mt-1 text-sm text-gray-400">Auto-fetch, enrich, and generate premium news drafts.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={fetchFeeds} className="px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-xs font-semibold transition">🔄 Refresh</button>
          <button onClick={handleManualCleanup} disabled={runningCleanup} className="px-3 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-800 text-red-400 rounded-lg text-xs font-semibold transition flex items-center gap-2">
            {runningCleanup ? "🧹 Cleaning..." : "🗑️ Clean Old"}
          </button>
          <button onClick={handleRunIngestion} disabled={runningIngest} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-xs font-bold text-white transition flex items-center gap-2">
            {runningIngest ? "Fetching..." : "📥 Run Ingestion"}
          </button>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="mb-5 bg-gray-900/50 rounded-lg border border-gray-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 animate-pulse">🔥</span>
            <h2 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Trending in India</h2>
          </div>
          {activeTopic && (
            <button onClick={() => handleTopicClick(activeTopic)} className="text-xs bg-orange-600/20 text-orange-400 px-3 py-1 rounded border border-orange-600/30 hover:bg-orange-600/30 transition">
              ✕ Clear: <span className="text-white">{activeTopic}</span>
            </button>
          )}
        </div>
        {trendingTopics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <button key={index} onClick={() => handleTopicClick(topic)} disabled={fetchingTopic} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all border ${activeTopic === topic ? "bg-orange-600 text-white border-orange-600" : "bg-gray-800 text-gray-400 border-gray-700 hover:text-white hover:border-gray-600"}`}>
                {topic}
              </button>
            ))}
          </div>
        ) : <div className="text-center py-4 text-gray-500 text-xs">{trendsLoading ? "Loading..." : "No trending topics"}</div>}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 bg-gray-900/30 rounded-lg px-4 py-2.5 border border-gray-800">
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <span className="text-gray-500">Showing:</span>
          <span className="text-white font-semibold">{feedCount} feeds</span>
          {activeTopic && <span className="text-orange-400 bg-orange-900/20 px-2 py-0.5 rounded border border-orange-800/50">Topic: {activeTopic}</span>}
        </div>
        <div className="flex gap-1 bg-gray-800/50 p-1 rounded-lg">
          {(["all", "pending", "processed"] as StatusFilter[]).map((status) => (
            <button key={status} onClick={() => setActiveStatus(status)} className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition ${activeStatus === status ? "bg-orange-600 text-white shadow-sm" : "text-gray-400 hover:text-white"}`}>
              {status === "all" ? "All" : status === "pending" ? "Pending" : "Processed"}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button key={cat.value} onClick={() => setActiveCategory(cat.value)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${activeCategory === cat.value ? `${cat.color} text-white border-transparent shadow-md` : "bg-gray-800/30 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white"}`}>
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* News Table */}
      {feeds.length === 0 ? (
        <div className="text-center py-16 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-400 text-sm font-medium">No feeds found for this filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/20 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-800/60 text-gray-400 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Published</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Title & Keywords</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {feeds.map((feed) => {
                const priorityInfo = getPriorityInfo(feed.priorityScore);
                return (
                  <tr key={feed.id} className="hover:bg-gray-800/30 transition group">
                    <td className="px-4 py-3">
                      {feed.status === 'processed' ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-900/30 text-green-400 border border-green-800/50">✅ Done</span> : <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-900/30 text-yellow-400 border border-yellow-800/50">⏳ Pending</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border w-fit ${priorityInfo.color}`}>
                        {priorityInfo.icon} {feed.priorityScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-white font-medium">{formatTimeAgo(feed.publishedAt)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-300 font-medium">{feed.source?.name || "Unknown"}</div>
                      <div className="text-gray-500 text-[10px]">{feed.source?.category || "General"}</div>
                    </td>
                    <td className="px-4 py-3 max-w-md">
                      <div className={`font-medium mb-1.5 line-clamp-2 transition ${feed.status === 'processed' ? 'text-gray-500' : 'text-white group-hover:text-orange-400'}`}>{feed.title}</div>
                      <div className="flex flex-wrap gap-1">
                        {feed.keywords.slice(0, 3).map((kw, i) => (<span key={i} className="text-[10px] bg-blue-900/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-800/30">#{kw}</span>))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {feed.status === 'processed' ? (
                        <button onClick={() => router.push(`/admin/posts/edit/${feed.id}`)} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md text-[11px] font-bold text-white transition">👁️ View</button>
                      ) : (
                        <button onClick={() => handleGenerateClick(feed.id)} disabled={processingFeedId === feed.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 rounded-md text-[11px] font-bold text-white transition">
                          {processingFeedId === feed.id ? "Processing..." : "✨ Generate"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ COMPACT PREMIUM MODAL */}
      {modalStep && processingFeedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => !isSaving && setModalStep(null)}>
          <div className="bg-[#0a0f1e] border border-orange-500/20 rounded-xl max-w-5xl w-full h-[80vh] flex flex-col overflow-hidden shadow-2xl ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="px-5 py-3 border-b border-orange-500/10 flex items-center justify-between bg-[#0a0f1e]">
              <div>
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  {modalStep === 'selection' ? '⚙️ Configure Generation' : '👁️ AI Preview'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {modalStep === 'selection' ? 'Select article type and modules.' : 'Review before saving to database.'}
                </p>
              </div>
              <button onClick={() => setModalStep(null)} disabled={isSaving} className="p-1.5 hover:bg-white/10 rounded-md transition text-gray-400 hover:text-white">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 flex overflow-hidden">
              {modalStep === 'selection' ? (
                <div className="flex-1 overflow-y-auto p-5">
                  {/* Sleek Article Type Toggle */}
                  <div className="mb-5">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Article Type</label>
                    <div className="flex bg-gray-800/50 p-1 rounded-lg border border-gray-700/50 w-fit">
                      <button onClick={() => setIsEditorial(false)} className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${!isEditorial ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                        📰 Standard Report
                      </button>
                      <button onClick={() => setIsEditorial(true)} className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${isEditorial ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}>
                        ✍️ Editorial / Op-Ed
                      </button>
                    </div>
                  </div>

                  {/* Compact Module Grid */}
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 block">Modules to Generate</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {AI_MODULES.map((mod) => (
                      <div key={mod.id} onClick={() => toggleModule(mod.id)} className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedModules[mod.id] ? 'border-orange-500/50 bg-orange-500/10' : 'border-gray-700/50 bg-gray-800/30 hover:border-gray-600'}`}>
                        <div className="flex items-start gap-2.5">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${selectedModules[mod.id] ? 'border-orange-500 bg-orange-500' : 'border-gray-600'}`}>
                            {selectedModules[mod.id] && <svg className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <div>
                            <h4 className="font-semibold text-xs text-white">{mod.title}</h4>
                            <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{mod.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Preview UI (Narrow Sidebar + Content)
                <>
                  <div className="w-48 border-r border-gray-800 bg-[#0d1220] flex flex-col overflow-y-auto hidden md:flex">
                    <div className="p-3 border-b border-gray-800"><h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sections</h3></div>
                    <nav className="flex-1 p-2 space-y-0.5">
                      {previewData.mainStory && <button onClick={() => scrollToSection('mainStory')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'mainStory' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>📝 Main Story</button>}
                      {previewData.brief && <button onClick={() => scrollToSection('brief')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'brief' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>⚡ Brief</button>}
                      {previewData.keyHighlights && <button onClick={() => scrollToSection('keyHighlights')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'keyHighlights' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>⭐ Highlights</button>}
                      {previewData.keyTakeaways?.length > 0 && <button onClick={() => scrollToSection('keyTakeaways')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'keyTakeaways' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>💡 Takeaways</button>}
                      {previewData.whyItMatters && <button onClick={() => scrollToSection('whyItMatters')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'whyItMatters' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🌍 Why It Matters</button>}
                      {previewData.background && <button onClick={() => scrollToSection('background')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'background' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>📜 Background</button>}
                      {previewData.expertOpinion?.length > 0 && <button onClick={() => scrollToSection('expertOpinion')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'expertOpinion' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🎙️ Experts</button>}
                      {previewData.timeline?.length > 0 && <button onClick={() => scrollToSection('timeline')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'timeline' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>📅 Timeline</button>}
                      {previewData.factChecks?.length > 0 && <button onClick={() => scrollToSection('factChecks')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'factChecks' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🔍 Fact Checks</button>}
                      {previewData.faqs?.length > 0 && <button onClick={() => scrollToSection('faqs')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'faqs' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>❓ FAQs</button>}
                      {previewData.seoTitle && <button onClick={() => scrollToSection('seo')} className={`w-full text-left px-2.5 py-1.5 rounded-md text-[11px] transition ${activeSection === 'seo' ? 'bg-orange-500/20 text-orange-400 font-medium' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🔎 SEO</button>}
                    </nav>
                  </div>

                  <div className="flex-1 overflow-y-auto p-5 space-y-5 scroll-smooth bg-[#0a0f1e]">
                    
                    {/* ✅ NEW: Data Quality & Confidence Banner (Top of Preview) */}
                    {previewData && (() => {
                      const { score, checks } = calculateConfidenceScore(previewData);
                      const isHigh = score >= 75;
                      const isMedium = score >= 50 && score < 75;
                      
                      const badgeColor = isHigh ? "bg-green-900/30 border-green-800 text-green-400" : 
                                         isMedium ? "bg-yellow-900/30 border-yellow-800 text-yellow-400" : 
                                         "bg-red-900/30 border-red-800 text-red-400";
                      
                      const badgeIcon = isHigh ? "🟢" : isMedium ? "🟡" : "🔴";
                      const badgeText = isHigh ? "High Confidence (Ready to Publish)" : 
                                        isMedium ? "Medium Confidence (Needs Minor Review)" : 
                                        "Low Confidence (Heavy Editing Required)";

                      return (
                        <div className={`p-4 rounded-xl border ${badgeColor} mb-4 flex items-start gap-4`}>
                          <div className="text-3xl">{badgeIcon}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-sm font-bold uppercase tracking-wider">AI Data Quality Score: {score}%</h3>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/20">{badgeText}</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-medium">
                              <div className={`flex items-center gap-1.5 ${checks.date ? 'text-white' : 'text-gray-500'}`}>
                                {checks.date ? "✅" : "⚪"} Exact Date Found
                              </div>
                              <div className={`flex items-center gap-1.5 ${checks.authority ? 'text-white' : 'text-gray-500'}`}>
                                {checks.authority ? "✅" : "⚪"} Named Authority
                              </div>
                              <div className={`flex items-center gap-1.5 ${checks.location ? 'text-white' : 'text-gray-500'}`}>
                                {checks.location ? "✅" : "⚪"} Specific Location
                              </div>
                              <div className={`flex items-center gap-1.5 ${checks.verified ? 'text-white' : 'text-gray-500'}`}>
                                {checks.verified ? "✅" : "⚪"} Verified Facts
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Content Sections */}
                    {previewData.mainStory && <div id="preview-mainStory" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">📝 Main Story</h3><div className="bg-white/5 rounded-lg p-4 text-xs leading-relaxed text-gray-200 border border-gray-800" dangerouslySetInnerHTML={{ __html: previewData.mainStory }} /></div>}
                    {previewData.brief && <div id="preview-brief" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">⚡ Brief</h3><p className="bg-white/5 rounded-lg p-4 text-xs text-gray-200 border border-gray-800">{previewData.brief}</p></div>}
                    {previewData.keyHighlights && <div id="preview-keyHighlights" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">⭐ Key Highlights</h3><div className="bg-white/5 rounded-lg p-4 space-y-2 border border-gray-800">{Object.entries(previewData.keyHighlights).map(([key, val]: [string, any]) => val && <div key={key} className="text-xs"><span className="text-gray-500 font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> <span className="text-white ml-2">{val}</span></div>)}</div></div>}
                    {previewData.keyTakeaways?.length > 0 && <div id="preview-keyTakeaways" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">💡 Key Takeaways</h3><ul className="bg-white/5 rounded-lg p-4 space-y-2 border border-gray-800">{previewData.keyTakeaways.map((takeaway: string, idx: number) => (<li key={idx} className="text-xs flex items-start gap-2 text-gray-200"><span className="text-orange-400 font-bold mt-0.5">{idx + 1}.</span><span>{takeaway}</span></li>))}</ul></div>}
                    {previewData.whyItMatters && <div id="preview-whyItMatters" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">🌍 Why It Matters</h3><div className="bg-white/5 rounded-lg p-4 space-y-3 border border-gray-800">{previewData.whyItMatters.broaderImpact && <div><div className="text-[10px] text-gray-500 mb-0.5 uppercase tracking-wide font-semibold">Broader Impact</div><div className="text-xs text-gray-200">{previewData.whyItMatters.broaderImpact}</div></div>}{previewData.whyItMatters.objectiveAnalysis && <div><div className="text-[10px] text-gray-500 mb-0.5 uppercase tracking-wide font-semibold">Objective Analysis</div><div className="text-xs text-gray-200">{previewData.whyItMatters.objectiveAnalysis}</div></div>}</div></div>}
                    {previewData.background && <div id="preview-background" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">📜 Background</h3><div className="bg-white/5 rounded-lg p-4 text-xs leading-relaxed text-gray-200 border border-gray-800">{previewData.background}</div></div>}
                    {previewData.expertOpinion?.length > 0 && <div id="preview-expertOpinion" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">🎙️ Expert Opinions</h3><div className="space-y-2">{previewData.expertOpinion.map((exp: any, idx: number) => (<div key={idx} className="bg-white/5 rounded-lg p-4 border-l-2 border-orange-500 border border-gray-800"><div className="flex items-center gap-2 mb-1"><div className="font-bold text-xs text-white">{exp.expert || 'Expert'}</div>{exp.designation && <div className="text-[10px] text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded">({exp.designation})</div>}</div><div className="text-xs italic text-gray-300">"{exp.quote}"</div>{exp.perspective && <div className="text-[10px] text-gray-500 mt-2 pt-2 border-t border-gray-700">{exp.perspective}</div>}</div>))}</div></div>}
                    {previewData.timeline?.length > 0 && <div id="preview-timeline" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">📅 Timeline</h3><div className="bg-white/5 rounded-lg p-4 space-y-3 border border-gray-800">{previewData.timeline.map((item: any, idx: number) => (<div key={idx} className="flex gap-3 border-b border-gray-700 pb-2 last:border-0 last:pb-0"><div className="text-orange-400 font-bold text-[10px] w-16 flex-shrink-0 pt-0.5">{item.year}</div><div className="flex-1"><div className="font-semibold text-xs text-white">{item.title}</div><div className="text-[10px] text-gray-400 mt-0.5">{item.description}</div></div></div>))}</div></div>}
                    {previewData.factChecks?.length > 0 && <div id="preview-factChecks" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">🔍 Fact-Checks</h3><div className="bg-white/5 rounded-lg p-4 space-y-3 border border-gray-800">{previewData.factChecks.map((fc: any, idx: number) => (<div key={idx} className="border-l-2 border-orange-500 pl-3 py-0.5"><div className="font-semibold text-xs text-white">{fc.claim}</div><div className={`text-[10px] font-bold mt-0.5 uppercase ${fc.verdict === 'VERIFIED' ? 'text-green-400' : fc.verdict === 'FALSE' ? 'text-red-400' : fc.verdict === 'MISLEADING' ? 'text-yellow-400' : 'text-gray-400'}`}>{fc.verdict}</div><div className="text-[10px] text-gray-400 mt-0.5">{fc.explanation}</div><div className="text-[10px] text-orange-400 mt-0.5">Source: {fc.source}</div></div>))}</div></div>}
                    {previewData.faqs?.length > 0 && <div id="preview-faqs" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">❓ FAQs</h3><div className="bg-white/5 rounded-lg p-4 space-y-3 border border-gray-800">{previewData.faqs.map((faq: any, idx: number) => (<div key={idx} className="pb-2 border-b border-gray-700 last:border-0 last:pb-0"><div className="font-bold text-xs text-white">Q: {faq.question}</div><div className="text-xs text-gray-300 mt-1 pl-2 border-l-2 border-gray-600">A: {faq.answer}</div></div>))}</div></div>}
                    {previewData.seoTitle && <div id="preview-seo" className="scroll-mt-2"><h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center gap-2">🔎 SEO Metadata</h3><div className="bg-white/5 rounded-lg p-4 space-y-2 text-xs border border-gray-800"><div><span className="text-gray-500 font-semibold w-20 inline-block">Title:</span> <span className="text-white">{previewData.seoTitle}</span></div><div><span className="text-gray-500 font-semibold w-20 inline-block">Desc:</span> <span className="text-white">{previewData.metaDescription}</span></div><div><span className="text-gray-500 font-semibold w-20 inline-block">Keywords:</span> <span className="text-white">{previewData.metaKeywords}</span></div><div><span className="text-gray-500 font-semibold w-20 inline-block">Slug:</span> <span className="text-orange-400">{previewData.urlSlug}</span></div></div></div>}
                  </div>
                </>
              )}
            </div>

            {/* Sticky Modal Footer */}
            <div className="px-5 py-3 border-t border-orange-500/10 flex items-center justify-end gap-2 bg-[#0a0f1e]">
              {modalStep === 'selection' ? (
                <>
                  <button onClick={() => setModalStep(null)} disabled={isSaving} className="px-4 py-2 rounded-md border border-gray-700 hover:bg-white/5 transition text-xs text-gray-300">Cancel</button>
                  <button onClick={handleGeneratePreview} disabled={isSaving || Object.values(selectedModules).filter(Boolean).length === 0} className="px-4 py-2 rounded-md bg-orange-600 hover:bg-orange-700 transition font-semibold text-xs text-white flex items-center gap-2 disabled:opacity-50">
                    {isSaving ? 'Generating...' : `✨ Generate (${Object.values(selectedModules).filter(Boolean).length})`}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setModalStep('selection')} disabled={isSaving} className="px-4 py-2 rounded-md border border-gray-700 hover:bg-white/5 transition text-xs text-gray-300">← Edit Modules</button>
                  <button onClick={handleApproveAndSave} disabled={isSaving} className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition font-semibold text-xs text-white shadow-lg shadow-green-600/20 flex items-center gap-2 disabled:opacity-50">
                    {isSaving ? 'Saving...' : '✅ Approve & Save'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}