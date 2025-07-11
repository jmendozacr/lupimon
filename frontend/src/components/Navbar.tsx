'use client';

import { useCart, useIsLoading } from '@/store/useStore';
import Link from 'next/link';
import { ShoppingCart, Loader2 } from 'lucide-react';

const Navbar = () => {
  const cart = useCart();
  const isLoading = useIsLoading();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y navegación principal */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              aria-label="Ir a la página principal"
            >
              <span className="text-3xl">🐶</span>
              <span>Lupimon</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                aria-label="Página principal"
              >
                Inicio
              </Link>
              <Link 
                href="/customize" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                aria-label="Personalizar productos"
              >
                Personalizar
              </Link>
            </div>
          </div>

          {/* Carrito y estados */}
          <div className="flex items-center space-x-4">
            {/* Indicador de carga */}
            {isLoading && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generando arte...</span>
              </div>
            )}

            {/* Carrito */}
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label={`Ver carrito (${cartItemCount} items)`}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* Menú móvil (hamburguesa) */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Abrir menú de navegación"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil expandido (oculto por defecto) */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Inicio
          </Link>
          <Link 
            href="/customize" 
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
          >
            Personalizar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
