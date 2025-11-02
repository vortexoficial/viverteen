// --- SCRIPT DO LOADER ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                if (loader) loader.remove();
            }, 400);
        }
    }, 2500); // Tempo do loader
});

// --- SCRIPT DE ANIMAÇÃO ON SCROLL (FADE-IN) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));