import { type ReactNode } from "react"
import { useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { PAGE_TITLES } from "@/lib/nav"

interface MainLayoutProps {
  children: ReactNode
  /** Optional explicit title; falls back to the nav label for the current path. */
  title?: string
  onLogout?: () => void
  /**
   * When true, renders children directly on the gray background instead of
   * inside the default white card. Use for pages that supply their own cards
   * (e.g. the dashboard grid).
   */
  bare?: boolean
}

export default function MainLayout({
  children,
  title,
  onLogout,
  bare = false,
}: MainLayoutProps) {
  const { pathname } = useLocation()
  const pageTitle = title ?? PAGE_TITLES[pathname] ?? "TransitOps"

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar onLogout={onLogout} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={pageTitle} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {bare ? (
            children
          ) : (
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm md:p-6">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
