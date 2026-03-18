document.addEventListener('DOMContentLoaded', () => {
    // Definir o volume do vídeo principal para 50%
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.volume = 0.5;
        
        // Tenta forçar o autoplay com o volume definido para médio
        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay bloqueado pelo navegador. O vídeo requer interação do usuário para iniciar com som.", error);
            });
        }
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after revealing to only animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the .reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Staggered delay for adjacent reveal elements
    const staggerGroups = document.querySelectorAll('.stagger-group');
    staggerGroups.forEach(group => {
        const items = group.querySelectorAll('.reveal');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.15}s`;
        });
    });

    // Smooth scroll for anchor links (if any are added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Generate stars for black sections
    const darkSections = document.querySelectorAll('.section:not(.dark-invert)');
    darkSections.forEach(section => {
        const starContainer = document.createElement('div');
        starContainer.classList.add('star-container');
        
        const numStars = Math.floor(Math.random() * 15) + 15;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            const size = Math.random() * 2 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
            
            starContainer.appendChild(star);
        }
        
        section.insertBefore(starContainer, section.firstChild);
    });
});
