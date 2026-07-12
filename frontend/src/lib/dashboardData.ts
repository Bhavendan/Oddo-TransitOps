import {
  Truck,
  CircleCheck,
  Wrench,
  Navigation,
  Clock,
  UserCheck,
  type LucideIcon,
} from "lucide-react"

export type VehicleStatus = "AVAILABLE" | "ON_TRIP" | "IN_SHOP" | "RETIRED"
export type TripStatus = "DRAFT" | "DISPATCHED" | "COMPLETED" | "CANCELLED"
export type MaintenanceStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED"

interface StatusStyle {
  /** friendly label shown to users */
  label: string
  /** raw color for recharts fills */
  color: string
  /** tailwind classes for a status badge (bg + text) */
  badge: string
}

export const VEHICLE_STATUS: Record<VehicleStatus, StatusStyle> = {
  AVAILABLE: {
    label: "Available",
    color: "var(--color-status-green)",
    badge: "bg-[var(--color-status-green)]/12 text-[var(--color-status-green)]",
  },
  ON_TRIP: {
    label: "On Trip",
    color: "var(--color-status-blue)",
    badge: "bg-[var(--color-status-blue)]/12 text-[var(--color-status-blue)]",
  },
  IN_SHOP: {
    label: "In Shop",
    color: "var(--color-status-orange)",
    badge:
      "bg-[var(--color-status-orange)]/12 text-[var(--color-status-orange)]",
  },
  RETIRED: {
    label: "Retired",
    color: "var(--color-status-gray)",
    badge: "bg-[var(--color-status-gray)]/12 text-[var(--color-status-gray)]",
  },
}

export const TRIP_STATUS: Record<TripStatus, StatusStyle> = {
  DRAFT: {
    label: "Draft",
    color: "var(--color-status-gray)",
    badge: "bg-[var(--color-status-gray)]/12 text-[var(--color-status-gray)]",
  },
  DISPATCHED: {
    label: "Dispatched",
    color: "var(--color-status-blue)",
    badge: "bg-[var(--color-status-blue)]/12 text-[var(--color-status-blue)]",
  },
  COMPLETED: {
    label: "Completed",
    color: "var(--color-status-green)",
    badge: "bg-[var(--color-status-green)]/12 text-[var(--color-status-green)]",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "var(--color-status-red)",
    badge: "bg-[var(--color-status-red)]/12 text-[var(--color-status-red)]",
  },
}

export const MAINTENANCE_STATUS: Record<MaintenanceStatus, StatusStyle> = {
  SCHEDULED: {
    label: "Scheduled",
    color: "var(--color-status-gray)",
    badge: "bg-[var(--color-status-gray)]/12 text-[var(--color-status-gray)]",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "var(--color-status-orange)",
    badge:
      "bg-[var(--color-status-orange)]/12 text-[var(--color-status-orange)]",
  },
  COMPLETED: {
    label: "Completed",
    color: "var(--color-status-green)",
    badge: "bg-[var(--color-status-green)]/12 text-[var(--color-status-green)]",
  },
}

export interface Kpi {
  label: string
  value: number
  icon: LucideIcon
}

export const KPIS: Kpi[] = [
  { label: "Active Vehicles", value: 128, icon: Truck },
  { label: "Available Vehicles", value: 42, icon: CircleCheck },
  { label: "Vehicles in Maintenance", value: 17, icon: Wrench },
  { label: "Active Trips", value: 63, icon: Navigation },
  { label: "Pending Trips", value: 21, icon: Clock },
  { label: "Drivers On Duty", value: 96, icon: UserCheck },
]

export const FLEET_UTILIZATION = 78

export const VEHICLE_STATUS_BREAKDOWN: { status: VehicleStatus; count: number }[] =
  [
    { status: "AVAILABLE", count: 42 },
    { status: "ON_TRIP", count: 63 },
    { status: "IN_SHOP", count: 17 },
    { status: "RETIRED", count: 8 },
  ]

export const TRIP_STATUS_BREAKDOWN: { status: TripStatus; count: number }[] = [
  { status: "DRAFT", count: 14 },
  { status: "DISPATCHED", count: 63 },
  { status: "COMPLETED", count: 214 },
  { status: "CANCELLED", count: 9 },
]

export interface Trip {
  id: string
  source: string
  destination: string
  vehicle: string
  driver: string
  status: TripStatus
  date: string
}

export const RECENT_TRIPS: Trip[] = [
  {
    id: "T-1042",
    source: "Portland, OR",
    destination: "Seattle, WA",
    vehicle: "TRK-204",
    driver: "M. Alvarez",
    status: "DISPATCHED",
    date: "Jul 12, 2026",
  },
  {
    id: "T-1041",
    source: "Sacramento, CA",
    destination: "Reno, NV",
    vehicle: "VAN-118",
    driver: "K. Osei",
    status: "COMPLETED",
    date: "Jul 11, 2026",
  },
  {
    id: "T-1040",
    source: "Denver, CO",
    destination: "Salt Lake City, UT",
    vehicle: "TRK-091",
    driver: "R. Chen",
    status: "COMPLETED",
    date: "Jul 11, 2026",
  },
  {
    id: "T-1039",
    source: "Austin, TX",
    destination: "Houston, TX",
    vehicle: "TRK-155",
    driver: "S. Bauer",
    status: "DRAFT",
    date: "Jul 10, 2026",
  },
  {
    id: "T-1038",
    source: "Phoenix, AZ",
    destination: "Tucson, AZ",
    vehicle: "VAN-076",
    driver: "L. Ferreira",
    status: "CANCELLED",
    date: "Jul 10, 2026",
  },
]

export interface MaintenanceRecord {
  id: string
  vehicle: string
  description: string
  cost: number
  status: MaintenanceStatus
}

export const RECENT_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: "M-508",
    vehicle: "TRK-204",
    description: "Brake pad replacement",
    cost: 640,
    status: "COMPLETED",
  },
  {
    id: "M-507",
    vehicle: "VAN-118",
    description: "Oil change & inspection",
    cost: 180,
    status: "COMPLETED",
  },
  {
    id: "M-506",
    vehicle: "TRK-091",
    description: "Transmission service",
    cost: 1250,
    status: "IN_PROGRESS",
  },
  {
    id: "M-505",
    vehicle: "TRK-155",
    description: "Tire rotation (6)",
    cost: 320,
    status: "SCHEDULED",
  },
  {
    id: "M-504",
    vehicle: "VAN-076",
    description: "Coolant flush",
    cost: 210,
    status: "SCHEDULED",
  },
]

export const FILTERS = {
  vehicleType: ["All Types", "Truck", "Van", "Bus", "Trailer"],
  status: ["All Statuses", "Available", "On Trip", "In Shop", "Retired"],
  region: ["All Regions", "West", "Midwest", "South", "Northeast"],
}
