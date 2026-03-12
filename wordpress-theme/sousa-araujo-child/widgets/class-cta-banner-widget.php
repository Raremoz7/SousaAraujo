<?php
/**
 * Widget: SA - CTA Banner
 * Campos editaveis: imagem de fundo, titulo, texto do botao, URL do botao
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_CTA_Banner_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-cta-banner'; }
    public function get_title() { return 'SA - CTA Banner'; }
    public function get_icon() { return 'eicon-call-to-action'; }
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

        $this->add_control( 'title', [
            'label'   => 'Titulo',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Quem entende o processo, controla o resultado',
        ]);

        $this->add_control( 'button_text', [
            'label'   => 'Texto do Botao',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Agendar Consulta de Viabilidade',
        ]);

        $this->add_control( 'button_url', [
            'label'   => 'URL do Botao',
            'type'    => \Elementor\Controls_Manager::URL,
            'default' => [ 'url' => '#contato' ],
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $bg = ! empty( $s['background_image']['url'] ) ? $s['background_image']['url'] : '';
        $btn_url = ! empty( $s['button_url']['url'] ) ? $s['button_url']['url'] : '#contato';
        ?>
        <section class="sa-cta">
            <div class="sa-cta__bg">
                <?php if ( $bg ) : ?>
                    <img alt="" src="<?php echo esc_url( $bg ); ?>" />
                <?php endif; ?>
                <div class="sa-cta__overlay"></div>
            </div>
            <div class="sa-cta__content">
                <h2 class="sa-cta__title sa-animate"><?php echo esc_html( $s['title'] ); ?></h2>
                <a href="<?php echo esc_url( $btn_url ); ?>" class="sa-cta__btn sa-animate sa-animate--delay-1">
                    <?php echo esc_html( $s['button_text'] ); ?>
                </a>
            </div>
        </section>
        <?php
    }
}
