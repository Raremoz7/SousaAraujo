# Guia de Exportação para WordPress

Este guia descreve como exportar o site Sousa Araújo Advocacia para WordPress usando o WP React Plugin.

## 📋 Pré-requisitos

1. WordPress 6.0 ou superior
2. PHP 8.0 ou superior
3. Plugin **WP React Plugin** instalado e ativado
4. Plugin **Advanced Custom Fields (ACF)** (opcional, mas recomendado)
5. Tema compatível com Gutenberg

## 🚀 Passos para Exportação

### 1. Preparar o Ambiente WordPress

```bash
# Instalar plugins necessários
wp plugin install wp-react-plugin --activate
wp plugin install advanced-custom-fields --activate
```

### 2. Estrutura de Pastas no WordPress

Copie os arquivos do projeto React para o tema WordPress:

```
wp-content/
  themes/
    seu-tema/
      react-components/
        ├── components/       # Componentes React
        ├── data/            # Dados e conteúdo
        ├── config/          # Configurações
        ├── styles/          # Estilos CSS
        └── assets/          # Imagens e recursos
```

### 3. Configurar o WP React Plugin

Crie o arquivo `wp-react-config.php` na raiz do tema:

```php
<?php
/**
 * Configuração WP React Plugin
 * Sousa Araújo Advocacia
 */

// Registrar componentes React
function sousa_araujo_register_react_components() {
    if (function_exists('wp_react_register_component')) {
        
        // Hero Component
        wp_react_register_component('Hero', array(
            'path' => get_template_directory() . '/react-components/components/Hero.tsx',
            'attributes' => array(
                'backgroundImage' => 'string',
                'subtitle' => 'string',
                'title' => 'string',
            ),
        ));

        // Stats Component
        wp_react_register_component('Stats', array(
            'path' => get_template_directory() . '/react-components/components/Stats.tsx',
            'attributes' => array(
                'stats' => 'array',
            ),
        ));

        // About Component
        wp_react_register_component('About', array(
            'path' => get_template_directory() . '/react-components/components/About.tsx',
            'attributes' => array(
                'image' => 'string',
                'title' => 'string',
                'content' => 'array',
            ),
        ));

        // Differentials Component
        wp_react_register_component('Differentials', array(
            'path' => get_template_directory() . '/react-components/components/Differentials.tsx',
            'attributes' => array(
                'items' => 'array',
            ),
        ));

        // Articles Component
        wp_react_register_component('Articles', array(
            'path' => get_template_directory() . '/react-components/components/Articles.tsx',
            'attributes' => array(
                'articles' => 'array',
            ),
        ));

        // Contact Component
        wp_react_register_component('Contact', array(
            'path' => get_template_directory() . '/react-components/components/Contact.tsx',
            'attributes' => array(
                'title' => 'string',
                'description' => 'string',
            ),
        ));
    }
}
add_action('init', 'sousa_araujo_register_react_components');
```

### 4. Registrar Blocos Gutenberg

Crie o arquivo `block-registration.php`:

```php
<?php
/**
 * Registrar Blocos Gutenberg com React Components
 */

function sousa_araujo_register_blocks() {
    
    // Categoria personalizada para os blocos
    add_filter('block_categories_all', function($categories) {
        return array_merge(
            array(
                array(
                    'slug' => 'sousa-araujo',
                    'title' => 'Sousa Araújo Advocacia',
                ),
            ),
            $categories
        );
    });

    // Registrar cada bloco
    register_block_type('sousa-araujo/hero', array(
        'render_callback' => 'render_hero_block',
        'attributes' => array(
            'backgroundImage' => array('type' => 'string'),
            'subtitle' => array('type' => 'string'),
            'title' => array('type' => 'string'),
        ),
    ));

    // Adicionar mais blocos conforme necessário...
}
add_action('init', 'sousa_araujo_register_blocks');

function render_hero_block($attributes) {
    return wp_react_render('Hero', $attributes);
}
```

### 5. Migrar Imagens

As imagens do Figma precisam ser migradas para a biblioteca de mídia do WordPress:

```php
<?php
/**
 * Script de migração de imagens
 * Execute uma vez para importar todas as imagens
 */

function sousa_araujo_migrate_images() {
    $images = array(
        'hero-bg' => 'figma:asset/1bde68b0434e033834687b9e219a2315c5e30659.png',
        'about-photo' => 'figma:asset/4fee0ccd87db6dd900796a349711620cb85c2755.png',
        // Adicionar mais imagens...
    );

    foreach ($images as $key => $figma_url) {
        // Baixar e fazer upload para biblioteca de mídia
        $image_id = media_sideload_image($figma_url, 0, $key, 'id');
        
        // Salvar ID em options para referência
        update_option('sousa_araujo_image_' . $key, $image_id);
    }
}
```

### 6. Criar Custom Post Type para Artigos

