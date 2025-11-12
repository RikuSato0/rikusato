// ================================
// Advanced Animations
// ================================

document.addEventListener('DOMContentLoaded', function() {

    // ================================
    // Parallax Effect for Hero Section
    // ================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    // ================================
    // Text Reveal Animation
    // ================================
    const revealElements = document.querySelectorAll('.hero-content h1, .hero-content p, .section-title');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        revealObserver.observe(element);
    });

    // ================================
    // Counter Animation for Statistics
    // ================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target, 2000);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ================================
    // Card Hover Tilt Effect
    // ================================
    const cards = document.querySelectorAll('.project-card, .skill-category, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // ================================
    // Staggered Animation for Project Cards
    // ================================
    const projectCards = document.querySelectorAll('.project-card, .project-card-full');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        staggerObserver.observe(card);
    });

    // ================================
    // Mouse Trail Effect (Optional)
    // ================================
    let mouseTrails = [];
    const maxTrails = 10;
    
    function createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            border-radius: 50%;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            opacity: 0.6;
            z-index: 9999;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(trail);
        mouseTrails.push(trail);
        
        if (mouseTrails.length > maxTrails) {
            const oldTrail = mouseTrails.shift();
            oldTrail.remove();
        }
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(2)';
            setTimeout(() => trail.remove(), 300);
        }, 200);
    }

    // Uncomment to enable mouse trail effect
    // document.addEventListener('mousemove', (e) => {
    //     if (window.innerWidth > 768) { // Only on desktop
    //         createTrail(e.clientX, e.clientY);
    //     }
    // });

    // ================================
    // Scroll Progress Bar
    // ================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ================================
    // Typewriter Effect for Multiple Lines
    // ================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ================================
    // Floating Animation for Images
    // ================================
    const floatingImages = document.querySelectorAll('.hero-image img, .about-image img');
    
    floatingImages.forEach(img => {
        img.style.animation = 'float 3s ease-in-out infinite';
    });

    // Add floating keyframes
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(floatStyle);

    // ================================
    // Glitch Effect on Hover (for titles)
    // ================================
    const glitchElements = document.querySelectorAll('.logo a');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.setAttribute('data-text', this.textContent);
            this.classList.add('glitch');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('glitch');
        });
    });

    // Add glitch styles
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        .glitch {
            position: relative;
            animation: glitch 0.3s infinite;
        }
        
        @keyframes glitch {
            0% {
                text-shadow: 2px 2px #ec4899, -2px -2px #6366f1;
            }
            25% {
                text-shadow: -2px 2px #ec4899, 2px -2px #6366f1;
            }
            50% {
                text-shadow: 2px -2px #ec4899, -2px 2px #6366f1;
            }
            75% {
                text-shadow: -2px -2px #ec4899, 2px 2px #6366f1;
            }
            100% {
                text-shadow: 2px 2px #ec4899, -2px -2px #6366f1;
            }
        }
    `;
    document.head.appendChild(glitchStyle);

    // ================================
    // Cursor Follower Effect (Advanced)
    // ================================
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.style.cssText = `
        width: 40px;
        height: 40px;
        border: 2px solid #6366f1;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.15s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 20 + 'px';
            cursor.style.top = e.clientY - 20 + 'px';
        });

        // Enlarge cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#ec4899';
            });
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#6366f1';
            });
        });
    }

    // ================================
    // Page Transition Effect
    // ================================
    window.addEventListener('beforeunload', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
    });

    console.log('🎨 Animations loaded successfully!');
});

