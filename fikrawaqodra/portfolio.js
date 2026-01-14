document.addEventListener('DOMContentLoaded', function() {
    // شريط التنقل المتحرك
    const navbar = document.querySelector('.hologram-nav');
    const navContainer = document.querySelector('.nav-container');
    const hologramBtn = document.querySelector('.hologram-btn');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // قائمة الهاتف المتحرك
    hologramBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navContainer.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hologramBtn.classList.remove('active');
            navContainer.classList.remove('active');
        });
    });
    
    // تأثيرات الحركة عند التمرير
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // تشغيل مرة أولية للعناصر المرئية
    
    // تأثيرات العدادات
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // تشغيل العدادات عند التمرير للقسم
    const statsSection = document.querySelector('.interactive-stats');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
        }
    }, {threshold: 0.5});
    
    observer.observe(statsSection);
    
    // تأثير الميل على بطاقات المشاريع
    if (document.querySelectorAll('.h-project').length > 0) {
        VanillaTilt.init(document.querySelectorAll(".h-project"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }
    
    // تصفية المشاريع
    const filterBtns = document.querySelectorAll('.h-filter');
    const portfolioItems = document.querySelectorAll('.h-project');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة النشط من جميع الأزرار
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // إضافة النشط للزر المختار
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});