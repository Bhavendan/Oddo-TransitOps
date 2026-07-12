import { createContext, useContext, type ReactNode } from "react"

export type Role =
  | "FLEET_MANAGER"
  | "DRIVER"
  | "SAFETY_OFFICER"
  | "FINANCIAL_ANALYST"

export interface CurrentUser {
  name: string
  role: Role
}

interface RoleMeta {
  label: string
  /** tailwind classes for the pill background + text */
  pill: string
}

export const ROLE_META: Record<Role, RoleMeta> = {
  FLEET_MANAGER: {
    label: "Fleet Manager",
    pill: "bg-[var(--color-role-fleet)]/15 text-[var(--color-role-fleet)]",
  },
  DRIVER: {
    label: "Driver",
    pill: "bg-[var(--color-role-driver)]/15 text-[var(--color-role-driver)]",
  },
  SAFETY_OFFICER: {
    label: "Safety Officer",
    pill: "bg-[var(--color-role-safety)]/15 text-[var(--color-role-safety)]",
  },
  FINANCIAL_ANALYST: {
    label: "Financial Analyst",
    pill: "bg-[var(--color-role-finance)]/15 text-[var(--color-role-finance)]",
  },
}

export function roleLabel(role: Role) {
  return ROLE_META[role].label
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

const UserContext = createContext<CurrentUser | null>(null)

export function UserProvider({
  user,
  children,
}: {
  user: CurrentUser
  children: ReactNode
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useCurrentUser(): CurrentUser {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error("useCurrentUser must be used within a UserProvider")
  }
  return ctx
}
