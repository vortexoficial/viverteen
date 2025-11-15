// --- SCRIPT DO LOADER ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    
    const loaderFadeOutDelay = 2500; 

    setTimeout(() => {
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                if (loader) loader.remove();
            }, 400); // Duração da animação de fade-out
        }
    }, loaderFadeOutDelay); 
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
/* == SCRIPT DO MODAL/POPUP (interesse) == */
/* ============================================= */

// (Estas funções ficam globais para serem acessadas pelo onclick="" no HTML)
const modal = document.getElementById('interest-modal');
let hasModalAppeared = false; 

function openModal() {
    // Adicionamos "if (modal)" para garantir que o script não quebre
    // caso o modal não seja encontrado
    if (modal && modal.style.display !== 'flex') { 
        modal.style.display = 'flex'; 
        hasModalAppeared = true; 
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Abre o modal 3 segundos após o evento 'load' da página.
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!hasModalAppeared) {
            openModal();
        }
    }, 3000); // 3 segundos
});


/* ======================================================== */
/* == SCRIPT PRINCIPAL (SWIPER, FORMULÁRIO, MÁSCARA) == */
/* ======================================================== */

// Espera o HTML ser totalmente carregado
document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. SCRIPT DO CARROSSEL (TIME) --- */
    if (typeof Swiper !== 'undefined') {
        
        const teamSwiper = new Swiper('.team-carousel', {
            loop: true, 
            autoplay: {
                delay: 1500, 
                disableOnInteraction: false, 
            },
            spaceBetween: 30, 
            navigation: {
                nextEl: '.team .swiper-button-next',
                prevEl: '.team .swiper-button-prev',
            },
            pagination: {
                el: '.team .swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            }
        });

    } else {
        console.warn('Biblioteca Swiper.js não foi carregada.');
    }


    /* --- 2. SCRIPT DO FORMULÁRIO (Google) --- */
    
    // URL da sua API do Google
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxsdvMeqefKmvR_affcz73uwpX_S5rrzRQwXIqyJdpjThTVmtB9Z6I7-eDP9oMNYtpvVg/exec";
    
    // <<<< MUDANÇA: A URL do WhatsApp foi removida daqui

    // Seleciona os elementos do formulário
    const form = document.getElementById('lead-form');
    const submitButton = document.getElementById('submit-button');

    // Adiciona o listener de submit
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Função de envio do formulário
    async function handleFormSubmit(event) {
        event.preventDefault(); // Impede o envio padrão

        // Feedback visual no botão
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = "Enviando...";
        submitButton.disabled = true;

        const formData = new FormData(form);

        try {
            // Envia os dados para a API do Google
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData,
            });

            // <<<<< MUDANÇA IMPORTANTE AQUI >>>>>

            // 1. Pega o nome direto do formulário
            const nome = formData.get('Nome');
            
            // 2. Cria a nova mensagem personalizada
            const baseMessage = `Olá, me nome é ${nome} e gostaria de ser avisado(a) sobre o próximo evento!`;
            
            // 3. Codifica a mensagem para uma URL (corrige o "Olá%C")
            const encodedMessage = encodeURIComponent(baseMessage);
            
            // 4. Monta a URL final e dinâmica
            const dynamicWhatsappUrl = `https://wa.me/5513988010886?text=${encodedMessage}`;

            // Sucesso!
            form.reset();      // Limpa o formulário
            closeModal();      // Fecha o modal
            
            // 5. Redireciona para a URL recém-criada
            window.open(dynamicWhatsappUrl, '_blank');
            

        } catch (error) {
            // Erro de rede/conexão
            alert("Erro de conexão. Tente novamente.");
            console.error("Erro no fetch:", error);
        } finally {
            // Restaura o botão
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    }


    /* --- 3. SCRIPT DA MÁSCARA DE TELEFONE --- */
    
    // Seleciona o campo de telefone
    const phoneInput = document.querySelector('input[type="tel"]');

    if (phoneInput) {
        phoneInput.addEventListener('input', maskPhone);
    }
    
    // Função que formata o telefone
    function maskPhone(event) {
        let input = event.target;
        let value = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        value = value.substring(0, 11); // Limita a 11 dígitos

        if (value.length > 10) {
            // (XX) XXXXX-XXXX
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length > 5) {
            // (XX) XXXX-XXXX
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            // (XX) XXXX
            value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
        } else if (value.length > 0) {
            // (XX
            value = value.replace(/^(\d{0,2}).*/, '($1');
        }
        input.value = value;
    }

}); // <-- FIM DO "DOMContentLoaded"
