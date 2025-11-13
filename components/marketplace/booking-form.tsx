 "use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSupabase } from "@/components/providers/supabase-provider"
import type { Service } from "@/types/service"

const bookingSchema = z.object({
  preferredDate: z.string().min(1, "Please select a preferred date."),
  preferredStartTime: z.string().min(1, "Please select a start time."),
  preferredEndTime: z.string().min(1, "Please select an end time."),
  timezone: z.string().min(1, "Timezone is required."),
  location: z.string().optional(),
  notes: z.string().optional(),
})

type BookingFormProps = {
  service: Service
}

export function BookingForm({ service }: BookingFormProps) {
  const { session } = useSupabase()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      preferredDate: "",
      preferredStartTime: "",
      preferredEndTime: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
      location: "",
      notes: "",
    },
  })

  const requiresLocation = service.fulfillment_type === "in_person" || service.fulfillment_type === "hybrid"

  const handleSubmit = form.handleSubmit(async (values) => {
    if (!session) {
      toast.error("Please sign in to request a booking.")
      return
    }

    if (requiresLocation && !values.location?.trim()) {
      form.setError("location", { message: "Location is required for this service." })
      return
    }

    setIsSubmitting(true)
    const response = await fetch(`/api/bookings/${service.slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    setIsSubmitting(false)

    if (!response.ok) {
      const { error } = (await response.json()) as { error?: string }
      toast.error(error ?? "We couldn’t submit your request. Please try again.")
      return
    }

    toast.success("Booking request submitted! We’ll follow up within 24 hours.")
    form.reset({
      preferredDate: "",
      preferredStartTime: "",
      preferredEndTime: "",
      timezone: values.timezone,
      location: "",
      notes: "",
    })
  })

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred date</Label>
          <Input type="date" id="preferredDate" {...form.register("preferredDate")} />
          {form.formState.errors.preferredDate && (
            <p className="text-xs text-destructive">{form.formState.errors.preferredDate.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Input id="timezone" {...form.register("timezone")} />
          {form.formState.errors.timezone && (
            <p className="text-xs text-destructive">{form.formState.errors.timezone.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="preferredStartTime">Preferred start time</Label>
          <Input type="time" id="preferredStartTime" {...form.register("preferredStartTime")} />
          {form.formState.errors.preferredStartTime && (
            <p className="text-xs text-destructive">{form.formState.errors.preferredStartTime.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredEndTime">Preferred end time</Label>
          <Input type="time" id="preferredEndTime" {...form.register("preferredEndTime")} />
          {form.formState.errors.preferredEndTime && (
            <p className="text-xs text-destructive">{form.formState.errors.preferredEndTime.message}</p>
          )}
        </div>
      </div>

      {requiresLocation && (
        <div className="space-y-2">
          <Label htmlFor="location">Service location (required)</Label>
          <Input id="location" placeholder="City, State or full address" {...form.register("location")} />
          {form.formState.errors.location && (
            <p className="text-xs text-destructive">{form.formState.errors.location.message}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="notes">Project notes</Label>
        <Textarea
          id="notes"
          placeholder="Share any context, inspiration links, or access notes."
          rows={4}
          {...form.register("notes")}
        />
      </div>

      <Card className="p-4 text-xs text-muted-foreground bg-card/70 border-border">
        <p>
          Payment is not collected at this stage. A StyledByKelly concierge will review your request, confirm
          availability, and initiate billing once the scope is finalized.
        </p>
      </Card>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Booking Request"}
      </Button>
    </form>
  )
}

