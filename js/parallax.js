// Enhanced Parallax Effect JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Ensure content is visible immediately
    document.body.style.opacity = '1';
    document.body.classList.add('loaded');
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, using fallback animations');
        return;
    }
    
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Variables
    let ticking = false;
    let currentScrollY = 0;
    
    // Simplified and smooth parallax scroll handler
    function updateParallax() {
        const scrollY = window.pageYOffset;
        currentScrollY = scrollY;
        
        // Update background layers with different speeds (smoother effect)
        const bgLayers = document.querySelectorAll('.parallax-bg-layer');
        bgLayers.forEach((layer, index) => {
            const speed = parseFloat(layer.dataset.speed) || (0.3 + index * 0.1);
            const yPos = -(scrollY * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        // Simplified image containers parallax (removed excessive rotation)
        const heroImageContainer = document.querySelector('.hero-image-container');
        if (heroImageContainer) {
            const speed = parseFloat(heroImageContainer.dataset.speed) || 0.4;
            const yPos = scrollY * speed * 0.2;
            heroImageContainer.style.transform = `translate3d(0, calc(-50% + ${yPos}px), 0)`;
        }
        
        const researchImageContainer = document.querySelector('.research-image-container');
        if (researchImageContainer) {
            const speed = parseFloat(researchImageContainer.dataset.speed) || 0.5;
            const yPos = scrollY * speed * 0.15;
            researchImageContainer.style.transform = `translate3d(0, calc(-50% + ${yPos}px), 0)`;
        }
        
        const visionImageContainer = document.querySelector('.vision-image-container');
        if (visionImageContainer) {
            const speed = parseFloat(visionImageContainer.dataset.speed) || 0.6;
            const yPos = -(scrollY * speed * 0.1);
            visionImageContainer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
        
        // Smooth content parallax effects
        const contentLeftElements = document.querySelectorAll('.content-left');
        contentLeftElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.9;
            const yPos = scrollY * (1 - speed) * 0.05;
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        // Update progress bar
        const progressBar = document.querySelector('.progress-bar');
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / windowHeight) * 100;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        // Update navbar opacity and blur
        const navbar = document.getElementById('navbar');
        if (navbar) {
            const opacity = Math.min(scrollY / 100, 1);
            const blur = Math.min(scrollY / 50, 20);
            navbar.style.background = `rgba(0, 0, 0, ${0.6 + opacity * 0.4})`;
            navbar.style.backdropFilter = `blur(${blur}px)`;
        }
        
        ticking = false;
    }
    
    // Throttled scroll event
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Scroll event listener
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial parallax update
    updateParallax();
    
    // GSAP Simplified Animations (removed complex entrance effects)
    
    // Simple hero section animation
    if (typeof gsap !== 'undefined') {
        gsap.from('.hero-main-image', {
            duration: 1,
            scale: 0.9,
            opacity: 0,
            ease: "power2.out",
            delay: 0.3
        });
        
        gsap.from('.parallax-title-enhanced', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power2.out",
            delay: 0.1
        });
        
        gsap.from('.parallax-subtitle-enhanced', {
            duration: 1,
            y: 20,
            opacity: 0,
            ease: "power2.out",
            delay: 0.2
        });
        
        gsap.from('.parallax-cta-enhanced .cta-button', {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.4
        });
    }
    
    // Simplified ScrollTrigger animations
    if (typeof gsap !== 'undefined') {
        // Research section
        gsap.from('.research-side-image', {
            duration: 1,
            x: -50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.research-enhanced',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
        
        gsap.from('.section-title-enhanced', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.research-enhanced',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
        
        gsap.from('.research-card-minimal', {
            duration: 0.8,
            x: 30,
            opacity: 0,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.research-cards-enhanced',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // Vision section
        gsap.from('.vision-accent-image', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.vision-enhanced',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });
        
        gsap.from('.section-title-vision', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.vision-enhanced',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
        
        // CTA section
        gsap.from('.cta-title-enhanced', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.cta-enhanced',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }
    
    // Simplified hover effects for images
    const heroImage = document.querySelector('.hero-main-image');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(heroImage, {
                    duration: 0.3,
                    scale: 1.05,
                    ease: "power2.out"
                });
            }
        });
        
        heroImage.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(heroImage, {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
            }
        });
    }
    
    // Simplified button and card interactions
    const enhancedButtons = document.querySelectorAll('.cta-button-enhanced, .cta-button');
    enhancedButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.2,
                    scale: 1.02,
                    ease: "power2.out"
                });
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.2,
                    scale: 1,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.research-enhanced');
            if (nextSection) {
                nextSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }
    
    // Performance optimization
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
            updateParallax();
        }, 250);
    });
    
    // Preload images for better performance
    const imagesToPreload = [
        'assets/background_removed/beautiful-scenery-bg_removed.png',
        'assets/background_removed/Leonardo_Vision_XL_bg_removed.png',
        'assets/background_removed/bg_cover_bg_removed.png'
    ];
    
    let loadedImages = 0;
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.onload = () => {
            loadedImages++;
            if (loadedImages === imagesToPreload.length) {
                console.log('🖼️ All images preloaded successfully!');
            }
        };
        img.onerror = (error) => {
            console.warn(`⚠️ Failed to load image: ${src}`, error);
            loadedImages++; // Count as loaded to prevent blocking
        };
        img.src = src;
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Initial animations after load
        gsap.from('body', {
            duration: 0.5,
            opacity: 0.8,
            ease: "power2.out"
        });
    });
    
    // Show content immediately instead of waiting for timeout
    document.body.classList.add('loaded');
    
    console.log('🚀 Enhanced Parallax effects initialized successfully!');
});

// Add CSS for enhanced effects
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        to { border-color: transparent; }
    }
    
    body:not(.loaded) {
        opacity: 1;
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.8s ease;
    }
    
    /* Enhanced cursor styles */
    .cursor-glow {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 50%);
        transition: all 0.3s ease;
        mix-blend-mode: screen;
    }
    
    .cursor-trail {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }
`;
document.head.appendChild(style);
