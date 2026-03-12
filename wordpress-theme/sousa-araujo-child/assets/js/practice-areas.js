/**
 * Sousa Araujo - Practice Areas Accordion
 * Desktop: paineis com expand/collapse estilo Dictum
 * Mobile: accordion simples com max-height transition
 */
(function () {
    'use strict';

    function initPracticeAreas() {
        // ─── Desktop Accordion ───
        var desktopPanels = document.querySelectorAll('.sa-practice__panel');
        if (desktopPanels.length) {
            desktopPanels.forEach(function (panel) {
                panel.addEventListener('click', function () {
                    if (panel.classList.contains('is-expanded')) return;
                    desktopPanels.forEach(function (p) {
                        p.classList.remove('is-expanded');
                    });
                    panel.classList.add('is-expanded');
                });
            });
            // Abrir primeiro por padrao
            if (!document.querySelector('.sa-practice__panel.is-expanded') && desktopPanels[0]) {
                desktopPanels[0].classList.add('is-expanded');
            }
        }

        // ─── Mobile Accordion ───
        var mobileItems = document.querySelectorAll('.sa-practice__mobile-item');
        if (mobileItems.length) {
            mobileItems.forEach(function (item) {
                var header = item.querySelector('.sa-practice__mobile-header');
                if (header) {
                    header.addEventListener('click', function () {
                        // Toggle: fechar todos e abrir o clicado
                        var wasExpanded = item.classList.contains('is-expanded');
                        mobileItems.forEach(function (i) {
                            i.classList.remove('is-expanded');
                        });
                        if (!wasExpanded) {
                            item.classList.add('is-expanded');
                        }
                    });
                }
            });
            // Abrir primeiro por padrao
            if (!document.querySelector('.sa-practice__mobile-item.is-expanded') && mobileItems[0]) {
                mobileItems[0].classList.add('is-expanded');
            }
        }
    }

    // ─── Swiper init para ServicesGrid ───
    function initServicesSwiper() {
        var swiperEl = document.querySelector('.sa-services-swiper');
        if (swiperEl && typeof Swiper !== 'undefined') {
            new Swiper('.sa-services-swiper', {
                slidesPerView: 3,
                spaceBetween: 16,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
            });
        }
    }

    // Inicializar
    function init() {
        initPracticeAreas();
        initServicesSwiper();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-init para Elementor editor
    if (window.elementorFrontend) {
        window.elementorFrontend.hooks.addAction(
            'frontend/element_ready/sa-practice-areas.default',
            initPracticeAreas
        );
        window.elementorFrontend.hooks.addAction(
            'frontend/element_ready/sa-services-grid.default',
            initServicesSwiper
        );
    }
})();
