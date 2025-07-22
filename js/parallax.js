// Enhanced Parallax Effect JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Variables
    let ticking = false;
    let currentScrollY = 0;
    
    // Enhanced parallax scroll handler
    function updateParallax() {
        const scrollY = window.pageYOffset;
        currentScrollY = scrollY;
        
        // Update background layers with different speeds
        const bgLayers = document.querySelectorAll('.parallax-bg-layer');
        bgLayers.forEach(layer => {
            const speed = layer.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
        
        // Enhanced image containers parallax
        const heroImageContainer = document.querySelector('.hero-image-container');
        if (heroImageContainer) {
            const speed = parseFloat(heroImageContainer.dataset.speed) || 0.6;
            const yPos = scrollY * speed * 0.3;
            const rotation = scrollY * 0.02;
            heroImageContainer.style.transform = `translateY(calc(-50% + ${yPos}px)) rotate(${rotation}deg)`;
        }
        
        const researchImageContainer = document.querySelector('.research-image-container');
        if (researchImageContainer) {
            const speed = parseFloat(researchImageContainer.dataset.speed) || 0.7;
            const yPos = scrollY * speed * 0.2;
            researchImageContainer.style.transform = `translateY(calc(-50% + ${yPos}px))`;
        }
        
        const visionImageContainer = document.querySelector('.vision-image-container');
        if (visionImageContainer) {
            const speed = parseFloat(visionImageContainer.dataset.speed) || 0.8;
            const yPos = -(scrollY * speed * 0.1);
            const rotation = scrollY * 0.01;
            visionImageContainer.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        }
        
        // Content parallax effects
        const contentLeftElements = document.querySelectorAll('.content-left');
        contentLeftElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.8;
            const yPos = scrollY * (1 - speed) * 0.1;
            element.style.transform = `translateY(${yPos}px)`;
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
    
    // GSAP Enhanced Animations
    
    // Hero section entrance animation
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero-main-image', {
            duration: 1.5,
            scale: 0.8,
            opacity: 0,
            rotation: -15,
            ease: "back.out(1.7)"
        })
        .from('.parallax-title-enhanced span', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=1")
        .from('.parallax-subtitle-enhanced', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5")
        .from('.parallax-cta-enhanced .cta-button', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3");
    
    // Research section animation
    gsap.from('.research-side-image', {
        duration: 1.2,
        x: -100,
        opacity: 0,
        rotation: -10,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.research-enhanced',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.section-title-enhanced', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.research-enhanced',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.research-card-minimal', {
        duration: 1,
        x: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.research-cards-enhanced',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Vision section animations
    gsap.from('.vision-accent-image', {
        duration: 1.5,
        scale: 0.5,
        opacity: 0,
        rotation: 20,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.vision-enhanced',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.section-title-vision', {
        duration: 1.2,
        y: 80,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.vision-enhanced',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.stat-item', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.vision-stats',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.feature-highlight', {
        duration: 0.8,
        x: -50,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.vision-features',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // CTA section animation
    gsap.from('.cta-title-enhanced', {
        duration: 1.5,
        scale: 0.9,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.cta-enhanced',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.cta-button-enhanced', {
        duration: 1,
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: '.cta-buttons-enhanced',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.cta-feature', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.cta-features',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Enhanced hover effects for images
    const heroImage = document.querySelector('.hero-main-image');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', () => {
            gsap.to(heroImage, {
                duration: 0.6,
                scale: 1.1,
                rotation: 5,
                ease: "power2.out"
            });
        });
        
        heroImage.addEventListener('mouseleave', () => {
            gsap.to(heroImage, {
                duration: 0.6,
                scale: 1,
                rotation: 0,
                ease: "power2.out"
            });
        });
    }
    
    const researchImage = document.querySelector('.research-side-image');
    if (researchImage) {
        researchImage.addEventListener('mouseenter', () => {
            gsap.to(researchImage, {
                duration: 0.5,
                scale: 1.08,
                rotation: -3,
                ease: "power2.out"
            });
        });
        
        researchImage.addEventListener('mouseleave', () => {
            gsap.to(researchImage, {
                duration: 0.5,
                scale: 1,
                rotation: 0,
                ease: "power2.out"
            });
        });
    }
    
    // Enhanced button interactions
    const enhancedButtons = document.querySelectorAll('.cta-button-enhanced');
    enhancedButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: "back.out(1.7)"
            });
            
            gsap.to(this.querySelector('i'), {
                duration: 0.3,
                x: 5,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
            
            gsap.to(this.querySelector('i'), {
                duration: 0.3,
                x: 0,
                ease: "power2.out"
            });
        });
    });
    
    // Research card hover effects
    const researchCards = document.querySelectorAll('.research-card-minimal');
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                x: 15,
                scale: 1.02,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                x: 0,
                scale: 1,
                ease: "power2.out"
            });
        });
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                const finalValue = stat.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                if (!isNaN(numericValue)) {
                    const counter = { value: 0 };
                    gsap.to(counter, {
                        duration: 2,
                        value: numericValue,
                        ease: "power2.out",
                        onUpdate: function() {
                            const currentValue = Math.round(counter.value);
                            stat.textContent = finalValue.includes('+') ? `${currentValue}+` : currentValue;
                        }
                    });
                }
            }
        });
    });
    
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.research-enhanced');
            if (nextSection) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: nextSection,
                    ease: "power2.inOut"
                });
            }
        });
    }
    
    // Custom cursor effects
    const cursor = document.getElementById('cursorGlow');
    const cursorTrail = document.getElementById('cursorTrail');
    
    if (cursor && cursorTrail) {
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX - 100 + 'px';
            cursor.style.top = mouseY - 100 + 'px';
        });
        
        // Smooth trail animation
        function animateTrail() {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            
            cursorTrail.style.left = trailX - 4 + 'px';
            cursorTrail.style.top = trailY - 4 + 'px';
            
            requestAnimationFrame(animateTrail);
        }
        animateTrail();
        
        // Enhanced cursor effects on hover
        const interactiveElements = document.querySelectorAll('a, button, .research-card-minimal, .cta-button-enhanced, .feature-highlight, .hero-main-image, .research-side-image, .vision-accent-image');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.8)';
                cursor.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 50%)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 50%)';
            });
        });
    }
    
    // Performance optimization
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            ScrollTrigger.refresh();
            updateParallax();
        }, 250);
    });
    
    // Preload images for better performance
    const imagesToPreload = [
        'assets/background_1.png',
        'assets/background_2.jpg',
        'assets/dark_theme_background.jpg',
        'assets/background_removed/Leonardo_Vision_XL_bg_removed.png',
        'assets/background_removed/beautiful-scenery-bg_removed.png',
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
        img.onerror = () => {
            console.warn(`⚠️ Failed to load image: ${src}`);
        };
        img.src = src;
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Initial animations after load
        gsap.from('body', {
            duration: 0.8,
            opacity: 0,
            ease: "power2.out"
        });
    });
    
    // Fallback to show content after 3 seconds even if images don't load
    setTimeout(function() {
        if (!document.body.classList.contains('loaded')) {
            document.body.classList.add('loaded');
            console.log('⚠️ Forced page load after timeout');
        }
    }, 3000);
    
    console.log('🚀 Enhanced Parallax effects initialized successfully!');
});

// Add CSS for enhanced effects
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        to { border-color: transparent; }
    }
    
    body:not(.loaded) {
        opacity: 0;
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
