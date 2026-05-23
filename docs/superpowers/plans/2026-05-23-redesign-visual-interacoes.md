# Redesign Visual + Micro-interações — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar redesign visual completo (paleta Minimal Pro + DM Sans + emerald accent + SVG icons) e micro-interações (tactile buttons, hover lift, slide-in) sem alterar nenhuma lógica de negócio.

**Architecture:** Três arquivos modificados — `style.css` recebe toda a nova paleta e componentes, `index.html` recebe os SVGs inline e a nova estrutura da lista de entradas, `app.js` recebe três métodos helpers sem alterar lógica existente. Cada task produz um resultado visível e commitável isoladamente.

**Tech Stack:** CSS puro, Alpine.js v3 (CDN), Google Fonts CDN. Sem npm, sem build step.

---

## Arquivos modificados

| Arquivo | O que muda |
|---|---|
| `index.html` | Google Fonts link, SVGs inline (6 pontos), HTML da lista de entradas (tabela → row cards) |
| `style.css` | Paleta completa, DM Sans, week card, botões, formulário, entry list (novos seletores) |
| `app.js` | +3 métodos helpers: `dayName`, `dayNum`, `entryTimeLine` |

---

## Task 1: Tipografia — DM Sans

**Files:**
- Modify: `index.html` (head, linhas 1–14)
- Modify: `style.css` (linha 4, seletor `body`)

- [ ] **Step 1: Adicionar Google Fonts no `<head>` do index.html**

Inserir imediatamente antes de `<link rel="stylesheet" href="style.css">`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Atualizar font-stack no style.css**

Substituir o seletor `body` existente:

```css
body {
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f8fafc;
  color: #1a202c;
  min-height: 100vh;
}
```

- [ ] **Step 3: Verificar**

Abrir `https://cassiostocco.github.io/horas` (ou abrir `index.html` diretamente).  
Verificar no DevTools → Network que `DM+Sans` foi carregada.  
O texto do app deve estar visivelmente diferente (DM Sans é mais geométrica que Segoe UI/Roboto).

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "style: add DM Sans font via Google Fonts CDN"
```

---

## Task 2: Paleta de Cores — Substituições Globais

**Files:**
- Modify: `style.css` (toda a paleta)

> Todas as substituições são em `style.css`. Fazer replace-all para cada par.

- [ ] **Step 1: Trocar background do body**

Já feito na Task 1. Confirmar que `background: #f0f4f8` não aparece mais em nenhum lugar em `style.css`.

- [ ] **Step 2: Trocar cor do header**

Substituir todas as ocorrências de `#1a365d` por `#0f172a` em `style.css`.  
Afeta: `.auth-overlay`, `.auth-app-title`, `.modal-header h2`, `header`, `.card h2`, `.sbox-value`.

- [ ] **Step 3: Trocar accent blue → emerald**

Substituições em `style.css`:

| Buscar | Substituir por |
|---|---|
| `#3182ce` | `#059669` |
| `#2563eb` | `#059669` |
| `#1d4ed8` | `#047857` |
| `rgba(49,130,206,.15)` | `rgba(5,150,105,.12)` |
| `#63b3ed` | `#059669` |
| `#2b6cb0` | `#059669` |
| `#ebf8ff` | `#f0fdf4` |
| `#bee3f8` | `#6ee7b7` |
| `#90cdf4` | `#6ee7b7` |

- [ ] **Step 4: Ajustar card border e shadow**

Localizar o seletor `.card` em `style.css` e atualizar para:

```css
.card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
  border: 1px solid #e8edf2;
  box-shadow: 0 1px 3px rgba(15,23,42,.06);
}
```

- [ ] **Step 5: Atualizar nav tab ativa**

Localizar `nav button.active` em `style.css` e garantir:

```css
nav button.active { color: #34d399; border-bottom-color: #059669; }
```

- [ ] **Step 6: Verificar**

Abrir o app. O header deve estar preto grafite. Botões primários (se houver) devem estar verdes. O app ainda deve funcionar normalmente.

- [ ] **Step 7: Commit**

```bash
git add style.css
git commit -m "style: apply Minimal Pro color palette (slate-900 + emerald)"
```

---

