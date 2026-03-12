<?php
/**
 * Widget: SA - Estatisticas
 * Campos editaveis: repeater com numero e label
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_Stats_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-stats'; }
    public function get_title() { return 'SA - Estatisticas'; }
    public function get_icon() { return 'eicon-counter'; }
    public function get_categories() { return [ 'sousa-araujo' ]; }

    protected function register_controls() {
        $this->start_controls_section( 'content_section', [
            'label' => 'Estatisticas',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $repeater = new \Elementor\Repeater();

        $repeater->add_control( 'number', [
            'label'   => 'Numero',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => '14+',
        ]);

        $repeater->add_control( 'label', [
            'label'   => 'Descricao',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Anos de Experiencia',
        ]);

        $this->add_control( 'stats', [
            'label'   => 'Numeros',
            'type'    => \Elementor\Controls_Manager::REPEATER,
            'fields'  => $repeater->get_controls(),
            'default' => [
                [ 'number' => '14+', 'label' => 'Anos de Experiencia' ],
                [ 'number' => '4', 'label' => 'Areas de Atuacao Especializada' ],
                [ 'number' => '30+', 'label' => 'Paises Atendidos' ],
                [ 'number' => '100%', 'label' => 'Clientes Satisfeitos' ],
            ],
            'title_field' => '{{{ number }}} - {{{ label }}}',
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        ?>
        <section class="sa-stats">
            <div class="sa-container">
                <h2 class="sa-sr-only">Numeros e Resultados do Escritorio</h2>
                <div class="sa-stats__grid">
                    <?php foreach ( $s['stats'] as $i => $stat ) : ?>
                    <div class="sa-stats__item sa-animate sa-animate--delay-<?php echo $i + 1; ?>">
                        <div class="sa-stats__number"><?php echo esc_html( $stat['number'] ); ?></div>
                        <div class="sa-stats__label"><?php echo esc_html( $stat['label'] ); ?></div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
        <?php
    }
}
