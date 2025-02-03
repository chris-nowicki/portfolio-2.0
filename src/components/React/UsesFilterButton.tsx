import type { JSX } from 'react'
import { cn } from '@/utils/utils'

interface FilterButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

export const UsesFilterButton = ({
  active,
  onClick,
  children,
}: FilterButtonProps): JSX.Element => {
  return (
    <button
      className={cn(
        'rounded-lg border px-4 py-2 text-sm transition-colors duration-200 ease-in-out',
        {
          'bg-primary text-white': active,
          'text-primary hover:bg-primary hover:text-white': !active,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
