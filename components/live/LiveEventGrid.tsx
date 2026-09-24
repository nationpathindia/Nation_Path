import LiveEventCard from "./LiveEventCard";

interface Props {
  events: any[];
}

export default function LiveEventGrid({ events }: Props) {
  if (!events.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <div className="text-lg font-bold text-slate-800">
          No live events right now
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Live coverage will appear here when an event starts.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {events.map((event) => (
        <LiveEventCard
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
}