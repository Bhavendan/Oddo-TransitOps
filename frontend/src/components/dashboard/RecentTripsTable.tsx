import { RECENT_TRIPS, TRIP_STATUS } from "@/lib/dashboardData"
import StatusBadge from "./StatusBadge"

export default function RecentTripsTable() {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">Recent Trips</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-2 font-medium">Source</th>
              <th className="px-4 py-2 font-medium">Destination</th>
              <th className="px-4 py-2 font-medium">Vehicle</th>
              <th className="px-4 py-2 font-medium">Driver</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_TRIPS.map((trip) => (
              <tr
                key={trip.id}
                className="border-t border-border text-foreground"
              >
                <td className="px-4 py-3">{trip.source}</td>
                <td className="px-4 py-3">{trip.destination}</td>
                <td className="px-4 py-3 font-medium">{trip.vehicle}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {trip.driver}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge
                    label={TRIP_STATUS[trip.status].label}
                    className={TRIP_STATUS[trip.status].badge}
                  />
                </td>
                <td className="px-4 py-3 text-muted-foreground">{trip.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
