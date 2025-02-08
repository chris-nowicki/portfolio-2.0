<script lang="ts">
  import { cn } from '@/utils/utils';

  export let active: boolean;
</script>

<button
  class={cn(
    'rounded-lg border px-4 py-2 text-sm transition-colors duration-200 ease-in-out cursor-pointer',
    {
      'bg-primary text-white': active,
      'text-primary hover:bg-primary hover:text-white': !active,
    }
  )}
  on:click
>
  <slot />
</button>