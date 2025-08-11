(function(){
  const endpoint = document.body.dataset.acEndpoint || "content/site.json";

  async function getJSON(url){
    const res = await fetch(url, {cache:"no-store"});
    if(!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
    return res.json();
  }

  function text(node, value){ if(node) node.textContent = value || ""; }

  function render(data){
    // Title + meta
    document.title = `${data.siteName} — ${data.tagline}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if(metaDesc) metaDesc.setAttribute("content", `${data.hero?.subheadline || data.tagline}`);

    // Header brand
    text(document.querySelector("[data-ac=brand]"), data.siteName);

    // Hero
    text(document.querySelector("[data-ac=hero-headline]"), data.hero?.headline);
    text(document.querySelector("[data-ac=hero-sub]"), data.hero?.subheadline);
    const cta = document.querySelector("[data-ac=cta]");
    if(cta){
      cta.textContent = data.cta?.text || "Get in touch";
      cta.href = data.cta?.href || "#contact";
    }

    // About
    text(document.querySelector("[data-ac=about-title]"), data.about?.title);
    text(document.querySelector("[data-ac=about-body]"), data.about?.body);

    // Services
    const servicesEl = document.querySelector("[data-ac=services]");
    if(servicesEl){
      servicesEl.innerHTML = "";
      (data.services || []).forEach(s => {
        const item = document.createElement("div");
        item.className = "card";
        item.innerHTML = `<h3>${s.title}</h3><p>${s.desc || ""}</p>`;
        servicesEl.appendChild(item);
      });
    }

    // Menu
    text(document.querySelector("[data-ac=menu-title]"), data.menu?.title || "Menu");
    const menuEl = document.querySelector("[data-ac=menu-items]");
    if(menuEl){
      menuEl.innerHTML = "";
      (data.menu?.items || []).forEach(m => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
          <div>
            <div class="name">${m.name}</div>
            <div class="desc">${m.desc || ""}</div>
          </div>
        `;
        menuEl.appendChild(div);
      });
    }

    // Testimonials
    const tWrap = document.querySelector("[data-ac=testimonials]");
    if(tWrap){
      tWrap.innerHTML = "";
      (data.testimonials || []).forEach(t => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<div class="quote">“${t.quote}”</div><div class="author">— ${t.author || "Client"}</div>`;
        tWrap.appendChild(card);
      });
    }

    // Contact
    const insta = document.querySelector("[data-ac=insta]");
    if(insta && data.contact?.insta){
      insta.href = data.contact.insta;
      insta.classList.remove("hidden");
    }
    const emailBtn = document.querySelector("[data-ac=email-btn]");
    if(emailBtn && data.contact?.email){
      emailBtn.href = `mailto:${data.contact.email}?subject=Inquiry from website`;
    }
    text(document.querySelector("[data-ac=contact-note]"), data.contact?.note || "");
    text(document.querySelector("[data-ac=footer]"), `${data.siteName} · ${data.location || ""}`);

    // JSON-LD
    const ld = {
      "@context": "https://schema.org",
      "@type": data.schema?.type || "LocalBusiness",
      "name": data.siteName,
      "areaServed": data.location || "Los Angeles, CA",
      "description": data.hero?.subheadline || data.tagline,
      "sameAs": data.schema?.sameAs || []
    };
    const ldScript = document.getElementById("jsonld");
    if(ldScript){ ldScript.textContent = JSON.stringify(ld, null, 2); }
  }

  function smoothAnchors(){
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const id = a.getAttribute("href").slice(1);
        const el = document.getElementById(id);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:"smooth", block:"start"});
        }
      });
    });
  }

  // Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });

  // Close when a link is clicked
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });

  // Close on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
  });

  // If user resizes to desktop, ensure menu is closed
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
  });
}


  getJSON(endpoint)
    .then(render)
    .catch(err => {
      console.error(err);
      const hero = document.querySelector(".hero .lead");
      if(hero){
        hero.textContent = "We’re updating our menu. Check back soon.";
      }
    })
    .finally(smoothAnchors);
})();