## Task 3: Componentes CSS — Botões, Header, Formulário, Week Card

**Files:**
- Modify: `style.css`

- [ ] **Step 1: Header — title e nav**

Substituir os seletores existentes `.header-inner h1` e `nav button.active`:

```css
.header-inner h1 { font-size: 15px; font-weight: 800; letter-spacing: -.3px; }

nav button.active { color: #34d399; border-bottom-color: #059669; }
```

- [ ] **Step 2: Botão primário com tactile feedback**

Substituir o bloco `.btn-primary` existente:

```css
.btn-primary {
  background: #059669;
  color: #fff;
  border: none;
  padding: .55rem 1.3rem;
  border-radius: 7px;
  cursor: pointer;
  font-size: .875rem;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(5,150,105,.3);
  transition: background .15s, transform .1s cubic-bezier(.16,1,.3,1), box-shadow .15s;
}
.btn-primary:hover { background: #047857; box-shadow: 0 3px 10px rgba(5,150,105,.35); }
.btn-primary:active { transform: scale(0.97); box-shadow: 0 1px 3px rgba(5,150,105,.2); }
```

- [ ] **Step 3: Botões secundário e icon com tactile feedback**

Adicionar ao bloco `.btn-secondary` e `.btn-icon` existentes:

```css
.btn-secondary:active { transform: scale(0.97); }
.btn-icon:active { transform: scale(0.95); }
```

- [ ] **Step 4: Botão "Horário Padrão"**

Substituir `.btn-fill-defaults` em `style.css`:

```css
.btn-fill-defaults {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  width: 100%; padding: .65rem 1rem; margin-bottom: .75rem;
  background: #f0fdf4; color: #059669;
  border: 1.5px solid #6ee7b7;
  border-radius: 9px; font-size: .95rem; font-weight: 700; cursor: pointer; text-align: center;
  transition: background .15s;
}
.btn-fill-defaults:hover { background: #dcfce7; }
.btn-fill-defaults:active { transform: scale(0.98); }
```

- [ ] **Step 5: Formulário — focus state e day-preview**

Substituir os seletores `input:focus, select:focus` e `.day-preview`:

```css
input:focus, select:focus {
  outline: none;
  border-color: #059669;
  box-shadow: 0 0 0 3px rgba(5,150,105,.12);
}

.day-preview {
  display: flex; align-items: center; gap: 6px;
  margin-top: .85rem;
  padding: .5rem .875rem;
  background: #f0fdf4;
  border-radius: 7px;
  font-size: .875rem;
  color: #059669;
  font-weight: 600;
}
.day-preview svg { width: 14px; height: 14px; flex-shrink: 0; }
```

- [ ] **Step 6: Week card — cells atualizadas**

Substituir os seletores `.week-cell`, `.wc-today`, `.wc-has`, `.wc-has .wc-total` e `.week-today-btn`:

```css
.week-cell {
  border-radius: 10px; padding: .5rem .2rem; text-align: center;
  border: 1.5px solid #e2e8f0; cursor: pointer;
  transition: transform .12s cubic-bezier(.16,1,.3,1), box-shadow .12s;
  user-select: none;
}
.week-cell:hover:not(.wc-future) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.1); }

.wc-today { box-shadow: 0 0 0 2px #059669 !important; }
.wc-today .wc-name { color: #059669; }

.wc-has { background: #f0fdf4; border-color: #6ee7b7; }
.wc-has .wc-total { color: #059669; }

.week-today-btn {
  color: #059669; background: #f0fdf4;
  border: 1px solid #6ee7b7; border-radius: 6px;
  font-size: .75rem; font-weight: 700;
  padding: .2rem .55rem; white-space: nowrap;
  cursor: pointer; transition: background .15s;
}
.week-today-btn:hover { background: #dcfce7; }
```

- [ ] **Step 7: Transição global de botões**

Adicionar após o reset no topo do `style.css` (após `*, *::before, *::after { ... }`):

```css
button { transition: background .15s, transform .1s, box-shadow .15s, opacity .15s; }
```

- [ ] **Step 8: Verificar**

Abrir o app. Clicar em "Adicionar" — deve pressionar visualmente (scale). Clicar em uma week cell — deve levantar no hover. Input em foco deve ter borda e glow verde.

