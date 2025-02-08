<script lang="ts">
  import { onMount } from 'svelte';
  import ArrowIcon from './ArrowIcon.svelte';

  let backInfo = {
    link: '/blog',
    text: 'back to all posts'
  };

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    const category = params.get('category');

    const replaceState = () => {
      const newUrl = window.location.pathname;
      history.replaceState({}, '', newUrl);
    };

    if (tag) {
      backInfo = {
        link: `/blog/tag/${tag}`,
        text: `back to posts about ${tag}`
      };
      
      replaceState();
    } else if (category) {
      backInfo = {
        link: `/blog/category/${category}`,
        text: `back to posts about ${category}`
      };
      replaceState();
    }
  });
</script>

<a
  href={backInfo.link}
  class="group flex items-center gap-2 text-blue-600"
>
  <ArrowIcon direction="left" />

  <span class="group-hover:underline group-hover:underline-offset-2">
    {backInfo.text}
  </span>
</a>