```php
<?php
/**
 * Custom Post Type: Artigos Jurídicos
 */

function sousa_araujo_register_post_types() {
    register_post_type('artigo_juridico', array(
        'labels' => array(
            'name' => 'Artigos Jurídicos',
            'singular_name' => 'Artigo Jurídico',
        ),
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-media-text',
    ));
}
add_action('init', 'sousa_araujo_register_post_types');
```

### 7. Configurar REST API

Crie endpoints personalizados para consumir dados:

```php
<?php
/**
 * REST API Endpoints
 */

function sousa_araujo_register_rest_routes() {
    register_rest_route('sousa-araujo/v1', '/content', array(
        'methods' => 'GET',
        'callback' => 'get_site_content',
        'permission_callback' => '__return_true',
    ));

    register_rest_route('sousa-araujo/v1', '/contact', array(
        'methods' => 'POST',
        'callback' => 'handle_contact_form',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'sousa_araujo_register_rest_routes');

function get_site_content() {
    // Retornar dados do content.ts em formato JSON
    $content = include get_template_directory() . '/react-components/data/content-wp.php';
    return rest_ensure_response($content);
}

function handle_contact_form($request) {
    $params = $request->get_params();
    
    // Validar e processar formulário
    $name = sanitize_text_field($params['name']);
    $email = sanitize_email($params['email']);
    $phone = sanitize_text_field($params['phone']);
    $message = sanitize_textarea_field($params['message']);
    
    // Enviar e-mail
    $to = get_option('admin_email');
    $subject = 'Novo contato do site';
    $body = "Nome: $name\nE-mail: $email\nTelefone: $phone\n\nMensagem:\n$message";
    
    wp_mail($to, $subject, $body);
    
    return rest_ensure_response(array('success' => true));
}
```

### 8. Enqueue Scripts e Styles

```php
<?php
/**
 * Enqueue Scripts e Styles
 */

function sousa_araujo_enqueue_assets() {
    // Fontes customizadas
    wp_enqueue_style(
        'sousa-araujo-fonts',
        get_template_directory_uri() . '/react-components/styles/fonts.css'
    );

    // Theme CSS
    wp_enqueue_style(
        'sousa-araujo-theme',
        get_template_directory_uri() . '/react-components/styles/theme.css'
    );

    // React bundle
    wp_enqueue_script(
        'sousa-araujo-react',
        get_template_directory_uri() . '/react-components/build/bundle.js',
        array('wp-element', 'wp-components'),
        '1.0.0',
        true
    );

    // Passar dados para JavaScript
    wp_localize_script('sousa-araujo-react', 'siteData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'restUrl' => rest_url('sousa-araujo/v1'),
        'nonce' => wp_create_nonce('wp_rest'),
    ));
}
add_action('wp_enqueue_scripts', 'sousa_araujo_enqueue_assets');
```

## 🔄 Workflow de Desenvolvimento

### Desenvolvimento Local (React)
```bash
npm run dev
```

### Build para Produção
```bash
npm run build
```

### Deploy para WordPress
```bash
# 1. Build do projeto React
npm run build

# 2. Copiar arquivos para WordPress
rsync -av dist/ /path/to/wordpress/wp-content/themes/seu-tema/react-components/

# 3. Upload para servidor
wp media import dist/assets/* --porcelain
```

## 📝 Checklist de Migração

- [ ] WordPress instalado e configurado
- [ ] WP React Plugin instalado
- [ ] Componentes React copiados para o tema
- [ ] Blocos Gutenberg registrados
- [ ] Imagens migradas para biblioteca de mídia
- [ ] Custom Post Types criados
- [ ] REST API endpoints configurados
- [ ] Formulário de contato funcionando
- [ ] Fontes customizadas carregando
- [ ] Cores e estilos aplicados
- [ ] Menu de navegação configurado
- [ ] Footer widgets configurados
- [ ] SEO configurado
- [ ] Performance otimizada
- [ ] Testes em mobile e desktop

## 🔧 Troubleshooting

### Componentes não aparecem
- Verificar se o WP React Plugin está ativo
- Verificar caminhos dos arquivos
- Verificar console do navegador para erros

### Imagens não carregam
- Verificar URLs das imagens
- Migrar imagens para biblioteca de mídia
- Atualizar referências no código

### Estilos não aplicam
- Verificar se fonts.css e theme.css estão sendo carregados
- Verificar ordem de carregamento dos styles
- Limpar cache do navegador e WordPress

## 📚 Recursos Adicionais

- [WP React Plugin Documentation](https://wp-react-plugin.com/docs)
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [React in WordPress](https://developer.wordpress.org/block-editor/how-to-guides/javascript/js-build-setup/)

## 🆘 Suporte

Para dúvidas ou problemas, consulte:
- Documentação do WP React Plugin
- WordPress Support Forums
- Stack Overflow (tag: wordpress-react)
