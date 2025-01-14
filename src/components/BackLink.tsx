import { useEffect, useState } from 'preact/hooks'

export default function BackLink() {
  const [backInfo, setBackInfo] = useState({
    link: '/blog',
    text: 'back to all posts',
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tag = params.get('tag')
    const category = params.get('category')

    if (tag) {
      setBackInfo({
        link: `/blog/tag/${tag}`,
        text: `back to ${tag} posts`,
      })
      // Remove the tag parameter from URL
      const newUrl = window.location.pathname
      history.replaceState({}, '', newUrl)
    } else if (category) {
      setBackInfo({
        link: `/blog/category/${category}`,
        text: `back to ${category} posts`,
      })
      // Remove the category parameter from URL
      const newUrl = window.location.pathname
      history.replaceState({}, '', newUrl)
    }
  }, [])

  return (
    <a href={backInfo.link} class="group flex items-center gap-2 text-blue-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="transition-all duration-200 ease-in-out group-hover:-translate-x-1"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-arrow-left"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>

      <span class="group-hover:underline group-hover:underline-offset-2">
        {backInfo.text}
      </span>
    </a>
  )
}
