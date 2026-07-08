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