export default function TopBar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between text-xs text-gray-600">

        <span>{today}</span>

        <div className="flex gap-4">
          <span>E-Magazine</span>
          <span>Contact</span>
        </div>

      </div>
    </div>
  );
}