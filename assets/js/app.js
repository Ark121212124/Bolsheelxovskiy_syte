const nav = document.querySelector('.nav-links');
const toggle = document.querySelector('.mobile-toggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-link]').forEach(link => {
  const href = link.getAttribute('href');
  if (href === current) link.classList.add('active');
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: .14});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const parallax = document.querySelector('.parallax');
if (parallax) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    parallax.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Theme switcher and compact municipal assistant
(function () {
  const root = document.documentElement;
  root.setAttribute('data-theme', localStorage.getItem('bolsheelhovskoe_theme') || 'light');
  const nav = document.querySelector('.nav-links');
  if (nav && !document.querySelector('.theme-toggle')) {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    const setLabel = () => { btn.innerHTML = root.getAttribute('data-theme') === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема'; };
    btn.addEventListener('click', () => { const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; root.setAttribute('data-theme', next); localStorage.setItem('bolsheelhovskoe_theme', next); setLabel(); });
    setLabel(); nav.appendChild(btn);
  }

  const APPEALS_KEY = 'bolsheelhovskoe_appeals';
  const getAppeals = () => { try { return JSON.parse(localStorage.getItem(APPEALS_KEY) || '[]'); } catch (e) { return []; } };
  const saveAppeal = (item) => { const list = getAppeals(); list.unshift(item); localStorage.setItem(APPEALS_KEY, JSON.stringify(list)); };
  const escapeHtml = (v) => String(v || '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const formatDateTime = (v) => { try { return new Date(v).toLocaleString('ru-RU'); } catch (e) { return v; } };

  function renderAppealsAdmin() {
    const holder = document.getElementById('adminAppealsList');
    if (!holder) return;
    const list = getAppeals();
    if (!list.length) { holder.innerHTML = '<p>Пока обращений нет. Проверьте форму через чат-бота в правом нижнем углу.</p>'; return; }
    holder.innerHTML = list.map(item => `<div class="appeal-item"><strong>${escapeHtml(item.name)}</strong><small>${formatDateTime(item.createdAt)} · ${escapeHtml(item.phone)}</small><p>${escapeHtml(item.text)}</p><span class="appeal-status">${escapeHtml(item.status || 'Новое')}</span></div>`).join('');
  }

  if (!document.querySelector('.chat-widget')) {
    const launcher = document.createElement('button');
    launcher.className = 'chat-launcher'; launcher.type = 'button'; launcher.innerHTML = '💬 Помощник';
    const widget = document.createElement('section');
    widget.className = 'chat-widget'; widget.setAttribute('aria-label', 'Чат-помощник администрации');
    widget.innerHTML = `<div class="chat-head"><div><strong>Помощник поселения</strong><span>Подскажу контакты, адрес администрации и помогу оставить обращение.</span></div><button class="chat-close" type="button" aria-label="Закрыть чат">×</button></div><div class="chat-body" id="chatBody"></div><div class="chat-quick"><button type="button" data-chat="contacts">Контакты</button><button type="button" data-chat="address">Адрес</button><button type="button" data-chat="hours">Приём граждан</button><button type="button" data-chat="appeal">Оставить обращение</button></div><form class="chat-input-row" id="chatForm"><input id="chatInput" autocomplete="off" placeholder="Напишите вопрос коротко..."><button type="submit">➜</button></form>`;
    document.body.appendChild(widget); document.body.appendChild(launcher);
    const body = widget.querySelector('#chatBody'); const input = widget.querySelector('#chatInput'); const form = widget.querySelector('#chatForm');
    function msg(text, type='bot') { const div = document.createElement('div'); div.className = `chat-msg ${type}`; div.innerHTML = text; body.appendChild(div); body.scrollTop = body.scrollHeight; return div; }
    function showAppealForm() {
      const holder = msg(`<b>Оставить обращение</b><br><span style="color:var(--muted)">Заполните форму. В демо-версии обращение сохранится в админ-панели этого браузера.</span><form class="appeal-form"><input name="name" required placeholder="ФИО"><input name="phone" required placeholder="Телефон или e-mail"><textarea name="text" required placeholder="Текст обращения"></textarea><button type="submit">Отправить обращение</button></form>`);
      holder.querySelector('form').addEventListener('submit', (event) => { event.preventDefault(); const fd = new FormData(event.target); const appeal = { id: 'a-' + Date.now(), name: String(fd.get('name') || '').trim(), phone: String(fd.get('phone') || '').trim(), text: String(fd.get('text') || '').trim(), status: 'Новое', createdAt: new Date().toISOString() }; saveAppeal(appeal); event.target.remove(); msg(`Спасибо! Обращение принято в демо-реестр.<br><b>Номер:</b> ${appeal.id}<br><span style="color:var(--muted)">Для реального запуска нужно подключить сервер, базу данных и защиту персональных данных.</span>`); renderAppealsAdmin(); });
    }
    function answer(kind) {
      const data = { contacts: '<b>Контакты администрации:</b><br>Тел.: +7 (83441) 3-09-90<br>Тел.: +7 (83441) 3-09-91<br><br>Для официального ответа можно оставить обращение через этого помощника.', address: '<b>Адрес администрации:</b><br>Республика Мордовия, Лямбирский район, с. Большая Елховка, ул. Фабричная, д. 21.', hours: '<b>Приём граждан:</b><br>График приёма лучше уточнить по телефону администрации. В демо-версии этот текст можно заменить на точные часы работы.', unknown: 'Я могу помочь с ограниченным набором вопросов: контакты, адрес, приём граждан или оставить обращение. Выберите кнопку ниже или напишите «обращение».' };
      if (kind === 'appeal') return showAppealForm(); msg(data[kind] || data.unknown);
    }
    const classify = (text) => { const t = text.toLowerCase(); if (/(контакт|телефон|номер|почт)/.test(t)) return 'contacts'; if (/(адрес|где|находит|проезд)/.test(t)) return 'address'; if (/(при[её]м|график|работ|часы)/.test(t)) return 'hours'; if (/(обращ|жалоб|заяв|написать|сообщить)/.test(t)) return 'appeal'; return 'unknown'; };
    launcher.addEventListener('click', () => widget.classList.toggle('open')); widget.querySelector('.chat-close').addEventListener('click', () => widget.classList.remove('open'));
    widget.querySelectorAll('[data-chat]').forEach(btn => btn.addEventListener('click', () => answer(btn.dataset.chat)));
    form.addEventListener('submit', (event) => { event.preventDefault(); const text = input.value.trim(); if (!text) return; msg(escapeHtml(text), 'user'); input.value = ''; setTimeout(() => answer(classify(text)), 180); });
    msg('Здравствуйте! Я короткий помощник сайта. Могу подсказать контакты, адрес администрации, график приёма или помочь оставить обращение.');
  }
  renderAppealsAdmin();
})();
