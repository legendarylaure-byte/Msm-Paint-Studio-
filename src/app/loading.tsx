export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="animate-pulse space-y-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="mx-auto h-4 w-32 rounded-full bg-surface-2" />
          <div className="mx-auto h-10 w-3/4 rounded-lg bg-surface-2" />
          <div className="mx-auto h-4 w-1/2 rounded-full bg-surface-2" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 rounded-2xl bg-surface-2" />
          ))}
        </div>
      </div>
    </div>
  );
}