<?php
/**
 * Widget: SA - Blog / Artigos
 * Campos editaveis: titulo, repeater com imagem, data, categoria, titulo, link
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_Blog_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-blog'; }
    public function get_title() { return 'SA - Blog'; }
    public function get_icon() { return 'eicon-post-list'; }
    public function get_categories() { return [ 'sousa-araujo' ]; }

    protected function register_controls() {
        $this->start_controls_section( 'content_section', [
            'label' => 'Conteudo',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control( 'title', [
            'label'   => 'Titulo da Secao',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Quem se informa, se protege',
        ]);

        $this->add_control( 'view_all_text', [
            'label'   => 'Texto "Ver Todos"',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Ver todos os artigos',
        ]);

        $this->add_control( 'view_all_url', [
            'label'   => 'URL "Ver Todos"',
            'type'    => \Elementor\Controls_Manager::URL,
            'default' => [ 'url' => '#todos-artigos' ],
        ]);

        $repeater = new \Elementor\Repeater();

        $repeater->add_control( 'image', [
            'label'   => 'Imagem',
            'type'    => \Elementor\Controls_Manager::MEDIA,
            'default' => [ 'url' => '' ],
        ]);

        $repeater->add_control( 'day', [
            'label'   => 'Dia',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => '01',
        ]);

        $repeater->add_control( 'month', [
            'label'   => 'Mes (abreviado)',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Nov',
        ]);

        $repeater->add_control( 'category', [
            'label'   => 'Categoria',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Direito de Familia',
        ]);

        $repeater->add_control( 'title', [
            'label'   => 'Titulo do Artigo',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Titulo do artigo...',
        ]);

        $repeater->add_control( 'link_url', [
            'label'   => 'URL do Artigo',
            'type'    => \Elementor\Controls_Manager::URL,
            'default' => [ 'url' => '#' ],
        ]);

        $this->add_control( 'articles', [
            'label'   => 'Artigos',
            'type'    => \Elementor\Controls_Manager::REPEATER,
            'fields'  => $repeater->get_controls(),
            'default' => [
                [ 'day' => '01', 'month' => 'Nov', 'category' => 'Direito Imobiliario e Usucapiao', 'title' => 'Imovel sem escritura: 5 caminhos reais para regularizar' ],
                [ 'day' => '01', 'month' => 'Nov', 'category' => 'Homologacao e Direito Internacional', 'title' => 'Posso vender um imovel no Brasil com um divorcio pendente no exterior?' ],
                [ 'day' => '01', 'month' => 'Nov', 'category' => 'Direito de Familia', 'title' => 'Uniao Estavel x Casamento: O que muda no seu patrimonio?' ],
            ],
            'title_field' => '{{{ title }}}',
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $all_url = ! empty( $s['view_all_url']['url'] ) ? $s['view_all_url']['url'] : '#todos-artigos';
        ?>
        <section id="artigos" class="sa-blog">
            <div class="sa-container">
                <h2 class="sa-blog__title sa-animate"><?php echo esc_html( $s['title'] ); ?></h2>

                <div class="sa-blog__grid">
                    <?php foreach ( $s['articles'] as $i => $article ) :
                        $img = ! empty( $article['image']['url'] ) ? $article['image']['url'] : '';
                        $link = ! empty( $article['link_url']['url'] ) ? $article['link_url']['url'] : '#';
                    ?>
                    <article class="sa-blog__card sa-animate sa-animate--delay-<?php echo $i + 1; ?>">
                        <div class="sa-blog__card-img">
                            <?php if ( $img ) : ?>
                                <img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $article['title'] ); ?>" />
                            <?php endif; ?>
                            <div class="sa-blog__badge">
                                <span class="sa-blog__badge-day"><?php echo esc_html( $article['day'] ); ?></span>
                                <span class="sa-blog__badge-month"><?php echo esc_html( $article['month'] ); ?></span>
                            </div>
                        </div>

                        <p class="sa-blog__card-category"><?php echo esc_html( $article['category'] ); ?></p>
                        <h3 class="sa-blog__card-title"><?php echo esc_html( $article['title'] ); ?></h3>

                        <a href="<?php echo esc_url( $link ); ?>" class="sa-link" style="font-size:15px;">
                            Ler Artigo
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M0.36 9.6L9.49 0.5M0.41 0.51H9.48M9.5 9.39V0.5" stroke="currentColor" stroke-width="1.02"/>
                            </svg>
                        </a>
                    </article>
                    <?php endforeach; ?>
                </div>

                <div class="sa-videos__all-link">
                    <a href="<?php echo esc_url( $all_url ); ?>" class="sa-link">
                        <?php echo esc_html( $s['view_all_text'] ); ?>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M0.36 9.6L9.49 0.5M0.41 0.51H9.48M9.5 9.39V0.5" stroke="currentColor" stroke-width="1.02"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
        <?php
    }
}
