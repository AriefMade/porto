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

function easeIn (element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    

    element.style.opacity = '0';
    element.style.transform = 'translateY(-30px)';
    element.style.transition = 'opacity 0.8s ease-in, transform 0.8s ease-in';
    

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    setTimeout(() => {
        type();
    }, 300);
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        typeWriter(mainTitle, 'Mobile Developer', 100);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
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
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    handleContactForm();
    
    // Add smooth reveal animation to elements
    const animatedElements = document.querySelectorAll('.hero-text, .project-card, .social-link');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add CSS for hamburger animation
const style = document.createElement('style');
style.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);