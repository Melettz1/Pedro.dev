document.documentElement.classList.remove("no-js");

document.addEventListener('DOMContentLoaded', function() {

    
    function applySketchStyles() {
        
        const skillColors = [
            '#FFECB3', 
            '#C8F7C5', 
            '#B3E0FF', 
            '#FFC0CB', 
            '#E0BBE4', 
            '#FFD8B3'  
        ];

        
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            const randomColor = skillColors[Math.floor(Math.random() * skillColors.length)];
            card.style.backgroundColor = randomColor;

            const randomRotation = (Math.random() * 6 - 3).toFixed(1);
            card.style.setProperty('--rotation', randomRotation);

            const randomTapeRotation = (Math.random() * 50 - 25).toFixed(1);
            card.style.setProperty('--rotation-tape', randomTapeRotation);
        });

        
        const toolCards = document.querySelectorAll('.tool-card');
        const toolColors = [
            '#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', 
            '#9BF6FF', '#A0C4FF', '#BDB2FF', '#FFC6FF'
        ];
        toolCards.forEach(card => {
            const randomColor = toolColors[Math.floor(Math.random() * toolColors.length)];
            card.style.backgroundColor = randomColor;

            const randomRotation = (Math.random() * 8 - 4).toFixed(1);
            card.style.setProperty('--rotation', randomRotation);

            const randomTapeRotation = (Math.random() * 40 - 20).toFixed(1);
            card.style.setProperty('--rotation-tape', randomTapeRotation);
        });
        
        
        const philosophyCards = document.querySelectorAll('.philosophy-card');
        const philosophyColors = [
            '#FFECB3', 
            '#C8F7C5', 
            '#B3E0FF'  
        ];

        philosophyCards.forEach((card, index) => {
            
            card.style.backgroundColor = philosophyColors[index % philosophyColors.length];

            
            const randomRotation = (Math.random() * 4 - 2).toFixed(1); 
            card.style.transform = `rotate(${randomRotation}deg)`;

            
            const randomTapeRotation = (Math.random() * 30 - 15).toFixed(1); 
            card.style.setProperty('--rotation-tape', randomTapeRotation);
        });


        
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            const randomColor = skillColors[Math.floor(Math.random() * skillColors.length)];
            card.style.backgroundColor = randomColor;

            const randomRotation = (Math.random() * 10 - 5).toFixed(1);
            card.style.setProperty('--rotation', randomRotation);

            const randomTapeRotation = (Math.random() * 45 - 22).toFixed(1);
            card.style.setProperty('--rotation-tape', randomTapeRotation);
        });

        
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const randomColor = skillColors[Math.floor(Math.random() * skillColors.length)];
            link.style.backgroundColor = randomColor;
            
            const randomRotation = (Math.random() * 8 - 4).toFixed(1);
            link.style.setProperty('--rotation', randomRotation);

            const randomTapeRotation = (Math.random() * 40 - 20).toFixed(1);
            link.style.setProperty('--rotation-tape', randomTapeRotation);
        });

        
        const mobileLinks = document.querySelectorAll('.nav-links-mobile a');
        mobileLinks.forEach(link => {
            const randomColor = skillColors[Math.floor(Math.random() * skillColors.length)];
            link.style.backgroundColor = randomColor;

            const randomRotation = (Math.random() * 4 - 2).toFixed(1);
            link.style.setProperty('--rotation', randomRotation);
        });
    }

    applySketchStyles();

    
    if (document.getElementById("typed-text")) {
        new Typed("#typed-text", {
            strings: ["Java/Spring Boot.", "Python.", "JavaScript."],
            typeSpeed: 70,
            backSpeed: 40,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }
    
    
    const menuHamburger = document.querySelector(".menu-hamburger");
    const navLinksMobile = document.querySelector(".nav-links-mobile");

    if (menuHamburger && navLinksMobile) {
        menuHamburger.addEventListener("click", () => {
            navLinksMobile.classList.toggle("active");
        });

        document.querySelectorAll('.nav-links-mobile a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksMobile.classList.contains('active')) {
                    navLinksMobile.classList.remove('active');
                }
            });
        });
    }

    
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;

    const track = carouselContainer.querySelector('.carousel-track');
    const prevButton = carouselContainer.querySelector('.carousel-button.prev');
    const nextButton = carouselContainer.querySelector('.carousel-button.next');

    if (!track || !prevButton || !nextButton) {
        console.error("Elementos do carrossel não foram encontrados. Verifique o HTML.");
        return;
    }

    let currentIndex = 0;
    let isTransitioning = false;
    let slideWidth = 0;
    let originalCardCount = 0;
    let cloneCount = 3;

    const setupCarousel = () => {
        const oldClones = track.querySelectorAll('.clone');
        oldClones.forEach(clone => clone.remove());

        const originalCards = Array.from(track.children).filter(card => !card.classList.contains('clone'));
        originalCardCount = originalCards.length;
        
        if (originalCardCount === 0) return;

        for (let i = originalCardCount - 1; i >= originalCardCount - cloneCount && i >= 0; i--) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            track.prepend(clone);
        }
        for (let i = 0; i < cloneCount && i < originalCardCount; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            track.appendChild(clone);
        }

        currentIndex = cloneCount;
        updatePosition(false);
    };

    const updatePosition = (useTransition = true) => {
        const card = track.querySelector('.card:not(.clone)');
        if (!card) return;

        const gap = parseInt(window.getComputedStyle(track).gap) || 20;
        slideWidth = card.offsetWidth + gap;

        if (useTransition) {
            track.style.transition = 'transform 0.5s ease-in-out';
        } else {
            track.style.transition = 'none';
        }

        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    const handleNext = () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updatePosition();
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updatePosition();
    };

    const handleTransitionEnd = () => {
        isTransitioning = false;
        if (currentIndex >= originalCardCount + cloneCount) {
            currentIndex = cloneCount;
            updatePosition(false);
        } else if (currentIndex < cloneCount) {
            currentIndex = originalCardCount + cloneCount -1;
            updatePosition(false);
        }
    };

    nextButton.addEventListener('click', handleNext);
    prevButton.addEventListener('click', handlePrev);
    track.addEventListener('transitionend', handleTransitionEnd);

    window.addEventListener('resize', () => {
        setupCarousel();
    });

    setTimeout(setupCarousel, 100);
});