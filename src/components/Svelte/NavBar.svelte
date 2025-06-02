<script lang="ts">
  import { cn } from '@/utils/utils'
  import { navLinks } from '@/lib/site'
  import { onMount } from 'svelte'
  import MobileMenu from './MobileMenu.svelte'

  let isOpen = false
  let pathname = ''

  onMount(() => {
    pathname = window.location.pathname.split('/')[1]

    // Prevent body scrolling when menu is open
    return () => {
      document.body.style.overflow = ''
    }
  })

  // Toggle mobile menu
  function toggleMenu() {
    isOpen = !isOpen
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }

  // Close mobile menu
  function closeMenu() {
    isOpen = false
    document.body.style.overflow = ''
  }
</script>

<div
  class="fixed top-6 left-0 right-0 w-full flex justify-center items-center z-50 px-4"
>
  <nav
    class={cn(
      'text-muted-foreground flex items-center justify-between border rounded-lg w-full max-w-2xl px-4 py-3 bg-white',
      isOpen ? 'rounded-b-none border-b-0 shadow-none' : 'shadow-sm'
    )}
    style="transition: background-color 0.3s, box-shadow 0.3s, border-radius 0.3s;"
  >
    <a
      href="/"
      class="font-cursive rounded-full border bg-white px-2 py-1 transition-colors duration-300 sm:text-2xl text-blue-600 border-blue-600 hover:shadow-lg"
    >
      CN
    </a>

    <ul
      class="font-cursive hidden list-none gap-4 text-3xl md:flex"
      aria-label="Desktop navigation"
    >
      {#each navLinks as { href, text }}
        {@const isActive = text === pathname}
        <li>
          <a
            {href}
            class={cn(
              'group hover:text-blue-600 transition-colors duration-200 ease-in-out',
              isActive ? 'text-blue-600' : 'text-muted-foreground'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {text}
          </a>
        </li>
      {/each}
    </ul>
    <button
      class="hamburger ml-4 flex md:hidden"
      on:click={toggleMenu}
      aria-label="Toggle mobile menu"
      aria-expanded={isOpen}
    >
      <div class="relative flex flex-col justify-between w-6 h-5">
        <span
          class={cn(
            'h-0.5 w-full bg-black absolute transition-all duration-300',
            isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
          )}
        ></span>
        <span
          class={cn(
            'h-0.5 w-full bg-black absolute top-1/2 -translate-y-1/2 transition-all duration-300',
            isOpen ? 'opacity-0' : 'opacity-100'
          )}
        ></span>
        <span
          class={cn(
            'h-0.5 w-full bg-black absolute transition-all duration-300',
            isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
          )}
        ></span>
      </div>
    </button>
  </nav>
</div>

<MobileMenu {isOpen} onClose={closeMenu} />

<style>
  /* You can add any additional component styles here */
</style>
