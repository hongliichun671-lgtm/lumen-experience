/* ============================================
   LUMEN — Articles Page JavaScript
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // Language Support (EN/KM)
    // ============================================
    const translations = {
        en: {
            navHome: 'Home',
            navTools: 'Tools',
            navArticles: 'Articles',
            navAbout: 'About',
            navContact: 'Contact',
            articlesHeroBadge: 'LUMEN KNOWLEDGE',
            articlesHeroTitle: 'Explore the Science of Light',
            articlesHeroDesc: 'Educational articles about light, color, physics, and consciousness.',
            readMore: 'Read More →',
            footerCopy: '© 2026 LUMEN. All rights reserved.'
        },
        km: {
            navHome: 'ទំព័រដើម',
            navTools: 'ឧបករណ៍',
            navArticles: 'អត្ថបទ',
            navAbout: 'អំពីយើង',
            navContact: 'ទំនាក់ទំនង',
            articlesHeroBadge: 'ចំណេះដឹង LUMEN',
            articlesHeroTitle: 'ស្វែងយល់ពីវិទ្យាសាស្ត្រពន្លឺ',
            articlesHeroDesc: 'អត្ថបទអប់រំអំពីពន្លឺ ពណ៌ រូបវិទ្យា និងមនសិការ។',
            readMore: 'អានបន្ថែម →',
            footerCopy: '© 2026 LUMEN. រក្សាសិទ្ធិគ្រប់យ៉ាង។'
        }
    };

    let currentLang = 'en';

    function applyLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        
        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) el.textContent = t[key];
        });
        
        // Update document lang
        document.documentElement.lang = lang;
        
        // Update language toggle buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Save preference
        localStorage.setItem('lumen-lang', lang);
    }

    // Language toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyLanguage(btn.dataset.lang);
        });
    });

    // Load saved language
    const savedLang = localStorage.getItem('lumen-lang');
    if (savedLang && translations[savedLang]) {
        applyLanguage(savedLang);
    }

    // ============================================
    // Smooth Scroll for Article Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ============================================
    // Article Card Hover Effects
    // ============================================
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============================================
    // Scroll Reveal for Articles
    // ============================================
    const fullArticles = document.querySelectorAll('.full-article');
    const articleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fullArticles.forEach(article => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(30px)';
        article.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        articleObserver.observe(article);
    });

})();
