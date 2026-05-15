(function () {
  const defaultEvents = [
    {
      id: 'event-5',
      title: 'Мероприятие для жителей Большеелховского сельского поселения',
      category: 'Общественное мероприятие',
      date: '2024-08-30',
      time: '12:00',
      place: 'Большеелховское сельское поселение',
      summary: 'Информационный материал из календаря событий официального сайта поселения.',
      body: 'Администрация Большеелховского сельского поселения информирует жителей о проведении мероприятия, размещённого в официальном календаре событий. Такие публикации помогают заранее узнавать о важных встречах, общественных инициативах и мероприятиях, которые проходят на территории поселения.\n\nЖителям рекомендуется следить за объявлениями, уточнять время и место проведения, а также принимать участие в событиях, направленных на развитие общественной жизни, благоустройство и поддержку местных инициатив.\n\nПри необходимости дополнительную информацию можно получить через официальную страницу мероприятия или по контактам администрации поселения.',
      source: 'https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/kalendar-sobytiy/meropriyatiya_5.html',
      image: 'assets/img/events/event-01.jpg',
      sourceLabel: 'Официальный календарь событий'
    },
    {
      id: 'event-4',
      title: 'Заголовок мероприятия 4',
      category: 'Праздничная дата',
      date: '2024-08-24',
      time: '11:00',
      place: 'Территория поселения',
      summary: 'Анонс мероприятия из раздела календаря событий официального сайта.',
      body: 'В календаре событий опубликована информация о мероприятии для жителей поселения. Раздел предназначен для оперативного размещения сведений о праздниках, встречах, культурных программах и иных событиях, значимых для местного сообщества.\n\nФормат мероприятия может включать участие жителей, представителей учреждений, общественных объединений и сотрудников администрации. Перед посещением рекомендуется проверить актуальность даты, времени и места проведения на официальной странице.\n\nПубликация помогает сделать общественную жизнь поселения более открытой и удобной для жителей, чтобы важные события не оставались незамеченными.',
      source: 'https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/kalendar-sobytiy/zagolovok-meropriyatiya-4.html',
      image: 'assets/img/events/event-02.jpg',
      sourceLabel: 'Официальный календарь событий'
    },
    {
      id: 'event-3',
      title: 'Заголовок мероприятия 3',
      category: 'Встреча с жителями',
      date: '2024-08-23',
      time: '10:00',
      place: 'Администрация поселения',
      summary: 'Событие, связанное с информированием жителей и обсуждением вопросов поселения.',
      body: 'На официальном сайте размещён материал о мероприятии, которое относится к календарю событий поселения. Такие события могут быть связаны с обсуждением актуальных вопросов, информированием жителей, организацией встреч и совместных инициатив.\n\nУчастие жителей позволяет администрации получать обратную связь, оперативно выявлять проблемные вопросы и учитывать предложения при планировании работы. Для удобства посетителей информация вынесена на отдельную страницу с кратким описанием и ссылкой на официальный источник.\n\nЖителям рекомендуется заранее ознакомиться с условиями участия и при необходимости уточнить детали по официальным контактам администрации.',
      source: 'https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/kalendar-sobytiy/zagolovok-meropriyatiya-3.html',
      image: 'assets/img/events/event-03.jpg',
      sourceLabel: 'Официальный календарь событий'
    },
    {
      id: 'event-2',
      title: 'Заголовок мероприятия 2',
      category: 'Культурная программа',
      date: '2024-08-22',
      time: '14:00',
      place: 'Общественное пространство поселения',
      summary: 'Материал календаря событий о культурной и общественной жизни поселения.',
      body: 'Календарь событий содержит информацию о мероприятии, направленном на развитие культурной и общественной жизни поселения. Подобные публикации помогают жителям планировать участие в событиях, узнавать о программах и не пропускать значимые даты.\n\nМероприятия такого типа способствуют укреплению добрососедских связей, вовлечению семей, детей и молодёжи в общественную активность, а также поддержанию традиций поселения.\n\nДля получения точной информации о программе, месте проведения и возможных изменениях следует перейти на оригинальную страницу мероприятия на официальном сайте.',
      source: 'https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/kalendar-sobytiy/zagolovok-meropriyatiya-2.html',
      image: 'assets/img/events/event-04.jpg',
      sourceLabel: 'Официальный календарь событий'
    },
    {
      id: 'event-1',
      title: 'Заголовок мероприятия 1',
      category: 'Акция',
      date: '2024-08-21',
      time: '09:00',
      place: 'Большеелховское сельское поселение',
      summary: 'Первое мероприятие из подборки официального календаря событий.',
      body: 'В официальном календаре событий опубликовано мероприятие, предназначенное для информирования жителей о значимых активностях на территории поселения. Размещение таких материалов делает сайт более полезным и помогает быстро находить нужную информацию.\n\nЖители могут использовать раздел как афишу: смотреть даты, открывать отдельные страницы событий, переходить к оригинальному источнику и планировать участие.\n\nВ демонстрационной версии текст адаптирован под структуру сайта. При запуске проекта можно заменить описание на точный официальный текст мероприятия или подключить автоматическую загрузку данных из административной панели.',
      source: 'https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/kalendar-sobytiy/zagolovok-meropriyatiya-1.html',
      image: 'assets/img/events/event-05.jpg',
      sourceLabel: 'Официальный календарь событий'
    }
  ];

  const $ = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value || '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
  const formatDate = (value, time) => {
    if (!value) return '';
    const date = new Date(value + 'T00:00:00');
    const formatted = date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
    return time ? `${formatted}, ${time}` : formatted;
  };
  const paragraphHtml = (value) => String(value || '').split(/\n\s*\n/).map(part => part.trim()).filter(Boolean).map(part => `<p>${escapeHtml(part)}</p>`).join('');

  function getEvents() { return defaultEvents; }

  function renderCategoryOptions(items) {
    const select = $('eventCategory');
    if (!select) return;
    const current = select.value;
    const categories = [...new Set(items.map(item => item.category).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'ru'));
    select.innerHTML = '<option value="">Все типы</option>' + categories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');
    select.value = current;
  }

  function renderEventsPage() {
    const list = $('eventsList');
    if (!list) return;
    const search = $('eventSearch');
    const category = $('eventCategory');
    const counter = $('eventCounter');
    const total = $('eventsTotal');
    const reset = $('eventReset');
    const allItems = getEvents();
    renderCategoryOptions(allItems);
    if (total) total.textContent = allItems.length;

    const render = () => {
      const q = (search?.value || '').toLowerCase().trim();
      const cat = category?.value || '';
      const items = getEvents()
        .filter(item => !cat || item.category === cat)
        .filter(item => {
          const text = `${item.title} ${item.summary} ${item.body} ${item.category} ${item.place}`.toLowerCase();
          return !q || text.includes(q);
        })
        .sort((a,b)=>String(b.date).localeCompare(String(a.date)) || String(b.time || '').localeCompare(String(a.time || '')));
      if (counter) counter.textContent = `${items.length} из ${getEvents().length}`;
      if (!items.length) {
        list.innerHTML = '<div class="admin-card reveal visible empty-news"><h3>События не найдены</h3><p>Измените поисковый запрос или выберите другой тип события.</p></div>';
        return;
      }
      list.innerHTML = items.map((item, index) => {
        const featured = index === 0;
        const detailUrl = `event-detail.html?id=${encodeURIComponent(item.id)}`;
        const image = item.image || 'assets/img/events/event-default.jpg';
        return `<article class="event-card ${featured ? 'event-card--featured' : ''} reveal visible">
          <a class="event-card__media" href="${detailUrl}" aria-label="Открыть событие: ${escapeHtml(item.title)}"><img src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" loading="lazy"></a>
          <div class="event-card__date"><strong>${escapeHtml(new Date(item.date + 'T00:00:00').toLocaleDateString('ru-RU',{day:'2-digit'}))}</strong><span>${escapeHtml(new Date(item.date + 'T00:00:00').toLocaleDateString('ru-RU',{month:'short'}).replace('.', ''))}</span></div>
          <div class="event-card__body">
            <div class="news-tile__meta"><span class="tag">${escapeHtml(item.category)}</span><span>${formatDate(item.date, item.time)}</span></div>
            <h3><a href="${detailUrl}">${escapeHtml(item.title)}</a></h3>
            <p>${escapeHtml(item.summary)}</p>
            <div class="event-card__place">📍 ${escapeHtml(item.place)}</div>
            <a class="news-readmore" href="${detailUrl}">Открыть событие полностью <span aria-hidden="true">→</span></a>
          </div>
        </article>`;
      }).join('');
    };
    search?.addEventListener('input', render);
    category?.addEventListener('change', render);
    reset?.addEventListener('click', () => { if (search) search.value=''; if (category) category.value=''; render(); });
    render();
  }

  function renderEventDetail() {
    const holder = $('eventDetail');
    if (!holder) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const item = getEvents().find(e => e.id === id) || getEvents()[0];
    if (!item) {
      holder.innerHTML = '<div class="container"><div class="admin-card"><h1>Событие не найдено</h1><p>Вернитесь к календарю и выберите другое мероприятие.</p><a class="btn btn-primary" href="events.html">К событиям</a></div></div>';
      return;
    }
    document.title = `${item.title} — События`;
    const image = item.image || 'assets/img/events/event-default.jpg';
    holder.innerHTML = `<section class="article-hero section">
      <div class="container">
        <a class="back-link" href="events.html">← Все события</a>
        <div class="article-hero-grid reveal visible">
          <div class="article-hero-copy event-detail-copy">
            <div class="article-meta"><span class="tag">${escapeHtml(item.category)}</span><span>${formatDate(item.date, item.time)}</span></div>
            <h1>${escapeHtml(item.title)}</h1>
            <p>${escapeHtml(item.summary)}</p>
          </div>
          <figure class="article-cover"><img src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}"></figure>
        </div>
      </div>
    </section>
    <section class="section article-section">
      <div class="container article-layout">
        <article class="article-card reveal visible">
          ${paragraphHtml(item.body)}
          <div class="article-actions">
            ${item.source ? `<a class="btn btn-secondary" href="${escapeHtml(item.source)}" target="_blank" rel="noopener">Оригинальная страница</a>` : ''}
            <a class="btn btn-primary" href="events.html">Вернуться к событиям</a>
          </div>
        </article>
        <aside class="article-aside reveal visible">
          <strong>Информация о событии</strong>
          <span>Тип: ${escapeHtml(item.category)}</span>
          <span>Дата: ${formatDate(item.date, item.time)}</span>
          <span>Место: ${escapeHtml(item.place)}</span>
          <span>Источник: ${escapeHtml(item.sourceLabel || 'Календарь событий')}</span>
        </aside>
      </div>
    </section>`;
  }

  renderEventsPage();
  renderEventDetail();
})();
