<?php
/**
 * Theme Functions - Sousa Araújo Advocacia
 * 
 * Este arquivo contém todas as funções necessárias para integrar
 * os componentes React com WordPress via WP React Plugin
 */

// Definir constantes do tema
define('SOUSA_ARAUJO_VERSION', '1.0.0');
define('SOUSA_ARAUJO_REACT_PATH', get_template_directory() . '/react-components');
define('SOUSA_ARAUJO_REACT_URL', get_template_directory_uri() . '/react-components');

/**
 * 1. REGISTRAR COMPONENTES REACT
 */
function sousa_araujo_register_react_components() {
    if (!function_exists('wp_react_register_component')) {
        return;
    }

    // Hero Component
    wp_react_register_component('Hero', array(
        'path' => SOUSA_ARAUJO_REACT_PATH . '/components/Hero.tsx',
        'attributes' => array(
            'backgroundImage' => array('type' => 'string'),
            'subtitle' => array('type' => 'string'),
            'title' => array('type' => 'string'),
        ),
    ));

    // Stats Component
    wp_react_register_component('Stats', array(
        'path' => SOUSA_ARAUJO_REACT_PATH . '/components/Stats.tsx',
        'attributes' => array(
            'stats' => array('type' => 'array'),
        ),
    ));

    // About Component
    wp_react_register_component('About', array(
        'path' => SOUSA_ARAUJO_REACT_PATH . '/components/About.tsx',
        'attributes' => array(
            'image' => array('type' => 'string'),
            'title' => array('type' => 'string'),
            'content' => array('type' => 'array'),
        ),
    ));

    // Differentials Component
    wp_react_register_component('Differentials', array(
        'path' => SOUSA_ARAUJO_REACT_PATH . '/components/Differentials.tsx',
        'attributes' => array(
            'items' => array('type' => 'array'),
        ),
    ));

    // Articles Component
    wp_react_register_component('Articles', array(
        'path' => SOUSA_ARAUJO_REACT_PATH . '/components/Articles.tsx',
        'attributes' => array(
            'articles' => array('type' => 'array'),
        ),
    ));

    // Contact Component
    wp_react_register_component('Contact', array(
        'path' => SOUSA_ARAUJO_REACT_PATH . '/components/Contact.tsx',
        'attributes' => array(
            'title' => array('type' => 'string'),
            'description' => array('type' => 'string'),
        ),
    ));

    // Navbar Component (Widget)
    wp_react_register_component('Navbar', array(
        'path' => SOUSA_ARAUJO_REACT_PATH . '/components/Navbar.tsx',
    ));

    // Footer Component (Widget)
    wp_react_register_component('Footer', array(
        'path' => SOUSA_ARAUJO_REACT_PATH . '/components/Footer.tsx',
    ));
}
add_action('init', 'sousa_araujo_register_react_components');

/**
 * 2. REGISTRAR BLOCOS GUTENBERG
 */
function sousa_araujo_register_blocks() {
    
    // Categoria personalizada
    add_filter('block_categories_all', function($categories) {
        return array_merge(
            array(
                array(
                    'slug' => 'sousa-araujo',
                    'title' => 'Sousa Araújo Advocacia',
                    'icon' => 'balance',
                ),
            ),
            $categories
        );
    });

    // Registrar blocos
    $blocks = array('hero', 'stats', 'about', 'differentials', 'articles', 'contact');
    
    foreach ($blocks as $block) {
        register_block_type("sousa-araujo/{$block}", array(
            'render_callback' => "render_{$block}_block",
            'attributes' => get_block_attributes($block),
        ));
    }
}
add_action('init', 'sousa_araujo_register_blocks');

