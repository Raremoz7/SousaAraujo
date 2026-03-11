# Estrutura do Projeto - Sousa Araújo Advocacia

Este documento descreve a estrutura completa do projeto e como ele foi organizado para facilitar a exportação para WordPress.

## 📁 Estrutura de Pastas

```
sousa-araujo-advocacia/
│
├── src/
│   ├── app/
│   │   ├── components/          # Componentes React reutilizáveis
│   │   │   ├── About.tsx        # WordPress Block: sousa-araujo/about
│   │   │   ├── Articles.tsx     # WordPress Block: sousa-araujo/articles
│   │   │   ├── Contact.tsx      # WordPress Block: sousa-araujo/contact
│   │   │   ├── Differentials.tsx # WordPress Block: sousa-araujo/differentials
│   │   │   ├── Footer.tsx       # WordPress Widget: sousa-araujo-footer
│   │   │   ├── Hero.tsx         # WordPress Block: sousa-araujo/hero
│   │   │   ├── Navbar.tsx       # WordPress Widget: sousa-araujo-navbar
│   │   │   └── Stats.tsx        # WordPress Block: sousa-araujo/stats
│   │   │
│   │   └── App.tsx              # Componente principal da aplicação
│   │
│   ├── data/
│   │   └── content.ts           # Dados centralizados do site
│   │
│   ├── config/
│   │   └── wordpress.config.ts  # Configurações WordPress
│   │
│   ├── imports/                 # Componentes e assets do Figma
│   │   ├── Vector.tsx           # Logo SVG
│   │   ├── Group2093.tsx
│   │   ├── Home.tsx
│   │   └── svg-*.ts             # Paths SVG
│   │
│   └── styles/
│       ├── fonts.css            # Fontes customizadas
│       ├── theme.css            # Tema e variáveis CSS
│       └── index.css            # Estilos globais
│
├── wordpress-export/            # Arquivos para exportação WordPress
│   ├── README.md                # Guia completo de exportação
│   ├── MIGRATION-CHECKLIST.md  # Checklist detalhado
│   ├── functions.php            # Functions do tema WordPress
│   ├── package.json             # Scripts de build para WP
│   └── scripts/
│       └── copy-to-wordpress.js # Script de cópia automática
│
└── public/                      # Assets públicos
```

## 🎯 Arquitetura do Projeto

### Separação de Responsabilidades

#### 1. **Componentes (Components)**
- Cada componente é independente e reutilizável
- Props opcionais permitem uso com dados do WordPress
- Comentários indicam mapeamento para blocos/widgets WP
- Exemplo:
  ```tsx
  /**
   * Hero Component
   * WordPress Block: sousa-araujo/hero
   */
  export function Hero(props?: { ... }) { ... }
  ```

#### 2. **Dados (Data)**
- Arquivo `content.ts` centraliza todo o conteúdo
- Facilita tradução e edição sem tocar no código
- Pode ser convertido para REST API do WordPress
- Estrutura exportável para JSON/PHP

#### 3. **Configurações (Config)**
- `wordpress.config.ts` contém metadados WordPress
- Define blocos, widgets, post types, taxonomies
- Mapeia componentes React para blocos Gutenberg
- Define endpoints da REST API

#### 4. **Estilos (Styles)**
- Fontes separadas em `fonts.css`
- Tema e variáveis em `theme.css`
- Tailwind CSS v4 como framework base
- Fácil integração com WordPress

## 🔄 Fluxo de Desenvolvimento para WordPress

### Desenvolvimento Local (React)
```bash
# Instalar dependências
npm install

# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build
```

### Build para WordPress
```bash
# Build otimizado + cópia para WordPress
npm run build:wp

# Apenas copiar arquivos (sem rebuild)
npm run copy:wp
```

### Estrutura de Deploy

1. **Componentes React** → `/wp-content/themes/seu-tema/react-components/components/`
2. **Dados** → `/wp-content/themes/seu-tema/react-components/data/`
3. **Estilos** → `/wp-content/themes/seu-tema/react-components/styles/`
4. **Build** → `/wp-content/themes/seu-tema/react-components/build/`

## 📦 Componentes e Mapeamento WordPress

### Blocos Gutenberg (Editáveis no Gutenberg)

| Componente React | Bloco WordPress | Categoria | Editável |
|-----------------|-----------------|-----------|----------|
| `Hero.tsx` | `sousa-araujo/hero` | sousa-araujo | Sim |
| `Stats.tsx` | `sousa-araujo/stats` | sousa-araujo | Sim |
| `About.tsx` | `sousa-araujo/about` | sousa-araujo | Sim |
| `Differentials.tsx` | `sousa-araujo/differentials` | sousa-araujo | Sim |
| `Articles.tsx` | `sousa-araujo/articles` | sousa-araujo | Sim |
| `Contact.tsx` | `sousa-araujo/contact` | sousa-araujo | Sim |

### Widgets WordPress (Fixos no tema)

| Componente React | Widget WordPress | Posição |
|-----------------|------------------|---------|
| `Navbar.tsx` | `sousa-araujo-navbar` | Header |
| `Footer.tsx` | `sousa-araujo-footer` | Footer |

