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

// ✅ HELPER 1: Time ko "5m ago", "2h ago" ya exact date mein convert karega
function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// ✅ HELPER 2: Priority Score ke hisaab se Recommendation aur Color return karega
function getPriorityInfo(score: number) {
  if (score >= 100) {
    return { label: "Can Publish", color: "text-red-400 bg-red-900/30 border-red-800", icon: "🔥" };
  }
  if (score >= 70) {
    return { label: "Recommended", color: "text-green-400 bg-green-900/30 border-green-800", icon: "⭐" };
  }
  if (score >= 40) {
    return { label: "Moderate", color: "text-yellow-400 bg-yellow-900/30 border-yellow-800", icon: "⚠️" };
  }
  return { label: "Avoid", color: "text-gray-400 bg-gray-800/50 border-gray-700", icon: "🚫" };
}

export default function AINewsroomPage() {
  const [feeds, setFeeds] = useState<IngestedFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [runningIngest, setRunningIngest] = useState(false);
  const [fetchingTopic, setFetchingTopic] = useState(false);
  
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [trendsLoading, setTrendsLoading] = useState(true);
  const [feedCount, setFeedCount] = useState(0);
  
  const router = useRouter();

  // 1. Fetch Trending Topics on Mount + Every 10 Minutes
  useEffect(() => {
    async function fetchTrending() {
      try {
        setTrendsLoading(true);
        const res = await fetch('/api/admin/ingestion/trending');
        const data = await res.json();
        if (data.success && data.topics.length > 0) {
          setTrendingTopics(data.topics);
        }
      } catch (error) {
        console.error("Failed to fetch trends", error);
      } finally {
        setTrendsLoading(false);
      }
    }
    
    fetchTrending();
    const trendsInterval = setInterval(fetchTrending, 600000); // 10 minutes
    return () => clearInterval(trendsInterval);
  }, []);

  // 2. Fetch Feeds + Auto-refresh every 60 seconds
  useEffect(() => {
    fetchFeeds();
    const intervalId = setInterval(() => {
      fetchFeeds();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [activeStatus, activeCategory, activeTopic]);

  // 3. ✅ SILENT AUTO-CLEANUP: Har 1 ghante mein background mein purani processed news delete karega
  useEffect(() => {
    const cleanupInterval = setInterval(async () => {
      try {
        await fetch('/api/admin/ingestion/cleanup', { method: 'POST' });
      } catch (error) {
        console.error('Silent auto-cleanup failed:', error);
      }
    }, 60 * 60 * 1000); // 1 Hour = 3600000 ms

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
    } catch (error) {
      console.error("Failed to fetch feeds:", error);
    } finally {
      setLoading(false);
    }
  }

  // 4. MAGIC FUNCTION: Click topic -> Auto fetch latest -> Show
  async function handleTopicClick(topic: string) {
    const newActiveTopic = topic === activeTopic ? null : topic;
    setActiveTopic(newActiveTopic);
    
    if (newActiveTopic) {
      setFetchingTopic(true);
      try {
        const res = await fetch('/api/admin/ingestion/topic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: newActiveTopic })
        });
        
        const data = await res.json();
        
        if (res.ok) {
          console.log(`✅ Auto-fetched ${data.added} latest news for "${newActiveTopic}"`);
          await fetchFeeds();
        } else {
          console.error(`Failed to fetch topic: ${data.error}`);
        }
      } catch (error) {
        console.error('Auto-fetch failed:', error);
      } finally {
        setFetchingTopic(false);
      }
    } else {
      fetchFeeds();
    }
  }

  async function handleRunIngestion() {
    setRunningIngest(true);
    try {
      const res = await fetch("/api/admin/ingestion/run", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Success! ${data.added} new items fetched.`);
        fetchFeeds();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to run ingestion.");
    } finally {
      setRunningIngest(false);
    }
  }

  async function handleGenerate(feedId: string) {
    setProcessingId(feedId);
    try {
      const res = await fetch("/api/admin/ingestion/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Success! Article created. Redirecting to editor...`);
        router.push(`/admin/posts/edit/${data.articleId}`);
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to generate article.");
    } finally {
      setProcessingId(null);
      fetchFeeds();
    }
  }

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
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center">
        <div className="text-orange-400 animate-pulse text-lg font-semibold">Loading AI Newsroom...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-4 md:p-8">
      {/* Header & Actions */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-orange-500">⚡</span> AI Newsroom
          </h1>
          <p className="mt-2 text-gray-400">
            Click a trending topic to auto-fetch latest news, or run manual ingestion.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={fetchFeeds} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm font-semibold transition">
            🔄 Refresh
          </button>
          <button onClick={handleRunIngestion} disabled={runningIngest} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-sm font-bold text-white transition flex items-center gap-2">
            {runningIngest ? "Fetching..." : "📥 Run General Ingestion"}
          </button>
        </div>
      </div>

      {/* 🔥 MINI DASHBOARD: Trending Topics */}
      <div className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700 p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 px-4 py-2 rounded-lg shadow-lg">
              <span className="text-white animate-pulse">🔥</span>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Trending in India
              </h2>
            </div>
            <span className="text-xs text-gray-400">
              {trendsLoading ? "Loading..." : "Live from Google News (Last 24h)"}
            </span>
          </div>
          {activeTopic && (
            <button 
              onClick={() => handleTopicClick(activeTopic)}
              className="text-xs bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 px-4 py-2 rounded-lg border border-orange-600/30 transition flex items-center gap-2 font-medium"
            >
              ✕ Clear Topic: <span className="text-white">{activeTopic}</span>
            </button>
          )}
        </div>
        
        {trendingTopics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleTopicClick(topic)}
                disabled={fetchingTopic}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border flex items-center gap-2 ${
                  activeTopic === topic
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white border-transparent shadow-lg scale-105"
                    : "bg-gray-800/80 text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white hover:border-gray-500 disabled:opacity-50"
                }`}
                title={`Click to auto-fetch latest news about: ${topic}`}
              >
                {fetchingTopic && activeTopic === topic && (
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {topic}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm">
            {trendsLoading ? "Loading trending topics..." : "No trending topics available"}
          </div>
        )}
      </div>

      {/* Filter Stats */}
      <div className="mb-4 flex items-center justify-between bg-gray-800/30 rounded-lg px-4 py-3 border border-gray-700">
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <span className="text-gray-400">Showing:</span>
          <span className="text-white font-semibold">{feedCount} feeds</span>
          {activeTopic && (
            <span className="text-orange-400 bg-orange-900/20 px-2 py-0.5 rounded border border-orange-800/50">
              Topic: <span className="font-semibold">{activeTopic}</span>
            </span>
          )}
          {activeCategory !== 'all' && (
            <span className="text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-800/50">
              Category: <span className="font-semibold">{activeCategory}</span>
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "processed"] as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                activeStatus === status 
                  ? "bg-orange-600 text-white" 
                  : "bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {status === "all" ? "📋 All" : status === "pending" ? "⏳ Pending" : "✅ Processed"}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              activeCategory === cat.value
                ? `${cat.color} text-white border-transparent shadow-md`
                : "bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* News Table */}
      {feeds.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/50 rounded-xl border border-gray-800 border-dashed">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-400 text-lg font-medium">
            {activeTopic ? `No latest news found for: "${activeTopic}"` : "No feeds found for this filter."}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {activeTopic 
              ? "Try running general ingestion or wait for new updates." 
              : "Try running general ingestion or changing filters."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/30 shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-800/80 text-gray-300 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Priority</th>
                <th className="px-6 py-4 font-semibold">Published</th> {/* ✅ NEW COLUMN */}
                <th className="px-6 py-4 font-semibold">Source</th>
                <th className="px-6 py-4 font-semibold">Title & Keywords</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {feeds.map((feed) => {
                const priorityInfo = getPriorityInfo(feed.priorityScore); // ✅ Get recommendation
                
                return (
                  <tr key={feed.id} className="hover:bg-gray-800/40 transition group">
                    <td className="px-6 py-4">
                      {feed.status === 'processed' ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-900/40 text-green-400 border border-green-800">✅ Done</span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-900/40 text-yellow-400 border border-yellow-800">⏳ Pending</span>
                      )}
                    </td>
                    
                    {/* ✅ ENHANCED PRIORITY COLUMN */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border w-fit ${priorityInfo.color}`}>
                          <span>{priorityInfo.icon}</span>
                          <span>{feed.priorityScore}</span>
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${priorityInfo.color.split(' ')[0]}`}>
                          {priorityInfo.label}
                        </span>
                      </div>
                    </td>

                    {/* ✅ NEW PUBLISHED TIME COLUMN */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-white">
                        {formatTimeAgo(feed.publishedAt)}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {new Date(feed.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-300">{feed.source?.name || "Google News"}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{feed.source?.category || "Trending"}</div>
                    </td>
                    <td className="px-6 py-4 max-w-lg">
                      <div className={`font-semibold mb-2 line-clamp-2 transition ${feed.status === 'processed' ? 'text-gray-400' : 'text-white group-hover:text-orange-400'}`}>
                        {feed.title}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {feed.keywords.slice(0, 4).map((kw, i) => (
                          <span key={i} className="text-xs bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded border border-blue-800/50">#{kw}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {feed.status === 'processed' ? (
                        <button onClick={() => router.push(`/admin/posts/edit/${feed.id}`)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-bold text-white transition">
                          👁️ View Draft
                        </button>
                      ) : (
                        <button onClick={() => handleGenerate(feed.id)} disabled={processingId === feed.id} className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 rounded-lg text-sm font-bold text-white transition">
                          {processingId === feed.id ? "Generating..." : "✨ Generate AI"}
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
    </div>
  );
}