    // ===============================
    // تهيئة عامة للصفحة
    // ===============================
    document.addEventListener('DOMContentLoaded', function() {
        // ===============================
        // تبديل الوضع المظلم
        // ===============================
        const toggle = document.getElementById('darkToggle');
        const root = document.documentElement;
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        /**
         * تطبيق الوضع المظلم أو الفاتح
         * @param {boolean} dark - true للوضع المظلم, false للوضع الفاتح
         */
        function applyDark(dark){
            if(dark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            toggle.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
        }

        // التهيئة الأولية للوضع المظلم
        const saved = localStorage.getItem('prefers-dark');
        if(saved !== null) {
            applyDark(saved === '1');
        } else {
            applyDark(prefersDark);
        }

        toggle.addEventListener('click', ()=>{
            const isDark = root.classList.toggle('dark');
            localStorage.setItem('prefers-dark', isDark ? '1' : '0');
            applyDark(isDark);
        });

        // ===============================
        // تأثير الظهور عند التمرير (Reveal Animation)
        // ===============================
        const reveals = document.querySelectorAll('.reveal');
        if(reveals.length > 0) {
            const io = new IntersectionObserver(entries =>{
                entries.forEach(e=>{
                    if(e.isIntersecting){ 
                        e.target.classList.add('visible');
                        io.unobserve(e.target);
                    }
                })
            }, { threshold: 0.12 });
            
            reveals.forEach(r=>io.observe(r));
        }

        // ===============================
        // تفعيل الروابط النشطة في جدول المحتويات
        // ===============================
        const tocLinks = document.querySelectorAll('#toc a');
        
        function setActiveToc(){
            let index = -1;
            const sections = Array.from(tocLinks).map(a=>document.querySelector(a.getAttribute('href')));
            
            sections.forEach((sec,i)=>{
                if(sec) {
                    const r = sec.getBoundingClientRect();
                    if(r.top <= 120) index = i;
                }
            });
            
            tocLinks.forEach((a,i)=> a.classList.toggle('active', i===index));
        }
        
        if(tocLinks.length > 0) {
            window.addEventListener('scroll', setActiveToc);
            setActiveToc();
        }

        // ===============================
        // التمرير السلس لروابط جدول المحتويات
        // ===============================
        document.querySelectorAll('a[href^="#"]').forEach(a=>{
            a.addEventListener('click', function(e){
                const target = document.querySelector(this.getAttribute('href'));
                if(target){ 
                    e.preventDefault();
                    target.scrollIntoView({behavior:'smooth', block:'start'});
                }
            });
        });

        // ===============================
        // اختصار الطباعة لزر PDF
        // ===============================
        document.querySelectorAll('a[href="#summary"]').forEach(a=> 
            a.addEventListener('click', (e)=>{ 
                setTimeout(()=>window.print(), 300);
            })
        );

        // ===============================
        // تبديل ظهور الأقسام (قابل للطي)
        // ===============================
        const sectionsToggle = document.getElementById('sectionsToggle');
        const sectionsContent = document.getElementById('sections');
        const sectionsIcon = document.getElementById('sectionsIcon');
        
        if(sectionsToggle && sectionsContent) {
            sectionsToggle.addEventListener('click', () => {
                sectionsContent.classList.toggle('collapsed');
                if(sectionsIcon) sectionsIcon.classList.toggle('collapsed');
            });
        }

        // ===============================
        // تبديل ظهور جدول المحتويات (قابل للطي)
        // ===============================
        const tocToggle = document.getElementById('tocToggle');
        const tocContent = document.getElementById('toc');
        const tocIcon = document.getElementById('tocIcon');
        
        if(tocToggle && tocContent) {
            tocToggle.addEventListener('click', () => {
                tocContent.classList.toggle('collapsed');
                if(tocIcon) tocIcon.classList.toggle('collapsed');
            });
        }

        // ===============================
        // زر الصعود إلى الأعلى
        // ===============================
        const goToTopButton = document.getElementById('go-to-top-button');

        function toggleScrollButton() {
            if(goToTopButton) {
                goToTopButton.style.display = window.scrollY > 100 ? 'flex' : 'none';
            }
        }

        window.addEventListener('scroll', toggleScrollButton);
        toggleScrollButton();

        if(goToTopButton) {
            goToTopButton.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    });
