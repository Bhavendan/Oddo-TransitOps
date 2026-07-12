import type { VehicleStatus } from "@/lib/dashboardData"

export type VehicleType = "Van" | "Truck" | "Pickup" | "Trailer"

export const VEHICLE_TYPES: VehicleType[] = [
  "Van",
  "Truck",
  "Pickup",
  "Trailer",
]

export const VEHICLE_STATUS_OPTIONS: VehicleStatus[] = [
  "AVAILABLE",
  "ON_TRIP",
  "IN_SHOP",
  "RETIRED",
]

export const REGIONS = ["West", "Midwest", "South", "Northeast"]

export interface Vehicle {
  id: string
  registration: string
  model: string
  type: VehicleType
  maxCapacity: number // kg
  odometer: number // km
  acquisitionCost: number // USD
  revenue: number // USD
  region: string
  status: VehicleStatus
}

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "V-001",
    registration: "TRK-204",
    model: "Freightliner Cascadia",
    type: "Truck",
    maxCapacity: 18000,
    odometer: 214500,
    acquisitionCost: 142000,
    revenue: 268400,
    region: "West",
    status: "ON_TRIP",
  },
  {
    id: "V-002",
    registration: "VAN-118",
    model: "Mercedes Sprinter 3500",
    type: "Van",
    maxCapacity: 2400,
    odometer: 86300,
    acquisitionCost: 58000,
    revenue: 121500,
    region: "West",
    status: "AVAILABLE",
  },
  {
    id: "V-003",
    registration: "TRK-091",
    model: "Volvo VNL 760",
    type: "Truck",
    maxCapacity: 19500,
    odometer: 301200,
    acquisitionCost: 155000,
    revenue: 312800,
    region: "Midwest",
    status: "IN_SHOP",
  },
  {
    id: "V-004",
    registration: "PKP-045",
    model: "Ford F-150 Lightning",
    type: "Pickup",
    maxCapacity: 900,
    odometer: 42800,
    acquisitionCost: 63000,
    revenue: 41200,
    region: "South",
    status: "AVAILABLE",
  },
  {
    id: "V-005",
    registration: "TRK-155",
    model: "Kenworth T680",
    type: "Truck",
    maxCapacity: 18500,
    odometer: 178900,
    acquisitionCost: 148500,
    revenue: 205600,
    region: "South",
    status: "ON_TRIP",
  },
  {
    id: "V-006",
    registration: "TRL-312",
    model: "Great Dane Dry Van",
    type: "Trailer",
    maxCapacity: 22000,
    odometer: 96400,
    acquisitionCost: 41000,
    revenue: 88300,
    region: "Midwest",
    status: "AVAILABLE",
  },
  {
    id: "V-007",
    registration: "VAN-076",
    model: "Ram ProMaster 2500",
    type: "Van",
    maxCapacity: 1800,
    odometer: 132700,
    acquisitionCost: 52000,
    revenue: 97400,
    region: "Northeast",
    status: "IN_SHOP",
  },
  {
    id: "V-008",
    registration: "TRK-020",
    model: "International LT625",
    type: "Truck",
    maxCapacity: 17500,
    odometer: 412600,
    acquisitionCost: 138000,
    revenue: 358900,
    region: "Northeast",
    status: "RETIRED",
  },
]
