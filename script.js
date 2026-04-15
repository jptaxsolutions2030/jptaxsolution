document.addEventListener("DOMContentLoaded", function () {

    // --- Initialize AOS ---
    AOS.init({ duration: 900, once: true, offset: 80 });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.background = window.scrollY > 60
                ? 'rgba(8,8,8,0.99)'
                : 'rgba(8,8,8,0.97)';
        });
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 130) current = s.id;
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.includes(current)) link.classList.add('active');
        });
    });

    // --- Animated Counters ---
    const statsSection = document.querySelector('#stats');
    const counters = document.querySelectorAll('.stat-number');
    if (statsSection && counters.length) {
        let counted = false;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const step = Math.ceil(target / 80);
                    const timer = setInterval(() => {
                        count = Math.min(count + step, target);
                        counter.textContent = count;
                        if (count >= target) {
                            counter.textContent = target + '+';
                            clearInterval(timer);
                        }
                    }, 18);
                });
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // --- Testimonial Swiper ---
    if (document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 700,
            autoplay: { delay: 4500, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 24 },
                1200: { slidesPerView: 3, spaceBetween: 28 }
            }
        });
    }

    // --- Cursor Glow ---
    const glow = document.querySelector('.cursor-glow');
    if (glow) {
        document.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            });
        });
    }

    // --- Contact Form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type=submit]');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #2d8a4e, #1a5c34)';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                this.reset();
            }, 3500);
        });
    }

    // Handle browser cache on back/forward
    window.addEventListener('pageshow', e => { if (e.persisted) AOS.refresh(); });
});
