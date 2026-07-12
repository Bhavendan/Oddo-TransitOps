export default function PlaceholderPage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <p className="mt-1 max-w-prose text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="rounded-lg border border-border bg-background p-4"
          >
            <div className="h-2 w-16 rounded bg-muted" />
            <div className="mt-3 h-6 w-24 rounded bg-muted" />
            <div className="mt-4 h-2 w-full rounded bg-muted" />
            <div className="mt-2 h-2 w-3/4 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  )
}
