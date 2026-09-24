export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-5 py-12 sm:px-8">
      <section className="w-full border-4 border-night-950 bg-paper-100 p-6 shadow-pixel sm:p-10">
        <p className="font-label text-2xl text-wood-700">migração Next.js · etapa 1</p>
        <h1 className="mt-3 max-w-3xl font-display text-xl leading-relaxed text-ink-900 sm:text-3xl">
          Mundinho · pra sempre
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-ink-700 sm:text-lg">
          A fundação moderna está pronta: App Router, TypeScript, Tailwind CSS e o contrato público de
          configuração do Supabase. A interface e o conteúdo reais entram nas próximas etapas.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Next", "16.3.6"],
            ["React", "19.3.0"],
            ["Tailwind", "4.3.0"],
            ["Supabase SSR", "0.12.7"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="border-4 border-night-950 bg-stone-100 p-4 shadow-pixel-sm shadow-night-950"
            >
              <span className="block font-label text-xl text-wood-700">{label}</span>
              <strong className="mt-1 block text-sm text-ink-900">{value}</strong>
            </div>
          ))}
        </div>

        <div className="mt-8 border-l-8 border-torch-500 bg-torch-100 p-4 text-sm leading-6 text-ink-900">
          Esta branch ainda não substitui o site vanilla em produção. Ela existe para validar a migração
          etapa por etapa antes de qualquer merge em <code className="font-mono">main</code>.
        </div>
      </section>
    </main>
  );
}
