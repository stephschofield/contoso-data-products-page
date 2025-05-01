import { requireRole } from "@/lib/auth"

export default async function AdminPage() {
  // This will redirect if the user doesn't have the admin role
  await requireRole(["admin"])

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content */}
    </div>
  )
}
