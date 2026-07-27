interface LoadingSkeletonProps {
  lines?: number;
}

export default function LoadingSkeleton({
  lines = 3,
}: LoadingSkeletonProps) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 rounded"
        />
      ))}
    </div>
  );
}