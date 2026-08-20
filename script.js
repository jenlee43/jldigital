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
            setTimeout(() => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }, 150);
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

// ── Certificate lightbox ─────────────────────────────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.cert-img--clickable').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });
}

// ── Certifications carousel ───────────────────────────────────────────────────
const certScroll = document.getElementById('certScroll');
const certPrev = document.querySelector('.cert-arrow--prev');
const certNext = document.querySelector('.cert-arrow--next');

function getCertScrollAmount() {
    if (!certScroll) return 320;
    const card = certScroll.querySelector('.cert-card');
    if (!card) return 320;
    const track = certScroll.querySelector('.certifications-track');
    const gap = track ? parseFloat(getComputedStyle(track).gap) || 24 : 24;
    return card.offsetWidth + gap;
}

function updateCertArrows() {
    if (!certScroll || !certPrev || !certNext) return;
    const maxScroll = certScroll.scrollWidth - certScroll.clientWidth;
    certPrev.disabled = certScroll.scrollLeft <= 1;
    certNext.disabled = certScroll.scrollLeft >= maxScroll - 1;
}

function scrollCerts(direction) {
    if (!certScroll) return;
    certScroll.scrollBy({ left: direction * getCertScrollAmount(), behavior: 'smooth' });
}

certPrev?.addEventListener('click', () => scrollCerts(-1));
certNext?.addEventListener('click', () => scrollCerts(1));
certScroll?.addEventListener('scroll', updateCertArrows);
window.addEventListener('resize', updateCertArrows);
updateCertArrows();

// ── Skills tabs ──────────────────────────────────────────────────────────────
const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skills-panel');

skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('skill-tab--active'));
        tab.classList.add('skill-tab--active');
        const filter = tab.dataset.skillFilter;
        skillPanels.forEach(panel => {
            panel.style.display = panel.dataset.skillCat === filter ? '' : 'none';
        });
    });
});

// ── Nav link underline slide ───────────────────────────────────────────────────
document.querySelectorAll('.nav-menu a:not(.nav-cta)').forEach(link => {
    link.classList.add('nav-link-anim');
});
