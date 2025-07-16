const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});


function initHeroAnimations() {
    const heroElements = [
        { selector: '.intro-text', delay: 1500, animation: 'fadeUp' },
        { selector: '.main-title', delay: 2000, animation: 'fadeUp' },
        { selector: '.subtitle-container .with', delay: 2500, animation: 'slideFromLeft' },
        { selector: '.subtitle-container .flutter', delay: 2500, animation: 'slideFromRight' },
        { selector: '.location-contact .location', delay: 2700, animation: 'slideFromLeft' },
        { selector: '.location-contact .contact-text', delay: 2700, animation: 'slideFromRight' }
    ];

    heroElements.forEach(({ selector, delay, animation }) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.classList.add('animate-' + animation);
            }, delay);
        }
    });
}

// Floating particles animation
function createFloatingParticles() {
    const particleCount = 20;
    const container = document.querySelector('.hero-section');
    
    if (!container) return;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 6 + 2;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${initialX}%;
            top: ${initialY}%;
            animation: float ${duration}s infinite ease-in-out;
            animation-delay: ${delay}s;
            pointer-events: none;
            z-index: 1;
        `;
        
        container.appendChild(particle);
    }
}

// Cursor trail effect
function initCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = [];
    const trailCount = 10;

    for (let i = 0; i < trailCount; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-trail';
        circle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            will-change: transform, opacity;
        `;
        document.body.appendChild(circle);
        circles.push({ element: circle, x: 0, y: 0 });
    }

    document.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animate() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            const next = circles[index + 1] || circles[0];
            circle.x += (x - circle.x) * 0.2;
            circle.y += (y - circle.y) * 0.2;
            circle.element.style.transform = `translate(${circle.x - 4}px, ${circle.y - 4}px)`;
            x = circle.x;
            y = circle.y;
        });

        requestAnimationFrame(animate);
    }

    animate();
}
// Loading screen animation
function initLoadingAnimation() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">hello.</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Project cards hover effect - moved inside DOMContentLoaded
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.03) rotateX(5deg)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
            card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
});

// Contact form handling (if you add a form later)
function handleContactForm() {
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
}

// Profile image error handling
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('#profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', () => {
            // Create a placeholder if image fails to load
            profileImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjIwIiBmaWxsPSIjQ0NDIi8+CjxwYXRoIGQ9Ik0zMCAxMjBDMzAgMTA1IDUwIDk1IDc1IDk1Uzk1IDEwNSAxMjAgMTIwVjE1MEgzMFYxMjBaIiBmaWxsPSIjQ0NDIi8+Cjwvc3ZnPg==';
        });
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
function initHeroParallax() {
    const heroSection = document.querySelector('.hero-section');
    let ticking = false;

    function updateParallax() {
        const scrolled = window.scrollY;
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    initLoadingAnimation();
    initHeroAnimations();
    createFloatingParticles();
    initCursorTrail();
    handleContactForm();
});

