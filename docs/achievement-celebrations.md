# Celebração por conquista

A implementação é aditiva: um portal com canvas no root e uma chamada no handler central após todas as gravações de progresso. Não altera cards, CSS existente, rotas, tipos de conteúdo, persistência nem subscriptions Realtime.

## Linhas alteradas em arquivos existentes

| Arquivo | Linhas finais | Alteração |
|---|---|---|
| `app/layout.tsx` | 6, 35 | Importação e montagem do overlay como irmão do AppShell |
| `components/app-providers.tsx` | 6, 218, 224 | Importação, uma chamada no sucesso, dependências do callback |

Todo o restante são arquivos novos. Nenhum efeito é escolhido por ID: IDs apenas localizam os dados e o elemento que disparou a ação.

## Matching e intensidade

`components/effects/taxonomy.ts` contém a tabela semântica completa, incluindo variantes por boss/bioma. Ordem: família do contexto → título → tema visual genérico → XP. Extras têm identidade de carinho; variantes de boss ficam restritas à família identificada. `mods` complementa entradas sem família e desambigua o agrupamento End. Os 35 guias e 101 marcos do snapshot são cobertos pelos testes.

Checklist: 12 partículas / 1,8s; marco: 22 / 2,2s; fase: 34 / 2,5s. O último subitem amplia o mesmo evento; não dispara uma segunda celebração. Troféu aparece em vitória, não em preparação ou invocação.

## Sprites

PNG local do Minecraft tem preferência. Reaproveita o pipeline existente de `/icons/minecraft/` para osso, pão, ametista, ouro, lanterna, papel, maçã encantada, esmeralda e olho do End. Dois PNGs adicionais ficam em `/icons/celebrations/`:

- [Pena 1.21.1, fonte fixada](https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/67c9b138b00a6b67c29ba68dae74c41faef4889d/data/1.21.1/items/feather.png). SHA256: `56513599c70b5da268ebf37e3245ef1f0fc9645a8b654aedd69069ec2f757513`.
- [Partícula coração 1.21.1](https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.1/assets/minecraft/textures/particle/heart.png). SHA256: `351e76662421bfd9285429847568b93046cd26100acc3f53550c663234bbde7b`.

A execução não depende de imagens externas. Falhas de PNG usam silhuetas pixeladas inline. Sprites de mods são sugestões visuais originais, não uma reprodução de assets dos mods.

## Acessibilidade e ciclo de vida

Um canvas visível e um render loop; máximo 40 partículas e fila limitada a 12 eventos. Imagens e atlas ficam em cache. Sprites de até 22px, smoothing desligado, DPR limitado a 2. Sem partículas, o loop para. Borda superior da viewport fornece chuvas; demais efeitos usam o centro do checkbox/card, com snapshot da posição para cards que desaparecem após completar.

`prefers-reduced-motion` usa apenas borda âmbar estática por 300ms. Mudança da preferência limpa a cena. Aba oculta pausa o loop; troca de rota e desmontagem limpam partículas/fila/listeners. Overlay `pointer-events: none`, acima do conteúdo e abaixo dos dialogs nativos. O som de sucesso existente mantém seu opt-in. Desmarcar, carregar dados, importar, Realtime ou falhar uma gravação não emite celebração. `mundinho.celebrations=0` em localStorage desativa o efeito sem mudar o progresso.

## Validação reproduzível

`node --experimental-strip-types --test tests/celebration-taxonomy.test.mjs` e `npm run verify` (regressão, typecheck, lint, build). O workflow aditivo `Celebration acceptance` executa Chromium contra um servidor isolado com dados locais; nunca marca progresso no site de produção. Gera `fire.png`, `phase.png`, `snow-mobile.png`, `reduced-motion.png` e `results.json` no artifact `celebration-evidence`.

O teste verifica fogo saindo do card, fase completa com 34 partículas, chuva de neve em viewport 390×844/DPR3, teclado, reduced-motion, limite/fila e limpeza de rota, atualização entre abas sem replay, falha de gravação, desmarcação, feature desligada, PNG indisponível e origem preservada quando o card concluído desaparece. O cenário mobile coleta 45 frames com CPU reduzida a 1/4 e registra FPS médio/p95 em `results.json` (sem tratar o runner como um telefone). A checagem mobile é emulada; não representa uma medição física de 60fps em um aparelho médio. Persistência e subscriptions Realtime existentes permanecem intactas; o cenário entre abas verifica ausência de replay sem escrever no banco de produção.
