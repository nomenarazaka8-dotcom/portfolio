// ===== LIGHTBOX AVEC DÉFILEMENT =====
const lightbox = document.getElementById('lightbox');
const track = document.getElementById('lightboxTrack');
const slides = track.querySelectorAll('img');
const totalSlides = slides.length;
let currentIndex = 0;

function updateTrack() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function openLightbox(index) {
    currentIndex = index;
    updateTrack();
    lightbox.classList.add('open');
}

function closeLightbox() {
    lightbox.classList.remove('open');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateTrack();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateTrack();
}

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(card.getAttribute('data-index'), 10);
        openLightbox(index);
    });
});

lightbox.querySelector('.close').addEventListener('click', closeLightbox);
lightbox.querySelector('.nav-arrow.next').addEventListener('click', nextSlide);
lightbox.querySelector('.nav-arrow.prev').addEventListener('click', prevSlide);

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// ===== Animation des sections à l'apparition au scroll =====
const observerOptions = {
    threshold: 0.15
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);
document.querySelectorAll('section, .card, .project-card').forEach(el => {
    observer.observe(el);
});

// ===== Lien de navigation actif selon le scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Effet machine à écrire sur le sous-titre du header =====
const texte = "Étudiante en Master 2 Droit Privé | Développeuse Web Débutante";
const element = document.querySelector('header p');
let i = 0;
element.textContent = '';
function ecrire() {
    if (i < texte.length) {
        element.textContent += texte.charAt(i);
        i++;
        setTimeout(ecrire, 40);
    }
}
window.addEventListener('load', ecrire);