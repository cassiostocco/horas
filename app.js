const APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    writeEntries(ss, data);
    writeLog(ss, data);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, entries: data.entries.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function writeEntries(ss, data) {
  var sheet = ss.getSheetByName('Lancamentos') || ss.insertSheet('Lancamentos');
  sheet.clearContents();
  var companies = {};
  data.companies.forEach(function(c) { companies[c.id] = c.name; });
  sheet.appendRow(['Data','Empresa','Entrada','Saida Almoco','Retorno Almoco','Saida','Sem Almoco']);
  var sorted = data.entries.slice().sort(function(a,b){ return a.date.localeCompare(b.date); });
  sorted.forEach(function(e) {
    sheet.appendRow([
      e.date, companies[e.companyId] || '?',
      e.entryTime,
      e.noLunch ? '' : (e.lunchOut || ''),
      e.noLunch ? '' : (e.lunchReturn || ''),
      e.exitTime,
      e.noLunch ? 'Sim' : 'Nao'
    ]);
  });
}

function writeLog(ss, data) {
  var sheet = ss.getSheetByName('Log') || ss.insertSheet('Log');
  if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp','Lancamentos','Empresas']);
  sheet.appendRow([new Date().toLocaleString('pt-BR'), data.entries.length, data.companies.length]);
}`;

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
    fortnightSubtotal: 'Subtotal quinzena',
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
    noData: 'Nenhum dado encontrado para os filtros selecionados.',
    confirmDelete: 'Excluir este lançamento?',
    confirmRemoveCompany: 'Remover a empresa? Os lançamentos vinculados serão mantidos.',
    errorNoCompany: 'Selecione uma empresa.',
    errorNoDate: 'Informe a data.',
    errorNoTimes: 'Informe entrada e saída.',
    errorCompanyExists: 'Empresa já cadastrada.',
    errorCompanyEmpty: 'Informe o nome da empresa.',
    errorCompanyHasEntries: 'Não é possível remover: há lançamentos nesta empresa. Exclua-os primeiro.',
    period: 'Período',
    fortnightLabel: 'quinzena',
    monthNames: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    regularHours: 'Horas normais',
    otHours: 'Horas extras',
    noCompanyForEntry: 'Cadastre ao menos uma empresa antes de lançar horas.',
    weekdayNames: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    // auth
    authSetTitle: 'Criar Senha de Acesso',
    authSetSubtitle: 'Defina uma senha para proteger seus dados.',
    authEnterTitle: 'Acesso Restrito',
    authEnterSubtitle: 'Digite sua senha para continuar.',
    password: 'Senha',
    newPassword: 'Nova senha',
    confirmPassword: 'Confirmar senha',
    unlock: 'Entrar',
    createPwd: 'Criar Senha',
    passwordRequired: 'Informe a senha.',
    passwordMismatch: 'As senhas não coincidem.',
    passwordWrong: 'Senha incorreta.',
    logout: 'Sair',
    settings: 'Configurações',
    // settings modal
    settingsTitle: 'Configurações',
    changePwd: 'Alterar Senha',
    currentPwd: 'Senha atual',
    newPwd: 'Nova senha',
    confirmNewPwd: 'Confirmar nova senha',
    pwdChangeDone: 'Senha alterada com sucesso.',
    sheetsBackup: 'Backup Google Sheets',
    sheetsUrlLabel: 'URL do Apps Script',
    sheetsUrlPlaceholder: 'https://script.google.com/macros/s/...',
    sheetsHowTo: 'Como configurar',
    syncNow: 'Sincronizar agora',
    syncing: 'Enviando...',
    syncDone: 'Backup enviado! Verifique a planilha.',
    syncError: 'Erro ao sincronizar. Verifique a URL.',
    sheetsUrlRequired: 'Cole a URL do Apps Script primeiro.',
    closeModal: 'Fechar',
    copyCode: 'Copiar código',
    copied: 'Copiado!',
    hosting: 'Publicar no GitHub Pages',
    hostingStep1: '1. Crie uma conta em github.com (gratuito)',
    hostingStep2: '2. Crie um repositório novo (ex: "horas")',
    hostingStep3: '3. Faça upload dos 3 arquivos: index.html, app.js, style.css',
    hostingStep4: '4. Vá em Settings → Pages → Branch: main → Save',
    hostingStep5: '5. Seu link será: https://seuusuario.github.io/horas',
    hostingStep6: '6. Compartilhe o link com seus colegas',
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
    fortnightSubtotal: 'Fortnight subtotal',
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
    noData: 'No data found for the selected filters.',
    confirmDelete: 'Delete this entry?',
    confirmRemoveCompany: 'Remove this company? Linked entries will be kept.',
    errorNoCompany: 'Please select a company.',
    errorNoDate: 'Please enter a date.',
    errorNoTimes: 'Please enter clock in and clock out times.',
    errorCompanyExists: 'Company already exists.',
    errorCompanyEmpty: 'Please enter a company name.',
    errorCompanyHasEntries: 'Cannot remove: this company has time entries. Delete them first.',
    period: 'Period',
    fortnightLabel: 'fortnight',
    monthNames: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    regularHours: 'Regular hours',
    otHours: 'Overtime hours',
    noCompanyForEntry: 'Add at least one company before logging hours.',
    weekdayNames: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    // auth
    authSetTitle: 'Create Access Password',
    authSetSubtitle: 'Set a password to protect your data.',
    authEnterTitle: 'Restricted Access',
    authEnterSubtitle: 'Enter your password to continue.',
    password: 'Password',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
    unlock: 'Unlock',
    createPwd: 'Create Password',
    passwordRequired: 'Please enter a password.',
    passwordMismatch: 'Passwords do not match.',
    passwordWrong: 'Wrong password.',
    logout: 'Log out',
    settings: 'Settings',
    // settings modal
    settingsTitle: 'Settings',
    changePwd: 'Change Password',
    currentPwd: 'Current password',
    newPwd: 'New password',
    confirmNewPwd: 'Confirm new password',
    pwdChangeDone: 'Password changed successfully.',
    sheetsBackup: 'Google Sheets Backup',
    sheetsUrlLabel: 'Apps Script URL',
    sheetsUrlPlaceholder: 'https://script.google.com/macros/s/...',
    sheetsHowTo: 'How to set up',
    syncNow: 'Sync now',
    syncing: 'Sending...',
    syncDone: 'Backup sent! Check your spreadsheet.',
    syncError: 'Sync error. Check the URL.',
    sheetsUrlRequired: 'Paste the Apps Script URL first.',
    closeModal: 'Close',
    copyCode: 'Copy code',
    copied: 'Copied!',
    hosting: 'Publish on GitHub Pages',
    hostingStep1: '1. Create an account at github.com (free)',
    hostingStep2: '2. Create a new repository (e.g. "horas")',
    hostingStep3: '3. Upload the 3 files: index.html, app.js, style.css',
    hostingStep4: '4. Go to Settings → Pages → Branch: main → Save',
    hostingStep5: '5. Your link will be: https://yourusername.github.io/horas',
    hostingStep6: '6. Share the link with your coworkers',
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
    report: { dateFrom: '', dateTo: '', selectedCompanies: [] },
    reportData: [],
    reportTotals: { total: 0, overtime: 0 },
    reportGenerated: false,

    // auth
    auth: {
      unlocked: false,
      hash: '',
      mode: 'enter',   // 'set' | 'enter'
      pwd: '',
      newPwd: '',
      confirmPwd: '',
      error: ''
    },

    // settings modal
    showSettings: false,
    settings: {
      section: 'pwd',  // 'pwd' | 'sheets' | 'hosting'
      currentPwd: '',
      newPwd: '',
      confirmPwd: '',
      error: '',
      success: ''
    },
    sheetsUrl: '',
    syncStatus: '',   // '' | 'syncing' | 'done' | 'error'
    codeCopied: false,

    // ── lifecycle ────────────────────────────────────────────

    init() {
      try {
        const raw = localStorage.getItem('horas_v1');
        if (raw) {
          const d = JSON.parse(raw);
          this.lang = d.lang || 'pt';
          this.companies = d.companies || [];
          this.entries = d.entries || [];
        }
      } catch (_) {}

      // auth
      const hash = localStorage.getItem('horas_pwd');
      if (hash) {
        this.auth.hash = hash;
        this.auth.mode = 'enter';
        this.auth.unlocked = false;
      } else {
        this.auth.mode = 'set';
        this.auth.unlocked = false;
      }

      this.sheetsUrl = localStorage.getItem('horas_sheets_url') || '';
      this.form.date = todayStr();
      this.report.selectedCompanies = this.companies.map(c => c.id);
    },

    persist() {
      localStorage.setItem('horas_v1', JSON.stringify({
        lang: this.lang,
        companies: this.companies,
        entries: this.entries
      }));
    },

    // ── i18n ────────────────────────────────────────────────

    t(key) { return i18n[this.lang][key] ?? key; },

    toggleLang() {
      this.lang = this.lang === 'pt' ? 'en' : 'pt';
      this.persist();
    },

    // ── auth ─────────────────────────────────────────────────

    async hashPwd(pwd) {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pwd));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    },

    async unlock() {
      if (!this.auth.pwd) { this.auth.error = this.t('passwordRequired'); return; }
      const h = await this.hashPwd(this.auth.pwd);
      if (h === this.auth.hash) {
        this.auth.unlocked = true;
        this.auth.pwd = '';
        this.auth.error = '';
      } else {
        this.auth.error = this.t('passwordWrong');
      }
    },

    async createPassword() {
      if (!this.auth.newPwd) { this.auth.error = this.t('passwordRequired'); return; }
      if (this.auth.newPwd !== this.auth.confirmPwd) { this.auth.error = this.t('passwordMismatch'); return; }
      const h = await this.hashPwd(this.auth.newPwd);
      this.auth.hash = h;
      localStorage.setItem('horas_pwd', h);
      this.auth.unlocked = true;
      this.auth.mode = 'enter';
      this.auth.newPwd = '';
      this.auth.confirmPwd = '';
      this.auth.error = '';
    },

    logout() {
      this.auth.unlocked = false;
      this.auth.mode = 'enter';
      this.auth.pwd = '';
      this.auth.error = '';
    },

    // ── settings ─────────────────────────────────────────────

    openSettings(section) {
      this.settings = { section: section || 'pwd', currentPwd: '', newPwd: '', confirmPwd: '', error: '', success: '' };
      this.showSettings = true;
    },

    async changePassword() {
      const s = this.settings;
      s.error = ''; s.success = '';
      if (!s.currentPwd) { s.error = this.t('passwordRequired'); return; }
      const curHash = await this.hashPwd(s.currentPwd);
      if (curHash !== this.auth.hash) { s.error = this.t('passwordWrong'); return; }
      if (!s.newPwd) { s.error = this.t('passwordRequired'); return; }
      if (s.newPwd !== s.confirmPwd) { s.error = this.t('passwordMismatch'); return; }
      const h = await this.hashPwd(s.newPwd);
      this.auth.hash = h;
      localStorage.setItem('horas_pwd', h);
      s.currentPwd = ''; s.newPwd = ''; s.confirmPwd = '';
      s.success = this.t('pwdChangeDone');
    },

    saveSheetsUrl() {
      localStorage.setItem('horas_sheets_url', this.sheetsUrl);
    },

    async syncToSheets() {
      if (!this.sheetsUrl.trim()) { alert(this.t('sheetsUrlRequired')); return; }
      this.syncStatus = 'syncing';
      try {
        await fetch(this.sheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            companies: this.companies,
            entries: this.entries
          })
        });
        this.syncStatus = 'done';
      } catch (_) {
        this.syncStatus = 'error';
      }
      setTimeout(() => { this.syncStatus = ''; }, 5000);
    },

    copyAppsScript() {
      navigator.clipboard.writeText(APPS_SCRIPT_CODE).then(() => {
        this.codeCopied = true;
        setTimeout(() => { this.codeCopied = false; }, 2500);
      });
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
      const h = Math.floor(abs / 60);
      const m = abs % 60;
      return (mins < 0 ? '-' : '') + h + 'h' + String(m).padStart(2, '0');
    },

    fmtDate(s) {
      if (!s) return '';
      const [y, mo, d] = s.split('-');
      return `${d}/${mo}/${y}`;
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
      return mon.toISOString().slice(0, 10);
    },

    fortnightId(dateStr) {
      const [y, mo, d] = dateStr.split('-').map(Number);
      return `${y}-${String(mo).padStart(2,'0')}-${d <= 15 ? '1' : '2'}`;
    },

    fortnightLabel(fid) {
      const [y, mo, half] = fid.split('-');
      const mn = this.t('monthNames')[parseInt(mo, 10) - 1];
      return half === '1' ? `1–15 ${mn} ${y}` : `16–31 ${mn} ${y}`;
    },

    // ── entries ──────────────────────────────────────────────

    sortedEntries() {
      return [...this.entries].sort((a, b) => b.date.localeCompare(a.date) || b.entryTime.localeCompare(a.entryTime));
    },

    cname(id) {
      return this.companies.find(c => c.id === id)?.name ?? '?';
    },

    previewTotal() {
      return this.fmt(this.calcMinutes(this.form));
    },

    validateForm() {
      if (!this.form.companyId) return this.t('errorNoCompany');
      if (!this.form.date) return this.t('errorNoDate');
      if (!this.form.entryTime || !this.form.exitTime) return this.t('errorNoTimes');
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
        const i = this.entries.findIndex(e => e.id === this.editingId);
        if (i !== -1) this.entries[i] = entry;
        this.editingId = null;
      } else {
        this.entries.push(entry);
      }
      this.resetForm();
      this.persist();
    },

    editEntry(id) {
      const e = this.entries.find(e => e.id === id);
      if (!e) return;
      this.editingId = id;
      this.form = {
        companyId: e.companyId, date: e.date,
        entryTime: e.entryTime, exitTime: e.exitTime,
        lunchOut: e.lunchOut || '', lunchReturn: e.lunchReturn || '',
        noLunch: e.noLunch
      };
      this.formError = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    deleteEntry(id) {
      if (!confirm(this.t('confirmDelete'))) return;
      this.entries = this.entries.filter(e => e.id !== id);
      if (this.editingId === id) this.cancelEdit();
      this.persist();
    },

    cancelEdit() {
      this.editingId = null;
      this.resetForm();
    },

    resetForm() {
      this.form = {
        companyId: this.form.companyId,
        date: todayStr(),
        entryTime: '', exitTime: '',
        lunchOut: '', lunchReturn: '', noLunch: false
      };
      this.formError = '';
    },

    // ── companies ────────────────────────────────────────────

    addCompany() {
      const name = this.newCompanyName.trim();
      if (!name) { this.companyError = this.t('errorCompanyEmpty'); return; }
      if (this.companies.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        this.companyError = this.t('errorCompanyExists'); return;
      }
      this.companyError = '';
      this.companies.push({ id: uid(), name });
      this.newCompanyName = '';
      this.persist();
    },

    removeCompany(id) {
      if (this.entries.some(e => e.companyId === id)) {
        alert(this.t('errorCompanyHasEntries')); return;
      }
      if (!confirm(this.t('confirmRemoveCompany'))) return;
      this.companies = this.companies.filter(c => c.id !== id);
      this.persist();
    },

    // ── report ───────────────────────────────────────────────

    toggleAllCompanies(e) {
      this.report.selectedCompanies = e.target.checked
        ? this.companies.map(c => c.id)
        : [];
    },

    generateReport() {
      const { dateFrom, dateTo, selectedCompanies } = this.report;
      const filtered = this.entries.filter(e => {
        if (selectedCompanies.length && !selectedCompanies.includes(e.companyId)) return false;
        if (dateFrom && e.date < dateFrom) return false;
        if (dateTo && e.date > dateTo) return false;
        return true;
      });

      const byCompany = {};
      for (const e of filtered) {
        (byCompany[e.companyId] = byCompany[e.companyId] || []).push(e);
      }

      this.reportData = [];
      let grandTotal = 0, grandOT = 0;

      for (const [companyId, ces] of Object.entries(byCompany)) {
        ces.sort((a, b) => a.date.localeCompare(b.date));

        const byWeek = {};
        for (const e of ces) {
          const wk = this.weekStart(e.date);
          (byWeek[wk] = byWeek[wk] || []).push({ ...e, mins: this.calcMinutes(e) });
        }

        const byFortnight = {};
        for (const e of ces) {
          const fid = this.fortnightId(e.date);
          byFortnight[fid] = (byFortnight[fid] || 0) + this.calcMinutes(e);
        }

        const rows = [];
        let companyTotal = 0, companyOT = 0;

        for (const wk of Object.keys(byWeek).sort()) {
          const wEntries = byWeek[wk];
          let weekTotal = 0;
          for (const e of wEntries) {
            rows.push({
              type: 'entry', id: e.id,
              date: this.fmtDateWithDay(e.date),
              entryTime: e.entryTime,
              lunchOut: e.noLunch ? '—' : (e.lunchOut || '—'),
              lunchReturn: e.noLunch ? '—' : (e.lunchReturn || '—'),
              exitTime: e.exitTime,
              dayTotal: this.fmt(e.mins),
              weekTotal: '', ot: ''
            });
            weekTotal += e.mins;
            companyTotal += e.mins;
          }
          const ot = Math.max(0, weekTotal - 44 * 60);
          companyOT += ot;
          rows.push({
            type: 'week-sub', id: 'ws-' + wk,
            date: this.t('weekSubtotal') + ' (' + this.fmtDate(wk) + ')',
            entryTime: '', lunchOut: '', lunchReturn: '', exitTime: '',
            dayTotal: '',
            weekTotal: this.fmt(weekTotal),
            ot: ot > 0 ? '+' + this.fmt(ot) + ' OT' : ''
          });
        }

        const fortnights = Object.entries(byFortnight)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([fid, mins]) => ({ label: this.fortnightLabel(fid), mins }));

        this.reportData.push({
          companyId, companyName: this.cname(companyId),
          rows, totalMinutes: companyTotal,
          overtimeMinutes: companyOT, fortnights
        });

        grandTotal += companyTotal;
        grandOT += companyOT;
      }

      this.reportTotals = { total: grandTotal, overtime: grandOT };
      this.reportGenerated = true;
    },

    // ── export PDF ───────────────────────────────────────────

    exportPDF() {
      if (!window.jspdf) { alert('jsPDF not loaded yet, please wait.'); return; }
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pFrom = this.report.dateFrom || '—';
      const pTo = this.report.dateTo || '—';
      doc.setFontSize(14);
      doc.text(this.t('appTitle'), 14, 14);
      doc.setFontSize(9);
      doc.text(`${this.t('period')}: ${pFrom} → ${pTo}`, 14, 20);
      let y = 28;
      const head = [[
        this.t('date'), this.t('entryTime'), this.t('lunchOut'),
        this.t('lunchReturn'), this.t('exitTime'), this.t('dayTotal'),
        this.t('weekSubtotal'), 'OT'
      ]];
      for (const sec of this.reportData) {
        if (y > 170) { doc.addPage(); y = 14; }
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text(sec.companyName, 14, y);
        doc.setFont(undefined, 'normal');
        y += 5;
        const body = sec.rows.map(r => [
          r.date, r.entryTime, r.lunchOut, r.lunchReturn,
          r.exitTime, r.dayTotal, r.weekTotal, r.ot
        ]);
        body.push([this.t('companyTotal'), '', '', '', '',
          this.fmt(sec.totalMinutes), '',
          sec.overtimeMinutes > 0 ? this.fmt(sec.overtimeMinutes) : '']);
        doc.autoTable({
          startY: y, head, body,
          styles: { fontSize: 7.5, cellPadding: 1.5 },
          headStyles: { fillColor: [26, 54, 93] },
          margin: { left: 14, right: 14 }
        });
        y = doc.lastAutoTable.finalY + 5;
        doc.setFontSize(8);
        for (const ft of sec.fortnights) {
          doc.text(`${ft.label}: ${this.fmt(ft.mins)}`, 14, y);
          y += 4;
        }
        y += 4;
      }
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`${this.t('totalFiltered')}: ${this.fmt(this.reportTotals.total)}   ${this.t('overtime')}: ${this.fmt(this.reportTotals.overtime)}`, 14, y + 4);
      doc.save(`horas-${todayStr()}.pdf`);
    },

    // ── export XLSX ──────────────────────────────────────────

    exportXLSX() {
      if (!window.XLSX) { alert('SheetJS not loaded yet, please wait.'); return; }
      const wb = XLSX.utils.book_new();
      for (const sec of this.reportData) {
        const aoa = [[
          this.t('date'), this.t('entryTime'), this.t('lunchOut'),
          this.t('lunchReturn'), this.t('exitTime'), this.t('dayTotal'),
          this.t('weekSubtotal'), 'OT'
        ]];
        for (const r of sec.rows) {
          aoa.push([r.date, r.entryTime, r.lunchOut, r.lunchReturn, r.exitTime, r.dayTotal, r.weekTotal, r.ot]);
        }
        aoa.push([this.t('companyTotal'), '', '', '', '',
          this.fmt(sec.totalMinutes), '',
          sec.overtimeMinutes > 0 ? this.fmt(sec.overtimeMinutes) : '']);
        aoa.push([]);
        for (const ft of sec.fortnights) {
          aoa.push([ft.label, this.fmt(ft.mins)]);
        }
        const ws = XLSX.utils.aoa_to_sheet(aoa);
        XLSX.utils.book_append_sheet(wb, ws, sec.companyName.slice(0, 31));
      }
      XLSX.writeFile(wb, `horas-${todayStr()}.xlsx`);
    }
  };
}

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
