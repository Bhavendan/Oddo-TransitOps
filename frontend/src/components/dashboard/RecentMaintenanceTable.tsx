import { RECENT_MAINTENANCE, MAINTENANCE_STATUS } from "@/lib/dashboardData"
import StatusBadge from "./StatusBadge"

export default function RecentMaintenanceTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">
          Recent Maintenance
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-2 font-medium">Vehicle</th>
              <th className="px-4 py-2 font-medium">Description</th>
              <th className="px-4 py-2 font-medium">Cost</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_MAINTENANCE.map((record) => (
              <tr
                key={record.id}
                className="border-t border-border text-foreground"
              >
                <td className="px-4 py-3 font-medium">{record.vehicle}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {record.description}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  ${record.cost.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge
                    label={MAINTENANCE_STATUS[record.status].label}
                    className={MAINTENANCE_STATUS[record.status].badge}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

