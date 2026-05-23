# Redesign Visual + Micro-interações — Design Spec

**Data:** 2026-05-23  
**Escopo:** Opção 2 — Visual refresh + micro-interações (sem reimplementar lógica)  
**Constraint:** Sem npm, sem build step. Apenas CDN, CSS puro e Alpine.js.

---

## Decisões de Design

| Decisão | Escolha |
|---|---|
| Direção visual | Minimal Pro |
| Header | `#0f172a` (slate-900) |
| Background | `#f8fafc` (slate-50) |
| Cards | `#ffffff` com border `#e8edf2` |
| Accent | Emerald `#059669` (hover: `#047857`) |
| Accent light | `#f0fdf4` (bg suave), `#6ee7b7` (border) |
| Tipografia | DM Sans via Google Fonts CDN |
| Ícones | SVG inline (sem emoji) |
| Layout de entradas | Lista de linhas (row cards) |

---

## Arquivos a modificar

- `index.html` — tipografia, ícones SVG, estrutura da lista de entradas, x-transition nos entries
- `style.css` — paleta completa, DM Sans, todos os componentes
- `app.js` — nenhuma mudança de lógica; apenas garantir que a lista de entradas use x-for com x-transition

---

## 1. Tipografia

Adicionar no `<head>` do `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

No `style.css`, substituir o font-stack do `body`:
```css
body {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 2. Paleta de Cores

Substituições diretas em `style.css`:

| De (atual) | Para |
|---|---|
| `#1a365d` (header bg) | `#0f172a` |
| `#f0f4f8` (body bg) | `#f8fafc` |
| `#3182ce` / `#2563eb` (accent blue) | `#059669` |
| `rgba(49,130,206,.15)` (focus ring) | `rgba(5,150,105,.12)` |
| `#63b3ed` (nav underline) | `#059669` |
| `#2b6cb0` (blue text) | `#059669` |
| `#ebf8ff` / `#bee3f8` (blue bg light) | `#f0fdf4` / `#6ee7b7` |

Manter as cores de erro (`#c53030`, `#fff5f5`, `#fed7d7`) e de "missing day" (`#fff5f5`, `#fca5a5`).

---

## 3. Ícones — Substituição de Emoji

| Emoji atual | SVG substituto | Local |
|---|---|---|
| `⏱` (auth logo) | SVG clock/timer | `.auth-logo` em index.html |
| `⚙` (settings btn) | SVG gear (stroke, 1.6px) | header em index.html |
| `⏻` (logout btn) | SVG power circle | header em index.html |
| `↻` (sync dot) | SVG arrows-rotate animado | header em index.html |
| `⚡` (defaults btn label) | SVG arrow-right-to-bracket | botão Horário Padrão |
| `←` / `→` (week nav) | SVG chevron-left / chevron-right | week card |

Todos os SVGs usam `stroke="currentColor"`, `stroke-width="1.6"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`. Tamanho padrão: `16x16` no header, `14x14` no conteúdo.

O sync dot ganha classe `spin` com `animation: spin 1s linear infinite` somente quando `syncStatus === 'syncing'`.

---

## 4. Header

```css
header { background: #0f172a; }
.header-inner h1 { font-size: 15px; font-weight: 800; letter-spacing: -.3px; }
```

Nav tab ativa:
```css
nav button.active { color: #34d399; border-bottom-color: #059669; }
```

Ícones do header (`.icon-btn`): manter estrutura atual, apenas ajustar cores via paleta nova.

---

## 5. Week Card — refinamentos

```css
.week-cell { border-radius: 10px; }
.wc-today { box-shadow: 0 0 0 2px #059669 !important; }
.wc-today .wc-name { color: #059669; }
.wc-has { background: #f0fdf4; border-color: #6ee7b7; }
.wc-has .wc-total { color: #059669; }
```

Botão "Hoje" (`.week-today-btn`):
```css
.week-today-btn {
  color: #059669; background: #f0fdf4;
  border: 1px solid #6ee7b7; border-radius: 6px;
  font-size: 11px; font-weight: 700;
}
```

Week nav arrows: substituir `&#8592;` e `&#8594;` por SVG chevrons.

---

## 6. Formulário

Focus state:
```css
input:focus, select:focus {
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5,150,105,.12);
}
```

Day preview:
```css
.day-preview { background: #f0fdf4; color: #059669; }
```
Adicionar ícone SVG de relógio inline antes do texto no `index.html`.

Botão "Horário Padrão" (`.btn-fill-defaults`):
```css
.btn-fill-defaults {
  background: #f0fdf4; color: #059669;
  border: 1.5px solid #6ee7b7; border-radius: 9px;
  font-weight: 700;
}
.btn-fill-defaults:hover { background: #dcfce7; }
```
Substituir `⚡` por SVG inline.

---

## 7. Botões — Feedback Tátil

```css
.btn-primary {
  background: #059669;
  box-shadow: 0 2px 6px rgba(5,150,105,.3);
  transition: background .15s, transform .1s cubic-bezier(.16,1,.3,1), box-shadow .15s;
}
.btn-primary:hover { background: #047857; box-shadow: 0 3px 10px rgba(5,150,105,.35); }
.btn-primary:active { transform: scale(0.97); box-shadow: 0 1px 3px rgba(5,150,105,.2); }

.btn-secondary:active { transform: scale(0.97); }
.btn-icon:active { transform: scale(0.95); }
```

---

## 8. Lista de Entradas — Row Cards

### Estrutura HTML (substituir `<table>` no bloco de "recentEntries")

```html
<div class="entries-list">
  <template x-for="e in sortedEntries()" :key="e.id">
    <div class="entry-row"
         x-transition:enter-start="entry-slide-start"
         x-transition:enter-end="entry-slide-end">
      <div class="entry-date-badge">
        <span class="badge-day-name" x-text="dayName(e.date)"></span>
        <span class="badge-day-num" x-text="dayNum(e.date)"></span>
      </div>
      <div class="entry-info">
        <div class="entry-company" x-text="cname(e.companyId)"></div>
        <div class="entry-times" x-text="entryTimeLine(e)"></div>
      </div>
      <div class="entry-right">
        <div class="entry-total" x-text="fmt(calcMinutes(e))"></div>
        <div class="entry-actions">
          <button class="act-btn" @click="editEntry(e.id)" x-text="t('edit')"></button>
          <button class="act-btn danger" @click="deleteEntry(e.id)">✕</button>
        </div>
      </div>
    </div>
  </template>
</div>
```

### CSS para a lista

```css
.entries-list { display: flex; flex-direction: column; gap: 7px; }

.entry-row {
  background: #fff; border: 1px solid #e8edf2; border-radius: 10px;
  padding: 10px 14px; display: flex; align-items: center; gap: 12px;
  transition: box-shadow .15s, transform .2s cubic-bezier(.16,1,.3,1), opacity .2s cubic-bezier(.16,1,.3,1);
}
.entry-row:hover { box-shadow: 0 3px 10px rgba(15,23,42,.07); transform: translateY(-1px); }

/* Alpine x-transition slide-in para novas entradas */
.entry-slide-start { opacity: 0; transform: translateY(-8px); }
.entry-slide-end   { opacity: 1; transform: translateY(0); }

.entry-date-badge {
  width: 40px; height: 40px; border-radius: 9px;
  background: #f0fdf4; border: 1px solid #6ee7b7;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.badge-day-name { font-size: 8px; font-weight: 700; color: #059669; text-transform: uppercase; }
.badge-day-num { font-size: 17px; font-weight: 800; color: #0f172a; line-height: 1; }

.entry-info { flex: 1; min-width: 0; }
.entry-company { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
.entry-times { font-size: 11px; color: #64748b; font-variant-numeric: tabular-nums; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.entry-right { text-align: right; flex-shrink: 0; }
.entry-total { font-size: 16px; font-weight: 800; color: #059669; font-variant-numeric: tabular-nums; line-height: 1; margin-bottom: 4px; }

.entry-actions { display: flex; gap: 4px; justify-content: flex-end; }
.act-btn {
  border: 1px solid #e2e8f0; background: #fff; border-radius: 5px;
  padding: 3px 8px; font-size: 10px; font-weight: 600; color: #64748b;
  cursor: pointer; transition: all .12s; font-family: inherit;
}
.act-btn:hover { background: #f8fafc; }
.act-btn:active { transform: scale(0.95); }
.act-btn.danger { color: #dc2626; border-color: #fca5a5; background: #fff5f5; }
.act-btn.danger:hover { background: #fee2e2; }

/* Obs: slide-in já definido junto com .entry-row acima */
```

### Helpers JS necessários em `app.js`

Adicionar dois métodos auxiliares (sem alterar lógica existente):

```js
dayName(iso) {
  const days = this.lang === 'pt'
    ? ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
    : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return days[new Date(iso + 'T12:00:00').getDay()];
},
dayNum(iso) {
  return iso.slice(8); // "2026-05-23" → "23"
},
entryTimeLine(e) {
  const lunch = e.noLunch
    ? (this.lang === 'pt' ? 'sem almoço' : 'no lunch')
    : `${this.lang === 'pt' ? 'almoço' : 'lunch'} ${e.lunchOut}–${e.lunchReturn}`;
  return `${e.entryTime} → ${e.exitTime} · ${lunch}`;
},
```

---

## 9. Animações/Transições

```css
/* Tab switch — fade suave (já existe x-transition no Alpine, só confirmar) */
[x-cloak] { display: none !important; }

/* Todos os botões */
button { transition: background .15s, transform .1s, box-shadow .15s, opacity .15s; }
```

O `x-transition` padrão do Alpine já faz fade em/out para os `x-show`. Não é preciso configuração extra além do que Alpine oferece por padrão.

---

## 10. Auth Screen — ajustes menores

- Trocar `⏱` por SVG de relógio/timer
- Trocar `auth-logo` de emoji para SVG 40×40 stroke emerald
- Paleta já pega automaticamente com as mudanças de CSS

---

## CSS a remover

Com a tabela substituída por row cards, remover do `style.css` os blocos:
- `.table-wrap`
- `table`, `th`, `td`, `tfoot`, `tr:hover td`, `tr.week-sub td`

(Esses seletores ainda são usados na aba Reports — **não remover**, só checar se relatório usa outra tabela. Confirmado: Reports usa `<table>` própria, então **manter** esses estilos. Apenas a tabela de "Lançamentos Recentes" é substituída.)

---

## O que NÃO muda

- Toda a lógica de Alpine.js (`init`, `submitEntry`, `generateReport`, sync, etc.)
- Estrutura das abas Companies e Reports (apenas paleta)
- Estrutura do modal de settings
- Sync banner (apenas paleta)
- Exportação PDF/XLSX

---

## Ordem de implementação sugerida

1. Google Fonts link no `<head>`
2. Paleta completa em `style.css` (substituições globais)
3. Componentes refatorados em `style.css` (week card, entries list, botões)
4. SVGs em `index.html` (ícones do header, week nav, auth logo, botões)
5. Estrutura da lista de entradas em `index.html` (substituir `<table>` por row cards)
6. Helpers `dayName`, `dayNum`, `entryTimeLine` em `app.js`
7. Smoke test: adicionar entrada, verificar slide-in; navegar semanas; gerar relatório
