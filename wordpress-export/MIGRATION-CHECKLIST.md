# Checklist de Migração WordPress
## Sousa Araújo Advocacia

Use este checklist para garantir uma migração completa e sem problemas.

## 📋 Pré-Migração

### Ambiente WordPress
- [ ] WordPress 6.0+ instalado
- [ ] PHP 8.0+ configurado
- [ ] MySQL/MariaDB configurado
- [ ] HTTPS ativo (certificado SSL)
- [ ] Backup completo do site existente (se houver)

### Plugins Necessários
- [ ] WP React Plugin instalado e ativado
- [ ] Advanced Custom Fields (ACF) PRO (opcional)
- [ ] Contact Form 7 ou similar (backup para formulários)
- [ ] Yoast SEO ou similar
- [ ] WP Super Cache ou similar
- [ ] Wordfence Security ou similar

### Tema WordPress
- [ ] Tema base instalado
- [ ] Pasta `react-components` criada no tema
- [ ] Permissões de escrita configuradas

## 🚀 Processo de Migração

### 1. Preparação do Código React
- [ ] Executar `npm run build` no projeto React
- [ ] Verificar se o build foi gerado em `/dist`
- [ ] Testar build localmente antes da migração

### 2. Copiar Arquivos
- [ ] Copiar componentes React para `/wp-content/themes/seu-tema/react-components/components/`
- [ ] Copiar arquivos de dados para `/wp-content/themes/seu-tema/react-components/data/`
- [ ] Copiar estilos para `/wp-content/themes/seu-tema/react-components/styles/`
- [ ] Copiar build para `/wp-content/themes/seu-tema/react-components/build/`

### 3. Configurar functions.php
- [ ] Adicionar código do arquivo `wordpress-export/functions.php`
- [ ] Ajustar caminhos se necessário
- [ ] Testar se não há erros de syntax

### 4. Migrar Imagens

#### Download das Imagens do Figma
- [ ] Hero background (1bde68b0...)
- [ ] Foto Dra. Lidiane (4fee0ccd...)
- [ ] Imagem diferenciais (6daa36a6...)
- [ ] Foto equipe (b1f5c9d0...)
- [ ] Galeria - 3 imagens (8f998da6..., a6246b35..., a417229c...)
- [ ] Artigos - 3 imagens (3e71c6d6..., 39e61b65..., bb375343...)

#### Upload para WordPress
- [ ] Fazer upload de todas as imagens para Biblioteca de Mídia
- [ ] Adicionar textos alternativos (alt text)
- [ ] Adicionar títulos descritivos
- [ ] Organizar em pastas/categorias (se usar plugin de organização)
- [ ] Anotar IDs das mídias para mapeamento

#### Atualizar Mapeamento
- [ ] Atualizar `data/image-mapping.json` com IDs do WordPress
- [ ] Criar helper function para converter figma:asset para URL do WP

### 5. Registrar Componentes e Blocos
- [ ] Verificar registro de componentes React no WP React Plugin
- [ ] Verificar registro de blocos Gutenberg
- [ ] Testar inserção de blocos no editor

### 6. Configurar Custom Post Types
- [ ] Criar Custom Post Type "Artigos Jurídicos"
- [ ] Adicionar campos customizados (data, categoria, etc)
- [ ] Importar artigos de exemplo
- [ ] Testar exibição dos artigos

### 7. Configurar REST API
- [ ] Testar endpoint `/wp-json/sousa-araujo/v1/content`
- [ ] Testar endpoint `/wp-json/sousa-araujo/v1/contact`
- [ ] Testar endpoint `/wp-json/sousa-araujo/v1/articles`
- [ ] Configurar CORS se necessário
- [ ] Adicionar autenticação/validação onde necessário

### 8. Configurar Formulário de Contato
- [ ] Testar envio de formulário
- [ ] Configurar e-mail de destino
- [ ] Configurar e-mail de confirmação automática
- [ ] Testar proteção contra spam (reCAPTCHA)
- [ ] Configurar notificações

### 9. Configurar Menus
- [ ] Criar menu principal com links:
  - [ ] Home
  - [ ] Sobre
  - [ ] Áreas de Atuação
  - [ ] Blog
  - [ ] Contato
- [ ] Criar menu rodapé
- [ ] Atribuir menus às localizações corretas

