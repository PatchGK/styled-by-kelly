"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import type { Profile } from "@/types/profile"
import { useSupabase } from "@/components/providers/supabase-provider"

const defaultProfileValues: Profile = {
  id: "",
  full_name: null,
  first_name: null,
  last_name: null,
  phone: null,
  location: null,
  membership_plan: "Starter",
  plan_price: "$9.99/month - Billed monthly",
  next_billing_date: null,
  payment_last4: null,
  member_since_months: "1",
  stripe_customer_id: null,
  subscription_status: null,
  subscription_price_id: null,
  current_period_end: null,
}

type UseProfileReturn = {
  profile: Profile | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export function useProfile(): UseProfileReturn {
  const { supabase, session } = useSupabase()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState<boolean>(() => !!session)
  const [error, setError] = useState<string | null>(null)

  const buildProfileFromMetadata = useCallback((): Profile => {
    if (!session) {
      return defaultProfileValues
    }

    const metadata = (session.user.user_metadata as Record<string, string | null | undefined>) ?? {}
    return {
      ...defaultProfileValues,
      id: session.user.id,
      full_name: metadata.full_name ?? null,
      first_name: metadata.first_name ?? null,
      last_name: metadata.last_name ?? null,
      phone: metadata.phone ?? null,
      location: metadata.location ?? null,
      membership_plan: metadata.membership_plan ?? defaultProfileValues.membership_plan,
      plan_price: metadata.plan_price ?? defaultProfileValues.plan_price,
      next_billing_date: metadata.next_billing_date ?? null,
      payment_last4: metadata.payment_last4 ?? null,
      member_since_months: metadata.member_since_months ?? defaultProfileValues.member_since_months,
      stripe_customer_id: metadata.stripe_customer_id ?? null,
      subscription_status: metadata.subscription_status ?? null,
      subscription_price_id: metadata.subscription_price_id ?? null,
      current_period_end: metadata.current_period_end ?? null,
    }
  }, [session])

  const fetchProfile = useCallback(async () => {
    if (!session) {
      setProfile(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const { data, error: queryError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .maybeSingle()

    if (queryError && queryError.code !== "PGRST116") {
      setError(queryError.message)
      setProfile(buildProfileFromMetadata())
      setLoading(false)
      return
    }

    if (!data) {
      setProfile(buildProfileFromMetadata())
      setLoading(false)
      return
    }

    setProfile({
      ...defaultProfileValues,
      ...data,
    } as Profile)
    setLoading(false)
  }, [buildProfileFromMetadata, session, supabase])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const memoizedProfile = useMemo(() => profile, [profile])

  return {
    profile: memoizedProfile,
    loading,
    error,
    refresh: fetchProfile,
  }
}

