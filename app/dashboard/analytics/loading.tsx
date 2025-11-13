export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-56 animate-pulse rounded-xl bg-muted" />
        <div className="h-56 animate-pulse rounded-xl bg-muted" />
        <div className="h-56 animate-pulse rounded-xl bg-muted lg:col-span-2" />
      </div>
    </div>
  )
}

