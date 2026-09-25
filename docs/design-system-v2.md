# Mundinho · pra sempre — Design System v2

## Objetivo

O design deve parecer um diário/wiki cozy de Minecraft feito para duas pessoas, não um dashboard corporativo nem uma parede de texturas. O conteúdo é sempre o protagonista.

## Critérios de aceite da Etapa 2

1. **Fundo calmo** — `night` quase sólido; textura de blocos em contraste muito baixo. Nenhuma textura de madeira de alto contraste ocupando a tela inteira.
2. **Superfícies semânticas** — `paper` para conteúdo primário; `wood` para cabeçalhos/accordion heads; `stone` sólido para metadados e stats. Nunca texto corrido sobre grade de pedra.
3. **Hierarquia visual** — borda grossa + `shadow-pixel` + hover lift só para interação real: botões, cards clicáveis, accordion heads e slots clicáveis. Tags/chips/labels são flat.
4. **Cores semânticas** — `grass` = concluído/sucesso; `gold` = conquistas/troféus; `torch` = CTA/foco; `redstone` = risco/perigo; `blue` = links/externos. `wood`, `stone`, `paper` e `night` são estruturais.
5. **Tipografia** — Press Start 2P apenas em títulos curtos (~4 palavras) e números de destaque; VT323 em labels/metadados/tags; Inter em descrições, textos longos e títulos extensos de cards.
6. **Header unificado** — uma barra só com brand + navegação + seletor gr1d/benamu sempre visível. Exportar, Importar, Som e migração ficam no footer/ferramentas secundárias.
7. **Elementos cozy** — set inline SVG pixel-art (`torch`, `chest`, `compass`, `heart`, `book`, `pickaxe`), polaroids preservadas, XP com glow quente, trophy shelf com silhueta bloqueada e empty state.
8. **Mobile first** — validar em ~680px e ~980px: conteúdo continua protagonista; interações não ganham bordas excessivas; header não vira duas barras altas.
9. **Acessibilidade** — AA na leitura, foco visível, aria correto, `prefers-reduced-motion` desativa animações/transforms.

## Componentes

### Card

- `surface="paper"`: leitura primária.
- `surface="wood"`: reservado a estrutura/cabeçalhos; evitar texto longo.
- `surface="stone"`: metadata/stats, sempre sólido.
- `interactive`: único modo que recebe borda pesada, shadow pixel e hover lift.

### Tag

`Tag` é sempre flat. Tones:

- `neutral`: metadata;
- `success`: concluído;
- `achievement`: troféu/conquista;
- `focus`: atenção/CTA auxiliar;
- `danger`: risco;
- `external`: links/integrações externas.

### Button

- `primary`: torch;
- `secondary`: wood;
- `success`: grass;
- `external`: blue;
- `danger`: redstone;
- `ghost`: ferramenta secundária.

## SPEC de identidade visual por guia — requisito da Etapa 4

Todo guia tipado aceita:

```ts
type GuideTheme = {
  accent: "stone" | "torch" | "wood" | "grass" | "redstone" | "gold" | "blue" | "ice";
  texture: "fire" | "leather" | "ice" | "leaf" | "stone" | "none";
};
```

Uso:

```ts
{
  id: "sophisticated-backpacks",
  theme: { accent: "wood", texture: "leather" }
}
```

Regras:

- fallback obrigatório: `{ accent: "stone", texture: "stone" }`;
- accent atua em borda, stripe, tag e detalhe — não em fundo de parágrafo;
- texture é sutil, com `repeating-linear-gradient` e hard stops;
- nenhum texto de leitura longa fica diretamente sobre textura;
- os 35 guias existentes devem ser mapeados explicitamente na Etapa 4;
- a mesma identidade deve ser reutilizada em: card do guia, resultado da busca global e card “Próximo sugerido” quando o marco corresponder ao guia;
- contraste AA deve ser verificado para todos os accents;
- `prefers-reduced-motion` não depende do tema e continua soberano.

## Mapeamento obrigatório da Etapa 4

A entrega da Etapa 4 deve conter uma tabela completa com 35 linhas:

`guia | accent | texture | justificativa`

Sem tema definido: usar fallback stone/neutro, nunca escolher cor arbitrária em JSX.

## Referência visual

A rota interna `/design-system` mostra exemplos reais de cards, tags, buttons, ícones, accents e textures usando os mesmos componentes da aplicação.
