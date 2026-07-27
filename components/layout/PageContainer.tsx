interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6">
      {children}
    </div>
  );
}