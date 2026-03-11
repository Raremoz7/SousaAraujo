# 🚀 Guia Rápido - Exportação para WordPress

Este é um guia resumido para exportar rapidamente o projeto para WordPress usando o WP React Plugin.

## ⚡ 5 Passos Principais

### 1️⃣ Preparar WordPress (10 min)

```bash
# Instalar WordPress
wp core download
wp core config --dbname=seu_db --dbuser=seu_user --dbpass=sua_senha
wp core install --url=seu-site.com --title="Sousa Araújo Advocacia"

# Instalar plugins necessários
wp plugin install wp-react-plugin --activate
wp plugin install advanced-custom-fields --activate
```

### 2️⃣ Build do Projeto React (2 min)

```bash
# No diretório do projeto React
npm install
npm run build
```

### 3️⃣ Copiar Arquivos para WordPress (5 min)

```bash
# Opção A: Manual
cp -r src/app/components /var/www/html/wp-content/themes/seu-tema/react-components/
cp -r src/data /var/www/html/wp-content/themes/seu-tema/react-components/
cp -r src/styles /var/www/html/wp-content/themes/seu-tema/react-components/
cp -r dist /var/www/html/wp-content/themes/seu-tema/react-components/build/

# Opção B: Script automatizado
export WP_THEME_PATH=/var/www/html/wp-content/themes/seu-tema
npm run copy:wp
```

### 4️⃣ Configurar Tema WordPress (5 min)

```bash
# Copiar functions.php
cp wordpress-export/functions.php /var/www/html/wp-content/themes/seu-tema/

# Ou adicionar ao functions.php existente
cat wordpress-export/functions.php >> /var/www/html/wp-content/themes/seu-tema/functions.php
```

### 5️⃣ Migrar Imagens e Testar (10 min)

1. Fazer upload das imagens Figma para Biblioteca de Mídia do WordPress
2. Atualizar referências no código
3. Criar página "Home" no WordPress
4. Adicionar blocos Sousa Araújo
5. Testar e publicar!

## 📋 Comandos Úteis

```bash
# Build completo para WordPress
npm run build:wp

# Copiar apenas (sem rebuild)
npm run copy:wp

# Desenvolvimento local
npm run dev

# Verificar erros do WordPress
wp --info
tail -f /var/www/html/wp-content/debug.log
```

## 🎯 Checklist Mínimo

- [ ] WordPress instalado
- [ ] WP React Plugin ativo
- [ ] Arquivos copiados para tema
- [ ] functions.php configurado
- [ ] Imagens migradas
- [ ] Blocos testados
- [ ] Site publicado

## 🔗 Links Importantes

- **Documentação Completa:** `/wordpress-export/README.md`
- **Checklist Detalhado:** `/wordpress-export/MIGRATION-CHECKLIST.md`
- **Estrutura do Projeto:** `/PROJECT-STRUCTURE.md`
- **WP React Plugin:** https://wp-react-plugin.com/docs

## 🆘 Problemas Comuns

### "Componentes não aparecem"
```bash
# Verificar registro
wp shell
print_r(get_option('wp_react_components'));
```

### "Estilos não aplicam"
```bash
# Limpar cache
wp cache flush
wp rewrite flush
```

### "Imagens quebradas"
- Migrar todas as imagens para Biblioteca de Mídia
- Substituir `figma:asset/...` por URLs do WordPress

## 💡 Dica Pro

Para atualizações rápidas:
```bash
# No projeto React
npm run build && npm run copy:wp

# No WordPress
wp cache flush

# Testar
open http://seu-site.local
```

## 🎊 Pronto!

Seu site React agora está rodando no WordPress!

**Próximos passos:**
1. Adicionar conteúdo real
2. Configurar SEO
3. Otimizar performance
4. Fazer backup
5. Ir ao ar! 🚀
