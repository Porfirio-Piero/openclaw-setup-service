'use client';

import { Template, TemplateType } from '@/types';
import { templates, getAllTemplates } from '@/lib/templates';

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (template: TemplateType) => void;
}

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  const allTemplates = getAllTemplates();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allTemplates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={`relative p-4 border-2 rounded-xl text-left transition-all hover:shadow-md ${
            selected === template.id
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div
            className="w-full h-32 rounded-lg mb-3 flex items-center justify-center text-white font-bold text-lg"
            style={{
              background: `linear-gradient(135deg, ${template.defaultBranding.primaryColor}, ${template.defaultBranding.secondaryColor})`,
            }}
          >
            {template.name}
          </div>
          
          <h3 className="font-semibold text-gray-900">{template.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{template.description}</p>
          
          {selected === template.id && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
