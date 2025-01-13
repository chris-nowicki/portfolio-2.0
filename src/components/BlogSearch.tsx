import { useState, useMemo } from 'preact/hooks'
import type { CollectionEntry } from 'astro:content'
import type { JSX } from 'preact'
import Fuse from 'fuse.js'

type BlogPost = CollectionEntry<'blog'>

interface Props {
  posts: BlogPost[]
}

const BlogSearch = ({ posts }: Props): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('')

  const fuse = useMemo(() => {
    const options = {
      keys: ['data.title', 'data.description', 'data.category', 'data.tags'],
      threshold: 0.3,
      includeScore: true,
      useExtendedSearch: true,
    }
    return new Fuse(posts, options)
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts

    const results = fuse.search(searchQuery.trim())
    return results.map((result) => result.item)
  }, [fuse, searchQuery])

  return (
    <div>
      <div className="relative mb-14">
        <input
          type="text"
          value={searchQuery}
          onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          placeholder="Search by title, category, or tag ..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {searchQuery.trim() && (
          <button
            onClick={() => setSearchQuery('')}
            className="hover:text-primary/50"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 transform"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      <div>
        <ul className="space-y-4">
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <a
                href={`/blog/${post.id}`}
                class="group flex items-center justify-between border-b p-2 transition-colors duration-200 ease-in-out"
              >
                <div class="mr-4">
                  <h3 class="text-sm font-semibold group-hover:text-blue-600 sm:text-base">
                    {post.data.title}
                  </h3>
                  <p class="text-foreground-muted text-sm sm:text-base">
                    {post.data.description}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <div className="rounded-full bg-primary px-2 text-sm text-white">
                      {post.data.category}
                    </div>
                    <div>
                      <ul className="flex gap-1">
                        {post.data.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full bg-secondary px-2 text-sm text-black"
                          >
                            {`# ${tag}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="text-primary">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-0 h-5 w-5 flex-shrink-0 text-primary/50 transition-all duration-200 ease-in-out group-hover:translate-x-2 group-hover:text-primary sm:mr-2"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      fill="currentColor"
                      d="M1 8.00002C1 7.86741 1.05268 7.74024 1.14645 7.64647C1.24021 7.5527 1.36739 7.50002 1.5 7.50002H13.293L10.146 4.35402C10.0521 4.26013 9.99937 4.1328 9.99937 4.00002C9.99937 3.86725 10.0521 3.73991 10.146 3.64602C10.2399 3.55213 10.3672 3.49939 10.5 3.49939C10.6328 3.49939 10.7601 3.55213 10.854 3.64602L14.854 7.64602C14.9006 7.69247 14.9375 7.74764 14.9627 7.80839C14.9879 7.86913 15.0009 7.93425 15.0009 8.00002C15.0009 8.06579 14.9879 8.13091 14.9627 8.19165C14.9375 8.2524 14.9006 8.30758 14.854 8.35402L10.854 12.354C10.7601 12.4479 10.6328 12.5007 10.5 12.5007C10.3672 12.5007 10.2399 12.4479 10.146 12.354C10.0521 12.2601 9.99937 12.1328 9.99937 12C9.99937 11.8672 10.0521 11.7399 10.146 11.646L13.293 8.50002H1.5C1.36739 8.50002 1.24021 8.44734 1.14645 8.35357C1.05268 8.25981 1 8.13263 1 8.00002Z"
                    />
                  </svg>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogSearch
