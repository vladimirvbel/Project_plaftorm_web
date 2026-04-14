import React from 'react';

const Hero = () => {
    return (
        <section className="relative bg-brand-crema pt-16 pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">

                {/* Lado Izquierdo: Texto */}
                <div className="flex-1 text-center md:text-left z-10">
                    <div className="inline-flex items-center gap-2 bg-orange-100 text-brand-terracota text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-terracota opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-terracota"></span>
                        </span>
                        Comunidad de Aprendizaje Manual
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-brand-textil leading-tight mb-6">
                        El arte de crear <br />
                        <span className="text-brand-terracota italic">con tus manos.</span>
                    </h1>

                    <p className="text-lg text-stone-600 mb-10 max-w-lg leading-relaxed">
                        Descubre cursos impartidos por maestros artesanos. Desde técnicas ancestrales hasta diseño moderno, todo en un solo lugar.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <button className="bg-brand-terracota text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-orange-900/30 hover:bg-orange-700 hover:-translate-y-1 transition-all duration-300">
                            Explorar Cursos
                        </button>
                        <button className="bg-white text-stone-800 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-stone-100 hover:border-brand-terracota/20 hover:bg-stone-50 transition-all">
                            Ser Instructor
                        </button>
                    </div>
                </div>

                {/* Lado Derecho: Visual */}
                <div className="flex-1 relative w-full max-w-lg md:max-w-none">
                    <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                        <img
                            src="/images/artesano-trabajando.avif"
                            alt="Artesano trabajando"
                            className="w-full h-[450px] object-cover scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-textil/40 to-transparent"></div>
                    </div>

                    {/* Elementos Decorativos */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-terracota/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-200/40 rounded-full blur-2xl"></div>
                </div>

            </div>
        </section>
    );
};

export default Hero;