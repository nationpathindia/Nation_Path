// components/admin/posts/ArticleForm.tsx

"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  createDefaultPost,
} from "./createDefaultPost";

import type {
  PostFormData,
} from "./types";

import {
  usePostSubmit,
} from "./hooks/usePostSubmit";

import BasicSection from "./sections/BasicSection";
import MediaSection from "./sections/MediaSection";
import VideoSection from "./sections/VideoSection";
import IntelligenceSection from "./sections/IntelligenceSection";
import FAQSection from "./sections/FAQSection";
import PublishSection from "./sections/PublishSection";
import ControlsSection from "./sections/ControlsSection";
import SEOSection from "./sections/SEOSection";


interface ArticleFormProps {
  mode?: "create" | "edit";
  initialData?: Partial<PostFormData>;
  postType?: "news" | "editorial";
}

const AI_MODULES = [
  { id: 'mainStory', title: 'Main Story', desc: 'Deep analysis with integrated official statements', default: true },
  { id: 'background', title: 'Background', desc: 'Historical context & previous events', default: true },
  { id: 'expertOpinion', title: 'Expert Opinion', desc: 'Analysis from experts & analysts', default: true },
  { id: 'brief', title: 'Brief', desc: 'Sharp 80-word summary', default: true },
  { id: 'keyTakeaways', title: 'Key Takeaways', desc: '3-5 data-driven bullet points', default: true },
  { id: 'keyHighlights', title: 'Key Highlights', desc: 'Structured: Issue, Location, Authority, Action, Impact', default: true },
  { id: 'whyItMatters', title: 'Why It Matters', desc: 'Broader impact & objective analysis', default: true },
  { id: 'whatsNext', title: "What's Next", desc: 'Upcoming developments & timelines', default: true },
  { id: 'timeline', title: 'Timeline', desc: 'Historical context & chronological events', default: false },
  { id: 'factChecks', title: 'Fact-Check', desc: 'Verify claims & allegations', default: false },
  { id: 'faqs', title: 'FAQs', desc: '3-5 practical reader questions', default: true },
  { id: 'suggestedCategory', title: 'Auto Category', desc: 'AI-suggested category & sub-category', default: true },
  { id: 'seo', title: 'SEO Metadata', desc: 'Title, Description, Keywords, Slug', default: true },
];


