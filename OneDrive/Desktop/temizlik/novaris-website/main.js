// Initialize Lucide icons
lucide.createIcons();

// Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hero Slider Logic
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;
let slideInterval;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlideTimer() {
    stopSlideTimer();
    slideInterval = setInterval(nextSlide, 6000);
}

function stopSlideTimer() {
    clearInterval(slideInterval);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideTimer();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideTimer();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        startSlideTimer();
    });
});

// Initialize Slider
if (slides.length > 0) {
    startSlideTimer();
}

// Mobile Menu Toggle (Simple placeholder for now)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
mobileMenuBtn.addEventListener('click', () => {
    alert('Menü yakında aktif edilecektir.');
});

// Smooth Scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Simple Form Submission Handler
const quoteForm = document.querySelector('.quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = quoteForm.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Gönderiliyor...';
        button.disabled = true;
        
        setTimeout(() => {
            alert('Teklif talebiniz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.');
            button.textContent = originalText;
            button.disabled = false;
            quoteForm.reset();
        }, 1500);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .product-card, .about-content, .why-us-content, .quote-info').forEach(el => {
    el.style.opacity = '0'; // Set initial state
    observer.observe(el);
});
