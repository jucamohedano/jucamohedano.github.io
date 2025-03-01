// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const themeSwitch = document.querySelector('#checkbox');
const htmlElement = document.documentElement;

// Check for saved theme preference and apply it
const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeSwitch.checked = true;
        }
    } else {
        // Check for system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            htmlElement.setAttribute('data-theme', 'dark');
            themeSwitch.checked = true;
            localStorage.setItem('theme', 'dark');
        }
    }
};

// Apply theme when page loads
document.addEventListener('DOMContentLoaded', loadTheme);

// Theme Switch
if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a menu item
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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
    
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&times;';
    
    // Append elements to DOM
    lightboxContent.appendChild(lightboxImg);
    lightboxContent.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // Get all images in post content
    const postImages = document.querySelectorAll('.post-content img');
    
    // Add click event to images
    postImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'Enlarged image';
            
            // Show lightbox with slight delay for transition
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            
            // Prevent scrolling of the page
            document.body.style.overflow = 'hidden';
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
        // Re-enable scrolling
        document.body.style.overflow = '';
    }
} 