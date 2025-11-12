// ================================
// Main JavaScript File
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // Mobile Navigation Toggle
    // ================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ================================
    // Navbar Scroll Effect
    // ================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ================================
    // Smooth Scroll for Anchor Links
    // ================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // Active Navigation Link on Scroll
    // ================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPos = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    if (sections.length > 0) {
        window.addEventListener('scroll', highlightNavigation);
    }

    // ================================
    // Scroll Animation - Fade In Elements
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .project-card-full, .timeline-item, .experience-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ================================
    // Skill Bars Animation
    // ================================
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length > 0) {
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    skillObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // ================================
    // Back to Top Button
    // ================================
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    // Add styles for back to top button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 999;
        }
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }
        @media (max-width: 768px) {
            .back-to-top {
                width: 40px;
                height: 40px;
                font-size: 20px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ================================
    // Typing Effect for Hero Title (Optional)
    // ================================
    const typingElement = document.querySelector('.hero-title .highlight');
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let charIndex = 0;

        function typeText() {
            if (charIndex < text.length) {
                typingElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 100);
            }
        }

        // Start typing after a short delay
        setTimeout(typeText, 500);
    }

    // ================================
    // Loading Screen (Optional)
    // ================================
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 300);
            }, 500);
        }
    });

    // ================================
    // Console Message
    // ================================
    console.log('%c👋 Olá! ', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%cEste é o portfolio de Riku Sato', 'color: #8b5cf6; font-size: 14px;');
    console.log('%cInteressado em trabalhar juntos? Entre em contato!', 'color: #ec4899; font-size: 14px;');

    // ================================
    // Performance Monitoring
    // ================================
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Tempo de carregamento da página: ${pageLoadTime}ms`);
            }, 0);
        });
    }

    // ================================
    // Handle External Links
    // ================================
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ================================
    // Lazy Loading Images
    // ================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

});

// ================================
// Utility Functions
// ================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

