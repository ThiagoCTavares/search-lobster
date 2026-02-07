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
            <h2 className="font-title text-3xl md:text-4xl font-bold text-slate-deep mb-2">
              Refinamento Visual (V1.2) 🦞
            </h2>
            <p className="font-sans text-slate-deep/80 text-sm">
              Atualização baseada no feedback de direção.
            </p>
          </div>

        {/* Conteúdo */}
        <div className="space-y-6 font-sans text-slate-deep leading-relaxed text-base md:text-lg">
          <p>
            Luca e Leo, aplicamos um polimento visual na estrutura. O objetivo desta rodada foi melhorar a legibilidade e compactar a experiência de navegação, conforme os feedbacks da última reunião.
          </p>
          
          <p>Abaixo, o detalhamento das 4 mudanças executadas:</p>

          <ul className="space-y-6 list-none pl-0">
            <li className="space-y-2">
              <strong className="text-slate-deep font-title text-xl block">1. Contraste de Alta Definição</strong>
              <p className="text-[14px] text-slate-deep leading-relaxed">
                Recalibramos toda a tipografia para um tom mais escuro (#3E4747). Os botões também tiveram seu tom mais escurecido.
              </p>
              <ul className="list-disc list-inside space-y-2 text-[14px] text-slate-deep leading-relaxed pl-4">
                <li>O texto agora tem leitura sólida e instantânea.</li>
                <li>Os botões ganharam presença física.</li>
              </ul>
            </li>

            <li className="space-y-2">
              <strong className="text-slate-deep font-title text-xl block">2. Hero: Arquitetura Centralizada</strong>
              <p className="text-[14px] text-slate-deep leading-relaxed">
                Abandonamos o alinhamento à esquerda. A seção principal agora adota uma postura de Manifesto Central.
              </p>
              <ul className="list-disc list-inside space-y-2 text-[14px] text-slate-deep leading-relaxed pl-4">
                <li>Eliminamos a sensação de "vazio" no lado direito da tela.</li>
                <li>O título cria um eixo de simetria que passa estabilidade e confiança imediata.</li>
              </ul>
            </li>

            <li className="space-y-2">
              <strong className="text-slate-deep font-title text-xl block">3. Ritmo Visual Compacto</strong>
              <p className="text-[14px] text-slate-deep leading-relaxed">
                Resolvemos o "efeito sanfona". Reduzimos drasticamente os espaçamentos entre as seções (padronizado para 64px).
              </p>
              <p className="text-[14px] text-slate-deep leading-relaxed pl-4">
                O site agora flui com uma cadência dinâmica, mantendo o usuário engajado na narrativa sem pausas longas ou buracos vazios na rolagem.
              </p>
            </li>

            <li className="space-y-2">
              <strong className="text-slate-deep font-title text-xl block">4. Imersão Atmosférica</strong>
              <p className="text-[14px] text-slate-deep leading-relaxed">
                Aumentamos a opacidade e a definição das membranas do fundo.
              </p>
              <p className="text-[14px] text-slate-deep leading-relaxed pl-4">
                As formas orgânicas do "fundo do mar" agora se tornaram elementos mais presentes, garantindo a profundidade visual mesmo em monitores com brilho alto.
              </p>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-white/40">
            <p className="font-bold text-slate-deep">
              O site está mais sólido, legível e direto ao ponto.
            </p>
            <p className="text-slate-deep text-sm mt-1">
              Atenciosamente,<br/>
              Thiago - COBRA® Visual and Audio Works
            </p>
          </div>
        </div>

        {/* Botão de Ação */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setIsVisible(false)}
            className="group relative px-8 py-4 bg-ice-grey/40 text-slate-deep font-title font-bold text-lg rounded-full border border-white/30 backdrop-blur-md shadow-[inset_0_0_15px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
          >
            <span>Ver Nova Versão</span>
          </button>
        </div>

      </div>
    </div>
  );
}