<script lang="ts">
  import clsx from 'clsx';

  interface navItem {
    name: string;
    href: string;
  }

  export let navigationItems: navItem[];
</script>

<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
  <div class="flex lg:flex-1">
    <a href="/" class="-m-1.5 p-1.5">
      <span class="sr-only">Your Company</span>
      <img
        class="h-8 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        alt="logo"
        width={100}
        height={100}
      />
    </a>
  </div>

  <div class="hidden lg:flex lg:gap-x-12">
    {#each navigationItems as { name, href }}
      <a
        {href}
        class={clsx(
          'text-sm font-semibold leading-6 text-black dark:text-white'
        )}
      >
        {name}
      </a>
    {/each}
  </div>
  <div class="hidden lg:flex lg:flex-1 lg:justify-end"></div>
</nav>
