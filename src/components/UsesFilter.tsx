import type { CollectionEntry } from 'astro:content'
import { useMemo, useState, type JSX } from 'react'
import { ListItem } from './ListItem'
import { UsesFilterButton } from './UsesFilterButton'

interface Props {
  uses: CollectionEntry<'uses'>[]
}

export const UsesFilter = ({ uses }: Props): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['All', ...uses.map((use) => use.data.name)].sort((a, b) =>
    a.localeCompare(b)
  )

  const filteredUses = useMemo(() => {
    if (activeCategory === 'all') return uses
    return uses.filter((use) => use.data.name.toLowerCase() === activeCategory)
  }, [uses, activeCategory])

  const handleFilter = (name: string) => {
    setActiveCategory(name.toLowerCase())
  }

  return (
    <section className="mt-16 transition-all duration-300 ease-in-out">
      <h2 className="mb-4 text-center text-xl font-semibold">Categories</h2>
      <div className="mb-20 flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => (
          <UsesFilterButton
            active={category.toLowerCase() === activeCategory}
            onClick={() => handleFilter(category)}
          >
            {category}
          </UsesFilterButton>
        ))}
      </div>

      {filteredUses.map((use) => (
        <section key={use.data.name} className="mt-14 sm:mt-20">
          <header className="mb-6 flex items-center justify-between sm:mb-8">
            <h2 className="text-lg font-bold sm:text-xl">{use.data.name}</h2>
          </header>
          <div className="flex flex-col gap-4">
            {use.data.items
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                <ListItem href={item.url} title={item.name} external={true} />
              ))}
          </div>
        </section>
      ))}
    </section>
  )
}
