interface UtilizationRingProps {
  value: number
}

export default function UtilizationRing({ value }: UtilizationRingProps) {
  const size = 120
  const stroke = 12
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">
        Fleet Utilization %
      </p>
      <div className="flex items-center justify-center py-2">
        <div className="relative" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            className="-rotate-90"
            role="img"
            aria-label={`Fleet utilization ${value} percent`}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--color-muted)"
              strokeWidth={stroke}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-foreground">
              {value}%
            </span>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Vehicles in active use
      </p>
    </div>
  )
}
