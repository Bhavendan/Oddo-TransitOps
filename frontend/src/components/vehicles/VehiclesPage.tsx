import { useMemo, useState } from "react"
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { VEHICLE_STATUS } from "@/lib/dashboardData"
import type { VehicleStatus } from "@/lib/dashboardData"
import StatusBadge from "@/components/dashboard/StatusBadge"
import VehicleFormModal from "@/components/vehicles/VehicleFormModal"
import { MOCK_VEHICLES, type Vehicle } from "@/lib/vehiclesData"

const PAGE_SIZE = 5
const STATUS_FILTERS: ("All" | VehicleStatus)[] = [
  "All",
  "AVAILABLE",
  "ON_TRIP",
  "IN_SHOP",
  "RETIRED",
]

const numberFmt = new Intl.NumberFormat("en-US")

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"All" | VehicleStatus>("All")
  const [page, setPage] = useState(1)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Vehicle | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return vehicles.filter((v) => {
      const matchesStatus =
        statusFilter === "All" || v.status === statusFilter
      const matchesSearch =
        q === "" ||
        v.registration.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q)
      return matchesStatus && matchesSearch
    })
  }, [vehicles, search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * PAGE_SIZE
  const pageRows = filtered.slice(pageStart, pageStart + PAGE_SIZE)

  const openAdd = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const openEdit = (vehicle: Vehicle) => {
    setEditing(vehicle)
    setModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id))
  }

  const handleSubmit = (data: Omit<Vehicle, "id">) => {
    if (editing) {
      setVehicles((prev) =>
        prev.map((v) => (v.id === editing.id ? { ...editing, ...data } : v)),
      )
    } else {
      const id = `V-${String(Date.now()).slice(-4)}`
      setVehicles((prev) => [{ id, ...data }, ...prev])
    }
    setModalOpen(false)
    setEditing(null)
  }

  const resetToFirstPage = <T,>(setter: (v: T) => void) => (value: T) => {
    setter(value)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Top bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Vehicles</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(e) =>
                resetToFirstPage(setSearch)(e.target.value)
              }
              placeholder="Search vehicles..."
              className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-64"
              aria-label="Search vehicles"
            />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) =>
                resetToFirstPage(setStatusFilter)(
                  e.target.value as "All" | VehicleStatus,
                )
              }
              className="w-full appearance-none rounded-md border border-border bg-card py-2 pl-3 pr-9 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-44"
              aria-label="Filter by status"
            >
              {STATUS_FILTERS.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Statuses" : VEHICLE_STATUS[s].label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>

          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left">
                <Th>Registration</Th>
                <Th>Model</Th>
                <Th>Type</Th>
                <Th className="text-right">Max Capacity (kg)</Th>
                <Th className="text-right">Odometer (km)</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((v) => (
                <tr
                  key={v.id}
                  className="border-b border-border transition-colors last:border-0 hover:bg-muted/40"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {v.registration}
                  </td>
                  <td className="px-4 py-3 text-foreground">{v.model}</td>
                  <td className="px-4 py-3 text-muted-foreground">{v.type}</td>
                  <td className="px-4 py-3 text-right text-foreground">
                    {numberFmt.format(v.maxCapacity)}
                  </td>
                  <td className="px-4 py-3 text-right text-foreground">
                    {numberFmt.format(v.odometer)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={VEHICLE_STATUS[v.status].label}
                      className={VEHICLE_STATUS[v.status].badge}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(v)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                        aria-label={`Edit ${v.registration}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(v.id)}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-[var(--color-status-red)]/12 hover:text-[var(--color-status-red)]"
                        aria-label={`Delete ${v.registration}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {pageRows.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-muted-foreground"
                  >
                    No vehicles match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border px-4 py-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {filtered.length === 0
              ? "0 results"
              : `Showing ${pageStart + 1}–${Math.min(
                  pageStart + PAGE_SIZE,
                  filtered.length,
                )} of ${filtered.length} vehicles`}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={`min-w-9 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  p === currentPage
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground hover:bg-muted"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <VehicleFormModal
        open={modalOpen}
        vehicle={editing}
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <th
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground ${className}`}
    >
      {children}
    </th>
  )
}