## 🎨 Sistema de Design

### Cores
```css
--color-dark: #161312;      /* Fundo principal */
--color-brown: #452b1e;     /* Fundo secundário */
--color-accent: #a57255;    /* Cor de destaque */
--color-white: #ffffff;     /* Texto principal */
```

### Tipografia
- **Marcellus** - Títulos principais
- **Roboto** - Corpo de texto
- **Lora** - Números e destaques
- **Noto Sans** - Links e botões

### Breakpoints
```css
sm: 640px   /* Mobile */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
2xl: 1536px /* Extra Large */
```

## 🔌 Integração WordPress

### Custom Post Types
- **artigo_juridico** - Artigos do blog jurídico
  - Suporta: título, editor, imagem destacada, excerpt
  - Taxonomia: categoria_juridica

### REST API Endpoints
```
GET  /wp-json/sousa-araujo/v1/content   - Retorna todo conteúdo
POST /wp-json/sousa-araujo/v1/contact   - Envia formulário
GET  /wp-json/sousa-araujo/v1/articles  - Lista artigos
```

### Custom Fields (ACF)
- Hero Settings (imagem, subtítulo, título)
- Contact Info (telefone, email, endereço)
- Social Media (Facebook, Instagram, LinkedIn)

## 📝 Padrões de Código

### Nomenclatura de Componentes
```tsx
// ✅ Bom - PascalCase para componentes
export function Hero() { ... }

// ✅ Bom - Props tipadas
export function Hero(props?: HeroProps) { ... }

// ✅ Bom - Comentários WordPress
/**
 * Hero Component
 * WordPress Block: sousa-araujo/hero
 */
```

### Importação de Dados
```tsx
// ✅ Bom - Usar dados centralizados
import { siteContent } from '../../data/content';

// ✅ Bom - Fallback para props WordPress
const content = props?.title || siteContent.hero.title;
```

### Importação de Imagens
```tsx
// ✅ Bom - Imagens Figma (durante desenvolvimento)
import img from "figma:asset/abc123.png"

// ✅ Bom - SVGs relativos
import Logo from "../../imports/Vector"

// ⚠️ No WordPress - Converter para URL da biblioteca
const imageUrl = wp.media.getUrl(imageId)
```

## 🚀 Deploy e Versionamento

### Git Workflow
```bash
# Desenvolvimento
git checkout -b feature/nome-feature
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/nome-feature

# Build para WordPress
git checkout main
npm run build:wp
git add .
git commit -m "build: versão X.X.X para WordPress"
git tag vX.X.X
git push --tags
```

### Versionamento
- **Desenvolvimento React**: Semantic Versioning (1.0.0)
- **WordPress Theme**: Alinhado com React version
- **Build**: Incrementar a cada deploy

## 📚 Documentação Adicional

- **wordpress-export/README.md** - Guia completo de exportação
- **wordpress-export/MIGRATION-CHECKLIST.md** - Checklist passo a passo
- **src/config/wordpress.config.ts** - Configurações técnicas
- **src/data/content.ts** - Estrutura de dados

## 🛠️ Ferramentas e Dependências

### React/Frontend
- React 18+
- TypeScript
- Tailwind CSS v4
- Vite (build tool)
- Lucide React (ícones)

### WordPress
- WordPress 6.0+
- WP React Plugin
- Advanced Custom Fields PRO (opcional)
- PHP 8.0+

## 🔧 Manutenção

### Adicionar Novo Componente
1. Criar componente em `/src/app/components/`
2. Adicionar props opcionais para WordPress
3. Adicionar comentário com nome do bloco
4. Importar dados de `/src/data/content.ts`
5. Adicionar registro em `wordpress.config.ts`
6. Adicionar função de render em `functions.php`

### Atualizar Conteúdo
1. Editar `/src/data/content.ts`
2. Rebuild: `npm run build`
3. Copiar para WordPress: `npm run copy:wp`
4. Ou editar diretamente no WordPress Admin

### Atualizar Estilos
1. Editar arquivos em `/src/styles/`
2. Rebuild e copiar para WordPress
3. Limpar cache do WordPress
4. Testar em todos os navegadores

## 🆘 Troubleshooting

### Componentes não aparecem no WordPress
- Verificar se WP React Plugin está ativo
- Verificar registro em `functions.php`
- Verificar caminhos dos arquivos
- Verificar console do navegador

### Imagens não carregam
- Migrar imagens para biblioteca de mídia WP
- Atualizar referências `figma:asset` para URLs WP
- Verificar permissões de arquivos

### Estilos não aplicam
- Verificar ordem de carregamento CSS
- Verificar conflitos com tema WordPress
- Limpar cache do navegador e WordPress
- Verificar se fonts.css está carregando

## 📞 Suporte

Para dúvidas sobre este projeto:
1. Consultar documentação em `/wordpress-export/`
2. Verificar configurações em `/src/config/`
3. Consultar dados em `/src/data/`

---

**Última Atualização:** 2024
**Versão:** 1.0.0
**Desenvolvedor:** Sousa Araújo Advocacia Team
