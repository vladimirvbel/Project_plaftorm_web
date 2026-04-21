import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Catalog from './components/Catalog' // Vamos a mover el grid aquí
import CourseDetail from './pages/CourseDetail'
import Profile from './pages/Profile'
import AuthModal from './components/AuthModal'
import Dashboard from './pages/Dashboard';

// Usamos la variable de entorno que configuramos en Vercel/Render
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Persistencia del usuario al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleAuthSuccess = async (credentialResponse: any) => {
    try {
      const response = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error en la autenticación:", err);
    }
  };

  const handleLogout = () => {
    // 1. Limpiamos el estado para que la UI se actualice al instante
    setUser(null);

    // 2. Limpiamos el almacenamiento para que no se loguee solo al refrescar
    localStorage.removeItem('user');

    // 3. (Opcional) Si estás en una ruta privada, mandamos al usuario al Home
    navigate('/');
  };
  return (
    <div className="min-h-screen bg-brand-crema font-sans">
      {/* El Navbar siempre está visible */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsModalOpen(true)}
        onLogout={handleLogout} // <--- Aquí pasas la función
      />

      <Routes>
        {/* RUTA INICIO: Hero + Catálogo */}
        <Route path="/" element={
          <>
            <Hero />
            <main className="max-w-7xl mx-auto p-8">
              <Catalog /> {/* Movimos el grid de cursos a este componente */}
            </main>
          </>
        } />

        {/* RUTA DETALLE: Solo el detalle del curso */}
        <Route path="/curso/:id" element={<CourseDetail />} />

        {/* RUTA PERFIL: Solo accesible si hay usuario */}
        <Route path="/perfil" element={<Profile user={user} />} />
        <Route
          path="/dashboard"
          element={
            user?.rol === 'instructor' ? <Dashboard user={user} /> : <Navigate to="/" />
          }
        />
      </Routes>

      {/* El Modal es global, se puede abrir desde cualquier ruta */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}

export default App;