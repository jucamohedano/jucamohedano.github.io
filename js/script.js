const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
};

// Theme was already set pre-paint by the inline head script; sync the button icon
applyTheme(htmlElement.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light'));

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const next = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try {
            localStorage.setItem('theme', next);
        } catch (err) {
            // Storage blocked: theme still switches for this page view
        }
    });
}

// Follow OS theme changes live, unless the user picked a theme manually
if (systemDark.addEventListener) {
    systemDark.addEventListener('change', (e) => {
        let stored = null;
        try {
            stored = localStorage.getItem('theme');
        } catch (err) {}
        if (!stored) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Animation on page load
document.addEventListener('DOMContentLoaded', () => {
    // Any elements with fade-in class will fade in on page load
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        // Slight delay for visual effect
        setTimeout(() => {
            element.style.opacity = '1';
        }, 200);
    });
    
    // Initialize lightbox for blog images
    initLightbox();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 20, // Small offset for better visibility
                behavior: 'smooth'
            });
        }
    });
});

// Lightbox functionality for blog post images
function initLightbox() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-image';

    // Inline SVG figures are cloned in here instead of loaded as an image
    const lightboxFigure = document.createElement('div');
    lightboxFigure.className = 'lightbox-figure';

    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&times;';

    // Append elements to DOM
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(lightboxFigure);
    lightboxContent.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);

    const openLightbox = () => {
        setTimeout(() => lightbox.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    };

    document.querySelectorAll('.post-content img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxFigure.innerHTML = '';
            lightboxFigure.style.display = 'none';
            lightboxImg.style.display = '';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Enlarged image';
            openLightbox();
        });
    });

    // Inline SVG diagrams: clone the vector so it scales to the viewport crisply
    document.querySelectorAll('.figure-svg svg').forEach(svg => {
        svg.addEventListener('click', () => {
            lightboxImg.style.display = 'none';
            lightboxImg.removeAttribute('src');
            lightboxFigure.style.display = '';
            lightboxFigure.innerHTML = '';
            lightboxFigure.appendChild(svg.cloneNode(true));
            openLightbox();
        });
    });
    
    // Close lightbox when clicking close button or outside the image
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxFigure.innerHTML = '';
        // Re-enable scrolling
        document.body.style.overflow = '';
    }
} 