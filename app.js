const CLIENT_ID = '750076288563-59u39gs5eiucjt6kdcjvfne0h8i90bf9.apps.googleusercontent.com';

let tokenClient = null;

// Called by Google Identity Services script onload
function initGoogleSignIn() {
  // Identity sign-in — uses FedCM or One Tap overlay, never a popup
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: (credentialResponse) => {
      if (window._handleGoogleCredential) window._handleGoogleCredential(credentialResponse);
    },
    auto_select: true,
    cancel_on_tap_outside: false,
  });

  // Token client — only for Sheets/Drive, requested on user action (no popup block risk)
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file'
    ].join(' '),
    callback: ''
  });

  // Attempt silent auto sign-in on page load
  google.accounts.id.prompt((notification) => {
    if ((notification.isNotDisplayed() || notification.isSkippedMoment()) && window._gauthLoadingDone) {
      window._gauthLoadingDone();
    }
  });
}

// ── i18n ──────────────────────────────────────────────────────
const i18n = {
  pt: {
    appTitle: 'Controle de Carga Horária',
    navEntries: 'Lançamentos',
    navCompanies: 'Empresas',
    navReports: 'Relatórios',
    newEntry: 'Novo Lançamento',
    editEntry: 'Editar Lançamento',
    company: 'Empresa',
    selectCompany: '— Selecione a empresa —',
    date: 'Data',
    entryTime: 'Entrada',
    exitTime: 'Saída',
    lunchOut: 'Saída Almoço',
    lunchReturn: 'Retorno Almoço',
    noLunch: 'Sem pausa para almoço',
    add: 'Adicionar',
    save: 'Salvar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Excluir',
    remove: 'Remover',
    recentEntries: 'Lançamentos',
    noEntries: 'Nenhum lançamento ainda.',
    dayTotal: 'Total do dia',
    total: 'Total',
    weekOf: 'Semana de',
    weekSubtotal: 'Subtotal semana',
    actions: 'Ações',
    manageCompanies: 'Gerenciar Empresas',
    companyName: 'Nome da empresa',
    addCompany: 'Adicionar',
    noCompanies: 'Nenhuma empresa cadastrada.',
    filters: 'Filtros e Relatório',
    from: 'De',
    to: 'Até',
    companies: 'Empresas',
    allCompanies: 'Todas',
    generate: 'Gerar Relatório',
    exportPDF: 'Exportar PDF',
    exportXLSX: 'Exportar XLSX',
    syncSheets: 'Backup Sheets',
    totalFiltered: 'Total no período',
    overtime: 'Horas extras',
    overtimeNote: '(acima de 44h/semana)',
    companyTotal: 'Total da empresa',
    noData: 'Nenhum dado encontrado.',
    confirmDelete: 'Excluir este lançamento?',
    confirmRemoveCompany: 'Remover empresa? Os lançamentos serão mantidos.',
    errorNoCompany: 'Selecione uma empresa.',
    errorNoDate: 'Informe a data.',
    errorNoTimes: 'Informe entrada e saída.',
    errorCompanyExists: 'Empresa já cadastrada.',
    errorCompanyEmpty: 'Informe o nome da empresa.',
    errorCompanyHasEntries: 'Não é possível remover: há lançamentos nesta empresa.',
    period: 'Período',
    monthNames: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    noCompanyForEntry: 'Cadastre ao menos uma empresa antes de lançar horas.',
    weekdayNames: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    // auth
    signInTitle: 'Bem-vindo',
    signInSubtitle: 'Entre com sua conta Google para acessar seus dados.',
    signInBtn: 'Entrar com Google',
    continueBtn: 'Continuar',
    signInLoading: 'Entrando...',
    signInError: 'Erro ao entrar. Tente novamente.',
    logout: 'Sair',
    welcomeBack: 'Bem-vindo de volta',
    // sheets sync
    syncing: 'Sincronizando...',
    syncDone: 'Backup salvo no Google Sheets!',
    syncError: 'Erro ao sincronizar. Tente novamente.',
    // hosting
    settings: 'Publicar no GitHub Pages',
    hostingStep1: '1. Crie uma conta em github.com (gratuito)',
    hostingStep2: '2. Crie um repositório novo (ex: "horas")',
    hostingStep3: '3. Faça upload: index.html, app.js, style.css',
    hostingStep4: '4. Settings → Pages → Branch: main → Save',
    hostingStep5: '5. Link: https://seuusuario.github.io/horas',
    hostingStep6: '6. Compartilhe com seus colegas',
    closeModal: 'Fechar',
    showTotals: 'Incluir totais de horas no relatório',
    weekOverview: 'Resumo da semana',
    today: 'Hoje',
    errorInvalidTime: 'Horário inválido. Digite no formato HH:MM (ex: 08:30).',
  },
  en: {
    appTitle: 'Work Hours Tracker',
    navEntries: 'Time Entries',
    navCompanies: 'Companies',
    navReports: 'Reports',
    newEntry: 'New Entry',
    editEntry: 'Edit Entry',
    company: 'Company',
    selectCompany: '— Select company —',
    date: 'Date',
    entryTime: 'Clock In',
    exitTime: 'Clock Out',
    lunchOut: 'Lunch Out',
    lunchReturn: 'Lunch Return',
    noLunch: 'No lunch break',
    add: 'Add',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    remove: 'Remove',
    recentEntries: 'Time Entries',
    noEntries: 'No entries yet.',
    dayTotal: 'Day total',
    total: 'Total',
    weekOf: 'Week of',
    weekSubtotal: 'Week subtotal',
    actions: 'Actions',
    manageCompanies: 'Manage Companies',
    companyName: 'Company name',
    addCompany: 'Add',
    noCompanies: 'No companies registered.',
    filters: 'Filters & Report',
    from: 'From',
    to: 'To',
    companies: 'Companies',
    allCompanies: 'All',
    generate: 'Generate Report',
    exportPDF: 'Export PDF',
    exportXLSX: 'Export XLSX',
    syncSheets: 'Sheets Backup',
    totalFiltered: 'Total in period',
    overtime: 'Overtime',
    overtimeNote: '(above 44h/week)',
    companyTotal: 'Company total',
    noData: 'No data found.',
    confirmDelete: 'Delete this entry?',
    confirmRemoveCompany: 'Remove company? Entries will be kept.',
    errorNoCompany: 'Please select a company.',
    errorNoDate: 'Please enter a date.',
    errorNoTimes: 'Please enter clock in and clock out times.',
    errorCompanyExists: 'Company already exists.',
    errorCompanyEmpty: 'Please enter a company name.',
    errorCompanyHasEntries: 'Cannot remove: company has time entries.',
    period: 'Period',
    monthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    noCompanyForEntry: 'Add at least one company before logging hours.',
    weekdayNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    // auth
    signInTitle: 'Welcome',
    signInSubtitle: 'Sign in with your Google account to access your data.',
    signInBtn: 'Sign in with Google',
    continueBtn: 'Continue',
    signInLoading: 'Signing in...',
    signInError: 'Sign-in error. Please try again.',
    logout: 'Sign out',
    welcomeBack: 'Welcome back',
    // sheets sync
    syncing: 'Syncing...',
    syncDone: 'Backup saved to Google Sheets!',
    syncError: 'Sync error. Please try again.',
    // hosting
    settings: 'Publish on GitHub Pages',
    hostingStep1: '1. Create an account at github.com (free)',
    hostingStep2: '2. Create a new repository (e.g. "horas")',
    hostingStep3: '3. Upload: index.html, app.js, style.css',
    hostingStep4: '4. Settings → Pages → Branch: main → Save',
    hostingStep5: '5. Link: https://yourusername.github.io/horas',
    hostingStep6: '6. Share the link with your coworkers',
    closeModal: 'Close',
    showTotals: 'Include hour totals in report',
    weekOverview: 'Week overview',
    today: 'Today',
    errorInvalidTime: 'Invalid time. Use HH:MM format (e.g. 08:30).',
  }
};

