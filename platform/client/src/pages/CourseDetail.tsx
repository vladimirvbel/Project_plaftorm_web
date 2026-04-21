import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const CourseDetail = () => {
    const { id } = useParams(); // Esto atrapa el ID de la URL
    const [course, setCourse] = useState<any>(null);
    const [lessons, setLessons] = useState<any[]>([]);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

    useEffect(() => {
        // 1. Obtener info del curso
        fetch(`${API_URL}/courses/${id}`)
            .then(res => res.json())
            .then(data => setCourse(data));

        // 2. Obtener las lecciones/materiales de este curso
        fetch(`${API_URL}/courses/${id}/lessons`)
            .then(res => res.json())
            .then(data => setLessons(data));
    }, [id]);

    if (!course) return <div className="p-20 text-center">Cargando curso...</div>;

    return (
        <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* ... parte de arriba con la portada y título ... */}

            <div className="lg:col-span-2 space-y-8">
                <h2 className="text-3xl font-black text-brand-textil">Contenido del Curso</h2>

                <div className="space-y-4">
                    {lessons.length === 0 ? (
                        <p className="text-stone-400 italic">Aún no hay materiales subidos para este curso.</p>
                    ) : (
                        lessons.map((lesson) => (
                            <div key={lesson.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                                <h3 className="font-bold text-lg mb-2">{lesson.titulo}</h3>

                                {lesson.tipo === 'video' && (
                                    <video controls className="w-full rounded-xl border">
                                        <source src={lesson.url_contenido} type="video/mp4" />
                                        Tu navegador no soporta videos.
                                    </video>
                                )}

                                {lesson.tipo === 'pdf' && (
                                    <a href={lesson.url_contenido} target="_blank" className="flex items-center gap-3 text-red-600 font-bold">
                                        📄 Ver Documento PDF
                                    </a>
                                )}

                                {lesson.tipo === 'image' && (
                                    <img src={lesson.url_contenido} className="w-full rounded-xl border" />
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;