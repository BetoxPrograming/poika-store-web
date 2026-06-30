function App() {
    return (
        <>
            <header className="border-b border-slate-200 bg-white px-8 py-8">
                <h1 className="text-4xl font-bold text-slate-900">Póika Store</h1>
                <p className="mt-2 text-lg text-slate-600">Su tienda en línea</p>
            </header>

            <main className="min-h-[70vh] bg-slate-50 px-8 py-10">
                <section className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Proyecto paralelo
                    </p>

                    <h2 className="text-3xl font-bold text-slate-900">Inicio</h2>

                    <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
                        Proyecto paralelo de práctica construido con React, TypeScript,
                        Vite y Tailwind CSS.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <article className="rounded-xl border border-slate-200 p-5">
                            <h3 className="font-semibold text-slate-900">React</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Se usa para construir la interfaz mediante componentes.
                            </p>
                        </article>

                        <article className="rounded-xl border border-slate-200 p-5">
                            <h3 className="font-semibold text-slate-900">TypeScript</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Se usa para escribir código más ordenado y con tipos.
                            </p>
                        </article>

                        <article className="rounded-xl border border-slate-200 p-5">
                            <h3 className="font-semibold text-slate-900">Tailwind CSS</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Se usa para diseñar usando clases utilitarias.
                            </p>
                        </article>
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">
                <p>Desarrollado como práctica paralela del proyecto Tienda Java.</p>
            </footer>
        </>
    )
}

export default App