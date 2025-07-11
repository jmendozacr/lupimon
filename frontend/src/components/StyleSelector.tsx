'use client';

import { useArtStyles, useSelectedStyle, useLupimonStore } from '@/store/useStore';
import { Palette, Sparkles, Zap } from 'lucide-react';

const StyleSelector = () => {
  const artStyles = useArtStyles();
  const selectedStyle = useSelectedStyle();
  const { setSelectedStyle } = useLupimonStore();

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
  };

  const getStyleIcon = (styleId: string) => {
    switch (styleId) {
      case 'cartoon':
        return <Sparkles className="h-6 w-6 text-yellow-500" />;
      case 'anime':
        return <Zap className="h-6 w-6 text-pink-500" />;
      case 'digital':
        return <Palette className="h-6 w-6 text-blue-500" />;
      default:
        return <Palette className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStyleGradient = (styleId: string) => {
    switch (styleId) {
      case 'cartoon':
        return 'from-yellow-400 to-orange-500';
      case 'anime':
        return 'from-pink-400 to-purple-500';
      case 'digital':
        return 'from-blue-400 to-cyan-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Elige el estilo de arte
        </h2>
        <p className="text-gray-600">
          Selecciona el estilo que más te guste para tu perro salchicha
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {artStyles.map((style) => (
          <div
            key={style.id}
            className={`
              relative cursor-pointer rounded-2xl p-6 transition-all duration-200 transform hover:scale-105
              ${selectedStyle === style.id
                ? 'bg-gradient-to-br shadow-lg ring-2 ring-blue-500 ring-offset-2'
                : 'bg-white shadow-md hover:shadow-lg border border-gray-200'
              }
            `}
            onClick={() => handleStyleSelect(style.id)}
            role="button"
            tabIndex={0}
            aria-label={`Seleccionar estilo ${style.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStyleSelect(style.id);
              }
            }}
          >
            {/* Selected indicator */}
            {selectedStyle === style.id && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {/* Style icon */}
            <div className="flex justify-center mb-4">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center
                ${selectedStyle === style.id
                  ? 'bg-white shadow-lg'
                  : 'bg-gray-100'
                }
              `}>
                {getStyleIcon(style.id)}
              </div>
            </div>

            {/* Style name */}
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
              {style.name}
            </h3>

            {/* Style description */}
            <p className="text-gray-600 text-center text-sm mb-4">
              {style.description}
            </p>

            {/* Style preview placeholder */}
            <div className={`
              w-full h-32 rounded-lg mb-4 flex items-center justify-center
              ${selectedStyle === style.id
                ? `bg-gradient-to-br ${getStyleGradient(style.id)}`
                : 'bg-gray-100'
              }
            `}>
              <span className={`
                text-sm font-medium
                ${selectedStyle === style.id ? 'text-white' : 'text-gray-500'}
              `}>
                Vista previa
              </span>
            </div>

            {/* Selection indicator */}
            <div className={`
              text-center text-sm font-medium
              ${selectedStyle === style.id ? 'text-blue-600' : 'text-gray-400'}
            `}>
              {selectedStyle === style.id ? '✓ Seleccionado' : 'Haz clic para seleccionar'}
            </div>
          </div>
        ))}
      </div>

      {/* Additional info */}
      {selectedStyle && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">
            💡 Sobre el estilo seleccionado:
          </h3>
          <p className="text-sm text-blue-800">
            {artStyles.find(style => style.id === selectedStyle)?.prompt}
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">🎨 Consejos de selección:</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• <strong>Caricatura:</strong> Perfecto para un look divertido y colorido</li>
          <li>• <strong>Anime:</strong> Ideal para un estilo japonés con ojos expresivos</li>
          <li>• <strong>Digital Clásico:</strong> Para un look más realista y elegante</li>
        </ul>
      </div>
    </div>
  );
};

export default StyleSelector;
