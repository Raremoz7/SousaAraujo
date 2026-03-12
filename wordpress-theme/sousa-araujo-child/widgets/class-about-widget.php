<?php
/**
 * Widget: SA - Quem Somos
 * Campos editaveis: titulo, paragrafos (WYSIWYG), 2 quotes, link
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_About_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-about'; }
    public function get_title() { return 'SA - Quem Somos'; }
    public function get_icon() { return 'eicon-person'; }
    public function get_categories() { return [ 'sousa-araujo' ]; }

    protected function register_controls() {
        $this->start_controls_section( 'content_section', [
            'label' => 'Conteudo',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control( 'title', [
            'label'   => 'Titulo',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Quem Somos',
        ]);

        $this->add_control( 'text_content', [
            'label'   => 'Texto Principal',
            'type'    => \Elementor\Controls_Manager::WYSIWYG,
            'default' => '<p>A <strong>Sousa Araujo Advocacia</strong> e fundada e conduzida pela <strong>Dra. Lidiane Sousa Araujo, OAB/DF 34.876</strong>, com inscricao ativa desde 2011. Sao mais de 14 anos de atuacao construidos com uma premissa que nao muda: a estrategia certa vem antes de qualquer protocolo.</p><p>Na pratica, o cliente recebe relatorios periodicos, sabe exatamente em que fase esta o seu caso e conta com atendimento estruturado presencial em Brasilia ou 100% online.</p>',
        ]);

        $this->add_control( 'link_text', [
            'label'   => 'Texto do Link',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Saiba Mais',
        ]);

        $this->add_control( 'link_url', [
            'label'   => 'URL do Link',
            'type'    => \Elementor\Controls_Manager::URL,
            'default' => [ 'url' => '#contato' ],
        ]);

        $this->add_control( 'heading_quote1', [
            'label'     => 'Citacao 1 (cor accent)',
            'type'      => \Elementor\Controls_Manager::HEADING,
            'separator' => 'before',
        ]);

        $this->add_control( 'quote1', [
            'label'   => 'Texto da Citacao 1',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Desenvolvemos a estrategia juridica mais inteligente para cada situacao — extrajudicial sempre que possivel, judicial quando necessario',
        ]);

        $this->add_control( 'heading_quote2', [
            'label'     => 'Citacao 2 (cor branca)',
            'type'      => \Elementor\Controls_Manager::HEADING,
            'separator' => 'before',
        ]);

        $this->add_control( 'quote2', [
            'label'   => 'Texto da Citacao 2',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Mais de 14 anos de atuacao, checklist rigoroso em cada etapa e comunicacao clara do inicio ao fim. Voce nunca fica sem saber o que esta acontecendo.',
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $link_url = ! empty( $s['link_url']['url'] ) ? $s['link_url']['url'] : '#contato';
        ?>
        <section id="quem-somos" class="sa-about">
            <div class="sa-container">
                <div class="sa-about__grid">
                    <!-- Coluna Esquerda -->
                    <div class="sa-animate">
                        <h2 class="sa-about__title"><?php echo esc_html( $s['title'] ); ?></h2>
                        <div class="sa-about__text">
                            <?php echo wp_kses_post( $s['text_content'] ); ?>
                        </div>
                        <a href="<?php echo esc_url( $link_url ); ?>" class="sa-about__link">
                            <span><?php echo esc_html( $s['link_text'] ); ?></span>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M0.36 9.6L9.49 0.5M0.41 0.51H9.48M9.5 9.39V0.5" stroke="currentColor" stroke-width="1.02"/>
                            </svg>
                        </a>
                    </div>

                    <!-- Coluna Direita - Quotes -->
                    <div class="sa-about__quotes">
                        <div class="sa-animate sa-animate--delay-1">
                            <p class="sa-about__quote sa-about__quote--accent">
                                <?php echo esc_html( $s['quote1'] ); ?>
                            </p>
                        </div>
                        <div class="sa-animate sa-animate--delay-2">
                            <p class="sa-about__quote sa-about__quote--white">
                                <?php echo esc_html( $s['quote2'] ); ?>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php
    }
}
