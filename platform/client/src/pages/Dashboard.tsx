import { useState, useEffect } from 'react';

// 1. Definimos que el Dashboard recibe al usuario logueado
const Dashboard = ({ user }: { user: any }) => {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

    // 2. Estado inicial con TODO lo que pide tu tabla de MySQL
    const [courseData, setCourseData] = useState({
        titulo: '',
        descripcion: '',
        precio: '',
        categoria: 'Costura',
        image: null as File | null
    });

    const [lessonData, setLessonData] = useState({
        curso_id: '',
        titulo: '',
        tipo: 'image',
        file: null as File | null
    });

    const fetchCourses = () => {
        fetch(`${API_URL}/courses`)
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(err => console.error("Error al cargar cursos:", err));
    };

    useEffect(() => { fetchCourses(); }, []);

    const handleCreateCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // 1. Verificación de seguridad antes de empezar
        if (!user?.id) {
            alert("Error: No se detectó tu ID de instructor. Prueba cerrar sesión y entrar de nuevo.");
            setLoading(false);
            return;
        }

        console.log("Enviando curso con ID de instructor:", user.id);

        // 2. Empaquetamos los datos (UNA SOLA VEZ cada uno)
        const formData = new FormData();
        formData.append('titulo', courseData.titulo);
        formData.append('descripcion', courseData.descripcion);
        formData.append('precio', courseData.precio);
        formData.append('categoria', courseData.categoria);
        formData.append('instructor_id', user.id); // <--- Solo aquí, ya validado arriba

        if (courseData.image) {
            formData.append('image', courseData.image);
        }

        try {
            const res = await fetch(`${API_URL}/courses`, {
                method: 'POST',
                body: formData
                // Nota: No pongas headers de Content-Type, el navegador lo hace solo con FormData
            });

            if (res.ok) {
                alert("¡Curso creado con éxito!");
                fetchCourses();
                setCourseData({ titulo: '', descripcion: '', precio: '', categoria: 'Costura', image: null });
            } else {
                const errorData = await res.json();
                alert(`Error del servidor: ${errorData.error}`);
            }
        } catch (err) {
            console.error("DETALLE DEL ERROR:", err);
            alert("Error de conexión al crear curso");
        } finally {
            setLoading(false);
        }
    };

    // --- FUNCIÓN B: SUBIR LECCIÓN (Se queda igual, ya estaba bien) ---
    const handleUploadLesson = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('curso_id', lessonData.curso_id);
        formData.append('titulo', lessonData.titulo);
        formData.append('tipo', lessonData.tipo);
        if (lessonData.file) formData.append('file', lessonData.file);

        try {
            const res = await fetch(`${API_URL}/lessons/upload`, { method: 'POST', body: formData });
            if (res.ok) {
                alert("¡Material subido a Cloudinary!");
                setLessonData({ curso_id: '', titulo: '', tipo: 'image', file: null });
            }
        } catch (err) {
            alert("Error al subir material");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* FORMULARIO 1: CURSOS */}
            <section className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100">
                <h2 className="text-2xl font-black text-brand-terracota mb-6">1. Nuevo Curso</h2>
                <form onSubmit={handleCreateCourse} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Título del curso"
                        value={courseData.titulo}
                        className="w-full p-3 bg-stone-50 border rounded-xl"
                        onChange={e => setCourseData({ ...courseData, titulo: e.target.value })}
                        required
                    />

                    <textarea
                        placeholder="Descripción del curso..."
                        value={courseData.descripcion}
                        className="w-full p-3 bg-stone-50 border rounded-xl h-24"
                        onChange={e => setCourseData({ ...courseData, descripcion: e.target.value })}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Precio"
                        value={courseData.precio}
                        className="w-full p-3 bg-stone-50 border rounded-xl"
                        onChange={e => setCourseData({ ...courseData, precio: e.target.value })}
                        required
                    />

                    <div className="space-y-2">
                        <p className="text-xs text-stone-400 font-bold uppercase ml-1">Imagen de Portada</p>
                        <label className="cursor-pointer bg-stone-50 hover:bg-stone-100 text-stone-600 p-4 rounded-xl border-2 border-dashed border-stone-200 flex flex-col items-center gap-2 transition-all">
                            <span className="text-2xl">🖼️</span>
                            <span className="text-sm font-medium">
                                {courseData.image ? courseData.image.name : "Seleccionar imagen"}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e: any) => setCourseData({ ...courseData, image: e.target.files[0] })}
                                required={!courseData.image}
                            />
                        </label>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-stone-800 text-white p-4 rounded-xl font-bold hover:bg-black transition-all">
                        {loading ? "Procesando..." : "Crear Curso"}
                    </button>
                </form>
            </section>

            {/* FORMULARIO 2: MATERIALES */}
            <section className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100">
                <h2 className="text-2xl font-black text-brand-textil mb-6">2. Subir Material</h2>
                <form onSubmit={handleUploadLesson} className="space-y-4">
                    <select className="w-full p-3 bg-stone-50 border rounded-xl" value={lessonData.curso_id}
                        onChange={e => setLessonData({ ...lessonData, curso_id: e.target.value })} required>
                        <option value="">¿A qué curso pertenece?</option>
                        {courses.map(c => <option key={c.id} value={c.id}>{c.titulo}</option>)}
                    </select>
                    <input type="text" placeholder="Título de la lección" value={lessonData.titulo} className="w-full p-3 bg-stone-50 border rounded-xl"
                        onChange={e => setLessonData({ ...lessonData, titulo: e.target.value })} required />
                    <select className="w-full p-3 bg-stone-50 border rounded-xl" value={lessonData.tipo}
                        onChange={e => setLessonData({ ...lessonData, tipo: e.target.value })}>
                        <option value="image">Imagen (JPG/PNG)</option>
                        <option value="pdf">Documento (PDF)</option>
                        <option value="video">Video (MP4)</option>
                    </select>
                    <p className="text-xs text-stone-400 font-bold ml-1 uppercase">Archivo Multimedia</p>
                    <input type="file" className="text-sm w-full"
                        onChange={(e: any) => setLessonData({ ...lessonData, file: e.target.files[0] })} required />
                    <button type="submit" disabled={loading} className="w-full bg-brand-terracota text-white p-4 rounded-xl font-bold hover:opacity-90 transition-all">
                        {loading ? "Subiendo a la Nube..." : "Subir Material"}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Dashboard;