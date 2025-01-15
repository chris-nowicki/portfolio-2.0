import { useState, useMemo } from 'preact/hooks'
import type { CollectionEntry } from 'astro:content'
import { cn } from '@/utils/utils'

interface Props {
  uses: CollectionEntry<'uses'>[]
  className?: string
}

export default function UsesFilter({ uses, className }: Props) {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = useMemo(
    () => ['All', ...uses.map((use) => use.data.name)],
    [uses]
  ).sort((a, b) => a.localeCompare(b))

  const filteredUses = useMemo(() => {
    if (activeCategory === 'all') return uses
    return uses.filter((use) => use.data.name.toLowerCase() === activeCategory)
  }, [uses, activeCategory])

  const handleFilter = (name: string) => {
    setActiveCategory(name.toLowerCase())
  }

  return (
    <section className="mb-20 mt-16">
      <h2 className="mb-4 text-center text-xl font-semibold">Categories</h2>
      <div className="mb-20 flex flex-wrap justify-center items-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={cn(
              'rounded-lg border px-4 py-2 text-sm transition-colors duration-200 ease-in-out',
              {
                'bg-primary text-white':
                  activeCategory === category.toLowerCase(),
                'text-primary hover:bg-primary hover:text-white':
                  activeCategory !== category.toLowerCase(),
              }
            )}
            onClick={() => handleFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredUses.map((use) => (
        <section
          key={use.data.name}
          className={cn('mb-14 sm:mb-20', className)}
        >
          <header className="mb-6 flex items-center justify-between sm:mb-8">
            <h2 className="text-lg font-bold sm:text-xl">{use.data.name}</h2>
          </header>
          <div className="flex flex-col gap-4">
            {use.data.items
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b pb-2 transition-colors duration-200 ease-in-out hover:border-blue-600"
                >
                  <div className="mr-4">
                    <h3 className="text-sm group-hover:text-blue-600 sm:text-base">
                      {item.name}
                    </h3>
                  </div>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-0 h-4 w-4 flex-shrink-0 text-primary/50 transition-all duration-200 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-blue-600 sm:mr-2"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14 2.5C14 2.36739 13.9473 2.24021 13.8535 2.14645C13.7598 2.05268 13.6326 2 13.5 2H7.49999C7.36738 2 7.24021 2.05268 7.14644 2.14645C7.05267 2.24021 6.99999 2.36739 6.99999 2.5C6.99999 2.63261 7.05267 2.75979 7.14644 2.85355C7.24021 2.94732 7.36738 3 7.49999 3H12.293L2.14599 13.146C2.0995 13.1925 2.06263 13.2477 2.03747 13.3084C2.01231 13.3692 1.99936 13.4343 1.99936 13.5C1.99936 13.5657 2.01231 13.6308 2.03747 13.6916C2.06263 13.7523 2.0995 13.8075 2.14599 13.854C2.19248 13.9005 2.24767 13.9374 2.30841 13.9625C2.36915 13.9877 2.43425 14.0006 2.49999 14.0006C2.56573 14.0006 2.63083 13.9877 2.69157 13.9625C2.75231 13.9374 2.8075 13.9005 2.85399 13.854L13 3.707V8.5C13 8.63261 13.0527 8.75979 13.1464 8.85355C13.2402 8.94732 13.3674 9 13.5 9C13.6326 9 13.7598 8.94732 13.8535 8.85355C13.9473 8.75979 14 8.63261 14 8.5V2.5Z"
                    />
                  </svg>
                </a>
              ))}
          </div>
        </section>
      ))}
    </section>
  )
}
