import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SEND_URL = "https://functions.poehali.dev/6dd07b4a-af2f-481a-b26d-adbf5ebe7a0b";

const ISM_IMAGE = "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/790384c5-0086-4312-95b9-ab675381f276.jpg";

const steps = [
  {
    num: "01",
    title: "Установка оборудования",
    desc: "Монтируем специализированное устройство, которое подключается к вашему приёмно-контрольному прибору пожарной сигнализации.",
  },
  {
    num: "02",
    title: "Анализ искусственным интеллектом",
    desc: "ИИ круглосуточно анализирует журнал событий всех противопожарных систем объекта, выявляя неисправности и отклонения.",
  },
  {
    num: "03",
    title: "Ежедневные отчёты",
    desc: "Ответственные лица получают краткий отчёт о состоянии всех систем — прямо на почту или в мессенджер.",
  },
  {
    num: "04",
    title: "Реакция диспетчерской службы",
    desc: "При обнаружении проблемы наши операторы немедленно связываются с вами и при необходимости выезжает ремонтная бригада.",
  },
];

const advantages = [
  {
    icon: "Eye",
    title: "Полный контроль 24/7",
    desc: "Вы всегда знаете реальное состояние всех противопожарных систем объекта, даже находясь за тысячи километров.",
  },
  {
    icon: "BrainCircuit",
    title: "Искусственный интеллект",
    desc: "ИИ анализирует тысячи событий ежедневно и выявляет потенциальные проблемы до того, как они станут критическими.",
  },
  {
    icon: "FileText",
    title: "Ежедневная отчётность",
    desc: "Краткие понятные отчёты для руководства — без технического жаргона, только важная информация.",
  },
  {
    icon: "Zap",
    title: "Оперативный выезд",
    desc: "При обнаружении неисправности бригада выезжает в кратчайшие сроки — ещё до проверки МЧС.",
  },
  {
    icon: "ShieldCheck",
    title: "Соответствие требованиям МЧС",
    desc: "ИСМ помогает поддерживать системы в рабочем состоянии и быть готовым к плановым проверкам.",
  },
  {
    icon: "TrendingDown",
    title: "Экономия на штрафах",
    desc: "Предотвращаем неисправности заранее — экономите на штрафах МЧС и дорогостоящем аварийном ремонте.",
  },
];

const tariffs = [
  {
    name: "Базовый",
    price: "от 5 000 ₽/мес",
    desc: "Для небольших объектов — офисы, магазины до 500 м²",
    items: ["Мониторинг 1 системы", "Ежедневный отчёт на email", "Реакция оператора 24/7", "Выезд бригады по запросу"],
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/75f4c78e-8d83-46f4-8fd3-34439217eedc.jpg",
    imageAlt: "Оборудование ИСМ базового тарифа — приёмно-контрольный прибор",
  },
  {
    name: "Стандарт",
    price: "от 9 000 ₽/мес",
    desc: "Для средних объектов — склады, торговые центры до 3 000 м²",
    items: ["Мониторинг до 3 систем", "Ежедневный отчёт + SMS", "Реакция оператора 24/7", "2 выезда бригады в месяц", "Ежеквартальный аудит"],
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/c26f5cd0-b692-4a48-965b-ca797ec2563a.jpg",
    imageAlt: "Сервер мониторинга противопожарных систем стандартного тарифа",
    popular: true,
  },
  {
    name: "Премиум",
    price: "от 15 000 ₽/мес",
    desc: "Для крупных объектов — производства, бизнес-центры от 3 000 м²",
    items: ["Мониторинг без ограничений", "Отчёты в мессенджер + email", "Персональный менеджер", "Неограниченные выезды", "Ежемесячный аудит", "Приоритетная реакция 5 мин"],
    image: "https://cdn.poehali.dev/projects/031d4dc8-7cba-4766-8fd9-e78f2a02f069/files/790384c5-0086-4312-95b9-ab675381f276.jpg",
    imageAlt: "Диспетчерский центр мониторинга противопожарных систем премиум тарифа",
  },
];

