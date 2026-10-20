# GUIA DE EDIÇÃO — INFO2SPEED RACING

Use o VS Code com a pasta do projeto aberta. Faça uma cópia antes de cada mudança.

## 1. Onde está o título de Fórmula 4?
Abra `index.html` e use **Ctrl + F** para procurar `F4 — TÍTULO PROAM 2026`.
Ali está o bloco `<article id="f4-campeao">`.
Você pode editar somente os textos entre as tags, sem apagar as tags.

Exemplo:
```html
<strong>CAMPEÕES<br>PROAM 2026</strong>
```
O `<br>` quebra a linha do título.

## 2. Como alterar as cores e espaçamentos da F4?
Abra `style.css`, vá ao final e procure `F4 PROAM 2026 — TÍTULO CONQUISTADO`.
Mude somente valores como `padding`, `font-size` e `background`.
A cor verde neon oficial está na variável `--verde: #39ff14`.

## 3. Por que não coloquei os totais da temporada?
O site tinha 3 etapas, 6 corridas e 3 vitórias da categoria ProAm.
Esses números correspondiam ao resumo das primeiras três etapas.
Sem os resultados das demais, seria incorreto chamá-los de totais finais.

## 4. Onde atualizamos a próxima corrida GT3?
No `index.html`, procure `CALENDÁRIO 2026` no bloco `gt3-sprint`.
Cada etapa tem uma data em `<time datetime="2026-10-27">`.
O `script.js` usa essa data para destacar a próxima etapa;
não inventa resultados passados.

## 5. Onde atualizar resultados da GT3?
No `index.html`, procure `RESULTADOS • MOSPORT`.
A estrutura atual mostra Felipe Bassani DNS e Rogério Pavan DNF/DNF.
Para futuras etapas, podemos copiar esse modelo e trocar somente os dados
confirmados — sem sobrescrever o histórico de Mosport.

## 6. Como ver suas alterações?
Salve com Ctrl+S. Abra `index.html` ou use a extensão Live Server do VS Code.
Teste a largura da janela, porque o site tem estilos separados para celular.

## 7. Publicação
Substitua os arquivos no repositório GitHub Pages, faça commit e aguarde
as mudanças aparecerem no site. Não esqueça da pasta `assets/` existente.
