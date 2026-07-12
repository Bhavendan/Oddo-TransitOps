import { ChevronDown } from "lucide-react"
import { FILTERS } from "@/lib/dashboardData"

function FilterSelect({
  label,
  options,
}: {
  label: string
  options: string[]
}) {
  return (
    <label className="flex flex-1 flex-col gap-1 sm:flex-none">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="relative">
        <select
          className="w-full appearance-none rounded-md border border-border bg-card py-2 pl-3 pr-9 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-44"
          defaultValue={options[0]}
        >
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </label>
  )
}

export default function FilterBar() {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:flex-wrap sm:items-end">
      <FilterSelect label="Vehicle Type" options={FILTERS.vehicleType} />
      <FilterSelect label="Status" options={FILTERS.status} />
      <FilterSelect label="Region" options={FILTERS.region} />
    </div>
  )
}
