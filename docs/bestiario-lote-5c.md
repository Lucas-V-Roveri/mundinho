# Bestiário — Lote 5C

## Escopo

Lote dedicado a **Alex's Mobs Continued 2.1.14** e **Alex's Caves 2.0.10** no pack Minecraft 1.21.1 / NeoForge.

A regra editorial permanece a mesma: existência de mob, habitat, atributos, domesticação e mecânicas só entram quando existe evidência na revisão pesquisada. Campos sem confirmação ficam vazios ou explicitamente não confirmados.

## Revisões pesquisadas

### Alex's Mobs Continued

- pack: `alexsmobs-2.1.14-neoforge+1.21.1.jar`
- repositório: `Codx-org/AlexsMobsContinued`
- revisão auditada: `ccbf64f7dad7f37f5fb95f8ee66dbf27ab94e021`
- fontes principais:
  - `AMEntityRegistry.java` — existência/categoria técnica
  - `BiomeConfig.java` — seletor de habitat por entidade
  - `DefaultBiomes.java` — definição dos habitats
  - tags de item e classes de entidade — domesticação quando confirmada
  - `assets/alexsmobs/textures/entity` — texturas oficiais usadas como imagem quando o arquivo-base existe

**Cobertura:** 88 novas entradas no 5C. Bone Serpent e Crow já estavam no 5A, portanto o Bestiário passa a representar **90 criaturas conceituais** do mod.

Não viram cards separados: partes de entidades, projéteis, portais, ovos arremessados, tentáculos/segmentos e outras entidades técnicas. Cave Centipede é um único card, não três cards para cabeça/corpo/cauda.

### Alex's Caves

- pack: `alexscaves-2.0.10.jar`
- repositório: `Raguto/AlexsCaves-1.21.1`
- revisão auditada: `d2a7b05998d85e602d86c4999e53340fb1ee9b06`
- `build.gradle`, `CHANGELOG.md` e `neoforge.mods.toml` identificam a revisão como **2.0.10**.
- fontes principais:
  - `ACEntityRegistry.java` — entidades vivas registradas
  - `ACItemRegistry.java` — Spawn Eggs associados explicitamente a cada Cave Biome
  - classes de entidade — atributos e domesticação quando pesquisados individualmente
  - `assets/alexscaves/textures/entity` — texturas oficiais

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

## Domesticação confirmada no 5C

### Alex's Mobs Continued

- Grizzly Bear — Salmon; código usa chance de 30% por tentativa qualificável.
- Gorilla — itens da tag `#alexsmobs:bananas`; 30%.
- Elephant — Acacia Blossom; 1 em 3.
- Raccoon — itens de `#forge:eggs` após lavar o item; 30%.
- Capuchin Monkey — `#alexsmobs:bananas`; 1 em 5.
- Cosmaw — Cosmic Cod; 30%.
- Crow já permanecia coberto pelo 5A.

### Alex's Caves

- Subterranodon — rota por ovo chocado perto do jogador; classe também aceita Trilocaris Tail/Cooked Trilocaris Tail.
- Vallumraptor — rota por ovo; classe também possui rota com Serene Salad quando relaxado.
- Tremorsaurus — rota por ovo; há também tentativas próprias na classe, sem resumir além do confirmado.
- Raycat — Radgill, 1 em 3.
- Tremorzilla — Nuclear Bomb; após pelo menos 4 tentativas registradas, uma mastigação qualificável usa rolagem de 1 em 3.
- Candicorn — Caramel Apple, 1 em 3; pode receber Saddle depois de domesticado.

## Atributos

Atributos numéricos não são preenchidos em massa. Eles só aparecem nos cards onde `createAttributes()` da entidade foi conferido na build 2.0.10. Entre os encontros de maior risco verificados:

- Luxtructosaurus — 600 HP, 20 armor, 12 attack.
- Hullbreaker — 400 HP, 16 attack.
- Tremorzilla — 500 HP, 10 armor, 30 attack.
- Brainiac — 40 HP, 8 armor, 5 attack.
- Watcher — 30 HP, 4 attack.
- Forsaken — 250 HP, 10 attack.

## Imagens

As entradas do lote apontam primeiro para **texturas oficiais das revisões pesquisadas**. Não há imagem gerada por IA nem banco de imagens. O componente do Bestiário agora possui fallback explícito `imagem a adicionar`: se a revisão não expuser um arquivo no caminho oficial esperado, a interface não inventa arte nem deixa um quadrado vazio.

## UX corrigida neste lote

Além do conteúdo 5C, o lote completa pontos da especificação original que estavam incompletos no 5A:

- mob não visto mostra `???` e só expõe mod/tipo até ser descoberto;
- silhueta usa a imagem real com filtro CSS;
- `mostrar tudo` persistente;
- filtros combináveis por mod, dimensão/bioma, tipo, perigo e status;
- agrupamento alternável por mod, dimensão ou tipo;
- contadores separados para `gr1d`, `benamu` e união do mundo;
- renderização progressiva em blocos de 36 via `IntersectionObserver`;
- fallback textual para imagem ausente;
- links do 5C para os guias de Mods e marcos correspondentes da Progressão;
- `prefers-reduced-motion` mantém a revelação sem transição.

## Totais após o lote

- detalhados antes do 5C: **24**
- novos Alex's Mobs Continued: **88**
- novos Alex's Caves: **43**
- novos no 5C: **131**
- total detalhado esperado: **155**
- inventário-base continua com **263 candidatos**; ele não é reduzido artificialmente enquanto os lotes restantes não fecharem os outros mods.

## Banco

**Nenhuma migração nova.** O 5C reutiliza `mundinho_bestiary_state`, criada no 5A, incluindo Realtime e estados separados por jogador. Nenhum ID de Progressão, XP, checklist, guia ou backup foi alterado.
