import { LazyMotion, domAnimation, m } from "framer-motion";
import Button from "./ui/Button";

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function HeroMotion() {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="inicio"
        className="reveal relative isolate overflow-hidden bg-transparent"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-6 py-36 lg:py-52 relative z-10">
          <m.div variants={container} className="space-y-6 max-w-xl lg:max-w-3xl">
            <m.h1 variants={item} className="font-title leading-tight text-slate-mid">
              <span className="block hero-heading-line hero-heading-bold hero-heading-primary">Presença Digital</span>
              <span className="block hero-heading-line hero-heading-bold hero-heading-primary">Orgânica</span>
              <span className="block mt-4 hero-heading-line text-2xl md:text-3xl font-normal">
                e duradoura:
                <span className="font-title font-[700]"> O SEO</span>
              </span>
              <span className="block hero-heading-line text-2xl md:text-3xl font-normal">
                que <span className="font-title font-[700]">REALMENTE</span> acontece
              </span>
            </m.h1>
            <m.p variants={item} className="font-sans font-light text-base text-slate-mid">
              <span className="block">Construa uma autoridade sólida para a sua marca nas pesquisas,</span>
              <span className="block">sem promessas vazias.</span>
            </m.p>
            <m.div variants={item} className="flex flex-wrap gap-4">
              <Button href="#publico" size="md">
                Descubra por que seu site não é visto
              </Button>
            </m.div>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
