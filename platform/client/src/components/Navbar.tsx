import { Link } from 'react-router-dom';
// Definimos que el Navbar ahora recibe una función por sus "props"
interface NavbarProps {
  onOpenAuth: () => void;
  user: any; // <--- Recibimos el usuario
  onLogout: () => void; // <--- Recibimos la función de logout
}

const Navbar = ({ onOpenAuth, user, onLogout }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* 1. EL LOGO AHORA ES UN LINK AL HOME */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-brand-terracota rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-black text-brand-textil tracking-tighter">MANUM</span>
          </Link>

          {/* 2. CAMBIAMOS LOS <a> POR <Link> PARA QUE NO RECARGUE LA PÁGINA */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <Link to="/" className="hover:text-brand-terracota transition-colors">Cursos</Link>
            <Link to="/artesanos" className="hover:text-brand-terracota transition-colors">Artesanos</Link>
            <Link to="/nosotros" className="hover:text-brand-terracota transition-colors">Nosotros</Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              // SI HAY USUARIO: Mostramos su nombre y un botón de salir
              <div className="flex items-center gap-6">
                {/* Link al Perfil (Solo se ve si hay usuario) */}
                {user.rol === 'instructor' && (
                  <Link to="/dashboard" className="bg-stone-800 text-white px-3 py-1 rounded-md text-xs font-bold hover:bg-black transition-all">
                    Panel Instructor
                  </Link>
                )}
                <Link
                  to="/perfil"
                  className="text-sm font-medium text-stone-600 hover:text-brand-terracota transition-colors"
                >
                  Mi Perfil
                </Link>
                <span className="text-sm font-medium text-stone-700">
                  Hola, <span className="font-bold text-brand-terracota">{user.name}</span>
                </span>
                <button
                  onClick={onLogout} // <--- Simplemente llamamos a la función que viene del padre
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