function get_block_attributes($block) {
    $attributes = array(
        'hero' => array(
            'backgroundImage' => array('type' => 'string'),
            'subtitle' => array('type' => 'string'),
            'title' => array('type' => 'string'),
        ),
        'stats' => array(
            'stats' => array('type' => 'array'),
        ),
        'about' => array(
            'image' => array('type' => 'string'),
            'title' => array('type' => 'string'),
            'content' => array('type' => 'array'),
        ),
        'differentials' => array(
            'items' => array('type' => 'array'),
        ),
        'articles' => array(
            'articles' => array('type' => 'array'),
        ),
        'contact' => array(
            'title' => array('type' => 'string'),
            'description' => array('type' => 'string'),
        ),
    );
    
    return $attributes[$block] ?? array();
}

// Render callbacks
function render_hero_block($attributes) {
    return wp_react_render('Hero', $attributes);
}

function render_stats_block($attributes) {
    return wp_react_render('Stats', $attributes);
}

function render_about_block($attributes) {
    return wp_react_render('About', $attributes);
}

function render_differentials_block($attributes) {
    return wp_react_render('Differentials', $attributes);
}

function render_articles_block($attributes) {
    return wp_react_render('Articles', $attributes);
}

function render_contact_block($attributes) {
    return wp_react_render('Contact', $attributes);
}

/**
 * 3. CUSTOM POST TYPE - ARTIGOS JURÍDICOS
 */
function sousa_araujo_register_post_types() {
    register_post_type('artigo_juridico', array(
        'labels' => array(
            'name' => 'Artigos Jurídicos',
            'singular_name' => 'Artigo Jurídico',
            'add_new' => 'Adicionar Novo',
            'add_new_item' => 'Adicionar Novo Artigo',
            'edit_item' => 'Editar Artigo',
            'new_item' => 'Novo Artigo',
            'view_item' => 'Ver Artigo',
            'search_items' => 'Buscar Artigos',
            'not_found' => 'Nenhum artigo encontrado',
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon' => 'dashicons-media-text',
        'rewrite' => array('slug' => 'artigos'),
    ));
}
add_action('init', 'sousa_araujo_register_post_types');

/**
 * 4. REST API ENDPOINTS
 */
function sousa_araujo_register_rest_routes() {
    // Endpoint: Conteúdo do site
    register_rest_route('sousa-araujo/v1', '/content', array(
        'methods' => 'GET',
        'callback' => 'get_site_content',
        'permission_callback' => '__return_true',
    ));

    // Endpoint: Formulário de contato
    register_rest_route('sousa-araujo/v1', '/contact', array(
        'methods' => 'POST',
        'callback' => 'handle_contact_form',
        'permission_callback' => '__return_true',
    ));

    // Endpoint: Artigos
    register_rest_route('sousa-araujo/v1', '/articles', array(
        'methods' => 'GET',
        'callback' => 'get_articles',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'sousa_araujo_register_rest_routes');

function get_site_content() {
    // Retornar conteúdo centralizado
    $content = array(
        'site' => array(
            'name' => get_bloginfo('name'),
            'tagline' => get_bloginfo('description'),
            'phone' => get_option('sousa_araujo_phone'),
            'email' => get_option('sousa_araujo_email'),
        ),
        'hero' => get_option('sousa_araujo_hero'),
        'stats' => get_option('sousa_araujo_stats'),
        'about' => get_option('sousa_araujo_about'),
        // ... mais conteúdo
    );
    
    return rest_ensure_response($content);
}

function handle_contact_form($request) {
    $params = $request->get_params();
    
    // Validação
    if (empty($params['name']) || empty($params['email']) || empty($params['message'])) {
        return new WP_Error('missing_fields', 'Campos obrigatórios não preenchidos', array('status' => 400));
    }
    
    // Sanitização
    $name = sanitize_text_field($params['name']);
    $email = sanitize_email($params['email']);
    $phone = sanitize_text_field($params['phone']);
    $message = sanitize_textarea_field($params['message']);
    
    // Enviar e-mail
    $to = get_option('admin_email');
    $subject = sprintf('[%s] Novo contato do site', get_bloginfo('name'));
    $body = "Nome: {$name}\n";
    $body .= "E-mail: {$email}\n";
    $body .= "Telefone: {$phone}\n\n";
    $body .= "Mensagem:\n{$message}";
    
    $headers = array('Content-Type: text/plain; charset=UTF-8');
    
    $sent = wp_mail($to, $subject, $body, $headers);
    
    if ($sent) {
        return rest_ensure_response(array('success' => true, 'message' => 'Mensagem enviada com sucesso!'));
    } else {
        return new WP_Error('email_failed', 'Erro ao enviar mensagem', array('status' => 500));
    }
}

function get_articles() {
    $args = array(
        'post_type' => 'artigo_juridico',
        'posts_per_page' => 3,
        'orderby' => 'date',
        'order' => 'DESC',
    );
    
    $query = new WP_Query($args);
    $articles = array();
    
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $articles[] = array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'excerpt' => get_the_excerpt(),
                'date' => get_the_date('d M'),
                'image' => get_the_post_thumbnail_url(get_the_ID(), 'medium'),
                'href' => get_permalink(),
            );
        }
        wp_reset_postdata();
    }
    
    return rest_ensure_response($articles);
}

