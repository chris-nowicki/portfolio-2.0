<script lang="ts">
  import ArrowIcon from './ArrowIcon.svelte'

  export let href: string
  export let title: string
  export let description: string | undefined = undefined
  export let external = false
</script>

<div
  class="group flex items-center justify-between border-b pb-2 transition-colors duration-200 ease-in-out hover:border-blue-600"
>
  <div class="mr-4">
    <a
      {href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      <h3 class="text-sm group-hover:text-blue-600 sm:text-base">
        {title}
      </h3>
      {#if description}
        <p
          class="text-foreground-muted text-sm group-hover:text-blue-600 sm:text-base"
        >
          {description}
        </p>
      {/if}
    </a>
    <slot />
  </div>
  <a
    {href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    aria-label={`Go to ${title}`}
  >
    <ArrowIcon direction={external ? 'diagonal-up' : 'right'} />
  </a>
</div>
