import type { FunctionComponent } from 'preact'
import { ArrowIcon } from './ArrowIcon'

interface ListItemProps {
  href: string
  title: string
  description?: string
  external?: boolean
}

export const ListItem: FunctionComponent<ListItemProps> = ({
  href,
  title,
  description,
  external = false,
  children,
}) => {
  const commonClasses =
    'group flex items-center justify-between border-b pb-2 transition-colors duration-200 ease-in-out hover:border-blue-600'

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={commonClasses}
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

        {/* use the children for passing in blog category and tags */}
        {children}
      </div>
      <ArrowIcon direction={external ? 'diagonal-up' : 'right'} />
    </a>
  )
}
