// Dashboard Manager for AutoServiceHoute
import translations from './translations.js';
import * as api from './api.js';

class DashboardManager {
  constructor() {
    this.currentView = 'month';
    this.currentDate = new Date();
    this.appointments = [];
    this.emails = [];
    this.workDays = [];
    this.currentLanguage = this.loadData('language') || 'en';
    this.translations = translations;
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
    this.loadAllData().then(() => {
      this.setupLanguage();
      this.setupNavigation();
      this.setupCalendar();
      this.setupAppointments();
      this.setupEmails();
      this.setupSettings();
      this.setupModal();
      this.updateStats();
      this.renderDashboard();
      this.renderCalendar();
      this.applyTranslations();
    });
  }

  // Load all data from API
  async loadAllData() {
    try {
      [this.appointments, this.emails, this.workDays] = await Promise.all([
        api.fetchAppointments(),
        api.fetchEmails(),
        api.fetchWorkDays()
      ]);
      console.log('✓ Data loaded from database');
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to localStorage if API fails
      this.appointments = this.loadData('appointments') || [];
      this.emails = this.loadData('emails') || [];
      this.workDays = this.loadData('workDays') || [];
    }
  }

  // Language Management
  setupLanguage() {
    const languageSelect = document.getElementById('language-select');
    if (!languageSelect) return;

    const trigger = languageSelect.querySelector('.select-trigger');
    const options = languageSelect.querySelectorAll('.select-option');
    const selectedValue = languageSelect.querySelector('.selected-value');
    
    // Language data with flags
    const languages = {
      en: { flag: '🇬🇧', name: 'English' },
      tr: { flag: '🇹🇷', name: 'Türkçe' },
      nl: { flag: '🇳🇱', name: 'Nederlands' }
    };

    // Set current language
    const currentLang = languages[this.currentLanguage];
    if (currentLang) {
      selectedValue.innerHTML = `
        <span class="flag-icon">${currentLang.flag}</span>
        <span class="lang-text">${currentLang.name}</span>
      `;
    }

    // Mark current option as selected
    options.forEach(option => {
      if (option.dataset.value === this.currentLanguage) {
        option.classList.add('selected');
      }
    });

    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      languageSelect.classList.toggle('open');
    });

    // Handle option selection
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const value = option.dataset.value;
        
        // Update UI
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        const lang = languages[value];
        selectedValue.innerHTML = `
          <span class="flag-icon">${lang.flag}</span>
          <span class="lang-text">${lang.name}</span>
        `;
        
        // Close dropdown
        languageSelect.classList.remove('open');
        
        // Update language
        this.currentLanguage = value;
        this.saveData('language', this.currentLanguage);
        this.applyTranslations();
        
        // Re-render dynamic content
        this.renderDashboard();
        this.renderCalendar();
        if (document.getElementById('section-appointments').classList.contains('active')) {
          this.renderAppointments();
        }
        if (document.getElementById('section-emails').classList.contains('active')) {
          this.renderEmails();
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!languageSelect.contains(e.target)) {
        languageSelect.classList.remove('open');
      }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && languageSelect.classList.contains('open')) {
        languageSelect.classList.remove('open');
      }
    });

    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
          import('./auth.js').then(auth => {
            auth.logout();
          });
        }
      });
    }
  }

  applyTranslations() {
    const lang = this.currentLanguage;
    const trans = this.translations[lang];
    
    if (!trans) return;
    
    // Translate all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (trans[key]) {
        element.textContent = trans[key];
      }
    });
    
    // Update document language
    document.documentElement.lang = lang;
  }

  translate(key, replacements = {}) {
    const trans = this.translations[this.currentLanguage];
    let text = trans && trans[key] ? trans[key] : key;
    
    // Replace placeholders like {time}, {count}, {status}
    Object.keys(replacements).forEach(placeholder => {
      text = text.replace(`{${placeholder}}`, replacements[placeholder]);
    });
    
    return text;
  }

  getLocale() {
    const localeMap = {
      'en': 'en-US',
      'tr': 'tr-TR',
      'nl': 'nl-NL'
    };
    return localeMap[this.currentLanguage] || 'en-US';
  }

  getStatusText(status) {
    const statusMap = {
      'nieuwe-aanvraag': 'statusNew',
      'bevestigd': 'statusConfirmed',
      'in-behandeling': 'statusInProgress',
      'afgerond': 'statusCompleted'
    };
    return this.translate(statusMap[status] || status);
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
    const days = [this.translate('mon'), this.translate('tue'), this.translate('wed'), this.translate('thu'), this.translate('fri'), this.translate('sat'), this.translate('sun')];
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
      
      // Check if this is a work day
      const workDay = this.workDays.find(wd => wd.date === dateStr);
      const workDayClass = workDay ? 'work-day' : '';
      
      html += `<div class="calendar-day ${isToday ? 'today' : ''} ${workDayClass}" data-date="${dateStr}">`;
      
      // Day number with work day label if present
      html += `<div class="day-header">
        <div class="day-number">${day}</div>`;
      
      if (workDay) {
        const shiftLabel = workDay.shift.includes('Ochtend') ? 'Ochtend' : 
                          workDay.shift.includes('Middag') ? 'Middag' : 
                          workDay.shift.includes('Nacht') ? 'Nacht' : 'Werk';
        html += `<div class="work-day-label">${shiftLabel}</div>`;
      }
      
      html += `</div>`; // Close day-header
      
      html += `<div class="day-appointments">`;
      
      dayAppointments.slice(0, 3).forEach(apt => {
        html += `<div class="appointment-pill ${apt.status}" data-id="${apt.id}">
          ${apt.time} ${apt.name}
        </div>`;
      });
      
      if (dayAppointments.length > 3) {
        html += `<div class="appointment-pill" style="background: #E5E7EB; color: #6B7280;">
          +${dayAppointments.length - 3} ${this.translate('more')}
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
        const dateStr = day.dataset.date;
        if (dateStr) {
          // If clicked on a specific appointment pill, show detail modal
          if (e.target.classList.contains('appointment-pill') && e.target.dataset.id) {
            const id = e.target.dataset.id;
            this.showAppointmentModal(id);
          } else {
            // If clicked on the day itself (or the +X meer), show day appointments list
            const dayAppointments = this.appointments.filter(apt => apt.date === dateStr);
            if (dayAppointments.length > 0) {
              this.showDayAppointmentsModal(dateStr, dayAppointments);
            }
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
        const timeHour = parseInt(hour.split(':')[0]);
        
        // Filter appointments for this day and hour
        const dayAppointments = this.appointments.filter(apt => {
          if (apt.date !== dateStr) return false;
          const aptHour = parseInt(apt.time.split(':')[0]);
          return aptHour === timeHour;
        });
        
        html += `<div class="week-day-cell" data-date="${dateStr}" data-hour="${hour}">`;
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
              ${apt.service ? `<span>📋 ${apt.service}</span>` : ''}
              ${apt.kenteken ? `<span>🚗 ${apt.kenteken}</span>` : ''}
            </div>
          </div>
          <span class="status-badge ${apt.status}">${statusText}</span>
        </div>
        ${apt.notes ? `<div class="appointment-body">
          <p>${apt.notes}</p>
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
      id: String(Date.now()),
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
    this.showNotification(this.translate('newTestEmailAdded'));
  }

  renderEmails() {
    const container = document.getElementById('emails-container');
    
    if (this.emails.length === 0) {
      container.innerHTML = `<p class="empty-state">${this.translate('noEmailsReceived')}</p>`;
      return;
    }
    
    let html = '';
    this.emails.forEach(email => {
      const emailDate = new Date(email.created_at);
      const formattedDate = emailDate.toLocaleDateString(this.getLocale(), { 
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
                ${email.kenteken ? `<span>🚗 ${email.kenteken}</span>` : ''}
                <span class="subject-badge">${email.subject}</span>
              </div>
              <p class="email-message">${email.message}</p>
            </div>
          </div>
          <div class="email-right">
            <span class="email-date">${formattedDate}</span>
            <div class="email-actions">
              <button class="action-btn btn-email-schedule" onclick="event.stopPropagation(); dashboard.createAppointmentFromEmail('${email.id}')" title="${this.translate('schedule')}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>${this.translate('schedule')}</span>
              </button>
              <button class="action-btn btn-email-edit" onclick="event.stopPropagation(); dashboard.showEmailDetails('${email.id}')" title="${this.translate('viewDetails')}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button class="action-btn btn-email-reject" onclick="event.stopPropagation(); dashboard.archiveEmail('${email.id}')" title="${this.translate('reject')}">
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

  async createAppointmentFromEmail(emailId) {
    const email = this.emails.find(e => e.id == emailId);
    if (!email) return;
    
    // Check if appointment already exists for this email
    const existingAppointment = this.appointments.find(a => a.emailId == emailId);
    if (existingAppointment) {
      this.showNotification(this.translate('appointmentAlreadyExists'), 'warning');
      return;
    }
    
    const appointment = {
      id: String(Date.now()),
      name: email.name,
      email: email.email,
      phone: email.phone,
      kenteken: email.kenteken || '',
      date: this.formatDateString(new Date()),
      time: '09:00',
      service: email.subject,
      notes: email.message,
      status: 'nieuwe-aanvraag',
      createdFrom: 'email',
      emailId: email.id
    };
    
    try {
      await api.createAppointment(appointment);
      this.appointments.push(appointment);
      
      await api.deleteEmail(emailId);
      this.emails = this.emails.filter(e => e.id != emailId);
    } catch (error) {
      console.error('Error creating appointment:', error);
      this.appointments.push(appointment);
      this.saveData('appointments', this.appointments);
      this.emails = this.emails.filter(e => e.id != emailId);
      this.saveData('emails', this.emails);
    }
    
    this.updateStats();
    this.renderEmails();
    this.renderCalendar();
    this.renderAppointments();
    this.showNotification(this.translate('appointmentCreated'));
    this.showAppointmentModal(appointment.id);
  }

  async quickPlanToday(emailId, buttonElement) {
    const email = this.emails.find(e => e.id == emailId);
    if (!email) return;
    
    // Check if appointment already exists for this email
    const existingAppointment = this.appointments.find(a => a.emailId == emailId);
    if (existingAppointment) {
      this.showNotification(this.translate('appointmentAlreadyExists'), 'warning');
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
      id: String(Date.now()),
      name: email.name,
      email: email.email,
      phone: email.phone,
      kenteken: email.kenteken || '',
      date: today,
      time: nextAvailableTime,
      service: email.subject,
      notes: email.message,
      status: 'bevestigd',
      createdFrom: 'email',
      emailId: email.id
    };
    
    try {
      await api.createAppointment(appointment);
      this.appointments.push(appointment);
      
      await api.deleteEmail(emailId);
      this.emails = this.emails.filter(e => e.id != emailId);
    } catch (error) {
      console.error('Error creating appointment:', error);
      this.appointments.push(appointment);
      this.saveData('appointments', this.appointments);
      this.emails = this.emails.filter(e => e.id != emailId);
      this.saveData('emails', this.emails);
    }
    
    this.updateStats();
    this.renderEmails();
    this.renderCalendar();
    this.renderAppointments();
    this.showNotification(this.translate('appointmentScheduledToday', { time: nextAvailableTime }), 'success');
  }

  async quickPlanTomorrow(emailId) {
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
      id: String(Date.now()),
      name: email.name,
      email: email.email,
      phone: email.phone,
      kenteken: email.kenteken || '',
      date: tomorrowStr,
      time: nextAvailableTime,
      service: email.subject,
      notes: email.message,
      status: 'bevestigd',
      createdFrom: 'email',
      emailId: email.id
    };
    
    try {
      await api.createAppointment(appointment);
      this.appointments.push(appointment);
      
      await api.deleteEmail(emailId);
      this.emails = this.emails.filter(e => e.id != emailId);
    } catch (error) {
      console.error('Error creating appointment:', error);
      this.appointments.push(appointment);
      this.saveData('appointments', this.appointments);
      this.emails = this.emails.filter(e => e.id != emailId);
      this.saveData('emails', this.emails);
    }
    
    this.updateStats();
    this.renderEmails();
    this.renderCalendar();
    this.renderAppointments();
    this.showNotification(this.translate('appointmentScheduledTomorrow', { time: nextAvailableTime }), 'success');
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
        this.showNotification(this.translate('requestRejectedDeleted'));
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
    
    const emailDate = new Date(email.created_at);
    const formattedDate = emailDate.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    modalTitle.textContent = `${this.translate('requestFrom')} ${email.name}`;
    
    modalBody.innerHTML = `
      <div class="detail-grid">
        <div class="detail-row">
          <span class="detail-label">${this.translate('name')}</span>
          <span class="detail-value">${email.name}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate('email')}</span>
          <span class="detail-value">${email.email}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate('phone')}</span>
          <span class="detail-value">${email.phone || '-'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate('licensePlate')}</span>
          <span class="detail-value">${email.kenteken || '-'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate('subject')}</span>
          <span class="detail-value">${email.subject}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate('receivedOn')}</span>
          <span class="detail-value">${formattedDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">${this.translate('message')}</span>
          <div class="detail-value message-box">${email.message}</div>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="action-btn primary" onclick="dashboard.quickPlanToday('${email.id}'); document.getElementById('appointment-modal').classList.remove('active');">
          ${this.translate('acceptScheduleToday')}
        </button>
        <button class="action-btn secondary" onclick="dashboard.createAppointmentFromEmail('${email.id}')">
          ${this.translate('chooseDate')}
        </button>
        <button class="action-btn danger" onclick="dashboard.archiveEmail('${email.id}'); document.getElementById('appointment-modal').classList.remove('active');">
          ${this.translate('reject')}
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

    // Setup day appointments modal
    const dayModal = document.getElementById('day-appointments-modal');
    const dayCloseBtn = document.getElementById('day-modal-close');
    
    if (dayModal && dayCloseBtn) {
      dayCloseBtn.addEventListener('click', () => {
        dayModal.classList.remove('active');
      });
      
      dayModal.addEventListener('click', (e) => {
        if (e.target === dayModal) {
          dayModal.classList.remove('active');
        }
      });
    }
  }

  showDayAppointmentsModal(dateStr, dayAppointments) {
    const modal = document.getElementById('day-appointments-modal');
    const modalTitle = document.getElementById('day-modal-title');
    const modalBody = document.getElementById('day-modal-body');
    
    if (!modal || !modalTitle || !modalBody) return;

    // Parse date
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const formattedDate = date.toLocaleDateString(this.getLocale(), { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    modalTitle.textContent = `${this.translate('appointmentsOn')} ${formattedDate}`;

    // Sort appointments by time
    const sortedAppointments = [...dayAppointments].sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
    });

    // Build appointment list HTML
    let html = '<div class="day-appointments-list">';
    
    sortedAppointments.forEach(apt => {
      const statusText = this.getStatusText(apt.status);

      html += `
        <div class="day-appointment-item" data-id="${apt.id}">
          <div class="day-appointment-time">${apt.time}</div>
          <div class="day-appointment-details">
            <div class="day-appointment-name">${apt.name}</div>
            <div class="day-appointment-info">
              <span class="status-badge ${apt.status}">${statusText}</span>
              ${apt.service ? `<span class="day-appointment-subject">${apt.service}</span>` : ''}
            </div>
          </div>
          <button class="day-appointment-view" onclick="dashboard.showAppointmentModal('${apt.id}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      `;
    });

    html += '</div>';
    
    modalBody.innerHTML = html;
    modal.classList.add('active');
  }

  showAppointmentModal(appointmentId, editMode = false) {
    const appointment = this.appointments.find(apt => apt.id == appointmentId);
    if (!appointment) return;
    
    // Close day appointments modal if it's open
    const dayModal = document.getElementById('day-appointments-modal');
    if (dayModal) {
      dayModal.classList.remove('active');
    }
    
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
      'nieuwe-aanvraag': this.translate('statusNew'),
      'bevestigd': this.translate('statusConfirmed'),
      'in-behandeling': this.translate('statusInProgress'),
      'afgerond': this.translate('statusCompleted')
    }[appointment.status];
    
    modalTitle.textContent = editMode ? this.translate('edit') + ' - ' + appointment.name : `${this.translate('appointmentDetails')} - ${appointment.name}`;
    
    if (editMode) {
      modalBody.innerHTML = `
        <div class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">${this.translate('status')}</span>
            <span class="status-badge ${appointment.status}">${statusText}</span>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-name">${this.translate('name')}</label>
            <input type="text" id="edit-name" class="form-control" value="${appointment.name}" required>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('email')}</span>
            <span class="detail-value">${appointment.email || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('phone')}</span>
            <span class="detail-value">${appointment.phone || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('licensePlate')}</span>
            <span class="detail-value">${appointment.kenteken || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('service')}</span>
            <span class="detail-value">${appointment.service || '-'}</span>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-date">${this.translate('date')}</label>
            <input type="date" id="edit-date" class="form-control" value="${appointment.date}" required>
          </div>
          <div class="detail-row">
            <label class="detail-label" for="edit-time">${this.translate('time')}</label>
            <input type="time" id="edit-time" class="form-control" value="${appointment.time}" required>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('notes')}</span>
            <div class="detail-value message-box">${appointment.notes || ''}</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn primary" onclick="dashboard.saveAppointmentChanges('${appointment.id}')">
            ${this.translate('save')}
          </button>
          <button class="action-btn secondary" onclick="dashboard.showAppointmentModal('${appointment.id}', false)">
            ${this.translate('cancel')}
          </button>
        </div>
      `;
    } else {
      modalBody.innerHTML = `
        <div class="detail-grid">
          <div class="detail-row">
            <span class="detail-label">${this.translate('status')}</span>
            <span class="status-badge ${appointment.status}">${statusText}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('name')}</span>
            <span class="detail-value">${appointment.name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('email')}</span>
            <span class="detail-value">${appointment.email || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('phone')}</span>
            <span class="detail-value">${appointment.phone || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('licensePlate')}</span>
            <span class="detail-value">${appointment.kenteken || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('service')}</span>
            <span class="detail-value">${appointment.service || '-'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('date')}</span>
            <span class="detail-value">${formattedDate}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('time')}</span>
            <span class="detail-value">${appointment.time}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${this.translate('message')}</span>
            <div class="detail-value message-box">${appointment.notes || ''}</div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="action-btn secondary" onclick="dashboard.showAppointmentModal('${appointment.id}', true)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            ${this.translate('edit')}
          </button>
          ${appointment.status === 'nieuwe-aanvraag' ? `
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${appointment.id}', 'bevestigd')">
              ${this.translate('confirm')}
            </button>
          ` : ''}
          ${appointment.status === 'bevestigd' ? `
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${appointment.id}', 'in-behandeling')">
              ${this.translate('statusInProgress')}
            </button>
          ` : ''}
          ${appointment.status === 'in-behandeling' ? `
            <button class="action-btn primary" onclick="dashboard.updateAppointmentStatus('${appointment.id}', 'afgerond')">
              ${this.translate('completed')}
            </button>
          ` : ''}
          <button class="action-btn danger" onclick="dashboard.confirmDelete('${appointment.id}')">
            ${this.translate('delete')}
          </button>
        </div>
      `;
    }
    
    modal.classList.add('active');
  }

  async updateAppointmentStatus(appointmentId, newStatus) {
    const appointment = this.appointments.find(apt => apt.id == appointmentId);
    if (appointment) {
      appointment.status = newStatus;
      
      try {
        await api.updateAppointment(appointmentId, { status: newStatus });
        await this.loadAllData();
      } catch (error) {
        console.error('Error updating appointment:', error);
        this.saveData('appointments', this.appointments);
      }
      
      this.updateStats();
      this.renderCalendar();
      this.renderAppointments();
      this.renderDashboard();
      this.showAppointmentModal(appointmentId);
      
      const statusText = {
        'nieuwe-aanvraag': this.translate('statusNew'),
        'bevestigd': this.translate('statusConfirmed'),
        'in-behandeling': this.translate('statusInProgress'),
        'afgerond': this.translate('statusCompleted')
      }[newStatus];
      
      this.showNotification(this.translate('statusUpdated', { status: statusText }));
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
      this.showNotification(this.translate('fillAllFields'), 'error');
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

  async performSaveAppointment(appointment, name, date, time) {
    // Update appointment
    appointment.name = name;
    appointment.date = date;
    appointment.time = time;
    
    // Save to database
    try {
      await api.updateAppointment(appointment.id, { 
        name: name, 
        date: date, 
        time: time 
      });
      await this.loadAllData();
    } catch (error) {
      console.error('Error updating appointment:', error);
      this.saveData('appointments', this.appointments);
    }
    
    this.updateStats();
    this.renderCalendar();
    this.renderAppointments();
    this.renderDashboard();
    this.showAppointmentModal(appointment.id, false);
    this.showNotification(this.translate('appointmentUpdated'));
  }

  confirmDelete(appointmentId) {
    this.showConfirmDialog(
      this.translate('deleteAppointmentConfirm'),
      () => {
        this.deleteAppointment(appointmentId);
      }
    );
  }

  async deleteAppointment(appointmentId) {
    try {
      await api.deleteAppointment(appointmentId);
      this.appointments = this.appointments.filter(apt => apt.id != appointmentId);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      this.appointments = this.appointments.filter(apt => apt.id != appointmentId);
      this.saveData('appointments', this.appointments);
    }
    
    const modal = document.getElementById('appointment-modal');
    modal.classList.remove('active');
    
    this.updateStats();
    this.renderCalendar();
    this.renderAppointments();
    this.renderDashboard();
    this.showNotification(this.translate('appointmentDeleted'));
  }

  async archiveEmail(emailId) {
    this.showConfirmDialog(
      this.translate('deleteEmailConfirm'),
      async () => {
        try {
          await api.deleteEmail(emailId);
          this.emails = this.emails.filter(e => e.id != emailId);
        } catch (error) {
          console.error('Error deleting email:', error);
          this.emails = this.emails.filter(e => e.id != emailId);
          this.saveData('emails', this.emails);
        }
        this.renderEmails();
        this.updateStats();
        this.showNotification(this.translate('emailDeleted'));
      }
    );
  }

  // Settings
  setupSettings() {
    const clearDataBtn = document.getElementById('clear-data-btn');
    const importIcsBtn = document.getElementById('import-ics-btn');
    const icsFileInput = document.getElementById('ics-file-input');
    
    // iCalendar Import
    if (importIcsBtn && icsFileInput) {
      importIcsBtn.addEventListener('click', () => {
        icsFileInput.click();
      });

      icsFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const statusEl = document.getElementById('import-status');
        
        try {
          const text = await file.text();
          const events = this.parseICalendar(text);
          
          if (events.length > 0) {
            // Store as work days in database
            try {
              await api.importWorkDaysBulk(events);
              this.workDays = events;
              
              this.renderCalendar(); // Re-render to show work day highlights
              
              if (statusEl) {
                statusEl.textContent = `✓ ${events.length} werkdagen geïmporteerd`;
                statusEl.style.color = '#10B981';
                setTimeout(() => statusEl.textContent = '', 5000);
              }
              
              this.showNotification(this.translate('workDaysAdded', { count: events.length }));
            } catch (dbError) {
              console.error('Database error:', dbError);
              // Fallback to localStorage
              this.workDays = events;
              this.saveData('workDays', this.workDays);
              this.renderCalendar();
              
              if (statusEl) {
                statusEl.textContent = `✓ ${events.length} werkdagen geïmporteerd (lokaal)`;
                statusEl.style.color = '#10B981';
                setTimeout(() => statusEl.textContent = '', 5000);
              }
            }
          } else {
            if (statusEl) {
              statusEl.textContent = '✗ Geen gebeurtenissen gevonden';
              statusEl.style.color = '#EF4444';
              setTimeout(() => statusEl.textContent = '', 5000);
            }
          }
          
          icsFileInput.value = '';
        } catch (error) {
          console.error('Error importing iCalendar:', error);
          if (statusEl) {
            statusEl.textContent = '✗ Fout bij importeren';
            statusEl.style.color = '#EF4444';
            setTimeout(() => statusEl.textContent = '', 5000);
          }
        }
      });
    }
    
    if (clearDataBtn) {
      clearDataBtn.addEventListener('click', () => {
        this.showConfirmDialog(
          this.translate('clearAllDataConfirm'),
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
            this.showNotification(this.translate('allDataCleared'));
          }
        );
      });
    }
  }

  // Parse iCalendar (.ics) file - Store as work day indicators, not appointments
  parseICalendar(icsText) {
    const workDays = [];
    const lines = icsText.split(/\r\n|\n|\r/);
    let currentEvent = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line === 'BEGIN:VEVENT') {
        currentEvent = {};
      } else if (line === 'END:VEVENT' && currentEvent) {
        if (currentEvent.start && currentEvent.description) {
          // Store as work day indicator (not appointment)
          workDays.push({
            date: currentEvent.start,
            shift: currentEvent.description, // e.g., "Ochtend door ploeg Blauw"
            startTime: currentEvent.startTime,
            endTime: currentEvent.endTime
          });
        }
        currentEvent = null;
      } else if (currentEvent) {
        // Parse DTSTART
        if (line.startsWith('DTSTART')) {
          const dateMatch = line.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
          if (dateMatch) {
            currentEvent.start = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
            currentEvent.startTime = `${dateMatch[4]}:${dateMatch[5]}`;
          }
        }
        // Parse DTEND
        else if (line.startsWith('DTEND')) {
          const dateMatch = line.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
          if (dateMatch) {
            currentEvent.endTime = `${dateMatch[4]}:${dateMatch[5]}`;
          }
        } 
        // Parse DESCRIPTION
        else if (line.startsWith('DESCRIPTION:')) {
          currentEvent.description = line.substring(12);
        }
      }
    }

    return workDays;
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
        <h3>${this.translate('confirmation')}</h3>
        <p>${message}</p>
        <div class="confirm-dialog-actions">
          <button class="action-btn secondary" id="confirm-cancel">${this.translate('cancel')}</button>
          <button class="action-btn danger" id="confirm-yes">${this.translate('yesContinue')}</button>
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
    const totalAppointments = this.appointments.length;
    const completed = this.appointments.filter(apt => apt.status === 'afgerond').length;
    const totalEmails = this.emails.length;
    const unreadEmails = this.emails.filter(email => !email.read).length;
    
    const totalActiveAppointments = this.appointments.filter(apt => apt.status !== 'afgerond').length;
    
    document.getElementById('stat-total-appointments').textContent = totalAppointments;
    document.getElementById('stat-completed').textContent = completed;
    document.getElementById('stat-total-emails').textContent = totalEmails;
    document.getElementById('stat-unread-emails').textContent = unreadEmails;
    
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
      todayContainer.innerHTML = `<p class="empty-state">${this.translate('noAppointmentsToday')}</p>`;
    } else {
      let html = '';
      todayAppointments.forEach(apt => {
        const statusText = this.getStatusText(apt.status);
        
        html += `<div class="appointment-item" onclick="dashboard.showAppointmentModal('${apt.id}')">
          <div class="item-header">
            <span class="item-title">${apt.name}</span>
            <span class="item-time">${apt.time}</span>
          </div>
          <div class="item-description">
            <span class="status-badge ${apt.status}">${statusText}</span> - ${apt.notes}
          </div>
        </div>`;
      });
      todayContainer.innerHTML = html;
    }
    
    // Recent emails
    const recentEmails = this.emails.slice(0, 5);
    const emailsContainer = document.getElementById('recent-emails');
    
    if (recentEmails.length === 0) {
      emailsContainer.innerHTML = `<p class="empty-state">${this.translate('noNewEmailsReceived')}</p>`;
    } else {
      let html = '';
      recentEmails.forEach(email => {
        const date = new Date(email.created_at);
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