- [ ] **Step 9: Commit**

```bash
git add style.css
git commit -m "style: tactile buttons, emerald focus ring, week card + form refinements"
```

---

## Task 4: CSS da Lista de Entradas — Row Cards

**Files:**
- Modify: `style.css` (adicionar novos seletores, manter os de tabela para Reports)

- [ ] **Step 1: Adicionar CSS da entry list**

Adicionar ao final de `style.css` (antes do `/* ── Footer ── */`):

```css
/* ── Entry list (row cards) ── */
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
.badge-day-num  { font-size: 17px; font-weight: 800; color: #0f172a; line-height: 1; }

.entry-info { flex: 1; min-width: 0; }
.entry-company { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
.entry-times {
  font-size: 11px; color: #64748b;
  font-variant-numeric: tabular-nums;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.entry-right { text-align: right; flex-shrink: 0; }
.entry-total {
  font-size: 16px; font-weight: 800; color: #059669;
  font-variant-numeric: tabular-nums; line-height: 1; margin-bottom: 4px;
}

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
```

- [ ] **Step 2: Commit**

```bash
git add style.css
git commit -m "style: add entry list row-card CSS classes"
```

---

## Task 5: SVG Icons no index.html

**Files:**
- Modify: `index.html`

> Todos os SVGs usam `stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"` salvo indicação.

- [ ] **Step 1: Auth logo — trocar ⏱ por SVG de relógio**

Localizar em `index.html`:
```html
<div class="auth-logo">⏱</div>
```

Substituir por:
```html
<div class="auth-logo">
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
       stroke="#059669" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
</div>
```

Atualizar `.auth-logo` em `style.css` para remover `font-size: 2.5rem` (se existir) e usar apenas `margin-bottom: .5rem`.

- [ ] **Step 2: Header — settings ⚙ → SVG gear**

Localizar:
```html
<button class="icon-btn" @click="showSettings=true" title="Configurações">⚙</button>
```

Substituir por:
```html
<button class="icon-btn" @click="showSettings=true" title="Configurações">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
</button>
```

- [ ] **Step 3: Header — sync dot ↻ → SVG rotativo**

Localizar:
```html
<span class="sync-dot" x-show="syncStatus==='syncing'" title="Sincronizando...">↻</span>
```

Substituir por:
```html
<span class="sync-dot" x-show="syncStatus==='syncing'" title="Sincronizando...">
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12a9 9 0 1 1-2.63-6.36"/>
    <path d="M21 4v6h-6"/>
  </svg>
</span>
```

Atualizar `.sync-dot` em `style.css`:
```css
.sync-dot {
  color: #34d399; line-height: 1;
  animation: spin 1s linear infinite; display: inline-flex;
}
```

- [ ] **Step 4: Header — logout ⏻ → SVG power**

Localizar:
```html
<button class="icon-btn icon-btn-danger" @click="signOut()" :title="t('logout')">⏻</button>
```

Substituir por:
```html
<button class="icon-btn icon-btn-danger" @click="signOut()" :title="t('logout')">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3v9"/>
    <path d="M7.07 5.93A9 9 0 1 0 16.93 5.93"/>
  </svg>
</button>
```

- [ ] **Step 5: Week nav — chevron arrows**

Localizar:
```html
<button class="btn-icon" @click="weekNav--">&#8592;</button>
```
Substituir por:
```html
<button class="btn-icon" @click="weekNav--">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
</button>
```

Localizar:
```html
<button class="btn-icon" @click="weekNav++" :disabled="weekNav >= 0">&#8594;</button>
```
Substituir por:
```html
<button class="btn-icon" @click="weekNav++" :disabled="weekNav >= 0">
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
</button>
```

- [ ] **Step 6: Botão "Horário Padrão" — ⚡ → SVG**

Localizar:
```html
<button class="btn-fill-defaults" x-show="!editingId" @click="applyDefaults()" x-text="t('fillDefaults')"></button>
```

Substituir por (o texto via i18n vai depois do SVG):
```html
<button class="btn-fill-defaults" x-show="!editingId" @click="applyDefaults()">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M13 5H3M17 12H3M13 19H3M21 12l-4-4v8l4-4z"/>
  </svg>
  <span x-text="t('fillDefaults')"></span>
</button>
```

