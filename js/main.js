/* ==========================================================================
   AFRICONNECT SUMMIT 2026 - CORE JAVASCRIPT (Commit 2)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initNavbarScroll();
    initMobileMenu();
    initFooterYear();
});

/**
 * 1. DARK / LIGHT MODE
 * Gère la bascule de thème, l'icône et la persistance dans le localStorage.
 */
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const icon = themeToggle.querySelector('i');
    
    // 1. Vérifier s'il y a un choix enregistré, sinon lire les préférences système
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Déterminer le thème initial (priorité au localStorage)
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Appliquer le thème initial au démarrage
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(icon, currentTheme);

    // 2. Écouteur de clic pour changer de thème
    themeToggle.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
    });
}

function updateThemeIcon(iconElement, theme) {
    if (!iconElement) return;
    if (theme === 'dark') {
        iconElement.className = 'bi bi-sun-fill'; // Icône Soleil en mode sombre pour repasser au clair
    } else {
        iconElement.className = 'bi bi-moon-stars-fill'; // Icône Lune en mode clair
    }
}

/**
 * 2. NAVBAR DYNAMIQUE AU SCROLL
 * Ajoute un fond flouté et une ombre dès que l'utilisateur défile de plus de 80px.
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
 * Gère l'affichage et le masquage de la navigation sur les petits écrans.
 */
function initMobileMenu() {
    const menuBurger = document.getElementById('menu-burger');
    const navLinks = document.querySelector('.nav-links');
    if (!menuBurger || !navLinks) return;

    const icon = menuBurger.querySelector('i');

    menuBurger.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        
        // Change l'icône (Menu liste ou fermeture "X")
        if (navLinks.classList.contains('mobile-active')) {
            icon.className = 'bi bi-xlg';
        } else {
            icon.className = 'bi bi-list';
        }
    });
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
// Ajoutez 'initCountdown();' à l'intérieur du bloc initial 'DOMContentLoaded' existant :
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initNavbarScroll();
    initMobileMenu();
    initFooterYear();
    initCountdown(); // <-- AJOUT DU COMMIT 3
});

/**
 * 5. COMPTE À REBOURS EN TEMPS RÉEL
 * Calcule dynamiquement le temps restant jusqu'à la date de l'événement cible.
 */
function initCountdown() {
    // Définir la date cible fictive (12 Novembre 2026)
    const targetDate = new Date('November 12, 2026 09:00:00').getTime();

    // Sélectionner les éléments du DOM
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        // Si la date est dépassée
        if (difference < 0) {
            document.querySelector('.countdown-wrapper').innerHTML = "<p class="countdown-title">Le Sommet est en cours ! 🔥</p>";
            clearInterval(countdownInterval);
            return;
        }

        // Calculs des composants temporels
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Injection dans le DOM avec formatage (ex: 09 au lieu de 9)
        daysEl.textContent = days < 10 ? '0' + days : days;
        hoursEl.textContent = hours < 10 ? '0' + hours : hours;
        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    // Lancer une première exécution immédiate pour éviter le saut à l'affichage
    updateCountdown();
    // Mettre à jour toutes les secondes
    const countdownInterval = setInterval(updateCountdown, 1000);
}
// Ajoutez ces initialisations dans le bloc 'DOMContentLoaded' existant :
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initNavbarScroll();
    initMobileMenu();
    initFooterYear();
    initCountdown();
    
    initScrollAnimations(); // <-- AJOUT DU COMMIT 4
    initBackToTop();        // <-- AJOUT DU COMMIT 4
});

/**
 * 6. ANIMATIONS AU SCROLL & COMPTEURS NUMÉRIQUES
 * Utilise IntersectionObserver pour détecter l'entrée des sections à l'écran.
 */
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section-reveal');
    
    const observerOptions = {
        root: null,
        threshold: 0.15 // Déclenche quand 15% de la section est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si la section contient des compteurs de statistiques, on les lance
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                if (statNumbers.length > 0) {
                    statNumbers.forEach(num => animateCounter(num));
                }
                
                // Une fois animée, on arrête d'observer cette section
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * Fonction d'incrémentation fluide pour les chiffres clés
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1500; // Durée totale de l'animation en ms
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Formule d'accélération/décélération simple (Ease-out)
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(easedProgress * target);

        // Ajout du signe "+" pour le premier compteur de 1200+ participants
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

    backTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}