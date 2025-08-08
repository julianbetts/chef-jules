<script>
  import Router from 'svelte-spa-router';
  import Nav from './components/Nav.svelte';
  import Footer from './components/Footer.svelte';

  import Home from './routes/Home.svelte';
  import About from './routes/About.svelte';
  import Services from './routes/Services.svelte';
  import Gallery from './routes/Gallery.svelte';
  import Contact from './routes/Contact.svelte';
  import NotFound from './routes/NotFound.svelte';

  const routes = {
    '/': Home,
    '/about': About,
    '/services': Services,
    '/gallery': Gallery,
    '/contact': Contact,
    '*': NotFound // NEW
  };
</script>

<Nav />
<main style="min-height:70vh;">
  <Router {routes} />
</main>
<Footer />
