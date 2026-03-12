<?php
/**
 * Widget: SA - Diferenciais
 * Campos editaveis: titulo, subtitulo, repeater de diferenciais (titulo, descricao, link)
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_Differentials_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-differentials'; }
    public function get_title() { return 'SA - Diferenciais'; }
    public function get_icon() { return 'eicon-bullet-list'; }
    public function get_categories() { return [ 'sousa-araujo' ]; }

    protected function register_controls() {
        $this->start_controls_section( 'content_section', [
            'label' => 'Conteudo',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control( 'title', [
            'label'   => 'Titulo',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'O que torna o nosso trabalho diferente',
        ]);

        $this->add_control( 'subtitle', [
            'label'   => 'Subtitulo',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Mais do que resolver casos, construimos estrategias. Cada detalhe do nosso processo foi pensado para entregar clareza, agilidade e tranquilidade para o cliente.',
        ]);

        $repeater = new \Elementor\Repeater();

        $repeater->add_control( 'title', [
            'label'   => 'Titulo',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Diferencial',
        ]);

        $repeater->add_control( 'description', [
            'label'   => 'Descricao',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Descricao do diferencial...',
        ]);

        $repeater->add_control( 'link_text', [
            'label'   => 'Texto do Link',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Saiba Mais',
        ]);

        $repeater->add_control( 'link_url', [
            'label'   => 'URL do Link',
            'type'    => \Elementor\Controls_Manager::URL,
            'default' => [ 'url' => '#contato' ],
        ]);

        $this->add_control( 'items', [
            'label'   => 'Diferenciais',
            'type'    => \Elementor\Controls_Manager::REPEATER,
            'fields'  => $repeater->get_controls(),
            'default' => [
                [ 'title' => 'Estrategia antes da acao', 'description' => 'Avaliamos cada caso com rigor antes de qualquer protocolo.', 'link_text' => 'Conheca o Metodo' ],
                [ 'title' => 'Atendimento online estruturado', 'description' => 'Assinatura digital, reunioes remotas seguras e envio protegido de documentos.', 'link_text' => 'Saiba como funciona' ],
                [ 'title' => 'Transparencia em cada etapa', 'description' => 'Voce recebe relatorios periodicos e sabe exatamente em que fase esta o seu processo.', 'link_text' => 'Veja como acompanhamos' ],
                [ 'title' => 'Sigilo e discricao absolutos', 'description' => 'Seus dados, documentos e informacoes sao tratados com o mais alto nivel de confidencialidade.', 'link_text' => 'Fale Conosco' ],
            ],
            'title_field' => '{{{ title }}}',
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        ?>
        <section class="sa-differentials">
            <div class="sa-container">
                <div class="sa-differentials__inner">
                    <div class="sa-differentials__grid">
                        <!-- Coluna Esquerda -->
                        <div class="sa-animate">
                            <h2 class="sa-differentials__title"><?php echo esc_html( $s['title'] ); ?></h2>
                            <p class="sa-differentials__subtitle"><?php echo esc_html( $s['subtitle'] ); ?></p>
                        </div>

                        <!-- Coluna Direita -->
                        <div>
                            <?php foreach ( $s['items'] as $i => $item ) :
                                $link_url = ! empty( $item['link_url']['url'] ) ? $item['link_url']['url'] : '#contato';
                            ?>
                            <div class="sa-differentials__item sa-animate sa-animate--delay-<?php echo $i + 1; ?>">
                                <h3 class="sa-differentials__item-title"><?php echo esc_html( $item['title'] ); ?></h3>
                                <p class="sa-differentials__item-desc"><?php echo esc_html( $item['description'] ); ?></p>
                                <a href="<?php echo esc_url( $link_url ); ?>" class="sa-differentials__item-link">
                                    <?php echo esc_html( $item['link_text'] ); ?>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php
    }
}
