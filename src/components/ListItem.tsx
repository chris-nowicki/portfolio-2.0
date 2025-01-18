import type { FunctionComponent } from 'preact'
import { ArrowIcon } from './ArrowIcon'

interface ListItemProps {
  href: string
  title: string
  description?: string
  external?: boolean
  children?: preact.ComponentChildren
}

export const ListItem: FunctionComponent<ListItemProps> = ({
  href,
  title,
  description,
  external = false,
  children,
}) => {
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
