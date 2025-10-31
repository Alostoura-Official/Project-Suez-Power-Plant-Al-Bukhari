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
        root.classList.add('dark');  // إضافة كلاس الوضع المظلم
      } else {
        root.classList.remove('dark'); // إزالة كلاس الوضع المظلم
      }
      // تحديث الأيقونة حسب الوضع
      toggle.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    }

    // التهيئة الأولية - التحقق من الإعدادات المحفوظة أو تفضيلات النظام
    const saved = localStorage.getItem('prefers-dark');
    if(saved !== null) {
      applyDark(saved === '1'); // استخدام الإعدادات المحفوظة
    } else {
      applyDark(prefersDark); // استخدام تفضيلات النظام
    }

    // إضافة مستمع حدث للنقر على زر التبديل
    toggle.addEventListener('click', ()=>{
      const isDark = root.classList.toggle('dark'); // تبديل الوضع
      localStorage.setItem('prefers-dark', isDark ? '1' : '0'); // حفظ التفضيل
      applyDark(isDark); // تطبيق التغييرات
    });

    // ===============================
    // تأثير الظهور عند التمرير (Reveal Animation)
    // ===============================
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries =>{
      entries.forEach(e=>{
        if(e.isIntersecting){ 
          e.target.classList.add('visible'); // إضافة كلاس الظهور
          io.unobserve(e.target); // إيقاف المراقبة بعد الظهور
        }
      })
    }, { threshold: 0.12 }); // نسبة 12% من العنصر يجب أن تكون مرئية
    
    // بدء مراقبة جميع العناصر
    reveals.forEach(r=>io.observe(r));

    // ===============================
    // تفعيل الروابط النشطة في جدول المحتويات
    // ===============================
    const tocLinks = document.querySelectorAll('#toc a');
    
    function setActiveToc(){
      let index = -1;
      // تحويل الروابط إلى عناصر المقابلة لها في الصفحة
      const sections = Array.from(tocLinks).map(a=>document.querySelector(a.getAttribute('href')));
      
      // تحديد القسم النشط بناءً على موضع التمرير
      sections.forEach((sec,i)=>{
        const r = sec.getBoundingClientRect();
        if(r.top <= 120) index = i; // إذا كان القسم قريب من الأعلى
      });
      
      // تطبيق الحالة النشطة على الرابط المناسب
      tocLinks.forEach((a,i)=> a.classList.toggle('active', i===index));
    }
    
    // إضافة مستمعي الأحداث
    window.addEventListener('scroll', setActiveToc);
    setActiveToc(); // التنفيذ الأولي

    // ===============================
    // التمرير السلس لروابط جدول المحتويات
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target){ 
          e.preventDefault(); // منع السلوك الافتراضي
          target.scrollIntoView({behavior:'smooth', block:'start'}); // تمرير سلس
        }
      });
    });

    // ===============================
    // اختصار الطباعة لزر PDF
    // ===============================
    document.querySelectorAll('a[href="#summary"]').forEach(a=> 
      a.addEventListener('click', (e)=>{ 
        setTimeout(()=>window.print(), 300); // طباعة الصفحة بعد 300 مللي ثانية
      })
    );

    // ===============================
    // تبديل ظهور الأقسام (قابل للطي)
    // ===============================
    const sectionsToggle = document.getElementById('sectionsToggle');
    const sectionsContent = document.getElementById('sections');
    const sectionsIcon = document.getElementById('sectionsIcon');
    
    sectionsToggle.addEventListener('click', () => {
      sectionsContent.classList.toggle('collapsed'); // طي/فتح المحتوى
      sectionsIcon.classList.toggle('collapsed'); // تدوير الأيقونة
    });

    // ===============================
    // تبديل ظهور جدول المحتويات (قابل للطي)
    // ===============================
    const tocToggle = document.getElementById('tocToggle');
    const tocContent = document.getElementById('toc');
    const tocIcon = document.getElementById('tocIcon');
    
    tocToggle.addEventListener('click', () => {
      tocContent.classList.toggle('collapsed'); // طي/فتح المحتوى
      tocIcon.classList.toggle('collapsed'); // تدوير الأيقونة
    });

    // ===============================
    // زر الصعود إلى الأعلى
    // ===============================
    const goToTopButton = document.getElementById('go-to-top-button');

    // إظهار أو إخفاء الزر بناءً على موضع التمرير
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) { 
            // يظهر الزر بعد تجاوز 100 بكسل من التمرير
            goToTopButton.style.display = 'flex';
        } else {
            // إخفاء الزر عندما يكون التمرير في الأعلى
            goToTopButton.style.display = 'none';
        }
    });

    // تغيير لون الزر عند تمرير الماوس فوقه
    goToTopButton.addEventListener('mouseenter', function () {
        goToTopButton.style.backgroundColor = '#fbd034'; // اللون الأصفر
    });

    // إعادة اللون الأصلي عند إزالة الماوس
    goToTopButton.addEventListener('mouseleave', function () {
        goToTopButton.style.backgroundColor = '#092C9F'; // اللون الأزرق
    });

    // التمرير إلى الأعلى عند النقر على الزر
    goToTopButton.addEventListener('click', function () {
        goToTopButton.style.backgroundColor = '#fbd034'; // تغيير اللون إلى الأصفر عند النقر

        // التمرير السلس إلى أعلى الصفحة
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // إعادة اللون الأصلي بعد انتهاء التمرير
        setTimeout(() => {
            goToTopButton.style.backgroundColor = '#092C9F';
        }, 500); // بعد نصف ثانية من النقر
    });
