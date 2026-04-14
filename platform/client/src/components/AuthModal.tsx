import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  if (!isOpen) return null; // Si no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Fondo oscuro con Blur (Cierra al dar clic afuera) */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Caja del Formulario */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <h2 className="text-3xl font-black text-brand-textil mb-2">Bienvenido 🧵</h2>
          <p className="text-stone-500 mb-8 text-sm">Inicia sesión para continuar aprendiendo.</p>

          {/* Formulario Manual (Placeholder) */}
          <form className="space-y-4 mb-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-400 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-terracota focus:ring-1 focus:ring-brand-terracota outline-none transition-all"
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-400 mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-terracota focus:ring-1 focus:ring-brand-terracota outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full bg-brand-terracota text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-orange-700/20">
              Entrar
            </button>
          </form>

          {/* Divisor */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-stone-400">O también</span></div>
          </div>

          {/* Botón de Google */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={onSuccess}
              onError={() => console.log('Login Fallido')}
              shape="pill"
            />
          </div>
          {/* BOTÓN DE BYPASS */}
          <button
            type="button"
            onClick={() => {
              // Simulamos la respuesta que daría tu backend
              const mockUser = {
                id: '999',
                name: 'Bruno ',
                email: 'bruno@local.com'
              };

              // Guardamos en localstorage para que el Navbar lo vea
              localStorage.setItem('user', JSON.stringify(mockUser));

              // Forzamos recarga o avisamos al padre
              window.location.reload();
            }}
            className="w-full text-[10px] text-stone-300 hover:text-stone-500 transition-colors mt-2 uppercase tracking-widest"
          >
            ⚙️ Activar Modo Desarrollador (Bypass)
          </button>
        </div>

        {/* Botón de cerrar X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;