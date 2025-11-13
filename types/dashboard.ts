export type ProjectSummary = {
  id: string
  name: string
  status: string | null
  progress: number | null
  designerName: string | null
  thumbnailUrl: string | null
  updatedAt: string | null
  outstandingTasks: number
}

export type BoardSummary = {
  id: string
  title: string
  projectId: string | null
  coverImageUrl: string | null
  updatedAt: string | null
  itemCount: number
}

export type NotificationEntry = {
  id: string
  eventType: string
  payload: Record<string, unknown>
  readAt: string | null
  createdAt: string
  projectId: string | null
}

export type AiOutputSummary = {
  id: string
  tool: string
  projectId: string | null
  boardId: string | null
  summary: string | null
  createdAt: string
}

export type SavedItem = {
  id: string
  boardId: string
  title: string | null
  price: string | null
  previewImageUrl: string | null
  sourceUrl: string | null
}

export type DashboardOverview = {
  projects: ProjectSummary[]
  boards: BoardSummary[]
  notifications: NotificationEntry[]
  aiOutputs: AiOutputSummary[]
  savedItems: SavedItem[]
}

