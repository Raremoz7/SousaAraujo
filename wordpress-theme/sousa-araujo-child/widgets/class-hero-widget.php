<?php
/**
 * Widget: SA - Hero
 * Campos editaveis: imagem de fundo, subtitulo, titulo (H1), assinatura
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_Hero_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-hero'; }
    public function get_title() { return 'SA - Hero'; }
    public function get_icon() { return 'eicon-header'; }
    public function get_categories() { return [ 'sousa-araujo' ]; }

    protected function register_controls() {
        $this->start_controls_section( 'content_section', [
            'label' => 'Conteudo',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control( 'background_image', [
            'label'   => 'Imagem de Fundo',
            'type'    => \Elementor\Controls_Manager::MEDIA,
            'default' => [ 'url' => '' ],
        ]);

        $this->add_control( 'subtitle', [
            'label'   => 'Subtitulo',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'A solucao mais inteligente comeca antes do processo',
        ]);

        $this->add_control( 'title', [
            'label'   => 'Titulo Principal (H1)',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Escritorio de advocacia em Brasilia com atuacao nacional e para brasileiros no exterior',
            'description' => 'Este e o H1 da pagina. Deve conter a keyword principal para SEO.',
        ]);

        $this->add_control( 'signature', [
            'label'   => 'Assinatura',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Lidiane Sousa Araujo',
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $bg = ! empty( $s['background_image']['url'] ) ? $s['background_image']['url'] : '';
        ?>
        <section id="home" class="sa-hero">
            <div class="sa-hero__bg">
                <?php if ( $bg ) : ?>
                    <img alt="" src="<?php echo esc_url( $bg ); ?>" />
                <?php endif; ?>
                <div class="sa-hero__gradient"></div>
            </div>

            <div class="sa-hero__content">
                <div class="sa-hero__subtitle-wrap">
                    <p class="sa-hero__subtitle"><?php echo esc_html( $s['subtitle'] ); ?></p>
                </div>

                <div class="sa-hero__title-wrap">
                    <h1 class="sa-hero__title"><?php echo esc_html( $s['title'] ); ?></h1>
                </div>

                <div class="sa-hero__signature-wrap">
                    <p class="sa-hero__signature"><?php echo esc_html( $s['signature'] ); ?></p>
                </div>
            </div>
        </section>
        <?php
    }
}
