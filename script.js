/* Standard Mobile Menu Toggle */
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.toggle('active');
}

/* Highlight Active Nav Link based on URL */
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split("/").pop();
    // Default to index.html if empty
    const page = currentPath === "" ? "index.html" : currentPath;

    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        // Check for exact match or if inside a work- detail page highlighting the 'work' link
        if (itemHref === page || (page.startsWith('work-') && itemHref === 'work.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Check for URL parameters (e.g. ?plan=ABC from services to contact)
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    if (plan && document.getElementById('selected-package')) {
        const input = document.getElementById('selected-package');
        input.value = decodeURIComponent(plan);
        input.style.borderBottomColor = '#D4AF37';
    }

    // Initialize animations
    animateElements();
});

/* Portfolio Filter Logic */
function filterWork(category, btnEl) {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    items.forEach(item => {
        const itemCats = item.getAttribute('data-category') || '';
        if (category === 'all' || itemCats.includes(category)) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
        } else {
            item.style.opacity = '0'; item.style.transform = 'scale(0.95)';
            setTimeout(() => { item.style.display = 'none'; }, 300);
        }
    });
}

/* Pricing Tab Switcher */
function switchPricing(category, event) {
    document.querySelectorAll('.pricing-tab-btn').forEach(btn => btn.classList.remove('active'));
    if(event && event.target) event.target.classList.add('active');
    
    document.querySelectorAll('.pricing-category').forEach(cat => cat.classList.remove('active'));
    
    const selectedCat = document.getElementById(`price-${category}`);
    if (selectedCat) selectedCat.classList.add('active');
}

/* Helper to navigate to contact page with prefilled plan */
function selectPlan(planName) {
    window.location.href = `contact.html?plan=${encodeURIComponent(planName)}`;
}

/* Form Handlers (WhatsApp) */
const waForm = document.getElementById('whatsappForm');
if(waForm) {
    waForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const pack = document.getElementById('selected-package').value;
        const budget = document.getElementById('budget').value;
        const message = document.getElementById('message').value;
        const phoneNumber = "918904198424";
        const rawText = `*New Inquiry: ZOMAXA*\n______________________\n\n*Name:* ${name}\n*Package:* ${pack}\n*Budget:* ${budget}\n*Details:* ${message ? message : 'N/A'}`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(rawText)}`, '_blank');
    });
}

const affForm = document.getElementById('affiliateAppForm');
if(affForm) {
    affForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('aff-name').value;
        const email = document.getElementById('aff-email').value;
        const phone = document.getElementById('aff-phone').value;
        const type = document.getElementById('aff-type').value;
        const message = document.getElementById('aff-message').value;
        const phoneNumber = "918904198424";
        const text = `*New Affiliate Application*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Preferred Commission:* ${type}\n*Why:* ${message || "Not specified"}`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
        this.style.display = 'none';
        document.getElementById('aff-success').style.display = 'block';
    });
}

const teamForm = document.getElementById('joinTeamForm');
if(teamForm) {
    teamForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('job-name').value;
        const role = document.getElementById('job-role').value;
        const link = document.getElementById('job-link').value;
        const phoneNumber = "918904198424";
        const text = `*New Job Application*\n\n*Name:* ${name}\n*Role/Skill:* ${role}\n*Portfolio:* ${link || "Not provided"}`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
    });
}

/* Slider Logic for Glowtiqa Page */
let glowtiqaSlideIndex = 0;
function slideGlowtiqa(direction) {
    const track = document.getElementById('glowtiqa-slider');
    if(!track) return;
    const totalSlides = track.children.length;
    glowtiqaSlideIndex += direction;
    if (glowtiqaSlideIndex < 0) glowtiqaSlideIndex = totalSlides - 1;
    if (glowtiqaSlideIndex >= totalSlides) glowtiqaSlideIndex = 0;
    track.style.transform = `translateX(-${glowtiqaSlideIndex * 100}%)`;
}

/* Scroll Animation Logic */
function animateElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.step-card, .join-card, .benefit-card, .commission-option, .service-card, .process-card, .pricing-card, .section-header, .why-card, .test-card');
    elements.forEach(el => {
        el.style.opacity = '0'; 
        el.style.transform = 'translateY(30px)'; 
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        observer.observe(stat); // Observe stats too to trigger animation
        if (!stat.dataset.animated && stat.getBoundingClientRect().top < window.innerHeight) {
             animateCounter(stat);
        }
    });
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    let current = 0;
    const isPercent = el.textContent.toString().includes('%') || el.getAttribute('data-target') === '100';
    const update = () => {
        if (current < target) {
            current += Math.ceil(target / 40);
            if (current > target) current = target;
            el.textContent = isPercent ? current + '%' : current + (el.getAttribute('data-target') === '2' ? '+' : (el.getAttribute('data-target') === '5' ? '+' : ''));
            requestAnimationFrame(update);
        } else { el.dataset.animated = "true"; }
    };
    update();
}