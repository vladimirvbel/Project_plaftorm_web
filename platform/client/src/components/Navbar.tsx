import React from 'react';

// Definimos que el Navbar ahora recibe una función por sus "props"
interface NavbarProps {
  onOpenAuth: () => void;
  user: any; // <--- Recibimos el usuario
}

const Navbar = ({ onOpenAuth, user }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-terracota rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-black text-brand-textil tracking-tighter">LogoName</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#" className="hover:text-brand-terracota transition-colors">Cursos</a>
            <a href="#" className="hover:text-brand-terracota transition-colors">Artesanos</a>
            <a href="#" className="hover:text-brand-terracota transition-colors">Nosotros</a>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              // SI HAY USUARIO: Mostramos su nombre y un botón de salir
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-stone-700">
                  Hola, <span className="font-bold text-brand-terracota">{user.name}</span>
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload(); // Forma rápida de cerrar sesión
                  }}
                  className="text-xs text-stone-400 hover:text-red-500 transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              // SI NO HAY USUARIO: Mostramos los botones de siempre
              <div className="flex items-center gap-4">
                <button
                  onClick={onOpenAuth} // <--- Al dar clic, avisamos al padre (App.tsx)
                  className="text-sm font-semibold text-brand-textil hover:opacity-70 transition-opacity"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={onOpenAuth}
                  className="bg-brand-terracota text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-orange-700/20 hover:scale-105 transition-transform"
                >
                  Unirse
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;