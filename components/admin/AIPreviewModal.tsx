// components/admin/AIPreviewModal.tsx
"use client";

import { useState } from "react";

interface AIPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onApprove: () => void;
  isSaving: boolean;
}

export default function AIPreviewModal({ isOpen, onClose, data, onApprove, isSaving }: AIPreviewModalProps) {
  const [activeSection, setActiveSection] = useState('mainStory');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(`preview-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0a0f1e] border border-orange-500/30 rounded-2xl max-w-6xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-orange-500/20 flex items-center justify-between bg-[#0a0f1e]">
          <div>
            <h2 className="text-xl font-bold text-orange-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              AI Intelligence Preview
            </h2>
            <p className="text-sm text-gray-400 mt-1">Review generated content before saving to database</p>
          </div>
          <button onClick={onClose} disabled={isSaving} className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Modal Body: Sidebar + Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar Navigation */}
          <div className="w-64 border-r border-gray-800 bg-[#0d1220] flex flex-col overflow-y-auto hidden md:flex">
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Navigation</h3>
            </div>
            <nav className="flex-1 p-2 space-y-1">
              {data.mainStory && <button onClick={() => scrollToSection('mainStory')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'mainStory' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>📝 Main Story</button>}
              {data.brief && <button onClick={() => scrollToSection('brief')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'brief' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>⚡ Brief</button>}
              {data.keyHighlights && <button onClick={() => scrollToSection('keyHighlights')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'keyHighlights' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>⭐ Key Highlights</button>}
              {data.keyTakeaways?.length > 0 && <button onClick={() => scrollToSection('keyTakeaways')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'keyTakeaways' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>💡 Key Takeaways</button>}
              {data.whyItMatters && <button onClick={() => scrollToSection('whyItMatters')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'whyItMatters' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🌍 Why It Matters</button>}
              {data.background && <button onClick={() => scrollToSection('background')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'background' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>📜 Background</button>}
              {data.expertOpinion?.length > 0 && <button onClick={() => scrollToSection('expertOpinion')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'expertOpinion' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🎙️ Expert Opinion</button>}
              {data.timeline?.length > 0 && <button onClick={() => scrollToSection('timeline')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'timeline' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>📅 Timeline</button>}
              {data.factChecks?.length > 0 && <button onClick={() => scrollToSection('factChecks')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'factChecks' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🔍 Fact Checks</button>}
              {data.faqs?.length > 0 && <button onClick={() => scrollToSection('faqs')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'faqs' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>❓ FAQs</button>}
              {data.seoTitle && <button onClick={() => scrollToSection('seo')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${activeSection === 'seo' ? 'bg-orange-500/20 text-orange-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>🔎 SEO Metadata</button>}
            </nav>
          </div>

          {/* Right Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth bg-[#0a0f1e]">
            {data.mainStory && (
              <div id="preview-mainStory" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">📝</span> Main Story</h3>
                <div className="bg-white/5 rounded-xl p-5 text-sm leading-relaxed text-gray-200 border border-gray-800" dangerouslySetInnerHTML={{ __html: data.mainStory }} />
              </div>
            )}
            {data.brief && (
              <div id="preview-brief" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">⚡</span> Brief</h3>
                <p className="bg-white/5 rounded-xl p-5 text-sm text-gray-200 border border-gray-800">{data.brief}</p>
              </div>
            )}
            {data.keyHighlights && (
              <div id="preview-keyHighlights" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">⭐</span> Key Highlights</h3>
                <div className="bg-white/5 rounded-xl p-5 space-y-3 border border-gray-800">
                  {data.keyHighlights.issue && <div className="text-sm"><span className="text-gray-400 font-semibold">Issue:</span> <span className="text-white">{data.keyHighlights.issue}</span></div>}
                  {data.keyHighlights.location && <div className="text-sm"><span className="text-gray-400 font-semibold">Location:</span> <span className="text-white">{data.keyHighlights.location}</span></div>}
                  {data.keyHighlights.authority && <div className="text-sm"><span className="text-gray-400 font-semibold">Authority:</span> <span className="text-white">{data.keyHighlights.authority}</span></div>}
                  {data.keyHighlights.actionTaken && <div className="text-sm"><span className="text-gray-400 font-semibold">Action Taken:</span> <span className="text-white">{data.keyHighlights.actionTaken}</span></div>}
                  {data.keyHighlights.impact && <div className="text-sm"><span className="text-gray-400 font-semibold">Impact:</span> <span className="text-white">{data.keyHighlights.impact}</span></div>}
                </div>
              </div>
            )}
            {data.keyTakeaways?.length > 0 && (
              <div id="preview-keyTakeaways" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">💡</span> Key Takeaways</h3>
                <ul className="bg-white/5 rounded-xl p-5 space-y-3 border border-gray-800">
                  {data.keyTakeaways.map((takeaway: string, idx: number) => (
                    <li key={idx} className="text-sm flex items-start gap-3 text-gray-200">
                      <span className="text-orange-400 font-bold mt-0.5">{idx + 1}.</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.whyItMatters && (
              <div id="preview-whyItMatters" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">🌍</span> Why It Matters</h3>
                <div className="bg-white/5 rounded-xl p-5 space-y-4 border border-gray-800">
                  {data.whyItMatters.broaderImpact && <div><div className="text-xs text-gray-400 mb-1 uppercase tracking-wide font-semibold">Broader Impact</div><div className="text-sm text-gray-200">{data.whyItMatters.broaderImpact}</div></div>}
                  {data.whyItMatters.objectiveAnalysis && <div><div className="text-xs text-gray-400 mb-1 uppercase tracking-wide font-semibold">Objective Analysis</div><div className="text-sm text-gray-200">{data.whyItMatters.objectiveAnalysis}</div></div>}
                </div>
              </div>
            )}
            {data.background && (
              <div id="preview-background" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">📜</span> Background / Context</h3>
                <div className="bg-white/5 rounded-xl p-5 text-sm leading-relaxed text-gray-200 border border-gray-800">{data.background}</div>
              </div>
            )}
            {data.expertOpinion?.length > 0 && (
              <div id="preview-expertOpinion" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">🎙️</span> Expert Opinions</h3>
                <div className="space-y-3">
                  {data.expertOpinion.map((exp: any, idx: number) => (
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
            {data.timeline?.length > 0 && (
              <div id="preview-timeline" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">📅</span> Timeline</h3>
                <div className="bg-white/5 rounded-xl p-5 space-y-4 border border-gray-800">
                  {data.timeline.map((item: any, idx: number) => (
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
            {data.factChecks?.length > 0 && (
              <div id="preview-factChecks" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">🔍</span> Fact-Checks</h3>
                <div className="bg-white/5 rounded-xl p-5 space-y-4 border border-gray-800">
                  {data.factChecks.map((fc: any, idx: number) => (
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
            {data.faqs?.length > 0 && (
              <div id="preview-faqs" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">❓</span> FAQs</h3>
                <div className="bg-white/5 rounded-xl p-5 space-y-4 border border-gray-800">
                  {data.faqs.map((faq: any, idx: number) => (
                    <div key={idx} className="pb-3 border-b border-gray-700 last:border-0 last:pb-0">
                      <div className="font-bold text-sm text-white">Q: {faq.question}</div>
                      <div className="text-sm text-gray-300 mt-2 pl-3 border-l-2 border-gray-600">A: {faq.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.seoTitle && (
              <div id="preview-seo" className="scroll-mt-4">
                <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2"><span className="text-xl">🔎</span> SEO Metadata</h3>
                <div className="bg-white/5 rounded-xl p-5 space-y-3 text-sm border border-gray-800">
                  <div><span className="text-gray-400 font-semibold w-24 inline-block">Title:</span> <span className="text-white">{data.seoTitle}</span></div>
                  <div><span className="text-gray-400 font-semibold w-24 inline-block">Desc:</span> <span className="text-white">{data.metaDescription}</span></div>
                  <div><span className="text-gray-400 font-semibold w-24 inline-block">Keywords:</span> <span className="text-white">{data.metaKeywords}</span></div>
                  <div><span className="text-gray-400 font-semibold w-24 inline-block">Slug:</span> <span className="text-orange-400">{data.urlSlug}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Modal Footer */}
        <div className="px-6 py-4 border-t border-orange-500/20 flex items-center justify-end gap-3 bg-[#0a0f1e]">
          <button onClick={onClose} disabled={isSaving} className="px-5 py-2.5 rounded-lg border border-gray-700 hover:bg-white/5 transition text-gray-300 disabled:opacity-50">Cancel</button>
          <button onClick={onApprove} disabled={isSaving} className="px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 transition font-bold text-white shadow-lg shadow-orange-600/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSaving ? (
              <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Saving...</>
            ) : (
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Approve & Save to Draft</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}