<?php
/**
 * Widget: SA - Areas de Atuacao
 * Acordeao Dictum: desktop com paineis expandiveis, mobile com toggle
 * Campos editaveis: titulo da secao, repeater com titulo, subtitulo, descricao, imagem, numero
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_Practice_Areas_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-practice-areas'; }
    public function get_title() { return 'SA - Areas de Atuacao'; }
    public function get_icon() { return 'eicon-accordion'; }
    public function get_categories() { return [ 'sousa-araujo' ]; }

    protected function register_controls() {
        $this->start_controls_section( 'content_section', [
            'label' => 'Conteudo',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control( 'section_title', [
            'label'   => 'Titulo da Secao',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Areas de Atuacao',
        ]);

        $this->add_control( 'button_text', [
            'label'   => 'Texto do Botao',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Saiba Mais',
        ]);

        $this->add_control( 'button_url', [
            'label'   => 'URL do Botao',
            'type'    => \Elementor\Controls_Manager::URL,
            'default' => [ 'url' => '#contato' ],
        ]);

        $repeater = new \Elementor\Repeater();

        $repeater->add_control( 'number', [
            'label'   => 'Numero',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => '01',
        ]);

        $repeater->add_control( 'title', [
            'label'   => 'Titulo',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Area de Atuacao',
        ]);

        $repeater->add_control( 'subtitle', [
            'label'       => 'Subtitulo (opcional)',
            'type'        => \Elementor\Controls_Manager::TEXT,
            'default'     => '',
            'description' => 'Aparece na segunda linha do titulo expandido',
        ]);

        $repeater->add_control( 'collapsed_label', [
            'label'       => 'Label Recolhido',
            'type'        => \Elementor\Controls_Manager::TEXT,
            'default'     => '',
            'description' => 'Texto curto para o estado recolhido (vertical). Se vazio, usa o titulo.',
        ]);

        $repeater->add_control( 'description', [
            'label'   => 'Descricao',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Descricao da area de atuacao...',
        ]);

        $repeater->add_control( 'image', [
            'label'   => 'Imagem',
            'type'    => \Elementor\Controls_Manager::MEDIA,
            'default' => [ 'url' => '' ],
        ]);

        $this->add_control( 'areas', [
            'label'   => 'Areas',
            'type'    => \Elementor\Controls_Manager::REPEATER,
            'fields'  => $repeater->get_controls(),
            'default' => [
                [ 'number' => '01', 'title' => 'Homologacao de', 'subtitle' => 'Sentenca Estrangeira', 'collapsed_label' => 'Homologacao', 'description' => 'Validamos no STJ decisoes judiciais obtidas no exterior, como divorcios e guardas.' ],
                [ 'number' => '02', 'title' => 'Direito de Familia e', 'subtitle' => 'Sucessoes', 'collapsed_label' => 'Direito Familia', 'description' => 'Divorcio consensual ou litigioso, uniao estavel, partilha e protecao patrimonial.' ],
                [ 'number' => '03', 'title' => 'Imoveis e Usucapiao', 'subtitle' => '', 'collapsed_label' => 'Imoveis Usucapiao', 'description' => 'Regularizacao de imoveis, usucapiao extrajudicial e judicial, escritura e registro.' ],
                [ 'number' => '04', 'title' => 'Empresarial', 'subtitle' => '', 'collapsed_label' => 'Empresarial', 'description' => 'Consultoria preventiva para PMEs com foco em contratos e rotinas juridicas.' ],
            ],
            'title_field' => '{{{ number }}} - {{{ title }}}',
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $btn_url = ! empty( $s['button_url']['url'] ) ? $s['button_url']['url'] : '#contato';
        $areas = $s['areas'];
        $total = count( $areas );

        // SVG da seta
        $arrow_svg = '<svg viewBox="0 0 51.45 51.42" fill="none" style="width:100%;height:100%;display:block;"><path d="M0.994 1.163L50.454 50.409" stroke="white" stroke-width="2"/><path d="M0.994 1.163H50.454" stroke="white" stroke-width="2"/><path d="M50.453 50.409V0.949" stroke="white" stroke-width="2"/></svg>';
        ?>
        <section id="areas" class="sa-practice">
            <!-- Header -->
            <div class="sa-practice__header">
                <h2 class="sa-practice__title"><?php echo esc_html( $s['section_title'] ); ?></h2>
            </div>

            <!-- Desktop Accordion -->
            <div class="sa-practice__desktop">
                <?php foreach ( $areas as $i => $area ) :
                    $img = ! empty( $area['image']['url'] ) ? $area['image']['url'] : '';
                    $is_first = $i === 0 ? ' is-expanded' : '';
                    $is_last = $i === $total - 1;
                    $collapsed_label = ! empty( $area['collapsed_label'] ) ? $area['collapsed_label'] : $area['title'];
                ?>
                <div class="sa-practice__panel<?php echo $is_first; ?>"<?php if ( $is_last ) echo ' style="border-right:none;"'; ?>>
                    <!-- Collapsed -->
                    <div class="sa-practice__collapsed">
                        <div class="sa-practice__collapsed-arrow"<?php if ( $i === 0 ) echo ' style="transform:translateX(-50%) rotate(180deg);"'; ?>>
                            <?php echo $arrow_svg; ?>
                        </div>
                        <div class="sa-practice__collapsed-title">
                            <p><?php echo esc_html( $collapsed_label ); ?></p>
                        </div>
                        <div class="sa-practice__collapsed-number">
                            <p><?php echo esc_html( $area['number'] ); ?></p>
                        </div>
                    </div>

                    <!-- Expanded -->
                    <div class="sa-practice__expanded">
                        <div style="position:relative;height:100%;">
                            <?php if ( $img ) : ?>
                            <div class="sa-practice__expanded-img">
                                <img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $area['title'] ); ?>" />
                            </div>
                            <?php endif; ?>
                            <div class="sa-practice__expanded-content">
                                <h3>
                                    <?php echo esc_html( $area['title'] ); ?>
                                    <?php if ( ! empty( $area['subtitle'] ) ) : ?>
                                        <br /><?php echo esc_html( $area['subtitle'] ); ?>
                                    <?php endif; ?>
                                </h3>
                                <p><?php echo esc_html( $area['description'] ); ?></p>
                                <a href="<?php echo esc_url( $btn_url ); ?>" class="sa-practice__btn">
                                    <?php echo esc_html( $s['button_text'] ); ?>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>

            <!-- Mobile Accordion -->
            <div class="sa-practice__mobile">
                <?php foreach ( $areas as $i => $area ) :
                    $img = ! empty( $area['image']['url'] ) ? $area['image']['url'] : '';
                    $is_first = $i === 0 ? ' is-expanded' : '';
                ?>
                <div class="sa-practice__mobile-item<?php echo $is_first; ?>">
                    <div class="sa-practice__mobile-header">
                        <h3><?php echo esc_html( $area['title'] ); ?></h3>
                        <div class="sa-practice__mobile-arrow">
                            <?php echo $arrow_svg; ?>
                        </div>
                    </div>
                    <div class="sa-practice__mobile-body">
                        <div class="sa-practice__mobile-body-inner">
                            <h4>
                                <?php echo esc_html( $area['title'] ); ?>
                                <?php if ( ! empty( $area['subtitle'] ) ) : ?>
                                    <br /><?php echo esc_html( $area['subtitle'] ); ?>
                                <?php endif; ?>
                            </h4>
                            <p><?php echo esc_html( $area['description'] ); ?></p>
                            <?php if ( $img ) : ?>
                                <img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $area['title'] ); ?>" />
                            <?php endif; ?>
                            <a href="<?php echo esc_url( $btn_url ); ?>" class="sa-practice__btn">
                                <?php echo esc_html( $s['button_text'] ); ?>
                            </a>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </section>
        <?php
    }
}
