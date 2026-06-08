export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative container">
      <section>
        <div className="mx-auto px-4 text-lg tracking-tight sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12">
          <div className="prose prose-slate dark:prose-invert max-w-none py-8">
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
