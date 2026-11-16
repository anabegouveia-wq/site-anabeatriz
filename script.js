document.addEventListener('DOMContentLoaded', function () {

    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // <<< MUDANÇA 1: Seleciona o contêiner que precisa ter a altura ajustada >>>
    const carouselContainer = document.querySelector('.testimonials-carousel-container');

    let currentIndex = 0;
    const totalSlides = cards.length;

    // Função para mover para um slide específico
    function goToSlide(index) {
        // Lógica de loop do carrossel
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }

        // Pega a largura do slide no momento da transição (importante para responsividade)
        const slideWidth = cards[0].clientWidth;

        slider.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;

        // <<< MUDANÇA 2: A MÁGICA ACONTECE AQUI >>>
        // Atualiza a altura do contêiner para a altura do slide atual
        updateContainerHeight();
    }

    // <<< MUDANÇA 3: A NOVA FUNÇÃO QUE AJUSTA A ALTURA >>>
    function updateContainerHeight() {
        if (cards[currentIndex]) {
            const currentHeight = cards[currentIndex].offsetHeight;
            carouselContainer.style.height = `${currentHeight}px`;
        }
    }

    // Navegação pelo botão "Próximo"
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetInterval();
    });

    // Navegação pelo botão "Anterior"
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetInterval();
    });

    // Função para avançar o slide automaticamente
    let autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);

    // Reinicia o intervalo do carrossel
    function resetInterval() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    // Pausa e retoma o carrossel com o mouse
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    carouselContainer.addEventListener('mouseleave', () => resetInterval());
    
    // Recalcula a largura do slide e a altura do container se a janela for redimensionada
    window.addEventListener('resize', () => {
        const newSlideWidth = cards[0].clientWidth;
        slider.style.transition = 'none'; // Desliga a transição durante o resize para evitar bugs
        slider.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`;
        updateContainerHeight();
        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out'; // Liga a transição de volta
        }, 50);
    });

    // <<< MUDANÇA 4: Ajusta a altura inicial quando a página carrega >>>
    // Usamos 'load' para garantir que imagens e fontes já carregaram
    window.addEventListener('load', updateContainerHeight);
});