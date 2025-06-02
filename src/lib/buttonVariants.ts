const baseStyles =
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'

const variants = {
  default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
  outline:
    'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
} as const

const sizes = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3 text-xs',
  lg: 'h-14 rounded-md px-8 text-md',
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

export function buttonVariants({
  variant = 'default',
  size = 'default',
  className = '',
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  return `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim()
}
