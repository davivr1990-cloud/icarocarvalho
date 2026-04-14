// Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        menuToggle.classList.add('open');
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    } else {
        menuToggle.classList.remove('open');
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }
}

menuToggle.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

// GSAP Animations
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 768;

    // Hero animations
    gsap.from(".gsap-hero-content > *", {
        y: isMobile ? 20 : 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
    });

    gsap.from(".gsap-hero-image", {
        x: isMobile ? 0 : 50,
        y: isMobile ? 30 : 0,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5
    });

    // Fade Up elements
    gsap.utils.toArray('.gsap-fade-up').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: isMobile ? "top 95%" : "top 85%",
            },
            y: isMobile ? 25 : 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Floating WhatsApp visibility toggle based on scroll (starts showing after first section)
    const whatsappBtn = document.getElementById('floating-whatsapp');

    ScrollTrigger.create({
        trigger: "#como-funciona", // Show after hero
        start: "top 50%",
        onEnter: () => {
            whatsappBtn.classList.remove('translate-y-24', 'opacity-0');
        },
        onLeaveBack: () => {
            whatsappBtn.classList.add('translate-y-24', 'opacity-0');
        }
    });

    // Carousel Dot Navigation Logic (Simulated for visual)
    const carousel = document.getElementById('social-carousel');
    const dots = document.querySelectorAll('#carousel-dots > div');

    if (carousel && dots.length > 0) {
        carousel.addEventListener('scroll', () => {
            const scrollPercent = carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
            const activeIndex = Math.min(Math.floor(scrollPercent * dots.length + 0.5), dots.length - 1);

            dots.forEach((dot, idx) => {
                if (idx === activeIndex) {
                    dot.className = 'w-8 h-1 bg-primary rounded-full transition-all duration-300';
                } else {
                    dot.className = 'w-2 h-1 bg-white/10 rounded-full transition-all duration-300';
                }
            });
        });
    }
});
