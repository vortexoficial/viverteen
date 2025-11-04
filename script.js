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


/* ============================================= */
/* == SCRIPT DO CARROSSEL (TIME) ATUALIZADO == */
/* ============================================= */
document.addEventListener('DOMContentLoaded', () => {

    if (typeof Swiper !== 'undefined') {
        
        const teamSwiper = new Swiper('.team-carousel', {
            
            // --- ATUALIZAÇÕES ---
            loop: true, // 1. Loop infinito
            autoplay: {
                delay: 1500, // 2. Autoplay de 1.5 segundos
                disableOnInteraction: false, // 3. Continua rodando mesmo após clique
            },
            // --- FIM DAS ATUALIZAÇÕES ---

            spaceBetween: 30, // Espaço entre os cards
            
            // Navegação (Setas)
            navigation: {
                nextEl: '.team .swiper-button-next',
                prevEl: '.team .swiper-button-prev',
            },
    
            // Paginação (Bolinhas)
            pagination: {
                el: '.team .swiper-pagination',
                clickable: true,
            },
    
            // Breakpoints responsivos
            breakpoints: {
                0: { // Celular
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: { // Tablet
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: { // Desktop
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });

    } else {
        console.warn('Biblioteca Swiper.js não foi carregada.');
    }
});