// ── Alpine component ──────────────────────────────────────────
function app() {
  return {
    lang: 'pt',
    tab: 'entries',
    companies: [],
    entries: [],
    form: {
      companyId: '', date: '', entryTime: '', exitTime: '',
      lunchOut: '', lunchReturn: '', noLunch: false
    },
    editingId: null,
    formError: '',
    newCompanyName: '',
    companyError: '',
    report: { dateFrom: '', dateTo: '', selectedCompanies: [], showTotals: true },
    reportData: [],
    reportTotals: { total: 0, overtime: 0 },
    reportGenerated: false,
    weekNav: 0, // week offset from current (0 = this week, -1 = last week, …)

    // Google auth
    gauth: {
      unlocked: false,
      user: null,       // { email, name, picture }
      accessToken: null,
      tokenExpiry: 0,
      loading: false,
      error: ''
    },

    showSettings: false,
    syncStatus: '', // '' | 'syncing' | 'done' | 'error'

    // ── lifecycle ────────────────────────────────────────────

    init() {
      this.lang = localStorage.getItem('horas_lang') || 'pt';

      try {
        const saved = localStorage.getItem('horas_user');
        if (saved) {
          this.gauth.user = JSON.parse(saved);
          this.gauth.loading = true; // show spinner while auto sign-in runs
        }
      } catch (_) {}

      // Receives credential from google.accounts.id (FedCM / One Tap)
      window._handleGoogleCredential = (credResponse) => {
        try {
          const [, b64] = credResponse.credential.split('.');
          const payload = JSON.parse(atob(b64.replace(/-/g, '+').replace(/_/g, '/')));
          this.gauth.user = { email: payload.email, name: payload.name, picture: payload.picture };
          localStorage.setItem('horas_user', JSON.stringify(this.gauth.user));
          this.loadUserData();
          this.gauth.unlocked = true;
        } catch (_) {
          this.gauth.error = this.t('signInError');
        }
        this.gauth.loading = false;
      };

      // Called when auto sign-in can't run silently — let user click manually
      window._gauthLoadingDone = () => { this.gauth.loading = false; };
    },

    loadUserData() {
      const email = this.gauth.user.email;
      const key = 'horas_v1_' + email;

      // Migrate from old non-email key (one-time)
      let raw = localStorage.getItem(key);
      if (!raw) {
        const legacy = localStorage.getItem('horas_v1');
        if (legacy) {
          localStorage.setItem(key, legacy);
          localStorage.removeItem('horas_v1');
          raw = legacy;
        }
      }

      if (raw) {
        try {
          const d = JSON.parse(raw);
          this.companies = d.companies || [];
          this.entries = d.entries || [];
        } catch (_) {}
      } else {
        this.companies = [];
        this.entries = [];
      }

      this.form.date = todayStr();
      this.report.selectedCompanies = this.companies.map(c => c.id);
    },

    persist() {
      if (!this.gauth.user) return;
      const key = 'horas_v1_' + this.gauth.user.email;
      localStorage.setItem(key, JSON.stringify({
        companies: this.companies,
        entries: this.entries
      }));
    },

    // ── i18n ────────────────────────────────────────────────

    t(key) { return i18n[this.lang][key] ?? key; },

    toggleLang() {
      this.lang = this.lang === 'pt' ? 'en' : 'pt';
      localStorage.setItem('horas_lang', this.lang);
    },

    // ── Google auth ──────────────────────────────────────────

    signIn() {
      if (!window.google?.accounts?.id) { this.gauth.error = this.t('signInError'); return; }
      this.gauth.loading = true;
      this.gauth.error = '';
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          this.gauth.loading = false;
          // One Tap couldn't display — render Google's button as fallback
          const el = document.getElementById('g-signin-fallback');
          if (el) {
            google.accounts.id.renderButton(el, { theme: 'outline', size: 'large', width: 260 });
            el.style.display = 'flex';
          }
        }
      });
    },

    signOut() {
      if (this.gauth.accessToken) google.accounts.oauth2.revoke(this.gauth.accessToken, () => {});
      if (this.gauth.user?.email) google.accounts.id.revoke(this.gauth.user.email, () => {});
      google.accounts.id.disableAutoSelect();
      this.gauth.unlocked = false;
      this.gauth.accessToken = null;
      this.gauth.user = null;
      this.gauth.error = '';
      localStorage.removeItem('horas_user');
      this.companies = [];
      this.entries = [];
    },

    // ── token refresh ────────────────────────────────────────

    async ensureToken() {
      if (this.gauth.accessToken && Date.now() < this.gauth.tokenExpiry) return true;
      const ask = (prompt) => new Promise((resolve) => {
        tokenClient.callback = (resp) => {
          if (resp.error) { resolve(false); return; }
          this.gauth.accessToken = resp.access_token;
          this.gauth.tokenExpiry = Date.now() + (resp.expires_in - 60) * 1000;
          resolve(true);
        };
        tokenClient.requestAccessToken({ prompt });
      });
      // Try silent first; if no prior consent, ask explicitly (popup allowed — triggered by user click)
      const ok = await ask('');
      return ok || ask('consent');
    },

    // ── Google Sheets sync ───────────────────────────────────

    async findOrCreateSpreadsheet() {
      const key = 'horas_sheet_' + this.gauth.user.email;
      let sheetId = localStorage.getItem(key);

      if (sheetId) {
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=spreadsheetId`,
          { headers: { Authorization: `Bearer ${this.gauth.accessToken}` } }
        );
        if (res.ok) return sheetId;
      }

      // Create new spreadsheet
      const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.gauth.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: { title: 'Backup Horas' },
          sheets: [
            { properties: { title: 'Lancamentos', index: 0 } },
            { properties: { title: 'Log', index: 1 } }
          ]
        })
      });
      const data = await res.json();
      sheetId = data.spreadsheetId;
      localStorage.setItem(key, sheetId);
      return sheetId;
    },

    async syncToSheets() {
      this.syncStatus = 'syncing';
      try {
        const ok = await this.ensureToken();
        if (!ok) { this.syncStatus = 'error'; return; }

        const sheetId = await this.findOrCreateSpreadsheet();
        const token = this.gauth.accessToken;
        const base = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;

        // Build rows
        const cmap = {};
        this.companies.forEach(c => cmap[c.id] = c.name);
        const headers = ['Data','Empresa','Entrada','Saida Almoco','Retorno Almoco','Saida','Sem Almoco'];
        const rows = [headers];
        const sorted = [...this.entries].sort((a,b) => a.date.localeCompare(b.date));
        for (const e of sorted) {
          rows.push([
            e.date, cmap[e.companyId] || '?',
            e.entryTime,
            e.noLunch ? '' : (e.lunchOut || ''),
            e.noLunch ? '' : (e.lunchReturn || ''),
            e.exitTime,
            e.noLunch ? 'Sim' : 'Nao'
          ]);
        }

        // Clear then write
        await fetch(`${base}/values/Lancamentos!A:G:clear`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        await fetch(`${base}/values/Lancamentos!A1?valueInputOption=RAW`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: rows })
        });

        // Append log
        await fetch(`${base}/values/Log!A:C:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ values: [[new Date().toLocaleString('pt-BR'), this.entries.length, this.companies.length]] })
        });

        this.syncStatus = 'done';
      } catch (_) {
        this.syncStatus = 'error';
      }
      setTimeout(() => { this.syncStatus = ''; }, 5000);
    },

    // ── time helpers ─────────────────────────────────────────

    toMin(t) {
      if (!t) return null;
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    },

    calcMinutes(entry) {
      const start = this.toMin(entry.entryTime);
      let end = this.toMin(entry.exitTime);
      if (start === null || end === null) return 0;
      if (end <= start) end += 1440;
      let lunch = 0;
      if (!entry.noLunch && entry.lunchOut && entry.lunchReturn) {
        let lo = this.toMin(entry.lunchOut);
        let lr = this.toMin(entry.lunchReturn);
        if (lo < start) lo += 1440;
        if (lr <= lo) lr += 1440;
        lunch = Math.max(0, lr - lo);
      }
      return Math.max(0, end - start - lunch);
    },

    fmt(mins) {
      if (!mins && mins !== 0) return '';
      const abs = Math.abs(mins);
      return (mins < 0 ? '-' : '') + Math.floor(abs/60) + 'h' + String(abs%60).padStart(2,'0');
    },

    fmtDate(s) {
      if (!s) return '';
      const [y,mo,d] = s.split('-');
      return this.lang === 'en' ? `${mo}/${d}/${y}` : `${d}/${mo}/${y}`;
    },

    fmtDateWithDay(s) {
      if (!s) return '';
      const d = new Date(s + 'T12:00:00');
      return this.t('weekdayNames')[d.getDay()] + ' ' + this.fmtDate(s);
    },

    weekStart(dateStr) {
      const d = new Date(dateStr + 'T12:00:00');
      const day = d.getDay();
      const offset = day === 0 ? -6 : 1 - day;
      const mon = new Date(d);
      mon.setDate(d.getDate() + offset);
      return mon.toISOString().slice(0,10);
    },

    fortnightId(dateStr) {
      const [y,mo,d] = dateStr.split('-').map(Number);
      return `${y}-${String(mo).padStart(2,'0')}-${d<=15?'1':'2'}`;
    },

    fortnightLabel(fid) {
      const [y,mo,half] = fid.split('-');
      const mn = this.t('monthNames')[parseInt(mo,10)-1];
      return half==='1' ? `1–15 ${mn} ${y}` : `16–31 ${mn} ${y}`;
    },

    // ── time input helpers ───────────────────────────────────

    parseTime(val) {
      if (!val) return '';
      const trimmed = val.trim();
      if (/^\d{1,2}:\d{2}$/.test(trimmed)) {
        const [h, m] = trimmed.split(':').map(Number);
        return (h <= 23 && m <= 59) ? String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') : '';
      }
      const d = trimmed.replace(/\D/g, '');
      if (d.length === 1 || d.length === 2) {
        const h = parseInt(d, 10);
        return h <= 23 ? String(h).padStart(2,'0') + ':00' : '';
      }
      if (d.length === 3) {
        const h = parseInt(d[0], 10), m = parseInt(d.slice(1), 10);
        return (h <= 23 && m <= 59) ? String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') : '';
      }
      if (d.length >= 4) {
        const h = parseInt(d.slice(0,2), 10), m = parseInt(d.slice(2,4), 10);
        return (h <= 23 && m <= 59) ? String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') : '';
      }
      return '';
    },

    fmtTimeField(field) {
      this.form[field] = this.parseTime(this.form[field]);
    },

    // ── week overview ────────────────────────────────────────

    weekNavDays() {
      const today = new Date();
      const dow = today.getDay();
      const toMon = dow === 0 ? -6 : 1 - dow;
      const mon = new Date(today);
      mon.setDate(today.getDate() + toMon + this.weekNav * 7);
      const todayIso = todayStr();
      return Array.from({length: 6}, (_, i) => {
        const d = new Date(mon);
        d.setDate(mon.getDate() + i);
        const iso = d.toISOString().slice(0, 10);
        const dayEntries = this.entries.filter(e => e.date === iso);
        const total = dayEntries.reduce((s, e) => s + this.calcMinutes(e), 0);
        return {
          iso, day: d.getDate(),
          label: this.t('weekdayNames')[d.getDay()],
          hasEntry: dayEntries.length > 0,
          total,
          isFuture: iso > todayIso,
          isToday: iso === todayIso
        };
      });
    },

    weekNavLabel() {
      const days = this.weekNavDays();
      return this.fmtDate(days[0].iso) + ' – ' + this.fmtDate(days[5].iso);
    },

    goToDay(iso) {
      this.form.date = iso;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // ── entries ──────────────────────────────────────────────

    sortedEntries() {
      return [...this.entries].sort((a,b) => b.date.localeCompare(a.date)||b.entryTime.localeCompare(a.entryTime));
    },

    cname(id) { return this.companies.find(c=>c.id===id)?.name ?? '?'; },
    previewTotal() { return this.fmt(this.calcMinutes(this.form)); },

    validateForm() {
      if (!this.form.companyId) return this.t('errorNoCompany');
      if (!this.form.date) return this.t('errorNoDate');
      if (!this.form.entryTime || !this.form.exitTime) return this.t('errorNoTimes');
      if (!/^\d{2}:\d{2}$/.test(this.form.entryTime) || !/^\d{2}:\d{2}$/.test(this.form.exitTime))
        return this.t('errorInvalidTime');
      return '';
    },

    submitEntry() {
      const err = this.validateForm();
      if (err) { this.formError = err; return; }
      this.formError = '';
      const entry = {
        id: this.editingId || uid(),
        companyId: this.form.companyId,
        date: this.form.date,
        entryTime: this.form.entryTime,
        exitTime: this.form.exitTime,
        lunchOut: this.form.noLunch ? '' : this.form.lunchOut,
        lunchReturn: this.form.noLunch ? '' : this.form.lunchReturn,
        noLunch: this.form.noLunch
      };
      if (this.editingId) {
        const i = this.entries.findIndex(e=>e.id===this.editingId);
        if (i!==-1) this.entries[i] = entry;
        this.editingId = null;
      } else {
        this.entries.push(entry);
      }
      this.resetForm();
      this.persist();
    },

    editEntry(id) {
      const e = this.entries.find(e=>e.id===id);
      if (!e) return;
      this.editingId = id;
      this.form = {
        companyId: e.companyId, date: e.date,
        entryTime: e.entryTime, exitTime: e.exitTime,
        lunchOut: e.lunchOut||'', lunchReturn: e.lunchReturn||'',
        noLunch: e.noLunch
      };
      this.formError = '';
      window.scrollTo({top:0,behavior:'smooth'});
    },

    deleteEntry(id) {
      if (!confirm(this.t('confirmDelete'))) return;
      this.entries = this.entries.filter(e=>e.id!==id);
      if (this.editingId===id) this.cancelEdit();
      this.persist();
    },

    cancelEdit() { this.editingId=null; this.resetForm(); },

    resetForm() {
      this.form = {
        companyId: this.form.companyId, date: todayStr(),
        entryTime:'', exitTime:'', lunchOut:'', lunchReturn:'', noLunch:false
      };
      this.formError = '';
    },

    // ── companies ────────────────────────────────────────────

    addCompany() {
      const name = this.newCompanyName.trim();
      if (!name) { this.companyError = this.t('errorCompanyEmpty'); return; }
      if (this.companies.some(c=>c.name.toLowerCase()===name.toLowerCase())) {
        this.companyError = this.t('errorCompanyExists'); return;
      }
      this.companyError = '';
      this.companies.push({id:uid(), name});
      this.newCompanyName = '';
      this.persist();
    },

    removeCompany(id) {
      if (this.entries.some(e=>e.companyId===id)) { alert(this.t('errorCompanyHasEntries')); return; }
      if (!confirm(this.t('confirmRemoveCompany'))) return;
      this.companies = this.companies.filter(c=>c.id!==id);
      this.persist();
    },

    // ── report ───────────────────────────────────────────────

    toggleAllCompanies(e) {
      this.report.selectedCompanies = e.target.checked ? this.companies.map(c=>c.id) : [];
    },

    generateReport() {
      const {dateFrom, dateTo, selectedCompanies} = this.report;
      const filtered = this.entries.filter(e => {
        if (selectedCompanies.length && !selectedCompanies.includes(e.companyId)) return false;
        if (dateFrom && e.date < dateFrom) return false;
        if (dateTo && e.date > dateTo) return false;
        return true;
      });

      const byCompany = {};
      for (const e of filtered) (byCompany[e.companyId]=byCompany[e.companyId]||[]).push(e);

      this.reportData = [];
      let grandTotal=0, grandOT=0;

      for (const [companyId, ces] of Object.entries(byCompany)) {
        ces.sort((a,b)=>a.date.localeCompare(b.date));
        const byWeek = {};
        for (const e of ces) {
          const wk = this.weekStart(e.date);
          (byWeek[wk]=byWeek[wk]||[]).push({...e, mins:this.calcMinutes(e)});
        }
        const byFortnight = {};
        for (const e of ces) {
          const fid = this.fortnightId(e.date);
          byFortnight[fid] = (byFortnight[fid]||0) + this.calcMinutes(e);
        }

        const rows = [];
        let companyTotal=0, companyOT=0;

        for (const wk of Object.keys(byWeek).sort()) {
          let weekTotal=0;
          for (const e of byWeek[wk]) {
            rows.push({
              type:'entry', id:e.id, date:this.fmtDateWithDay(e.date),
              entryTime:e.entryTime,
              lunchOut: e.noLunch?'—':(e.lunchOut||'—'),
              lunchReturn: e.noLunch?'—':(e.lunchReturn||'—'),
              exitTime:e.exitTime, dayTotal:this.fmt(e.mins), weekTotal:'', ot:''
            });
            weekTotal+=e.mins; companyTotal+=e.mins;
          }
          const ot=Math.max(0,weekTotal-44*60);
          companyOT+=ot;
          rows.push({
            type:'week-sub', id:'ws-'+wk,
            date:this.t('weekSubtotal')+' ('+this.fmtDate(wk)+')',
            entryTime:'',lunchOut:'',lunchReturn:'',exitTime:'',dayTotal:'',
            weekTotal:this.fmt(weekTotal),
            ot: ot>0?'+'+this.fmt(ot)+' OT':''
          });
        }

        const fortnights = Object.entries(byFortnight)
          .sort((a,b)=>a[0].localeCompare(b[0]))
          .map(([fid,mins])=>({label:this.fortnightLabel(fid),mins}));

        this.reportData.push({
          companyId, companyName:this.cname(companyId),
          rows, totalMinutes:companyTotal, overtimeMinutes:companyOT, fortnights
        });
        grandTotal+=companyTotal; grandOT+=companyOT;
      }

      this.reportTotals = {total:grandTotal, overtime:grandOT};
      this.reportGenerated = true;
    },

    // ── export PDF ───────────────────────────────────────────

    exportPDF() {
      if (!window.jspdf) { alert('jsPDF not loaded yet.'); return; }
      const {jsPDF} = window.jspdf;
      const showTotals = this.report.showTotals;
      const doc = new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
      doc.setFontSize(14);
      doc.text(this.t('appTitle'), 14, 14);
      doc.setFontSize(9);
      doc.text(`${this.t('period')}: ${this.fmtDate(this.report.dateFrom)||'—'} → ${this.fmtDate(this.report.dateTo)||'—'}`, 14, 20);
      let y=28;
      const head = showTotals
        ? [[this.t('date'),this.t('entryTime'),this.t('lunchOut'),this.t('lunchReturn'),this.t('exitTime'),this.t('dayTotal'),this.t('weekSubtotal'),'OT']]
        : [[this.t('date'),this.t('entryTime'),this.t('lunchOut'),this.t('lunchReturn'),this.t('exitTime')]];
      // Column widths (mm) sized to content; table centered on portrait A4 (210mm)
      // date "Seg 23/05/2026"=24mm, times "08:00"=12mm, totals vary
      const colW = showTotals
        ? [24, 12, 12, 12, 12, 13, 24, 13]   // total 122mm
        : [24, 12, 12, 12, 12];               // total 72mm
      const tableW = colW.reduce((a,b) => a+b, 0);
      const marginLeft = Math.round((210 - tableW) / 2);
      const colStyles = Object.fromEntries(colW.map((w,i) => [i, {cellWidth:w}]));
      const tableStyles = showTotals ? {fontSize:7,cellPadding:1.2} : {fontSize:8,cellPadding:1.5};
      for (const sec of this.reportData) {
        if (y>255) {doc.addPage(); y=14;}
        doc.setFontSize(11); doc.setFont(undefined,'bold');
        doc.text(sec.companyName, marginLeft, y);
        doc.setFont(undefined,'normal'); y+=5;
        const rows = showTotals ? sec.rows : sec.rows.filter(r=>r.type==='entry');
        const body = rows.map(r => showTotals
          ? [r.date,r.entryTime,r.lunchOut,r.lunchReturn,r.exitTime,r.dayTotal,r.weekTotal,r.ot]
          : [r.date,r.entryTime,r.lunchOut,r.lunchReturn,r.exitTime]
        );
        if (showTotals) body.push([this.t('companyTotal'),'','','','',this.fmt(sec.totalMinutes),'',sec.overtimeMinutes>0?this.fmt(sec.overtimeMinutes):'']);
        doc.autoTable({startY:y,head,body,styles:tableStyles,headStyles:{fillColor:[26,54,93]},columnStyles:colStyles,tableWidth:tableW,margin:{left:marginLeft,right:14}});
        y=doc.lastAutoTable.finalY+5;
        if (showTotals) {
          doc.setFontSize(8);
          for (const ft of sec.fortnights) { doc.text(`${ft.label}: ${this.fmt(ft.mins)}`,marginLeft,y); y+=4; }
        }
        y+=4;
      }
      if (showTotals) {
        doc.setFontSize(10); doc.setFont(undefined,'bold');
        doc.text(`${this.t('totalFiltered')}: ${this.fmt(this.reportTotals.total)}   ${this.t('overtime')}: ${this.fmt(this.reportTotals.overtime)}`,marginLeft,y+4);
      }
      doc.save(`horas-${todayStr()}.pdf`);
    },

    // ── export XLSX ──────────────────────────────────────────

    exportXLSX() {
      if (!window.XLSX) { alert('SheetJS not loaded yet.'); return; }
      const showTotals = this.report.showTotals;
      const wb = XLSX.utils.book_new();
      for (const sec of this.reportData) {
        const headers = showTotals
          ? [this.t('date'),this.t('entryTime'),this.t('lunchOut'),this.t('lunchReturn'),this.t('exitTime'),this.t('dayTotal'),this.t('weekSubtotal'),'OT']
          : [this.t('date'),this.t('entryTime'),this.t('lunchOut'),this.t('lunchReturn'),this.t('exitTime')];
        const aoa = [headers];
        const rows = showTotals ? sec.rows : sec.rows.filter(r=>r.type==='entry');
        for (const r of rows) {
          aoa.push(showTotals
            ? [r.date,r.entryTime,r.lunchOut,r.lunchReturn,r.exitTime,r.dayTotal,r.weekTotal,r.ot]
            : [r.date,r.entryTime,r.lunchOut,r.lunchReturn,r.exitTime]
          );
        }
        if (showTotals) {
          aoa.push([this.t('companyTotal'),'','','','',this.fmt(sec.totalMinutes),'',sec.overtimeMinutes>0?this.fmt(sec.overtimeMinutes):'']);
          aoa.push([]);
          for (const ft of sec.fortnights) aoa.push([ft.label,this.fmt(ft.mins)]);
        }
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), sec.companyName.slice(0,31));
      }
      XLSX.writeFile(wb, `horas-${todayStr()}.xlsx`);
    }
  };
}

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)+Date.now().toString(36);
}
function todayStr() { return new Date().toISOString().slice(0,10); }
