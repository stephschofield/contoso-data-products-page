"use client"
import { RoleGuard } from "@/components/role-based-component"

export function AdminPanel() {
  return (
    <RoleGuard allowedRoles={["admin"]} fallback={<p>You don't have access to this section</p>}>
      <div>
        <h1>Admin Panel</h1>
        {/* Admin-only content */}
      </div>
    </RoleGuard>
  )
}
