<script lang="ts">
  import { navLinks } from '@/lib/site'
  import { cn } from '@/utils/utils'
  import { slide } from 'svelte/transition'
  import { quartOut } from 'svelte/easing'

  export let isOpen: boolean
  export let onClose: () => void

  let pathname = ''

  import { onMount } from 'svelte'
  onMount(() => {
    pathname = window.location.pathname.split('/')[1]
  })

  const mobileNavLinks = [{ href: '/', text: 'home' }, ...navLinks]
</script>

{#if isOpen}
  <div
    class="fixed top-[80px] left-0 right-0 z-40 flex justify-center w-full px-4"
    transition:slide={{ duration: 300, easing: quartOut }}
  >
    <div
      class="bg-white shadow-sm w-full max-w-2xl rounded-b-lg border border-t-0"
    >
      <nav class="py-6 px-4">
        <ul class="flex flex-col items-center gap-4 text-4xl font-cursive">
          {#each mobileNavLinks as { href, text }, index}
            {@const isActive = text === pathname}
            {@const isLast = index === mobileNavLinks.length - 1}
            <li
              class="w-full"
            >
              <a
                {href}
                class={cn(
                  'block text-center transition-colors duration-300 ease-in-out hover:text-blue-600',
                  isActive ?
                    'text-blue-600 font-medium'
                  : 'text-muted-foreground'
                )}
                on:click={onClose}
                aria-current={isActive ? 'page' : undefined}
              >
                {text}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </div>
{/if}

<style>
  .font-cursive {
    font-family: var(--font-cursive, 'Cursive', serif);
  }
</style>
