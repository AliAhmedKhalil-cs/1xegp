// ============ Mobile Menu Toggle ============
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuClose = document.querySelector('.side-menu-close');
    const menuLinks = document.querySelectorAll('.side-menu a');

    // Open menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sideMenu?.classList.add('active');
            menuOverlay?.classList.add('active');
        });
    }

    // Close menu button
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            sideMenu?.classList.remove('active');
            menuOverlay?.classList.remove('active');
        });
    }

    // Close menu on overlay click
    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            sideMenu?.classList.remove('active');
            menuOverlay?.classList.remove('active');
        });
    }

    // Close menu when clicking links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideMenu?.classList.remove('active');
            menuOverlay?.classList.remove('active');
        });
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            sideMenu?.classList.remove('active');
            menuOverlay?.classList.remove('active');
        }
    });
});

// ============ Smooth Scrolling ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============ Active Menu Item ============
function setActiveMenuItems() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveMenuItems();

// ============ Intersection Observer for Animations ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
const animatedElements = document.querySelectorAll(
    '.agent-card, .feature, .channel-card, .content-box, .faq-item, .method-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============ Lazy Loading Images ============
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============ Performance Optimization ============
// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Log successful page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('✓ Website loaded successfully');
    });
} else {
    console.log('✓ Website loaded successfully');
}

// ============ Prevent Double-Click Text Selection ============
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('mousedown', (e) => {
        if (e.detail > 1) {
            e.preventDefault();
        }
    });
});

// ============ Performance Monitoring ============
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime, 'ms');
    });
}


// ============ COUNTDOWN TIMER ============
function startCountdown() {
    // تعيين الوقت النهائي (24 ساعة من الآن)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            // إعادة تعيين المؤقت عند انتهاء الوقت
            document.getElementById('hours').textContent = '23';
            document.getElementById('minutes').textContent = '59';
            document.getElementById('seconds').textContent = '59';
            
            // إعادة تشغيل المؤقت
            setTimeout(startCountdown, 1000);
            return;
        }
        
        // حساب الساعات والدقائق والثواني
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // تحديث العناصر مع إضافة صفر إذا كان الرقم أقل من 10
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        // تحديث المؤقت كل ثانية
        setTimeout(updateTimer, 1000);
    }
    
    // تشغيل المؤقت الأول
    updateTimer();
}

// تشغيل المؤقت عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', startCountdown);

// ============ HIGHLIGHT PAYMENT METHOD ============
// تأثير حركة على طرق الدفع
const paymentItems = document.querySelectorAll('.payment-item');

paymentItems.forEach((item, index) => {
    // تأثير الظهور التدريجي
    item.style.opacity = '0';
    item.style.animation = `fadeInUp 0.6s ease forwards`;
    item.style.animationDelay = `${index * 0.1}s`;
});

// إضافة animation إلى CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============ REVIEW CARDS ANIMATION ============
// تأثير الظهور التدريجي على بطاقات التقييمات
const reviewCards = document.querySelectorAll('.review-card');

if (reviewCards.length > 0) {
    const reviewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                entry.target.style.animationDelay = `${(index % 3) * 0.1}s`;
                reviewObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reviewCards.forEach(card => {
        reviewObserver.observe(card);
    });
}

// ============ CATEGORY CARDS ANIMATION ============
const categoryCards = document.querySelectorAll('.category-card');

if (categoryCards.length > 0) {
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                entry.target.style.animationDelay = `${(index % 3) * 0.1}s`;
                categoryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    categoryCards.forEach(card => {
        categoryObserver.observe(card);
    });
}

// ============ REASON CARDS ANIMATION ============
const reasonCards = document.querySelectorAll('.reason-card');

if (reasonCards.length > 0) {
    const reasonObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                entry.target.style.animationDelay = `${(index % 3) * 0.1}s`;
                reasonObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reasonCards.forEach(card => {
        reasonObserver.observe(card);
    });
}