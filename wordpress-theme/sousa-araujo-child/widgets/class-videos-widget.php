<?php
/**
 * Widget: SA - Videos Educativos
 * Campos editaveis: titulo, repeater com imagem, titulo e descricao por video,
 * link "ver todos"
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_Videos_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-videos'; }
    public function get_title() { return 'SA - Videos'; }
    public function get_icon() { return 'eicon-play'; }
    public function get_categories() { return [ 'sousa-araujo' ]; }

    protected function register_controls() {
        $this->start_controls_section( 'content_section', [
            'label' => 'Conteudo',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control( 'title', [
            'label'   => 'Titulo da Secao',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Videos educativos: entenda antes de decidir',
        ]);

        $this->add_control( 'view_all_text', [
            'label'   => 'Texto "Ver Todos"',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Ver todos os videos',
        ]);

        $this->add_control( 'view_all_url', [
            'label'   => 'URL "Ver Todos"',
            'type'    => \Elementor\Controls_Manager::URL,
            'default' => [ 'url' => '#todos-videos' ],
        ]);

        $repeater = new \Elementor\Repeater();

        $repeater->add_control( 'image', [
            'label'   => 'Thumbnail',
            'type'    => \Elementor\Controls_Manager::MEDIA,
            'default' => [ 'url' => '' ],
        ]);

        $repeater->add_control( 'video_url', [
            'label'       => 'URL do Video (YouTube/Vimeo)',
            'type'        => \Elementor\Controls_Manager::URL,
            'default'     => [ 'url' => '' ],
            'description' => 'Cole a URL do YouTube ou Vimeo. Se vazio, o play nao tera acao.',
        ]);

        $repeater->add_control( 'title', [
            'label'   => 'Titulo',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'Titulo do Video',
        ]);

        $repeater->add_control( 'description', [
            'label'   => 'Descricao',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Descricao do video...',
        ]);

        $this->add_control( 'videos', [
            'label'   => 'Videos',
            'type'    => \Elementor\Controls_Manager::REPEATER,
            'fields'  => $repeater->get_controls(),
            'default' => [
                [ 'title' => 'O risco de nao homologar sua sentenca internacional', 'description' => 'Entenda quando uma decisao obtida no exterior precisa ser validada no Brasil.' ],
                [ 'title' => 'Seu imovel nao tem escritura? Veja o que voce pode fazer', 'description' => 'Imovel sem registro nao pode ser vendido ou financiado com seguranca.' ],
                [ 'title' => 'Conflitos familiares: quando um acordo evita um processo', 'description' => 'Divorcio, guarda e inventario nao precisam virar batalha judicial.' ],
            ],
            'title_field' => '{{{ title }}}',
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $all_url = ! empty( $s['view_all_url']['url'] ) ? $s['view_all_url']['url'] : '#todos-videos';
        ?>
        <section class="sa-videos">
            <div class="sa-container">
                <h2 class="sa-videos__title sa-animate"><?php echo esc_html( $s['title'] ); ?></h2>

                <div class="sa-videos__grid">
                    <?php foreach ( $s['videos'] as $i => $video ) :
                        $img = ! empty( $video['image']['url'] ) ? $video['image']['url'] : '';
                        $vid_url = ! empty( $video['video_url']['url'] ) ? $video['video_url']['url'] : '';
                    ?>
                    <div class="sa-videos__card sa-animate sa-animate--delay-<?php echo $i + 1; ?>">
                        <div class="sa-videos__thumb">
                            <?php if ( $img ) : ?>
                                <img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $video['title'] ); ?>" />
                            <?php endif; ?>
                            <div class="sa-videos__play">
                                <?php if ( $vid_url ) : ?>
                                    <a href="<?php echo esc_url( $vid_url ); ?>" target="_blank" rel="noopener" class="sa-videos__play-btn">
                                <?php else : ?>
                                    <div class="sa-videos__play-btn">
                                <?php endif; ?>
                                    <svg width="18" height="24" fill="none" viewBox="0 0 18 24">
                                        <path d="M18 12L0 24V0L18 12Z" fill="white"/>
                                    </svg>
                                <?php if ( $vid_url ) : ?>
                                    </a>
                                <?php else : ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                        <h3 class="sa-videos__card-title"><?php echo esc_html( $video['title'] ); ?></h3>
                        <p class="sa-videos__card-desc"><?php echo esc_html( $video['description'] ); ?></p>
                    </div>
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
