export default function SupportLoading() {
  return (
    <div className="space-y-6">
      <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  )
}

