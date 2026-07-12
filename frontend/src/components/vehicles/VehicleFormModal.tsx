import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { VEHICLE_STATUS } from "@/lib/dashboardData"
import {
  VEHICLE_TYPES,
  VEHICLE_STATUS_OPTIONS,
  REGIONS,
  type Vehicle,
  type VehicleType,
} from "@/lib/vehiclesData"
import type { VehicleStatus } from "@/lib/dashboardData"

interface VehicleFormModalProps {
  open: boolean
  /** When provided, the modal is in "edit" mode and pre-fills fields. */
  vehicle: Vehicle | null
  onClose: () => void
  onSubmit: (data: Omit<Vehicle, "id">) => void
}

type FormState = {
  registration: string
  model: string
  type: VehicleType
  maxCapacity: string
  odometer: string
  acquisitionCost: string
  revenue: string
  region: string
  status: VehicleStatus
}

const EMPTY: FormState = {
  registration: "",
  model: "",
  type: "Van",
  maxCapacity: "",
  odometer: "",
  acquisitionCost: "",
  revenue: "",
  region: REGIONS[0],
  status: "AVAILABLE",
}

export default function VehicleFormModal({
  open,
  vehicle,
  onClose,
  onSubmit,
}: VehicleFormModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY)

  // Sync form with the vehicle being edited (or reset for "add").
  useEffect(() => {
    if (!open) return
    if (vehicle) {
      setForm({
        registration: vehicle.registration,
        model: vehicle.model,
        type: vehicle.type,
        maxCapacity: String(vehicle.maxCapacity),
        odometer: String(vehicle.odometer),
        acquisitionCost: String(vehicle.acquisitionCost),
        revenue: String(vehicle.revenue),
        region: vehicle.region,
        status: vehicle.status,
      })
    } else {
      setForm(EMPTY)
    }
  }, [open, vehicle])

  // Close on Escape for accessibility.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const update =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      registration: form.registration.trim(),
      model: form.model.trim(),
      type: form.type,
      maxCapacity: Number(form.maxCapacity) || 0,
      odometer: Number(form.odometer) || 0,
      acquisitionCost: Number(form.acquisitionCost) || 0,
      revenue: Number(form.revenue) || 0,
      region: form.region,
      status: form.status,
    })
  }

  const inputClass =
    "w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-modal-title"
    >
      {/* backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2
            id="vehicle-modal-title"
            className="text-lg font-semibold text-foreground"
          >
            {vehicle ? "Edit Vehicle" : "Add Vehicle"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="grid grid-cols-1 gap-4 overflow-y-auto px-6 py-5 sm:grid-cols-2">
            <Field label="Registration Number">
              <input
                required
                value={form.registration}
                onChange={update("registration")}
                placeholder="TRK-204"
                className={inputClass}
              />
            </Field>

            <Field label="Name / Model">
              <input
                required
                value={form.model}
                onChange={update("model")}
                placeholder="Freightliner Cascadia"
                className={inputClass}
              />
            </Field>

            <Field label="Type">
              <select
                value={form.type}
                onChange={update("type")}
                className={inputClass}
              >
                {VEHICLE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Status">
              <select
                value={form.status}
                onChange={update("status")}
                className={inputClass}
              >
                {VEHICLE_STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {VEHICLE_STATUS[s].label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Max Load Capacity (kg)">
              <input
                type="number"
                min="0"
                value={form.maxCapacity}
                onChange={update("maxCapacity")}
                placeholder="18000"
                className={inputClass}
              />
            </Field>

            <Field label="Odometer (km)">
              <input
                type="number"
                min="0"
                value={form.odometer}
                onChange={update("odometer")}
                placeholder="214500"
                className={inputClass}
              />
            </Field>

            <Field label="Acquisition Cost (USD)">
              <input
                type="number"
                min="0"
                value={form.acquisitionCost}
                onChange={update("acquisitionCost")}
                placeholder="142000"
                className={inputClass}
              />
            </Field>

            <Field label="Revenue (USD)">
              <input
                type="number"
                min="0"
                value={form.revenue}
                onChange={update("revenue")}
                placeholder="268400"
                className={inputClass}
              />
            </Field>

            <Field label="Region">
              <select
                value={form.region}
                onChange={update("region")}
                className={inputClass}
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {vehicle ? "Save Changes" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}
