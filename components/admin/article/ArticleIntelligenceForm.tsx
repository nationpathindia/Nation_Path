"use client";

interface Props {
  form: any;
  updateField: (key: string, value: any) => void;
}

export default function ArticleIntelligenceForm({
  form,
  updateField,
}: Props) {
  return (
    <>

      {/* =====================================================
          SHORT BRIEF
      ===================================================== */}

      <div
        className="
          bg-[#0e1726]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >
        <h2 className="font-semibold mb-4">
          Short Brief
        </h2>

        <textarea
          className="
            w-full
            h-28
            p-4
            rounded-xl
            bg-black/30
            border
            border-white/10
          "
          placeholder="2–4 line quick summary..."
          value={form.shortBrief}
          onChange={(e) =>
            updateField("shortBrief", e.target.value)
          }
        />
      </div>

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          bg-[#0e1726]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >
        <h2 className="font-semibold mb-4">
          Background
        </h2>

        <textarea
          className="
            w-full
            h-40
            p-4
            rounded-xl
            bg-black/30
            border
            border-white/10
          "
          placeholder="Historical context..."
          value={form.background}
          onChange={(e) =>
            updateField("background", e.target.value)
          }
        />
      </div>

      {/* =====================================================
          TIMELINE
      ===================================================== */}

      <div
        className="
          bg-[#0e1726]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >
        <h2 className="font-semibold mb-4">
          Timeline
        </h2>

        <textarea
          className="
            w-full
            h-36
            p-4
            rounded-xl
            bg-black/30
            border
            border-white/10
          "
          placeholder="One event per line..."
          value={form.timeline}
          onChange={(e) =>
            updateField("timeline", e.target.value)
          }
        />
      </div>

      {/* =====================================================
          EXPERT OPINION
      ===================================================== */}

      <div
        className="
          bg-[#0e1726]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >
        <h2 className="font-semibold mb-5">
          Expert Opinion
        </h2>

        <input
          className="
            w-full
            p-3
            rounded-xl
            bg-black/30
            border
            border-white/10
            mb-4
          "
          placeholder="Expert Name"
          value={form.expertOpinion.name}
          onChange={(e) =>
            updateField("expertOpinion", {
              ...form.expertOpinion,
              name: e.target.value,
            })
          }
        />

        <input
          className="
            w-full
            p-3
            rounded-xl
            bg-black/30
            border
            border-white/10
            mb-4
          "
          placeholder="Designation"
          value={form.expertOpinion.role}
          onChange={(e) =>
            updateField("expertOpinion", {
              ...form.expertOpinion,
              role: e.target.value,
            })
          }
        />

        <textarea
          className="
            w-full
            h-36
            p-4
            rounded-xl
            bg-black/30
            border
            border-white/10
          "
          placeholder="Expert quote..."
          value={form.expertOpinion.quote}
          onChange={(e) =>
            updateField("expertOpinion", {
              ...form.expertOpinion,
              quote: e.target.value,
            })
          }
        />
      </div>

      {/* =====================================================
          FACT CHECK
      ===================================================== */}

      <div
        className="
          bg-[#0e1726]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >
        <h2 className="font-semibold mb-5">
          Fact Check
        </h2>

        <input
          className="
            w-full
            p-3
            rounded-xl
            bg-black/30
            border
            border-white/10
            mb-4
          "
          placeholder="Claim"
          value={form.factCheck.claim}
          onChange={(e) =>
            updateField("factCheck", {
              ...form.factCheck,
              claim: e.target.value,
            })
          }
        />

        <select
          className="
            w-full
            p-3
            rounded-xl
            bg-black/30
            border
            border-white/10
            mb-4
          "
          value={form.factCheck.status}
          onChange={(e) =>
            updateField("factCheck", {
              ...form.factCheck,
              status: e.target.value,
            })
          }
        >
          <option value="">Select Status</option>
          <option value="True">True</option>
          <option value="Mostly True">Mostly True</option>
          <option value="Partly True">Partly True</option>
          <option value="Misleading">Misleading</option>
          <option value="False">False</option>
          <option value="Unverified">Unverified</option>
        </select>

        <textarea
          className="
            w-full
            h-32
            p-4
            rounded-xl
            bg-black/30
            border
            border-white/10
            mb-4
          "
          placeholder="Explanation..."
          value={form.factCheck.explanation}
          onChange={(e) =>
            updateField("factCheck", {
              ...form.factCheck,
              explanation: e.target.value,
            })
          }
        />

        <textarea
          className="
            w-full
            h-24
            p-4
            rounded-xl
            bg-black/30
            border
            border-white/10
          "
          placeholder="Sources..."
          value={form.factCheck.sources}
          onChange={(e) =>
            updateField("factCheck", {
              ...form.factCheck,
              sources: e.target.value,
            })
          }
        />
      </div>

      {/* =====================================================
          WHAT'S NEXT
      ===================================================== */}

      <div
        className="
          bg-[#0e1726]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >
        <h2 className="font-semibold mb-4">
          What's Next
        </h2>

        <textarea
          className="
            w-full
            h-32
            p-4
            rounded-xl
            bg-black/30
            border
            border-white/10
          "
          value={form.whatsNext}
          onChange={(e) =>
            updateField("whatsNext", e.target.value)
          }
        />
      </div>

      {/* =====================================================
          KEY TAKEAWAYS
      ===================================================== */}

      <div
        className="
          bg-[#0e1726]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >
        <h2 className="font-semibold mb-4">
          Key Takeaways
        </h2>

        <textarea
          className="
            w-full
            h-32
            p-4
            rounded-xl
            bg-black/30
            border
            border-white/10
          "
          placeholder="One takeaway per line..."
          value={form.keyTakeaways}
          onChange={(e) =>
            updateField("keyTakeaways", e.target.value)
          }
        />
      </div>

      {/* =====================================================
          SOURCE DESK
      ===================================================== */}

      <div
        className="
          bg-[#0e1726]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >
        <h2 className="font-semibold mb-4">
          Source Desk
        </h2>

        <textarea
          className="
            w-full
            h-32
            p-4
            rounded-xl
            bg-black/30
            border
            border-white/10
          "
          placeholder="Reuters, PIB, Official Release..."
          value={form.sourceDesk}
          onChange={(e) =>
            updateField("sourceDesk", e.target.value)
          }
        />
      </div>

    </>
  );
}