import { ROLE_META, initials, useCurrentUser } from "@/lib/user"
import { cn } from "@/lib/utils"

export default function Header({ title }: { title: string }) {
  const user = useCurrentUser()
  const meta = ROLE_META[user.role]

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-4 shadow-sm md:px-6">
      <h1 className="truncate text-lg font-semibold text-foreground md:text-xl">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end leading-tight max-sm:hidden">
          <span className="text-sm font-medium text-foreground">
            {user.name}
          </span>
          <span
            className={cn(
              "mt-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold",
              meta.pill,
            )}
          >
            {meta.label}
          </span>
        </div>
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
          aria-hidden="true"
        >
          {initials(user.name)}
        </span>
        <span className="sr-only">
          {user.name}, {meta.label}
        </span>
      </div>
    </header>
  )
}
