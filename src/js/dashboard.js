// Dashboard Manager for AutoServiceHoute
class DashboardManager {
  constructor() {
    this.currentView = 'month';
    this.currentDate = new Date();
    this.appointments = this.loadData('appointments') || [];
    this.emails = this.loadData('emails') || [];
    this.init();
  }

  // Helper: Format date to YYYY-MM-DD without timezone issues
  formatDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  init() {
    this.setupNavigation();
    this.setupCalendar();
    this.setupAppointments();
    this.setupEmails();
    this.setupSettings();
    this.setupModal();
    this.updateStats();
    this.renderDashboard();
    this.renderCalendar();
  }

  // Local Storage
  loadData(key) {
    const data = localStorage.getItem(`ash_${key}`);
    return data ? JSON.parse(data) : null;
  }

  saveData(key, data) {
    localStorage.setItem(`ash_${key}`, JSON.stringify(data));
  }

  // Navigation
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.dataset.section;

        navItems.forEach(nav => nav.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        item.classList.add('active');
        document.getElementById(`section-${sectionId}`).classList.add('active');

        if (sectionId === 'calendar') {
          this.renderCalendar();
        } else if (sectionId === 'appointments') {
          this.renderAppointments();
        } else if (sectionId === 'emails') {
          this.renderEmails();
        }
      });
    });

    // Mobile toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');

    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });

      // Close sidebar when clicking outside
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
          if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('active');
          }
        }
      });
    }
  }

  // Calendar Setup
  setupCalendar() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const prevBtn = document.getElementById('prev-period');
    const nextBtn = document.getElementById('next-period');
    const todayBtn = document.getElementById('today-btn');

    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentView = btn.dataset.view;
        this.renderCalendar();
      });
    });

    prevBtn.addEventListener('click', () => {
      if (this.currentView === 'month') {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      } else {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
      }
      this.renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
      if (this.currentView === 'month') {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      } else {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
      }
      this.renderCalendar();
    });

    todayBtn.addEventListener('click', () => {
      this.currentDate = new Date();
      this.renderCalendar();
    });
  }

  renderCalendar() {
    const container = document.getElementById('calendar-view');
    const periodLabel = document.getElementById('current-period');

    if (this.currentView === 'month') {
      this.renderMonthView(container);
      periodLabel.textContent = this.currentDate.toLocaleDateString('nl-NL', { 
        month: 'long', 
        year: 'numeric' 
      });
    } else {
      this.renderWeekView(container);
      const weekStart = this.getWeekStart(this.currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      periodLabel.textContent = `${weekStart.getDate()} - ${weekEnd.getDate()} ${weekStart.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}`;
    }
  }

  renderMonthView(container) {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = prevLastDay.getDate();
    
    const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    let html = '<div class="calendar-grid">';
    
    // Headers
    const days = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
    days.forEach(day => {
      html += `<div class="calendar-header">${day}</div>`;
    });
    
    // Previous month days
    for (let i = startDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      html += `<div class="calendar-day other-month"><div class="day-number">${day}</div></div>`;
    }
    
    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = this.formatDateString(date);
      const isToday = date.toDateString() === today.toDateString();
      const dayAppointments = this.appointments.filter(apt => apt.date === dateStr);
      
      html += `<div class="calendar-day ${isToday ? 'today' : ''}" data-date="${dateStr}">
        <div class="day-number">${day}</div>
        <div class="day-appointments">`;
      
      dayAppointments.slice(0, 3).forEach(apt => {
        html += `<div class="appointment-pill ${apt.status}" data-id="${apt.id}">
          ${apt.time} ${apt.name}
        </div>`;
      });
      
      if (dayAppointments.length > 3) {
        html += `<div class="appointment-pill" style="background: #E5E7EB; color: #6B7280;">
          +${dayAppointments.length - 3} meer
        </div>`;
      }
      
      html += '</div></div>';
    }
    
    // Next month days
    const totalCells = startDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let day = 1; day <= remainingCells; day++) {
      html += `<div class="calendar-day other-month"><div class="day-number">${day}</div></div>`;
    }
    
    html += '</div>';
    container.innerHTML = html;
    
    // Add click handlers
    document.querySelectorAll('.calendar-day').forEach(day => {
      day.addEventListener('click', (e) => {
        if (e.target.classList.contains('appointment-pill')) {
          const id = e.target.dataset.id;
          if (id) {
            this.showAppointmentModal(id);
          }
        }
      });
    });
  }

  renderWeekView(container) {
    const weekStart = this.getWeekStart(this.currentDate);
    const hours = Array.from({ length: 11 }, (_, i) => `${8 + i}:00`);
    
    let html = '<div class="week-grid">';
    
    // Empty corner cell
    html += '<div class="time-slot"></div>';
    
    // Day headers
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const isToday = date.toDateString() === new Date().toDateString();
      html += `<div class="week-header-cell ${isToday ? 'today' : ''}">
        ${date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric' })}
      </div>`;
    }
    
    // Time slots
    hours.forEach(hour => {
      html += `<div class="time-slot">${hour}</div>`;
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + i);
        const dateStr = this.formatDateString(date);
        const timeHour = hour.split(':')[0];
        
        const dayAppointments = this.appointments.filter(apt => 
          apt.date === dateStr && apt.time.startsWith(timeHour)
        );
        
        html += `<div class="week-day-cell">`;
        dayAppointments.forEach(apt => {
          html += `<div class="appointment-pill ${apt.status}" data-id="${apt.id}">
            ${apt.time} ${apt.name}
          </div>`;
        });
        html += '</div>';
      }
    });
    
    html += '</div>';
    container.innerHTML = html;
    
    // Add click handlers
    document.querySelectorAll('.appointment-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const id = pill.dataset.id;
        if (id) {
          this.showAppointmentModal(id);
        }
      });
    });
  }

  getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  // Appointments
  setupAppointments() {
    const filterSelect = document.getElementById('status-filter');
    const dateFilter = document.getElementById('date-filter');
    const timeFilter = document.getElementById('time-filter');
    
    if (filterSelect) {
      filterSelect.addEventListener('change', () => {
        this.renderAppointments(filterSelect.value);
      });
    }
    
    if (dateFilter) {
      dateFilter.addEventListener('change', () => {
        this.renderAppointments(filterSelect ? filterSelect.value : 'all');
      });
    }
    
    if (timeFilter) {
      timeFilter.addEventListener('change', () => {
        this.renderAppointments(filterSelect ? filterSelect.value : 'all');
      });
    }
  }

  renderAppointments(filter = 'all') {
    const container = document.getElementById('appointments-list');
    
    let filteredAppointments = this.appointments;
    
    // Exclude completed appointments by default (unless specifically filtered)
    if (filter !== 'afgerond') {
      filteredAppointments = filteredAppointments.filter(apt => apt.status !== 'afgerond');
    }
    
    // Status filter
    if (filter !== 'all' && filter !== 'afgerond') {
      filteredAppointments = filteredAppointments.filter(apt => apt.status === filter);
    } else if (filter === 'afgerond') {
      // Show only completed when specifically requested
      filteredAppointments = this.appointments.filter(apt => apt.status === 'afgerond');
    }
    
    // Date filter
    const dateFilter = document.getElementById('date-filter');
    if (dateFilter && dateFilter.value !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      filteredAppointments = filteredAppointments.filter(apt => {
        const [year, month, day] = apt.date.split('-').map(Number);
        const aptDate = new Date(year, month - 1, day);
        aptDate.setHours(0, 0, 0, 0);
        
        switch(dateFilter.value) {
          case 'today':
            return aptDate.getTime() === today.getTime();
          case 'tomorrow':
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return aptDate.getTime() === tomorrow.getTime();
          case 'this-week':
            const weekEnd = new Date(today);
            weekEnd.setDate(weekEnd.getDate() + 7);
            return aptDate >= today && aptDate < weekEnd;
          case 'next-week':
            const nextWeekStart = new Date(today);
            nextWeekStart.setDate(nextWeekStart.getDate() + 7);
            const nextWeekEnd = new Date(today);
            nextWeekEnd.setDate(nextWeekEnd.getDate() + 14);
            return aptDate >= nextWeekStart && aptDate < nextWeekEnd;
          default:
            return true;
        }
      });
    }
    
    // Time filter
    const timeFilter = document.getElementById('time-filter');
    if (timeFilter && timeFilter.value !== 'all') {
      filteredAppointments = filteredAppointments.filter(apt => {
        const hour = parseInt(apt.time.split(':')[0]);
        if (timeFilter.value === 'morning') {
          return hour >= 9 && hour < 12;
        } else if (timeFilter.value === 'afternoon') {
          return hour >= 12 && hour < 17;
        }
        return true;
      });
    }
    
    // Sort by date and time
    filteredAppointments.sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return a.date.localeCompare(b.date);
    });
    
    if (filteredAppointments.length === 0) {
      container.innerHTML = '<p class="empty-state">Geen afspraken gevonden</p>';
      return;
    }
    
    let html = '';
    filteredAppointments.forEach(apt => {
      const [year, month, day] = apt.date.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const formattedDate = date.toLocaleDateString('nl-NL', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short'
      });
      
      const statusText = {
        'nieuwe-aanvraag': 'Nieuw',
        'bevestigd': 'Bevestigd',
        'in-behandeling': 'Bezig',
        'afgerond': 'Klaar'
      }[apt.status];
      
      html += `<div class="appointment-card ${apt.status}" data-id="${apt.id}">
        <div class="appointment-header">
          <div class="appointment-info">
            <h3>${apt.name}</h3>
            <div class="appointment-meta">
              <span>📅 ${formattedDate}</span>
              <span>🕐 ${apt.time}</span>
              ${apt.subject ? `<span>📋 ${apt.subject}</span>` : ''}
              ${apt.license ? `<span>🚗 ${apt.license}</span>` : ''}
            </div>
          </div>
          <span class="status-badge ${apt.status}">${statusText}</span>
        </div>
        ${apt.description ? `<div class="appointment-body">
          <p>${apt.description}</p>
        </div>` : ''}
      </div>`;
    });
    
    container.innerHTML = html;
    
    // Add click handlers
    document.querySelectorAll('.appointment-card').forEach(card => {
      card.addEventListener('click', () => {
        this.showAppointmentModal(card.dataset.id);
      });
    });
  }

  // Emails
  setupEmails() {
    const testEmailBtn = document.getElementById('test-email-btn');
    
    if (testEmailBtn) {
      testEmailBtn.addEventListener('click', () => {
        this.addTestEmail();
      });
    }
  }

  addTestEmail() {
    const testNames = ['Jan Bakker', 'Maria de Vries', 'Peter van Dijk', 'Sophie Jansen'];
    const testIssues = [
      'APK keuring nodig voor mijn auto',
      'Banden vervangen voor de winter',
      'Airco werkt niet meer goed',
      'Onderhoudsbeurt voor mijn occasion'
    ];
    
    const email = {
      id: Date.now(),
      name: testNames[Math.floor(Math.random() * testNames.length)],
      email: 'test@example.com',
      phone: '+31 6 12345678',
      subject: testIssues[Math.floor(Math.random() * testIssues.length)],
      description: 'Dit is een test e-mail voor demonstratie doeleinden.',
      license: 'AB-123-CD',
      date: new Date().toISOString(),
      read: false
    };
    
    this.emails.unshift(email);
    this.saveData('emails', this.emails);
    this.renderEmails();
    this.updateStats();
    this.showNotification('Nieuwe test e-mail toegevoegd!');
  }

  renderEmails() {
    const container = document.getElementById('emails-container');
    
    if (this.emails.length === 0) {
      container.innerHTML = '<p class="empty-state">Geen e-mails ontvangen</p>';
      return;
    }
    
    let html = '';
    this.emails.forEach(email => {
      const emailDate = new Date(email.date);
      const formattedDate = emailDate.toLocaleDateString('nl-NL', { 
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
      
      // Check if appointment already exists for this email
      const hasAppointment = this.appointments.some(apt => apt.emailId == email.id);
      
      html += `<div class="email-card ${!email.read ? 'unread' : ''}" data-id="${email.id}">
        <div class="email-main-row">
          <div class="email-left">
            <div class="email-info-block">
              <h3 class="sender-name">
                ${email.name}
                ${!email.read ? '<span class="unread-dot"></span>' : ''}
              </h3>
              <div class="email-meta">
                <span>📧 ${email.email}</span>
                ${email.phone ? `<span>📞 ${email.phone}</span>` : ''}
                ${email.license ? `<span>🚗 ${email.license}</span>` : ''}
                <span class="subject-badge">${email.subject}</span>
              </div>
              <p class="email-message">${email.description}</p>
            </div>
          </div>
          <div class="email-right">
            <span class="email-date">${formattedDate}</span>
            <div class="email-actions">
              <button class="action-btn btn-email-schedule" onclick="event.stopPropagation(); dashboard.createAppointmentFromEmail('${email.id}')" title="Plan afspraak">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Inplannen</span>
              </button>
              <button class="action-btn btn-email-edit" onclick="event.stopPropagation(); dashboard.showEmailDetails('${email.id}')" title="Bekijk details">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button class="action-btn btn-email-reject" onclick="event.stopPropagation(); dashboard.archiveEmail('${email.id}')" title="Afwijzen">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>`;
    });
    
    container.innerHTML = html;
  }

  createAppointmentFromEmail(emailId) {
    const email = this.emails.find(e => e.id == emailId);
    if (!email) return;
    
    // Check if appointment already exists for this email
    const existingAppointment = this.appointments.find(a => a.emailId == emailId);
    if (existingAppointment) {
      this.showNotification('Er bestaat al een afspraak voor dit bericht', 'warning');
      return;
    }
    
    const appointment = {
      id: Date.now(),
      name: email.name,
      email: email.email,
      phone: email.phone,
      license: email.license || '',
      date: this.formatDateString(new Date()),
      time: '09:00',
      subject: email.subject,
      description: email.description,
      status: 'nieuwe-aanvraag',
      createdFrom: 'email',
      emailId: email.id
    };
    
    this.appointments.push(appointment);
    this.saveData('appointments', this.appointments);
    
    // Verwijder email uit emails lijst
    this.emails = this.emails.filter(e => e.id != emailId);
    this.saveData('emails', this.emails);
    
    this.updateStats();
    this.renderEmails();
    this.renderCalendar();
    this.renderAppointments();
    this.showNotification('Afspraak aangemaakt! Email verplaatst naar afspraken.');
    this.showAppointmentModal(appointment.id);
  }

  quickPlanToday(emailId, buttonElement) {
    const email = this.emails.find(e => e.id == emailId);
    if (!email) return;
    
    // Check if appointment already exists for this email
    const existingAppointment = this.appointments.find(a => a.emailId == emailId);
    if (existingAppointment) {
      this.showNotification('Er bestaat al een afspraak voor dit bericht', 'warning');
      return;
    }
    
    // Collapse button to icon only if button element is provided
    if (buttonElement) {
      const span = buttonElement.querySelector('span');
      if (span) {
        buttonElement.classList.add('btn-collapsed');
        buttonElement.style.pointerEvents = 'none';
      }
    }
    
    // Vind eerste beschikbare tijd vandaag
    const today = this.formatDateString(new Date());
    const nextAvailableTime = this.findNextAvailableTime(today);
    
    const appointment = {
      id: Date.now(),
      name: email.name,
      email: email.email,
      phone: email.phone,
      license: email.license || '',
      date: today,
      time: nextAvailableTime,
      subject: email.subject,
      description: email.description,
      status: 'bevestigd',
      createdFrom: 'email',
      emailId: email.id
    };
    
    this.appointments.push(appointment);
    this.saveData('appointments', this.appointments);
    
    // Verwijder email uit emails lijst
    this.emails = this.emails.filter(e => e.id != emailId);
    this.saveData('emails', this.emails);
    
    this.updateStats();
    this.renderEmails();
    this.renderCalendar();
    this.renderAppointments();
    this.showNotification(`Afspraak gepland voor vandaag om ${nextAvailableTime}. Email verplaatst naar afspraken.`, 'success');
  }

  quickPlanTomorrow(emailId) {
    const email = this.emails.find(e => e.id == emailId);
    if (!email) return;
    
    // Check if appointment already exists for this email
    const existingAppointment = this.appointments.find(a => a.emailId == emailId);
    if (existingAppointment) {
      this.showNotification('Er bestaat al een afspraak voor dit bericht', 'warning');
      return;
    }
    
    // Bereken morgen
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = this.formatDateString(tomorrow);
    const nextAvailableTime = this.findNextAvailableTime(tomorrowStr);
    
    const appointment = {
      id: Date.now(),
      name: email.name,
      email: email.email,
      phone: email.phone,
      license: email.license || '',
      date: tomorrowStr,
      time: nextAvailableTime,
      subject: email.subject,
      description: email.description,
      status: 'bevestigd',
      createdFrom: 'email',
      emailId: email.id
    };
    
    this.appointments.push(appointment);
    this.saveData('appointments', this.appointments);
    
    // Verwijder email uit emails lijst
    this.emails = this.emails.filter(e => e.id != emailId);
    this.saveData('emails', this.emails);
    
    this.updateStats();
    this.renderEmails();
    this.renderCalendar();
    this.renderAppointments();
    this.showNotification(`Afspraak gepland voor morgen om ${nextAvailableTime}. Email verplaatst naar afspraken.`, 'success');
  }

  findNextAvailableTime(date) {
    // Werkuren: 9:00 - 17:00
    const workHours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
    const existingAppointments = this.appointments.filter(apt => apt.date === date && apt.status !== 'afgerond');
    
    for (let time of workHours) {
      const hasConflict = existingAppointments.some(apt => apt.time === time);
      if (!hasConflict) {
        return time;
      }
    }
    
    // Als alles vol is, geef laatste tijd
    return '17:00';
  }

  markAsRead(emailId) {
    const email = this.emails.find(e => e.id == emailId);
    if (email) {
      email.read = true;
      this.saveData('emails', this.emails);
      this.renderEmails();
      this.updateStats();
    }
  }

  archiveEmail(emailId) {
    this.showConfirmDialog(
      'Weet je zeker dat je deze aanvraag wilt afwijzen?',
      () => {
        this.emails = this.emails.filter(e => e.id != emailId);
        this.saveData('emails', this.emails);
        this.renderEmails();
        this.updateStats();
        this.showNotification('Aanvraag afgewezen en verwijderd');
      }
    );
  }

  showEmailDetails(emailId) {
    const email = this.emails.find(e => e.id == emailId);
    if (!email) return;
    
    // Mark as read
    email.read = true;
    this.saveData('emails', this.emails);
    this.updateStats();
    this.renderEmails();
    
    const modal = document.getElementById('appointment-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    const emailDate = new Date(email.date);
    const formattedDate = emailDate.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    modalTitle.textContent = `Aanvraag van ${email.name}`;
    
    modalBody.innerHTML = `
      <div class="detail-grid">
        <div class="detail-row">
          <span class="detail-label">Naam</span>
          <span class="detail-value">${email.name}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">E-mail</span>
          <span class="detail-value">${email.email}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Telefoon</span>
          <span class="detail-value">${email.phone || '-'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Kenteken</span>
          <span class="detail-value">${email.license || '-'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Onderwerp</span>
          <span class="detail-value">${email.subject}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Ontvangen op</span>
          <span class="detail-value">${formattedDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Bericht</span>
          <div class="detail-value message-box">${email.description}</div>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="action-btn primary" onclick="dashboard.quickPlanToday('${email.id}'); document.getElementById('appointment-modal').classList.remove('active');">
          Accepteren & Plan Vandaag
        </button>
        <button class="action-btn secondary" onclick="dashboard.createAppointmentFromEmail('${email.id}')">
          Datum Kiezen
        </button>
        <button class="action-btn danger" onclick="dashboard.archiveEmail('${email.id}'); document.getElementById('appointment-modal').classList.remove('active');">
          Afwijzen
        </button>
      </div>
    `;
    
    modal.classList.add('active');
  }

  // Modal
  setupModal() {
    const modal = document.getElementById('appointment-modal');
    const closeBtn = document.getElementById('modal-close');
    
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  showAppointmentModal(appointmentId, editMode = false) {
    const appointment = this.appointments.find(apt => apt.id == appointmentId);
    if (!appointment) return;
    
    const modal = document.getElementById('appointment-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    // Parse date without timezone issues
    const [year, month, day] = appointment.date.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const formattedDate = date.toLocaleDateString('nl-NL', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const statusText = {
      'nieuwe-aanvraag': 'Nieuwe Aanvraag',
      'bevestigd': 'Bevestigd',
      'in-behandeling': 'In Behandeling',
      'afgerond': 'Afgerond'
    }[appointment.status];
    
    modalTitle.textContent = editMode ? `Afspraak Bewerken` : `Afspraak - ${appointment.name}`;
    
    if (editMode) {
      modalBody.innerHTML = `
        <div class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">Status</span>
            <span class="status-badge ${appointment.status}">${statusText}</span>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-name">Naam</label>
            <input type="text" id="edit-name" class="form-control" value="${appointment.name}" required>
          </div>
          <div class="detail-row">
            <span class="detail-label">E-mail</span>
            <span class="detail-value">${appointment.email || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Telefoon</span>
            <span class="detail-value">${appointment.phone || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Kenteken</span>
            <span class="detail-value">${appointment.license || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Onderwerp</span>
            <span class="detail-value">${appointment.subject || '-'}</span>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-date">Datum</label>
            <input type="date" id="edit-date" class="form-control" value="${appointment.date}" required>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-time">Tijd</label>
            <input type="time" id="edit-time" class="form-control" value="${appointment.time}" required>
          </div>
          <div class="detail-row">
            <span class="detail-label">Bericht</span>
            <div class="detail-value message-box">${appointment.description}</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn primary" onclick="dashboard.saveAppointmentChanges('${appointment.id}')">
            Opslaan
          </button>
          <button class="action-btn secondary" onclick="dashboard.showAppointmentModal('${appointment.id}', false)">
            Annuleren
          </button>
        </div>
      `;
    } else {
      modalBody.innerHTML = `
        <div class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">Status</span>
            <span class="status-badge ${appointment.status}">${statusText}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Naam</span>
            <span class="detail-value">${appointment.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">E-mail</span>
            <span class="detail-value">${appointment.email || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Telefoon</span>
            <span class="detail-value">${appointment.phone || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Kenteken</span>
            <span class="detail-value">${appointment.license || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Onderwerp</span>
            <span class="detail-value">${appointment.subject || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Datum</span>
            <span class="detail-value">${formattedDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Tijd</span>
            <span class="detail-value">${appointment.time}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Bericht</span>
            <div class="detail-value message-box">${appointment.description}</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn secondary" onclick="dashboard.showAppointmentModal('${appointment.id}', true)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Bewerken
          </button>
          ${appointment.status === 'nieuwe-aanvraag' ? `
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${appointment.id}', 'bevestigd')">
              Bevestigen
            </button>
          ` : ''}
          ${appointment.status === 'bevestigd' ? `
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${appointment.id}', 'in-behandeling')">
              Start Behandeling
            </button>
          ` : ''}
          ${appointment.status === 'in-behandeling' ? `
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${appointment.id}', 'afgerond')">
              Afronden
            </button>
          ` : ''}
          <button class="action-btn danger" onclick="dashboard.confirmDelete('${appointment.id}')">
            Verwijderen
          </button>
        </div>
      `;
    }
    
    modal.classList.add('active');
  }

  updateAppointmentStatus(appointmentId, newStatus) {
    const appointment = this.appointments.find(apt => apt.id == appointmentId);
    if (appointment) {
      appointment.status = newStatus;
      this.saveData('appointments', this.appointments);
      this.updateStats();
      this.renderCalendar();
      this.renderAppointments();
      this.renderDashboard();
      this.showAppointmentModal(appointmentId);
      
      const statusText = {
        'nieuwe-aanvraag': 'Nieuwe Aanvraag',
        'bevestigd': 'Bevestigd',
        'in-behandeling': 'In Behandeling',
        'afgerond': 'Afgerond'
      }[newStatus];
      
      this.showNotification(`Status bijgewerkt naar: ${statusText}`);
    }
  }

  saveAppointmentChanges(appointmentId) {
    const appointment = this.appointments.find(apt => apt.id == appointmentId);
    if (!appointment) return;
    
    // Get values from form
    const name = document.getElementById('edit-name').value.trim();
    const date = document.getElementById('edit-date').value;
    const time = document.getElementById('edit-time').value;
    
    // Validate
    if (!name || !date || !time) {
      this.showNotification('Vul alle verplichte velden in', 'error');
      return;
    }
    
    // Check for time conflicts
    const hasConflict = this.appointments.some(apt => 
      apt.id != appointmentId && 
      apt.date === date && 
      apt.time === time &&
      apt.status !== 'afgerond'
    );
    
    if (hasConflict) {
      this.showConfirmDialog(
        'Er is al een afspraak op deze datum en tijd. Toch opslaan?',
        () => {
          this.performSaveAppointment(appointment, name, date, time);
        }
      );
      return;
    }
    
    this.performSaveAppointment(appointment, name, date, time);
  }

  performSaveAppointment(appointment, name, date, time) {
    // Update appointment
    appointment.name = name;
    appointment.date = date;
    appointment.time = time;
    
    // Save and refresh
    this.saveData('appointments', this.appointments);
    this.updateStats();
    this.renderCalendar();
    this.renderAppointments();
    this.renderDashboard();
    this.showAppointmentModal(appointment.id, false);
    this.showNotification('Afspraak succesvol bijgewerkt');
  }

  confirmDelete(appointmentId) {
    this.showConfirmDialog(
      'Weet je zeker dat je deze afspraak wilt verwijderen?',
      () => {
        this.deleteAppointment(appointmentId);
      }
    );
  }

  deleteAppointment(appointmentId) {
    this.appointments = this.appointments.filter(apt => apt.id != appointmentId);
    this.saveData('appointments', this.appointments);
    
    const modal = document.getElementById('appointment-modal');
    modal.classList.remove('active');
    
    this.updateStats();
    this.renderCalendar();
    this.renderAppointments();
    this.renderDashboard();
    this.showNotification('Afspraak verwijderd');
  }

  archiveEmail(emailId) {
    this.showConfirmDialog(
      'Weet je zeker dat je deze e-mail wilt verwijderen?',
      () => {
        this.emails = this.emails.filter(e => e.id != emailId);
        this.saveData('emails', this.emails);
        this.renderEmails();
        this.updateStats();
        this.showNotification('E-mail verwijderd');
      }
    );
  }

  // Settings
  setupSettings() {
    const clearDataBtn = document.getElementById('clear-data-btn');
    
    if (clearDataBtn) {
      clearDataBtn.addEventListener('click', () => {
        this.showConfirmDialog(
          'Weet je zeker dat je alle data wilt verwijderen? Dit kan niet ongedaan worden gemaakt!',
          () => {
            localStorage.removeItem('ash_appointments');
            localStorage.removeItem('ash_emails');
            this.appointments = [];
            this.emails = [];
            this.updateStats();
            this.renderCalendar();
            this.renderAppointments();
            this.renderEmails();
            this.renderDashboard();
            this.showNotification('Alle data verwijderd');
          }
        );
      });
    }
  }

  // Confirm Dialog
  showConfirmDialog(message, onConfirm) {
    // Remove existing dialog if any
    const existingDialog = document.querySelector('.confirm-dialog');
    if (existingDialog) {
      existingDialog.remove();
    }
    
    // Create dialog
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
      <div class="confirm-dialog-content">
        <div class="confirm-dialog-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h3>Bevestiging</h3>
        <p>${message}</p>
        <div class="confirm-dialog-actions">
          <button class="action-btn secondary" id="confirm-cancel">Annuleren</button>
          <button class="action-btn danger" id="confirm-yes">Ja, doorgaan</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(dialog);
    
    // Animate in
    setTimeout(() => dialog.classList.add('show'), 10);
    
    // Handle buttons
    document.getElementById('confirm-cancel').addEventListener('click', () => {
      dialog.classList.remove('show');
      setTimeout(() => dialog.remove(), 300);
    });
    
    document.getElementById('confirm-yes').addEventListener('click', () => {
      dialog.classList.remove('show');
      setTimeout(() => dialog.remove(), 300);
      onConfirm();
    });
    
    // Close on backdrop click
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) {
        dialog.classList.remove('show');
        setTimeout(() => dialog.remove(), 300);
      }
    });
  }

  // Dashboard Stats & Recent Items
  updateStats() {
    const newRequests = this.appointments.filter(apt => apt.status === 'nieuwe-aanvraag').length;
    const confirmed = this.appointments.filter(apt => apt.status === 'bevestigd').length;
    const inProgress = this.appointments.filter(apt => apt.status === 'in-behandeling').length;
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekAgo.setHours(0, 0, 0, 0);
    const completed = this.appointments.filter(apt => {
      if (apt.status !== 'afgerond') return false;
      const [year, month, day] = apt.date.split('-').map(Number);
      const aptDate = new Date(year, month - 1, day);
      aptDate.setHours(0, 0, 0, 0);
      return aptDate >= weekAgo;
    }).length;
    
    const unreadEmails = this.emails.filter(email => !email.read).length;
    const totalActiveAppointments = this.appointments.filter(apt => apt.status !== 'afgerond').length;
    
    document.getElementById('stat-new-requests').textContent = newRequests;
    document.getElementById('stat-confirmed').textContent = confirmed;
    document.getElementById('stat-in-progress').textContent = inProgress;
    document.getElementById('stat-completed').textContent = completed;
    
    // Update sidebar badges
    const appointmentsBadge = document.getElementById('appointments-badge');
    const emailsBadge = document.getElementById('emails-badge');
    
    if (appointmentsBadge) {
      appointmentsBadge.textContent = totalActiveAppointments;
      appointmentsBadge.style.display = totalActiveAppointments > 0 ? 'inline-block' : 'none';
    }
    
    if (emailsBadge) {
      emailsBadge.textContent = unreadEmails;
      emailsBadge.style.display = unreadEmails > 0 ? 'inline-block' : 'none';
    }
    
    // Update quick action badges
    const today = this.formatDateString(new Date());
    const todayAppointments = this.appointments.filter(apt => apt.date === today && apt.status !== 'afgerond').length;
    
    const quickNewEmails = document.getElementById('quick-new-emails');
    const quickTodayApts = document.getElementById('quick-today-appointments');
    const quickPending = document.getElementById('quick-pending');
    
    if (quickNewEmails) quickNewEmails.textContent = unreadEmails || '';
    if (quickTodayApts) quickTodayApts.textContent = todayAppointments || '';
    if (quickPending) quickPending.textContent = newRequests || '';
  }

  showNewEmailsOnly() {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    
    document.querySelector('[data-section="emails"]').classList.add('active');
    document.getElementById('section-emails').classList.add('active');
    
    this.renderEmails();
    
    setTimeout(() => {
      const firstUnread = document.querySelector('.email-card.unread');
      if (firstUnread) {
        firstUnread.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  showTodayAppointments() {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    
    document.querySelector('[data-section="appointments"]').classList.add('active');
    document.getElementById('section-appointments').classList.add('active');
    
    // Set date filter to today
    const dateFilter = document.getElementById('date-filter');
    const statusFilter = document.getElementById('status-filter');
    if (dateFilter) dateFilter.value = 'today';
    if (statusFilter) statusFilter.value = 'all';
    
    this.renderAppointments();
  }

  showCompletedAppointments() {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    
    document.querySelector('[data-section="appointments"]').classList.add('active');
    document.getElementById('section-appointments').classList.add('active');
    
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
      statusFilter.value = 'afgerond';
      this.renderAppointments('afgerond');
    }
  }

  showPendingActions() {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    
    document.querySelector('[data-section="appointments"]').classList.add('active');
    document.getElementById('section-appointments').classList.add('active');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    const newFilter = document.querySelector('[data-filter="nieuwe-aanvraag"]');
    if (newFilter) newFilter.classList.add('active');
    
    this.renderAppointments('nieuwe-aanvraag');
  }

  renderDashboard() {
    // Today's appointments
    const today = this.formatDateString(new Date());
    const todayAppointments = this.appointments
      .filter(apt => apt.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
    
    const todayContainer = document.getElementById('appointments-today');
    
    if (todayAppointments.length === 0) {
      todayContainer.innerHTML = '<p class="empty-state">Geen afspraken voor vandaag</p>';
    } else {
      let html = '';
      todayAppointments.forEach(apt => {
        const statusText = {
          'nieuwe-aanvraag': 'Nieuwe Aanvraag',
          'bevestigd': 'Bevestigd',
          'in-behandeling': 'In Behandeling',
          'afgerond': 'Afgerond'
        }[apt.status];
        
        html += `<div class="appointment-item" onclick="dashboard.showAppointmentModal('${apt.id}')">
          <div class="item-header">
            <span class="item-title">${apt.name}</span>
            <span class="item-time">${apt.time}</span>
          </div>
          <div class="item-description">
            <span class="status-badge ${apt.status}">${statusText}</span> - ${apt.description}
          </div>
        </div>`;
      });
      todayContainer.innerHTML = html;
    }
    
    // Recent emails
    const recentEmails = this.emails.slice(0, 5);
    const emailsContainer = document.getElementById('recent-emails');
    
    if (recentEmails.length === 0) {
      emailsContainer.innerHTML = '<p class="empty-state">Geen nieuwe e-mails</p>';
    } else {
      let html = '';
      recentEmails.forEach(email => {
        const date = new Date(email.date);
        const timeAgo = this.getTimeAgo(date);
        
        html += `<div class="email-item" onclick="dashboard.createAppointmentFromEmail('${email.id}')">
          <div class="item-header">
            <span class="item-title">${email.name}</span>
            <span class="item-time">${timeAgo}</span>
          </div>
          <div class="item-description">${email.subject}</div>
        </div>`;
      });
      emailsContainer.innerHTML = html;
    }
  }

  getTimeAgo(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Zojuist';
    if (diff < 3600) return `${Math.floor(diff / 60)} min geleden`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} uur geleden`;
    return `${Math.floor(diff / 86400)} dagen geleden`;
  }

  showNotification(message, type = 'success') {
    // Remove any existing toasts
    const existingToast = document.querySelector('.dashboard-toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `dashboard-toast toast-${type}`;
    
    // Icon based on type
    const icons = {
      success: `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>`,
      error: `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
      </svg>`,
      warning: `<svg class="toast-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>`
    };
    
    toast.innerHTML = `
      ${icons[type]}
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Close">
        <svg viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }
}

// Initialize dashboard
const dashboard = new DashboardManager();
window.dashboard = dashboard;
