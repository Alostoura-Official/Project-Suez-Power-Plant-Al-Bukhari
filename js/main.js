 // Dark mode toggle
    const toggle = document.getElementById('darkToggle');
    const root = document.documentElement;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyDark(dark){
      if(dark) root.classList.add('dark'); else root.classList.remove('dark');
      // update icon
      toggle.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    }

    // initial
    const saved = localStorage.getItem('prefers-dark');
    if(saved !== null) applyDark(saved === '1'); else applyDark(prefersDark);

    toggle.addEventListener('click', ()=>{
      const isDark = root.classList.toggle('dark');
      localStorage.setItem('prefers-dark', isDark ? '1' : '0');
      applyDark(isDark);
    });

    // Smooth reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries =>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
      })
    }, { threshold: 0.12 });
    reveals.forEach(r=>io.observe(r));

    // TOC active link
    const tocLinks = document.querySelectorAll('#toc a');
    function setActiveToc(){
      let index = -1;
      const sections = Array.from(tocLinks).map(a=>document.querySelector(a.getAttribute('href')));
      sections.forEach((sec,i)=>{
        const r = sec.getBoundingClientRect();
        if(r.top <= 120) index = i;
      });
      tocLinks.forEach((a,i)=> a.classList.toggle('active', i===index));
    }
    window.addEventListener('scroll', setActiveToc);
    setActiveToc();

    // smooth scrolling for TOC
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
      });
    });

    // Print shortcut for PDF button
    document.querySelectorAll('a[href="#summary"]').forEach(a=> a.addEventListener('click', (e)=>{ setTimeout(()=>window.print(), 300); }));