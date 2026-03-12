<?php
/**
 * Widget: SA - Footer
 * Campos editaveis: logo, descricao, email, telefone, endereco, links sociais,
 * links de navegacao, copyright
 */
if ( ! defined( 'ABSPATH' ) ) exit;

class SA_Footer_Widget extends \Elementor\Widget_Base {

    public function get_name() { return 'sa-footer'; }
    public function get_title() { return 'SA - Footer'; }
    public function get_icon() { return 'eicon-footer'; }
    public function get_categories() { return [ 'sousa-araujo' ]; }

    protected function register_controls() {
        /* ─── Conteudo Principal ─── */
        $this->start_controls_section( 'main_section', [
            'label' => 'Conteudo Principal',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control( 'logo', [
            'label'   => 'Logo',
            'type'    => \Elementor\Controls_Manager::MEDIA,
            'default' => [ 'url' => '' ],
            'description' => 'Logo branca do escritorio (recomendado SVG ou PNG transparente, ~163x31px)',
        ]);

        $this->add_control( 'description', [
            'label'   => 'Descricao',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Escritorio de advocacia especializada em Brasilia, fundado pela Dra. Lidiane Sousa Araujo, OAB/DF 34.876. Estrutura presencial no Distrito Federal e atendimento online para todo o Brasil e brasileiros no exterior.',
        ]);

        $this->end_controls_section();

        /* ─── Contato ─── */
        $this->start_controls_section( 'contact_section', [
            'label' => 'Contato',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control( 'email', [
            'label'   => 'E-mail',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => 'contato@sousaaraujo.adv.br',
        ]);

        $this->add_control( 'phone', [
            'label'   => 'Telefone',
            'type'    => \Elementor\Controls_Manager::TEXT,
            'default' => '+55 61 99599-1322',
        ]);

        $this->add_control( 'address', [
            'label'   => 'Endereco Completo',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Edificio Varig - Setor Comercial Norte, quadra 04, bloco B, sala 702, 7 andar Petala D - Asa Norte, Brasilia - DF, 70714-020',
        ]);

        $this->end_controls_section();

        /* ─── Redes Sociais ─── */
        $this->start_controls_section( 'social_section', [
            'label' => 'Redes Sociais',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $socials = [ 'instagram', 'facebook', 'tiktok', 'linkedin', 'youtube' ];
        foreach ( $socials as $social ) {
            $this->add_control( $social . '_url', [
                'label'   => ucfirst( $social ),
                'type'    => \Elementor\Controls_Manager::URL,
                'default' => [ 'url' => '#' ],
            ]);
        }

        $this->end_controls_section();

        /* ─── Copyright ─── */
        $this->start_controls_section( 'legal_section', [
            'label' => 'Texto Legal',
            'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
        ]);

        $this->add_control( 'copyright', [
            'label'   => 'Copyright / Texto Legal',
            'type'    => \Elementor\Controls_Manager::TEXTAREA,
            'default' => 'Termos de Uso · Politica de Privacidade © 2026 SA | Sousa Araujo Advocacia · Todos os direitos reservados Comunicacao em conformidade com o Provimento OAB 205/2021 – Desenvolvido por Mix7',
        ]);

        $this->end_controls_section();
    }

    protected function render() {
        $s = $this->get_settings_for_display();
        $logo = ! empty( $s['logo']['url'] ) ? $s['logo']['url'] : '';
        $phone_clean = preg_replace( '/[^0-9+]/', '', $s['phone'] );

        $socials = [
            'instagram' => [ 'label' => 'Instagram', 'icon' => '<svg width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="0.5" y="0.5" width="15.7" height="15.7" rx="4" stroke="currentColor"/><circle cx="8.35" cy="8.35" r="4" stroke="currentColor"/><circle cx="13" cy="3.7" r="1.2" fill="currentColor"/></svg>' ],
            'facebook'  => [ 'label' => 'Facebook', 'icon' => '<svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M6.5 10.5H8.5L9.5 6.5H6.5V4.5C6.5 3.47 6.5 2.5 8.5 2.5H9.5V-0.7C9.17-0.74 7.97-0.85 6.69-0.85C4.03-0.85 2.5 0.53 2.5 3.5V6.5H0V10.5H2.5V18H6.5V10.5Z" fill="currentColor"/></svg>' ],
            'tiktok'    => [ 'label' => 'TikTok', 'icon' => '<svg width="16" height="19" viewBox="0 0 16 19" fill="none"><path d="M11.5 0C11.5 2.76 13.74 5 16.5 5V8C14.67 8 13 7.33 11.5 6.33V12.5C11.5 16.09 8.59 19 5 19C1.41 19 -1.5 16.09-1.5 12.5C-1.5 8.91 1.41 6 5 6V9C3.07 9 1.5 10.57 1.5 12.5C1.5 14.43 3.07 16 5 16C6.93 16 8.5 14.43 8.5 12.5V0H11.5Z" fill="currentColor"/></svg>' ],
            'linkedin'  => [ 'label' => 'LinkedIn', 'icon' => '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M0 1.78C0 0.8 0.8 0 1.78 0C2.77 0 3.57 0.8 3.57 1.78C3.57 2.77 2.77 3.57 1.78 3.57C0.8 3.57 0 2.77 0 1.78ZM0.24 5.24H3.33V15.72H0.24V5.24ZM5.64 5.24H8.6V6.6C9.02 5.83 10.04 5 11.56 5C14.31 5 14.86 6.8 14.86 9.15V15.72H11.77V9.76C11.77 8.31 11.74 6.47 9.8 6.47C7.83 6.47 7.53 8.04 7.53 9.66V15.72H5.64V5.24Z" fill="currentColor"/></svg>' ],
            'youtube'   => [ 'label' => 'YouTube', 'icon' => '<svg width="25" height="14" viewBox="0 0 25 14" fill="none"><path d="M24.2 2.2C23.9 1 23 0.1 21.8-0.2C19.9-0.7 12.4-0.7 12.4-0.7S4.9-0.7 3-0.2C1.8 0.1 0.9 1 0.6 2.2C0.1 4.1 0.1 7 0.1 7S0.1 9.9 0.6 11.8C0.9 13 1.8 13.9 3 14.2C4.9 14.7 12.4 14.7 12.4 14.7S19.9 14.7 21.8 14.2C23 13.9 23.9 13 24.2 11.8C24.7 9.9 24.7 7 24.7 7S24.7 4.1 24.2 2.2ZM9.9 10V4L16.4 7L9.9 10Z" fill="currentColor"/></svg>' ],
        ];
        ?>
        <footer class="sa-footer">
            <!-- Row 1: Logo + Description -->
            <div class="sa-container sa-footer__row1">
                <div class="sa-footer__logo-grid">
                    <div>
                        <?php if ( $logo ) : ?>
                            <img src="<?php echo esc_url( $logo ); ?>" alt="Sousa Araujo Advocacia" style="width:163px;height:31px;object-fit:contain;" />
                        <?php else : ?>
                            <span style="font-family:'Marcellus',serif;font-size:18px;color:#fff;">SA | Sousa Araujo</span>
                        <?php endif; ?>
                    </div>
                    <p class="sa-footer__desc"><?php echo esc_html( $s['description'] ); ?></p>
                </div>
            </div>

            <!-- Row 2: Info Columns -->
            <div class="sa-container sa-footer__row2">
                <div class="sa-footer__info-grid">
                    <!-- Newsletter -->
                    <div style="display:flex;flex-direction:column;justify-content:flex-end;height:100%;">
                        <div class="sa-footer__newsletter">
                            <span class="sa-footer__newsletter-label">Receba nossos conteudos</span>
                            <a href="#newsletter" class="sa-link" style="margin-left:auto;white-space:nowrap;">
                                Inscrever-se
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M0.36 9.6L9.49 0.5M0.41 0.51H9.48M9.5 9.39V0.5" stroke="currentColor" stroke-width="1.02"/></svg>
                            </a>
                        </div>
                    </div>

                    <!-- Iniciar uma Conversa -->
                    <div>
                        <h3 class="sa-footer__col-title">Iniciar uma Conversa</h3>
                        <a href="mailto:<?php echo esc_attr( $s['email'] ); ?>" class="sa-footer__link">
                            <svg width="18" height="14" fill="none" viewBox="0 0 19 14"><path d="M1.5 0C0.672 0 0 0.672 0 1.5V12.5C0 13.328 0.672 14 1.5 14H17.5C18.328 14 19 13.328 19 12.5V1.5C19 0.672 18.328 0 17.5 0H1.5ZM3.09 1.5H15.91L9.5 6.26L3.09 1.5ZM1.5 2.34L9.18 8.04C9.36 8.17 9.64 8.17 9.82 8.04L17.5 2.34V12.5H1.5V2.34Z" fill="currentColor"/></svg>
                            <span><?php echo esc_html( $s['email'] ); ?></span>
                        </a>
                        <a href="tel:<?php echo esc_attr( $phone_clean ); ?>" class="sa-footer__link">
                            <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M14 15.5C12.35 15.5 10.738 15.129 9.163 14.387C7.588 13.645 6.188 12.638 4.963 11.363C3.738 10.088 2.775 8.663 2.075 7.088C1.375 5.513 1 3.875 0.95 2.175C0.95 1.925 1.038 1.713 1.213 1.538C1.388 1.362 1.6 1.275 1.85 1.275H4.775C4.975 1.275 5.15 1.35 5.3 1.5C5.45 1.65 5.538 1.825 5.563 2.025L5.975 4.525C6 4.725 5.994 4.906 5.956 5.069C5.919 5.231 5.85 5.375 5.75 5.5L4.025 7.275C4.675 8.425 5.475 9.475 6.425 10.425C7.375 11.375 8.425 12.175 9.575 12.825L11.3 11.05C11.45 10.9 11.631 10.794 11.844 10.731C12.056 10.669 12.263 10.65 12.463 10.675L14.85 11.125C15.05 11.175 15.219 11.275 15.356 11.425C15.494 11.575 15.563 11.75 15.563 11.95V14.8C15.563 15.05 15.475 15.262 15.3 15.438C15.125 15.612 14.913 15.7 14.663 15.7L14 15.5Z" fill="currentColor"/></svg>
                            <span><?php echo esc_html( $s['phone'] ); ?></span>
                        </a>
                    </div>

                    <!-- Nossa Localizacao -->
                    <div>
                        <h3 class="sa-footer__col-title">Nossa Localizacao</h3>
                        <div style="display:flex;align-items:flex-start;gap:10px;">
                            <svg width="12" height="17" fill="none" viewBox="0 0 12 17" style="flex-shrink:0;margin-top:3px;">
                                <path d="M6 0C2.69 0 0 2.69 0 6C0 10.5 6 17 6 17C6 17 12 10.5 12 6C12 2.69 9.31 0 6 0ZM6 8.15C4.81 8.15 3.85 7.19 3.85 6C3.85 4.81 4.81 3.85 6 3.85C7.19 3.85 8.15 4.81 8.15 6C8.15 7.19 7.19 8.15 6 8.15Z" fill="white"/>
                            </svg>
                            <p style="font-family:'Noto Sans',sans-serif;font-size:14px;line-height:22px;letter-spacing:-0.225px;color:#fff;">
                                <?php echo esc_html( $s['address'] ); ?>
                            </p>
                        </div>
                    </div>

                    <!-- Redes Sociais -->
                    <div>
                        <h3 class="sa-footer__col-title">Redes Sociais</h3>
                        <div class="sa-footer__social">
                            <?php foreach ( $socials as $key => $social ) :
                                $url = ! empty( $s[ $key . '_url' ]['url'] ) ? $s[ $key . '_url' ]['url'] : '#';
                            ?>
                            <a href="<?php echo esc_url( $url ); ?>" aria-label="<?php echo esc_attr( $social['label'] ); ?>" target="_blank" rel="noopener">
                                <?php echo $social['icon']; ?>
                            </a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Divider -->
            <div class="sa-container"><div class="sa-footer__divider"></div></div>

            <!-- Row 3: Navigation -->
            <div class="sa-container">
                <div class="sa-footer__nav">
                    <nav class="sa-footer__nav-links">
                        <?php
                        $nav_items = [
                            [ 'Home', '#home' ],
                            [ 'Sobre', '#quem-somos' ],
                            [ 'Areas de Atuacao', '#areas' ],
                            [ 'Blog', '#artigos' ],
                            [ 'FAQ', '#faq' ],
                            [ 'Contato', '#contato' ],
                        ];
                        foreach ( $nav_items as $item ) : ?>
                        <a href="<?php echo esc_attr( $item[1] ); ?>" class="sa-footer__nav-link">
                            <?php echo esc_html( $item[0] ); ?>
                        </a>
                        <?php endforeach; ?>
                    </nav>
                    <a href="#contato" class="sa-link" style="font-size:14px;">
                        Agendar Atendimento
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M0.36 9.6L9.49 0.5M0.41 0.51H9.48M9.5 9.39V0.5" stroke="currentColor" stroke-width="1.02"/></svg>
                    </a>
                </div>
            </div>

            <!-- Divider -->
            <div class="sa-container"><div class="sa-footer__divider sa-footer__divider--light"></div></div>

            <!-- Row 4: Copyright -->
            <div class="sa-container">
                <p class="sa-footer__copyright"><?php echo esc_html( $s['copyright'] ); ?></p>
            </div>
        </footer>
        <?php
    }
}
