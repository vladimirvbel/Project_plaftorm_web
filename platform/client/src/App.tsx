import { useEffect, useState } from 'react'

interface Course {
  id: number;
  titulo: string;
  precio: number;
  categoria: string;
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
    // bg-brand-crema usa el color que definimos en tu config
    <div className="min-h-screen bg-brand-crema p-8 font-sans">
      <h1 className="text-5xl text-brand-terracota font-black mb-4">
        Plataforma MANUM 🧵
      </h1>
      <h2 className="text-xl text-stone-600 mb-8 italic">
        Catálogo de Cursos Disponibles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div 
            key={course.id} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 hover:shadow-md transition-all"
          >
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
        ))}
      </div>
    </div>
  )
}

export default App;