// State Management
  let appState = {
    confirmed: false,
    checkinDone: false,
    points: 1100,
    selectedDate: null,
    selectedTime: null,
    calYear: 2026,
    calMonth: 4
  };

  const POINTS_CONFIRM = 100;
  const POINTS_CHECKIN = 50;

  // Initialization
  document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    startCountdown();
    renderCalendar();
    renderHistory();
    renderCheckinSteps();
    animateDashboardProgress();
  });

  function setCurrentDate() {
    const d = new Date();
    const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
    document.getElementById('currentDate').textContent =
      ' ' + d.toLocaleDateString('pt-BR', opts);
  }

  // SPA Navigation
  const pageTitles = {
    dashboard:    ['Dashboard', 'Olá, Bruno! Veja seu resumo de saúde.'],
    confirmacao:  ['Confirmar Consulta', 'Garanta sua presença e ganhe pontos.'],
    reagendamento:['Reagendamento', 'Escolha uma nova data e horário.'],
    gamificacao:  ['Pontos & Recompensas', 'Seu desempenho em saúde recompensado.'],
    historico:    ['Histórico', 'Todas as suas consultas passadas.'],
    checkin:      ['Check-in', 'Agilize seu atendimento com pré-check-in.'],
  };

  function showSection(id) {
    document.querySelectorAll('.section-page').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link-cp').forEach(n => n.classList.remove('active'));

    document.getElementById('sec-' + id).classList.add('active');
    document.querySelectorAll('.nav-link-cp').forEach(n => {
      if (n.getAttribute('onclick') && n.getAttribute('onclick').includes("'" + id + "'")) {
        n.classList.add('active');
      }
    });

    const [title, sub] = pageTitles[id] || [id, ''];
    document.getElementById('pageTitle').textContent = title;
    document.getElementById('pageSubtitle').textContent = sub;

    if (id === 'gamificacao') animateProgressBar();
    if (id === 'dashboard')   animateDashboardProgress();

    if (window.innerWidth <= 768) toggleSidebar(false);
  }

  // Sidebar Controls
  function toggleSidebar(forceClose) {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('sidebarOverlay');
    if (forceClose === false || sb.classList.contains('open')) {
      sb.classList.remove('open');
      ov.classList.remove('open');
    } else {
      sb.classList.add('open');
      ov.classList.add('open');
    }
  }

  // Countdown Timer
  function startCountdown() {
    const target = new Date();
    target.setDate(target.getDate() + 10);
    target.setHours(14, 0, 0, 0);

    const dateOpts = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = target.toLocaleDateString('pt-BR', dateOpts);
    const dayMonthStr = target.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

    document.body.innerHTML = document.body.innerHTML.replace(/15\/05\/2026/g, formattedDate);
    document.body.innerHTML = document.body.innerHTML.replace(/15 de Maio/g, dayMonthStr);

    const ids1 = ['cdDias','cdHoras','cdMin','cdSeg'];
    const ids2 = ['cd2Dias','cd2Horas','cd2Min','cd2Seg'];

    function tick() {
      const now  = new Date();
      const diff = Math.max(0, target - now);
      const dias  = Math.floor(diff / 86400000);
      const horas = Math.floor((diff % 86400000) / 3600000);
      const min   = Math.floor((diff % 3600000) / 60000);
      const seg   = Math.floor((diff % 60000) / 1000);

      const vals = [
        String(dias).padStart(2,'0'),
        String(horas).padStart(2,'0'),
        String(min).padStart(2,'0'),
        String(seg).padStart(2,'0')
      ];

      ids1.forEach((id,i) => { const el = document.getElementById(id); if(el) el.textContent = vals[i]; });
      ids2.forEach((id,i) => { const el = document.getElementById(id); if(el) el.textContent = vals[i]; });
    }

    tick();
    setInterval(tick, 1000);
  }

  // Confirmation Actions
  function confirmPresenca() {
    if (appState.confirmed) return;
    appState.confirmed = true;
    appState.points += POINTS_CONFIRM;
    updatePointsUI();

    const btn = document.getElementById('mainConfirmBtn');
    btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Confirmado!';
    btn.classList.add('confirmed');
    btn.disabled = true;

    const status = document.getElementById('confirmStatus');
    status.style.display = 'flex';

    document.getElementById('reinforceAlert').style.display = 'none';

    const dbBtn = document.getElementById('dashConfirmBtn');
    if (dbBtn) {
      dbBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Confirmado!';
      dbBtn.classList.add('confirmed');
      dbBtn.disabled = true;
    }

    showToast('✅ Presença confirmada! +100 pts adicionados.', 'success');
  }

  function quickConfirm() {
    showSection('confirmacao');
    setTimeout(() => confirmPresenca(), 300);
  }

  // Cancel Modal
  function openCancelModal() {
    document.getElementById('cancelModal').classList.add('open');
  }

  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
  }

  function cancelConsulta() {
    closeModal('cancelModal');
    showToast('✔️ Cancelado. Você cedeu sua vaga para a Fila de Espera!', 'success');
    setTimeout(() => showSection('dashboard'), 1500);
  }

  function convertToTelehealth() {
    closeModal('cancelModal');
    showToast('💻 Consulta convertida para Telemedicina com sucesso!', 'success');
    setTimeout(() => showSection('dashboard'), 1500);
  }

  // Calendar Integration
  function addToCalendar(btn) {
    if (btn.classList.contains('added')) return;
    btn.classList.add('added');
    btn.innerHTML = '<i class="bi bi-calendar-check-fill me-1"></i>Adicionado ao Calendário';
    btn.style.background = 'var(--cp-success)';
    btn.style.borderColor = 'var(--cp-success)';
    
    appState.points += 20;
    updatePointsUI();
    showToast('📅 Consulta salva no calendário! +20 pts.', 'success');
  }

  // Calendar Rendering
  const monthNames = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
                      'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

  const bookedDays = [16, 22, 28];

  function renderCalendar() {
    const y = appState.calYear;
    const m = appState.calMonth;
    document.getElementById('calMonthLabel').textContent = monthNames[m] + ' ' + y;

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m+1, 0).getDate();
    const today = new Date();
    today.setHours(0,0,0,0);

    const grid = document.getElementById('calGrid');
    grid.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
      const el = document.createElement('button');
      el.className = 'cal-day empty';
      grid.appendChild(el);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(y, m, d);
      const btn = document.createElement('button');
      btn.textContent = d;

      const isPast    = date < today;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isBooked  = bookedDays.includes(d);
      const isToday   = date.toDateString() === today.toDateString();
      const isSelected = appState.selectedDate &&
        appState.selectedDate.toDateString() === date.toDateString();

      if (isPast || isWeekend || isBooked) {
        btn.className = 'cal-day disabled';
      } else {
        btn.className = 'cal-day' + (isToday ? ' today' : '') + (isSelected ? ' selected' : '');
        btn.onclick = () => selectDate(date, d);
      }

      grid.appendChild(btn);
    }
  }

  function selectDate(date, d) {
    appState.selectedDate = date;
    appState.selectedTime = null;
    renderCalendar();

    const label = date.toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long' });
    document.getElementById('selectedDateLabel').textContent = label;
    document.getElementById('rescheduleConfirmCard').style.display = 'none';

    renderTimeSlots(d);
  }

  function renderTimeSlots(d) {
    const allSlots = ['08:00','09:00','10:00','11:00','14:00','15:00','16:00','17:00'];
    const taken = d % 2 === 0
      ? ['09:00','14:00','16:00']
      : ['08:00','11:00','15:00'];

    const container = document.getElementById('timeSlots');
    container.innerHTML = '';

    allSlots.forEach(t => {
      const isTaken = taken.includes(t);
      const col = document.createElement('div');
      col.className = 'col-6';
      const btn = document.createElement('div');
      
      if (isTaken) {
        btn.className = 'time-slot waitlist';
        btn.innerHTML = `<i class="bi bi-clock-history me-1"></i> ${t} (Fila)`;
        btn.onclick = () => joinWaitlist(t, btn);
      } else {
        btn.className = 'time-slot';
        btn.textContent = t;
        btn.onclick = () => selectTime(t, btn);
      }
      
      col.appendChild(btn);
      container.appendChild(col);
    });
  }

  function joinWaitlist(t, btn) {
    if (btn.classList.contains('joined')) return;
    btn.classList.add('joined');
    btn.innerHTML = `<i class="bi bi-check2-circle me-1"></i> ${t} (Na Fila)`;
    showToast(`📝 Você entrou na fila de espera para às ${t}. Avisaremos se vagar!`, 'success');
  }

  function selectTime(t, el) {
    document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
    appState.selectedTime = t;

    const dateStr = appState.selectedDate.toLocaleDateString('pt-BR', {day:'numeric', month:'long', year:'numeric'});
    document.getElementById('rescheduleInfo').innerHTML =
      `<i class="bi bi-calendar-check me-1 text-cp-blue"></i><strong>Dr. Carlos Ferreira</strong> — Cardiologia<br>
       <i class="bi bi-clock me-1 text-cp-blue"></i>${dateStr} às ${t}`;
    document.getElementById('rescheduleConfirmCard').style.display = 'block';
  }

  function prevMonth() {
    if (appState.calMonth === 0) { appState.calMonth = 11; appState.calYear--; }
    else appState.calMonth--;
    renderCalendar();
  }

  function nextMonth() {
    if (appState.calMonth === 11) { appState.calMonth = 0; appState.calYear++; }
    else appState.calMonth++;
    renderCalendar();
  }

  function confirmReschedule() {
    const dateStr = appState.selectedDate.toLocaleDateString('pt-BR', {day:'numeric', month:'long'});
    showToast(`📅 Reagendado para ${dateStr} às ${appState.selectedTime}!`, 'success');
    showSection('dashboard');
  }

  // Gamification & Points
  function animateProgressBar() {
    const pct = Math.round((appState.points - 500) / (1500 - 500) * 100);
    setTimeout(() => {
      document.getElementById('progressBar').style.width = Math.min(100, pct) + '%';
    }, 100);
    updatePtsToGold();
  }

  function animateDashboardProgress() {
    const pct = Math.round((appState.points - 500) / (1500 - 500) * 100);
    setTimeout(() => {
      const el = document.getElementById('dashProgress');
      if (el) el.style.width = Math.min(100, pct) + '%';
    }, 200);
  }

  function updatePtsToGold() {
    const need = Math.max(0, 1500 - appState.points);
    const el = document.getElementById('ptsToGold');
    if (el) el.textContent = need > 0 ? `${need} pts para Ouro` : 'Nível Ouro atingido!';
    
    const rem = document.getElementById('ptsRemaining');
    if (rem) rem.textContent = need;
  }

  function updatePointsUI() {
    document.getElementById('gamePts').textContent = appState.points.toLocaleString('pt-BR');
    document.getElementById('statPts').textContent = appState.points;
    animateProgressBar();
    animateDashboardProgress();
  }

  function redeemReward(btn, cost) {
    if (appState.points < cost) {
      showToast('⚠️ Pontos insuficientes para resgatar.', 'warning');
      return;
    }
    appState.points -= cost;
    btn.textContent = 'Resgatado!';
    btn.classList.add('redeemed');
    btn.disabled = true;
    updatePointsUI();
    showToast('🎁 Recompensa resgatada com sucesso!', 'success');
  }

  // History Log
  const historyData = [
    { title:'Dr. Carlos Ferreira — Cardiologia',    date:'10/04/2026 · 14h00', status:'attended',  pts:'+100 pts' },
    { title:'Dra. Juliana Alves — Dermatologia',    date:'22/03/2026 · 10h30', status:'attended',  pts:'+100 pts' },
    { title:'Dr. Roberto Lima — Ortopedia',          date:'05/03/2026 · 09h00', status:'attended',  pts:'+100 pts' },
    { title:'Dra. Fernanda Costa — Oftalmologia',   date:'14/02/2026 · 11h00', status:'cancelled', pts:'— pts' },
    { title:'Dr. Marcelo Santos — Clínica Geral',   date:'20/01/2026 · 16h00', status:'attended',  pts:'+100 pts' },
    { title:'Dra. Paula Ramos — Nutrição',           date:'08/01/2026 · 09h30', status:'attended',  pts:'+100 pts' },
  ];

  const statusLabel = { attended:'Comparecido', cancelled:'Cancelado', missed:'No-show' };

  function renderHistory(filter = 'all') {
    const list = document.getElementById('historyList');
    const data = filter === 'all' ? historyData : historyData.filter(h => h.status === filter);
    list.innerHTML = data.map((h, i) => `
      <div class="history-item">
        <div class="history-dot ${h.status}"></div>
        <div class="history-info" style="flex:1;">
          <div class="history-title">${h.title}</div>
          <div class="history-sub"><i class="bi bi-clock me-1"></i>${h.date}</div>
          <div style="font-size:.76rem;color:var(--cp-pink);margin-top:2px;">${h.pts}</div>
          
          ${h.status === 'attended' && i === 0 ? `
          <div class="mt-2 d-flex gap-2 flex-wrap">
            <button class="btn btn-sm" style="background:#e0f2fe; color:var(--cp-blue); font-size:.7rem; font-weight:600; border:none; transition:all .2s;" onclick="reviewConsultation(this)">
              <i class="bi bi-star-fill text-cp-warning"></i> Avaliar (+10 pts)
            </button>
            <button class="btn btn-sm" style="background:var(--cp-blue); color:#fff; font-size:.7rem; font-weight:600; border:none;" onclick="showSection('reagendamento'); showToast('Agendamento de Retorno Iniciado.', 'success')">
              <i class="bi bi-arrow-repeat"></i> Agendar Retorno
            </button>
          </div>
          ` : ''}
          
        </div>
        <span class="history-badge ${h.status}" style="align-self:flex-start;">${statusLabel[h.status]}</span>
      </div>
    `).join('');
  }

  function reviewConsultation(btn) {
    if (btn.disabled) return;
    btn.innerHTML = '<i class="bi bi-check-lg"></i> Avaliado';
    btn.style.background = '#dcfce7';
    btn.style.color = '#16a34a';
    btn.disabled = true;
    appState.points += 10;
    updatePointsUI();
    showToast('⭐ Obrigado pela avaliação! +10 pts creditados.', 'success');
  }

  function filterHistory(filter, btn) {
    document.querySelectorAll('.btn').forEach(b => {
      b.style.background = '';
      b.style.color = '';
      b.classList.remove('btn-outline-secondary');
      b.classList.add('btn-outline-secondary');
    });
    btn.style.background = 'var(--cp-blue)';
    btn.style.color = '#fff';
    btn.classList.remove('btn-outline-secondary');
    renderHistory(filter);
  }

  // Check-in Flow
  const checkinStepsData = [
    { title:'Confirmar presença',        desc:'Confirme sua presença na consulta pelo app.', status: 'done' },
    { title:'Pre-visit Intake Form',     desc:'Preencha dados prévios. Agiliza a consulta e gera + pontos.', status: 'done' },
    { title:'Realizar check-in',         desc:'Apresente o QR Code na recepção ou confirme aqui.', status: 'current' },
    { title:'Aguardar atendimento',      desc:'Você será chamado em até 10 minutos.', status: 'pending' },
  ];

  function renderCheckinSteps() {
    const el = document.getElementById('checkinSteps');
    el.innerHTML = checkinStepsData.map((s, i) => `
      <div class="checkin-step">
        <div class="step-num ${s.status}">
          ${s.status === 'done' ? '<i class="bi bi-check-lg"></i>' : i+1}
        </div>
        <div>
          <div class="step-title">${s.title}</div>
          <div class="step-desc">${s.desc}</div>
        </div>
      </div>
    `).join('');
  }

  function doCheckin() {
    if (appState.checkinDone) {
      showToast('✅ Check-in já realizado!', 'success');
      return;
    }
    appState.checkinDone = true;
    appState.points += POINTS_CHECKIN;
    updatePointsUI();

    checkinStepsData[2].status = 'done';
    checkinStepsData[3].status = 'current';
    renderCheckinSteps();

    showToast('✅ Check-in realizado! +50 pts adicionados.', 'success');
  }

  // Toast Notifications
  let toastTimeout;
  function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    const icon  = toast.querySelector('i');
    document.getElementById('toastMsg').textContent = msg;
    toast.className = type;
    toast.classList.add('show');
    icon.className = type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-triangle-fill';

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Push Simulator
  function triggerPushSimulation() {
    const push = document.getElementById('pushSim');
    push.classList.add('show');
    
    setTimeout(() => {
      if (push.classList.contains('show')) {
        closePush();
      }
    }, 8000);
  }

  function closePush() {
    document.getElementById('pushSim').classList.remove('show');
  }

  function confirmFromPush() {
    closePush();
    confirmPresenca();
  }

  // Dependents Offcanvas
  function openDependents() {
    document.getElementById('depOverlay').classList.add('show');
    document.getElementById('depPanel').classList.add('show');
  }

  function closeDependents() {
    document.getElementById('depOverlay').classList.remove('show');
    document.getElementById('depPanel').classList.remove('show');
  }

  function confirmDependent(btn) {
    if (btn.disabled) return;
    btn.innerHTML = '<i class="bi bi-check-lg me-1"></i>Presença Confirmada';
    btn.style.background = '#dcfce7';
    btn.style.color = '#16a34a';
    btn.disabled = true;
    appState.points += 100;
    updatePointsUI();
    showToast('👨‍👩‍👦 Família engajada! +100 pts creditados para o titular.', 'success');
    
    setTimeout(closeDependents, 2000);
  }

  // Reinforce Alert
  setTimeout(() => {
    if (!appState.confirmed) {
      const el = document.getElementById('reinforceAlert');
      if (el) el.style.display = 'flex';
    }
  }, 2000);
