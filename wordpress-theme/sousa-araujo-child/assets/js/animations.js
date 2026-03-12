/**
 * Sousa Araujo - Scroll Animations
 * Substitui Framer Motion por IntersectionObserver + CSS transitions
 * Classe: .sa-animate -> adiciona .is-visible quando entra na viewport
 */
(function () {
    'use strict';

    if (!('IntersectionObserver' in window)) {
        // Fallback: mostra tudo sem animacao
        document.querySelectorAll('.sa-animate').forEach(function (el) {
            el.classList.add('is-visible');
        });
        return;
    }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: '-80px 0px',
            threshold: 0.1,
        }
    );

    // Observar todos os elementos com classe sa-animate
    function initAnimations() {
        document.querySelectorAll('.sa-animate').forEach(function (el) {
            observer.observe(el);
        });
    }

    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }

    // Re-inicializar apos Elementor frontend init (para o editor)
    if (window.elementorFrontend) {
        window.elementorFrontend.hooks.addAction(
            'frontend/element_ready/global',
            function () {
                initAnimations();
            }
        );
    }
})();
