
<script>
  import { link, location } from 'svelte-spa-router';

  // Function that returns true if current URL equals the path we pass
  const isActive = (path) => $location === path;
</script>


<nav style="display:flex;gap:1rem;align-items:center;padding:1rem;">
  <a href="/" use:link>Chef Jules</a>
  <a href="/about" use:link>About</a>
  <a href="/services" use:link>Services</a>
  <a href="/gallery" use:link>Gallery</a>
  <a href="/contact" use:link>Contact</a>
</nav>
