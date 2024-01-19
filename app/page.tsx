'use client'
import Dashboard from "./Dashboard"
import GuestDashboard from "./GuestDashboard"
import OnMount from "./OnMount"
import useUserStore from "./store"

export default function Home() {
  const { token } = useUserStore()

  return (
    <OnMount>
      {token ? <Dashboard /> : <GuestDashboard />}
    </OnMount>
  )
}
