import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Course {
    id: number;
    titulo: string;
    precio: number;
    categoria: string;
    imagen_url: string;
}

const Catalog = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    // Usamos la variable de entorno para que funcione en Render y Local
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

    useEffect(() => {
        fetch(`${API_URL}/courses`)
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(err => console.error("Error al cargar cursos:", err));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <div key={course.id} className="group bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-xl transition-all flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                        <img src={course.imagen_url} alt={course.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-stone-800 mb-4 line-clamp-2">{course.titulo}</h3>

                        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                            <span className="text-2xl font-black text-stone-900">${course.precio}</span>

                            {/* AQUÍ ES DONDE EL LINK YA NO DARÁ ERROR PORQUE ESTÁ DENTRO DEL MAP */}
                            <Link
                                to={`/curso/${course.id}`}
                                className="bg-stone-100 text-stone-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-terracota hover:text-white transition-all"
                            >
                                Detalles
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Catalog;