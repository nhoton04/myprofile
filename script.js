// Smooth scrolling for navigation links
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

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.className = newTheme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
    });
}

// Contact form validation and submission
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    form.appendChild(messageDiv);
    
    // Input validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateInput(this);
            }
        });
    });
    
    function validateInput(input) {
        const value = input.value.trim();
        
        if (input.hasAttribute('required') && !value) {
            input.style.borderColor = '#dc3545';
            return false;
        }
        
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.style.borderColor = '#dc3545';
                return false;
            }
        }
        
        input.style.borderColor = '#28a745';
        return true;
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Cảm ơn bạn! Tin nhắn đã được gửi thành công.';
            messageDiv.style.display = 'block';
            form.reset();
            
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        } else {
            messageDiv.className = 'form-message error';
            messageDiv.textContent = 'Vui lòng kiểm tra lại thông tin và thử lại.';
            messageDiv.style.display = 'block';
        }
    });
}

// Typing effect for job title
function createTypingEffect() {
    const jobTitle = document.querySelector('.detail h3');
    const titles = ['Full Stack Developer', 'Web Developer', 'UI/UX Designer', 'Software Engineer'];
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentTitle = titles[currentIndex];
        
        if (isDeleting) {
            jobTitle.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            jobTitle.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % titles.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    typeEffect();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('fade-in');
        } else {
            section.classList.add('slide-in-left');
        }
        observer.observe(section);
    });

    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('fade-in');
        observer.observe(item);
    });

    // Add animation to hobby items
    const hobbyItems = document.querySelectorAll('.hobby-item');
    hobbyItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.15}s`;
        item.classList.add('fade-in');
        observer.observe(item);
    });

    // Initialize all features
    setupThemeToggle();
    setupContactForm();
    createTypingEffect();
});
