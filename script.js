// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    this.reset();
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scrolling function
function smoothScroll(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const headerOffset = 60;
    const elementPosition = target.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Handle all buttons and links when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get in Touch button
    const contactButton = document.querySelector('.hero-buttons .primary-btn');
    if (contactButton) {
        contactButton.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll('#contact');
        });
    }

    // View Portfolio button
    const portfolioButton = document.querySelector('.hero-buttons .secondary-btn');
    if (portfolioButton) {
        portfolioButton.addEventListener('click', (e) => {
            // No need to prevent default since we want actual page navigation
            window.location.href = 'projects.html';
        });
    }

    // Handle all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScroll(targetId);
        });
    });
});

// Active navigation indicator
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate sections on scroll
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.7) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Animate skills when they come into view
function initializeSkillsAnimation() {
    const skillsSection = document.querySelector('#skills');
    const progressBars = document.querySelectorAll('.progress');

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate all progress bars when skills section is visible
                progressBars.forEach(progress => {
                    const percent = progress.getAttribute('data-percent');
                    progress.style.width = '0';
                    setTimeout(() => {
                        progress.style.width = percent + '%';
                    }, 100);
                });
                // Disconnect observer after animation is triggered
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    // Start observing skills section
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Reset animations when scrolling back to top
function resetSkillsAnimation() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(progress => {
        progress.style.width = '0';
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeSkillsAnimation();

    // Optional: Reset animations when scrolling to top
    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            resetSkillsAnimation();
            initializeSkillsAnimation();
        }
    });
});
