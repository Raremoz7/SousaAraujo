#!/usr/bin/env python3
"""
Script para remover o campo órfão parceiros.bio.heading
do arquivo PainelPage.tsx (linha 962)
"""

import re

def remove_orphan_field():
    file_path = 'src/app/pages/PainelPage.tsx'
    
    # Fazer backup
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    with open(file_path + '.backup', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Backup criado: {file_path}.backup")
    
    # Padrão para encontrar a linha problemática
    # Procura pela linha que contém parceiros.bio.heading
    pattern = r"\s*\{\s*key:\s*['\"]parceiros\.bio\.heading['\"].*?\},?\n"
    
    # Remover a linha
    new_content = re.sub(pattern, '', content)
    
    # Verificar se algo foi removido
    if content == new_content:
        print("❌ ERRO: Campo não encontrado. Verifique o arquivo manualmente.")
        return False
    
    # Salvar arquivo modificado
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Campo 'parceiros.bio.heading' removido com sucesso!")
    print(f"\n📄 Backup disponível em: {file_path}.backup")
    print(f"\n🔄 Para reverter, execute:")
    print(f"   cp {file_path}.backup {file_path}")
    
    return True

if __name__ == '__main__':
    print("=" * 60)
    print("🧹 REMOÇÃO DE CAMPO ÓRFÃO")
    print("=" * 60)
    print(f"\nRemovendo campo: parceiros.bio.heading")
    print(f"Arquivo: src/app/pages/PainelPage.tsx")
    print()
    
    try:
        success = remove_orphan_field()
        if success:
            print("\n✅ CONCLUÍDO!")
            print("\n🎯 Próximo passo:")
            print("   1. Verifique o painel em /painel → Auditoria")
            print("   2. Deve mostrar 0 campos órfãos")
    except Exception as e:
        print(f"\n❌ ERRO: {e}")
        print("\nTente remover manualmente a linha 962 em PainelPage.tsx")
