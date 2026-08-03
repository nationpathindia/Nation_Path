interface TimelineItem {
  date?: string;
  title: string;
  description?: string;
}

interface ArticleTimelineProps {
  timeline: TimelineItem[];
}

export default function ArticleTimeline({
  timeline,
}: ArticleTimelineProps) {
  if (!Array.isArray(timeline) || timeline.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {timeline.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          className="
            relative
            border-l
            border-gray-200
            pl-6
          "
        >
          <div
            className="
              absolute
              -left-[5px]
              top-1
              h-2.5
              w-2.5
              rounded-full
              bg-[#163C80]
            "
          />

          {item.date && (
            <p
              className="
                mb-1
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-gray-500
              "
            >
              {item.date}
            </p>
          )}

          <h4
            className="
              text-base
              font-semibold
              text-gray-900
            "
          >
            {item.title}
          </h4>

          {item.description && (
            <p
              className="
                mt-2
                text-sm
                leading-7
                text-gray-600
              "
            >
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}