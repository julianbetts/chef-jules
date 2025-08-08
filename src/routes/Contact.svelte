<script>
  let name = "", email = "", message = "";
  function submit(e) {
    e.preventDefault();
    alert(`Thanks, ${name}! We’ll be in touch at ${email}.`);
    // later: hook up EmailJS / Netlify forms / a serverless function
  }
</script>

<section style="padding:2rem 1rem;max-width:700px;margin:auto;">
  <h2>Contact</h2>
  <form on:submit|preventDefault={submit} style="display:grid;gap:0.75rem;">
    <input placeholder="Name" bind:value={name} required />
    <input type="email" placeholder="Email" bind:value={email} required />
    <textarea
    placeholder="Tell us about your event"
    rows="6"
    bind:value={message}
    required
    ></textarea>    
    <button type="submit">Send</button>
  </form>
</section>
