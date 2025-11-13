export function formatDuration(durationMinutes: number | null | undefined) {
  if (!durationMinutes || durationMinutes <= 0) return "Varies"
  if (durationMinutes < 60) return `${durationMinutes} min`

  const hours = durationMinutes / 60
  const rounded = Math.round(hours * 10) / 10

  if (Number.isInteger(rounded)) {
    return `${rounded} hour${rounded > 1 ? "s" : ""}`
  }

  return `${rounded} hours`
}

