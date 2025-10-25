// script.js (Tüm JavaScript fonksiyonları)

document.addEventListener('DOMContentLoaded', () => {

    // === A. TEMA DEĞİŞTİRİCİ (theme-switcher.js içeriği) ===
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // Kullanıcının kaydettiği temayı yükle
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Varsayılan: dark
    body.setAttribute('data-theme', savedTheme);
    themeToggleButton.textContent = savedTheme === 'dark' ? '☀️' : '🌙'; 

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        themeToggleButton.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', newTheme);
    });


    // === B. SCROLL ANİMASYONLARI (animations.js içeriği) ===
    const animatedElements = document.querySelectorAll('[data-animation]');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-animation');
                entry.target.classList.add('animate-active', animationType); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
        element.classList.add('animate-target'); 
    });
    
    // === C. GALERİ SLIDER (Dinamik Etkileşim) ===
    const slides = document.querySelectorAll('.image-slider .slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
    }
    
    prevButton?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    nextButton?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
    
    // Otomatik Slayt Geçişi (Opsiyonel)
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000); // 5 saniyede bir geçiş


    // === D. RANDEVU FORMU (Basit Validasyon) ===
    const form = document.getElementById('appointment-form');
    const formMessage = document.getElementById('form-message');

    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;

        // Basit kontrol
        if (name && service && date) {
            formMessage.textContent = `Sayın ${name}, ${service} hizmeti için ${new Date(date).toLocaleString('tr-TR')} tarihine randevunuz oluşturulmuştur. Teşekkürler!`;
            formMessage.style.backgroundColor = 'rgba(39, 174, 96, 0.1)'; 
            formMessage.style.color = '#27ae60';
            formMessage.style.display = 'block';
            form.reset(); // Formu sıfırla
        } else {
            formMessage.textContent = 'Lütfen tüm alanları doldurunuz.';
            formMessage.style.backgroundColor = 'rgba(231, 76, 60, 0.1)'; 
            formMessage.style.color = '#e74c3c';
            formMessage.style.display = 'block';
        }

        // 5 saniye sonra mesajı gizle
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });

});
