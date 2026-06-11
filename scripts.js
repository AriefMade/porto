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

function initCursorTrail() {
    const coords = { x: 0, y: 0 };
    const particles = [];
    const particleCount = 15;
    let isMouseMoving = false;
    let mouseTimeout;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        
        const size = Math.random() * 6 + 3;
        const hue = Math.random() * 360;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: hsla(${hue}, 70%, 50%, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            will-change: transform, opacity;
            transition: opacity 0.3s ease;
            box-shadow: 0 0 10px hsla(${hue}, 70%, 50%, 0.5);
        `;
        
        document.body.appendChild(particle);
        particles.push({ 
            element: particle, 
            x: 0, 
            y: 0, 
            targetX: 0, 
            targetY: 0,
            size: size,
            hue: hue,
            delay: i * 0.05,
            speed: 0.1 + (i * 0.02)
        });
    }


    document.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
        isMouseMoving = true;
        
        clearTimeout(mouseTimeout);
        
        particles.forEach(particle => {
            particle.element.style.opacity = '0.8';
        });
        
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
            particles.forEach(particle => {
                particle.element.style.opacity = '0.4';
            });
        }, 500);
    });

    coords.x = window.innerWidth / 2;
    coords.y = window.innerHeight / 2;

    function animate() {
        let targetX = coords.x;
        let targetY = coords.y;

        particles.forEach((particle, index) => {
            const randomOffsetX = isMouseMoving ? (Math.random() - 0.5) * 10 : 0;
            const randomOffsetY = isMouseMoving ? (Math.random() - 0.5) * 10 : 0;
            
            particle.targetX = targetX + randomOffsetX;
            particle.targetY = targetY + randomOffsetY;
            
            particle.x += (particle.targetX - particle.x) * particle.speed;
            particle.y += (particle.targetY - particle.y) * particle.speed;
            
            particle.element.style.transform = `translate(${particle.x - particle.size/2}px, ${particle.y - particle.size/2}px) scale(${1 - index * 0.05})`;
            
            targetX = particle.x;
            targetY = particle.y;
            
            const angle = Math.atan2(particle.targetY - particle.y, particle.targetX - particle.x) * 180 / Math.PI;
            particle.element.style.transform += ` rotate(${angle}deg)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
    
    return () => {
        particles.forEach(particle => {
            particle.element.remove();
        });
    };
}

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
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
}

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

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

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

function handleContactForm() {
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('#profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', () => {
            profileImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjIwIiBmaWxsPSIjQ0NDIi8+CjxwYXRoIGQ9Ik0zMCAxMjBDMzAgMTA1IDUwIDk1IDc1IDk1Uzk1IDEwNSAxMjAgMTIwVjE1MEgzMFYxMjBaIiBmaWxsPSIjQ0NDIi8+Cjwvc3ZnPg==';
        });
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

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

function initSimpleCursorTrail() {
    const particles = [];
    const particleCount = 12;
    let mouseX = 0;
    let mouseY = 0;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${8 - i * 0.3}px;
            height: ${8 - i * 0.3}px;
            background: rgba(0, 0, 0, ${0.8 - i * 0.05});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${0.8 - i * 0.05};
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(particle);
        particles.push({
            element: particle,
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            speed: 0.15 - i * 0.008
        });
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        let currentX = mouseX;
        let currentY = mouseY;
        
        particles.forEach((particle, index) => {
            particle.targetX = currentX;
            particle.targetY = currentY;
            
            particle.x += (particle.targetX - particle.x) * particle.speed;
            particle.y += (particle.targetY - particle.y) * particle.speed;
            
            particle.element.style.left = particle.x - particle.element.offsetWidth / 2 + 'px';
            particle.element.style.top = particle.y - particle.element.offsetHeight / 2 + 'px';
            
            currentX = particle.x;
            currentY = particle.y;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            alert(`Thank you ${name}! Your message has been received. I'll get back to you soon.`);
            
            form.reset();
        });
    }
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-progress').forEach(progress => {
                progress.style.width = progress.parentElement.dataset.width || progress.style.width;
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    initLoadingAnimation();
    initHeroAnimations();
    createFloatingParticles();
    initSimpleCursorTrail();
    handleContactForm();
});

window.addEventListener('load', () => {
    initSimpleCursorTrail();
    initHeroParallax();
});

