import { createSupabaseServerClient } from "@/lib/supabase/server"
import type {
  AiOutputSummary,
  BoardSummary,
  DashboardOverview,
  NotificationEntry,
  ProjectSummary,
  SavedItem,
} from "@/types/dashboard"
export type { DashboardOverview } from "@/types/dashboard"

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const supabase = await createSupabaseServerClient()

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

  const projects: ProjectSummary[] =
    projectsRes.data?.map((project) => ({
      id: project.id,
      name: project.name,
      status: project.status,
      progress: project.progress,
      designerName: project.designer_name,
      thumbnailUrl: project.thumbnail_url,
      updatedAt: project.updated_at,
      outstandingTasks: project.project_tasks?.at(0)?.count ?? 0,
    })) ?? []

  const boards: BoardSummary[] =
    boardsRes.data?.map((board) => ({
      id: board.id,
      title: board.title,
      projectId: board.project_id,
      coverImageUrl: board.cover_image_url,
      updatedAt: board.updated_at,
      itemCount: board.board_items?.at(0)?.count ?? 0,
    })) ?? []

  const notifications: NotificationEntry[] =
    notificationsRes.data?.map((notification) => ({
      id: notification.id,
      eventType: notification.event_type,
      payload: notification.payload ?? {},
      readAt: notification.read_at,
      createdAt: notification.created_at,
      projectId: notification.project_id,
    })) ?? []

  const aiOutputs: AiOutputSummary[] =
    aiRes.data?.map((output) => ({
      id: output.id,
      tool: output.tool,
      projectId: output.project_id,
      boardId: output.board_id,
      summary: output.summary,
      createdAt: output.created_at,
    })) ?? []

  const savedItems: SavedItem[] =
    savedItemsRes.data?.map((item) => ({
      id: item.id,
      boardId: item.board_id,
      title: typeof item.content?.name === "string" ? (item.content.name as string) : null,
      price: typeof item.content?.price === "string" ? (item.content.price as string) : null,
      previewImageUrl: item.preview_image_url,
      sourceUrl: item.source_url,
    })) ?? []

  const firstError =
    projectsRes.error ?? boardsRes.error ?? notificationsRes.error ?? aiRes.error ?? savedItemsRes.error

  if (firstError) {
    throw firstError
  }

  return {
    projects,
    boards,
    notifications,
    aiOutputs,
    savedItems,
  }
}

export async function getProjectTasks(projectId: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("project_tasks")
    .select("id, title, description, status, sort_order, due_date, completed_at, created_at")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

export async function getDesignBoard(boardId: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("design_boards")
    .select(
      `
        id,
        title,
        description,
        visibility,
        project_id,
        cover_image_url,
        board_items (
          id,
          kind,
          content,
          source_url,
          preview_image_url,
          sort_order,
          created_at
        )
      `,
    )
    .eq("id", boardId)
    .maybeSingle()

  if (error) throw error
  return data
}

