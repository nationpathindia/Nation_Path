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

  /* Refs for race condition prevention */
  const initialHydrationRef = useRef(false);
  const autosaveCreatingRef = useRef(false);
  const manualSubmittingRef = useRef(false);
  const autosaveArticleIdRef = useRef<string | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedSnapshotRef = useRef("");
  const autosaveGenerationRef = useRef(0);
  const manualSubmitCompletedRef = useRef(false);

  const { submitPost, loading, message, error } = usePostSubmit();


  /* =====================================================
     EDIT DATA LOAD
  ===================================================== */
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

      const timer = setTimeout(() => {
        initialHydrationRef.current = true;
      }, 100);

      return () => clearTimeout(timer);
    }

    autosaveArticleIdRef.current = null;
    initialHydrationRef.current = true;
    manualSubmitCompletedRef.current = false;
    lastSavedSnapshotRef.current = "";
  }, [mode, initialData, typeFromUrl, postType]);


  /* =====================================================
     FIELD UPDATE
  ===================================================== */
  function updateField(key: keyof PostFormData, value: any) {
    setForm(prev => ({ ...prev, [key]: value }));
  }


  /* =====================================================
     ✅ ENHANCED: AI INTELLIGENCE GENERATOR (Secure API Route)
  ===================================================== */
   async function handleGenerateAIIntelligence() {
    console.log(" AI Generation STARTED");
    
    if (!form.title?.trim()) {
      setLocalError("Please enter a Title first so AI can understand the context.");
      return;
    }

    const textToAnalyze = form.content || form.shortBrief || "";
    if (!textToAnalyze.trim()) {
      setLocalError("Please add some content or notes for the AI to analyze.");
      return;
    }

    setIsGeneratingAI(true);
    setLocalError("");

    try {
      console.log(" Calling Secure API Route...");
      
      const response = await fetch('/api/ai/news/generate-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: form.title, 
          content: textToAnalyze 
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate intelligence');
      }

      const aiResult = result.data || result;
      console.log("✅ AI Result received:", aiResult);

      // Highlights mapping
      const highlightsArray = [
        `Issue: ${aiResult.keyHighlights?.issue || 'N/A'}`,
        `Location: ${aiResult.keyHighlights?.location || 'N/A'}`,
        `Authority: ${aiResult.keyHighlights?.authority || 'N/A'}`,
        `Action: ${aiResult.keyHighlights?.actionTaken || 'N/A'}`,
        `Impact: ${aiResult.keyHighlights?.impact || 'N/A'}`
      ];

      // ✅ MASTER MAPPING: Updating ALL fields at once
      setForm(prev => ({
        ...prev,
        // 1. Main Story & Content
        content: aiResult.mainStory || prev.content, 
        
        // 2. SEO Fields
        metaTitle: aiResult.seoTitle || prev.metaTitle,
        metaDescription: aiResult.metaDescription || prev.metaDescription,
        metaKeywords: aiResult.metaKeywords || prev.metaKeywords,
        slug: aiResult.urlSlug || prev.slug,

        // 3. Intelligence Fields
        shortBrief: aiResult.brief || "",
        keyHighlights: highlightsArray,
        keyTakeaways: aiResult.keyTakeaways || [],
        whyItMatters: `${aiResult.whyItMatters?.broaderImpact || ''}\n\nAnalysis: ${aiResult.whyItMatters?.objectiveAnalysis || ''}`,
        background: aiResult.whyItMatters?.broaderImpact || "",
        timeline: aiResult.timeline || [],
        factCheck: aiResult.factChecks || [],
        whatsNext: aiResult.whatsNext || "",
        faqItems: aiResult.faqs || [],
        
        // 4. AI Flags
        aiGenerated: true,
        aiVersion: "cloudflare-llama-3.1-v1"
      }));

      console.log("💾 Form state updated, triggering autosave...");
      setAutosaveMessage("✨ Full Article & SEO Generated Successfully!");
      
      setTimeout(() => {
        setAutosaveMessage(" Saving AI data...");
      }, 500);

    } catch (error: any) {
      console.error("❌ AI Generation Error:", error);
      setLocalError(error.message || "Failed to generate AI intelligence. Please try again.");
    } finally {
      setIsGeneratingAI(false);
      console.log("🔴 AI Generation FINISHED");
    }
  }


  /* =====================================================
     AUTO SLUG
  ===================================================== */
  useEffect(() => {
    if (slugLocked && form.title) {
      const slug = form.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setForm(prev => ({ ...prev, slug }));
    }
  }, [form.title, slugLocked]);


  /* =====================================================
     AUTO SEO
  ===================================================== */
  useEffect(() => {
    if (metaLocked && form.title) {
      setForm(prev => ({
        ...prev,
        metaTitle: form.title.substring(0, 60),
        metaDescription: form.shortBrief 
          ? form.shortBrief.substring(0, 160) 
          : form.title.substring(0, 160)
      }));
    }
  }, [form.title, form.shortBrief, metaLocked]);


  /* =====================================================
     LOAD CATEGORIES
  ===================================================== */
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : data?.categories || []);
      } catch (err) {
        console.error("Category loading failed", err);
        setCategories([]);
      }
    }
    loadCategories();
  }, []);


  /* =====================================================
     AI IMPORT (From Session Storage)
  ===================================================== */
  useEffect(() => {
    if (mode === "edit") return;

    const stored = sessionStorage.getItem("nationpath_ai_article");
    if (!stored) return;

    try {
      const aiArticle = JSON.parse(stored);
      setForm(prev => ({
        ...prev,
        ...aiArticle,
        postType: typeFromUrl,
        isEditorial: typeFromUrl === "editorial",
        status: "draft"
      }));
      sessionStorage.removeItem("nationpath_ai_article");
    } catch (err) {
      console.error("AI import failed", err);
    }
  }, [mode, typeFromUrl]);


  /* =====================================================
     AUTOSAVE PAYLOAD
  ===================================================== */
  function buildAutosavePayload() {
    return {
      ...form,
      postType: form.postType || typeFromUrl,
      isEditorial: typeFromUrl === "editorial" || Boolean(form.isEditorial),
      status: mode === "create" ? "draft" : form.status
    };
  }


  /* =====================================================
     AUTOSAVE ENGINE
  ===================================================== */
  useEffect(() => {
    if (manualSubmitCompletedRef.current || !initialHydrationRef.current) return;

    const hasArticleInput = Boolean(form.title?.trim()) || Boolean(form.content?.trim()) || Boolean(form.shortBrief?.trim());
    if (!hasArticleInput) return;

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
      autosaveTimerRef.current = null;
    }

    if (autosaveCreatingRef.current) return;

    const payload = buildAutosavePayload();
    const currentArticleId = autosaveArticleIdRef.current || form.id || null;
    const snapshot = JSON.stringify({ ...payload, id: currentArticleId });

    if (snapshot === lastSavedSnapshotRef.current) return;

    const generation = ++autosaveGenerationRef.current;

    autosaveTimerRef.current = setTimeout(async () => {
      if (generation !== autosaveGenerationRef.current || manualSubmitCompletedRef.current) return;

      // CREATE MODE
      if (mode === "create" && !autosaveArticleIdRef.current && !form.id) {
        if (autosaveCreatingRef.current) return;
        autosaveCreatingRef.current = true;

        try {
          setAutosaveStatus("saving");
          setAutosaveMessage("Saving draft...");

          const response = await fetch("/api/articles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data?.error || "Draft autosave failed");
          if (!data?.article?.id) throw new Error("Draft created but no ID returned");

          autosaveArticleIdRef.current = data.article.id;
          autosaveGenerationRef.current++;

          setForm(prev => ({
            ...prev,
            id: data.article.id,
            slug: data.article.slug || prev.slug,
            status: data.article.status || "draft"
          }));

          lastSavedSnapshotRef.current = JSON.stringify({
            ...payload,
            id: data.article.id,
            slug: data.article.slug || payload.slug,
            status: data.article.status || "draft"
          });

          setAutosaveStatus("saved");
          setAutosaveMessage("Draft saved");
        } catch (err: any) {
          console.error("ARTICLE AUTOSAVE ERROR", err);
          setAutosaveStatus("error");
          setAutosaveMessage(err?.message || "Autosave failed");
        } finally {
          autosaveCreatingRef.current = false;
        }
        return;
      }

      // UPDATE MODE
      const existingId = autosaveArticleIdRef.current || form.id || null;
      if (!existingId || autosaveCreatingRef.current) return;

      try {
        setAutosaveStatus("saving");
        setAutosaveMessage("Saving draft...");

        const response = await fetch(`/api/articles/${existingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, id: existingId })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Draft autosave failed");

        lastSavedSnapshotRef.current = JSON.stringify({ ...payload, id: existingId });
        setAutosaveStatus("saved");
        setAutosaveMessage("Draft saved");
      } catch (err: any) {
        console.error("ARTICLE AUTOSAVE ERROR", err);
        setAutosaveStatus("error");
        setAutosaveMessage(err?.message || "Autosave failed");
      }
    }, 2000);

    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
        autosaveTimerRef.current = null;
      }
    };
  }, [form, mode, typeFromUrl]);


  /* =====================================================
     CLEANUP
  ===================================================== */
  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
        autosaveTimerRef.current = null;
      }
      autosaveGenerationRef.current++;
    };
  }, []);


  /* =====================================================
     MANUAL SUBMIT
  ===================================================== */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (manualSubmittingRef.current || loading) return;
    if (autosaveCreatingRef.current) {
      setLocalError("Draft is being saved. Please wait a moment...");
      return;
    }

    setLocalError("");
    manualSubmittingRef.current = true;

    if (autosaveTimerRef.current) {
      clearTimeout(autosaveTimerRef.current);
      autosaveTimerRef.current = null;
    }
    autosaveGenerationRef.current++;

    try {
      const existingArticleId = autosaveArticleIdRef.current || form.id || undefined;
      const submitForm = { ...form, id: existingArticleId };
      const submitMode = existingArticleId ? "edit" : mode;

      const success = await submitPost(submitForm, submitMode);

      if (success) {
        manualSubmitCompletedRef.current = true;
        autosaveGenerationRef.current++;
        if (autosaveTimerRef.current) {
          clearTimeout(autosaveTimerRef.current);
          autosaveTimerRef.current = null;
        }
        setTimeout(() => router.push("/admin/posts"), 1000);
      }
    } finally {
      manualSubmittingRef.current = false;
    }
  }


  /* =====================================================
     UI RENDER
  ===================================================== */
  return (
    <div className="min-h-screen bg-[#050816] text-white p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {mode === "edit" ? `Edit ${typeFromUrl.toUpperCase()} Post` : `Create ${typeFromUrl.toUpperCase()} Post`}
        </h1>
        <p className="mt-2 text-orange-400">NationPath Editorial CMS</p>
      </div>

      {(message || localError) && (
        <div className="mb-5 rounded-xl border border-blue-500 bg-blue-600/20 p-4 text-blue-300">
          {message || localError}
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-xl border border-red-500 bg-red-600/20 p-4 text-red-300">
          {error}
        </div>
      )}

      <div className="mb-5 flex justify-end">
        <span className={`text-xs transition ${
          autosaveStatus === "saving" ? "text-yellow-400" :
          autosaveStatus === "saved" ? "text-green-400" :
          autosaveStatus === "error" ? "text-red-400" : "text-gray-500"
        }`}>
          {autosaveMessage}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <BasicSection form={form} updateField={updateField} slugLocked={slugLocked} setSlugLocked={setSlugLocked} />

          {/* ✅ ENHANCED: AI GENERATION TRIGGER CARD */}
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-orange-400 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  NationPath AI Intelligence
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Auto-generate Brief, Timeline, Fact-Checks, and FAQs from your content.
                </p>
              </div>
              
              <button
                type="button"
                onClick={handleGenerateAIIntelligence}
                disabled={isGeneratingAI || !form.title}
                className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-600/20"
              >
                {isGeneratingAI ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  "✨ Generate Intelligence"
                )}
              </button>
            </div>
          </div>

          <IntelligenceSection form={form} updateField={updateField} />
          
          {/* ✅ ENHANCED: MediaSection with Categories Data */}
          <MediaSection 
            form={form} 
            updateField={updateField} 
            uploading={uploading} 
            setUploading={setUploading} 
            setError={setLocalError}
            categories={categories}
          />
          
          <VideoSection form={form} updateField={updateField} />
          <FAQSection form={form} updateField={updateField} />
        </div>

        <div className="space-y-6">
          <PublishSection form={form} updateField={updateField} categories={categories} />
          <ControlsSection form={form} updateField={updateField} />
          <SEOSection form={form} updateField={updateField} metaLocked={metaLocked} setMetaLocked={setMetaLocked} />

          <button
            type="submit"
            disabled={loading || manualSubmittingRef.current}
            className="w-full rounded-xl bg-orange-600 py-4 font-semibold transition hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? (mode === "edit" ? "Updating..." : "Saving...") : (mode === "edit" ? "Update Post" : "Create Post")}
          </button>
        </div>
      </form>
    </div>
  );
}