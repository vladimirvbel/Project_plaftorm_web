const Profile = ({ user }: { user: any }) => {
    if (!user) return <div className="p-10 text-center">Debes iniciar sesión para ver tu perfil.</div>;

    return (
        <div className="max-w-2xl mx-auto p-10 text-center">
            <img src={user.picture} alt={user.name} className="w-32 h-32 rounded-full mx-auto shadow-lg border-4 border-white" />
            <h1 className="text-3xl font-black mt-4 text-brand-terracota">{user.name}</h1>
            <p className="text-stone-500">{user.email}</p>
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-stone-100">
                <h3 className="font-bold text-stone-800 mb-2 text-left">Mis Cursos</h3>
                <p className="text-sm text-stone-400 italic text-left">Aún no te has inscrito a ningún curso.</p>
            </div>
        </div>
    );
};

export default Profile;