### 10. Estilos e Fontes
- [ ] Verificar carregamento de fonts.css
- [ ] Verificar carregamento de theme.css
- [ ] Testar fontes customizadas (Marcellus, Roboto, Lora, Noto Sans)
- [ ] Verificar cores (#161312, #452b1e, #a57255)
- [ ] Ajustar estilos conflitantes do tema WordPress

## 🎨 Personalização WordPress

### Customizer
- [ ] Configurar logo do site
- [ ] Configurar cores do tema
- [ ] Configurar tipografia
- [ ] Configurar header
- [ ] Configurar footer

### Widgets
- [ ] Configurar widget Navbar no header
- [ ] Configurar widget Footer
- [ ] Adicionar widgets adicionais se necessário

### Páginas
- [ ] Criar página "Home" e definir como página inicial
- [ ] Criar página "Sobre"
- [ ] Criar página "Contato"
- [ ] Criar página "Blog" e definir como página de posts
- [ ] Configurar páginas no Reading Settings

## 🧪 Testes

### Funcionalidade
- [ ] Testar navegação entre seções
- [ ] Testar todos os links
- [ ] Testar formulário de contato
- [ ] Testar carregamento de imagens
- [ ] Testar artigos do blog
- [ ] Testar pesquisa (se ativa)

### Responsividade
- [ ] Testar em mobile (320px, 375px, 414px)
- [ ] Testar em tablet (768px, 1024px)
- [ ] Testar em desktop (1366px, 1920px)
- [ ] Testar orientação portrait/landscape
- [ ] Verificar menu mobile

### Performance
- [ ] Testar velocidade de carregamento (Google PageSpeed)
- [ ] Otimizar imagens (compressão, lazy loading)
- [ ] Minificar CSS/JS
- [ ] Configurar cache
- [ ] Testar Core Web Vitals

### SEO
- [ ] Configurar meta titles
- [ ] Configurar meta descriptions
- [ ] Configurar Open Graph tags
- [ ] Configurar Twitter Cards
- [ ] Criar sitemap.xml
- [ ] Configurar robots.txt
- [ ] Testar rich snippets

### Compatibilidade
- [ ] Testar no Chrome
- [ ] Testar no Firefox
- [ ] Testar no Safari
- [ ] Testar no Edge
- [ ] Testar em dispositivos iOS
- [ ] Testar em dispositivos Android

## 🔒 Segurança

### Configurações
- [ ] Alterar prefixo das tabelas do banco (se novo)
- [ ] Desabilitar edição de arquivos no admin
- [ ] Configurar permissões de arquivos (644/755)
- [ ] Ocultar versão do WordPress
- [ ] Desabilitar XML-RPC se não usado
- [ ] Limitar tentativas de login

### Backups
- [ ] Configurar backups automáticos
- [ ] Testar restauração de backup
- [ ] Fazer backup do banco de dados
- [ ] Fazer backup dos arquivos
- [ ] Documentar processo de recuperação

## 📊 Analytics e Monitoramento

- [ ] Instalar Google Analytics
- [ ] Instalar Google Search Console
- [ ] Configurar Facebook Pixel (se necessário)
- [ ] Configurar monitoramento de uptime
- [ ] Configurar alertas de erro

## 🚦 Pré-Lançamento

### Conteúdo
- [ ] Revisar todos os textos
- [ ] Verificar ortografia
- [ ] Confirmar informações de contato
- [ ] Atualizar copyright do ano
- [ ] Adicionar política de privacidade
- [ ] Adicionar termos de uso

### Legal
- [ ] Adicionar LGPD/Cookie notice
- [ ] Configurar cookie consent
- [ ] Adicionar disclaimer jurídico
- [ ] Verificar acessibilidade (WCAG)

### Final
- [ ] Fazer backup completo pré-lançamento
- [ ] Testar em ambiente de staging
- [ ] Aprovação do cliente
- [ ] Documentar configurações
- [ ] Preparar guia de uso para cliente

## ✅ Pós-Lançamento

### Imediato (Primeiro Dia)
- [ ] Monitorar erros no console
- [ ] Verificar formulários funcionando
- [ ] Checar analytics instalado
- [ ] Testar em diferentes dispositivos
- [ ] Verificar e-mails sendo recebidos

### Primeira Semana
- [ ] Monitorar performance
- [ ] Analisar feedback de usuários
- [ ] Corrigir bugs encontrados
- [ ] Otimizar conforme necessário
- [ ] Atualizar documentação

### Primeiro Mês
- [ ] Revisar analytics
- [ ] Otimizar SEO baseado em dados
- [ ] Fazer ajustes de UX se necessário
- [ ] Treinar equipe do escritório
- [ ] Coletar depoimentos/feedback

## 📝 Notas e Observações

### Problemas Encontrados
```
[Anotar aqui problemas encontrados durante a migração]
```

### Soluções Aplicadas
```
[Anotar aqui soluções que funcionaram]
```

### Contatos Importantes
- Desenvolvedor React: _______
- Admin WordPress: _______
- Suporte Hospedagem: _______
- Suporte WP React Plugin: _______

### Senhas e Acessos (MANTER SEGURO!)
- WordPress Admin: _______
- FTP/SSH: _______
- Banco de Dados: _______
- Painel Hospedagem: _______

---

**Data de Início da Migração:** ___ / ___ / ______
**Data de Conclusão:** ___ / ___ / ______
**Responsável:** _______________
