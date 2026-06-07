import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SEND_URL = "https://functions.poehali.dev/6dd07b4a-af2f-481a-b26d-adbf5ebe7a0b";

const ISM_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/790384c5-0086-4312-95b9-ab675381f276.jpg";
const HERO_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/bcbeb4b0-58b1-4df4-8045-320330c10235.jpg";

const flowSteps = [
  { icon: "Building2", label: "Объект" },
  { icon: "Wifi", label: "Передача данных" },
  { icon: "MonitorDot", label: "Центр мониторинга" },
  { icon: "BrainCircuit", label: "Анализ состояния" },
  { icon: "BellRing", label: "Уведомление клиента" },
  { icon: "Wrench", label: "Реагирование инженера" },
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
  "Информация о неисправностях в режиме реального времени",
  "История событий и отчёты",
  "Контроль между регламентными обслуживаниями",
  "Снижение риска штрафов",
  "Уверенность в работоспособности системы",
  "Возможность оперативного вмешательства",
];

const tariffs = [
  {
    name: "Базовый",
    price: "от 5 000 ₽/мес",
    desc: "Для небольших объектов — офисы, магазины до 500 м²",
    items: ["Мониторинг 1 системы", "Ежедневный отчёт на email", "Реакция оператора 24/7", "Выезд бригады по запросу"],
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/75f4c78e-8d83-46f4-8fd3-34439217eedc.jpg",
    imageAlt: "Оборудование ИСМ базового тарифа",
  },
  {
    name: "Стандарт",
    price: "от 9 000 ₽/мес",
    desc: "Для средних объектов — склады, торговые центры до 3 000 м²",
    items: ["Мониторинг до 3 систем", "Ежедневный отчёт + SMS", "Реакция оператора 24/7", "2 выезда бригады в месяц", "Ежеквартальный аудит"],
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/c26f5cd0-b692-4a48-965b-ca797ec2563a.jpg",
    imageAlt: "Сервер мониторинга стандартного тарифа",
    popular: true,
  },
  {
    name: "Премиум",
    price: "от 15 000 ₽/мес",
    desc: "Для крупных объектов — производства, бизнес-центры от 3 000 м²",
    items: ["Мониторинг без ограничений", "Отчёты в мессенджер + email", "Персональный менеджер", "Неограниченные выезды", "Ежемесячный аудит", "Приоритетная реакция 5 мин"],
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/790384c5-0086-4312-95b9-ab675381f276.jpg",
    imageAlt: "Диспетчерский центр мониторинга премиум тарифа",
  },
];

