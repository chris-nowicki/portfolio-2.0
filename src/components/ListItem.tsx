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
    <div className="group flex items-center justify-between border-b pb-2 transition-colors duration-200 ease-in-out hover:border-blue-600">
      <div className="mr-4">
        <a
          href={href}
          {...(external ?
            { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        >
          <h3 className="text-sm group-hover:text-blue-600 sm:text-base">
            {title}
          </h3>
          {description && (
            <p className="text-foreground-muted text-sm group-hover:text-blue-600 sm:text-base">
              {description}
            </p>
          )}
        </a>
        {children}
      </div>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <ArrowIcon
          direction={external ? 'diagonal-up' : 'right'}
          key={`arrow-${title}`}
        />
      </a>
    </div>
  )
}
