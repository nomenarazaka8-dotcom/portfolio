// Le lightbox fonctionne désormais en CSS pur (:target), donc plus besoin
// de JS pour l'ouvrir/fermer. On garde juste un petit bonus UX :
// fermer le lightbox avec la touche "Échap".

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
    }
});
// Animation des sections à l'apparition au scroll
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