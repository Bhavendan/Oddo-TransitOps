import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  Wrench,
  Fuel,
  Receipt,
  FileBarChart,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

export interface NavSection {
  /** section header; undefined means an ungrouped top-level item group */
  header?: string
  items: NavItem[]
}

export const NAV_SECTIONS: NavSection[] = [
  {
    items: [{ label: "Dashboard", to: "/", icon: LayoutDashboard }],
  },
  {
    header: "Fleet",
    items: [
      { label: "Vehicles", to: "/vehicles", icon: Truck },
      { label: "Drivers", to: "/drivers", icon: Users },
    ],
  },
  {
    header: "Operations",
    items: [
      { label: "Trips", to: "/trips", icon: Route },
      { label: "Maintenance", to: "/maintenance", icon: Wrench },
    ],
  },
  {
    header: "Finance",
    items: [
      { label: "Fuel Logs", to: "/fuel-logs", icon: Fuel },
      { label: "Expenses", to: "/expenses", icon: Receipt },
      { label: "Reports", to: "/reports", icon: FileBarChart },
    ],
  },
]

/** Flat lookup for page titles keyed by path. */
export const PAGE_TITLES: Record<string, string> = NAV_SECTIONS.flatMap(
  (s) => s.items,
).reduce<Record<string, string>>((acc, item) => {
  acc[item.to] = item.label
  return acc
}, {})
