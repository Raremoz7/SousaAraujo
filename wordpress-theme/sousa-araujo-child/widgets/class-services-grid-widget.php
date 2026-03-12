<?php
/**
 * Widget: SA - Servicos (Carrossel)
 * Campos editaveis: repeater com titulo, descricao e imagem por card
 * Desktop: Swiper carousel | Mobile: scroll horizontal
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_Services_Grid_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-services-grid'; }
    public function get_title() { return 'SA - Servicos'; }
    public function get_icon() { return 'eicon-gallery-grid'; }
    public function get_categories() { return [ 'sousa-araujo' ]; }

    protected function register_controls() {
        $this->start_controls_section( 'content_section', [
            'label' => 'Servicos',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $repeater = new \Elementor\Repeater();

        $repeater->add_control( 'title', [
            'label'   => 'Titulo',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Nome do Servico',
        ]);

        $repeater->add_control( 'description', [
            'label'   => 'Descricao',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Descricao do servico...',
        ]);

        $repeater->add_control( 'image', [
            'label'   => 'Imagem de Fundo',
            'type'    => \Elementor\Controls_Manager::MEDIA,
            'default' => [ 'url' => '' ],
        ]);

        $this->add_control( 'services', [
            'label'   => 'Lista de Servicos',
            'type'    => \Elementor\Controls_Manager::REPEATER,
            'fields'  => $repeater->get_controls(),
            'default' => [
                [ 'title' => 'Pensao Alimenticia e Execucao', 'description' => 'Atuacao completa para fixar, revisar ou cobrar alimentos com base em provas e estrategia processual.' ],
                [ 'title' => 'Guarda e Plano de Convivencia', 'description' => 'Estruturacao de acordos e medidas para garantir previsibilidade, estabilidade e protecao dos vinculos familiares.' ],
                [ 'title' => 'Inventario e Sucessoes', 'description' => 'Planejamento e conducao do inventario com organizacao documental rigorosa e comunicacao clara em cada etapa.' ],
                [ 'title' => 'Uniao Estavel e Protecao Patrimonial', 'description' => 'Reconhecimento, dissolucao e partilha com orientacao clara sobre direitos, provas e riscos.' ],
                [ 'title' => 'Empresarial Consultivo para PMEs', 'description' => 'Suporte preventivo para empresarios com foco em contratos, notificacoes e rotinas juridicas essenciais.' ],
                [ 'title' => 'Registro de Marca no INPI', 'description' => 'Da busca de viabilidade ao protocolo e acompanhamento do processo, com orientacao para reduzir riscos.' ],
            ],
            'title_field' => '{{{ title }}}',
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $services = $s['services'];
        ?>
        <section class="sa-services">
            <h2 class="sa-sr-only">Servicos Juridicos Especializados</h2>

            <!-- Desktop: Swiper -->
            <div class="sa-services__desktop">
                <div class="swiper sa-services-swiper">
                    <div class="swiper-wrapper">
                        <?php foreach ( $services as $svc ) :
                            $img = ! empty( $svc['image']['url'] ) ? $svc['image']['url'] : '';
                        ?>
                        <div class="swiper-slide">
                            <div class="sa-services__card">
                                <?php if ( $img ) : ?>
                                    <img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $svc['title'] ); ?>" />
                                <?php endif; ?>
                                <div class="sa-services__card-overlay"></div>
                                <div class="sa-services__card-content">
                                    <h3 class="sa-services__card-title"><?php echo esc_html( $svc['title'] ); ?></h3>
                                    <p class="sa-services__card-desc"><?php echo esc_html( $svc['description'] ); ?></p>
                                </div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>

            <!-- Mobile: Scroll Horizontal -->
            <div class="sa-services__mobile">
                <?php foreach ( $services as $svc ) :
                    $img = ! empty( $svc['image']['url'] ) ? $svc['image']['url'] : '';
                ?>
                <div class="sa-services__mobile-card">
                    <?php if ( $img ) : ?>
                        <img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $svc['title'] ); ?>" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />
                    <?php endif; ?>
                    <div class="sa-services__card-overlay"></div>
                    <div class="sa-services__card-content" style="padding:24px;">
                        <h3 class="sa-services__card-title"><?php echo esc_html( $svc['title'] ); ?></h3>
                        <p class="sa-services__card-desc"><?php echo esc_html( $svc['description'] ); ?></p>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </section>
        <?php
    }
}
