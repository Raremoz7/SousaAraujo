/**
 * Script para copiar arquivos buildados para o tema WordPress
 * 
 * Uso: node scripts/copy-to-wordpress.js
 */

const fs = require('fs-extra');
const path = require('path');

// Configurações
const CONFIG = {
  // Caminho do build React
  sourcePath: path.join(__dirname, '../../dist'),
  
  // Caminho do tema WordPress (ajuste conforme necessário)
  wordpressThemePath: process.env.WP_THEME_PATH || '/var/www/html/wp-content/themes/sousa-araujo',
  
  // Pasta de destino dos componentes React no tema
  reactComponentsPath: 'react-components',
  
  // Arquivos e pastas para copiar
  filesToCopy: [
    { from: 'assets', to: 'assets' },
    { from: 'index.js', to: 'build/bundle.js' },
    { from: 'index.css', to: 'build/bundle.css' },
  ],
  
  // Componentes para copiar
  componentsPath: path.join(__dirname, '../../src/app/components'),
  
  // Dados para copiar
  dataPath: path.join(__dirname, '../../src/data'),
  
  // Estilos para copiar
  stylesPath: path.join(__dirname, '../../src/styles'),
};

async function copyToWordPress() {
  try {
    console.log('🚀 Iniciando cópia de arquivos para WordPress...\n');
    
    // Verificar se o caminho do WordPress existe
    if (!fs.existsSync(CONFIG.wordpressThemePath)) {
      console.error(`❌ Erro: Caminho do WordPress não encontrado: ${CONFIG.wordpressThemePath}`);
      console.log('\n💡 Dica: Configure a variável de ambiente WP_THEME_PATH');
      console.log('   Exemplo: export WP_THEME_PATH=/var/www/html/wp-content/themes/seu-tema\n');
      process.exit(1);
    }
    
    const destPath = path.join(CONFIG.wordpressThemePath, CONFIG.reactComponentsPath);
    
    // Criar pasta de destino se não existir
    await fs.ensureDir(destPath);
    console.log(`✅ Pasta de destino criada/verificada: ${destPath}\n`);
    
    // 1. Copiar build files
    console.log('📦 Copiando arquivos buildados...');
    for (const file of CONFIG.filesToCopy) {
      const sourcePath = path.join(CONFIG.sourcePath, file.from);
      const destFilePath = path.join(destPath, file.to);
      
      if (fs.existsSync(sourcePath)) {
        await fs.copy(sourcePath, destFilePath, { overwrite: true });
        console.log(`   ✓ ${file.from} → ${file.to}`);
      } else {
        console.log(`   ⚠ Arquivo não encontrado: ${file.from}`);
      }
    }
    
    // 2. Copiar componentes
    console.log('\n🧩 Copiando componentes React...');
    const componentsDestPath = path.join(destPath, 'components');
    await fs.ensureDir(componentsDestPath);
    await fs.copy(CONFIG.componentsPath, componentsDestPath, { overwrite: true });
    console.log(`   ✓ Componentes copiados para ${componentsDestPath}`);
    
    // 3. Copiar dados
    console.log('\n📊 Copiando arquivos de dados...');
    const dataDestPath = path.join(destPath, 'data');
    await fs.ensureDir(dataDestPath);
    await fs.copy(CONFIG.dataPath, dataDestPath, { overwrite: true });
    console.log(`   ✓ Dados copiados para ${dataDestPath}`);
    
    // 4. Copiar estilos
    console.log('\n🎨 Copiando estilos...');
    const stylesDestPath = path.join(destPath, 'styles');
    await fs.ensureDir(stylesDestPath);
    await fs.copy(CONFIG.stylesPath, stylesDestPath, { overwrite: true });
    console.log(`   ✓ Estilos copiados para ${stylesDestPath}`);
    
    // 5. Criar arquivo de mapeamento de imagens
    console.log('\n🖼️ Criando mapeamento de imagens...');
    await createImageMapping(destPath);
    
    console.log('\n✨ Cópia concluída com sucesso!');
    console.log(`\n📁 Arquivos copiados para: ${destPath}`);
    console.log('\n📝 Próximos passos:');
    console.log('   1. Importar imagens para a biblioteca de mídia do WordPress');
    console.log('   2. Atualizar o mapeamento de imagens em data/image-mapping.json');
    console.log('   3. Testar os componentes no WordPress\n');
    
  } catch (error) {
    console.error('❌ Erro ao copiar arquivos:', error);
    process.exit(1);
  }
}

async function createImageMapping(destPath) {
  const imageMapping = {
    note: 'Mapeamento de imagens do Figma para WordPress Media Library',
    instructions: 'Após importar as imagens para o WordPress, atualize os IDs abaixo',
    images: {
      'hero-background': {
        figmaAsset: 'figma:asset/1bde68b0434e033834687b9e219a2315c5e30659.png',
        wpMediaId: null,
        description: 'Imagem de fundo da seção Hero',
      },
      'about-photo': {
        figmaAsset: 'figma:asset/4fee0ccd87db6dd900796a349711620cb85c2755.png',
        wpMediaId: null,
        description: 'Foto da Dra. Lidiane',
      },
      'differentials-image': {
        figmaAsset: 'figma:asset/6daa36a69df9600539a5261e4be774bd12f5fa67.png',
        wpMediaId: null,
        description: 'Imagem da seção diferenciais',
      },
      'team-photo': {
        figmaAsset: 'figma:asset/b1f5c9d022e2869246b5bf9dee8631b24df008f4.png',
        wpMediaId: null,
        description: 'Foto da equipe',
      },
      'gallery-1': {
        figmaAsset: 'figma:asset/8f998da633bb92dcab13a208c71a97e2986d6c06.png',
        wpMediaId: null,
        description: 'Galeria - Imagem 1',
      },
      'gallery-2': {
        figmaAsset: 'figma:asset/a6246b350004d1d692b469864824af4843190e94.png',
        wpMediaId: null,
        description: 'Galeria - Imagem 2',
      },
      'gallery-3': {
        figmaAsset: 'figma:asset/a417229c957cdd5306763b4c6f5b421056127f88.png',
        wpMediaId: null,
        description: 'Galeria - Imagem 3',
      },
      'article-1': {
        figmaAsset: 'figma:asset/3e71c6d61aa0e57d1a665be82b28cb9ea6a34e93.png',
        wpMediaId: null,
        description: 'Artigo 1 - Planejamento sucessório',
      },
      'article-2': {
        figmaAsset: 'figma:asset/39e61b656ddd5fe3d719f00ef6da22c2fe461e03.png',
        wpMediaId: null,
        description: 'Artigo 2 - Legislação trabalhista',
      },
      'article-3': {
        figmaAsset: 'figma:asset/bb375343044c3a51e65f183f442085b46aeafbe0.png',
        wpMediaId: null,
        description: 'Artigo 3 - Direitos do consumidor',
      },
    },
  };
  
  const mappingPath = path.join(destPath, 'data', 'image-mapping.json');
  await fs.writeJSON(mappingPath, imageMapping, { spaces: 2 });
  console.log(`   ✓ Mapeamento criado em ${mappingPath}`);
}

// Executar
copyToWordPress();
