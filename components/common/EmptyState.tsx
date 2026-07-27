interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No Content Available",
  description = "Please check back later.",
}: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <h3 className="font-serif text-xl">
        {title}
      </h3>

      <p className="text-gray-500 mt-2">
        {description}
      </p>
    </div>
  );
}