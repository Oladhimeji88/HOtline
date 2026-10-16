import React from "react";
import ReactDOM from "react-dom/client";
import { ArrowLeft, ArrowRight, Bell, Check, Clock3, GitBranch, Hash, Layers3, MapPin, Menu, Mic2, Music2, Pause, Phone, Play, Route, Shuffle, Upload, Voicemail, Volume2, X } from "lucide-react";
import heroImageUrl from "../images/hero2.png";
import appDownloadImageUrl from "../images/image.png";
import logoUrl from "../logo/NAtiveTalk.svg";
import "./styles.css";

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

type NumberOption = {
  number: string;
  status: "Available" | "Reserved";
  tone: string;
};

const features: Feature[] = [
  {
    icon: Route,
    title: "Department routing",
    description: "Send callers to sales, support, billing, deliveries, or reception with simple keypad options.",
  },
  {
    icon: Hash,
    title: "Choose your own number",
    description: "Reserve a memorable business number from a curated pool that fits your brand.",
  },
  {
    icon: Phone,
    title: "Dedicated business hotline",
    description: "One professional number your whole team answers instead of exposing personal lines.",
  },
  {
    icon: GitBranch,
    title: "Sequential ringing",
    description: "Ring your team one after another until the right person picks up the call.",
  },
  {
    icon: Bell,
    title: "Simultaneous ringing",
    description: "Reach every available teammate at once so the fastest person can answer.",
  },
  {
    icon: Shuffle,
    title: "Overflow routing",
    description: "Unavailable staff automatically hand off to another person or branch.",
  },
  {
    icon: Clock3,
    title: "Business hours routing",
    description: "Treat calls differently during the workday, after hours, and on weekends.",
  },
  {
    icon: Voicemail,
    title: "Voicemail capture",
    description: "Missed calls become actionable messages instead of invisible lost demand.",
  },
  {
    icon: Mic2,
    title: "Professional greetings",
    description: "Open every call with a polished greeting that sounds like your business.",
  },
  {
    icon: Volume2,
    title: "IVR menus",
    description: "Let customers navigate your team without needing a dedicated operator.",
  },
  {
    icon: Music2,
    title: "Hold music",
    description: "Replace silence with music, promotions, or service updates.",
  },
  {
    icon: Upload,
    title: "Custom audio uploads",
    description: "Upload recordings or request production for a fully branded call experience.",
  },
  {
    icon: Layers3,
    title: "Multiple hotline numbers",
    description: "Dedicated lines for sales, support, delivery, VIP customers, or campaigns.",
  },
  {
    icon: MapPin,
    title: "Multi-branch support",
    description: "Separate hotlines for every location, each routed independently.",
  },
];

const premiumNumbers: NumberOption[] = [
  { number: "0200 411 1111", status: "Available", tone: "Memorable" },
  { number: "0200 422 2222", status: "Available", tone: "Premium" },
  { number: "0200 433 4444", status: "Reserved", tone: "Taken" },
  { number: "0200 455 5000", status: "Available", tone: "Easy recall" },
];

const callLineInventory: NumberOption[] = [
  ...premiumNumbers,
  { number: "0200 481 7000", status: "Available", tone: "Business" },
  { number: "0200 491 2929", status: "Available", tone: "Repeating" },
  { number: "0200 501 0001", status: "Available", tone: "Easy recall" },
  { number: "0200 515 1000", status: "Available", tone: "Premium" },
  { number: "0200 522 2525", status: "Reserved", tone: "Repeating" },
  { number: "0200 550 8000", status: "Available", tone: "Business" },
];

const callFlowPaths = [
  { d: "M110 160 C 200 160, 220 160, 300 160", delay: 0 },
  { d: "M420 160 C 480 90, 540 60, 660 60", delay: 0.8 },
  { d: "M420 160 C 480 125, 540 115, 660 130", delay: 1.5 },
  { d: "M420 160 C 480 195, 540 205, 660 200", delay: 2.2 },
  { d: "M420 160 C 480 250, 540 265, 660 270", delay: 2.9 },
];

