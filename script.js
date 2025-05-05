// DOM Elements
const navbar = document.getElementById('navbar');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = themeToggleBtn.querySelector('i');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links ul li a');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contactForm');
const animatedElements = document.querySelectorAll('[data-animation]');

// Typing Animation
const typingText = document.getElementById('typing-text');
const words = ['Frontend Developer', 'Web Developer', 'UI/UX Enthusiast'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 50; // delete faster
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 150; // type slower
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeDelay = 1000; // pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeDelay = 500; // pause before typing next word
    }
    
    setTimeout(typeEffect, typeDelay);
}

// Initialize typing animation
window.addEventListener('load', typeEffect);

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Check saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fas fa-sun';
    }
}

// Toggle mobile navigation
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Close mobile nav when clicking a link
function closeMobileNav() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}

// Scroll events
function handleScroll() {
    // Back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    
    // Navbar active state
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
    
    // Animate elements on scroll
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animate');
        }
    });
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real-world scenario, you would send this data to a server
    // For now, we'll just simulate a successful submission
    alert('Message sent successfully!');
    contactForm.reset();
}

// Event Listeners
window.addEventListener('load', checkTheme);
window.addEventListener('scroll', handleScroll);
themeToggleBtn.addEventListener('click', toggleTheme);
hamburger.addEventListener('click', toggleMobileNav);
backToTopBtn.addEventListener('click', scrollToTop);
contactForm.addEventListener('submit', handleFormSubmit);

navItems.forEach(item => {
    item.addEventListener('click', closeMobileNav);
});

// Initialize animations on first load
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }, 300);
});