const faqs = [
  {
    q: "Подходит ли ИСМ для любого объекта?",
    a: "Да, ИСМ совместима с большинством современных приёмно-контрольных приборов. Перед подключением наш инженер проводит бесплатный осмотр объекта.",
  },
  {
    q: "Сколько стоит подключение к ИСМ?",
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-display font-black text-white text-xl">
            Пожар<span className="text-blue-400">Охрана</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      {/* Герой */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0a1628] pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${ISM_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/80 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Инновационная разработка
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
              ИСМ — интеллектуальная система мониторинга{" "}
              <span className="text-blue-400">противопожарных систем</span>
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed mb-8">
              Круглосуточный контроль всех противопожарных систем объекта с помощью искусственного интеллекта. Ежедневные отчёты, мгновенное реагирование, полное соответствие требованиям МЧС России.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#form"
                className="px-8 py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-all text-center"
              >
                Подключить ИСМ
              </a>
              <a
                href="#how"
                className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-center"
              >
                Как это работает
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="bg-blue-600 py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { value: "24/7", label: "Мониторинг" },
            { value: "5 мин", label: "Время реакции" },
            { value: "1200+", label: "Объектов под охраной" },
            { value: "0", label: "Пропущенных инцидентов" },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display font-black text-3xl md:text-4xl mb-1">{s.value}</div>
              <div className="text-blue-100 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Как это работает */}
      <section id="how" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">
              Как работает ИСМ
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Интеллектуальная система мониторинга подключается к вашей пожарной сигнализации и начинает работать автоматически
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative">
                <div className="font-display font-black text-5xl text-blue-100 mb-4">{s.num}</div>
                <h3 className="font-display font-bold text-lg text-[#0a1628] mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Изображение */}
      <section className="py-0">
        <img
          src={ISM_IMAGE}
          alt="Оператор ИСМ следит за показателями противопожарных систем на мониторах диспетчерского центра"
          className="w-full h-[400px] object-cover"
        />
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">
              Преимущества ИСМ для вашего объекта
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Интеллектуальный мониторинг противопожарных систем — это не просто контроль, это уверенность в безопасности
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={a.icon} fallback="Shield" size={22} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0a1628] mb-2">{a.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#0a1628] mb-4">
              Тарифы на подключение ИСМ
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Выберите подходящий пакет — или оставьте заявку, мы подберём оптимальный вариант для вашего объекта
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tariffs.map((t, i) => (
              <div key={i} className={`bg-white rounded-2xl border overflow-hidden ${t.popular ? "border-blue-500 shadow-lg shadow-blue-100" : "border-gray-100"}`}>
                {t.popular && (
                  <div className="bg-blue-600 text-white text-xs font-bold text-center py-2 tracking-wide">
                    ПОПУЛЯРНЫЙ ВЫБОР
                  </div>
                )}
                <div className="relative h-36 overflow-hidden">
                  <img src={t.image} alt={t.imageAlt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="font-display font-black text-xl text-[#0a1628] mb-1">{t.name}</div>
                  <div className="text-blue-600 font-bold text-lg mb-2">{t.price}</div>
                  <p className="text-gray-500 text-sm mb-4">{t.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {t.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <Icon name="Check" size={15} className="text-blue-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#form" className={`block text-center py-3 rounded-xl font-bold text-sm transition-colors ${t.popular ? "bg-blue-600 text-white hover:bg-blue-500" : "border border-blue-600 text-blue-600 hover:bg-blue-50"}`}>
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
            Частые вопросы об ИСМ
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
            Подключить ИСМ
          </h2>
          <p className="text-blue-200 mb-10">
            Оставьте заявку — наш инженер свяжется с вами и рассчитает стоимость для вашего объекта бесплатно
          </p>
          {formState === "success" ? (
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-8 text-white">
              <Icon name="CheckCircle" size={48} className="text-blue-400 mx-auto mb-4" />
              <div className="font-bold text-xl mb-2">Заявка отправлена!</div>
              <div className="text-blue-200">Мы свяжемся с вами в ближайшее время.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              <input
                type="text"
                placeholder="Ваше имя"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400"
              />
              <input
                type="tel"
                placeholder="Телефон *"
                required
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                placeholder="Тип объекта (офис, склад, торговый центр...)"
                value={form.object}
                onChange={e => setForm({ ...form, object: e.target.value })}
                className="px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-blue-400"
              />
              {formState === "error" && (
                <div className="text-red-400 text-sm text-center">Ошибка отправки. Позвоните нам напрямую.</div>
              )}
              <button
                type="submit"
                disabled={formState === "loading"}
                className="px-8 py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {formState === "loading" ? (
                  <><Icon name="Loader" size={18} className="animate-spin" /> Отправляем...</>
                ) : (
                  <><Icon name="Send" size={18} /> Отправить заявку</>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-[#060e1e] py-8 text-center text-blue-400 text-sm">
        <div>© 2016–2026 ПожарОхрана. Монтаж и обслуживание систем пожарной безопасности в Москве.</div>
        <div className="mt-1">+7 (499) 490-22-01 · skpb01@mail.ru</div>
      </footer>
    </div>
  );
}