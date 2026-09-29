# Bestiário — Lote 5C

## Escopo

Lote dedicado a **Alex's Mobs Continued 2.1.14** e **Alex's Caves 2.0.10** no pack Minecraft 1.21.1 / NeoForge.

A regra editorial permanece a mesma: existência de mob, habitat, atributos, domesticação, drops e mecânicas só entram quando existe evidência na revisão pesquisada. Campos sem confirmação ficam vazios ou explicitamente não confirmados.

## Revisões pesquisadas

### Alex's Mobs Continued

- pack: `alexsmobs-2.1.14-neoforge+1.21.1.jar`
- repositório: `Codx-org/AlexsMobsContinued`
- revisão auditada: `ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021`
- fontes principais: `AMEntityRegistry.java`, `BiomeConfig.java`, `DefaultBiomes.java`, classes/tags de domesticação e `assets/alexsmobs/textures/entity`.

**Cobertura:** 88 novas entradas no 5C. Bone Serpent e Crow já estavam no 5A, portanto o Bestiário passa a representar **90 criaturas conceituais** do mod.

Partes de entidades, projéteis, portais, ovos arremessados, tentáculos/segmentos e entidades técnicas não viram cards separados. Cave Centipede continua como um único card.

### Alex's Caves

- pack: `alexscaves-2.0.10.jar`
- repositório: `Raguto/AlexsCaves-1.21.1`
- revisão auditada: `d2a7b05998d85e602d86c4999e53340fb1ee9b06`
- `build.gradle`, `CHANGELOG.md` e `neoforge.mods.toml` identificam a revisão como **2.0.10**.
- fontes principais: `ACEntityRegistry.java`, `ACItemRegistry.java`, classes de entidade e `assets/alexscaves/textures/entity`.

**Cobertura: 43 criaturas jogáveis:**

| Habitat | Mobs |
| --- | ---: |
| Magnetic Caves | 5 |
| Primordial Caves | 8 |
| Toxic Caves | 6 |
| Abyssal Chasm | 9 |
| Forlorn Hollows | 6 |
| Candy Cavity | 9 |
| **Total** | **43** |

Componentes e entidades técnicas como Boundroid Winch, Quarry Smasher, Mine Guardian Anchor, projéteis, ondas, bombas, partes do Gum Worm e veículos não recebem cards separados.

## Domesticação confirmada

Alex's Mobs Continued mantém as rotas confirmadas para Grizzly Bear, Gorilla, Elephant, Raccoon, Capuchin Monkey e Cosmaw; Crow permanece coberto pelo 5A.

Alex's Caves mantém as rotas confirmadas para Subterranodon, Vallumraptor, Tremorsaurus, Raycat, Tremorzilla e Candicorn. Quando há chance/condição específica, o card só mostra o que foi conferido no código 2.0.10.

## Atributos

Atributos numéricos não são preenchidos em massa. Eles só aparecem onde `createAttributes()` foi conferido. Entre os encontros de maior risco verificados estão Luxtructosaurus (600 HP), Hullbreaker (400 HP), Tremorzilla (500 HP), Brainiac (40 HP), Watcher (30 HP) e Forsaken (250 HP).

## Imagens

As entradas do lote apontam para **texturas oficiais das revisões pesquisadas**. Não há imagem gerada por IA nem banco genérico. O slot visual segue a regra global do Bestiário:

1. imagem oficial quando o arquivo esperado existe;
2. a mesma imagem em silhueta CSS enquanto o mob não foi visto;
3. `imagem a adicionar` quando não existe mídia válida ou o carregamento falha.

O registry ID permanece apenas como chip monoespaçado separado e nunca substitui a mídia.

## Drops

O 5C não inventa loot. Quando a loot table/mecânica não foi auditada individualmente, `drops: []` significa **não confirmado**, e o card deixa isso explícito.

Qualquer drop que seja listado passa pela camada global de enriquecimento e recebe obrigatoriamente `Para que serve`, com confiança `Alta`, `Média` ou `Baixa-conferir`. Quando uma receita já está documentada em Mods, o Bestiário aponta para o guia em vez de duplicar a receita; JEI fica como último recurso.

## UX consolidada após o hotfix 5A/5B

- mob não visto mostra silhueta + `???`, sem vazar detalhes;
- `mostrar tudo` é persistente;
- filtros combináveis por mod, dimensão/bioma, tipo, perigo e status;
- sem filtros, a organização é **accordion por mod**, usando a identidade visual dos guias da aba Mods;
- o accordion monta os cards apenas quando aberto;
- com filtros ativos, a página usa resultados soltos e paginação progressiva;
- cabeçalhos mostram versão, `visto X/Y`, derrotados e domesticados quando aplicável;
- contadores separados para `gr1d`, `benamu` e união do mundo;
- fallback explícito para mídia ausente;
- links do 5C para guias de Mods e marcos correspondentes da Progressão;
- `prefers-reduced-motion` continua respeitado.

## Totais após o lote

- detalhados antes do 5C: **24**
- novos Alex's Mobs Continued: **88**
- novos Alex's Caves: **43**
- novos no 5C: **131**
- total detalhado esperado: **155**
- inventário-base continua com **263 candidatos**.

## Banco

**Nenhuma migração nova.** O 5C reutiliza `mundinho_bestiary_state`, incluindo Realtime e estados separados por jogador. Nenhum ID de Progressão, XP, checklist, guia ou backup foi alterado.
