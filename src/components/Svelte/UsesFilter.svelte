<script lang="ts">
  import type { CollectionEntry } from 'astro:content'
  import ListItem from './ListItem.svelte'
  import UsesFilterButton from './UsesFilterButton.svelte'

  export let uses: CollectionEntry<'uses'>[]

  let activeCategory = 'all'

  // Create sorted categories array
  $: categories = ['All', ...uses.map((use) => use.data.name)].sort((a, b) =>
    a.localeCompare(b)
  )

  // Filter uses based on active category
  $: filteredUses =
    activeCategory === 'all' ? uses : (
      uses.filter((use) => use.data.name.toLowerCase() === activeCategory)
    )

  function handleFilter(name: string) {
    activeCategory = name.toLowerCase()
  }
</script>

<section class="mt-16 transition-all duration-300 ease-in-out">
  <h2 class="mb-4 text-center text-xl font-semibold">Categories</h2>
  <div class="mb-20 flex flex-wrap items-center justify-center gap-2">
    {#each categories as category (category)}
      <UsesFilterButton
        active={category.toLowerCase() === activeCategory}
        on:click={() => handleFilter(category)}
      >
        {category}
      </UsesFilterButton>
    {/each}
  </div>

  {#each filteredUses as use (use.data.name)}
    <section class="mt-14 sm:mt-20">
      <header class="mb-6 flex items-center justify-between sm:mb-8">
        <h2 class="text-lg font-bold sm:text-xl">{use.data.name}</h2>
      </header>
      <div class="flex flex-col gap-4">
        {#each use.data.items.sort( (a, b) => a.name.localeCompare(b.name) ) as item (item.name)}
          <ListItem href={item.url} title={item.name} external={true} />
        {/each}
      </div>
    </section>
  {/each}
</section>
