import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon";
import { Tag, type TagTone } from "@/components/ui/tag";
import { GUIDE_ACCENTS, GUIDE_TEXTURES } from "@/lib/guide-theme";

const icons: PixelIconName[] = ["torch", "chest", "compass", "heart", "book", "pickaxe"];
const tags: Array<[TagTone, string]> = [
  ["neutral", "metadado"],
  ["success", "concluído"],
  ["achievement", "troféu"],
  ["focus", "foco / CTA"],
  ["danger", "risco alto"],
  ["external", "link externo"],
];

export default function DesignSystemPage() {
  return (
    <div className="space-y-8 page-enter">
      <header className="pixel-surface panel-paper p-5 text-ink-900">
        <p className="font-label text-2xl text-wood-700">referência visual interna</p>
        <h1 className="mt-2 font-display text-lg text-ink-900 sm:text-2xl">Design System</h1>
        <p className="mt-3 max-w-4xl leading-7 text-ink-900">Cozy Minecraft: conteúdo legível, interação pixelada e identidade visual por mod sem transformar a interface em ruído.</p>
      </header>

      <section className="space-y-4">
        <h2 className="font-display text-sm text-torch-300">Superfícies</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card surface="paper"><CardHeader><CardTitle>paper</CardTitle></CardHeader><CardContent>Conteúdo primário e leitura longa, sempre com ink-900.</CardContent></Card>
          <Card surface="paper"><CardHeader tone="wood"><CardTitle>wood header</CardTitle></CardHeader><CardContent>Madeira fica no cabeçalho; leitura continua em paper.</CardContent></Card>
          <Card surface="stone"><CardHeader><CardTitle>stone</CardTitle></CardHeader><CardContent>Sólido, sem grade: metadados, stats e informação secundária.</CardContent></Card>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-sm text-torch-300">Hierarquia interativa</h2>
        <div className="flex flex-wrap gap-3"><Button>Primário</Button><Button variant="secondary">Secundário</Button><Button variant="success">Sucesso</Button><Button variant="external">Externo</Button><Button variant="danger">Perigo</Button><Button variant="ghost">Ghost</Button></div>
        <div className="flex flex-wrap gap-2">{tags.map(([tone, label]) => <Tag key={tone} tone={tone}>{label}</Tag>)}</div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-sm text-torch-300">Ícones cozy</h2>
        <div className="flex flex-wrap gap-3">{icons.map((icon) => <div key={icon} className="grid min-w-24 place-items-center gap-2 border border-stone-500 bg-paper-100 p-3 text-ink-900"><PixelIcon name={icon} size={24} /><span className="font-label text-lg">{icon}</span></div>)}</div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-sm text-torch-300">Identidade por guia</h2>
        <p className="max-w-3xl text-sm leading-6 text-paper-100">Accent fica em bordas, faixa e chip; a área de leitura permanece clara. As texturas abaixo são amostras decorativas, nunca fundo de parágrafo.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{GUIDE_ACCENTS.map((accent) => <div key={accent} className={`guide-accent-${accent} guide-theme-frame border border-stone-500 bg-paper-100 p-3 text-ink-900`}><strong className="font-label text-xl">{accent}</strong><div className="guide-theme-badge mt-2 border px-2 py-1 text-sm">accent token</div></div>)}</div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{GUIDE_TEXTURES.map((texture) => <div key={texture} className="overflow-hidden border border-stone-500 bg-paper-100 text-ink-900"><div className={`guide-texture-${texture} h-5 bg-stone-100`} aria-hidden="true" /><span className="block p-3 font-label text-xl">texture: {texture}</span></div>)}</div>
      </section>
    </div>
  );
}
