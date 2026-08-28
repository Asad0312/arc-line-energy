// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 2000);
});

// ==================== CUSTOM CURSOR ====================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;
        cursorOutline.style.left = outlineX - 20 + 'px';
        cursorOutline.style.top = outlineY - 20 + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .service-card, .pricing-card, .portfolio-card, .testimonial-card, .filter-btn, .social-link, .contact-item');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

// ==================== PARTICLES ====================
const particlesCanvas = document.getElementById('particles-canvas');
if (particlesCanvas) {
    const ctx = particlesCanvas.getContext('2d');
    let particles = [];
    let mouseParticle = { x: null, y: null, radius: 150 };

    function resizeCanvas() {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        mouseParticle.x = e.clientX;
        mouseParticle.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * particlesCanvas.width;
            this.y = Math.random() * particlesCanvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > particlesCanvas.width) this.x = 0;
            if (this.x < 0) this.x = particlesCanvas.width;
            if (this.y > particlesCanvas.height) this.y = 0;
            if (this.y < 0) this.y = particlesCanvas.height;

            // Mouse interaction
            if (mouseParticle.x != null) {
                const dx = this.x - mouseParticle.x;
                const dy = this.y - mouseParticle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseParticle.radius) {
                    const force = (mouseParticle.radius - dist) / mouseParticle.radius;
                    this.x += dx * force * 0.02;
                    this.y += dy * force * 0.02;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 109, 0, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        const count = Math.min(80, Math.floor((particlesCanvas.width * particlesCanvas.height) / 15000));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = `rgba(255, 109, 0, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ==================== NAVBAR SCROLL ====================
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== HAMBURGER MENU ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ==================== SCROLL REVEAL ====================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealOnScroll = () => {
    revealElements.forEach((el, index) => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 80) {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 50);
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => setTimeout(revealOnScroll, 2200));

// ==================== COUNTER ANIMATION ====================
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

const animateCounters = () => {
    if (counterAnimated) return;
    const firstCounter = counters[0];
    if (!firstCounter) return;

    const rect = firstCounter.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        counterAnimated = true;
        counters.forEach(counter => {
            const target = counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2200;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            updateCounter();
        });
    }
};

window.addEventListener('scroll', animateCounters);

// ==================== PORTFOLIO FILTER ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        portfolioCards.forEach((card, i) => {
            const show = filter === 'all' || card.getAttribute('data-category') === filter;
            card.style.transition = `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`;
            if (show) {
                card.style.display = 'block';
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1) translateY(0)'; }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9) translateY(20px)';
                setTimeout(() => { card.style.display = 'none'; }, 400);
            }
        });
    });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== TYPING EFFECT ====================
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.wait = parseInt(wait, 10);
        this.wordIndex = 0;
        this.txt = '';
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = this.txt + '<span class="type-cursor">|</span>';

        let typeSpeed = 80;
        if (this.isDeleting) typeSpeed /= 2;

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 400;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const words = ['Clean Energy', 'Solar Power', 'Smart Solutions', 'Bright Future'];
    new TypeWriter(typingElement, words, 2000);
}

// ==================== MAGNETIC BUTTONS ====================
const magneticBtns = document.querySelectorAll('.btn-primary, .nav-cta');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ==================== TILT EFFECT ON CARDS ====================
const tiltCards = document.querySelectorAll('.service-card, .pricing-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - y) * 8;
        const rotateY = (x - 0.5) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== GLOW ON SCROLL ====================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelectorAll('.hero-bg .orb').forEach((orb, i) => {
        const speed = (i + 1) * 0.02;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== SMOOTH SCROLLING ====================
// Enhanced smooth scrolling with easing
(function() {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Lenis-like lerp smooth scroll (no external library needed)
    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let isScrolling = false;

    const lerpScroll = () => {
        currentScroll += (targetScroll - currentScroll) * 0.08;
        if (Math.abs(targetScroll - currentScroll) > 0.5) {
            window.scrollTo(0, currentScroll);
            requestAnimationFrame(lerpScroll);
        } else {
            window.scrollTo(0, targetScroll);
            isScrolling = false;
        }
    };

    // Intercept wheel events for smooth scrolling
    let isWheelLocked = false;
    window.addEventListener('wheel', (e) => {
        if (isWheelLocked) return;
        isWheelLocked = true;
        targetScroll += e.deltaY;
        targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(lerpScroll);
        }
        setTimeout(() => { isWheelLocked = false; }, 80);
    }, { passive: true });

    // Smooth scroll for back-to-top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            targetScroll = 0;
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(lerpScroll);
            }
        });
    }
})();

console.log('%c⚡ Arc Line Energy ', 'background: linear-gradient(135deg, #ff6d00, #ff9e40); color: white; font-size: 24px; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-family: Orbitron, sans-serif;');
