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
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Plataforma MANUM 🧵</h1>
      <h2>Catálogo de Cursos Disponibles</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {courses.map(course => (
          <div key={course.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <h3>{course.titulo}</h3>
            <p>Categoría: {course.categoria}</p>
            <p><strong>Precio: ${course.precio}</strong></p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;