- [ ] **Step 7: Day-preview — adicionar ícone de relógio**

Localizar:
```html
<div class="day-preview" x-show="form.entryTime && form.exitTime">
  <span x-text="t('dayTotal') + ': ' + previewTotal()"></span>
</div>
```

Substituir por:
```html
<div class="day-preview" x-show="form.entryTime && form.exitTime">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l3 3"/>
  </svg>
  <span x-text="t('dayTotal') + ': ' + previewTotal()"></span>
</div>
```

- [ ] **Step 8: Verificar**

Abrir o app. Confirmar:
- Auth screen tem ícone de relógio verde (não emoji)
- Header tem gear, sync SVG animado (só aparece ao salvar), power button
- Week card tem chevrons < e >
- Botão "Horário Padrão" tem ícone de seta
- Day-preview mostra ícone de relógio quando entrada/saída preenchidos

- [ ] **Step 9: Commit**

```bash
git add index.html style.css
git commit -m "style: replace all emoji with inline SVG icons"
```

---

## Task 6: Estrutura HTML — Tabela → Row Cards

**Files:**
- Modify: `index.html` (bloco `recentEntries`, linhas ~197–233)

- [ ] **Step 1: Substituir o bloco da tabela de lançamentos recentes**

Localizar em `index.html` o bloco inteiro (começa em `<div class="card">` com `<h2 x-text="t('recentEntries')">` e termina no `</div>` do card):

```html
<div class="card">
  <h2 x-text="t('recentEntries')"></h2>
  <div class="empty" x-show="entries.length===0" x-text="t('noEntries')"></div>
  <div class="table-wrap" x-show="entries.length>0">
    <table>
      <thead>
        <tr>
          <th x-text="t('date')"></th>
          <th x-text="t('company')"></th>
          <th x-text="t('entryTime')"></th>
          <th x-text="t('lunchOut')"></th>
          <th x-text="t('lunchReturn')"></th>
          <th x-text="t('exitTime')"></th>
          <th x-text="t('total')"></th>
          <th x-text="t('actions')"></th>
        </tr>
      </thead>
      <tbody>
        <template x-for="e in sortedEntries()" :key="e.id">
          <tr>
            <td x-text="fmtDateWithDay(e.date)"></td>
            <td x-text="cname(e.companyId)"></td>
            <td x-text="e.entryTime"></td>
            <td x-text="e.noLunch ? '—' : (e.lunchOut||'—')"></td>
            <td x-text="e.noLunch ? '—' : (e.lunchReturn||'—')"></td>
            <td x-text="e.exitTime"></td>
            <td x-text="fmt(calcMinutes(e))"></td>
            <td>
              <button class="btn-icon" @click="editEntry(e.id)" x-text="t('edit')"></button>
              <button class="btn-icon btn-danger" @click="deleteEntry(e.id)" x-text="t('delete')"></button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</div>
```

Substituir pelo bloco de row cards:

```html
<div class="card">
  <h2 x-text="t('recentEntries')"></h2>
  <div class="empty" x-show="entries.length===0" x-text="t('noEntries')"></div>
  <div class="entries-list" x-show="entries.length>0">
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
</div>
```

- [ ] **Step 2: Verificar no browser que os dados existentes aparecem**

Abrir o app (pode precisar de servidor local — usar `python -m http.server` ou similar já que Google Fonts e GIS precisam de HTTP).  
A seção "Lançamentos" deve mostrar os entries como cards horizontais com badge de data à esquerda.  
Confirmar que os botões Editar/Excluir ainda funcionam.

