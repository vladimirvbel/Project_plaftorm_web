import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Marca */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-terracota rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-black text-brand-textil tracking-tighter">
              MANUM
            </span>
          </div>

          {/* Navegación (Placeholders) */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-brand-terracota transition-colors">
              Cursos
            </a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-brand-terracota transition-colors">
              Artesanos
            </a>
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-brand-terracota transition-colors">
              Nosotros
            </a>
          </div>

          {/* Botón de Acción (Placeholder para Login) */}
          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold text-brand-textil hover:opacity-70 transition-opacity">
              Iniciar Sesión
            </button>
            <button className="bg-brand-terracota text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-orange-700/20 hover:scale-105 transition-transform active:scale-95">
              Unirse
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;