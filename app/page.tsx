import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Radar,
  Cpu,
  Wrench,
  Antenna,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const groundSpeed = products.find((p) => p.id === "zlytgss01")!;
const sportsRadar = products.find((p) => p.id === "zlyspt01")!;

const heroStats = [
  { value: "24 GHz", label: "K-band Doppler" },
  { value: "0.1 m/s", label: "Minimum speed" },
  { value: "320 km/h", label: "Maximum speed" },
  { value: "OEM", label: "Custom engineering" },
];

const features = [
  {
    icon: Radar,
    title: "True Doppler Precision",
    description:
      "Non-contact velocity measurement straight off the ground or the ball — no wheel slip, no drift, no wear.",
  },
  {
    icon: Wrench,
    title: "Custom Engineering",
    description:
      "Firmware, detection profiles, housings, and antennas adapted to your platform by our engineers.",
  },
  {
    icon: Cpu,
    title: "OEM Interfaces",
    description:
      "Pulse, CAN, RS-485, UART, and SPI out of the box — or your proprietary protocol on request.",
  },
  {
    icon: ShieldCheck,
    title: "Built for the Field",
    description:
      "IP67-rated designs qualified for locomotive bogies, tractor chassis, and consumer sports devices.",
  },
  {
    icon: Antenna,
    title: "Tailored Beam Patterns",
    description:
      "Antenna design matched to your detection geometry, from narrow rail beams to wide sports fields.",
  },
  {
    icon: Truck,
    title: "North America Shipping",
    description:
      "UPS, FedEx, and USPS across the US, Canada, and Mexico — free ground shipping over $1,000.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Tell us your application",
    description:
      "Share your platform, mounting constraints, and what you need to measure — rail, field, or fairway.",
  },
  {
    step: "02",
    title: "Choose your platform",
    description:
      "Start from the ground speed sensor or the sports tracking radar. Both are proven, in-stock baselines.",
  },
  {
    step: "03",
    title: "Custom adaptation",
    description:
      "Our engineers tune firmware, interfaces, and mechanics to your spec and deliver prototypes for validation.",
  },
  {
    step: "04",
    title: "Production & delivery",
    description:
      "Serial production with full test reports, shipped across North America with real-time tracking.",
  },
];

const productSections = [
  {
    product: groundSpeed,
    industry: "Rail & Agriculture",
    headline: "True ground speed, no contact, no slip.",
    copy: "Wheel sensors lie when wheels slip. Our Doppler radar reads velocity directly off the ground, so locomotives get reliable wheel-slip protection and odometry, and agricultural machinery doses seed and spray at the true working speed.",
    points: [
      "Locomotive wheel-slip / slide protection",
      "Rail odometry and track maintenance vehicles",
      "Seeding, spraying, and harvesting rate control",
    ],
  },
  {
    product: sportsRadar,
    industry: "Sports Electronics",
    headline: "Ball, club, and bat \u2014 tracked by one module.",
    copy: "A single compact radar that captures golf ball speed, launch, and club head speed through impact \u2014 or pitch velocity, exit velocity, and bat speed on the diamond. Built to integrate into launch monitors, pitching machines, and swing analyzers.",
    points: [
      "Golf launch monitors and simulators",
      "Baseball pitch and exit velocity tracking",
      "SDK and reference designs included",
    ],
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="px-6 pb-20 pt-24 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            24 GHz Doppler radar, built to order
          </p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 md:text-6xl">
            Radar sensors,
            <br />
            engineered for precision.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
            True ground speed sensing for rail and agriculture, and ball &amp;
            swing tracking for sports electronics &mdash; with full custom
            engineering support.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              View Products
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
            >
              Talk to an Engineer
            </Link>
          </div>

          <p className="mt-8 text-sm text-slate-400">
            CE Certified &middot; FCC Compliant &middot; 2-Year Warranty
          </p>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-slate-200 px-6 md:grid-cols-4 md:divide-x">
          {heroStats.map((stat) => (
            <div key={stat.label} className="py-8 text-center">
              <div className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-slate-500 md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Everything you need to sense speed
          </h2>
          <p className="mt-4 text-slate-500">
            Two proven radar platforms and an engineering team that adapts them
            to your product, so you can focus on what you build around them.
          </p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-xl border border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-b border-slate-200 p-8 transition-colors last:border-b-0 hover:bg-slate-50 sm:[&:nth-last-child(-n+1)]:border-b-0 sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <feature.icon size={22} className="text-slate-900" strokeWidth={1.75} />
              <h3 className="mt-4 text-sm font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Two platforms, built to be adapted
            </h2>
            <p className="mt-4 text-slate-500">
              Both sensors ship as standard products and serve as starting
              points for custom OEM variants.
            </p>
          </div>

          <div className="mt-14 space-y-16">
            {productSections.map((section, i) => (
              <div
                key={section.product.id}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {section.industry}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    {section.headline}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-500">{section.copy}</p>
                  <ul className="mt-6 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/product/${section.product.id}`}
                    className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 transition-colors hover:text-slate-600"
                  >
                    View {section.product.model} <ArrowUpRight size={15} />
                  </Link>
                </div>
                <div
                  className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${
                    i % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <ProductCard product={section.product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            From application to production in four steps
          </h2>
          <p className="mt-4 text-slate-500">
            A streamlined path from your first inquiry to sensors on your
            production line.
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.step}>
              <span className="text-sm font-semibold text-slate-300">{step.step}</span>
              <h3 className="mt-3 text-sm font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.description}</p>
            </div>
          ))}
        </div>

        <Link
          href="/contact"
          className="mt-12 inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 transition-colors hover:text-slate-600"
        >
          Learn more about our process <ArrowRight size={15} />
        </Link>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Need the sensor adapted to your platform?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-500">
            Tell us about your application &mdash; our engineers design custom
            variants, firmware, and integrations free of obligation.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
            >
              Contact Engineering
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
            >
              View Products
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-400">
            No setup fees &middot; No minimum order &middot; Free design review
          </p>
        </div>
      </section>
    </div>
  );
}
