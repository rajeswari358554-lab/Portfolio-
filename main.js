// Initialize Lucide Icons
lucide.createIcons();

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Cursor Follower
const cursor = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Mobile Menu Toggle (Simplified placeholder)
const menuBtn = document.querySelector('#mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => {
    // In a real app, you'd toggle a class to show/hide the menu on mobile
    alert('Mobile menu clicked! In a full implementation, this would open a slide-out navigation.');
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // If it's a skill card, animate the progress bar
            if (entry.target.classList.contains('skill-card')) {
                const bar = entry.target.querySelector('.progress-bar');
                if (bar) {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;
                }
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select elements to animate
const animateElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .about-image');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Special handling for animated elements in CSS
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .cursor-follower {
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 9999;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    }
`;
document.head.appendChild(style);

// Smooth Scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission handling
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;

    btn.textContent = 'Message Sent!';
    btn.style.background = 'var(--accent)';

    contactForm.reset();

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
    }, 3000);
});
