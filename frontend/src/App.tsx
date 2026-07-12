import { Routes, Route } from "react-router-dom"
import MainLayout from "@/components/MainLayout"
import PlaceholderPage from "@/components/PlaceholderPage"
import { UserProvider, type CurrentUser } from "@/lib/user"

// In a real app this would come from an auth session.
const currentUser: CurrentUser = {
  name: "Dana Whitfield",
  role: "FLEET_MANAGER",
}

function Page({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <MainLayout onLogout={() => console.log("[v0] logout clicked")}>
      <PlaceholderPage title={title} description={description} />
    </MainLayout>
  )
}

export default function App() {
  return (
    <UserProvider user={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <Page
              title="Dashboard"
              description="Overview of fleet health, active trips, and key operational metrics."
            />
          }
        />
        <Route
          path="/vehicles"
          element={
            <Page
              title="Vehicles"
              description="Manage your fleet's vehicles, statuses, and assignments."
            />
          }
        />
        <Route
          path="/drivers"
          element={
            <Page
              title="Drivers"
              description="View driver rosters, certifications, and schedules."
            />
          }
        />
        <Route
          path="/trips"
          element={
            <Page
              title="Trips"
              description="Track planned and in-progress trips across the network."
            />
          }
        />
        <Route
          path="/maintenance"
          element={
            <Page
              title="Maintenance"
              description="Schedule service and monitor vehicle maintenance records."
            />
          }
        />
        <Route
          path="/fuel-logs"
          element={
            <Page
              title="Fuel Logs"
              description="Record and audit fuel consumption per vehicle and trip."
            />
          }
        />
        <Route
          path="/expenses"
          element={
            <Page
              title="Expenses"
              description="Review operational expenses and cost breakdowns."
            />
          }
        />
        <Route
          path="/reports"
          element={
            <Page
              title="Reports"
              description="Generate financial and operational reports for stakeholders."
            />
          }
        />
        <Route
          path="*"
          element={
            <Page
              title="Not Found"
              description="The page you're looking for doesn't exist."
            />
          }
        />
      </Routes>
    </UserProvider>
  )
}