> **Nota:** O slide-in (`x-transition:enter-start/end`) só é visível quando um novo entry é adicionado — não ao carregar a página (Alpine não transiciona itens já presentes no x-for inicial).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: replace entries table with row card list layout"
```

---

## Task 7: Helpers JS + Smoke Test + Deploy

**Files:**
- Modify: `app.js` (adicionar 3 métodos após `previewTotal`, linha ~790)

- [ ] **Step 1: Adicionar os três helpers em app.js**

Localizar em `app.js` (linha ~789–790):
```js
cname(id) { return this.companies.find(c=>c.id===id)?.name ?? '?'; },
previewTotal() { return this.fmt(this.calcMinutes(this.form)); },
```

Inserir após `previewTotal`:
```js
dayName(iso) {
  const days = this.lang === 'pt'
    ? ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
    : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return days[new Date(iso + 'T12:00:00').getDay()];
},
dayNum(iso) {
  return iso.slice(8);
},
entryTimeLine(e) {
  const lunch = e.noLunch
    ? (this.lang === 'pt' ? 'sem almoço' : 'no lunch')
    : `${this.lang === 'pt' ? 'almoço' : 'lunch'} ${e.lunchOut}–${e.lunchReturn}`;
  return `${e.entryTime} → ${e.exitTime} · ${lunch}`;
},
```

- [ ] **Step 2: Smoke test — adicionar novo lançamento**

1. Abrir o app e fazer login
2. Ir para aba Lançamentos
3. Preencher o formulário (empresa, data de hoje, 08:00–17:00, com almoço 12:00–13:00)
4. Clicar "Adicionar"
5. Verificar:
   - O novo card aparece no topo da lista com slide-in (deve deslizar de cima)
   - O badge de data mostra o dia abreviado correto (ex: "Sex") e o número do dia
   - A linha de horários mostra "08:00 → 17:00 · almoço 12:00–13:00"
   - O total mostra "8h00" em verde bold

- [ ] **Step 3: Smoke test — editar e excluir**

1. Clicar "Editar" em um card existente
2. Confirmar que o formulário é preenchido (comportamento anterior)
3. Clicar "✕" em um card
4. Confirmar que a confirmação de exclusão aparece e o card some após confirmação

- [ ] **Step 4: Smoke test — trocar idioma**

1. Clicar "EN" no header
2. Verificar que os badges de data mudam para abreviações em inglês ("Mon", "Tue", etc.)
3. Verificar que "almoço" muda para "lunch" na linha de horários
4. Clicar "PT" e confirmar que volta ao português

- [ ] **Step 5: Smoke test — aba Reports**

1. Ir para aba Relatórios
2. Selecionar um período e gerar relatório
3. Confirmar que a tabela do relatório ainda aparece corretamente (seletores de tabela foram mantidos)
4. Confirmar que o total e OT aparecem com a cor emerald

- [ ] **Step 6: Smoke test — mobile**

Usar DevTools (F12 → Toggle device toolbar) em 375px de largura.  
Verificar que:
- Os cards de entrada não cortam o conteúdo horizontalmente
- A `.entry-times` trunca com ellipsis se necessário
- Os botões Editar/✕ estão acessíveis

- [ ] **Step 7: Commit e deploy**

```bash
git add app.js
git commit -m "feat: add dayName/dayNum/entryTimeLine helpers for entry row cards"
git push origin main
```

Aguardar ~1 min e abrir `https://cassiostocco.github.io/horas` para confirmar o deploy.

---

## Self-Review

**Spec coverage:**
- [x] Tipografia DM Sans → Task 1
- [x] Paleta slate-900 + emerald → Task 2
- [x] Card border #e8edf2 → Task 2 Step 4
- [x] Nav tab ativa emerald → Task 2 Step 5 + Task 3 Step 1
- [x] Botões tactile feedback → Task 3 Steps 2–3
- [x] Btn-fill-defaults emerald → Task 3 Step 4
- [x] Focus ring emerald → Task 3 Step 5
- [x] Day-preview emerald → Task 3 Step 5
- [x] Week card cells → Task 3 Step 6
- [x] CSS entry list → Task 4
- [x] SVG auth logo → Task 5 Step 1
- [x] SVG header icons (gear, sync, power) → Task 5 Steps 2–4
- [x] SVG week nav arrows → Task 5 Step 5
- [x] SVG defaults btn + day-preview icon → Task 5 Steps 6–7
- [x] HTML tabela → row cards → Task 6
- [x] JS helpers dayName/dayNum/entryTimeLine → Task 7 Step 1
- [x] Smoke tests → Task 7 Steps 2–6
- [x] Deploy → Task 7 Step 7

**Nota:** A spec menciona `button { transition: ... }` global — incluído em Task 3 Step 7. Coberto.
