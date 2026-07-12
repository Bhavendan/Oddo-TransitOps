import { KPIS, FLEET_UTILIZATION } from "@/lib/dashboardData"
import FilterBar from "./FilterBar"
import KpiCard from "./KpiCard"
import UtilizationRing from "./UtilizationRing"
import VehicleStatusPie from "./VehicleStatusPie"
import TripStatusBar from "./TripStatusBar"
import RecentTripsTable from "./RecentTripsTable"
import RecentMaintenanceTable from "./RecentMaintenanceTable"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <FilterBar />

      {/* KPI row: 6 cards + wider utilization card */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="grid grid-cols-1 gap-4 sm:col-span-2 sm:grid-cols-3 lg:col-span-3">
          {KPIS.map((kpi) => (
            <KpiCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              icon={kpi.icon}
            />
          ))}
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <UtilizationRing value={FLEET_UTILIZATION} />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VehicleStatusPie />
        <TripStatusBar />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <RecentTripsTable />
        <RecentMaintenanceTable />
      </div>
    </div>
  )
}
