import { type LucideIcon } from "lucide-react"

interface KpiCardProps {
  label: string
  value: number
  icon: LucideIcon
}

export default function KpiCard({ label, value, icon: Icon }: KpiCardProps) {
  return (
    <div className="flex items-start justify-between rounded-lg border border-border bg-card p-4">
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-muted-foreground">
          {label}
        </p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          {value.toLocaleString()}
        </p>
      </div>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
    </div>
  )
}
