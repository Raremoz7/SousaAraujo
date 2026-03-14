#!/bin/bash
# Script para remover o campo órfão parceiros.bio.heading

# Arquivo alvo
FILE="/src/app/pages/PainelPage.tsx"

# Fazer backup
cp "$FILE" "$FILE.backup"

# Remover a linha 769 que contém parceiros.bio.heading
sed -i '769d' "$FILE"

echo "✅ Campo parceiros.bio.heading removido com sucesso!"
echo "📄 Backup criado em: $FILE.backup"
echo ""
echo "Para reverter, execute:"
echo "  mv $FILE.backup $FILE"
