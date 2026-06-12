import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SEND_URL = "https://functions.poehali.dev/6dd07b4a-af2f-481a-b26d-adbf5ebe7a0b";
const ISM_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/790384c5-0086-4312-95b9-ab675381f276.jpg";
const MONTAZH_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/bcbeb4b0-58b1-4df4-8045-320330c10235.jpg";
const CERT_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/0467becb-2d83-4414-8a10-6389014bfee0.png";

const navLinks = [
  { label: "Как работает", href: "#how" },
  { label: "О компании", href: "#about" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

const flowSteps = [
  { icon: "Building2", label: "Объект" },
  { icon: "Wifi", label: "Передача данных" },
  { icon: "MonitorDot", label: "Центр мониторинга" },
  { icon: "BrainCircuit", label: "Анализ состояния" },
  { icon: "BellRing", label: "Уведомление клиента" },
  { icon: "Wrench", label: "Ремонтная бригада" },
];

const controls = [
  { icon: "Flame", label: "Пожарная сигнализация" },
  { icon: "Droplets", label: "Пожаротушение" },
  { icon: "Wind", label: "Дымоудаление" },
  { icon: "KeyRound", label: "СКУД" },
  { icon: "Camera", label: "Видеонаблюдение" },
  { icon: "Settings2", label: "Инженерные системы" },
];

const results = [
  "Значительное снижение риска пожара",
  "В чрезвычайной ситуации вызов пожарной охраны",
  "Оперативный выезд ремонтной бригады",
  "Информация о неисправностях в режиме реального времени",
  "Контроль между регламентными обслуживаниями",
  "Снижение риска штрафов",
  "Возможность оперативного вмешательства",
  "История событий и отчёты",
];

const tariffs = [
  {
    name: "Базовый",
    price: "от 5 000 ₽/мес",
    desc: "Для небольших объектов — офисы, магазины до 500 м²",
    items: ["Мониторинг 1 системы", "Ежедневный отчёт на email", "Реакция оператора 24/7", "Выезд бригады по запросу"],
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/75f4c78e-8d83-46f4-8fd3-34439217eedc.jpg",
  },
  {
    name: "Стандарт",
    price: "от 9 000 ₽/мес",
    desc: "Для средних объектов — склады, торговые центры до 3 000 м²",
    items: ["Мониторинг до 3 систем", "Ежедневный отчёт + SMS", "Реакция оператора 24/7", "2 выезда бригады в месяц", "Ежеквартальный аудит"],
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/c26f5cd0-b692-4a48-965b-ca797ec2563a.jpg",
    popular: true,
  },
  {
    name: "Премиум",
    price: "от 15 000 ₽/мес",
    desc: "Для крупных объектов — производства, бизнес-центры от 3 000 м²",
    items: ["Мониторинг без ограничений", "Отчёты в мессенджер + email", "Персональный менеджер", "Неограниченные выезды", "Ежемесячный аудит", "Приоритетная реакция 5 мин"],
    image: ISM_IMAGE,
  },
];

const portfolio = [
  { title: "Резиденция Премьер-министра РФ Дмитрия Медведева", type: "Пожарная сигнализация и охранные системы", area: "Государственный объект", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/074f88d6-a794-4ea8-8cc7-4b49843e4474.png" },
  { title: "ФСО России. Комплекс правительственных особняков на Воробьёвых горах", type: "Комплексная система безопасности", area: "Государственный объект", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/f5c80256-eadc-40d6-a6f5-61be8846a59a.png" },
  { title: "Даниловский монастырь. Здание отдела внешних связей РПЦ", type: "Пожарная сигнализация", area: "Культурный объект", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/ba9f8a9d-5d87-4174-be39-a98509772f2b.png" },
  { title: "ООО «Красный октябрь». Комплекс исторических зданий", type: "Пожарная сигнализация + СОУЭ", area: "Производственный комплекс", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/b5fe874a-c9b0-45b3-a5b3-c70cb3064d3d.png" },
  { title: "Бистро Пронто. Сеть из 42 ресторанов", type: "Пожарная сигнализация — 42 объекта", area: "Сеть объектов", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/bf6d9395-1609-4f42-b3dd-57c92a9dd2b6.png" },
  { title: "РотФронт. Здание производственного корпуса ОАО «РотФронт»", type: "Пожарная сигнализация + охранные системы", area: "Производственный объект", image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/bucket/6e56f066-6087-4c57-bafa-d0dd17ec1db8.png" },
];

const certificates = [
  { title: "Лицензия МЧС России", num: "Л014-00101-77/00112662", desc: "Монтаж и техническое обслуживание систем пожарной безопасности" },
  { title: "ISO 9001:2015", num: "Сертификат RU-0342", desc: "Система менеджмента качества" },
  { title: "СРО «Безопасность»", num: "Допуск СРО-С-034", desc: "Строительно-монтажные работы" },
];

const faqs = [
  { q: "Сколько стоит подключение к мониторингу?", a: "Стоимость подключения ИСМ зависит от типа и количества систем на объекте. В среднем — от 35 000 руб. за установку оборудования и от 5 000 руб./мес. за мониторинг. Точную стоимость рассчитываем бесплатно после обследования объекта." },
  { q: "Подходит ли для любого объекта?", a: "Да, система совместима с большинством современных приёмно-контрольных приборов. Перед подключением наш инженер проводит бесплатный осмотр объекта." },
  { q: "Как быстро происходит реакция на неисправность?", a: "Диспетчерская служба работает 24/7. При обнаружении критической неисправности оператор связывается с вами в течение 5 минут." },
  { q: "Что входит в ежедневный отчёт?", a: "Отчёт содержит общий статус систем, список событий за сутки, выявленные неисправности и рекомендации по устранению." },
  { q: "Даёте ли вы гарантию?", a: "Да, мы даём гарантию 1 год на все виды работ и оборудование. Гарантийное обслуживание — бесплатно." },
  { q: "Работаете ли вы с юридическими лицами?", a: "Да, работаем с ООО, ИП и государственными структурами. Принимаем безналичную оплату, предоставляем полный пакет документов для бухгалтерии." },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

async function sendLead(data: { name: string; phone: string; object_type: string; comment: string; source: string }) {
  const res = await fetch(SEND_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error();
  return res.json();
}

type FormState = "idle" | "loading" | "success" | "error";

export default function Ism() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackState, setCallbackState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [objectType, setObjectType] = useState("");
  const [comment, setComment] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setFormState("loading");
    try {
      await sendLead({ name, phone, object_type: objectType, comment, source: "Главная — форма контактов" });
      setFormState("success");
      setName(""); setPhone(""); setObjectType(""); setComment("");
    } catch { setFormState("error"); }
  };

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setCallbackState("loading");
    try {
      await sendLead({ name: "", phone: callbackPhone, object_type: "", comment: "", source: "Обратный звонок" });
      setCallbackState("success");
      setCallbackPhone("");
    } catch { setCallbackState("error"); }
  };

  const howObs = useInView(0.1);
  const controlsObs = useInView(0.1);
  const resultsObs = useInView(0.1);
  const tariffsObs = useInView(0.05);
  const aboutObs = useInView(0.1);
  const portfolioObs = useInView(0.05);
  const certsObs = useInView(0.1);
  const faqObs = useInView(0.1);
  const contactsObs = useInView(0.1);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* ШАПКА */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(26,95,180,0.1)]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between lg:h-20 py-3 lg:py-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[var(--blue)] flex items-center justify-center flex-shrink-0">
              <Icon name="ShieldCheck" size={20} className="text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); }}>
                <div className="font-display font-extrabold text-base leading-none">
                  <span className={scrolled ? "text-[var(--dark)]" : "text-white"}>Пож</span><span className="text-[var(--blue)]">Дозор</span>
                </div>
                <div className={`text-[10px] font-medium tracking-wider uppercase transition-colors ${scrolled ? "text-[var(--blue)]" : "text-blue-300"}`}>
                  Мониторинг 24/7
                </div>
              </a>
              <a href="tel:+74994902201" className={`lg:hidden flex items-center gap-1 text-[12px] font-bold mt-0.5 transition-colors ${scrolled ? "text-[var(--blue)]" : "text-white"}`}>
                <Icon name="Phone" size={12} />
                +7 (499) 490-22-01
              </a>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-4">
            <Link to="/uslugi" className={`text-sm font-medium transition-colors whitespace-nowrap ${scrolled ? "text-[var(--dark)] hover:text-[var(--blue)]" : "text-white/90 hover:text-white"}`}>
              Услуги
            </Link>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors whitespace-nowrap ${scrolled ? "text-[var(--dark)] hover:text-[var(--blue)]" : "text-white/90 hover:text-white"}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCallbackOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${scrolled ? "border-[var(--blue)] text-[var(--blue)] hover:bg-[var(--blue-50)]" : "border-white/40 text-white hover:bg-white/10"}`}
              >
                <Icon name="PhoneCall" size={13} />
                Заказать звонок
              </button>
              <a href="#contacts" className="px-3 py-1.5 bg-[var(--blue)] text-white text-xs font-semibold rounded-lg hover:bg-[var(--blue-dark)] transition-colors">
                Подключить
              </a>
            </div>
            <a href="tel:+74994902201" className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${scrolled ? "text-[var(--blue)]" : "text-white/80"}`}>
              <Icon name="Phone" size={12} />
              +7 (499) 490-22-01
            </a>
          </div>

          <button className={`lg:hidden p-2 transition-colors ${scrolled ? "text-[var(--dark)]" : "text-white"}`} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>


        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <Link to="/uslugi" onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-[var(--dark)] font-medium hover:bg-[var(--blue-50)] hover:text-[var(--blue)] transition-colors">
              Услуги
            </Link>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block px-6 py-3 text-[var(--dark)] font-medium hover:bg-[var(--blue-50)] hover:text-[var(--blue)] transition-colors">
                {l.label}
              </a>
            ))}
            <div className="px-6 py-4 border-t border-gray-100">
              <a href="tel:+74994902201" className="block text-[var(--blue)] font-semibold mb-3">+7 (499) 490-22-01</a>
              <a href="#contacts" onClick={() => setMenuOpen(false)} className="block w-full text-center px-4 py-3 bg-[var(--blue)] text-white font-semibold rounded-lg">
                Подключить мониторинг
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ГЕРОЙ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a1628] w-full">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${ISM_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 pt-24 md:pt-32 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="w-full min-w-0">
              <div className="mb-4 flex flex-col gap-2">
                <a href="#contacts" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs font-medium hover:bg-white/15 transition-colors">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                  Мониторинг 24/7 · Лицензия МЧС
                </a>
                <a href="#contacts" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-red-500/70 rounded-full text-white/80 text-xs font-medium hover:bg-white/15 transition-colors lg:hidden">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                  Срочный ремонт сигнализации
                </a>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.1] mb-5">
                Контролируем и обслуживаем пожарную безопасность{" "}
                <span className="text-[var(--blue-light)]">24/7</span>
              </h1>
              <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed mb-8">
                Удалённо отслеживаем состояние систем безопасности, выявляем и анализируем неисправности. Уведомляем ответственных лиц. Оперативно ремонтируем систему.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contacts" className="px-6 py-3.5 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all text-center text-base">
                  Подключить мониторинг
                </a>
                <a href="#how" className="px-6 py-3.5 border border-white/25 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-center text-base">
                  Как это работает
                </a>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-5">
              <div className="flex flex-col items-start gap-1">
                <a href="#contacts" className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-red-500/70 rounded-full text-white/80 text-xs font-medium hover:bg-white/15 transition-colors animate-pulse-border whitespace-nowrap">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                  Срочный ремонт пожарной сигнализации
                </a>
                <p className="text-[10px] text-white/40 pl-3.5">Выезд от 1 часа · Диагностика от 0 ₽ · Выезд инженера — 1 500 ₽, если ремонт не нужен</p>
              </div>
              {[
                { icon: "Eye", title: "Мониторинг 24/7", sub: "круглосуточный контроль" },
                { icon: "BellRing", title: "Реакция за 5 минут", sub: "при обнаружении неисправности" },
                { icon: "FileText", title: "Ежедневные отчёты", sub: "на email и в мессенджер" },
                { icon: "ShieldCheck", title: "Лицензия МЧС", sub: "Л014-00101-77/00112662" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4">
                  <div className="w-12 h-12 bg-[var(--blue)]/30 border border-[var(--blue-light)]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} fallback="Shield" size={22} className="text-[var(--blue-light)]" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-sm">{item.title}</div>
                    <div className="text-blue-300 text-xs">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      <div className="bg-[#0d3d73] py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "1200+", label: "Объектов сдано" },
            { value: "10", label: "Лет на рынке" },
            { value: "98%", label: "Клиентов довольны" },
            { value: "24/7", label: "Техподдержка" },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display font-black text-2xl md:text-4xl mb-1">{s.value}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* КАК РАБОТАЕТ */}
      <section id="how" className="py-20 bg-gray-50">
        <div ref={howObs.ref} className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${howObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Принцип работы
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">Как это работает</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg md:text-xl font-medium">Мы подключаем Вашу пожарную сигнализацию и другое оборудование к Нашему Ситуационному Центру мониторинга, где операторы круглосуточно следят за техническим состоянием всех противопожарных систем и при необходимости отправляют ремонтную бригаду.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row md:items-start justify-center gap-6 md:gap-0">
            {flowSteps.map((step, i) => (
              <div key={i} className="flex md:flex-row items-start">
                <div className={`flex flex-col items-center text-center w-full md:w-28 lg:w-32 px-1 ${howObs.inView ? `animate-fade-in-up delay-${i * 100}` : "opacity-0"}`}>
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#0d3d73] flex items-center justify-center mb-2 shadow-md">
                    <Icon name={step.icon} fallback="Circle" size={22} className="text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#0a1628] leading-tight">{step.label}</span>
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="flex items-center justify-center mt-5 mx-1">
                    <Icon name="ChevronRight" size={18} className="text-[var(--blue)]/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЧТО КОНТРОЛИРУЕМ */}
      <section id="controls" className="py-20 bg-white">
        <div ref={controlsObs.ref} className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${controlsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Системы
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">Что мы контролируем</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Единая точка контроля всех систем безопасности объекта</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {controls.map((c, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[var(--blue)]/30 hover:bg-[var(--blue-50)]/40 transition-all ${controlsObs.inView ? `animate-fade-in-up delay-${(i % 3) * 100 + 100}` : "opacity-0"}`}>
                <div className="w-10 h-10 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon} fallback="Shield" size={18} className="text-white" />
                </div>
                <span className="font-semibold text-[#0a1628] text-sm">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ФОТО РАЗДЕЛИТЕЛЬ */}
      <div className="w-full">
        <img src={ISM_IMAGE} alt="Оператор центра мониторинга следит за состоянием систем безопасности" className="w-full h-[220px] sm:h-[280px] md:h-[360px] object-cover object-center" />
      </div>

      {/* ЧТО ПОЛУЧАЕТ КЛИЕНТ */}
      <section id="tariffs" className="py-20 bg-[#0a1628]">
        <div ref={resultsObs.ref} className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${resultsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">Что получает клиент</h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">Не функции. Результаты.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* С мониторингом */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Icon name="ShieldCheck" size={26} className="text-green-400 flex-shrink-0" />
                <span className="font-display font-bold text-white text-base">С мониторингом ПожДозор</span>
              </div>
              <ul className="space-y-3">
                {results.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={11} className="text-white" />
                    </div>
                    <span className="text-white/90 text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Без мониторинга */}
            <div className="bg-white/5 border border-red-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Icon name="ShieldOff" size={26} className="text-red-400 flex-shrink-0" />
                <span className="font-display font-bold text-white text-base">Без мониторинга</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Неисправность обнаруживается только во время ТО",
                  "Потеря связи с датчиками остаётся незамеченной",
                  "Нет уверенности, что система сработает в нужный момент",
                  "Есть риск позднего обнаружения пожара",
                  "Проверка выявляет нарушения раньше вас",
                  "Растут риски штрафов и предписаний",
                ].map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-500 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="X" size={11} className="text-white" />
                    </div>
                    <span className="text-white/70 text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mb-12">
            <a href="#contacts" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all text-lg">
              <Icon name="PhoneCall" size={20} />
              Подключить мониторинг
            </a>
            <p className="text-white/40 text-sm mt-3">Бесплатный выезд инженера и расчёт стоимости</p>
          </div>

          {/* Тарифы */}
          <div ref={tariffsObs.ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {tariffs.map((t, i) => (
              <div key={i} className={`bg-white rounded-2xl border overflow-hidden w-full ${t.popular ? "border-[var(--blue-light)] shadow-lg" : "border-gray-100"} ${tariffsObs.inView ? `animate-fade-in-up delay-${i * 100 + 100}` : "opacity-0"}`}>
                {t.popular && <div className="bg-[#0a1628] text-white text-xs font-bold text-center py-2 tracking-wide">ПОПУЛЯРНЫЙ ВЫБОР</div>}
                <div className="relative h-36 overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="font-display font-black text-xl text-[#0a1628] mb-1">{t.name}</div>
                  <div className="text-[var(--blue)] font-bold text-lg mb-2">{t.price}</div>
                  <p className="text-gray-500 text-sm mb-4">{t.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {t.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <Icon name="Check" size={15} className="text-[var(--blue)] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#contacts" className={`block text-center py-3 rounded-xl font-bold text-sm transition-colors ${t.popular ? "bg-[#0a1628] text-white hover:bg-[#0d3d73]" : "border border-[var(--blue)] text-[var(--blue)] hover:bg-[var(--blue-50)]"}`}>
                    Подключить
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#contacts" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all text-lg">
              <Icon name="PhoneCall" size={20} />
              Подключить мониторинг
            </a>
            <p className="text-white/50 text-sm mt-3">Бесплатный выезд инженера и расчёт стоимости</p>
          </div>
        </div>
      </section>

      {/* О НАС */}
      <section id="about" className="py-20 bg-white overflow-hidden">
        <div ref={aboutObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className={`relative ${aboutObs.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <div className="rounded-2xl overflow-hidden">
                <img src={MONTAZH_IMAGE} alt="Монтаж пожарной сигнализации — специалисты ПожДозор за работой" className="w-full h-[280px] sm:h-[380px] lg:h-[480px] object-cover" />
              </div>
              <div className="absolute bottom-6 right-6 bg-[var(--blue-dark)] text-white rounded-2xl p-5 shadow-2xl max-w-[200px]">
                <div className="font-display font-black text-3xl mb-1">10</div>
                <div className="text-blue-200 text-sm">лет успешной работы на рынке</div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--blue-50)] rounded-2xl -z-10" />
            </div>
            <div className={`${aboutObs.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
                <div className="section-divider w-8" />
                О нас
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-6">
                Надёжный партнёр в области систем безопасности
              </h2>
              <p className="text-[var(--gray)] leading-relaxed mb-5">
                С 2016 года мы занимаемся проектированием, монтажом и техническим обслуживанием систем пожарной и охранной безопасности в Москве. За эти годы мы сдали более 1200 объектов — от небольших офисов до крупных промышленных предприятий.
              </p>
              <p className="text-[var(--gray)] leading-relaxed mb-8">
                Наша команда — это 40+ сертифицированных специалистов с многолетним опытом. Работаем строго в соответствии с НПБ, ГОСТ и требованиями МЧС России.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: "BadgeCheck", text: "Лицензия МЧС России" },
                  { icon: "Users", text: "40+ специалистов" },
                  { icon: "Clock", text: "Выезд за 2 часа" },
                  { icon: "FileCheck", text: "Проектная документация" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 p-3 bg-[var(--gray-light)] rounded-xl">
                    <Icon name={item.icon} fallback="Check" size={20} className="text-[var(--blue)] flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--dark)]">{item.text}</span>
                  </div>
                ))}
              </div>
              <a href="#contacts" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--blue)] text-white font-semibold rounded-xl hover:bg-[var(--blue-dark)] transition-colors">
                Связаться с нами
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ПОРТФОЛИО */}
      <section id="portfolio" className="py-20 bg-[var(--gray-light)]">
        <div ref={portfolioObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${portfolioObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Наши работы
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Портфолио</h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">Реализованные объекты — наша лучшая визитная карточка</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {portfolio.map((p, i) => (
              <div key={i} className={`bg-white rounded-2xl border border-gray-100 card-hover overflow-hidden ${portfolioObs.inView ? `animate-fade-in-up delay-${(i % 3) * 100 + 100}` : "opacity-0"}`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-sm text-[var(--dark)] mb-2 leading-snug">{p.title}</h3>
                  <p className="text-[var(--blue)] text-sm font-medium mb-2">{p.type}</p>
                  <div className="flex items-center gap-1.5 text-[var(--gray)] text-xs">
                    <Icon name="MapPin" size={12} />
                    {p.area}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* СЕРТИФИКАТЫ */}
      <section id="certificates" className="py-20 bg-white">
        <div ref={certsObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${certsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Документы
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Сертификаты и лицензии</h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">Работаем в полном соответствии с законодательством. Все документы в наличии</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            <div className={`${certsObs.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <img src={CERT_IMAGE} alt="Сертификаты" className="rounded-2xl w-full object-cover object-top shadow-xl" style={{ minHeight: "240px", maxHeight: "400px" }} />
            </div>
            <div className="grid grid-cols-1 gap-4 content-start">
              {certificates.map((c, i) => (
                <div key={i} className={`flex items-start gap-4 p-5 bg-[var(--gray-light)] rounded-xl card-hover ${certsObs.inView ? `animate-fade-in-up delay-${i * 100 + 100}` : "opacity-0"}`}>
                  <div className="w-12 h-12 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[var(--dark)] mb-0.5">{c.title}</div>
                    <div className="text-[var(--blue)] text-sm font-semibold mb-1">{c.num}</div>
                    <div className="text-[var(--gray)] text-sm">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[var(--gray-light)]">
        <div ref={faqObs.ref} className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${faqObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              FAQ
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Часто задаваемые вопросы</h2>
            <p className="text-[var(--gray)]">Ответы на популярные вопросы наших клиентов</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className={`bg-white rounded-xl overflow-hidden border border-gray-100 card-hover ${faqObs.inView ? `animate-fade-in-up delay-${i * 50 + 100}` : "opacity-0"}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-display font-semibold text-[var(--dark)] pr-4">{f.q}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${openFaq === i ? "bg-[var(--blue)] text-white rotate-45" : "bg-[var(--blue-50)] text-[var(--blue)]"}`}>
                    <Icon name="Plus" size={16} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-[var(--gray)] leading-relaxed border-t border-gray-100 pt-4">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-20 bg-white">
        <div ref={contactsObs.ref} className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`text-center mb-14 ${contactsObs.inView ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 text-[var(--blue)] text-sm font-semibold uppercase tracking-wider mb-3">
              <div className="section-divider w-8" />
              Связаться
              <div className="section-divider w-8" />
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--dark)] mb-4">Контакты</h2>
            <p className="text-[var(--gray)] max-w-xl mx-auto">Оставьте заявку и мы перезвоним в течение 15 минут</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">
            <div className={`${contactsObs.inView ? "animate-fade-in-left" : "opacity-0"}`}>
              <div className="bg-[var(--gray-light)] rounded-2xl p-4 sm:p-8 h-full flex flex-col">
                <h3 className="font-display font-bold text-xl text-[var(--dark)] mb-6">Оставить заявку</h3>
                {formState === "success" ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle" size={32} className="text-green-600" />
                    </div>
                    <div className="font-display font-bold text-xl text-[var(--dark)] mb-2">Заявка отправлена!</div>
                    <p className="text-[var(--gray)]">Свяжемся с вами в течение 15 минут</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Ваше имя</label>
                      <input type="text" placeholder="Иван Иванов" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Телефон <span className="text-red-500">*</span></label>
                      <input type="tel" placeholder="+7 (___) ___-__-__" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Тип объекта</label>
                      <select value={objectType} onChange={e => setObjectType(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all">
                        <option value="">Выберите тип объекта</option>
                        <option>Офис</option>
                        <option>Торговое помещение</option>
                        <option>Склад / производство</option>
                        <option>Жилое здание</option>
                        <option>Другое</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Комментарий</label>
                      <textarea placeholder="Площадь объекта, пожелания..." rows={3} value={comment} onChange={e => setComment(e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all resize-none" />
                    </div>
                    {formState === "error" && <div className="text-red-500 text-sm text-center">Ошибка отправки. Позвоните нам напрямую.</div>}
                    <button type="submit" disabled={formState === "loading"} className="w-full py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                      {formState === "loading" ? <><Icon name="Loader" size={18} className="animate-spin" /> Отправляем...</> : <><Icon name="Send" size={18} /> Отправить заявку</>}
                    </button>
                    <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
                  </form>
                )}
              </div>
            </div>

            <div className={`flex flex-col gap-4 ${contactsObs.inView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
              {[
                { icon: "Phone", title: "Телефон", lines: ["+7 (499) 490-22-01"] },
                { icon: "Mail", title: "Email", lines: ["skpb01@mail.ru"] },
                { icon: "MapPin", title: "Адрес", lines: ["г. Москва, ул. 5-я Магистральная,", "дом 12, офис 410"] },
                { icon: "Clock", title: "Режим работы", lines: ["Пн–Пт: 9:00 – 18:00", "Диспетчерская служба: 24/7"] },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-[var(--gray-light)] rounded-xl">
                  <div className="w-12 h-12 bg-[var(--blue)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} fallback="Phone" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[var(--dark)] mb-1">{c.title}</div>
                    {c.lines.map(l => <div key={l} className="text-[var(--gray)] text-sm">{l}</div>)}
                  </div>
                </div>
              ))}
              <div className="bg-[#0a1628] rounded-2xl p-6 text-white flex-1 flex flex-col justify-between">
                <div>
                  <div className="font-display font-extrabold text-lg mb-2">Выезд специалиста — бесплатно</div>
                  <p className="text-blue-200 text-sm mb-5">Приедем, осмотрим объект и составим смету без обязательств</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+74994902201" className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-[var(--blue)] font-bold px-5 py-3 rounded-xl hover:bg-blue-50 transition-colors text-sm">
                    <Icon name="Phone" size={16} />
                    Позвонить сейчас
                  </a>
                  <button onClick={() => setCallbackOpen(true)} className="flex-1 inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-bold px-5 py-3 rounded-xl hover:bg-white/25 transition-colors text-sm">
                    <Icon name="PhoneCall" size={16} />
                    Заказать звонок
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl overflow-hidden shadow-lg">
            <a href="https://yandex.ru/maps/?text=Москва+5-я+Магистральная+12" target="_blank" rel="noopener noreferrer" className="block relative group">
              <iframe src="https://yandex.ru/map-widget/v1/?text=Москва%2C+ул.+5-я+Магистральная%2C+дом+12&z=16&l=map" width="100%" height="380" frameBorder="0" allowFullScreen className="w-full block pointer-events-none" title="Карта проезда" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--blue)] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 group-hover:bg-[var(--blue-dark)] transition-colors">
                <Icon name="MapPin" size={16} />
                Открыть маршрут на Яндекс Картах
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ПОДВАЛ */}
      <footer className="bg-[var(--dark)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--blue)] flex items-center justify-center">
                  <Icon name="ShieldCheck" size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-extrabold text-base">
                    <span className="text-white">Пож</span><span className="text-[var(--blue-light)]">Дозор</span>
                  </div>
                  <div className="text-[10px] text-blue-400 tracking-widest uppercase">Мониторинг 24/7</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Центр удалённого мониторинга систем пожарной безопасности. Профессиональный монтаж и обслуживание с 2016 года.
              </p>
            </div>
            <div>
              <div className="font-display font-bold text-sm mb-4 text-gray-300 uppercase tracking-wider">Разделы</div>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-gray-400 text-sm hover:text-[var(--blue-light)] transition-colors">{l.label}</a>
                  </li>
                ))}
                <li>
                  <Link to="/montazh" className="text-gray-400 text-sm hover:text-[var(--blue-light)] transition-colors">Монтаж</Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-display font-bold text-sm mb-4 text-gray-300 uppercase tracking-wider">Контакты</div>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2"><Icon name="Phone" size={14} className="text-[var(--blue-light)]" />+7 (499) 490-22-01</li>
                <li className="flex items-center gap-2"><Icon name="Mail" size={14} className="text-[var(--blue-light)]" />skpb01@mail.ru</li>
                <li className="flex items-start gap-2"><Icon name="MapPin" size={14} className="text-[var(--blue-light)] mt-0.5" />ул. 5-я Магистральная, д. 12, офис 410</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-gray-500 text-sm">© 2026 ООО «СПАРК». Все права защищены.</div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <a href="#" className="hover:text-gray-400 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Плавающая кнопка звонка */}
      <a href="tel:+74994902201" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[var(--blue)] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[var(--blue-dark)] transition-colors btn-pulse">
        <Icon name="Phone" size={22} />
      </a>

      {/* Попап обратного звонка */}
      {callbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => { setCallbackOpen(false); setCallbackState("idle"); setCallbackPhone(""); }}>
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-xl text-[var(--dark)]">Заказать обратный звонок</h3>
              <button onClick={() => { setCallbackOpen(false); setCallbackState("idle"); setCallbackPhone(""); }} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Icon name="X" size={16} className="text-gray-500" />
              </button>
            </div>
            {callbackState === "success" ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-green-600" />
                </div>
                <div className="font-display font-bold text-lg text-[var(--dark)] mb-2">Заявка принята!</div>
                <p className="text-[var(--gray)] mb-6">Перезвоним в течение 15 минут</p>
                <button onClick={() => { setCallbackOpen(false); setCallbackState("idle"); }} className="text-[var(--blue)] text-sm font-medium hover:underline">Закрыть</button>
              </div>
            ) : (
              <form onSubmit={handleCallback} className="space-y-4">
                <p className="text-[var(--gray)] text-sm">Оставьте номер телефона — мы перезвоним в течение 15 минут</p>
                <div>
                  <label className="block text-sm font-medium text-[var(--dark)] mb-1.5">Телефон <span className="text-red-500">*</span></label>
                  <input type="tel" placeholder="+7 (___) ___-__-__" value={callbackPhone} onChange={e => setCallbackPhone(e.target.value)} required autoFocus className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[var(--dark)] placeholder-gray-400 focus:outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all" />
                </div>
                {callbackState === "error" && <div className="text-red-500 text-sm text-center">Ошибка отправки. Позвоните нам напрямую.</div>}
                <button type="submit" disabled={callbackState === "loading"} className="w-full py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
                  {callbackState === "loading" ? <><Icon name="Loader" size={18} className="animate-spin" /> Отправляем...</> : <><Icon name="PhoneCall" size={18} /> Перезвоните мне</>}
                </button>
                <p className="text-xs text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}