/* ==========================================================================
   AFRICONNECT SUMMIT 2026 - MAIN JAVASCRIPT (Unified, Secured & Fixed)
   ========================================================================== */

// POINT D'ENTRÉE UNIQUE - Initialisation globale et sécurisée
document.addEventListener('DOMContentLoaded', () => {
    // 1. Priorité absolue : Gestion du Thème (Sombre / Clair)
    try { 
        initDarkMode(); 
    } catch (error) { 
        console.error("Erreur Initialisation DarkMode:", error); 
    }

    // 2. Liste complète et ordonnée de tous les modules du projet
    const modules = [
        { name: "Navbar Scroll", func: initNavbarScroll },
        { name: "Mobile Menu", func: initMobileMenu },
        { name: "Footer Year", func: initFooterYear },
        { name: "Countdown", func: initCountdown },
        { name: "Scroll Animations", func: initScrollAnimations },
        { name: "Back To Top", func: initBackToTop },
        { name: "Program Tabs", func: initProgramTabs },
        { name: "Speaker Filters", func: initSpeakerFilters },
        { name: "Contact Form", func: initContactForm },
        { name: "FAQ Accordion", func: initAccordion }
    ];

    // Initialisation sécurisée inter-pages (évite les plantages si un élément HTML est absent)
    modules.forEach(module => {
        try {
            module.func();
        } catch (error) {
            // Log discret pour le développement
            console.warn(`Module [${module.name}] non activé sur cette page.`);
        }
    });
});

/**
 * 1. DARK / LIGHT MODE
 */
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(icon, currentTheme);

    themeToggle.onclick = function() {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
    };
}

function updateThemeIcon(iconElement, theme) {
    if (!iconElement) return;
    if (theme === 'dark') {
        iconElement.className = 'bi bi-sun-fill';
    } else {
        iconElement.className = 'bi bi-moon-stars-fill';
    }
}

/**
 * 2. NAVBAR DYNAMIQUE AU SCROLL
 */
function initNavbarScroll() {
    const header = document.querySelector('.header-global');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * 3. MENU HAMBURGER MOBILE
 */
function initMobileMenu() {
    const menuBurger = document.getElementById('menu-burger');
    const navLinks = document.querySelector('.nav-links');
    if (!menuBurger || !navLinks) return;

    const icon = menuBurger.querySelector('i');

    menuBurger.onclick = function() {
        navLinks.classList.toggle('mobile-active');
        if (navLinks.classList.contains('mobile-active')) {
            icon.className = 'bi bi-xlg';
        } else {
            icon.className = 'bi bi-list';
        }
    };
}

/**
 * 4. ANNÉE DYNAMIQUE DANS LE FOOTER
 */
function initFooterYear() {
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * 5. COMPTE À REBOURS EN TEMPS RÉEL
 */
function initCountdown() {
    const targetDate = new Date('November 12, 2026 09:00:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            const wrapper = document.querySelector('.countdown-wrapper');
            if (wrapper) {
                wrapper.innerHTML = `<p class="countdown-title">Le Sommet est en cours ! 🔥</p>`;
            }
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

/**
 * 6. ANIMATIONS AU SCROLL (Intersection Observer)
 */
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section-reveal');
    if (sections.length === 0) return; 
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                if (statNumbers.length > 0) {
                    statNumbers.forEach(num => animateCounter(num));
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * INC-RÉMENTATION DES COMPTEURS NUMÉRIQUES
 */
function animateCounter(element) {
    if (element.classList.contains('animated')) return;
    element.classList.add('animated');

    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1500; 
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(easedProgress * target);

        element.textContent = target >= 1000 ? `+${currentValue}` : currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target >= 1000 ? `+${target}` : target;
        }
    }

    requestAnimationFrame(updateNumber);
}

/**
 * 7. BOUTON RETOUR EN HAUT (BACK TO TOP)
 */
function initBackToTop() {
    const backTopBtn = document.getElementById('back-to-top');
    if (!backTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backTopBtn.classList.add('show');
        } else {
            backTopBtn.classList.remove('show');
        }
    });

    backTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}

/**
 * 8. ONGLETS INTERACTIFS DU PROGRAMME
 */
function initProgramTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length === 0 || tabPanels.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/**
 * 9. FILTRAGE EN TEMPS RÉEL DES INTERVENANTS
 */
function initSpeakerFilters() {
    const searchInput = document.getElementById('speaker-search');
    const countryFilter = document.getElementById('speaker-filter-country');
    const speakerCards = document.querySelectorAll('.speaker-card-full');
    const noResults = document.getElementById('no-results');

    if (!searchInput || !countryFilter || speakerCards.length === 0) return;

    function filterSpeakers() {
        const searchValue = searchInput.value.toLowerCase().trim();
        const selectedCountry = countryFilter.value;
        let visibleCount = 0;

        speakerCards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const job = card.querySelector('.speaker-title-job').textContent.toLowerCase();
            const bio = card.querySelector('.speaker-bio').textContent.toLowerCase();
            const cardCountry = card.getAttribute('data-country');

            const matchesSearch = name.includes(searchValue) || job.includes(searchValue) || bio.includes(searchValue);
            const matchesCountry = (selectedCountry === 'all') || (cardCountry === selectedCountry);

            if (matchesSearch && matchesCountry) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }

    searchInput.addEventListener('input', filterSpeakers);
    countryFilter.addEventListener('change', filterSpeakers);
}

/**
 * 10. VALIDATION DU FORMULAIRE DE CONTACT
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusBox = document.getElementById('form-status');
    if (!form || !statusBox) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

        inputs.forEach(input => {
            const parent = input.parentElement;
            if (!input.checkValidity()) {
                parent.classList.add('invalid');
                isFormValid = false;
            } else {
                parent.classList.remove('invalid');
            }
        });

        if (isFormValid) {
            statusBox.className = "form-status-box success";
            statusBox.innerHTML = `<i class="bi bi-check-circle-fill"></i> Merci ! Votre message a bien été envoyé avec succès.`;
            statusBox.style.display = "block";
            form.reset();
        } else {
            statusBox.className = "form-status-box error";
            statusBox.innerHTML = `<i class="bi bi-exclamation-triangle-fill"></i> Veuillez corriger les erreurs dans le formulaire avant l'envoi.`;
            statusBox.style.display = "block";
        }
    });

    form.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('input', () => {
            if (element.checkValidity()) {
                element.parentElement.classList.remove('invalid');
            }
        });
    });
}

/**
 * 11. FAQ ACCORDÉON ANIMÉ
 */
function initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    if (headers.length === 0) return;

    headers.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            
            const item = this.parentElement;
            const collapse = item.querySelector('.accordion-collapse');
            const isActive = item.classList.contains('active');

            // Fermer tous les autres accordéons
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherCollapse = otherItem.querySelector('.accordion-collapse');
                    if (otherCollapse) {
                        otherCollapse.style.maxHeight = null;
                    }
                    otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                }
            });

            // Basculer l'état de l'élément cliqué
            if (!isActive) {
                item.classList.add('active');
                collapse.style.maxHeight = collapse.scrollHeight + "px";
                this.setAttribute('aria-expanded', 'true');
            } else {
                item.classList.remove('active');
                collapse.style.maxHeight = null;
                this.setAttribute('aria-expanded', 'false');
            }
        });
    });
}