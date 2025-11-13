"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useSupabase } from "@/components/providers/supabase-provider"
import type {
  AiOutputSummary,
  BoardSummary,
  DashboardOverview,
  NotificationEntry,
  ProjectSummary,
  SavedItem,
} from "@/types/dashboard"

const emptyOverview: DashboardOverview = {
  projects: [],
  boards: [],
  notifications: [],
  aiOutputs: [],
  savedItems: [],
}

type UseDashboardDataReturn = {
  data: DashboardOverview
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export function useDashboardData(): UseDashboardDataReturn {
  const { supabase, session } = useSupabase()
  const [data, setData] = useState<DashboardOverview>(emptyOverview)
  const [loading, setLoading] = useState<boolean>(() => !!session)
  const [error, setError] = useState<string | null>(null)

  const mapProjects = useCallback((rows: any[] | null): ProjectSummary[] => {
    return (
      rows?.map((project) => ({
        id: project.id,
        name: project.name,
        status: project.status,
        progress: project.progress,
        designerName: project.designer_name,
        thumbnailUrl: project.thumbnail_url,
        updatedAt: project.updated_at,
        outstandingTasks: project.project_tasks?.at(0)?.count ?? 0,
      })) ?? []
    )
  }, [])

  const mapBoards = useCallback((rows: any[] | null): BoardSummary[] => {
    return (
      rows?.map((board) => ({
        id: board.id,
        title: board.title,
        projectId: board.project_id,
        coverImageUrl: board.cover_image_url,
        updatedAt: board.updated_at,
        itemCount: board.board_items?.at(0)?.count ?? 0,
      })) ?? []
    )
  }, [])

  const mapNotifications = useCallback((rows: any[] | null): NotificationEntry[] => {
    return (
      rows?.map((notification) => ({
        id: notification.id,
        eventType: notification.event_type,
        payload: notification.payload ?? {},
        readAt: notification.read_at,
        createdAt: notification.created_at,
        projectId: notification.project_id,
      })) ?? []
    )
  }, [])

  const mapAiOutputs = useCallback((rows: any[] | null): AiOutputSummary[] => {
    return (
      rows?.map((output) => ({
        id: output.id,
        tool: output.tool,
        projectId: output.project_id,
        boardId: output.board_id,
        summary: output.summary,
        createdAt: output.created_at,
      })) ?? []
    )
  }, [])

  const mapSavedItems = useCallback((rows: any[] | null): SavedItem[] => {
    return (
      rows?.map((item) => ({
        id: item.id,
        boardId: item.board_id,
        title: typeof item.content?.name === "string" ? (item.content.name as string) : null,
        price: typeof item.content?.price === "string" ? (item.content.price as string) : null,
        previewImageUrl: item.preview_image_url,
        sourceUrl: item.source_url,
      })) ?? []
    )
  }, [])

  const fetchDashboard = useCallback(async () => {
    if (!session) {
      setData(emptyOverview)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const [projectsRes, boardsRes, notificationsRes, aiRes, savedItemsRes] = await Promise.all([
      supabase
        .from("projects")
        .select("id, name, status, progress, designer_name, thumbnail_url, updated_at, project_tasks(count)")
        .order("updated_at", { ascending: false })
        .limit(5),
      supabase
        .from("design_boards")
        .select("id, title, project_id, cover_image_url, updated_at, board_items(count)")
        .order("updated_at", { ascending: false })
        .limit(6),
      supabase
        .from("notifications")
        .select("id, event_type, payload, read_at, created_at, project_id")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("ai_outputs")
        .select("id, tool, project_id, board_id, summary, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
      supabase
        .from("board_items")
        .select("id, board_id, content, preview_image_url, source_url")
        .eq("kind", "product")
        .order("created_at", { ascending: false })
        .limit(8),
    ])

    const firstError =
      projectsRes.error ?? boardsRes.error ?? notificationsRes.error ?? aiRes.error ?? savedItemsRes.error

    if (firstError) {
      setError(firstError.message)
      setData(emptyOverview)
      setLoading(false)
      return
    }

    setData({
      projects: mapProjects(projectsRes.data ?? []),
      boards: mapBoards(boardsRes.data ?? []),
      notifications: mapNotifications(notificationsRes.data ?? []),
      aiOutputs: mapAiOutputs(aiRes.data ?? []),
      savedItems: mapSavedItems(savedItemsRes.data ?? []),
    })

    setLoading(false)
  }, [mapAiOutputs, mapBoards, mapNotifications, mapProjects, mapSavedItems, session, supabase])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const memoizedData = useMemo(() => data, [data])

  return {
    data: memoizedData,
    loading,
    error,
    refresh: fetchDashboard,
  }
}

