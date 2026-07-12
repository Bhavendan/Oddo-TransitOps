import { NavLink } from "react-router-dom"
import { Bus, LogOut } from "lucide-react"
import { NAV_SECTIONS } from "@/lib/nav"
import { cn } from "@/lib/utils"

export default function Sidebar({ onLogout }: { onLogout?: () => void }) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col bg-sidebar text-sidebar-foreground",
        // icon-only on small screens, full width on md+
        "w-16 md:w-64",
        "transition-[width] duration-200",
      )}
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-3 md:px-5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-active text-primary-foreground">
          <Bus className="size-5" aria-hidden="true" />
        </span>
        <span className="hidden text-lg font-semibold tracking-tight md:block">
          TransitOps
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 md:px-3">
        <ul className="flex flex-col gap-1">
          {NAV_SECTIONS.map((section, i) => (
            <li key={section.header ?? `group-${i}`}>
              {section.header && (
                <p className="mt-4 mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-muted max-md:sr-only">
                  {section.header}
                </p>
              )}
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      title={item.label}
                      className={({ isActive }) =>
                        cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                          "max-md:justify-center",
                          "transition-colors",
                          isActive
                            ? "bg-sidebar-active text-primary-foreground"
                            : "text-sidebar-foreground/85 hover:bg-sidebar-hover hover:text-sidebar-foreground",
                        )
                      }
                    >
                      <item.icon className="size-5 shrink-0" aria-hidden="true" />
                      <span className="max-md:sr-only">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border p-2 md:p-3">
        <button
          type="button"
          onClick={onLogout}
          title="Logout"
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
            "max-md:justify-center",
            "text-sidebar-foreground/85 transition-colors hover:bg-sidebar-hover hover:text-sidebar-foreground",
          )}
        >
          <LogOut className="size-5 shrink-0" aria-hidden="true" />
          <span className="max-md:sr-only">Logout</span>
        </button>
      </div>
    </aside>
  )
}
