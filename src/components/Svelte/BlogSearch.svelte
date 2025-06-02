<script lang="ts">
  import type { CollectionEntry } from 'astro:content'
  import Fuse from 'fuse.js'
  import ListItem from './ListItem.svelte'

  type BlogPost = CollectionEntry<'blog'>

  export let posts: BlogPost[]

  let searchQuery = ''

  // Create Fuse instance
  $: fuse = new Fuse(posts, {
    keys: ['data.title', 'data.description', 'data.category', 'data.tags'],
    threshold: 0.3,
    includeScore: true,
    useExtendedSearch: true,
  })

  // Filter posts based on search query
  $: filteredPosts =
    !searchQuery.trim() ?
      posts
    : fuse.search(searchQuery.trim()).map((result) => result.item)

  // Handle input changes
  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement
    searchQuery = target.value
  }

  // Clear search
  function clearSearch() {
    searchQuery = ''
  }
</script>

<div class="relative mb-14">
  <input
    type="text"
    bind:value={searchQuery}
    on:input={handleInput}
    placeholder="Search by title, category, or tag ..."
    class="w-full border-b border-gray-300 bg-white py-3 pl-2 text-base focus:border-primary focus:outline-hidden sm:py-2"
  />
  {#if searchQuery.trim()}
    <button
      on:click={clearSearch}
      aria-label="Clear search"
      class="absolute right-4 top-1/2 -mr-2 -translate-y-1/2 p-2 hover:text-primary/50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transform"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  {/if}
</div>

<ul class="space-y-4 sm:space-y-6">
  {#each filteredPosts as post (post.id)}
    <li>
      <ListItem
        href={`/blog/${post.id}`}
        title={post.data.title}
        description={post.data.description}
      >
        <div class="mt-3">
          <ul class="flex flex-wrap items-center gap-1">
            <li>
              <a
                href={`/blog/category/${post.data.category.toLowerCase()}`}
                class="rounded-full bg-blue-600 px-2 text-sm text-white hover:bg-blue-700"
              >
                {post.data.category}
              </a>
            </li>
            {#each post.data.tags as tag (tag)}
              <li>
                <a
                  href={`/blog/tag/${tag.toLowerCase()}`}
                  class="rounded-full bg-secondary px-2 text-sm text-black transition-colors hover:text-blue-600"
                >
                  {`# ${tag}`}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </ListItem>
    </li>
  {/each}
</ul>
