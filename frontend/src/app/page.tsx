import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowRight, Sparkles, Camera, Palette, ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Personaliza tu merch con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                IA
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sube una foto de tu perro salchicha y crea diseños únicos para camisetas, 
              tazas y más. ¡Transforma a tu mascota en arte increíble!
            </p>
          </div>

          {/* CTA Button */}
          <Link 
            href="/customize"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            aria-label="Comenzar a personalizar productos"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Empieza ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Camera className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Sube tu foto
            </h3>
            <p className="text-gray-600 text-center">
              Simplemente sube una foto clara de tu perro salchicha. 
              Cuanto mejor sea la foto, mejor será el resultado.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Palette className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Elige el estilo
            </h3>
            <p className="text-gray-600 text-center">
              Selecciona entre caricatura, anime o digital clásico. 
              Nuestra IA generará múltiples versiones para ti.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Personaliza productos
            </h3>
            <p className="text-gray-600 text-center">
              Aplica tu diseño favorito a camisetas, tazas, tote bags 
              y más. ¡Haz tu pedido y recibe tu merch único!
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para crear algo increíble?
            </h2>
            <p className="text-gray-600 mb-6">
              Únete a la comunidad de amantes de perros salchicha y 
              crea merch que refleje la personalidad única de tu mascota.
            </p>
            <Link 
              href="/customize"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
              aria-label="Comenzar personalización"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Crear mi diseño
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🐶</span>
            <span className="text-xl font-bold">Lupimon IA Merch</span>
          </div>
          <p className="text-gray-400">
            Transformando fotos de perros salchicha en arte increíble desde 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
