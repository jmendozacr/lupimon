'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import UploadPhoto from '@/components/UploadPhoto';
import StyleSelector from '@/components/StyleSelector';
import { useDogPhoto, useSelectedStyle, useLupimonStore } from '@/store/useStore';
import { ArrowRight, ArrowLeft, Sparkles, Camera, Palette } from 'lucide-react';

const CustomizePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const dogPhoto = useDogPhoto();
  const selectedStyle = useSelectedStyle();
  const { setIsLoading } = useLupimonStore();

  const totalSteps = 2;

  const canProceedToStep2 = dogPhoto.file !== null;
  const canGenerateArt = dogPhoto.file !== null && selectedStyle !== null;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateArt = async () => {
    if (!canGenerateArt) return;

    setIsLoading(true);
    
    // Simular generación de arte (aquí iría la llamada a la API de IA)
    setTimeout(() => {
      setIsLoading(false);
      // Aquí se agregaría la lógica para manejar el arte generado
      console.log('Arte generado para:', { photo: dogPhoto.file?.name, style: selectedStyle });
    }, 3000);
  };

  const steps = [
    {
      id: 1,
      title: 'Subir Foto',
      description: 'Sube una foto de tu perro salchicha',
      icon: Camera,
      component: <UploadPhoto />
    },
    {
      id: 2,
      title: 'Elegir Estilo',
      description: 'Selecciona el estilo de arte',
      icon: Palette,
      component: <StyleSelector />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Personaliza tu merch
            </h1>
            <div className="text-sm text-gray-600">
              Paso {currentStep} de {totalSteps}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-8">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isClickable = isCompleted || (step.id === 1 && canProceedToStep2);

              return (
                <div
                  key={step.id}
                  className={`
                    flex items-center space-x-3 cursor-pointer transition-all duration-200
                    ${isClickable ? 'hover:scale-105' : 'cursor-not-allowed opacity-50'}
                  `}
                  onClick={() => {
                    if (isClickable) {
                      setCurrentStep(step.id);
                    }
                  }}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : isCompleted 
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }
                  `}>
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className={`
                      font-medium text-sm
                      ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}
                    `}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-400">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="mb-8">
          {steps[currentStep - 1].component}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${currentStep === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }
            `}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="flex space-x-4">
            {currentStep === totalSteps ? (
              <button
                onClick={handleGenerateArt}
                disabled={!canGenerateArt}
                className={`
                  flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-200
                  ${canGenerateArt
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-1'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <Sparkles className="w-4 h-4" />
                <span>Generar Arte</span>
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                disabled={!canProceedToStep2}
                className={`
                  flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-200
                  ${canProceedToStep2
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-1'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {currentStep === 1 && !canProceedToStep2 && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm text-center">
              ⚠️ Necesitas subir una foto para continuar
            </p>
          </div>
        )}

        {currentStep === totalSteps && !canGenerateArt && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm text-center">
              ⚠️ Necesitas subir una foto y seleccionar un estilo para generar arte
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomizePage; 