import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { Service } from "@/types/service"

export async function getServices() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from("services").select("*").order("name", { ascending: true })
  if (error) {
    throw new Error(error.message)
  }
  return (data ?? []) as Service[]
}

export async function getServiceBySlug(slug: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from("services").select("*").eq("slug", slug).maybeSingle()
  if (error) {
    throw new Error(error.message)
  }
  return (data as Service | null) ?? null
}

