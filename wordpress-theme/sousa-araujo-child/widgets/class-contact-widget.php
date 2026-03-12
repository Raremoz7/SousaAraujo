<?php
/**
 * Widget: SA - Contato
 * Campos editaveis: imagem de fundo, titulo, endereco, telefone, placeholder dos inputs
 *
 * IMPORTANTE: O formulario deste widget e apenas visual (HTML puro).
 * Para funcionar de verdade, voce deve:
 * 1. Instalar um plugin de formulario (WPForms, Contact Form 7, ou Forminator)
 * 2. Substituir o HTML do <form> pelo shortcode do plugin
 * 3. Estilizar o plugin para manter o visual escuro/transparente
 *
 * Alternativa: usar o Elementor Pro Form Widget no lugar deste widget
 * e aplicar as classes CSS sa-contact__* para manter o visual.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_Contact_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-contact'; }
    public function get_title() { return 'SA - Contato'; }
    public function get_icon() { return 'eicon-envelope'; }
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

        $this->add_control( 'title_line1', [
            'label'   => 'Titulo Linha 1',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Fale Conosco',
        ]);

        $this->add_control( 'title_line2', [
            'label'   => 'Titulo Linha 2',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Agende sua Consulta',
        ]);

        $this->add_control( 'address', [
            'label'   => 'Endereco',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Edificio Varig - Asa Norte, Brasilia - DF, 70714-020',
        ]);

        $this->add_control( 'phone', [
            'label'   => 'Telefone',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => '+55 61 99599-1322',
        ]);

        $this->add_control( 'button_text', [
            'label'   => 'Texto do Botao',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Enviar Mensagem',
        ]);

        $this->add_control( 'form_shortcode', [
            'label'       => 'Shortcode do Formulario (opcional)',
            'type'        => \Elementor\Controls_Manager::TEXTAREA,
            'default'     => '',
            'description' => 'Se preenchido, substitui o formulario visual pelo shortcode (ex: [wpforms id="123"]). Deixe vazio para usar o formulario padrao.',
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $bg = ! empty( $s['background_image']['url'] ) ? $s['background_image']['url'] : '';
        $phone_clean = preg_replace( '/[^0-9+]/', '', $s['phone'] );
        ?>
        <section id="contato" class="sa-contact">
            <div class="sa-contact__bg">
                <?php if ( $bg ) : ?>
                    <img alt="" src="<?php echo esc_url( $bg ); ?>" />
                <?php endif; ?>
                <div class="sa-contact__bg-overlay"></div>
            </div>

            <div class="sa-contact__form-wrapper">
                <div class="sa-contact__form-inner">
                    <h2 class="sa-contact__title">
                        <?php echo esc_html( $s['title_line1'] ); ?>
                        <br />
                        <?php echo esc_html( $s['title_line2'] ); ?>
                    </h2>

                    <div class="sa-contact__info">
                        <div class="sa-contact__info-item">
                            <svg width="12" height="17" fill="none" viewBox="0 0 12 17">
                                <path d="M6 0C2.69 0 0 2.69 0 6C0 10.5 6 17 6 17C6 17 12 10.5 12 6C12 2.69 9.31 0 6 0ZM6 8.15C4.81 8.15 3.85 7.19 3.85 6C3.85 4.81 4.81 3.85 6 3.85C7.19 3.85 8.15 4.81 8.15 6C8.15 7.19 7.19 8.15 6 8.15Z" fill="#a57255"/>
                            </svg>
                            <span><?php echo esc_html( $s['address'] ); ?></span>
                        </div>
                        <div class="sa-contact__info-item">
                            <svg width="15" height="15" fill="none" viewBox="0 0 15 15">
                                <path d="M13.5 15C11.85 15 10.238 14.629 8.663 13.887C7.088 13.145 5.688 12.138 4.463 10.863C3.238 9.588 2.275 8.163 1.575 6.588C0.875 5.013 0.5 3.375 0.45 1.675C0.45 1.425 0.538 1.213 0.713 1.038C0.888 0.862 1.1 0.775 1.35 0.775H4.275C4.475 0.775 4.65 0.85 4.8 1C4.95 1.15 5.038 1.325 5.063 1.525L5.475 4.025C5.5 4.225 5.494 4.406 5.456 4.569C5.419 4.731 5.35 4.875 5.25 5L3.525 6.775C4.175 7.925 4.975 8.975 5.925 9.925C6.875 10.875 7.925 11.675 9.075 12.325L10.8 10.55C10.95 10.4 11.131 10.294 11.344 10.231C11.556 10.169 11.763 10.15 11.963 10.175L14.35 10.625C14.55 10.675 14.719 10.775 14.856 10.925C14.994 11.075 15.063 11.25 15.063 11.45V14.3C15.063 14.55 14.975 14.762 14.8 14.938C14.625 15.112 14.413 15.2 14.163 15.2L13.5 15Z" fill="#a57255"/>
                            </svg>
                            <a href="tel:<?php echo esc_attr( $phone_clean ); ?>"><?php echo esc_html( $s['phone'] ); ?></a>
                        </div>
                    </div>

                    <?php if ( ! empty( $s['form_shortcode'] ) ) : ?>
                        <?php echo do_shortcode( $s['form_shortcode'] ); ?>
                    <?php else : ?>
                        <form class="sa-contact__form" method="post">
                            <div class="sa-contact__form-row">
                                <div class="sa-contact__input-wrap">
                                    <input type="text" name="name" placeholder="Nome" required class="sa-contact__input" />
                                </div>
                                <div class="sa-contact__input-wrap">
                                    <input type="email" name="email" placeholder="E-mail" required class="sa-contact__input" />
                                </div>
                            </div>
                            <div class="sa-contact__textarea-wrap">
                                <textarea name="message" placeholder="Mensagem" required class="sa-contact__textarea"></textarea>
                            </div>
                            <button type="submit" class="sa-contact__submit">
                                <?php echo esc_html( $s['button_text'] ); ?>
                            </button>
                        </form>
                    <?php endif; ?>
                </div>
            </div>
        </section>
        <?php
    }
}