/**
 * 5. ENQUEUE SCRIPTS E STYLES
 */
function sousa_araujo_enqueue_assets() {
    // Fontes customizadas
    wp_enqueue_style(
        'sousa-araujo-fonts',
        SOUSA_ARAUJO_REACT_URL . '/styles/fonts.css',
        array(),
        SOUSA_ARAUJO_VERSION
    );

    // Theme CSS
    wp_enqueue_style(
        'sousa-araujo-theme',
        SOUSA_ARAUJO_REACT_URL . '/styles/theme.css',
        array(),
        SOUSA_ARAUJO_VERSION
    );

    // React bundle
    wp_enqueue_script(
        'sousa-araujo-react',
        SOUSA_ARAUJO_REACT_URL . '/build/bundle.js',
        array('wp-element', 'wp-components'),
        SOUSA_ARAUJO_VERSION,
        true
    );

    // Passar dados para JavaScript
    wp_localize_script('sousa-araujo-react', 'siteData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'restUrl' => rest_url('sousa-araujo/v1'),
        'nonce' => wp_create_nonce('wp_rest'),
        'homeUrl' => home_url(),
        'themeUrl' => get_template_directory_uri(),
    ));
}
add_action('wp_enqueue_scripts', 'sousa_araujo_enqueue_assets');

/**
 * 6. THEME SUPPORT
 */
function sousa_araujo_setup() {
    // Suporte a título automático
    add_theme_support('title-tag');
    
    // Suporte a imagens destacadas
    add_theme_support('post-thumbnails');
    
    // Suporte a logo customizado
    add_theme_support('custom-logo');
    
    // Suporte a HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Registrar menus
    register_nav_menus(array(
        'primary-menu' => 'Menu Principal',
        'footer-menu' => 'Menu Rodapé',
    ));
}
add_action('after_setup_theme', 'sousa_araujo_setup');

/**
 * 7. WIDGETS AREAS
 */
function sousa_araujo_widgets_init() {
    register_sidebar(array(
        'name' => 'Header',
        'id' => 'header-widget-area',
        'before_widget' => '<div class="header-widget">',
        'after_widget' => '</div>',
    ));
    
    register_sidebar(array(
        'name' => 'Footer',
        'id' => 'footer-widget-area',
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
    ));
}
add_action('widgets_init', 'sousa_araujo_widgets_init');

/**
 * 8. ADMIN CUSTOMIZATION
 */
function sousa_araujo_admin_menu() {
    add_menu_page(
        'Configurações do Site',
        'Sousa Araújo',
        'manage_options',
        'sousa-araujo-settings',
        'sousa_araujo_settings_page',
        'dashicons-balance',
        3
    );
}
add_action('admin_menu', 'sousa_araujo_admin_menu');

function sousa_araujo_settings_page() {
    ?>
    <div class="wrap">
        <h1>Configurações - Sousa Araújo Advocacia</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('sousa_araujo_settings');
            do_settings_sections('sousa-araujo-settings');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}
