/**
 * SiteSeoEditor — Editor visual para campos site.* que alimentam o JSON-LD LocalBusiness
 * 
 * Renderiza 3 grupos: Dados do Escritório, Endereço e Redes Sociais.
 * Salva automaticamente no onBlur de cada campo.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Building2, MapPin, Share2, Save } from 'lucide-react';

interface SiteSeoEditorProps {
  data: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'email' | 'url';
  placeholder?: string;
  maxLength?: number;
}

const GROUPS: { id: string; title: string; icon: React.ReactNode; fields: FieldDef[] }[] = [
  {
    id: 'office',
    title: 'Dados do Escritório',
    icon: <Building2 size={13} />,
    fields: [
      { key: 'site.name', label: 'Nome do escritório', type: 'text' },
      { key: 'site.phone', label: 'Telefone (com DDD)', type: 'text', placeholder: '+55 61 9XXXX-XXXX' },
      { key: 'site.email', label: 'E-mail de contato', type: 'email' },
    ],
  },
  {
    id: 'address',
    title: 'Endereço',
    icon: <MapPin size={13} />,
    fields: [
      { key: 'site.address.street', label: 'Logradouro e número', type: 'text' },
      { key: 'site.address.city', label: 'Cidade', type: 'text' },
      { key: 'site.address.state', label: 'Estado (sigla)', type: 'text', maxLength: 2 },
      { key: 'site.address.zipCode', label: 'CEP', type: 'text', placeholder: '70000-000' },
    ],
  },
  {
    id: 'social',
    title: 'Redes Sociais',
    icon: <Share2 size={13} />,
    fields: [
      { key: 'site.social.instagram', label: 'Instagram (URL completa)', type: 'url' },
      { key: 'site.social.facebook', label: 'Facebook (URL completa)', type: 'url' },
      { key: 'site.social.linkedin', label: 'LinkedIn (URL completa)', type: 'url' },
      { key: 'site.social.youtube', label: 'YouTube (URL completa)', type: 'url' },
    ],
  },
];

const ALL_KEYS = GROUPS.flatMap(g => g.fields.map(f => f.key));

export function SiteSeoEditor({ data, onChange }: SiteSeoEditorProps) {
  // Local state for all fields
  const [local, setLocal] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const key of ALL_KEYS) init[key] = data[key] ?? '';
    return init;
  });

  // Track which fields are dirty (edited but not yet saved via onBlur)
  const [dirty, setDirty] = useState<Set<string>>(new Set());

  // Ref to avoid stale closures
  const localRef = useRef(local);
  localRef.current = local;

  // Sync from external data changes
  useEffect(() => {
    setLocal(prev => {
      const next = { ...prev };
      let changed = false;
      for (const key of ALL_KEYS) {
        const ext = data[key] ?? '';
        // Only sync if the field isn't currently dirty (user editing)
        if (!dirty.has(key) && next[key] !== ext) {
          next[key] = ext;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [data, dirty]);

  const handleChange = useCallback((key: string, value: string) => {
    setLocal(prev => ({ ...prev, [key]: value }));
    setDirty(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  }, []);

  const handleBlur = useCallback((key: string) => {
    onChange(key, localRef.current[key]);
    setDirty(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, [onChange]);

  const handleSaveAll = useCallback(() => {
    for (const key of ALL_KEYS) {
      if (dirty.has(key)) {
        onChange(key, localRef.current[key]);
      }
    }
    setDirty(new Set());
  }, [dirty, onChange]);

  const isGroupDirty = (groupFields: FieldDef[]) =>
    groupFields.some(f => dirty.has(f.key));

  return (
    <div className="py-[8px]">
      {/* Header */}
      <div className="flex items-center gap-[8px] mb-[12px]">
        <Building2 size={15} className="text-[#a57255]" />
        <h3 className="font-['Noto_Sans'] text-[13px] font-semibold text-gray-900">
          Dados do Site (JSON-LD)
        </h3>
        <span className="font-['Noto_Sans'] text-[10px] text-gray-400">
          Alimentam o Schema LocalBusiness
        </span>
      </div>

      {/* Groups */}
      {GROUPS.map(group => (
        <div
          key={group.id}
          className="bg-white border border-gray-200 rounded-xl p-[14px] mb-[8px] hover:border-gray-300 transition-colors"
        >
          {/* Group title */}
          <div className="flex items-center gap-[6px] mb-[10px]">
            <span className="text-[#a57255]/70">{group.icon}</span>
            <span className="font-['Noto_Sans'] text-[11px] font-semibold text-gray-600 uppercase tracking-[0.5px]">
              {group.title}
            </span>
            {isGroupDirty(group.fields) && (
              <span className="text-[9px] bg-amber-500/15 text-amber-400 px-[6px] py-[1px] rounded font-['Noto_Sans'] font-medium ml-[4px]">
                Não salvo
              </span>
            )}
          </div>

          {/* Fields — responsive grid */}
          <div className={`grid gap-x-[12px] gap-y-[8px] ${
            group.fields.length <= 3 ? 'grid-cols-3' :
            group.fields.length === 4 ? 'grid-cols-4' : 'grid-cols-2'
          }`}>
            {group.fields.map(field => (
              <div key={field.key}>
                <label className="font-['Noto_Sans'] text-[10px] text-gray-400 mb-[3px] block truncate">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={local[field.key] ?? ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  onBlur={() => handleBlur(field.key)}
                  placeholder={field.placeholder ?? ''}
                  maxLength={field.maxLength}
                  className="w-full bg-white border border-gray-200 text-gray-900 font-['Noto_Sans'] text-[12px] leading-[18px] h-[34px] px-[10px] rounded-md focus:border-[#a57255]/40 focus:outline-none focus:ring-1 focus:ring-[#a57255]/20 transition-all placeholder:text-gray-300"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Save all button — only visible when dirty */}
      {dirty.size > 0 && (
        <button
          onClick={handleSaveAll}
          className="w-full flex items-center justify-center gap-[6px] h-[34px] bg-[#a57255] hover:bg-[#8f6146] text-white rounded-lg font-['Noto_Sans'] text-[12px] font-medium transition-colors mt-[4px]"
        >
          <Save size={13} />
          Salvar tudo ({dirty.size} campo{dirty.size > 1 ? 's' : ''})
        </button>
      )}
    </div>
  );
}

export default SiteSeoEditor;