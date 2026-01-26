import { useState, useEffect } from "react";

export default function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  // Efeito para remover do DOM após a animação de saída
  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => setShouldRender(false), 700); // Espera a animação acabar
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!shouldRender) return;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onWheel={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
    >
      {/* Background Suave alinhado ao glassmorphism */}
      <div className="absolute inset-0 bg-ice-mute/40 backdrop-blur-xl transition-all duration-700 pointer-events-none"></div>

      {/* A Carta */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain touch-pan-y pointer-events-auto rounded-[2rem] bg-ice-mute/30 backdrop-blur-md border-2 border-white/40 shadow-[inset_0_0_40px_rgba(255,255,255,0.25)] shadow-xl shadow-ice-mute/20 p-8 md:p-12 scrollbar-hide">
        
        {/* Cabeçalho */}
          <div className="mb-8 border-b border-white/40 pb-6">
            <h2 className="font-title text-3xl md:text-4xl font-bold text-slate-mid mb-2">
              Olá, Luca e Leo! 🦞
            </h2>
          </div>

        {/* Conteúdo */}
        <div className="space-y-6 font-sans text-slate-mid leading-relaxed text-base md:text-lg">
          <p>
            Estamos finalizando a <strong>V1 do site da Search Lobster</strong>. O objetivo desta fase foi construir a estrutura fundamental da marca: uma fusão entre estética orgânica e engenharia de alta performance.
          </p>
          
          <p>Abaixo, um resumo do que foi entregue "sob o capô":</p>

          <ul className="space-y-6 list-none pl-0">
            <li className="space-y-2">
              <strong className="text-slate-mid font-title text-xl block">1. Identidade Visual</strong>
              <p className="text-[14px] text-slate-mid leading-relaxed">
                Fugimos do padrão genérico de agências. Criamos um ambiente imersivo que respira:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[14px] text-slate-mid leading-relaxed pl-4">
                <li>
                  <strong>Fundo Orgânico:</strong> Uma simulação de vida marinha abstrata que roda suavemente ao fundo, sem distrair a leitura.
                </li>
                <li>
                  <strong>Glassmorphism:</strong> Cards e Navbars feitos de "vidro fosco", usando desfoques em tempo real para criar profundidade e hierarquia.
                </li>
                <li>
                  <strong>Paleta Exclusiva:</strong> TODAS as cores utilizadas seguem meticulosamente a paleta cromática definida previamente em nossas reuniões de definição de ID visual da marca.
                </li>
              </ul>
              <span className="text-sm bg-ice-mute/50 p-3 rounded-lg block mt-4 border border-white/40 text-slate-mid">
                <strong>Obs.:</strong> Ao longo do desenvolvimento do site, foi necessária a criação de um novo tom de cinza azulado, que fugia da paleta de cores original. Mudanças de cores e exclusão/inclusão de novas é natural e saudável para nós nesse momento inicial. O mesmo vale para a tipografia. Identidade visual bem feita é muito mais sobre descobrir e ajustar, do que apenas pré-definir.
              </span>
            </li>

            <li className="space-y-2">
              <strong className="text-slate-mid font-title text-xl block">2. Engenharia de Performance</strong>
              <p className="text-[14px] text-slate-mid leading-relaxed">
                Beleza não adianta se o site for lento. Otimizamos o código para pontuação máxima:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[14px] text-slate-mid leading-relaxed">
                <li>
                  <strong>Scroll de "Rolls Royce":</strong> Implementamos uma tecnologia de inércia que torna a rolagem da página extremamente suave e sofisticada, eliminando "trancos".
                </li>
                <li>
                  <strong>Hidratação Inteligente:</strong> O site carrega o essencial instantaneamente e só injeta elementos interativos (como botões) milissegundos depois, garantindo velocidade máxima para o usuário e para o Google.
                </li>
                <li>
                  <strong>Fundo Otimizado (GPU):</strong> As animações do fundo usam aceleração de hardware, garantindo que o site rode liso até em celulares mais antigos ou laptops em modo de economia de energia.
                </li>
              </ul>
            </li>

            <li className="space-y-2">
              <strong className="text-slate-mid font-title text-xl block">3. Interatividade & UX</strong>
              <ul className="list-disc list-inside space-y-2 text-[14px] text-slate-mid leading-relaxed">
                <li>
                  <strong>Smart Navbar:</strong> O menu desaparece suavemente quando você desce (para focar no conteúdo) e reaparece instantaneamente ao subir (para facilitar a navegação).
                </li>
                <li>
                  <strong>Micro-interações:</strong> Cards reagem ao mouse, dando um feedback tátil de que o site está "vivo".
                </li>
              </ul>
            </li>

            <li className="space-y-2">
              <strong className="text-slate-mid font-title text-xl block">4. Preparado para SEO</strong>
              <p className="text-[14px] text-slate-mid leading-relaxed">
                Em casa de ferreiro, o espeto aqui é de ferro. O site já nasce com:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[14px] text-slate-mid leading-relaxed">
                <li>Estrutura semântica correta (H1, H2, H3).</li>
                <li>Acessibilidade (ARIA) para leitores de tela.</li>
                <li>Metadados Open Graph para compartilhamento profissional no LinkedIn e WhatsApp.</li>
              </ul>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-white/40">
            <p className="font-bold text-slate-mid">
              Por favor, anotem feedbacks e me enviem!
            </p>
            <p className="text-slate-mid text-sm mt-1">
              Atenciosamente,<br/>
              Thiago - COBRA® Visual and Audio Works
            </p>
          </div>
        </div>

        {/* Botão de Ação */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setIsVisible(false)}
            className="group relative px-8 py-4 bg-ice-grey/40 text-slate-mid font-title font-bold text-lg rounded-full border border-white/30 backdrop-blur-md shadow-[inset_0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
          >
            <span>Acessar Experiência V1</span>
          </button>
        </div>

      </div>
    </div>
  );
}