const faqs = [
  {
    q: "Подходит ли для любого объекта?",
    a: "Да, система совместима с большинством современных приёмно-контрольных приборов. Перед подключением наш инженер проводит бесплатный осмотр объекта.",
  },
  {
    q: "Сколько стоит подключение?",
    a: "Стоимость зависит от количества систем на объекте и типа оборудования. Оставьте заявку — мы рассчитаем стоимость бесплатно.",
  },
  {
    q: "Как быстро происходит реакция на неисправность?",
    a: "Диспетчерская служба работает 24/7. При обнаружении критической неисправности оператор связывается с вами в течение 5 минут.",
  },
  {
    q: "Что входит в ежедневный отчёт?",
    a: "Отчёт содержит общий статус систем, список событий за сутки, выявленные неисправности и рекомендации по устранению.",
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Ism() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", object: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim()) return;
    setFormState("loading");
    try {
      const res = await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, object_type: form.object, comment: "", source: "Страница ИСМ" }),
      });
      if (!res.ok) throw new Error();
      setFormState("success");
      setForm({ name: "", phone: "", object: "" });
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Навигация */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/60 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-display font-black text-white text-xl">
            Пож<span className="text-[var(--blue-light)]">Дозор</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/75">
            <a href="#how" className="hover:text-white transition-colors whitespace-nowrap">Как работает</a>
            <a href="#controls" className="hover:text-white transition-colors whitespace-nowrap">Что контролируем</a>
            <a href="#tariffs" className="hover:text-white transition-colors whitespace-nowrap">Тарифы</a>
            <a href="#faq" className="hover:text-white transition-colors whitespace-nowrap">FAQ</a>
            <Link to="/montazh" className="hover:text-white transition-colors whitespace-nowrap">Монтаж</Link>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="tel:+74994902201"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
            >
              <Icon name="Phone" size={15} />
              +7 (499) 490-22-01
            </a>
            <a
              href="#form"
              className="px-5 py-2.5 bg-[var(--blue)] text-white text-sm font-bold rounded-lg hover:bg-[var(--blue-dark)] transition-colors"
            >
              Подключить
            </a>
          </div>
        </div>
      </header>

      {/* Блок 1 — Герой */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a1628] pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/90 to-[#0a1628]/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Центр удалённого мониторинга · работает 24/7
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
              Контролируем исправность пожарной сигнализации{" "}
              <span className="text-[var(--blue-light)]">24/7</span>
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-4">
              Удалённо отслеживаем состояние систем безопасности, выявляем неисправности и предупреждаем о проблемах до аварий и проверок.
            </p>
            <p className="text-base text-white/55 leading-relaxed mb-10">
              Узнайте о неисправности раньше, чем она приведёт к проблеме. Круглосуточный мониторинг с автоматическими уведомлениями и отчётностью.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#form"
                className="px-8 py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all text-center text-lg"
              >
                Подключить мониторинг
              </a>
              <a
                href="#how"
                className="px-8 py-4 border border-white/25 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-center"
              >
                Как это работает
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="bg-[#0d3d73] py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "24/7", label: "Мониторинг" },
            { value: "5 мин", label: "Время реакции" },
            { value: "1200+", label: "Объектов под контролем" },
            { value: "0", label: "Пропущенных инцидентов" },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display font-black text-3xl md:text-4xl mb-1">{s.value}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Блок 2 — Как это работает */}
      <section id="how" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">
              Как это работает
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              От объекта до инженера — весь цикл автоматически
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center">
            {flowSteps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center text-center w-36">
                  <div className="w-16 h-16 rounded-2xl bg-[#0d3d73] flex items-center justify-center mb-3 shadow-md">
                    <Icon name={step.icon} fallback="Circle" size={26} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-[#0a1628] leading-tight">{step.label}</span>
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="flex items-center justify-center my-3 md:my-0 md:mx-1">
                    <Icon name="ChevronDown" size={22} className="text-[#1a5fb4]/40 md:hidden" />
                    <Icon name="ChevronRight" size={22} className="text-[#1a5fb4]/40 hidden md:block" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Блок 3 — Что контролируем */}
      <section id="controls" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">
              Что мы контролируем
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Единая точка контроля всех систем безопасности объекта
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {controls.map((c, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#1a5fb4]/30 hover:bg-[#e8f0fd]/40 transition-all">
                <div className="w-12 h-12 bg-[#0a1628] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon} fallback="Shield" size={22} className="text-white" />
                </div>
                <span className="font-semibold text-[#0a1628] leading-tight">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Разделитель — фото */}
      <section className="py-0">
        <img
          src={ISM_IMAGE}
          alt="Оператор центра мониторинга следит за состоянием систем безопасности"
          className="w-full h-[360px] object-cover"
        />
      </section>

      {/* Блок 4 — Что получает клиент */}
      <section className="py-20 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              Что получает клиент
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg">
              Не функции. Результаты.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {results.map((r, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/8 transition-colors">
                <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Check" size={14} className="text-white" />
                </div>
                <span className="text-white/90 leading-relaxed">{r}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#form"
              className="inline-block px-10 py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all text-lg"
            >
              Подключить мониторинг
            </a>
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section id="tariffs" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">
              Тарифы
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Выберите подходящий пакет — или оставьте заявку, мы подберём оптимальный вариант для вашего объекта
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tariffs.map((t, i) => (
              <div key={i} className={`bg-white rounded-2xl border overflow-hidden ${t.popular ? "border-[#1a5fb4] shadow-lg shadow-[#1a5fb4]/10" : "border-gray-100"}`}>
                {t.popular && (
                  <div className="bg-[#0a1628] text-white text-xs font-bold text-center py-2 tracking-wide">
                    ПОПУЛЯРНЫЙ ВЫБОР
                  </div>
                )}
                <div className="relative h-36 overflow-hidden">
                  <img src={t.image} alt={t.imageAlt} className="w-full h-full object-cover" />
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
                  <a href="#form" className={`block text-center py-3 rounded-xl font-bold text-sm transition-colors ${t.popular ? "bg-[#0a1628] text-white hover:bg-[#0d3d73]" : "border border-[#1a5fb4] text-[#1a5fb4] hover:bg-[#e8f0fd]"}`}>
                    Подключить
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-10 text-center">
            Частые вопросы
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#0a1628]">{faq.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="text-gray-400 flex-shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Форма заявки */}
      <section id="form" className="py-20 bg-[#0a1628]">
        <div className="max-w-xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
            Подключить мониторинг
          </h2>
          <p className="text-white/60 mb-10">
            Оставьте заявку — инженер свяжется с вами и рассчитает стоимость для вашего объекта бесплатно
          </p>
          {formState === "success" ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-white">
              <Icon name="CheckCircle" size={48} className="text-[var(--blue-light)] mx-auto mb-4" />
              <div className="font-bold text-xl mb-2">Заявка отправлена!</div>
              <div className="text-white/60">Мы свяжемся с вами в ближайшее время.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <input
                type="text"
                placeholder="Ваше имя"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50"
              />
              <input
                type="tel"
                placeholder="Телефон *"
                required
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50"
              />
              <input
                type="text"
                placeholder="Тип объекта (офис, склад, торговый центр...)"
                value={form.object}
                onChange={e => setForm({ ...form, object: e.target.value })}
                className="px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50"
              />
              {formState === "error" && (
                <div className="text-red-400 text-sm text-center">Ошибка отправки. Позвоните нам напрямую.</div>
              )}
              <button
                type="submit"
                disabled={formState === "loading"}
                className="px-8 py-4 bg-[var(--blue)] text-white font-bold rounded-xl hover:bg-[var(--blue-dark)] transition-all disabled:opacity-60"
              >
                {formState === "loading" ? "Отправляем..." : "Оставить заявку"}
              </button>
              <p className="text-white/30 text-xs text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-[#060e1c] py-8 text-center">
        <div className="font-display font-black text-white text-lg mb-1">
          Пож<span className="text-[var(--blue-light)]">Дозор</span>
        </div>
        <div className="text-white/40 text-sm">Центр удалённого мониторинга систем пожарной безопасности</div>
        <div className="text-white/40 text-sm mt-1">+7 (499) 490-22-01 · skpb01@mail.ru</div>
      </footer>
    </div>
  );
}