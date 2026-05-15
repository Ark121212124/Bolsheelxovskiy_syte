
(function () {
  const STORAGE_KEY = 'bolsheelhovskoe_news';

  const defaultNews = [
  {
    "id": "official-40",
    "title": "Охрана окружающей среды: правовая информация для жителей",
    "category": "Право",
    "date": "2026-01-12",
    "time": "10:00",
    "summary": "Материал посвящён вопросам охраны окружающей среды, соблюдения природоохранных требований и ответственности за нарушение установленных правил.",
    "body": "Администрация информирует жителей о необходимости бережного отношения к окружающей среде, соблюдения природоохранных требований и поддержания чистоты на территории поселения. Особое внимание следует уделять обращению с бытовыми отходами, недопущению несанкционированных свалок, загрязнения земельных участков, водных объектов и общественных пространств.\n\nЖителям рекомендуется своевременно вывозить мусор, использовать только установленные места накопления отходов, не сжигать мусор на придомовых территориях и не допускать складирования строительных материалов, веток и иных предметов в местах общего пользования. Соблюдение этих требований помогает сохранять санитарное состояние населённых пунктов и снижает риск возникновения пожаров.\n\nПри выявлении нарушений жители могут обратиться в администрацию поселения или в уполномоченные контрольные органы. В обращении желательно указать место нарушения, краткое описание ситуации и, при наличии, приложить фотографии. Это позволит быстрее организовать проверку и принять меры в рамках действующего законодательства.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_40.html",
    "pinned": true,
    "image": "assets/img/news/news-01.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-39",
    "title": "Физическая культура и спорт: мероприятия для жителей",
    "category": "Физическая культура и спорт",
    "date": "2025-02-23",
    "time": "18:00",
    "summary": "Информация о спортивной и общественной активности, направленной на поддержку здорового образа жизни.",
    "body": "Развитие физической культуры и спорта является важной частью общественной жизни поселения. Спортивные мероприятия помогают укреплять здоровье, формировать активный образ жизни и вовлекать жителей разных возрастов в полезный досуг.\n\nАдминистрация напоминает, что участие в спортивных и общественных активностях способствует развитию командного взаимодействия, профилактике вредных привычек и поддержанию добрососедских связей. Особое значение такие мероприятия имеют для детей и молодёжи, поскольку создают условия для регулярной физической активности.\n\nЖителям рекомендуется следить за объявлениями о предстоящих мероприятиях, принимать участие в соревнованиях, семейных стартах, тематических акциях и программах, направленных на популяризацию здорового образа жизни.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_39.html",
    "image": "assets/img/news/news-02.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-37",
    "title": "Извещение о проведении заседания согласительной комиссии",
    "category": "Земельные отношения",
    "date": "2024-08-21",
    "time": "18:32",
    "summary": "Сообщение по вопросам земельных отношений и рассмотрения материалов согласительной комиссией.",
    "body": "Жителям и заинтересованным лицам сообщается о проведении заседания согласительной комиссии по вопросам, связанным с земельными участками, уточнением сведений и рассмотрением материалов, имеющих значение для землепользователей.\n\nУчастникам рекомендуется заранее ознакомиться с имеющимися документами, подготовить правоустанавливающие материалы, сведения о границах участка и иные документы, которые могут потребоваться при рассмотрении вопроса. Это позволит провести заседание более организованно и сократить время на уточнение информации.\n\nСогласительная комиссия рассматривает спорные и уточняющие вопросы в установленном порядке. Заинтересованным лицам важно соблюдать сроки, внимательно проверять сведения в документах и при необходимости обращаться за консультацией в администрацию или профильные органы.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_37.html",
    "image": "assets/img/news/news-03.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-36",
    "title": "Порядок рассмотрения вопросов по земельным участкам",
    "category": "Земельные отношения",
    "date": "2024-08-21",
    "time": "17:45",
    "summary": "Разъяснение для граждан по вопросам оформления, уточнения и использования земельных участков.",
    "body": "Материал подготовлен для граждан, которым необходимо оформить, уточнить или проверить сведения о земельных участках. Вопросы землепользования требуют внимательного отношения к документам, границам, разрешённому использованию и сведениям, содержащимся в государственных реестрах.\n\nСобственникам и пользователям земельных участков рекомендуется своевременно проверять актуальность сведений, хранить правоустанавливающие документы и обращаться за разъяснениями при возникновении спорных ситуаций. Особое внимание следует уделять случаям, когда фактическое использование территории не совпадает с документально установленным назначением.\n\nПри подготовке обращения желательно указать кадастровый номер, адрес или описание местоположения участка, суть вопроса и приложить копии имеющихся документов. Это поможет специалистам быстрее определить порядок дальнейших действий.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_36.html",
    "image": "assets/img/news/news-04.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-16",
    "title": "Памятка для граждан по соблюдению правил благоустройства",
    "category": "Благоустройство",
    "date": "2024-07-30",
    "time": "12:00",
    "summary": "Администрация напоминает о правилах содержания территорий, уборки мусора и поддержания порядка.",
    "body": "Администрация напоминает жителям о необходимости соблюдения правил благоустройства и содержания территорий. Чистота улиц, общественных пространств и придомовых участков зависит не только от работы коммунальных служб, но и от ответственного отношения каждого жителя.\n\nНе допускается складирование мусора, веток, строительных материалов и иных отходов в неустановленных местах. Собственникам и пользователям объектов недвижимости необходимо своевременно очищать прилегающие территории, поддерживать порядок около домов, организаций и земельных участков.\n\nСоблюдение правил благоустройства помогает сохранить комфортную среду, улучшить внешний вид населённых пунктов и предупредить санитарные нарушения. При обнаружении проблемных участков жители могут сообщить об этом в администрацию.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_16.html",
    "image": "assets/img/news/news-05.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-38",
    "title": "Информация о состоянии пунктов государственной геодезической сети",
    "category": "Земельные отношения",
    "date": "2024-08-21",
    "time": "16:06",
    "summary": "Сообщение о важности сохранности пунктов государственной геодезической сети и доступности сведений для граждан.",
    "body": "Пункты государственной геодезической сети используются при кадастровых, землеустроительных, строительных и иных работах, связанных с определением координат и точным описанием территории. Их сохранность имеет важное значение для правильного ведения сведений о земельных участках.\n\nПовреждение или уничтожение таких пунктов может привести к ошибкам при измерениях, спорам о границах и дополнительным затратам при выполнении работ. Поэтому гражданам и организациям необходимо бережно относиться к таким объектам и не допускать их самовольного переноса, повреждения или демонтажа.\n\nПри обнаружении повреждённого пункта геодезической сети рекомендуется сообщить об этом в уполномоченные органы или администрацию. В сообщении следует указать местоположение объекта и характер выявленного повреждения.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_38.html",
    "image": "assets/img/news/news-06.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-15",
    "title": "Пожарная безопасность в быту и на территории поселения",
    "category": "Безопасность",
    "date": "2024-07-18",
    "time": "09:30",
    "summary": "Памятка для жителей о соблюдении мер пожарной безопасности в жилом секторе и на открытых территориях.",
    "body": "Пожарная безопасность остаётся одним из ключевых вопросов для жителей поселения, особенно в периоды сухой погоды, отопительного сезона и проведения работ на придомовых территориях. Несоблюдение элементарных правил может привести к угрозе жизни, здоровью и имуществу.\n\nЗапрещается оставлять без присмотра источники открытого огня, использовать неисправные электроприборы, перегружать электросети, сжигать мусор в неустановленных местах и разводить костры при неблагоприятных погодных условиях. Родителям необходимо объяснять детям опасность игр с огнём.\n\nПри обнаружении признаков пожара необходимо немедленно сообщить по номеру 112, назвать адрес, описать ситуацию и по возможности принять меры для эвакуации людей, не подвергая себя опасности.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_15.html",
    "image": "assets/img/news/news-07.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-34",
    "title": "Законодатель установил сроки освоения земельных участков",
    "category": "Земельные отношения",
    "date": "2024-08-19",
    "time": "15:35",
    "summary": "Разъяснение о сроках освоения земельных участков и необходимости использовать землю по назначению.",
    "body": "Гражданам необходимо учитывать требования законодательства к использованию земельных участков и сроки их освоения. Земля должна использоваться в соответствии с разрешённым видом использования, а длительное неиспользование участка может повлечь правовые последствия.\n\nОсвоение земельного участка предполагает выполнение действий, которые подтверждают намерение использовать территорию по назначению. Это может включать подготовительные, организационные и иные работы, предусмотренные характером участка и действующими требованиями.\n\nСобственникам рекомендуется заранее изучить документы на участок, проверить вид разрешённого использования и при необходимости получить консультацию. Такой подход помогает избежать нарушений, споров и дополнительных расходов.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_34.html",
    "image": "assets/img/news/news-08.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-32",
    "title": "Важные изменения в порядке сделок с земельными участками",
    "category": "Земельные отношения",
    "date": "2024-08-16",
    "time": "11:25",
    "summary": "Информация для собственников и заявителей о документах, проверках и правовом оформлении сделок.",
    "body": "При совершении сделок с земельными участками важно внимательно проверять документы и сведения, содержащиеся в государственных реестрах. Ошибки в документах, неуточнённые границы или наличие ограничений могут затруднить оформление сделки и привести к дополнительным проверкам.\n\nПеред подачей документов рекомендуется уточнить кадастровый номер участка, правовой статус, наличие обременений, соответствие фактического использования установленному виду разрешённого использования и корректность сведений о собственнике.\n\nГражданам следует заранее подготовить необходимый пакет документов и при возникновении сомнений обращаться за консультацией в компетентные органы. Это позволит снизить риск отказов и ускорить оформление.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_32.html",
    "image": "assets/img/news/news-09.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-26",
    "title": "Информация о приёме граждан и обращениях в администрацию",
    "category": "Администрация",
    "date": "2024-06-28",
    "time": "14:00",
    "summary": "Краткая инструкция для жителей: как обратиться в администрацию и какие сведения указать в обращении.",
    "body": "Администрация напоминает жителям о порядке направления обращений и записи на приём. Для оперативного рассмотрения вопроса важно правильно сформулировать обращение и указать сведения, необходимые для обратной связи.\n\nВ обращении рекомендуется указать фамилию, имя, отчество, контактный телефон или адрес электронной почты, адрес места события, суть вопроса и желаемый способ получения ответа. При наличии подтверждающих документов или фотографий их следует приложить к обращению.\n\nЧем точнее описана ситуация, тем быстрее специалисты смогут подготовить ответ, организовать проверку или направить обращение по компетенции. По вопросам, требующим личного разъяснения, жители могут уточнить возможность приёма в администрации.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_26.html",
    "image": "assets/img/news/news-10.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-25",
    "title": "Профилактика мошенничества: будьте внимательны",
    "category": "Безопасность",
    "date": "2024-06-20",
    "time": "10:15",
    "summary": "Администрация напоминает жителям о распространённых схемах телефонного и интернет-мошенничества.",
    "body": "Администрация предупреждает жителей о распространённых схемах телефонного и интернет-мошенничества. Злоумышленники могут представляться сотрудниками банков, государственных органов, служб безопасности или знакомыми людьми, чтобы получить доступ к деньгам и персональным данным.\n\nНельзя сообщать посторонним коды из SMS, данные банковских карт, пароли от личных кабинетов, сведения о счетах и персональные документы. Сотрудники официальных организаций не требуют переводить деньги на «безопасные счета» и не просят устанавливать неизвестные приложения для удалённого доступа.\n\nПри подозрительном звонке следует прекратить разговор и самостоятельно связаться с организацией по официальному номеру. При совершении мошеннических действий необходимо обратиться в правоохранительные органы.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_25.html",
    "image": "assets/img/news/news-11.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-23",
    "title": "Военная служба по контракту: информационные материалы",
    "category": "Объявления",
    "date": "2024-06-05",
    "time": "13:00",
    "summary": "Справочная информация для граждан, интересующихся прохождением военной службы по контракту.",
    "body": "Граждане, интересующиеся прохождением военной службы по контракту, могут получить консультацию о порядке поступления, перечне документов, условиях прохождения службы и предусмотренных социальных гарантиях.\n\nПеред принятием решения рекомендуется уточнить требования к кандидатам, порядок медицинского освидетельствования, особенности заключения контракта и перечень льгот, предусмотренных действующим законодательством.\n\nПолучить дополнительную информацию можно в уполномоченных пунктах отбора, органах военного комиссариата и официальных информационных ресурсах. При обращении желательно заранее подготовить документы, удостоверяющие личность, и сведения об образовании или профессии.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_23.html",
    "image": "assets/img/news/news-12.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-22",
    "title": "Профилактика детского дорожно-транспортного травматизма",
    "category": "Безопасность",
    "date": "2024-05-24",
    "time": "09:00",
    "summary": "Памятка для родителей и детей о правилах безопасного поведения на дороге.",
    "body": "Профилактика детского дорожно-транспортного травматизма требует постоянного внимания со стороны родителей, педагогов и водителей. Дети должны регулярно повторять правила безопасного поведения на дороге и понимать, почему важно быть внимательными около проезжей части.\n\nРодителям рекомендуется объяснять детям порядок перехода дороги, необходимость пользоваться пешеходными переходами, соблюдать сигналы светофора и использовать световозвращающие элементы в тёмное время суток. Нельзя выбегать на дорогу из-за припаркованных автомобилей или других препятствий.\n\nВодителям необходимо снижать скорость рядом со школами, остановками, дворовыми территориями и местами массового пребывания детей. Внимательность всех участников движения помогает предотвратить трагические последствия.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_22.html",
    "image": "assets/img/news/news-13.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-20",
    "title": "Социальная поддержка жителей: куда обращаться за консультацией",
    "category": "Социальная сфера",
    "date": "2024-05-15",
    "time": "11:40",
    "summary": "Информация о получении консультаций по мерам социальной поддержки и помощи семьям.",
    "body": "Жители могут получать консультации по вопросам социальной поддержки, льгот, выплат и помощи семьям через профильные ведомства, многофункциональные центры и электронные сервисы. Важно заранее уточнять актуальный перечень документов и условия получения конкретной меры поддержки.\n\nСоциальная поддержка может зависеть от категории заявителя, состава семьи, дохода, возраста, наличия подтверждающих документов и иных обстоятельств. Поэтому перед подачей заявления рекомендуется внимательно проверить сведения и подготовить необходимые копии.\n\nИспользование электронных сервисов позволяет быстрее подать заявление, отслеживать статус рассмотрения и получать уведомления. При возникновении сложностей жители могут обратиться за консультацией в уполномоченные организации.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_20.html",
    "image": "assets/img/news/news-14.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-17",
    "title": "Субботник и санитарная очистка территории",
    "category": "Благоустройство",
    "date": "2024-04-26",
    "time": "12:30",
    "summary": "Приглашение жителей принять участие в наведении порядка и благоустройстве общественных пространств.",
    "body": "Администрация приглашает жителей принимать участие в субботниках и мероприятиях по санитарной очистке территории. Совместная работа помогает поддерживать порядок, улучшать внешний вид населённых пунктов и формировать ответственное отношение к общественным пространствам.\n\nВо время уборки особое внимание уделяется местам общего пользования, территориям около учреждений, обочинам, зонам отдыха и участкам, где чаще всего образуется мусор. Жителям рекомендуется использовать перчатки, мешки для мусора и соблюдать меры безопасности.\n\nУчастие в таких мероприятиях способствует укреплению добрососедских связей и показывает, что благоустройство поселения является общим делом. Администрация благодарит всех жителей, которые вносят вклад в поддержание чистоты.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_17.html",
    "image": "assets/img/news/news-15.jpg",
    "sourceLabel": "Официальный портал поселения"
  },
  {
    "id": "official-12",
    "title": "Госуслуги и цифровые сервисы для жителей поселения",
    "category": "Госуслуги",
    "date": "2024-04-10",
    "time": "10:00",
    "summary": "Обзор возможностей электронных сервисов для подачи заявлений, получения справок и решения бытовых вопросов.",
    "body": "Электронные сервисы позволяют жителям быстрее получать государственные и муниципальные услуги, подавать заявления, отслеживать статусы обращений и получать уведомления без личного посещения учреждений.\n\nПеред отправкой заявления необходимо внимательно проверить заполненные данные, контактную информацию и приложенные документы. Ошибки в сведениях могут увеличить срок рассмотрения или потребовать повторной подачи материалов.\n\nИспользование портала Госуслуг и других цифровых сервисов помогает экономить время, получать информацию в удобном формате и решать бытовые вопросы более оперативно. При необходимости жители могут обратиться за консультацией по порядку работы с электронными услугами.",
    "source": "https://bolsheelxovskoe-r13.gosweb.gosuslugi.ru/dlya-zhiteley/novosti-i-reportazhi/novosti_12.html",
    "image": "assets/img/news/news-16.jpg",
    "sourceLabel": "Официальный портал поселения"
  }
];

  const $ = (id) => document.getElementById(id);

  function getNews() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultNews;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length ? parsed : defaultNews;
    } catch (error) {
      return defaultNews;
    }
  }

  function saveNews(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function formatDate(value, time) {
    if (!value) return '';
    const date = new Date(value + 'T00:00:00');
    const formatted = date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
    return time ? `${formatted}, ${time}` : formatted;
  }

  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function readingTime(item) {
    const words = `${item.summary || ''} ${item.body || ''}`.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 140));
  }

  function renderCategoryOptions(items) {
    const category = $('newsCategory');
    if (!category) return;
    const current = category.value;
    const categories = [...new Set(items.map(item => item.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ru'));
    category.innerHTML = '<option value="">Все категории</option>' + categories.map(cat => `<option value="${escapeHtml(cat)}">${escapeHtml(cat)}</option>`).join('');
    category.value = current;
  }

  function renderNewsPage() {
    const list = $('newsList');
    if (!list) return;

    const search = $('newsSearch');
    const category = $('newsCategory');
    const counter = $('newsCounter');
    const reset = $('newsReset');
    const sourcePanel = $('sourcePanel');
    const allItems = getNews();
    renderCategoryOptions(allItems);

    if (sourcePanel) {
      const officialCount = allItems.filter(item => item.source).length;
      sourcePanel.innerHTML = `<strong>${officialCount}</strong><span>материалов из официального раздела</span>`;
    }

    const render = () => {
      const q = (search?.value || '').toLowerCase().trim();
      const cat = category?.value || '';
      const items = getNews()
        .filter(item => !cat || item.category === cat)
        .filter(item => {
          const text = `${item.title} ${item.summary} ${item.body} ${item.category}`.toLowerCase();
          return !q || text.includes(q);
        })
        .sort((a, b) => String(b.date).localeCompare(String(a.date)) || String(b.time || '').localeCompare(String(a.time || '')));

      if (counter) counter.textContent = `${items.length} из ${getNews().length}`;

      if (!items.length) {
        list.innerHTML = '<div class="admin-card reveal visible empty-news"><h3>Новостей не найдено</h3><p>Измените поисковый запрос или выберите другую категорию.</p></div>';
        return;
      }

      list.innerHTML = items.map((item, index) => {
        const featured = item.pinned || index === 0;
        const detailUrl = `news-detail.html?id=${encodeURIComponent(item.id)}`;
        const image = item.image || 'assets/img/news/news-default.jpg';
        return `
        <article class="news-tile ${featured ? 'news-tile--featured' : ''} reveal visible">
          <a class="news-tile__media" href="${detailUrl}" aria-label="Открыть новость: ${escapeHtml(item.title)}">
            <img src="${escapeHtml(image)}" alt="${escapeHtml(item.title)}" loading="lazy">
            <span class="news-tile__date">${formatDate(item.date, item.time)}</span>
          </a>
          <div class="news-tile__body">
            <div class="news-tile__meta">
              <span class="tag">${escapeHtml(item.category)}</span>
              <span>${readingTime(item)} мин чтения</span>
            </div>
            <h3><a href="${detailUrl}">${escapeHtml(item.title)}</a></h3>
            <p>${escapeHtml(item.summary)}</p>
            <a class="news-readmore" href="${detailUrl}">Читать новость полностью <span aria-hidden="true">→</span></a>
          </div>
        </article>`;
      }).join('');
    };

    search?.addEventListener('input', render);
    category?.addEventListener('change', render);
    reset?.addEventListener('click', () => {
      if (search) search.value = '';
      if (category) category.value = '';
      render();
    });
    render();
  }

  function renderAdmin() {
    const login = $('adminLogin');
    const panel = $('adminPanel');
    if (!login || !panel) return;

    const loginBtn = $('loginBtn');
    const message = $('loginMessage');

    function openPanel() {
      login.hidden = true;
      panel.hidden = false;
      renderAdminList();
      const date = $('date');
      if (date && !date.value) date.value = new Date().toISOString().slice(0, 10);
    }

    if (sessionStorage.getItem('adminLogged') === 'yes') openPanel();

    loginBtn?.addEventListener('click', () => {
      if ($('login').value === 'admin' && $('password').value === 'admin123') {
        sessionStorage.setItem('adminLogged', 'yes');
        openPanel();
      } else {
        message.textContent = 'Неверный логин или пароль.';
      }
    });

    $('resetForm')?.addEventListener('click', resetForm);
    $('exportBtn')?.addEventListener('click', exportJson);

    $('newsForm')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = $('newsId').value || `n-${Date.now()}`;
      const item = {
        id,
        title: $('title').value.trim(),
        category: $('category').value,
        date: $('date').value,
        summary: $('summary').value.trim(),
        body: $('body').value.trim(),
        source: '',
        time: '',
        image: ($('image')?.value || 'assets/img/news/news-default.jpg').trim()
      };
      const items = getNews();
      const index = items.findIndex(n => n.id === id);
      if (index >= 0) items[index] = item;
      else items.unshift(item);
      saveNews(items);
      resetForm();
      renderAdminList();
    });
  }

  function resetForm() {
    $('newsForm')?.reset();
    if ($('newsId')) $('newsId').value = '';
    if ($('formTitle')) $('formTitle').textContent = 'Добавить новость';
    if ($('date')) $('date').value = new Date().toISOString().slice(0, 10);
    if ($('image')) $('image').value = 'assets/img/news/news-default.jpg';
  }

  function renderAdminList() {
    const holder = $('adminNewsList');
    if (!holder) return;
    const items = getNews().sort((a, b) => String(b.date).localeCompare(String(a.date)));
    holder.innerHTML = items.map(item => `
      <div class="admin-news-item">
        <div>
          <div class="meta"><span class="tag">${escapeHtml(item.category)}</span><span>${formatDate(item.date, item.time)}</span></div>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.summary)}</p>
        </div>
        <div class="admin-actions">
          <button class="btn btn-secondary" data-edit="${escapeHtml(item.id)}">Редактировать</button>
          <button class="btn btn-ghost" data-delete="${escapeHtml(item.id)}">Удалить</button>
        </div>
      </div>
    `).join('');

    holder.querySelectorAll('[data-edit]').forEach(btn => btn.addEventListener('click', () => editItem(btn.dataset.edit)));
    holder.querySelectorAll('[data-delete]').forEach(btn => btn.addEventListener('click', () => deleteItem(btn.dataset.delete)));
  }

  function editItem(id) {
    const item = getNews().find(n => n.id === id);
    if (!item) return;
    $('newsId').value = item.id;
    $('title').value = item.title;
    $('category').value = item.category;
    $('date').value = item.date;
    $('summary').value = item.summary;
    $('body').value = item.body;
    if ($('image')) $('image').value = item.image || 'assets/img/news/news-default.jpg';
    $('formTitle').textContent = 'Редактировать новость';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteItem(id) {
    if (!confirm('Удалить эту новость?')) return;
    saveNews(getNews().filter(n => n.id !== id));
    renderAdminList();
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(getNews(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'news-data.json';
    link.click();
    URL.revokeObjectURL(url);
  }


  function paragraphHtml(value) {
    return String(value || '')
      .split(/\n\s*\n/)
      .map(part => part.trim())
      .filter(Boolean)
      .map(part => `<p>${escapeHtml(part)}</p>`)
      .join('');
  }

  function renderDetailPage() {
    const holder = $('newsDetail');
    if (!holder) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const items = getNews();
    const item = items.find(n => n.id === id) || items[0];
    if (!item) {
      holder.innerHTML = '<div class="container"><div class="admin-card"><h1>Новость не найдена</h1><p>Вернитесь к списку новостей и выберите другой материал.</p><a class="btn btn-primary" href="news.html">К новостям</a></div></div>';
      return;
    }
    document.title = `${item.title} — Новости`;
    const image = item.image || 'assets/img/news/news-default.jpg';
    holder.innerHTML = `
      <section class="article-hero section">
        <div class="container">
          <a class="back-link" href="news.html">← Все новости</a>
          <div class="article-hero-grid reveal visible">
            <div class="article-hero-copy">
              <div class="article-meta"><span class="tag">${escapeHtml(item.category)}</span><span>${formatDate(item.date, item.time)}</span><span>${readingTime(item)} мин чтения</span></div>
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
              <a class="btn btn-primary" href="news.html">Вернуться к новостям</a>
            </div>
          </article>
          <aside class="article-aside reveal visible">
            <strong>Информация о публикации</strong>
            <span>Категория: ${escapeHtml(item.category)}</span>
            <span>Дата: ${formatDate(item.date, item.time)}</span>
            <span>Источник: ${escapeHtml(item.sourceLabel || 'Раздел новостей сайта')}</span>
          </aside>
        </div>
      </section>`;
  }

  renderNewsPage();
  renderDetailPage();
  renderAdmin();
})();
