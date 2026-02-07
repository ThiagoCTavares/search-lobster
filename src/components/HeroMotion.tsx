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
        className="reveal relative isolate overflow-hidden bg-transparent min-h-[90vh] flex flex-col items-center justify-center pt-32"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
          
          <m.div variants={container} className="flex flex-col items-center text-center mx-auto max-w-6xl space-y-10">
            
            <m.h1 variants={item} className="font-title leading-tight text-slate-deep">
              {/* Linha 1 */}
              <span className="block hero-heading-line hero-heading-bold hero-heading-primary mb-2">
                Presença Digital Orgânica
              </span>
              
              {/* Linha 2: Ajustada conforme pedido */}
              <span className="block hero-heading-line text-2xl md:text-4xl font-normal">
                o <span className="font-bold">SEO</span> que realmente acontece
              </span>
            </m.h1>

            {/* Parágrafo: Quebra de linha forçada */}
            <m.p variants={item} className="font-sans font-light text-lg md:text-xl text-slate-deep max-w-4xl leading-relaxed">
              Construa uma autoridade sólida e <strong className="font-bold">duradoura</strong> para a sua marca nas pesquisas,
              <span className="block md:mt-1">sem promessas vazias.</span>
            </m.p>

            <m.div variants={item} className="pt-6">
              <Button href="#publico" size="lg">
                Descubra por que seu site não é visto
              </Button>
            </m.div>

          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
}