const audioItems = [
  {
    title: "Caller greetings",
    sub: "8-15 sec opening",
    script: "Welcome to NativeTalk. Thank you for calling. We are ready to help you today.",
  },
  {
    title: "IVR menus",
    sub: "5-10 sec per level",
    script: "For sales, press one. For customer support, press two. For billing, press three.",
  },
  {
    title: "Hold messages",
    sub: "15-30 sec loops",
    script: "Your call is important to us. Please stay on the line and a member of our team will be with you shortly.",
  },
  {
    title: "Campaign announcements",
    sub: "On-demand",
    script: "Our new business hotline is now live. Reach the right team faster, all from one simple number.",
  },
  {
    title: "Voice production",
    sub: "Studio add-on",
    script: "Professional voice production gives every customer interaction a clear, polished, and consistent sound.",
  },
];

function App() {
  if (window.location.pathname === "/choose-number") {
    return <NumberSelectionPage />;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-ink-950">
      <Header />
      <Hero />
      <Numbers />
      <Problem />
      <Features />
      <CallFlow />
      <Audio />
      <Onboarding />
      <Pricing />
      <AppDownload />
      <FinalCta />
      <Footer />
    </main>
  );
}

function NumberSelectionPage() {
  const requestedNumber = new URLSearchParams(window.location.search).get("number");
  const initialNumber =
    callLineInventory.find((line) => line.number === requestedNumber && line.status === "Available")?.number ??
    callLineInventory.find((line) => line.status === "Available")!.number;
  const [selectedNumber, setSelectedNumber] = React.useState(initialNumber);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const selectedLine = callLineInventory.find((line) => line.number === selectedNumber)!;

  return (
    <main className="min-h-screen bg-[#f8faf7] text-ink-950">
      <header className="border-b border-ink-100 bg-white">
        <nav className="flex h-20 w-full items-center justify-between px-6 md:px-10 lg:px-12" aria-label="Number selection navigation">
          <a href="/" aria-label="NativeTalk home">
            <img src={logoUrl} alt="NativeTalk" className="h-11 w-auto max-w-[184px] object-contain" />
          </a>
          <a href="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-ink-200 bg-white px-4 text-sm font-medium text-ink-800 transition hover:border-brand-400 hover:text-brand-700">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </a>
        </nav>
      </header>

      <section className="px-6 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <Eyebrow>Choose your call line</Eyebrow>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-5xl">Select a number customers will remember.</h1>
            <p className="mt-5 text-base leading-8 text-ink-600 md:text-lg">Open the list to compare every call line, then reserve the number that fits your business.</p>
          </div>

          <div className="mt-12 grid overflow-hidden rounded-lg border border-ink-200 bg-white lg:grid-cols-[1.05fr_0.95fr]">
            <form
              className="p-6 md:p-9"
              onSubmit={(event) => {
                event.preventDefault();
                setIsConfirmed(true);
              }}
            >
              <label htmlFor="call-line" className="text-sm font-semibold text-ink-900">
                Available call lines
              </label>
              <p className="mt-1 text-sm leading-6 text-ink-500">Unavailable numbers remain visible but cannot be selected.</p>
              <select
                id="call-line"
                value={selectedNumber}
                onChange={(event) => {
                  setSelectedNumber(event.target.value);
                  setIsConfirmed(false);
                }}
                className="mt-5 h-14 w-full rounded-lg border border-ink-200 bg-white px-4 text-base font-medium text-ink-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              >
                {callLineInventory.map((line) => (
                  <option key={line.number} value={line.number} disabled={line.status === "Reserved"}>
                    {line.number} - {line.tone}{line.status === "Reserved" ? " (Unavailable)" : ""}
                  </option>
                ))}
              </select>

              <button type="submit" className="btn-primary mt-6 w-full">
                Reserve this number
              </button>

              {isConfirmed && (
                <div className="mt-5 flex items-start gap-3 border-l-2 border-brand-500 bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-800" role="status">
                  <Check className="mt-0.5 h-5 w-5 shrink-0" />
                  {selectedLine.number} has been selected for your business hotline.
                </div>
              )}
            </form>

            <aside className="border-t border-ink-200 bg-ink-900 p-6 text-white lg:border-l lg:border-t-0 md:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-300">Your selection</p>
              <p className="mt-5 text-3xl font-semibold">{selectedLine.number}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-white/65">
                <span className="h-2 w-2 rounded-full bg-brand-400" />
                Available now
              </div>
              <dl className="mt-10 divide-y divide-white/10 border-y border-white/10 text-sm">
                <div className="flex items-center justify-between py-4">
                  <dt className="text-white/55">Number type</dt>
                  <dd className="font-medium">{selectedLine.tone}</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-white/55">Activation</dt>
                  <dd className="font-medium">1 business day</dd>
                </div>
                <div className="flex items-center justify-between py-4">
                  <dt className="text-white/55">Routing</dt>
                  <dd className="font-medium">Included</dd>
                </div>
              </dl>
              <p className="mt-6 text-sm leading-6 text-white/55">Your number is only reserved after you confirm your selection.</p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigation = [
    ["Numbers", "#numbers"],
    ["Features", "#features"],
    ["Audio", "#audio"],
    ["Pricing", "#pricing"],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-100 bg-white/95 backdrop-blur-xl">
      <nav className="flex h-20 w-full items-center justify-between px-6 md:px-10 lg:px-12" aria-label="Main navigation">
        <a href="#" className="flex shrink-0 items-center gap-4" aria-label="NativeTalk home">
          <img src={logoUrl} alt="NativeTalk" className="h-11 w-auto max-w-[184px] object-contain" />
          <span className="hidden border-l border-ink-200 pl-4 text-sm font-medium text-ink-600 xl:block">Business Hotline</span>
        </a>

        <div className="hidden h-full items-center gap-9 text-sm font-medium text-ink-700 lg:flex">
          {navigation.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="relative flex h-full items-center transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-brand-500 after:transition-transform hover:text-ink-950 hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="/choose-number" className="hidden min-h-11 items-center rounded-lg bg-brand-500 px-5 text-sm font-semibold text-white transition hover:bg-brand-600 sm:inline-flex">
            Get your hotline
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-ink-200 text-ink-950 transition hover:border-brand-400 hover:text-brand-700 lg:hidden"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`border-t border-ink-100 bg-white px-6 transition-[max-height,opacity] duration-300 lg:hidden ${
          isMenuOpen ? "max-h-96 py-5 opacity-100" : "pointer-events-none max-h-0 overflow-hidden py-0 opacity-0"
        }`}
      >
        <div className="flex w-full flex-col">
          {navigation.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-ink-100 py-4 text-base font-medium text-ink-800 transition hover:text-brand-700"
            >
              {label}
            </a>
          ))}
          <a href="/choose-number" onClick={() => setIsMenuOpen(false)} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-500 px-6 text-sm font-semibold text-white transition hover:bg-brand-600 sm:hidden">
            Get your hotline
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const heroBenefits = ["No SIM card required", "Live in one business day", "Routing built for teams"];

  return (
    <section className="relative border-b border-ink-100 bg-white px-6 pb-20 pt-32 md:px-8 md:pb-24 md:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:gap-16">
        <div className="relative z-10 flex w-full max-w-[620px] self-center flex-col items-start text-left">
          <div className="hero-reveal hero-reveal-1">
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-brand-700">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              NativeTalk Business Hotline
            </span>
          </div>
          <TypewriterHeadline />
          <p className="hero-reveal hero-reveal-3 mt-6 w-full max-w-[580px] text-left text-base font-medium leading-7 text-ink-700 md:text-lg md:leading-8">
            Give your team one professional number for calls, smart routing, greetings, voicemail, and every branch of your business.
          </p>
          <div className="hero-reveal hero-reveal-4 mt-8 flex w-full flex-wrap justify-start gap-3">
            <a className="btn-primary" href="/choose-number">
              Choose your number <ArrowRight className="h-5 w-5" />
            </a>
            <a className="btn-secondary" href="#features">
              See how it works
            </a>
          </div>
          <ul className="hero-reveal hero-reveal-5 mt-8 flex w-full flex-wrap gap-x-6 gap-y-3 text-left text-sm font-medium text-ink-600">
            {heroBenefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-600" strokeWidth={2.5} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

const heroHeadline = "One Hotline for every customer conversation.";

function TypewriterHeadline() {
  const [characterCount, setCharacterCount] = React.useState(0);

  React.useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setCharacterCount(heroHeadline.length);
      return;
    }

    let timer: ReturnType<typeof window.setTimeout>;
    let currentCharacter = 0;

    const typeNextCharacter = () => {
      currentCharacter += 1;
      setCharacterCount(currentCharacter);

      if (currentCharacter < heroHeadline.length) {
        timer = window.setTimeout(typeNextCharacter, 52);
      }
    };

    timer = window.setTimeout(typeNextCharacter, 450);
    return () => window.clearTimeout(timer);
  }, []);

  const visibleText = heroHeadline.slice(0, characterCount);
  const beforeAccent = visibleText.slice(0, 4);
  const accent = visibleText.slice(4, 11);
  const afterAccent = visibleText.slice(11);

  return (
    <h1
      aria-label={heroHeadline}
      className="hero-reveal hero-reveal-2 relative mt-5 w-full max-w-[620px] text-left text-[40px] font-extrabold leading-[1.08] tracking-normal text-ink-950 sm:text-5xl lg:text-[56px]"
    >
      <span aria-hidden="true" className="invisible">
        One <span className="text-brand-600">Hotline</span> for every customer conversation.
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {beforeAccent}
        <span className="text-brand-600">{accent}</span>
        {afterAccent}
        <span className="typewriter-cursor" />
      </span>
    </h1>
  );
}

function HeroVisual() {
  return (
    <div className="relative z-10 flex self-center items-center justify-center motion-safe:animate-[fadeUp_1s_cubic-bezier(.16,1,.3,1)_.12s_both]">
      <div className="relative flex w-full items-center justify-center">
        <img
          src={heroImageUrl}
          alt="NativeTalk business hotline mobile app and dashboard previews"
          className="mx-auto max-h-[660px] w-auto max-w-full object-contain"
        />
      </div>
    </div>
  );
}

function Numbers() {
  return (
    <section id="numbers" className="bg-[#f8faf7] px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Choose a number" title="Pick the hotline customers will remember." centered={false}>
          Browse available numbers, reserve the right one, and start configuring your routing flow.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {premiumNumbers.map((option, index) => (
            <button
              key={option.number}
              disabled={option.status === "Reserved"}
              onClick={() => {
                if (option.status === "Available") {
                  window.location.href = `/choose-number?number=${encodeURIComponent(option.number)}`;
                }
              }}
              className={`group rounded-lg border p-6 text-left transition duration-300 ${
                option.status === "Available"
                  ? "border-ink-100 bg-white hover:-translate-y-0.5 hover:border-brand-500 hover:shadow-card"
                  : "border-ink-100 bg-ink-50 opacity-55"
              } ${index === 0 ? "border-brand-500 ring-4 ring-brand-100" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-nativeBlue-50 px-3 py-1 text-xs font-semibold text-nativeBlue-700">{option.tone}</span>
                <span className={`text-xs font-extrabold uppercase tracking-[0.14em] ${option.status === "Available" ? "text-brand-700" : "text-ink-500"}`}>
                  {option.status}
                </span>
              </div>
              <p className="mt-5 text-xl font-bold text-ink-950">{option.number}</p>
              <span className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-ink-950 text-sm font-bold text-white transition group-hover:bg-brand-600">
                {option.status === "Available" ? "Reserve number" : "Unavailable"}
                {option.status === "Available" && <Check className="h-4 w-4" />}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const missedCallSequence = [
    ["01", "The call reaches one person", "Availability depends on a single phone."],
    ["02", "There is no automatic handoff", "The customer has nowhere else to go."],
    ["03", "The opportunity disappears", "Your team never sees the missed demand."],
  ];

  return (
    <section className="bg-white px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <SectionHeading eyebrow="The cost of going without" title="Missed calls quietly become missed revenue." centered={false}>
            A customer who cannot reach you rarely waits. A dedicated hotline gives every call a professional path, even when one person is unavailable.
          </SectionHeading>

          <div className="border-y border-ink-200">
            <p className="py-5 text-xs font-medium uppercase tracking-[0.14em] text-ink-500">Without a business hotline</p>
            {missedCallSequence.map(([step, title, description]) => (
              <div key={step} className="grid grid-cols-[40px_1fr] gap-4 border-t border-ink-100 py-5">
                <span className="pt-0.5 text-sm font-medium text-ink-400">{step}</span>
                <div>
                  <h3 className="text-base font-semibold text-ink-900">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink-600">{description}</p>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-[40px_1fr] gap-4 border-t border-brand-200 py-6">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-500" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-brand-700">With NativeTalk</p>
                <h3 className="mt-2 text-lg font-semibold text-ink-900">Every call has a clear next step.</h3>
                <p className="mt-1 text-sm leading-6 text-ink-600">Routing, overflow, and voicemail keep the conversation moving.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid border-y border-ink-200 sm:grid-cols-3 sm:divide-x sm:divide-ink-200">
          {[
            ["1", "memorable number for your business"],
            ["0", "personal numbers shared with customers"],
            ["24/7", "structured handling after hours"],
          ].map(([value, label]) => (
            <div key={value} className="flex items-baseline gap-4 border-b border-ink-100 py-6 last:border-b-0 sm:block sm:border-b-0 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <p className="min-w-14 text-3xl font-semibold text-brand-600">{value}</p>
              <p className="mt-2 text-sm leading-6 text-ink-600">{label}</p>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="bg-[#f8faf7] px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Everything included" title="One hotline. A complete call system.">
          Every feature a growing team needs to run calls like an enterprise, without buying an enterprise phone system.
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.title} className="group rounded-lg border border-ink-100 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-nativeBlue-50 text-nativeBlue-600 ring-1 ring-nativeBlue-100 transition group-hover:bg-brand-500 group-hover:text-white">
                <feature.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold">{feature.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-ink-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallFlow() {
  return (
    <section className="relative bg-ink-950 px-6 py-20 text-white md:px-8 md:py-28">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading eyebrow="How a call moves" title="One number in. The right team, every time." inverted>
          Watch a customer call enter your hotline, pass through the IVR, and land exactly where it should.
        </SectionHeading>
        <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <svg className="min-w-[860px]" viewBox="0 0 900 320" fill="none" aria-label="Call routing diagram">
            {callFlowPaths.map(({ d }) => (
              <path key={`line-${d}`} className="flow-line" d={d} />
            ))}
            {callFlowPaths.map(({ d, delay }) => (
              <path key={`pulse-${d}`} className="flow-pulse" d={d} style={{ animationDelay: `${delay}s` }} />
            ))}
            <FlowCircle x={70} y={160} label="Call" sub="Customer dials" delay={0} />
            <FlowRect x={342} y={126} width={80} label="IVR" sub="Press 1-4" delay={0.75} />
            <FlowRect x={660} y={34} label="Sales" sub="2 team members" delay={1.55} />
            <FlowRect x={660} y={104} label="Support" sub="3 team members" delay={2.25} />
            <FlowRect x={660} y={174} label="Billing" sub="1 team member" delay={2.95} />
            <FlowRect x={660} y={244} label="Reception" sub="Overflow route" delay={3.65} />
            <g aria-hidden="true">
              {callFlowPaths.map(({ d, delay }) => (
                <circle key={`traveler-${d}`} className="flow-traveler" r="5">
                  <animateMotion path={d} dur="4.2s" begin={`${delay}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

function FlowCircle({ x, y, label, sub, delay = 0 }: { x: number; y: number; label: string; sub: string; delay?: number }) {
  return (
    <>
      <circle className="flow-node flow-node-animated" cx={x} cy={y} r="34" style={{ animationDelay: `${delay}s` }} />
      <text className="flow-label" x={x} y={y + 5} textAnchor="middle">
        {label}
      </text>
      <text className="flow-sub" x={x} y={y + 52} textAnchor="middle">
        {sub}
      </text>
    </>
  );
}

function FlowRect({ x, y, width = 150, label, sub, delay = 0 }: { x: number; y: number; width?: number; label: string; sub: string; delay?: number }) {
  return (
    <>
      <rect className="flow-node flow-node-animated" x={x} y={y} width={width} height="52" rx="12" style={{ animationDelay: `${delay}s` }} />
      <text className="flow-label" x={x + width / 2} y={y + 22} textAnchor="middle">
        {label}
      </text>
      <text className="flow-sub" x={x + width / 2} y={y + 39} textAnchor="middle">
        {sub}
      </text>
    </>
  );
}

function Audio() {
  const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  const togglePreview = (index: number, script: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    if (playingIndex === index) {
      setPlayingIndex(null);
      return;
    }

    const preview = new SpeechSynthesisUtterance(script);
    const voices = window.speechSynthesis.getVoices();
    preview.voice =
      voices.find((voice) => voice.lang === "en-GB") ??
      voices.find((voice) => voice.lang.startsWith("en")) ??
      null;
    preview.rate = 0.92;
    preview.pitch = 1;
    preview.onend = () => setPlayingIndex(null);
    preview.onerror = () => setPlayingIndex(null);

    setPlayingIndex(index);
    window.speechSynthesis.speak(preview);
  };

  return (
    <section id="audio" className="bg-white px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid items-end gap-6 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <div>
            <Eyebrow>The sound of your business</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight text-ink-950 md:text-4xl">Hear every customer touchpoint before it goes live.</h2>
          </div>
          <p className="max-w-xl text-base font-medium leading-8 text-ink-600">
            Preview greetings, menus, hold messages, and announcements designed to make every call sound clear and professional.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-ink-200 bg-white">
          <div className="hidden grid-cols-[52px_minmax(170px,0.8fr)_minmax(240px,1.4fr)_90px] gap-4 border-b border-ink-200 bg-[#f8faf7] px-6 py-3 text-xs font-medium uppercase tracking-[0.12em] text-ink-500 md:grid">
            <span />
            <span>Audio touchpoint</span>
            <span className="ml-4">Preview waveform</span>
            <span className="text-right">Status</span>
          </div>
          {audioItems.map(({ title, sub, script }, index) => {
            const isPlaying = playingIndex === index;

            return (
            <article
              key={title}
              className={`grid grid-cols-[52px_1fr] items-center gap-x-4 gap-y-4 px-5 py-5 transition-colors md:grid-cols-[52px_minmax(170px,0.8fr)_minmax(240px,1.4fr)_90px] md:px-6 ${
                index > 0 ? "border-t border-ink-100" : ""
              } ${isPlaying ? "bg-brand-50/70" : "hover:bg-ink-50/70"}`}
            >
                <button
                  type="button"
                  onClick={() => togglePreview(index, script)}
                  aria-label={`${isPlaying ? "Stop" : "Play"} ${title} preview`}
                  aria-pressed={isPlaying}
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                    isPlaying ? "bg-brand-500 hover:bg-brand-600" : "bg-ink-900 hover:bg-nativeBlue-600"
                  }`}
                >
                  {isPlaying ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="ml-0.5 h-5 w-5" fill="currentColor" />}
                </button>

              <div>
                <h3 className="text-base font-semibold text-ink-900">{title}</h3>
                <p className="mt-1 text-sm text-ink-500">{sub}</p>
              </div>

              <div className="col-span-2 flex h-10 items-end gap-1 md:col-span-1 md:ml-4">
                {Array.from({ length: 32 }).map((_, bar) => (
                  <span
                    key={bar}
                    className={`audio-wave-bar min-w-0 flex-1 rounded-full ${isPlaying ? "is-playing bg-brand-500" : "bg-ink-300"}`}
                    style={{
                      height: `${7 + Math.abs(Math.sin(bar * 0.51 + index)) * 27}px`,
                      animationDelay: `-${bar * 37}ms`,
                      animationDuration: `${520 + (bar % 5) * 85}ms`,
                    }}
                  />
                ))}
              </div>

              <span className={`hidden text-right text-xs font-medium uppercase tracking-[0.12em] md:block ${isPlaying ? "text-brand-700" : "text-ink-400"}`}>
                {isPlaying ? "Playing" : "Ready"}
              </span>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Onboarding() {
  return (
    <section className="bg-[#f8faf7] px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Getting started" title="Live in three steps.">
          No hardware, technical team, or long procurement process required.
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["1", "Choose your number", "Browse the available pool and reserve a number that is easy for customers to remember."],
            ["2", "Complete purchase", "Pick a plan, complete payment, and your number is reserved to your business immediately."],
            ["3", "Go live", "Submit team, routing, and greeting preferences. Your hotline is activated within one business day."],
          ].map(([step, title, body]) => (
            <article key={step} className="rounded-lg border border-ink-100 bg-white p-8">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-brand-500 text-lg font-extrabold text-white">{step}</span>
              <h3 className="mt-8 text-xl font-extrabold">{title}</h3>
              <p className="mt-3 font-semibold leading-7 text-ink-600">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-white px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Simple pricing" title="A plan for every team size.">
          Start solo, add routing as your team grows, and scale to multiple branches when you are ready.
        </SectionHeading>
        <div className="grid gap-5 lg:grid-cols-3">
          <PriceCard
            tier="Starter"
            price="₦5,000"
            suffix="/ month"
            fit="Solo founders and teams of 2-3"
            features={["1 hotline number", "Caller greeting and basic IVR", "Business-hours routing", "Voicemail"]}
          />
          <PriceCard
            featured
            tier="Team"
            price="Per member"
            suffix="/ month"
            fit="Teams of 4-10 needing routing"
            features={["Everything in Starter", "Department routing", "Sequential and simultaneous ringing", "Overflow forwarding"]}
          />
          <PriceCard
            tier="Multi-Branch"
            price="Custom"
            fit="Teams of 10-20+, multiple locations"
            features={["Everything in Team", "Multiple hotlines and branches", "Priority routing and call queue", "Dedicated configuration support"]}
          />
        </div>
      </div>
    </section>
  );
}

function AppDownload() {
  return (
    <section className="relative overflow-hidden border-y border-ink-100 bg-[#f8faf7] px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.72fr]">
        <div className="relative z-10">
          <Eyebrow>NativeTalk App</Eyebrow>
          <h2 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.12] text-ink-950 md:text-5xl">
            Not ready to activate your <span className="text-brand-600">Hotline</span> yet?
          </h2>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-ink-700 md:text-xl">
            Download the NativeTalk App and manage all your <strong className="font-extrabold text-ink-950">WhatsApp</strong>,{" "}
            <strong className="font-extrabold text-ink-950">Instagram</strong>, <strong className="font-extrabold text-ink-950">Facebook</strong>, and other messages in one place for free.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <StoreBadge store="Google Play" eyebrow="GET IT ON" />
            <StoreBadge store="App Store" eyebrow="Download on the" />
          </div>
        </div>
        <div className="relative z-10 flex justify-center lg:justify-end">
          <img
            src={appDownloadImageUrl}
            alt="NativeTalk app channel connection preview"
            className="relative w-full max-w-[520px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}

function StoreBadge({ store, eyebrow }: { store: string; eyebrow: string }) {
  return (
    <a
      href="#"
      className="inline-flex h-16 min-w-56 items-center justify-center rounded-lg bg-ink-900 px-6 text-center text-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:bg-ink-950"
      aria-label={`${eyebrow} ${store}`}
    >
      <span className="flex flex-col leading-none">
        <span className="text-xs font-extrabold uppercase tracking-wide">{eyebrow}</span>
        <span className="mt-1 text-xl font-extrabold">{store}</span>
      </span>
    </a>
  );
}

function PriceCard({
  tier,
  price,
  suffix,
  fit,
  features: items,
  featured = false,
}: {
  tier: string;
  price: string;
  suffix?: string;
  fit: string;
  features: string[];
  featured?: boolean;
}) {
  return (
    <article className={`relative rounded-lg border p-8 shadow-card ${featured ? "border-brand-500 bg-ink-950 text-white" : "border-ink-100 bg-white"}`}>
      {featured && <span className="absolute right-6 top-6 rounded-full bg-brand-500 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-white">Popular</span>}
      <h3 className={`text-lg font-extrabold ${featured ? "text-brand-300" : "text-brand-700"}`}>{tier}</h3>
      <p className="mt-5 text-3xl font-extrabold">
        {price} {suffix && <span className={`text-base font-bold ${featured ? "text-white/55" : "text-ink-500"}`}>{suffix}</span>}
      </p>
      <p className={`mt-3 font-semibold ${featured ? "text-white/65" : "text-ink-600"}`}>{fit}</p>
      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm font-bold">
            <Check className={`h-5 w-5 ${featured ? "text-brand-400" : "text-brand-600"}`} />
            {item}
          </li>
        ))}
      </ul>
      <a className={featured ? "btn-light mt-8 w-full" : "btn-secondary mt-8 w-full"} href="/choose-number">
        Get started
      </a>
    </article>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink-950 px-6 py-20 text-white md:px-8 md:py-28">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <Eyebrow inverted>One platform, every call</Eyebrow>
        <h2 className="mt-6 text-3xl font-extrabold leading-tight md:text-4xl">One business. One hotline. Unlimited professional conversations.</h2>
        <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/65">
          Every call, branch, and team member routed through one number your customers will remember.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a className="btn-light" href="/choose-number">
            Get your business hotline
          </a>
          <a className="btn-dark" href="/choose-number">
            Choose your number
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink-950 px-6 py-8 text-white md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-8 text-sm font-semibold text-white/55 md:flex-row md:items-center md:justify-between">
        <span className="flex items-center gap-3 text-white">
          <img src={logoUrl} alt="NativeTalk" className="h-8 w-auto max-w-[160px] brightness-0 invert" />
          Business Hotline
        </span>
        <p>© 2026 NativeTalk. Built for teams that mean business.</p>
      </div>
    </footer>
  );
}

function SectionHeading({
  eyebrow,
  title,
  children,
  centered = true,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  centered?: boolean;
  inverted?: boolean;
}) {
  return (
    <div className={`mb-14 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>
      <h2 className={`mt-5 text-3xl font-extrabold leading-tight md:text-4xl ${inverted ? "text-white" : "text-ink-950"}`}>{title}</h2>
      <p className={`mt-4 text-base font-medium leading-8 ${inverted ? "text-white/65" : "text-ink-600"}`}>{children}</p>
    </div>
  );
}

function Eyebrow({ children, inverted = false }: { children: React.ReactNode; inverted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] ${
        inverted ? "border-white/10 bg-white/[0.07] text-brand-300" : "border-brand-200 bg-brand-50 text-brand-700"
      }`}
    >
      <span className="h-2 w-2 rounded-full bg-brand-500 ring-4 ring-brand-500/20" />
      {children}
    </span>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
