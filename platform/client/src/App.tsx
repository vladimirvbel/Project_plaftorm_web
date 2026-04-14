import { useEffect, useState } from 'react'
import Navbar from './components/Navbar' // <--- 1. Importas la pieza
import AuthModal from './components/AuthModal' // <--- Importamos el modal aquí
import Hero from './components/Hero' // Importar componente Hero Section

interface Course {
  id: number;
  titulo: string;
  precio: number;
  categoria: string;
  imagen_url: string;
}

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // <--- Estado global del modal

  // 1. Creamos el estado para el usuario logueado
  const [user, setUser] = useState<any>(null);

 // 2. Intentar recuperar al usuario al cargar la página (Persistencia)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    fetch('http://localhost:3000/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error al cargar cursos:", err));
  }, []);

  const handleAuthSuccess = async (credentialResponse: any) => {
    const response = await fetch('http://localhost:3000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential }),
    });

    const data = await response.json();

    if (response.ok) {
      // 3. Guardamos al usuario en el estado y en el navegador
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-crema font-sans">
      {/* Le pasamos la función al Navbar para que pueda abrir el modal */}
      <Navbar user={user} onOpenAuth={() => setIsModalOpen(true)} />

      {/* 2. Sección de Landing (Impacto Visual) */}
      <Hero />
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-5xl text-brand-terracota font-black mb-4">
          Plataforma Name 🧵
        </h1>
        <h2 className="text-xl text-stone-600 mb-8 italic">
          Catálogo de Cursos Disponibles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course.id}
              className="group bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Contenedor de Imagen con Efecto Zoom */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={course.imagen_url}
                  alt={course.titulo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badge de Categoría Flotante */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-brand-terracota px-2 py-1 rounded shadow-sm">
                    {course.categoria}
                  </span>
                </div>
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Título (Limitado a 2 líneas para que todas las tarjetas midan lo mismo) */}
                <h3 className="text-lg font-bold text-stone-800 leading-tight line-clamp-2 mb-1 group-hover:text-brand-terracota transition-colors">
                  {course.titulo}
                </h3>

                {/* Instructor (Placeholder por ahora) */}
                <p className="text-sm text-stone-500 mb-2">Por: Artesano Maestro</p>

                {/* Rating / Estrellas (Look de Udemy) */}
                <div className="flex items-center gap-1 mb-4">
                  <span className="text-sm font-bold text-orange-600">4.8</span>
                  <div className="flex text-orange-400 text-xs">
                    ★ ★ ★ ★ ★
                  </div>
                  <span className="text-xs text-stone-400">(124)</span>
                </div>

                {/* Precio y Botón en la base */}
                <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-2xl font-black text-stone-900">
                    ${course.precio}
                  </span>
                  <button className="bg-stone-100 text-stone-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-terracota hover:text-white transition-all active:scale-95">
                    Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {/* EL MODAL AHORA VIVE AQUÍ, FUERA DE TODO CONFLICTO */}
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}

export default App;