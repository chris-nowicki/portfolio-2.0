import { useEffect, useState } from 'preact/hooks'
import { ArrowIcon } from './ArrowIcon'

export default function BlogBackLink() {
  const [backInfo, setBackInfo] = useState({
    link: '/blog',
    text: 'back to all posts',
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tag = params.get('tag')
    const category = params.get('category')

    const replaceState = () => {
      const newUrl = window.location.pathname
      history.replaceState({}, '', newUrl)
    }

    if (tag) {
      setBackInfo({
        link: `/blog/tag/${tag}`,
        text: `back to ${tag} posts`,
      })

      replaceState()
    } else if (category) {
      setBackInfo({
        link: `/blog/category/${category}`,
        text: `back to ${category} posts`,
      })
      replaceState()
    }
  }, [])

  return (
    <a href={backInfo.link} class="group flex items-center gap-2 text-blue-600">
      <ArrowIcon direction="left" />

      <span class="group-hover:underline group-hover:underline-offset-2">
        {backInfo.text}
      </span>
    </a>
  )
}
