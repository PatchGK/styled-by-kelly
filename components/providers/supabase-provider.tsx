"use client"

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { Session, SupabaseClient } from "@supabase/supabase-js"
import { toast } from "sonner"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

type SupabaseContextValue = {
  supabase: SupabaseClient
  session: Session | null
}

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined)

type SupabaseProviderProps = {
  initialSession: Session | null
  children: React.ReactNode
}

export function SupabaseProvider({ children, initialSession }: SupabaseProviderProps) {
  const [supabase] = useState(() => createSupabaseBrowserClient())
  const [session, setSession] = useState<Session | null>(initialSession)
  const hasHandledInitial = useRef(false)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, authSession) => {
      setSession(authSession)
      if (event === "INITIAL_SESSION" && !hasHandledInitial.current) {
        hasHandledInitial.current = true
        return
      }

      if (event === "SIGNED_IN") {
        toast.success("Signed in successfully")
      }
      if (event === "SIGNED_OUT") {
        toast.success("Signed out")
      }
      if (event === "USER_UPDATED") {
        toast.success("Profile updated")
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  const value = useMemo<SupabaseContextValue>(() => ({ supabase, session }), [supabase, session])

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider")
  }
  return context
}
