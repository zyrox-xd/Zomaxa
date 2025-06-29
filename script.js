  // Smooth scrolling for navigation links
        document.querySelectorAll('nav a, .cta-button').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });

                    // Close mobile menu after click (on mobile)
                    document.querySelector('.nav-menu').classList.remove('active');
                    document.querySelector('.hamburger').classList.remove('active');
                }
            });
        });
        
        // Fade in elements on scroll
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Apply animations to elements
        const animatedElements = [
            ...document.querySelectorAll('.service-card'),
            ...document.querySelectorAll('.section-header'),
            ...document.querySelectorAll('.about-container'),
            ...document.querySelectorAll('.project-card'),
            ...document.querySelectorAll('.contact-container'),
            ...document.querySelectorAll('.cta')
        ];
        
        animatedElements.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        // Hamburger menu toggle
        const burger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    menu.classList.toggle('active');
    burger.classList.toggle('active');
});
    