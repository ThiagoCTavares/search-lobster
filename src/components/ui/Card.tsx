import type { ReactNode } from "react";

type CardProps = {
  className?: string; // Para adicionar classes extras se precisar (ex: margin)
  children: ReactNode; // O conteúdo do card
};

export default function Card({ className = "", children }: CardProps) {
  // A MÁGICA DO VIDRO
  const glassStyles = [
    "relative group overflow-hidden", // Base
    "rounded-[2rem]", // Cantos muito arredondados

    // --- O EFEITO DE COR ---
    // Estado Normal: Azulado transparente (Ice Mute 20%)
    "bg-ice-mute/20", 
    
    // Estado Hover: Vira SÓLIDO na cor Ice Light
    // Substituído de 'hover:bg-white/40' para 'hover:bg-ice-light'
    "hover:bg-ice-light", 

    // --- ACABAMENTO ---
    "backdrop-blur-md", // Desfoque
    "border-2 border-white/40", // Borda de vidro
    
    // Volume 3D (Mantido para dar profundidade mesmo quando sólido)
    "shadow-[inset_0_0_40px_rgba(255,255,255,0.25)]",
    "shadow-xl shadow-ice-mute/10",

    // Transição suave da transparência para o sólido
    "transition-all duration-500",
  ].join(" ");

  return (
    <div className={`${glassStyles} ${className}`}>
      {/* Overlay de brilho (Mantido, pois ajuda a destacar o card sólido) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none mix-blend-overlay"></div>
      
      {/* O Conteúdo do Card */}
      <div className="relative z-10 p-8 h-full">
        {children}
      </div>
    </div>
  );
}