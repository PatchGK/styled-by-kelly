"use client"

import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { DashboardTopBar } from "./top-bar"

const meta: Meta<typeof DashboardTopBar> = {
  title: "Dashboard/TopBar",
  component: DashboardTopBar,
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/dashboard/projects",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DashboardTopBar>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="bg-background">
        <DashboardTopBar mobileNavOpen={open} onMenuToggle={() => setOpen((prev) => !prev)} />
      </div>
    )
  },
}

