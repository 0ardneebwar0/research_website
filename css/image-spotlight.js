// ===== SIMPLE RADIAL GRADIENT SPOTLIGHT EFFECT =====

//DOM load event
window.addEventListener("DOMContentLoaded", () => {
    const spotlight = document.querySelector('.spotlight');
    
    if (!spotlight) {
        console.warn('Spotlight element not found');
        return;
    }

    let spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.85) 200px';
    let mobileSpotlightSize = 'transparent 100px, rgba(0, 0, 0, 0.85) 130px';
    
    // Check if mobile
    const isMobile = window.innerWidth <= 768;
    let currentSpotlightSize = isMobile ? mobileSpotlightSize : spotlightSize;

    // Mouse move event
    window.addEventListener('mousemove', e => updateSpotlight(e));

    // Mouse down event - make spotlight smaller/more focused
    window.addEventListener('mousedown', e => {
        if (isMobile) {
            currentSpotlightSize = 'transparent 70px, rgba(0, 0, 0, 0.95) 100px';
        } else {
            currentSpotlightSize = 'transparent 130px, rgba(0, 0, 0, 0.95) 150px';
        }
        updateSpotlight(e);
    });

    // Mouse up event - return to normal size
    window.addEventListener('mouseup', e => {
        currentSpotlightSize = isMobile ? mobileSpotlightSize : spotlightSize;
        updateSpotlight(e);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            currentSpotlightSize = newIsMobile ? mobileSpotlightSize : spotlightSize;
        }
    });

    function updateSpotlight(e) {
        const x = (e.pageX / window.innerWidth) * 100;
        const y = (e.pageY / window.innerHeight) * 100;
        
        spotlight.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, ${currentSpotlightSize})`;
    }

    // Initialize spotlight at center
    const initialEvent = {
        pageX: window.innerWidth / 2,
        pageY: window.innerHeight / 2
    };
    updateSpotlight(initialEvent);
});
