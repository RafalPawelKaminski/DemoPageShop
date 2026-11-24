import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { ContactSubmission, DensityMode } from '../types';

interface ContactPageProps {
  density: DensityMode;
  prefillTopic?: string;
  onBackToCatalog: () => void;
}

const TOPICS = [
  'Zamówienie indywidualne',
  'Współpraca B2B / HoReCa',
  'Pytanie o certyfikaty BIO',
  'Dostawa i reklamacje',
];

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
  consent?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  density,
  prefillTopic,
  onBackToCatalog,
}) => {
  const isHigh = density === 'high';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState(prefillTopic || TOPICS[0]);
  const [preferredReply, setPreferredReply] = useState<'email' | 'phone'>('email');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submission, setSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    if (prefillTopic && TOPICS.includes(prefillTopic)) {
      setTopic(prefillTopic);
    }
  }, [prefillTopic]);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (fullName.trim().length < 2) {
      next.fullName = 'Podaj imię i nazwisko (minimum 2 znaki).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      next.email = 'Wpisz poprawny adres e-mail, np. jan@kowalski.pl.';
    }
    if (message.trim().length < 15) {
      next.message = 'Opisz krótko swoje zapytanie (minimum 15 znaków).';
    }
    if (!consent) {
      next.consent = 'Wymagana jest zgoda na odpowiedź na wysłane zapytanie.';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const now = new Date();
    const formattedDate = now.toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setSubmission({
      referenceId: `ZGL-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedAt: formattedDate,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      topic,
      preferredReply,
      message: message.trim(),
    });
  };

  const handleReset = () => {
    setSubmission(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setConsent(false);
    setErrors({});
  };

  const fieldPadding = isHigh ? 'px-3 py-2 text-sm' : 'px-3.5 py-2.5 text-sm';

  return (
    <div
      className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ${
        isHigh ? 'py-6 space-y-5' : 'py-10 sm:py-14 space-y-8'
      }`}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-black/8 dark:border-white/10">
        <div className="space-y-2 max-w-2xl">
          <button
            type="button"
            onClick={onBackToCatalog}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#234F32] dark:text-[#6EC28B] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Wróć do katalogu produktów</span>
          </button>
          <h1
            className={`font-display font-semibold tracking-tight text-[#141A15] dark:text-[#EDF2ED] ${
              isHigh ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
            }`}
          >
            Kontakt ze sklepem Polna Spiżarnia
          </h1>
          <p className="text-sm sm:text-base text-[#4A564C] dark:text-[#B1BEB3] leading-relaxed">
            Masz pytanie o pochodzenie produktów, dostawy paczek tygodniowych lub
            ofertę dla gastronomii? Wypełnij formularz poniżej.
          </p>
        </div>

        <div className="text-xs text-[#525E54] dark:text-[#9CA89E] font-mono-tabular shrink-0">
          Czas odpowiedzi: do 4 godz. roboczych
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 items-start ${
          isHigh ? 'gap-5' : 'gap-8 lg:gap-10'
        }`}
      >
        {/* Left Column: Direct Details & Topic Quick-Selectors */}
        <aside
          className={`lg:col-span-5 rounded-xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#141A15] ${
            isHigh ? 'p-4 space-y-4' : 'p-6 sm:p-7 space-y-6'
          }`}
        >
          <div className="space-y-1">
            <h2 className="font-display text-lg sm:text-xl font-semibold">
              Dane kontaktowe
            </h2>
            <p className="text-xs sm:text-sm text-[#525E54] dark:text-[#9CA89E]">
              Punkt odbioru osobistego oraz biuro obsługi zamówień.
            </p>
          </div>

          <dl className={isHigh ? 'space-y-3 text-sm' : 'space-y-4 text-sm'}>
            <div className="flex items-start gap-3">
              <MapPin
                className="w-4 h-4 text-[#234F32] dark:text-[#6EC28B] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-[#525E54] dark:text-[#9CA89E]">
                  Adres spiżarni i punktu odbioru
                </dt>
                <dd className="font-medium mt-0.5">
                  ul. Mokotowska 48a, 00-543 Warszawa
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone
                className="w-4 h-4 text-[#234F32] dark:text-[#6EC28B] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-[#525E54] dark:text-[#9CA89E]">
                  Telefon do obsługi klienta
                </dt>
                <dd className="font-medium font-mono-tabular mt-0.5">
                  +48 22 489 12 30
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail
                className="w-4 h-4 text-[#234F32] dark:text-[#6EC28B] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-[#525E54] dark:text-[#9CA89E]">
                  Poczta elektroniczna
                </dt>
                <dd className="font-medium mt-0.5">kontakt@polnaspizarnia.pl</dd>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock
                className="w-4 h-4 text-[#234F32] dark:text-[#6EC28B] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-[#525E54] dark:text-[#9CA89E]">
                  Godziny pracy zespołu
                </dt>
                <dd className="font-medium mt-0.5">
                  Pn–Pt 08:00–18:00 · Sob 09:00–14:00
                </dd>
              </div>
            </div>
          </dl>

          <div className="pt-4 border-t border-black/8 dark:border-white/10 space-y-2.5">
            <p className="text-xs font-medium text-[#525E54] dark:text-[#9CA89E]">
              Szybki wybór tematu wiadomości
            </p>
            <div className="flex flex-wrap gap-1.5">
              {TOPICS.map((item) => {
                const selected = topic === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setTopic(item);
                      setSubmission(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      selected
                        ? 'bg-[#234F32] text-white dark:bg-[#58A874] dark:text-[#0B120D]'
                        : 'bg-[#F2F4F0] dark:bg-[#1C231D] text-[#424E44] dark:text-[#B4C1B6] hover:bg-[#E7EBE3] dark:hover:bg-[#242D26]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Column: Interactive Client Contact Form */}
        <div
          className={`lg:col-span-7 rounded-xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#141A15] ${
            isHigh ? 'p-4 sm:p-5' : 'p-6 sm:p-8'
          }`}
        >
          {submission ? (
            <div className="space-y-6">
              <div className="flex items-start gap-3.5">
                <CheckCircle2
                  className="w-6 h-6 text-[#234F32] dark:text-[#6EC28B] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div className="space-y-1">
                  <p className="text-xs font-mono-tabular text-[#525E54] dark:text-[#9CA89E]">
                    Zgłoszenie {submission.referenceId} · {submission.submittedAt}
                  </p>
                  <h2 className="font-display text-2xl font-semibold">
                    Wiadomość została wysłana
                  </h2>
                  <p className="text-sm text-[#4A564C] dark:text-[#B1BEB3]">
                    Dziękujemy, {submission.fullName}. Nasz opiekun klienta
                    odpowie na wskazany{' '}
                    {submission.preferredReply === 'email'
                      ? `adres ${submission.email}`
                      : `numer ${submission.phone || submission.email}`}
                    .
                  </p>
                </div>
              </div>

              <dl className="rounded-lg border border-black/8 dark:border-white/10 bg-[#F7F8F6] dark:bg-[#0E130F] p-4 space-y-2.5 text-sm">
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-[#525E54] dark:text-[#9CA89E]">Temat</dt>
                  <dd className="font-medium">{submission.topic}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-[#525E54] dark:text-[#9CA89E]">
                    Adres e-mail
                  </dt>
                  <dd className="font-medium">{submission.email}</dd>
                </div>
                <div className="pt-2 border-t border-black/8 dark:border-white/10">
                  <dt className="text-xs text-[#525E54] dark:text-[#9CA89E] mb-1">
                    Treść wiadomości
                  </dt>
                  <dd className="text-sm leading-relaxed whitespace-pre-wrap">
                    {submission.message}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 text-sm font-medium rounded-lg bg-[#234F32] text-white hover:bg-[#1B3E27] dark:bg-[#58A874] dark:text-[#0B120D] cursor-pointer min-h-[42px]"
                >
                  Wyślij kolejną wiadomość
                </button>
                <button
                  type="button"
                  onClick={onBackToCatalog}
                  className="px-4 py-2.5 text-sm font-medium rounded-lg border border-black/14 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/6 cursor-pointer min-h-[42px]"
                >
                  Wróć do katalogu
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className={isHigh ? 'space-y-3.5' : 'space-y-5'}
            >
              <div className="space-y-1">
                <h2 className="font-display text-xl font-semibold">
                  Formularz zapytania
                </h2>
                <p className="text-xs sm:text-sm text-[#525E54] dark:text-[#9CA89E]">
                  Pola oznaczone gwiazdką (*) są wymagane do udzielenia odpowiedzi.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs sm:text-sm font-medium mb-1.5"
                  >
                    Imię i nazwisko *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="np. Anna Kowalska"
                    aria-invalid={Boolean(errors.fullName)}
                    className={`w-full rounded-lg border bg-[#F7F8F6] dark:bg-[#0E130F] text-[#141A15] dark:text-[#EDF2ED] placeholder:text-[#738075] focus:outline-2 focus:outline-[#234F32] dark:focus:outline-[#58A874] ${fieldPadding} ${
                      errors.fullName
                        ? 'border-[#B53D32] dark:border-[#EA7B70]'
                        : 'border-black/12 dark:border-white/14'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#B53D32] dark:text-[#EA7B70]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs sm:text-sm font-medium mb-1.5"
                  >
                    Adres e-mail *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anna@przyklad.pl"
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full rounded-lg border bg-[#F7F8F6] dark:bg-[#0E130F] text-[#141A15] dark:text-[#EDF2ED] placeholder:text-[#738075] focus:outline-2 focus:outline-[#234F32] dark:focus:outline-[#58A874] ${fieldPadding} ${
                      errors.email
                        ? 'border-[#B53D32] dark:border-[#EA7B70]'
                        : 'border-black/12 dark:border-white/14'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#B53D32] dark:text-[#EA7B70]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs sm:text-sm font-medium mb-1.5"
                  >
                    Temat zapytania
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={`w-full rounded-lg border border-black/12 dark:border-white/14 bg-[#F7F8F6] dark:bg-[#0E130F] text-[#141A15] dark:text-[#EDF2ED] focus:outline-2 focus:outline-[#234F32] dark:focus:outline-[#58A874] ${fieldPadding}`}
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs sm:text-sm font-medium mb-1.5"
                  >
                    Numer telefonu (opcjonalnie)
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+48 500 000 000"
                    className={`w-full rounded-lg border border-black/12 dark:border-white/14 bg-[#F7F8F6] dark:bg-[#0E130F] text-[#141A15] dark:text-[#EDF2ED] placeholder:text-[#738075] focus:outline-2 focus:outline-[#234F32] dark:focus:outline-[#58A874] ${fieldPadding}`}
                  />
                </div>
              </div>

              <div>
                <span className="block text-xs sm:text-sm font-medium mb-1.5">
                  Preferowana forma odpowiedzi
                </span>
                <div className="inline-flex items-center p-0.5 rounded-lg bg-[#F2F4F0] dark:bg-[#1C231D] border border-black/8 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreferredReply('email')}
                    aria-pressed={preferredReply === 'email'}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
                      preferredReply === 'email'
                        ? 'bg-white dark:bg-[#273129] text-[#141A15] dark:text-[#EDF2ED] shadow-xs'
                        : 'text-[#525E54] dark:text-[#9CA89E]'
                    }`}
                  >
                    Wiadomość e-mail
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredReply('phone')}
                    aria-pressed={preferredReply === 'phone'}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors ${
                      preferredReply === 'phone'
                        ? 'bg-white dark:bg-[#273129] text-[#141A15] dark:text-[#EDF2ED] shadow-xs'
                        : 'text-[#525E54] dark:text-[#9CA89E]'
                    }`}
                  >
                    Kontakt telefoniczny
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs sm:text-sm font-medium mb-1.5"
                >
                  Wiadomość *
                </label>
                <textarea
                  id="contact-message"
                  rows={isHigh ? 3 : 4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Napisz, jakich produktów szukasz, podaj przewidywaną wielkość zamówienia lub pytanie o certyfikaty..."
                  aria-invalid={Boolean(errors.message)}
                  className={`w-full rounded-lg border bg-[#F7F8F6] dark:bg-[#0E130F] text-[#141A15] dark:text-[#EDF2ED] placeholder:text-[#738075] focus:outline-2 focus:outline-[#234F32] dark:focus:outline-[#58A874] ${fieldPadding} ${
                    errors.message
                      ? 'border-[#B53D32] dark:border-[#EA7B70]'
                      : 'border-black/12 dark:border-white/14'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#B53D32] dark:text-[#EA7B70]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A564C] dark:text-[#B1BEB3] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#234F32] dark:accent-[#58A874] rounded shrink-0"
                  />
                  <span>
                    Wyrażam zgodę na kontakt zwrotny w celu obsługi mojego
                    zapytania zgodnie z polityką prywatności sklepu Polna Spiżarnia. *
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#B53D32] dark:text-[#EA7B70]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.consent}</span>
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-[#525E54] dark:text-[#9CA89E]">
                  Bezpośrednia obsługa zamówień indywidualnych i B2B
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-[#234F32] text-white hover:bg-[#1B3E27] dark:bg-[#58A874] dark:text-[#0B120D] dark:hover:bg-[#6AB986] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 min-h-[44px]"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Wyślij wiadomość</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
