// js/animations.js

document.addEventListener('DOMContentLoaded', () => {
    // Animasyon yapılacak tüm elementleri seç
    const animatedElements = document.querySelectorAll('[data-animation]');

    const observerOptions = {
        root: null, // Viewport (Görüntü alanı)
        rootMargin: '0px',
        threshold: 0.2 // Elementin %20'si görünür olduğunda tetikle
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element görünür olduysa
                const animationType = entry.target.getAttribute('data-animation');
                
                // CSS'teki animasyon sınıfını ekle
                entry.target.classList.add('animate-active', animationType); 
                
                // Elementi bir daha gözlemlemeyi bırak
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Her element için gözlemlemeyi başlat
    animatedElements.forEach(element => {
        observer.observe(element);
        element.classList.add('animate-target'); // Animasyon öncesi stil için başlangıç sınıfı
    });
});

/* Bu kodu çalıştırdıktan sonra, CSS'inize bu sınıfların stillerini eklemeniz GEREKİR: */
/*
.animate-target { opacity: 0; transform: translateY(20px); transition: all 1s ease-out; }
.animate-active { opacity: 1; transform: translateY(0); }

.slide-in-left.animate-target { transform: translateX(-50px); }
.slide-in-left.animate-active { transform: translateX(0); }

.slide-in-right.animate-target { transform: translateX(50px); }
.slide-in-right.animate-active { transform: translateX(0); }
*/
