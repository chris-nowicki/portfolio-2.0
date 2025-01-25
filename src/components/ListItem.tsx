import type { JSX } from 'react'
import { ArrowIcon } from './ArrowIcon'

interface ListItemProps {
  href: string
  title: string
  description?: string
  external?: boolean
  children?: React.ReactNode
}

export const ListItem = ({
  href,
  title,
  description,
  external = false,
  children,
}: ListItemProps): JSX.Element => {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center justify-between border-b pb-2 transition-colors duration-200 ease-in-out hover:border-blue-600"
    >
      <div className="mr-4">
        <h3 className="text-sm group-hover:text-blue-600 sm:text-base">
          {title}
        </h3>
        {description && (
          <p className="text-foreground-muted text-sm group-hover:text-blue-600 sm:text-base">
            {description}
          </p>
        )}
        {children}
      </div>
      <ArrowIcon
        direction={external ? 'diagonal-up' : 'right'}
        key={`arrow-${title}`}
      />
    </a>
  )
}
