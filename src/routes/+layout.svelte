<script>
  import '../app.pcss';
  // import Navbar from '$lib/components/navigation/navbar.svelte';
  import { Navbar } from '$lib/components';

  let navigationItems = [{ name: 'Quiz One', href: '/quiz' }];
</script>

<Navbar {navigationItems} />

<slot />
