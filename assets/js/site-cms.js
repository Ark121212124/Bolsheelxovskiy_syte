(function () {
  'use strict';

  const EDITS_KEY = 'bolsheelhovskoe_site_edits_v1';
  const BUNDLED_EDITS_URL = 'assets/data/site-edits.json';
  let bundledEdits = {};
  const EDIT_MODE_KEY = 'bolsheelhovskoe_admin_edit_mode';
  const MOVE_MODE_KEY = 'bolsheelhovskoe_admin_move_mode';
  const ADMIN_SESSION_KEY = 'adminLogged';
  const EXCLUDE_SELECTOR = '.cms-editor-panel, .cms-modal, .cms-toast, .chat-widget, .chat-launcher, .theme-toggle, .mobile-toggle, script, style, noscript, input, textarea, select, option, label, form';
  const TEXT_SELECTOR = [
    'h1','h2','h3','h4','h5','h6','p','li','blockquote','figcaption',
    '.eyebrow','.brand-title','.brand-subtitle','.tag','.lead','.section-note',
    '.step-num','.dashboard-card strong','.dashboard-card span','.event-stat strong','.event-stat span',
    '.quick-directory-card strong','.quick-directory-card span','.directory-card-title','.directory-card-text',
    '.news-tile__date','.appeal-status','small','strong','span'
  ].join(',');
  const LINK_SELECTOR = 'a[href]';
  const IMAGE_SELECTOR = 'img';
  const MOVE_SELECTOR = [
    'main > section', '.hero', '.section', '.showcase', '.showcase-copy', '.showcase-visual',
    '.hero-copy', '.hero-visual', '.scene', '.card', '.card-body', '.split-card', '.stat-card',
    '.step', '.quick-directory-card', '.service-item', '.directory-card', '.news-tile', '.event-card',
    '.info-card', '.mini-section-card', '.contact-doc-group', '.doc-card-grid', '.contact-hero-copy',
    '.contact-quick', '.admin-accordion', '.staff-card-full', '.staff-info', '.staff-photo-placeholder',
    '.reception-banner', '.law-note-card', '.dashboard-card', '.event-stat', '.team-card',
    '.directory-hero__copy', '.directory-hero__panel', '.directory-toolbar', '.directory-callout__box',
    '.news-hero-copy', '.events-hero-copy', '.detail-main', '.detail-side', '.detail-text',
    '.article-cover', '.article-body', '.section-task-card', '.section-photo-card',
    '.cms-added-block', '.cms-added-section', '.cms-added-card', '.cms-added-photo', '.cms-added-text',
    '.footer-box', 'main img', '.footer img'
  ].join(',');

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const escapeHtml = (value) => String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const nl2br = (value) => escapeHtml(value).replace(/\r?\n/g, '<br>');
  const makeBlockId = () => `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const cssAttr = (value) => String(value || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');

  const normalizeSize = (value) => {
    const raw = String(value || '').trim().replace(',', '.');
    if (!raw) return '';
    if (/^\d+(\.\d+)?$/.test(raw)) return `${raw}px`;
    if (/^\d+(\.\d+)?(px|rem|em|%|vw|vh)$/.test(raw)) return raw;
    if (/^(auto|inherit|initial|unset)$/.test(raw)) return raw;
    return raw;
  };

  const normalizeLineHeight = (value) => {
    const raw = String(value || '').trim().replace(',', '.');
    if (!raw) return '';
    if (/^\d+(\.\d+)?$/.test(raw)) return raw;
    if (/^\d+(\.\d+)?(px|rem|em|%)$/.test(raw)) return raw;
    if (/^(normal|inherit|initial|unset)$/.test(raw)) return raw;
    return raw;
  };



  const normalizeSpacing = (value) => {
    const raw = String(value || '').trim().replace(',', '.');
    if (!raw) return '';
    if (/^-?\d+(\.\d+)?$/.test(raw)) return `${raw}px`;
    if (/^-?\d+(\.\d+)?(px|rem|em|%|vw|vh)$/.test(raw)) return raw;
    if (/^(auto|inherit|initial|unset)$/.test(raw)) return raw;
    return raw;
  };

  const normalizeOrder = (value) => {
    const raw = String(value || '').trim();
    if (!raw) return '';
    const num = parseInt(raw, 10);
    return Number.isFinite(num) ? String(num) : '';
  };

  const parseCssNumber = (value) => {
    const num = parseFloat(String(value || '').replace(',', '.'));
    return Number.isFinite(num) ? num : 0;
  };

  const readInline = (el, prop) => (el?.style?.getPropertyValue(prop) || '').trim();

  const prettyPx = (value) => {
    const num = parseFloat(value);
    return Number.isFinite(num) ? `${Math.round(num)}px` : '';
  };

  const setImportantStyle = (el, prop, value) => {
    if (!el) return;
    const normalized = normalizeSize(value);
    if (normalized) el.style.setProperty(prop, normalized, 'important');
    else el.style.removeProperty(prop);
  };


  const setRawStyle = (el, prop, value) => {
    if (!el) return;
    const normalized = String(value || '').trim();
    if (normalized) el.style.setProperty(prop, normalized, 'important');
    else el.style.removeProperty(prop);
  };

  const setSpacingStyle = (el, prop, value) => {
    if (!el) return;
    const normalized = normalizeSpacing(value);
    if (normalized) el.style.setProperty(prop, normalized, 'important');
    else el.style.removeProperty(prop);
  };

  function getImageSizeTarget(img) {
    return img.closest('.brand-mark, .icon, .contact-quick__icon, .reception-banner__icon, .admin-accordion__mark, .doc-group-headline > span, .staff-photo-placeholder, .scene, .showcase-visual, .card-image, .news-tile__media, .event-card__media, .article-cover, .detail-image') || img;
  }

  function applyTextStyles(el, value = {}) {
    setImportantStyle(el, 'font-size', value.fontSize || '');
    setImportantStyle(el, 'line-height', value.lineHeight || '');
  }

  function applyImageStyles(img, value = {}) {
    const target = getImageSizeTarget(img);
    setImportantStyle(target, 'width', value.width || '');
    setImportantStyle(target, 'height', value.height || '');
    if (value.height) target.style.setProperty('min-height', normalizeSize(value.height), 'important');
    else target.style.removeProperty('min-height');
    if (value.fit) img.style.setProperty('object-fit', value.fit, 'important');
    else img.style.removeProperty('object-fit');
    if (value.position) img.style.setProperty('object-position', value.position, 'important');
    else img.style.removeProperty('object-position');
  }


  function applyLayoutStyles(el, value = {}) {
    if (!el) return;
    const order = normalizeOrder(value.order || '');
    setRawStyle(el, 'order', order);
    setSpacingStyle(el, 'margin-top', value.marginTop || '');
    setSpacingStyle(el, 'margin-left', value.marginLeft || '');
    if (value.zIndex) setRawStyle(el, 'z-index', String(value.zIndex));
    else el.style.removeProperty('z-index');
    if (value.marginTop || value.marginLeft || value.zIndex) {
      el.classList.add('cms-positioned');
      if (getComputedStyle(el).position === 'static') el.style.setProperty('position', 'relative', 'important');
    } else {
      el.classList.remove('cms-positioned');
      el.style.removeProperty('position');
    }
  }

  function isAdmin() {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'yes';
  }

  function getPageKey() {
    const file = location.pathname.split('/').pop() || 'index.html';
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    return id ? `${file}?id=${id}` : file;
  }

  function deepMergeEdits(base, extra) {
    const out = Array.isArray(base) ? base.slice() : { ...(base || {}) };
    if (!extra || typeof extra !== 'object') return out;
    Object.keys(extra).forEach(key => {
      const a = out[key];
      const b = extra[key];
      if (b && typeof b === 'object' && !Array.isArray(b) && a && typeof a === 'object' && !Array.isArray(a)) {
        out[key] = deepMergeEdits(a, b);
      } else {
        out[key] = b;
      }
    });
    return out;
  }

  function getLocalEdits() {
    try {
      const parsed = JSON.parse(localStorage.getItem(EDITS_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function getEdits() {
    return deepMergeEdits(bundledEdits, getLocalEdits());
  }

  function saveEdits(data) {
    localStorage.setItem(EDITS_KEY, JSON.stringify(data));
  }

  function getCurrentPageData(data = getEdits()) {
    const page = getPageKey();
    if (!data[page]) data[page] = {};
    return data[page];
  }

  function findElementByCmsPath(path) {
    if (!path) return null;
    const byKey = document.querySelector(`[data-cms-key="${cssAttr(path)}"]`);
    if (byKey) return byKey;
    try { return document.body.querySelector(path); } catch (e) { return null; }
  }

  function buildAddedBlock(block = {}) {
    const id = block.id || makeBlockId();
    const type = block.type || 'card';
    const title = block.title || 'Новый блок';
    const tag = block.tag || 'Новый раздел';
    const text = block.text || 'Добавьте описание блока через режим правки.';
    const imageSrc = block.imageSrc || '';
    const imageAlt = block.imageAlt || title;
    const buttonText = block.buttonText || '';
    const buttonHref = block.buttonHref || '#';
    const contacts = block.contacts || '';
    const asInline = block.location && block.location.mode === 'after';
    const rootTag = asInline ? 'article' : 'section';
    const rootClass = asInline
      ? `cms-added-block cms-added-card cms-added-card--${escapeHtml(type)} card reveal visible`
      : `section cms-added-section cms-added-block cms-added-card--${escapeHtml(type)} reveal visible`;
    const imageHtml = imageSrc ? `
      <figure class="cms-added-image card-image" data-cms-key="added:${escapeHtml(id)}:imageWrap">
        <img data-cms-key="added:${escapeHtml(id)}:image" src="${escapeHtml(imageSrc)}" alt="${escapeHtml(imageAlt)}">
      </figure>` : '';
    const buttonHtml = buttonText ? `<a class="btn btn-secondary" data-cms-key="added:${escapeHtml(id)}:button" href="${escapeHtml(buttonHref)}">${escapeHtml(buttonText)}</a>` : '';
    const contactsHtml = contacts ? `<div class="cms-added-lines" data-cms-key="added:${escapeHtml(id)}:contacts">${nl2br(contacts)}</div>` : '';
    const inner = `
      ${imageHtml}
      <div class="cms-added-content">
        <span class="tag" data-cms-key="added:${escapeHtml(id)}:tag">${escapeHtml(tag)}</span>
        <h2 data-cms-key="added:${escapeHtml(id)}:title">${escapeHtml(title)}</h2>
        <p data-cms-key="added:${escapeHtml(id)}:text">${nl2br(text)}</p>
        ${contactsHtml}
        ${buttonHtml ? `<div class="cms-added-actions">${buttonHtml}</div>` : ''}
      </div>`;
    const html = asInline
      ? `<${rootTag} class="${rootClass}" data-cms-added="${escapeHtml(id)}" data-cms-key="added:${escapeHtml(id)}">${inner}</${rootTag}>`
      : `<${rootTag} class="${rootClass}" data-cms-added="${escapeHtml(id)}" data-cms-key="added:${escapeHtml(id)}"><div class="container"><div class="cms-added-shell">${inner}</div></div></${rootTag}>`;
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  function insertAddedBlock(node, block = {}) {
    const main = $('main') || document.body;
    const locationData = block.location || { mode: 'bottom' };
    if (locationData.mode === 'top') {
      main.prepend(node);
      return;
    }
    if (locationData.mode === 'after' && locationData.target) {
      const target = findElementByCmsPath(locationData.target);
      if (target && target.parentElement) {
        target.insertAdjacentElement('afterend', node);
        return;
      }
    }
    main.appendChild(node);
  }

  function applyAddedBlocks() {
    const data = getEdits();
    const pageData = data[getPageKey()] || {};
    const blocks = Array.isArray(pageData.__blocks) ? pageData.__blocks : [];
    blocks.forEach(block => {
      if (!block || !block.id) return;
      if (document.querySelector(`[data-cms-added="${cssAttr(block.id)}"]`)) return;
      const node = buildAddedBlock(block);
      insertAddedBlock(node, block);
    });
    if (isAdmin() && localStorage.getItem(EDIT_MODE_KEY) === 'on') markEditableElements();
    if (isAdmin() && localStorage.getItem(MOVE_MODE_KEY) === 'on') markMovableElements();
  }

  function saveAddedBlock(block) {
    const data = getEdits();
    const pageData = getCurrentPageData(data);
    if (!Array.isArray(pageData.__blocks)) pageData.__blocks = [];
    pageData.__blocks.push(block);
    saveEdits(data);
    applyAddedBlocks();
    toast('Новый блок добавлен');
  }

  function hideBlock(el) {
    if (!el) return;
    const path = elementPath(el);
    const label = (el.innerText || el.alt || el.getAttribute('class') || el.tagName || 'Блок').trim().replace(/\s+/g, ' ').slice(0, 90);
    if (!confirm(`Удалить этот блок со страницы?\n\n${label}`)) return;
    el.style.setProperty('display', 'none', 'important');
    setEdit('hidden', path, { hidden: true, label, at: new Date().toISOString() });
    toast('Блок удалён. Его можно вернуть кнопкой «Вернуть удалённые».');
  }

  function hideSelectedEditable(el, modal, label = 'элемент') {
    if (!el) return;
    if (modal) modal.remove();
    hideBlock(el);
    if (localStorage.getItem(EDIT_MODE_KEY) === 'on') {
      setTimeout(markEditableElements, 80);
    }
  }

  function clearHiddenEdits(page = getPageKey()) {
    const data = getEdits();
    if (!data[page]) return;
    Object.keys(data[page]).forEach(key => {
      if (key.startsWith('hidden:')) delete data[page][key];
    });
    saveEdits(data);
  }

  function applyHiddenEdits(pagesToApply) {
    if (!pagesToApply || !pagesToApply.length) return;
    $$(`${MOVE_SELECTOR}, ${TEXT_SELECTOR}, ${LINK_SELECTOR}, ${IMAGE_SELECTOR}`).forEach(el => {
      if (isExcluded(el)) return;
      const path = elementPath(el);
      for (const pageData of pagesToApply) {
        const hiddenValue = pageData[`hidden:${path}`];
        if (hiddenValue && hiddenValue.hidden) {
          el.style.setProperty('display', 'none', 'important');
          el.dataset.cmsHidden = 'true';
          break;
        }
      }
    });
  }

  function setEdit(type, key, value) {
    const data = getEdits();
    const page = getPageKey();
    if (!data[page]) data[page] = {};
    data[page][`${type}:${key}`] = value;
    saveEdits(data);
  }

  function removePageEdits(page = getPageKey()) {
    const data = getEdits();
    delete data[page];
    saveEdits(data);
  }

  function readablePageName(pageKey) {
    const map = {
      'index.html': 'Главная',
      'about.html': 'О поселении',
      'residents.html': 'Жителям',
      'directory.html': 'Справочник',
      'news.html': 'Новости',
      'news-detail.html': 'Страница новости',
      'events.html': 'События',
      'event-detail.html': 'Страница события',
      'contacts.html': 'Контакты',
      'administration.html': 'Администрация',
      'section-detail.html': 'Внутренний раздел',
      'admin.html': 'Админ-панель'
    };
    const clean = pageKey.split('?')[0];
    return map[clean] || clean;
  }

  function elementPath(el) {
    if (el.dataset.cmsKey) return el.dataset.cmsKey;
    const parts = [];
    let node = el;
    while (node && node.nodeType === 1 && node !== document.body) {
      const parent = node.parentElement;
      if (!parent) break;
      const tag = node.tagName.toLowerCase();
      const sameTag = Array.from(parent.children).filter(child => child.tagName === node.tagName);
      const index = sameTag.indexOf(node) + 1;
      parts.unshift(`${tag}:nth-of-type(${index})`);
      node = parent;
    }
    return parts.join('>');
  }

  function isExcluded(el) {
    if (!el || el.closest(EXCLUDE_SELECTOR)) return true;
    return false;
  }

  function isEditableText(el) {
    if (isExcluded(el)) return false;
    if (el.matches(LINK_SELECTOR) || el.matches(IMAGE_SELECTOR)) return false;
    if (!el.matches(TEXT_SELECTOR)) return false;
    const text = (el.innerText || el.textContent || '').trim();
    if (!text) return false;
    if (text.length > 2500) return false;
    return true;
  }


  function isMovableElement(el) {
    if (!el || isExcluded(el)) return false;
    if (!el.closest('main, .footer')) return false;
    if (!el.matches(MOVE_SELECTOR)) return false;
    if (el.closest('.site-header, .navbar, .nav-links')) return false;
    return true;
  }

  function markEditableElements() {
    $$(`${TEXT_SELECTOR}, ${LINK_SELECTOR}, ${IMAGE_SELECTOR}`).forEach(el => {
      if (isExcluded(el)) return;
      if (el.matches(IMAGE_SELECTOR)) {
        if (el.dataset.cmsType !== 'image') el.dataset.cmsType = 'image';
        if (!el.classList.contains('cms-editable')) el.classList.add('cms-editable');
        return;
      }
      if (el.matches(LINK_SELECTOR)) {
        if (el.dataset.cmsType !== 'link') el.dataset.cmsType = 'link';
        if (!el.classList.contains('cms-editable')) el.classList.add('cms-editable');
        return;
      }
      if (isEditableText(el)) {
        if (el.dataset.cmsType !== 'text') el.dataset.cmsType = 'text';
        if (!el.classList.contains('cms-editable')) el.classList.add('cms-editable');
      }
    });
  }

  function clearEditableMarks() {
    $$('.cms-editable').forEach(el => {
      el.classList.remove('cms-editable');
      delete el.dataset.cmsType;
    });
  }


  function markMovableElements() {
    $$(MOVE_SELECTOR).forEach(el => {
      if (!isMovableElement(el)) return;
      if (!el.classList.contains('cms-movable')) el.classList.add('cms-movable');
    });
  }

  function clearMovableMarks() {
    $$('.cms-movable').forEach(el => el.classList.remove('cms-movable', 'cms-drag-ready', 'cms-live-dragging'));
  }

  function getMoveTarget(target) {
    if (!target || !target.closest) return null;
    const direct = target.closest('.cms-movable');
    if (direct && isMovableElement(direct)) return direct;
    const candidate = target.closest(MOVE_SELECTOR);
    return isMovableElement(candidate) ? candidate : null;
  }

  function applyEdits() {
    applyAddedBlocks();
    const data = getEdits();
    const pagesToApply = [data['global'] || {}, data[getPageKey()] || {}];
    if (!pagesToApply.some(page => Object.keys(page).length)) return;

    $$(`${TEXT_SELECTOR}, ${LINK_SELECTOR}, ${IMAGE_SELECTOR}`).forEach(el => {
      if (isExcluded(el)) return;
      const path = elementPath(el);
      for (const pageData of pagesToApply) {
        const textValue = pageData[`text:${path}`];
        const linkValue = pageData[`link:${path}`];
        const imageValue = pageData[`image:${path}`];
        if (textValue && !el.matches(LINK_SELECTOR) && !el.matches(IMAGE_SELECTOR)) {
          const nextText = textValue.text || '';
          if (el.textContent !== nextText) el.textContent = nextText;
          applyTextStyles(el, textValue);
        }
        if (linkValue && el.matches(LINK_SELECTOR)) {
          if (typeof linkValue.text === 'string' && el.textContent !== linkValue.text) el.textContent = linkValue.text;
          if (typeof linkValue.href === 'string' && el.getAttribute('href') !== linkValue.href) el.setAttribute('href', linkValue.href);
          if (typeof linkValue.target === 'string') {
            if (linkValue.target && el.getAttribute('target') !== linkValue.target) el.setAttribute('target', linkValue.target);
            if (!linkValue.target && el.hasAttribute('target')) el.removeAttribute('target');
          }
          applyTextStyles(el, linkValue);
        }
        if (imageValue && el.matches(IMAGE_SELECTOR)) {
          if (imageValue.src && el.getAttribute('src') !== imageValue.src) el.setAttribute('src', imageValue.src);
          if (typeof imageValue.alt === 'string' && el.getAttribute('alt') !== imageValue.alt) el.setAttribute('alt', imageValue.alt);
          applyImageStyles(el, imageValue);
        }
      }
    });
    applyLayoutEdits(pagesToApply);
    applyHiddenEdits(pagesToApply);
  }

  function applyLayoutEdits(pagesToApply) {
    if (!pagesToApply || !pagesToApply.length) return;
    $$(MOVE_SELECTOR).forEach(el => {
      if (!isMovableElement(el)) return;
      const path = elementPath(el);
      for (const pageData of pagesToApply) {
        const layoutValue = pageData[`layout:${path}`];
        if (layoutValue) applyLayoutStyles(el, layoutValue);
      }
    });
  }

  function toast(message) {
    let box = $('.cms-toast');
    if (!box) {
      box = document.createElement('div');
      box.className = 'cms-toast';
      document.body.appendChild(box);
    }
    box.textContent = message;
    box.classList.add('show');
    clearTimeout(box._timer);
    box._timer = setTimeout(() => box.classList.remove('show'), 2200);
  }

  function createModal(title, innerHtml) {
    $('.cms-modal')?.remove();
    const modal = document.createElement('div');
    modal.className = 'cms-modal';
    modal.innerHTML = `
      <div class="cms-modal__dialog" role="dialog" aria-modal="true">
        <div class="cms-modal__head">
          <strong>${escapeHtml(title)}</strong>
          <button class="cms-modal__close" type="button" aria-label="Закрыть">×</button>
        </div>
        <div class="cms-modal__body">${innerHtml}</div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.cms-modal__close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    return modal;
  }

  function editText(el) {
    const path = elementPath(el);
    const computed = getComputedStyle(el);
    const currentFontSize = readInline(el, 'font-size');
    const currentLineHeight = readInline(el, 'line-height');
    const fontSizePlaceholder = prettyPx(computed.fontSize);
    const lineHeightPlaceholder = computed.lineHeight === 'normal' ? 'normal' : prettyPx(computed.lineHeight);
    const modal = createModal('Редактировать текст', `
      <label class="cms-field">Текст блока
        <textarea id="cmsTextValue" rows="7">${escapeHtml(el.innerText || el.textContent || '')}</textarea>
      </label>
      <div class="cms-field-grid">
        <label class="cms-field">Размер текста
          <input id="cmsTextFontSize" value="${escapeHtml(currentFontSize)}" placeholder="стандарт: ${escapeHtml(fontSizePlaceholder)}">
        </label>
        <label class="cms-field">Межстрочный интервал
          <input id="cmsTextLineHeight" value="${escapeHtml(currentLineHeight)}" placeholder="стандарт: ${escapeHtml(lineHeightPlaceholder)}">
        </label>
      </div>
      <label class="cms-check"><input id="cmsTextResetSize" type="checkbox"> Сбросить размер текста к стандартному</label>
      <div class="cms-help">Можно писать просто число — редактор сам добавит <b>px</b>. Например: 28. Чтобы вернуть стандартный размер, поставьте галочку сброса.</div>
      <div class="cms-actions"><button class="btn btn-primary" id="cmsSaveText" type="button">Сохранить</button><button class="btn btn-secondary" id="cmsCancel" type="button">Отмена</button><button class="btn btn-danger" id="cmsDeleteText" type="button">Удалить этот текст</button></div>`);
    modal.querySelector('#cmsCancel').addEventListener('click', () => modal.remove());
    modal.querySelector('#cmsDeleteText').addEventListener('click', () => hideSelectedEditable(el, modal, 'текст'));
    modal.querySelector('#cmsSaveText').addEventListener('click', () => {
      const text = modal.querySelector('#cmsTextValue').value;
      const reset = modal.querySelector('#cmsTextResetSize').checked;
      const fontSize = reset ? '' : normalizeSize(modal.querySelector('#cmsTextFontSize').value);
      const lineHeight = reset ? '' : normalizeLineHeight(modal.querySelector('#cmsTextLineHeight').value);
      el.textContent = text;
      applyTextStyles(el, { fontSize, lineHeight });
      setEdit('text', path, { text, fontSize, lineHeight });
      modal.remove();
      toast('Текст и размер сохранены');
    });
  }

  function editLink(el) {
    const path = elementPath(el);
    const computed = getComputedStyle(el);
    const currentFontSize = readInline(el, 'font-size');
    const currentLineHeight = readInline(el, 'line-height');
    const fontSizePlaceholder = prettyPx(computed.fontSize);
    const lineHeightPlaceholder = computed.lineHeight === 'normal' ? 'normal' : prettyPx(computed.lineHeight);
    const modal = createModal('Редактировать ссылку или кнопку', `
      <label class="cms-field">Текст ссылки
        <input id="cmsLinkText" value="${escapeHtml(el.innerText || el.textContent || '')}">
      </label>
      <label class="cms-field">Адрес ссылки
        <input id="cmsLinkHref" value="${escapeHtml(el.getAttribute('href') || '')}">
      </label>
      <div class="cms-field-grid">
        <label class="cms-field">Размер текста
          <input id="cmsLinkFontSize" value="${escapeHtml(currentFontSize)}" placeholder="стандарт: ${escapeHtml(fontSizePlaceholder)}">
        </label>
        <label class="cms-field">Межстрочный интервал
          <input id="cmsLinkLineHeight" value="${escapeHtml(currentLineHeight)}" placeholder="стандарт: ${escapeHtml(lineHeightPlaceholder)}">
        </label>
      </div>
      <label class="cms-check"><input id="cmsLinkResetSize" type="checkbox"> Сбросить размер текста к стандартному</label>
      <label class="cms-check"><input id="cmsLinkBlank" type="checkbox" ${el.getAttribute('target') === '_blank' ? 'checked' : ''}> Открывать в новой вкладке</label>
      <div class="cms-help">Для внутренней страницы указывайте, например: <b>contacts.html</b>. Для внешней — полный адрес сайта. Размер можно указать числом или с единицей: <b>16</b>, <b>22px</b>, <b>1.2rem</b>.</div>
      <div class="cms-actions"><button class="btn btn-primary" id="cmsSaveLink" type="button">Сохранить</button><button class="btn btn-secondary" id="cmsCancel" type="button">Отмена</button><button class="btn btn-danger" id="cmsDeleteLink" type="button">Удалить эту кнопку/ссылку</button></div>`);
    modal.querySelector('#cmsCancel').addEventListener('click', () => modal.remove());
    modal.querySelector('#cmsDeleteLink').addEventListener('click', () => hideSelectedEditable(el, modal, 'ссылку'));
    modal.querySelector('#cmsSaveLink').addEventListener('click', () => {
      const text = modal.querySelector('#cmsLinkText').value;
      const href = modal.querySelector('#cmsLinkHref').value.trim() || '#';
      const target = modal.querySelector('#cmsLinkBlank').checked ? '_blank' : '';
      const reset = modal.querySelector('#cmsLinkResetSize').checked;
      const fontSize = reset ? '' : normalizeSize(modal.querySelector('#cmsLinkFontSize').value);
      const lineHeight = reset ? '' : normalizeLineHeight(modal.querySelector('#cmsLinkLineHeight').value);
      el.textContent = text;
      el.setAttribute('href', href);
      if (target) el.setAttribute('target', target); else el.removeAttribute('target');
      applyTextStyles(el, { fontSize, lineHeight });
      setEdit('link', path, { text, href, target, fontSize, lineHeight });
      modal.remove();
      toast('Ссылка, кнопка и размер сохранены');
    });
  }

  function editImage(el) {
    const path = elementPath(el);
    const target = getImageSizeTarget(el);
    const computedTarget = getComputedStyle(target);
    const currentWidth = readInline(target, 'width');
    const currentHeight = readInline(target, 'height');
    const currentFit = readInline(el, 'object-fit') || getComputedStyle(el).objectFit || 'cover';
    const currentPosition = readInline(el, 'object-position') || getComputedStyle(el).objectPosition || 'center';
    const modal = createModal('Редактировать фотографию / иконку', `
      <label class="cms-field">Путь к изображению
        <input id="cmsImageSrc" value="${escapeHtml(el.getAttribute('src') || '')}" placeholder="assets/img/custom/hero-main.jpg">
      </label>
      <label class="cms-field">Описание изображения
        <input id="cmsImageAlt" value="${escapeHtml(el.getAttribute('alt') || '')}">
      </label>
      <div class="cms-field-grid">
        <label class="cms-field">Ширина фото/иконки
          <input id="cmsImageWidth" value="${escapeHtml(currentWidth)}" placeholder="сейчас примерно ${escapeHtml(prettyPx(computedTarget.width))}">
        </label>
        <label class="cms-field">Высота фото/иконки
          <input id="cmsImageHeight" value="${escapeHtml(currentHeight)}" placeholder="сейчас примерно ${escapeHtml(prettyPx(computedTarget.height))}">
        </label>
      </div>
      <div class="cms-field-grid">
        <label class="cms-field">Подгонка изображения
          <select id="cmsImageFit">
            <option value="cover" ${currentFit === 'cover' ? 'selected' : ''}>cover — заполнить блок</option>
            <option value="contain" ${currentFit === 'contain' ? 'selected' : ''}>contain — показать полностью</option>
            <option value="fill" ${currentFit === 'fill' ? 'selected' : ''}>fill — растянуть</option>
            <option value="none" ${currentFit === 'none' ? 'selected' : ''}>none — без подгонки</option>
          </select>
        </label>
        <label class="cms-field">Позиция
          <input id="cmsImagePosition" value="${escapeHtml(currentPosition)}" placeholder="center или 50% 30%">
        </label>
      </div>
      <label class="cms-check"><input id="cmsImageResetSize" type="checkbox"> Сбросить размер фото/иконки к стандартному</label>
      <label class="cms-field">Или выбрать файл с компьютера
        <input id="cmsImageFile" type="file" accept="image/*">
      </label>
      <div class="cms-help">Файлы сайта не изменяются. Можно менять путь, описание, ширину и высоту. Размер указывайте так: <b>80px</b>, <b>100%</b>, <b>420px</b> или оставьте пустым для стандартного размера.</div>
      <div class="cms-actions"><button class="btn btn-primary" id="cmsSaveImage" type="button">Сохранить</button><button class="btn btn-secondary" id="cmsCancel" type="button">Отмена</button><button class="btn btn-danger" id="cmsDeleteImage" type="button">Удалить это фото/иконку</button></div>`);
    modal.querySelector('#cmsCancel').addEventListener('click', () => modal.remove());
    modal.querySelector('#cmsDeleteImage').addEventListener('click', () => hideSelectedEditable(el, modal, 'изображение'));
    modal.querySelector('#cmsSaveImage').addEventListener('click', () => {
      const file = modal.querySelector('#cmsImageFile').files[0];
      const alt = modal.querySelector('#cmsImageAlt').value;
      const reset = modal.querySelector('#cmsImageResetSize').checked;
      const width = reset ? '' : normalizeSize(modal.querySelector('#cmsImageWidth').value);
      const height = reset ? '' : normalizeSize(modal.querySelector('#cmsImageHeight').value);
      const fit = reset ? '' : modal.querySelector('#cmsImageFit').value;
      const position = reset ? '' : modal.querySelector('#cmsImagePosition').value.trim();
      const saveSrc = (src) => {
        el.setAttribute('src', src);
        el.setAttribute('alt', alt);
        applyImageStyles(el, { width, height, fit, position });
        setEdit('image', path, { src, alt, width, height, fit, position });
        modal.remove();
        toast('Изображение и размер сохранены');
      };
      if (file) {
        const reader = new FileReader();
        reader.onload = () => saveSrc(String(reader.result || ''));
        reader.readAsDataURL(file);
      } else {
        saveSrc(modal.querySelector('#cmsImageSrc').value.trim() || el.getAttribute('src') || '');
      }
    });
  }


  function openAddBlockModal(location = { mode: 'bottom' }) {
    const afterSelected = location && location.mode === 'after';
    const modal = createModal('Добавить новый блок', `
      <label class="cms-field">Тип блока
        <select id="cmsAddType">
          <option value="card">Карточка с текстом</option>
          <option value="text">Текстовый блок</option>
          <option value="photo">Фото-блок</option>
          <option value="contact">Контактная карточка</option>
        </select>
      </label>
      <div class="cms-field-grid">
        <label class="cms-field">Метка / категория
          <input id="cmsAddTag" value="Новый раздел">
        </label>
        <label class="cms-field">Заголовок
          <input id="cmsAddTitle" value="Новый блок">
        </label>
      </div>
      <label class="cms-field">Основной текст
        <textarea id="cmsAddText" rows="5">Добавьте описание блока. После сохранения текст можно будет редактировать обычной правкой.</textarea>
      </label>
      <label class="cms-field">Контакты / дополнительные строки
        <textarea id="cmsAddContacts" rows="4" placeholder="Телефон: ...\nEmail: ...\nАдрес: ..."></textarea>
      </label>
      <div class="cms-field-grid">
        <label class="cms-field">Путь к фото
          <input id="cmsAddImage" placeholder="assets/img/sections/section-default.jpg">
        </label>
        <label class="cms-field">Описание фото
          <input id="cmsAddImageAlt" placeholder="Описание изображения">
        </label>
      </div>
      <label class="cms-field">Или выбрать фото с компьютера
        <input id="cmsAddImageFile" type="file" accept="image/*">
      </label>
      <div class="cms-field-grid">
        <label class="cms-field">Текст кнопки
          <input id="cmsAddButtonText" placeholder="Открыть раздел">
        </label>
        <label class="cms-field">Ссылка кнопки
          <input id="cmsAddButtonHref" placeholder="https://... или contacts.html">
        </label>
      </div>
      <label class="cms-field">Куда добавить
        <select id="cmsAddLocation">
          <option value="bottom">В конец страницы</option>
          <option value="top">В начало страницы</option>
          ${afterSelected ? '<option value="after" selected>После выбранного блока</option>' : ''}
        </select>
      </label>
      <div class="cms-help">Блок добавляется только на текущую страницу. После добавления его можно редактировать, менять размер, передвигать и удалять как обычные элементы сайта.</div>
      <div class="cms-actions">
        <button class="btn btn-primary" id="cmsSaveAddedBlock" type="button">Добавить блок</button>
        <button class="btn btn-secondary" id="cmsCancel" type="button">Отмена</button>
      </div>`);
    modal.querySelector('#cmsCancel').addEventListener('click', () => modal.remove());
    modal.querySelector('#cmsSaveAddedBlock').addEventListener('click', () => {
      const selectedLocation = modal.querySelector('#cmsAddLocation').value;
      const file = modal.querySelector('#cmsAddImageFile').files[0];
      const createBlock = (imageSrc) => {
        const block = {
          id: makeBlockId(),
          type: modal.querySelector('#cmsAddType').value || 'card',
          tag: modal.querySelector('#cmsAddTag').value.trim() || 'Новый раздел',
          title: modal.querySelector('#cmsAddTitle').value.trim() || 'Новый блок',
          text: modal.querySelector('#cmsAddText').value.trim() || 'Добавьте описание блока.',
          contacts: modal.querySelector('#cmsAddContacts').value.trim(),
          imageSrc: imageSrc || modal.querySelector('#cmsAddImage').value.trim(),
          imageAlt: modal.querySelector('#cmsAddImageAlt').value.trim() || modal.querySelector('#cmsAddTitle').value.trim() || 'Изображение',
          buttonText: modal.querySelector('#cmsAddButtonText').value.trim(),
          buttonHref: modal.querySelector('#cmsAddButtonHref').value.trim() || '#',
          location: selectedLocation === 'after' && afterSelected ? { mode: 'after', target: location.target } : { mode: selectedLocation }
        };
        saveAddedBlock(block);
        modal.remove();
      };
      if (file) {
        const reader = new FileReader();
        reader.onload = () => createBlock(String(reader.result || ''));
        reader.readAsDataURL(file);
      } else {
        createBlock('');
      }
    });
  }

  function editMove(el) {
    const path = elementPath(el);
    const currentOrder = readInline(el, 'order');
    const currentTop = readInline(el, 'margin-top');
    const currentLeft = readInline(el, 'margin-left');
    const currentZ = readInline(el, 'z-index');
    const label = (el.innerText || el.alt || el.getAttribute('aria-label') || el.getAttribute('class') || el.tagName || 'Блок').trim().replace(/\s+/g, ' ').slice(0, 80);
    const modal = createModal('Переместить блок', `
      <div class="cms-move-preview">
        <span>Выбранный блок</span>
        <strong>${escapeHtml(label || 'Без названия')}</strong>
      </div>
      <div class="cms-field-grid">
        <label class="cms-field">Порядок в сетке
          <input id="cmsMoveOrder" value="${escapeHtml(currentOrder)}" placeholder="0">
        </label>
        <label class="cms-field">Слой поверх других
          <input id="cmsMoveZ" value="${escapeHtml(currentZ)}" placeholder="1, 2, 10">
        </label>
      </div>
      <div class="cms-field-grid">
        <label class="cms-field">Сдвиг вверх/вниз
          <input id="cmsMoveTop" value="${escapeHtml(currentTop)}" placeholder="например: -20px или 30">
        </label>
        <label class="cms-field">Сдвиг влево/вправо
          <input id="cmsMoveLeft" value="${escapeHtml(currentLeft)}" placeholder="например: -20px или 30">
        </label>
      </div>
      <div class="cms-nudge-grid">
        <button type="button" data-nudge="up">↑ На 20px вверх</button>
        <button type="button" data-nudge="down">↓ На 20px вниз</button>
        <button type="button" data-nudge="left">← На 20px влево</button>
        <button type="button" data-nudge="right">→ На 20px вправо</button>
        <button type="button" data-order="up">Поднять в сетке</button>
        <button type="button" data-order="down">Опустить в сетке</button>
      </div>
      <div class="cms-help">Порядок работает в сетках и карточках: чем меньше число, тем раньше блок. Сдвиг двигает блок визуально на странице. Можно писать просто число — будет px.</div>
      <label class="cms-check"><input id="cmsMoveReset" type="checkbox"> Сбросить положение блока</label>
      <div class="cms-actions"><button class="btn btn-primary" id="cmsSaveMove" type="button">Сохранить положение</button><button class="btn btn-secondary" id="cmsDragMove" type="button">Перетащить мышью</button><button class="btn btn-secondary" id="cmsAddAfterBlock" type="button">Добавить после</button><button class="btn btn-danger" id="cmsDeleteBlock" type="button">Удалить блок</button><button class="btn btn-secondary" id="cmsCancel" type="button">Отмена</button></div>`);
    const topInput = modal.querySelector('#cmsMoveTop');
    const leftInput = modal.querySelector('#cmsMoveLeft');
    const orderInput = modal.querySelector('#cmsMoveOrder');
    const zInput = modal.querySelector('#cmsMoveZ');
    const saveFromInputs = () => {
      const reset = modal.querySelector('#cmsMoveReset').checked;
      const value = reset ? { order: '', marginTop: '', marginLeft: '', zIndex: '' } : {
        order: normalizeOrder(orderInput.value),
        marginTop: normalizeSpacing(topInput.value),
        marginLeft: normalizeSpacing(leftInput.value),
        zIndex: normalizeOrder(zInput.value)
      };
      applyLayoutStyles(el, value);
      setEdit('layout', path, value);
      modal.remove();
      toast(reset ? 'Положение блока сброшено' : 'Положение блока сохранено');
    };
    modal.querySelectorAll('[data-nudge]').forEach(btn => btn.addEventListener('click', () => {
      const dir = btn.dataset.nudge;
      const top = parseCssNumber(topInput.value);
      const left = parseCssNumber(leftInput.value);
      if (dir === 'up') topInput.value = `${top - 20}px`;
      if (dir === 'down') topInput.value = `${top + 20}px`;
      if (dir === 'left') leftInput.value = `${left - 20}px`;
      if (dir === 'right') leftInput.value = `${left + 20}px`;
    }));
    modal.querySelectorAll('[data-order]').forEach(btn => btn.addEventListener('click', () => {
      const order = parseInt(orderInput.value || '0', 10) || 0;
      orderInput.value = String(btn.dataset.order === 'up' ? order - 1 : order + 1);
    }));
    modal.querySelector('#cmsCancel').addEventListener('click', () => modal.remove());
    modal.querySelector('#cmsSaveMove').addEventListener('click', saveFromInputs);
    modal.querySelector('#cmsAddAfterBlock').addEventListener('click', () => {
      modal.remove();
      openAddBlockModal({ mode: 'after', target: path });
    });
    modal.querySelector('#cmsDeleteBlock').addEventListener('click', () => {
      modal.remove();
      hideBlock(el);
    });
    modal.querySelector('#cmsDragMove').addEventListener('click', () => {
      modal.remove();
      beginInteractiveDrag(el, path);
    });
  }

  function beginInteractiveDrag(el, path) {
    if (!el) return;
    const startTop = parseCssNumber(readInline(el, 'margin-top'));
    const startLeft = parseCssNumber(readInline(el, 'margin-left'));
    const order = readInline(el, 'order');
    const zIndex = readInline(el, 'z-index') || '10';
    el.classList.add('cms-drag-ready');
    toast('Зажмите выбранный блок мышью и перетащите. Esc — отменить.');

    let armed = true;
    let dragging = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let lastTop = startTop;
    let lastLeft = startLeft;

    const cleanup = () => {
      armed = false;
      dragging = false;
      el.classList.remove('cms-drag-ready', 'cms-live-dragging');
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('pointermove', onPointerMove, true);
      document.removeEventListener('pointerup', onPointerUp, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
    const save = () => {
      const value = {
        order: normalizeOrder(order),
        marginTop: `${Math.round(lastTop)}px`,
        marginLeft: `${Math.round(lastLeft)}px`,
        zIndex: normalizeOrder(zIndex)
      };
      applyLayoutStyles(el, value);
      setEdit('layout', path, value);
      cleanup();
      toast('Положение после перетаскивания сохранено');
    };
    function onPointerDown(e) {
      if (!armed) return;
      if (!el.contains(e.target)) {
        cleanup();
        toast('Перетаскивание отменено');
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      dragging = true;
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      el.classList.add('cms-live-dragging');
      document.addEventListener('pointermove', onPointerMove, true);
      document.addEventListener('pointerup', onPointerUp, true);
    }
    function onPointerMove(e) {
      if (!dragging) return;
      e.preventDefault();
      lastLeft = startLeft + (e.clientX - pointerStartX);
      lastTop = startTop + (e.clientY - pointerStartY);
      applyLayoutStyles(el, { order, marginTop: `${Math.round(lastTop)}px`, marginLeft: `${Math.round(lastLeft)}px`, zIndex });
    }
    function onPointerUp(e) {
      if (!dragging) return;
      e.preventDefault();
      save();
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        applyLayoutStyles(el, { order, marginTop: `${startTop}px`, marginLeft: `${startLeft}px`, zIndex });
        cleanup();
        toast('Перетаскивание отменено');
      }
    }
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);
  }

  function toggleEditMode(force) {
    const next = typeof force === 'boolean' ? force : localStorage.getItem(EDIT_MODE_KEY) !== 'on';
    localStorage.setItem(EDIT_MODE_KEY, next ? 'on' : 'off');
    if (next) toggleMoveMode(false, true);
    document.documentElement.classList.toggle('cms-edit-mode', next);
    const btn = $('#cmsToggleEdit');
    if (btn) btn.textContent = next ? 'Выключить правку' : 'Включить правку';
    if (next) {
      markEditableElements();
      toast('Режим правки включён. Нажимайте на текст, фото или кнопку.');
    } else {
      clearEditableMarks();
      toast('Режим правки выключен');
    }
  }


  function toggleMoveMode(force, silent) {
    const next = typeof force === 'boolean' ? force : localStorage.getItem(MOVE_MODE_KEY) !== 'on';
    localStorage.setItem(MOVE_MODE_KEY, next ? 'on' : 'off');
    if (next) {
      localStorage.setItem(EDIT_MODE_KEY, 'off');
      document.documentElement.classList.remove('cms-edit-mode');
      clearEditableMarks();
      const editBtn = $('#cmsToggleEdit');
      if (editBtn) editBtn.textContent = 'Включить правку';
    }
    document.documentElement.classList.toggle('cms-move-mode', next);
    const btn = $('#cmsToggleMove');
    if (btn) btn.textContent = next ? 'Выключить перемещение' : 'Включить перемещение';
    if (next) {
      markMovableElements();
      if (!silent) toast('Режим перемещения включён. Нажимайте на карточки, фото и блоки.');
    } else {
      clearMovableMarks();
      if (!silent) toast('Режим перемещения выключен');
    }
  }

  function exportEdits() {
    const blob = new Blob([JSON.stringify(getEdits(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'site-edits.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  function importEditsFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result || '{}'));
        saveEdits(data);
        applyEdits();
        toast('Правки импортированы');
      } catch (e) {
        alert('Не удалось прочитать JSON-файл с правками.');
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  function mountPanel() {
    if (!isAdmin() || $('.cms-editor-panel')) return;
    const panel = document.createElement('aside');
    panel.className = 'cms-editor-panel';
    panel.innerHTML = `
      <div class="cms-editor-panel__title">Админ-редактор</div>
      <div class="cms-editor-panel__page">${escapeHtml(readablePageName(getPageKey()))}</div>
      <button id="cmsToggleEdit" type="button">${localStorage.getItem(EDIT_MODE_KEY) === 'on' ? 'Выключить правку' : 'Включить правку'}</button>
      <button id="cmsToggleMove" type="button">${localStorage.getItem(MOVE_MODE_KEY) === 'on' ? 'Выключить перемещение' : 'Включить перемещение'}</button>
      <button id="cmsAddBlock" type="button">Добавить блок</button>
      <button id="cmsRestoreHidden" type="button">Вернуть удалённые</button>
      <button id="cmsExport" type="button">Скачать правки JSON</button>
      <label class="cms-import-label">Импорт JSON<input id="cmsImport" type="file" accept="application/json"></label>
      <button id="cmsResetPage" type="button">Сбросить эту страницу</button>
      <a href="admin.html">Открыть админку</a>
      <small>Правка меняет текст, ссылки, фото и размеры. Теперь текст, ссылки, кнопки, фото и отдельные строки можно удалять прямо из окна редактирования.</small>`;
    document.body.appendChild(panel);
    $('#cmsToggleEdit').addEventListener('click', () => toggleEditMode());
    $('#cmsToggleMove').addEventListener('click', () => toggleMoveMode());
    $('#cmsAddBlock').addEventListener('click', () => openAddBlockModal({ mode: 'bottom' }));
    $('#cmsRestoreHidden').addEventListener('click', () => {
      if (!confirm('Вернуть все удалённые блоки на этой странице?')) return;
      clearHiddenEdits();
      location.reload();
    });
    $('#cmsExport').addEventListener('click', exportEdits);
    $('#cmsImport').addEventListener('change', (e) => importEditsFile(e.target.files[0]));
    $('#cmsResetPage').addEventListener('click', () => {
      if (!confirm('Сбросить все правки только на этой странице?')) return;
      removePageEdits();
      location.reload();
    });
    if (localStorage.getItem(EDIT_MODE_KEY) === 'on') toggleEditMode(true);
    if (localStorage.getItem(MOVE_MODE_KEY) === 'on') toggleMoveMode(true, true);
  }

  function clickHandler(e) {
    if (!isAdmin()) return;
    if (localStorage.getItem(MOVE_MODE_KEY) === 'on') {
      const movable = getMoveTarget(e.target);
      if (!movable || isExcluded(movable)) return;
      e.preventDefault();
      e.stopPropagation();
      return editMove(movable);
    }
    if (localStorage.getItem(EDIT_MODE_KEY) !== 'on') return;
    const editable = e.target.closest('.cms-editable');
    if (!editable || isExcluded(editable)) return;
    e.preventDefault();
    e.stopPropagation();
    if (editable.matches(IMAGE_SELECTOR)) return editImage(editable);
    if (editable.matches(LINK_SELECTOR)) return editLink(editable);
    editText(editable);
  }

  let mutationTimer = null;
  function observeChanges() {
    const mo = new MutationObserver(() => {
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(() => {
        applyEdits();
        if (isAdmin() && localStorage.getItem(EDIT_MODE_KEY) === 'on') markEditableElements();
        if (isAdmin() && localStorage.getItem(MOVE_MODE_KEY) === 'on') markMovableElements();
      }, 120);
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function mountAdminHelp() {
    const holder = $('#cmsAdminHelp');
    if (!holder) return;
    const pages = [
      ['index.html', 'Главная'], ['about.html', 'О поселении'], ['residents.html', 'Жителям'],
      ['directory.html', 'Справочник'], ['news.html', 'Новости'], ['events.html', 'События'],
      ['contacts.html', 'Контакты'], ['administration.html', 'Администрация']
    ];
    holder.innerHTML = `
      <div class="admin-card reveal visible cms-help-card">
        <div class="eyebrow">Весь сайт</div>
        <h3>Универсальное редактирование страниц</h3>
        <p>После входа в админку на всех страницах появляется плавающий блок <b>«Админ-редактор»</b>. Включите режим правки, чтобы менять текст, кнопки, ссылки, фотографии и размеры. В этом же окне можно удалять выбранный текст, ссылку, кнопку или фото. Включите режим перемещения, чтобы двигать карточки, фото и текстовые блоки по странице. Через кнопки редактора можно добавлять новые блоки и удалять ненужные.</p>
        <div class="cms-admin-steps">
          <span>1. Войти в админку</span><span>2. Открыть нужную страницу</span><span>3. Включить правку или перемещение</span><span>4. Нажать на блок и сохранить</span><span>5. Добавлять или удалять блоки</span>
        </div>
        <div class="cms-page-links">${pages.map(([href, title]) => `<a class="btn btn-secondary" href="${href}">${title}</a>`).join('')}</div>
        <p class="form-message">Изображения можно менять через путь к файлу или выбор файла. Исходные фотографии в папках сайта не изменяются.</p>
      </div>`;
  }

  async function loadBundledEdits() {
    try {
      const response = await fetch(BUNDLED_EDITS_URL, { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      if (data && typeof data === 'object') bundledEdits = data;
    } catch (e) {
      // При открытии сайта через file:// браузер может блокировать загрузку JSON.
      // На GitHub Pages и Render файл assets/data/site-edits.json будет загружаться нормально.
    }
  }

  function initAfterEditsLoaded() {
    applyEdits();
    mountAdminHelp();
    mountPanel();
    document.addEventListener('click', clickHandler, true);
    observeChanges();
    const loginBtn = $('#loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        setTimeout(() => {
          if (isAdmin()) {
            mountPanel();
            toggleEditMode(false);
            toast('Вход выполнен. Админ-редактор доступен на всех страницах.');
          }
        }, 250);
      });
    }
  }

  async function init() {
    await loadBundledEdits();
    initAfterEditsLoaded();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
