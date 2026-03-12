<?php
/**
 * Sousa Araujo Advocacia - Child Theme Functions
 *
 * REQUISITOS:
 * - Tema pai: Hello Elementor (gratuito)
 * - Plugin: Elementor (gratuito) ou Elementor Pro
 *
 * O QUE ESTE ARQUIVO FAZ:
 * 1. Carrega as fontes do Google Fonts
 * 2. Carrega o CSS customizado (sousa-araujo.css)
 * 3. Carrega os scripts de animacao e interacao
 * 4. Registra todos os Custom Elementor Widgets
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'SA_THEME_VERSION', '1.0.0' );
define( 'SA_THEME_DIR', get_stylesheet_directory() );
define( 'SA_THEME_URI', get_stylesheet_directory_uri() );

/* ─── 1. Enqueue Styles ─── */
function sa_enqueue_styles() {
    // Tema pai
    wp_enqueue_style(
        'hello-elementor',
        get_template_directory_uri() . '/style.css'
    );

    // Google Fonts
    wp_enqueue_style(
        'sa-google-fonts',
        'https://fonts.googleapis.com/css2?family=Marcellus&family=Roboto:wght@400;500;700&family=Lora:wght@400;700&family=Noto+Sans:wght@400;500;600&family=Allura&display=swap',
        array(),
        null
    );

    // CSS principal do tema
    wp_enqueue_style(
        'sa-main-css',
        SA_THEME_URI . '/assets/css/sousa-araujo.css',
        array( 'hello-elementor' ),
        SA_THEME_VERSION
    );
}
add_action( 'wp_enqueue_scripts', 'sa_enqueue_styles' );

/* ─── 2. Enqueue Scripts ─── */
function sa_enqueue_scripts() {
    // Swiper.js para carrosseis (ServicesGrid)
    wp_enqueue_style(
        'swiper-css',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
        array(),
        '11.0.0'
    );
    wp_enqueue_script(
        'swiper-js',
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
        array(),
        '11.0.0',
        true
    );

    // Animacoes de scroll (IntersectionObserver)
    wp_enqueue_script(
        'sa-animations',
        SA_THEME_URI . '/assets/js/animations.js',
        array(),
        SA_THEME_VERSION,
        true
    );

    // Acordeao de Areas de Atuacao
    wp_enqueue_script(
        'sa-practice-areas',
        SA_THEME_URI . '/assets/js/practice-areas.js',
        array(),
        SA_THEME_VERSION,
        true
    );
}
add_action( 'wp_enqueue_scripts', 'sa_enqueue_scripts' );

/* ─── 3. Registrar Widgets do Elementor ─── */
function sa_register_elementor_widgets( $widgets_manager ) {
    // Carregar todas as classes de widgets
    $widgets = array(
        'hero',
        'about',
        'services-grid',
        'differentials',
        'stats',
        'practice-areas',
        'cta-banner',
        'videos',
        'blog',
        'contact',
        'footer',
    );

    foreach ( $widgets as $widget ) {
        require_once SA_THEME_DIR . '/widgets/class-' . $widget . '-widget.php';
    }

    // Registrar cada widget
    $widgets_manager->register( new \SA_Hero_Widget() );
    $widgets_manager->register( new \SA_About_Widget() );
    $widgets_manager->register( new \SA_Services_Grid_Widget() );
    $widgets_manager->register( new \SA_Differentials_Widget() );
    $widgets_manager->register( new \SA_Stats_Widget() );
    $widgets_manager->register( new \SA_Practice_Areas_Widget() );
    $widgets_manager->register( new \SA_CTA_Banner_Widget() );
    $widgets_manager->register( new \SA_Videos_Widget() );
    $widgets_manager->register( new \SA_Blog_Widget() );
    $widgets_manager->register( new \SA_Contact_Widget() );
    $widgets_manager->register( new \SA_Footer_Widget() );
}
add_action( 'elementor/widgets/register', 'sa_register_elementor_widgets' );

/* ─── 4. Registrar Categoria de Widgets ─── */
function sa_register_widget_category( $elements_manager ) {
    $elements_manager->add_category(
        'sousa-araujo',
        array(
            'title' => esc_html__( 'Sousa Araujo', 'sousa-araujo' ),
            'icon'  => 'eicon-globe',
        )
    );
}
add_action( 'elementor/elements/categories_registered', 'sa_register_widget_category' );

/* ─── 5. Remover margem padrao do Elementor ─── */
function sa_elementor_defaults() {
    update_option( 'elementor_container_width', 1440 );
}
add_action( 'after_switch_theme', 'sa_elementor_defaults' );
