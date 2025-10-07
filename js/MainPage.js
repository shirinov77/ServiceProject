// /js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Til o'zgartirish
    let currentLang = localStorage.getItem('lang') || 'uz'; // Default o'zbekcha
    const translations = {}; // Matnlarni saqlash uchun

    // JSON yuklash
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`/lang/${lang}.json`);
            translations[lang] = await response.json();
            updateContent(lang);
        } catch (error) {
            console.error('Tarjima yuklashda xato:', error);
        }
    }

    // Matnlarni yangilash
    function updateContent(lang) {
        Object.keys(translations[lang]).forEach(key => {
            const elements = document.querySelectorAll(`[data-key="${key}"]`);
            elements.forEach(el => {
                el.textContent = translations[lang][key];
            });
        });
        document.documentElement.lang = lang; // HTML lang atributini o'zgartirish
        document.title = translations[lang].subtitle || 'Travelcontinent';
        localStorage.setItem('lang', lang);
        // Tugma matnini o'zgartirish
        const switchBtn = document.getElementById('lang-switch');
        switchBtn.textContent = lang === 'uz' ? 'RU' : 'O\'Z';
    }

    // Til tugmasi
    document.getElementById('lang-switch').addEventListener('click', () => {
        currentLang = currentLang === 'uz' ? 'ru' : 'uz';
        loadTranslations(currentLang);
    });

    // Dastlabki yuklash
    loadTranslations(currentLang);

    // Ketma-ket animatsiya (har 30 sekundda)
    const buttons = document.querySelectorAll('.link-btn');
    function animateButtons() {
        let index = 0;
        const staggerDelay = 200;
        function nextButton() {
            if (index < buttons.length) {
                const btn = buttons[index];
                btn.classList.add('pulse');
                setTimeout(() => {
                    btn.classList.remove('pulse');
                    index++;
                    setTimeout(nextButton, staggerDelay);
                }, 800);
            }
        }
        nextButton();
    }
    animateButtons();
    setInterval(animateButtons, 30000);
});