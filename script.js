// Mobile nav
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 40) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');
});

// Smooth scroll for # anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Scroll reveal ─────────────────────────────────────────────────────────────
document.documentElement.classList.add('js-ready');

const revealSelectors = [
    '.bento-card',
    '.svc-box',
    '.project-card',
    '.pgrid-card',
    '.about-row',
    '.about-row-label',
    '.about-row-body',
    '.hero-content',
    '.hero-image-wrap',
    '.about-bento-summary',
    '.section-divider',
    '.portfolio-hero-inner',
    '.portfolio-tabs',
    '.contact-inner',
    '.about-page-hero-inner',
];

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('reveal');
        // stagger siblings inside the same parent
        el.style.transitionDelay = `${i * 0.07}s`;
        revealObserver.observe(el);
    });
});

// ── Nav link underline slide ───────────────────────────────────────────────────
document.querySelectorAll('.nav-menu a:not(.nav-cta)').forEach(link => {
    link.classList.add('nav-link-anim');
});
