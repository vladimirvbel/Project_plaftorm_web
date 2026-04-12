import { useEffect, useState } from 'react'
import Navbar from './components/Navbar' // <--- 1. Importas la pieza

interface Course {
  id: number;
  titulo: string;
  precio: number;
  categoria: string;
  imagen_url: string;
}

function App() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Error al cargar cursos:", err));
  }, []);

  return (
    <div className="min-h-screen bg-brand-crema font-sans">
      <Navbar /> {/* <--- 2. Colocas la pieza en su lugar */}

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
              className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Imagen del Curso */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.imagen_url} 
                  alt={course.titulo} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-terracota bg-orange-50 px-2 py-1 rounded">
                  {course.categoria}
                </span>
                <h3 className="text-2xl font-bold text-stone-800 mt-4 leading-tight">
                  {course.titulo}
                </h3>
                <p className="text-3xl font-black text-stone-900 mt-6">
                  ${course.precio}
                </p>
                <button className="w-full mt-6 bg-brand-terracota text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all">
                  Ver Lecciones
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App;