export default function ArticleForm({
  mode = "create",
  initialData,
  postType
}: ArticleFormProps) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const typeFromUrl = (postType || searchParams.get("type") || "news") as "news" | "editorial";

  const [form, setForm] = useState<PostFormData>(createDefaultPost(typeFromUrl));
  const [categories, setCategories] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [slugLocked, setSlugLocked] = useState(mode === "create");
  const [metaLocked, setMetaLocked] = useState(mode === "create");
  
  const [autosaveStatus, setAutosaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [autosaveMessage, setAutosaveMessage] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [aiPreviewData, setAiPreviewData] = useState<any>(null);
  const [selectedModules, setSelectedModules] = useState<Record<string, boolean>>(
    AI_MODULES.reduce((acc, mod) => ({ ...acc, [mod.id]: mod.default }), {})
  );

  const [activeSection, setActiveSection] = useState('mainStory');

  const initialHydrationRef = useRef(false);
  const autosaveCreatingRef = useRef(false);
  const manualSubmittingRef = useRef(false);
  const autosaveArticleIdRef = useRef<string | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedSnapshotRef = useRef("");
  const autosaveGenerationRef = useRef(0);
  const manualSubmitCompletedRef = useRef(false);

  const { submitPost, loading, message, error } = usePostSubmit();

  // ✅ ESC Key Listener to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreviewModalOpen) {
        setIsPreviewModalOpen(false);
        setAiPreviewData(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isPreviewModalOpen]);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      initialHydrationRef.current = false;
      autosaveArticleIdRef.current = initialData.id || null;

      setForm(prev => ({
        ...prev,
        ...createDefaultPost(initialData.postType || typeFromUrl),
        ...initialData,
        id: initialData.id,
        postType: postType || initialData.postType || typeFromUrl,
        isEditorial: (postType || initialData.postType || typeFromUrl) === "editorial"
      }));

      const timer = setTimeout(() => { initialHydrationRef.current = true; }, 100);
      return () => clearTimeout(timer);
    }
    autosaveArticleIdRef.current = null;
    initialHydrationRef.current = true;
    manualSubmitCompletedRef.current = false;
    lastSavedSnapshotRef.current = "";
  }, [mode, initialData, typeFromUrl, postType]);

  function updateField(key: keyof PostFormData, value: any) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function toggleModule(moduleId: string) {
    setSelectedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  }

  function handleOpenModuleSelection() {
    if (!form.title?.trim()) {
      setLocalError("Please enter a Title first so AI can understand the context.");
      return;
    }
    const textToAnalyze = form.content || form.shortBrief || "";
    if (!textToAnalyze.trim()) {
      setLocalError("Please add some content or notes for the AI to analyze.");
      return;
    }
    setLocalError("");
    setIsPreviewModalOpen(true);
  }

  async function handleGenerateAIIntelligence() {
    const textToAnalyze = form.content || form.shortBrief || "";
    const modulesToGenerate = Object.entries(selectedModules)
      .filter(([_, isSelected]) => isSelected)
      .map(([moduleId, _]) => moduleId);

    if (modulesToGenerate.length === 0) {
      setLocalError("Please select at least one module to generate.");
      return;
    }

    setIsGeneratingAI(true);
    setLocalError("");

    try {
      const response = await fetch('/api/ai/news/generate-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: form.title, content: textToAnalyze, modulesToGenerate })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Failed to generate intelligence');

      const aiResult = result.data || result;
      setAiPreviewData(aiResult);
    } catch (error: any) {
      console.error("❌ AI Generation Error:", error);
      setLocalError(error.message || "Failed to generate AI intelligence.");
    } finally {
      setIsGeneratingAI(false);
    }
  }

  function handleProcessForDraft() {
    if (!aiPreviewData) return;

    const highlightsArray = aiPreviewData.keyHighlights ? [
      `Issue: ${aiPreviewData.keyHighlights.issue || 'N/A'}`,
      `Location: ${aiPreviewData.keyHighlights.location || 'N/A'}`,
      `Authority: ${aiPreviewData.keyHighlights.authority || 'N/A'}`,
      `Action: ${aiPreviewData.keyHighlights.actionTaken || 'N/A'}`,
      `Impact: ${aiPreviewData.keyHighlights.impact || 'N/A'}`
    ] : [];

    const expertOpinionString = aiPreviewData.expertOpinion?.length > 0
      ? aiPreviewData.expertOpinion.map((exp: any) => `${exp.expert || 'Expert'} (${exp.designation || 'Analyst'}): "${exp.quote}"`).join('\n\n')
      : '';

    let matchedCategoryId = form.category;
    if (aiPreviewData.suggestedCategory && categories.length > 0) {
      const matchedCat = categories.find(c => 
        c.name?.toLowerCase() === aiPreviewData.suggestedCategory.toLowerCase() ||
        c.slug?.toLowerCase() === aiPreviewData.suggestedCategory.toLowerCase().replace(/\s+/g, '-')
      );
      if (matchedCat) matchedCategoryId = matchedCat._id || matchedCat.id || matchedCat.value;
    }

    setForm(prev => ({
      ...prev,
      content: aiPreviewData.mainStory || prev.content,
      background: aiPreviewData.background || prev.background,
      category: matchedCategoryId,
      metaTitle: aiPreviewData.seoTitle || prev.metaTitle,
      metaDescription: aiPreviewData.metaDescription || prev.metaDescription,
      metaKeywords: aiPreviewData.metaKeywords || prev.metaKeywords,
      slug: aiPreviewData.urlSlug ? aiPreviewData.urlSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : prev.slug,
      shortBrief: aiPreviewData.brief || prev.shortBrief,
      keyHighlights: highlightsArray.length > 0 ? highlightsArray : prev.keyHighlights,
      keyTakeaways: aiPreviewData.keyTakeaways || prev.keyTakeaways,
      whyItMatters: aiPreviewData.whyItMatters ? `${aiPreviewData.whyItMatters.broaderImpact || ''}\n\nAnalysis: ${aiPreviewData.whyItMatters.objectiveAnalysis || ''}` : prev.whyItMatters,
      timeline: aiPreviewData.timeline || prev.timeline,
      factCheck: aiPreviewData.factChecks || prev.factCheck,
      whatsNext: aiPreviewData.whatsNext || prev.whatsNext,
      faqItems: aiPreviewData.faqs || prev.faqItems,
      aiGenerated: true,
      aiVersion: "cloudflare-llama-3.1-v1",
      ...(expertOpinionString && { expertOpinion: expertOpinionString })
    }));

    setAutosaveMessage("✨ AI data committed to form. Saving draft...");
    setIsPreviewModalOpen(false);
    setAiPreviewData(null);
    setTimeout(() => setAutosaveMessage("Draft saved successfully!"), 2000);
  }

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`preview-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (slugLocked && form.title) {
      const slug = form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      setForm(prev => ({ ...prev, slug }));
    }
  }, [form.title, slugLocked]);

  useEffect(() => {
    if (metaLocked && form.title) {
      setForm(prev => ({
        ...prev,
        metaTitle: form.title.substring(0, 60),
        metaDescription: form.shortBrief ? form.shortBrief.substring(0, 160) : form.title.substring(0, 160)
      }));
    }
  }, [form.title, form.shortBrief, metaLocked]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : data?.categories || []);
      } catch (err) { setCategories([]); }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (mode === "edit") return;
    const stored = sessionStorage.getItem("nationpath_ai_article");
    if (!stored) return;
    try {
      const aiArticle = JSON.parse(stored);
      setForm(prev => ({ ...prev, ...aiArticle, postType: typeFromUrl, isEditorial: typeFromUrl === "editorial", status: "draft" }));
      sessionStorage.removeItem("nationpath_ai_article");
    } catch (err) { console.error("AI import failed", err); }
  }, [mode, typeFromUrl]);

  function buildAutosavePayload() {
    return { ...form, postType: form.postType || typeFromUrl, isEditorial: typeFromUrl === "editorial" || Boolean(form.isEditorial), status: mode === "create" ? "draft" : form.status };
  }

  useEffect(() => {
    if (manualSubmitCompletedRef.current || !initialHydrationRef.current) return;
    const hasArticleInput = Boolean(form.title?.trim()) || Boolean(form.content?.trim()) || Boolean(form.shortBrief?.trim());
    if (!hasArticleInput) return;
    if (autosaveTimerRef.current) { clearTimeout(autosaveTimerRef.current); autosaveTimerRef.current = null; }
    if (autosaveCreatingRef.current) return;

    const payload = buildAutosavePayload();
    const currentArticleId = autosaveArticleIdRef.current || form.id || null;
    const snapshot = JSON.stringify({ ...payload, id: currentArticleId });
    if (snapshot === lastSavedSnapshotRef.current) return;
    const generation = ++autosaveGenerationRef.current;

    autosaveTimerRef.current = setTimeout(async () => {
      if (generation !== autosaveGenerationRef.current || manualSubmitCompletedRef.current) return;

      if (mode === "create" && !autosaveArticleIdRef.current && !form.id) {
        if (autosaveCreatingRef.current) return;
        autosaveCreatingRef.current = true;
        try {
          setAutosaveStatus("saving"); setAutosaveMessage("Saving draft...");
          const response = await fetch("/api/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
          const data = await response.json();
          if (!response.ok) throw new Error(data?.error || "Draft autosave failed");
          if (!data?.article?.id) throw new Error("Draft created but no ID returned");

          autosaveArticleIdRef.current = data.article.id; autosaveGenerationRef.current++;
          setForm(prev => ({ ...prev, id: data.article.id, slug: data.article.slug || prev.slug, status: data.article.status || "draft" }));
          lastSavedSnapshotRef.current = JSON.stringify({ ...payload, id: data.article.id, slug: data.article.slug || payload.slug, status: data.article.status || "draft" });
          setAutosaveStatus("saved"); setAutosaveMessage("Draft saved");
        } catch (err: any) { console.error("AUTOSAVE ERROR", err); setAutosaveStatus("error"); setAutosaveMessage(err?.message || "Autosave failed"); }
        finally { autosaveCreatingRef.current = false; }
        return;
      }

      const existingId = autosaveArticleIdRef.current || form.id || null;
      if (!existingId || autosaveCreatingRef.current) return;
      try {
        setAutosaveStatus("saving"); setAutosaveMessage("Saving draft...");
        const response = await fetch(`/api/articles/${existingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, id: existingId }) });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Draft autosave failed");
        lastSavedSnapshotRef.current = JSON.stringify({ ...payload, id: existingId });
        setAutosaveStatus("saved"); setAutosaveMessage("Draft saved");
      } catch (err: any) { console.error("AUTOSAVE ERROR", err); setAutosaveStatus("error"); setAutosaveMessage(err?.message || "Autosave failed"); }
    }, 2000);

    return () => { if (autosaveTimerRef.current) { clearTimeout(autosaveTimerRef.current); autosaveTimerRef.current = null; } };
  }, [form, mode, typeFromUrl]);

  useEffect(() => {
    return () => { if (autosaveTimerRef.current) { clearTimeout(autosaveTimerRef.current); autosaveTimerRef.current = null; } autosaveGenerationRef.current++; };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (manualSubmittingRef.current || loading) return;
    if (autosaveCreatingRef.current) { setLocalError("Draft is being saved. Please wait..."); return; }
    setLocalError(""); manualSubmittingRef.current = true;
    if (autosaveTimerRef.current) { clearTimeout(autosaveTimerRef.current); autosaveTimerRef.current = null; }
    autosaveGenerationRef.current++;

    try {
      const existingArticleId = autosaveArticleIdRef.current || form.id || undefined;
      const submitForm = { ...form, id: existingArticleId };
      const submitMode = existingArticleId ? "edit" : mode;
      const success = await submitPost(submitForm, submitMode);
      if (success) {
        manualSubmitCompletedRef.current = true; autosaveGenerationRef.current++;
        if (autosaveTimerRef.current) { clearTimeout(autosaveTimerRef.current); autosaveTimerRef.current = null; }
        setTimeout(() => router.push("/admin/posts"), 1000);
      }
    } finally { manualSubmittingRef.current = false; }
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{mode === "edit" ? `Edit ${typeFromUrl.toUpperCase()} Post` : `Create ${typeFromUrl.toUpperCase()} Post`}</h1>
        <p className="mt-2 text-orange-400">NationPath Editorial CMS</p>
      </div>

      {(message || localError) && (
        <div className="mb-5 rounded-xl border border-blue-500 bg-blue-600/20 p-4 text-blue-300">{message || localError}</div>
      )}
      {error && (
        <div className="mb-5 rounded-xl border border-red-500 bg-red-600/20 p-4 text-red-300">{error}</div>
      )}

      <div className="mb-5 flex justify-end">
        <span className={`text-xs transition ${autosaveStatus === "saving" ? "text-yellow-400" : autosaveStatus === "saved" ? "text-green-400" : autosaveStatus === "error" ? "text-red-400" : "text-gray-500"}`}>
          {autosaveMessage}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <BasicSection form={form} updateField={updateField} slugLocked={slugLocked} setSlugLocked={setSlugLocked} />
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-orange-400 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  NationPath AI Intelligence
                </h3>
                <p className="text-sm text-gray-400 mt-1">Generate modular intelligence with preview before committing.</p>
              </div>
              <button type="button" onClick={handleOpenModuleSelection} disabled={isGeneratingAI || !form.title} className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-600/20">
                {isGeneratingAI ? (<><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Generating...</>) : ("✨ Generate Intelligence")}
              </button>
            </div>
          </div>
          <IntelligenceSection form={form} updateField={updateField} />
          <MediaSection form={form} updateField={updateField} uploading={uploading} setUploading={setUploading} setError={setLocalError} categories={categories} />
          <VideoSection form={form} updateField={updateField} />
          <FAQSection form={form} updateField={updateField} />
        </div>

        <div className="space-y-6">
          <PublishSection form={form} updateField={updateField} categories={categories} />
          <ControlsSection form={form} updateField={updateField} />
          <SEOSection form={form} updateField={updateField} metaLocked={metaLocked} setMetaLocked={setMetaLocked} />
          <button type="submit" disabled={loading || manualSubmittingRef.current} className="w-full rounded-xl bg-orange-600 py-4 font-semibold transition hover:bg-orange-700 disabled:opacity-50">
            {loading ? (mode === "edit" ? "Updating..." : "Saving...") : (mode === "edit" ? "Update Post" : "Create Post")}
          </button>
        </div>
      </form>

      {/* ✅ PRO SOFTWARE UI MODAL */}
      {isPreviewModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => { setIsPreviewModalOpen(false); setAiPreviewData(null); }}
        >
          <div 
            className="bg-[#0a0f1e] border border-orange-500/30 rounded-2xl max-w-6xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-orange-500/20 flex items-center justify-between bg-[#0a0f1e]">
              <div>
                <h2 className="text-xl font-bold text-orange-400 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  AI Intelligence Preview
                </h2>
                <p className="text-sm text-gray-400 mt-1">Review generated content before processing for draft</p>
              </div>
              <button 
                onClick={() => { setIsPreviewModalOpen(false); setAiPreviewData(null); }} 
                className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white"
                title="Close (ESC)"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 flex overflow-hidden">
              
              {!aiPreviewData ? (
                isGeneratingAI ? (
                  // ✅ PREMIUM ANIMATED LOADING STATE
                  <div className="flex flex-col items-center justify-center h-full w-full py-16 space-y-8 bg-[#0a0f1e]">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-8 h-8 text-orange-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-white">AI is crafting your article...</h3>
                      <p className="text-sm text-gray-400 max-w-md">Analyzing context, drafting sections, and optimizing SEO. Please wait a few seconds.</p>
                    </div>

                    <div className="w-full max-w-md space-y-3 px-4">
                      <div className="h-2 bg-gray-700/50 rounded-full animate-pulse w-3/4 mx-auto"></div>
                      <div className="h-2 bg-gray-700/50 rounded-full animate-pulse w-1/2 mx-auto opacity-75"></div>
                      <div className="h-2 bg-gray-700/50 rounded-full animate-pulse w-5/6 mx-auto opacity-50"></div>
                    </div>
                  </div>
                ) : (
                  // ✅ MODULE SELECTION UI
                  <div className="flex-1 overflow-y-auto p-6">
                    <h3 className="text-lg font-semibold mb-4 text-white">Select Modules to Generate</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {AI_MODULES.map((mod) => (
                        <div key={mod.id} onClick={() => toggleModule(mod.id)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedModules[mod.id] ? 'border-orange-500 bg-orange-500/10' : 'border-gray-700 bg-white/5 hover:border-gray-600'}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${selectedModules[mod.id] ? 'border-orange-500 bg-orange-500' : 'border-gray-600'}`}>
                              {selectedModules[mod.id] && <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm text-white">{mod.title}</h4>
                              <p className="text-xs text-gray-400 mt-1">{mod.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <>
                  {/* Left Sidebar Navigation */}
                  <div className="w-64 border-r border-gray-800 bg-[#0d1220] flex flex-col overflow-y-auto hidden md:flex">
                    <div className="p-4 border-b border-gray-800">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Navigation</h3>
                    </div>
                    <nav className="flex-1 p-2 space-y-1">
                      {aiPreviewData.mainStory && <button onClick={() => scrollToSection('mainStory')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'mainStory' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>📝 Main Story</button>}
                      {aiPreviewData.brief && <button onClick={() => scrollToSection('brief')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'brief' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>⚡ Brief</button>}
                      {aiPreviewData.keyHighlights && <button onClick={() => scrollToSection('keyHighlights')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'keyHighlights' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>⭐ Key Highlights</button>}
                      {aiPreviewData.keyTakeaways?.length > 0 && <button onClick={() => scrollToSection('keyTakeaways')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'keyTakeaways' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>💡 Key Takeaways</button>}
                      {aiPreviewData.whyItMatters && <button onClick={() => scrollToSection('whyItMatters')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'whyItMatters' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🌍 Why It Matters</button>}
                      {aiPreviewData.background && <button onClick={() => scrollToSection('background')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'background' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}> Background</button>}
                      {aiPreviewData.expertOpinion?.length > 0 && <button onClick={() => scrollToSection('expertOpinion')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'expertOpinion' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🎙️ Expert Opinion</button>}
                      {aiPreviewData.timeline?.length > 0 && <button onClick={() => scrollToSection('timeline')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'timeline' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>📅 Timeline</button>}
                      {aiPreviewData.factChecks?.length > 0 && <button onClick={() => scrollToSection('factChecks')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'factChecks' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🔍 Fact Checks</button>}
                      {aiPreviewData.faqs?.length > 0 && <button onClick={() => scrollToSection('faqs')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'faqs' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>❓ FAQs</button>}
                      {aiPreviewData.seoTitle && <button onClick={() => scrollToSection('seo')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'seo' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🔎 SEO Metadata</button>}
                    </nav>
                  </div>

                  {/* Right Scrollable Content Area */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth bg-[#0a0f1e]">
                    
                    {aiPreviewData.mainStory && (
                      <div id="preview-mainStory" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">📝</span> Main Story</h3>
                        <div className="bg-white/5 rounded-xl p-5 text-sm leading-relaxed text-gray-200 border border-gray-800" dangerouslySetInnerHTML={{ __html: aiPreviewData.mainStory }} />
                      </div>
                    )}

                    {aiPreviewData.brief && (
                      <div id="preview-brief" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">⚡</span> Brief</h3>
                        <p className="bg-white/5 rounded-xl p-5 text-sm text-gray-200 border border-gray-800">{aiPreviewData.brief}</p>
                      </div>
                    )}

                    {aiPreviewData.keyHighlights && (
                      <div id="preview-keyHighlights" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">⭐</span> Key Highlights</h3>
                        <div className="bg-white/5 rounded-xl p-5 space-y-3 border border-gray-800">
                          {aiPreviewData.keyHighlights.issue && <div className="text-sm"><span className="text-gray-400 font-semibold">Issue:</span> <span className="text-white">{aiPreviewData.keyHighlights.issue}</span></div>}
                          {aiPreviewData.keyHighlights.location && <div className="text-sm"><span className="text-gray-400 font-semibold">Location:</span> <span className="text-white">{aiPreviewData.keyHighlights.location}</span></div>}
                          {aiPreviewData.keyHighlights.authority && <div className="text-sm"><span className="text-gray-400 font-semibold">Authority:</span> <span className="text-white">{aiPreviewData.keyHighlights.authority}</span></div>}
                          {aiPreviewData.keyHighlights.actionTaken && <div className="text-sm"><span className="text-gray-400 font-semibold">Action Taken:</span> <span className="text-white">{aiPreviewData.keyHighlights.actionTaken}</span></div>}
                          {aiPreviewData.keyHighlights.impact && <div className="text-sm"><span className="text-gray-400 font-semibold">Impact:</span> <span className="text-white">{aiPreviewData.keyHighlights.impact}</span></div>}
                        </div>
                      </div>
                    )}

                    {aiPreviewData.keyTakeaways?.length > 0 && (
                      <div id="preview-keyTakeaways" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">💡</span> Key Takeaways</h3>
                        <ul className="bg-white/5 rounded-xl p-5 space-y-3 border border-gray-800">
                          {aiPreviewData.keyTakeaways.map((takeaway: string, idx: number) => (
                            <li key={idx} className="text-sm flex items-start gap-3 text-gray-200">
                              <span className="text-orange-400 font-bold mt-0.5">{idx + 1}.</span>
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {aiPreviewData.whyItMatters && (
                      <div id="preview-whyItMatters" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl"></span> Why It Matters</h3>
                        <div className="bg-white/5 rounded-xl p-5 space-y-4 border border-gray-800">
                          {aiPreviewData.whyItMatters.broaderImpact && (
                            <div>
                              <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide font-semibold">Broader Impact</div>
                              <div className="text-sm text-gray-200">{aiPreviewData.whyItMatters.broaderImpact}</div>
                            </div>
                          )}
                          {aiPreviewData.whyItMatters.objectiveAnalysis && (
                            <div>
                              <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide font-semibold">Objective Analysis</div>
                              <div className="text-sm text-gray-200">{aiPreviewData.whyItMatters.objectiveAnalysis}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {aiPreviewData.background && (
                      <div id="preview-background" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">📜</span> Background / Context</h3>
                        <div className="bg-white/5 rounded-xl p-5 text-sm leading-relaxed text-gray-200 border border-gray-800">{aiPreviewData.background}</div>
                      </div>
                    )}

                    {aiPreviewData.expertOpinion?.length > 0 && (
                      <div id="preview-expertOpinion" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">🎙️</span> Expert Opinions</h3>
                        <div className="space-y-3">
                          {aiPreviewData.expertOpinion.map((exp: any, idx: number) => (
                            <div key={idx} className="bg-white/5 rounded-xl p-5 border-l-4 border-orange-500 border border-gray-800">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="font-bold text-sm text-white">{exp.expert || 'Expert'}</div>
                                {exp.designation && <div className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded">({exp.designation})</div>}
                              </div>
                              <div className="text-sm italic text-gray-300">"{exp.quote}"</div>
                              {exp.perspective && <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-700">{exp.perspective}</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {aiPreviewData.timeline?.length > 0 && (
                      <div id="preview-timeline" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">📅</span> Timeline</h3>
                        <div className="bg-white/5 rounded-xl p-5 space-y-4 border border-gray-800">
                          {aiPreviewData.timeline.map((item: any, idx: number) => (
                            <div key={idx} className="flex gap-4 border-b border-gray-700 pb-3 last:border-0 last:pb-0">
                              <div className="text-orange-400 font-bold text-sm w-24 flex-shrink-0">{item.year}</div>
                              <div className="flex-1">
                                <div className="font-semibold text-sm text-white">{item.title}</div>
                                <div className="text-xs text-gray-400 mt-1">{item.description}</div>
                                <div className="text-xs text-orange-400 mt-1 uppercase">{item.status}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {aiPreviewData.factChecks?.length > 0 && (
                      <div id="preview-factChecks" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">🔍</span> Fact-Checks</h3>
                        <div className="bg-white/5 rounded-xl p-5 space-y-4 border border-gray-800">
                          {aiPreviewData.factChecks.map((fc: any, idx: number) => (
                            <div key={idx} className="border-l-4 border-orange-500 pl-4 py-1">
                              <div className="font-semibold text-sm text-white">{fc.claim}</div>
                              <div className={`text-xs font-bold mt-1 uppercase ${fc.verdict === 'VERIFIED' ? 'text-green-400' : fc.verdict === 'FALSE' ? 'text-red-400' : fc.verdict === 'MISLEADING' ? 'text-yellow-400' : 'text-gray-400'}`}>{fc.verdict}</div>
                              <div className="text-xs text-gray-400 mt-1">{fc.explanation}</div>
                              <div className="text-xs text-orange-400 mt-1">Source: {fc.source}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {aiPreviewData.faqs?.length > 0 && (
                      <div id="preview-faqs" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">❓</span> FAQs</h3>
                        <div className="bg-white/5 rounded-xl p-5 space-y-4 border border-gray-800">
                          {aiPreviewData.faqs.map((faq: any, idx: number) => (
                            <div key={idx} className="pb-3 border-b border-gray-700 last:border-0 last:pb-0">
                              <div className="font-bold text-sm text-white">Q: {faq.question}</div>
                              <div className="text-sm text-gray-300 mt-2 pl-3 border-l-2 border-gray-600">A: {faq.answer}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {aiPreviewData.seoTitle && (
                      <div id="preview-seo" className="scroll-mt-4">
                        <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl"></span> SEO Metadata</h3>
                        <div className="bg-white/5 rounded-xl p-5 space-y-3 text-sm border border-gray-800">
                          <div><span className="text-gray-400 font-semibold w-24 inline-block">Title:</span> <span className="text-white">{aiPreviewData.seoTitle}</span></div>
                          <div><span className="text-gray-400 font-semibold w-24 inline-block">Desc:</span> <span className="text-white">{aiPreviewData.metaDescription}</span></div>
                          <div><span className="text-gray-400 font-semibold w-24 inline-block">Keywords:</span> <span className="text-white">{aiPreviewData.metaKeywords}</span></div>
                          <div><span className="text-gray-400 font-semibold w-24 inline-block">Slug:</span> <span className="text-orange-400">{aiPreviewData.urlSlug}</span></div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Sticky Modal Footer */}
            <div className="px-6 py-4 border-t border-orange-500/20 flex items-center justify-end gap-3 bg-[#0a0f1e]">
              {!aiPreviewData ? (
                <>
                  <button onClick={() => { setIsPreviewModalOpen(false); setAiPreviewData(null); }} className="px-5 py-2.5 rounded-lg border border-gray-700 hover:bg-white/5 transition text-gray-300">Cancel</button>
                  <button onClick={handleGenerateAIIntelligence} disabled={isGeneratingAI || Object.values(selectedModules).filter(Boolean).length === 0} className="px-5 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-white font-semibold">
                    {isGeneratingAI ? (<><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Generating...</>) : (`Generate ${Object.values(selectedModules).filter(Boolean).length} Modules`)}
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setAiPreviewData(null)} className="px-5 py-2.5 rounded-lg border border-gray-700 hover:bg-white/5 transition text-gray-300">Back to Selection</button>
                  <button onClick={handleProcessForDraft} className="px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 transition font-bold text-white shadow-lg shadow-orange-600/20 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Review & Process for Draft
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