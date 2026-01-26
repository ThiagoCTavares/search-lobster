import { useState, type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };
type ButtonAsLink = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };
type Props = ButtonAsButton | ButtonAsLink;

// Seta SVG
const ArrowIcon = () => (
  <svg 
    aria-hidden="true"
    focusable="false"
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const baseStyles =
  "group inline-flex items-center justify-center font-sans font-semibold rounded-full border-2 border-transparent active:scale-95";

const variants: Record<Variant, string> = {
  primary: 
    "bg-ice-grey/40 text-slate-mid " +    // Base translúcida
    "backdrop-blur-md " +                 // Efeito Vidro
    "border border-white/30 " +           // Borda sutil
    "shadow-[inset_0_0_15px_rgba(255,255,255,0.3)] ", // Brilho interno 3D
    // SEM HOVER DE COR: Ele mantém a aparência de vidro, apenas muda a forma

  secondary: "bg-slate-deep text-ice-light hover:bg-lobster-red hover:text-white shadow-md",
  outline: "border-2 border-lobster-red text-lobster-red hover:bg-lobster-red hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-8 py-3 text-base",
  lg: "px-12 py-4 text-lg tracking-wide",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Props) {
  // Estado para a física aleatória
  const [organicStyle, setOrganicStyle] = useState<{ transitionDuration: string; transitionTimingFunction: string }>({
    transitionDuration: "400ms",
    transitionTimingFunction: "ease-out"
  });

  const handleMouseEnter = () => {
    // Sorteia duração e elasticidade a cada hover para parecer orgânico
    const randomDuration = 400 + Math.random() * 400; 
    const curve = `cubic-bezier(0.34, 1.56, 0.64, 1)`;

    setOrganicStyle({
      transitionDuration: `${randomDuration}ms`,
      transitionTimingFunction: curve,
    });
  };

  const classes = [baseStyles, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");

  const innerContent = (
    <>
      <span className="relative z-10">{children}</span>
      
      {/* A Seta que surge empurrando a largura */}
      <span 
        className="overflow-hidden max-w-0 opacity-0 group-hover:max-w-[20px] group-hover:opacity-100 group-hover:ml-3"
        style={{
          transitionProperty: "all",
          transitionDuration: organicStyle.transitionDuration,
          transitionTimingFunction: organicStyle.transitionTimingFunction,
        }}
      >
        <ArrowIcon />
      </span>
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={classes} 
        onMouseEnter={handleMouseEnter}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button 
      className={classes} 
      onMouseEnter={handleMouseEnter}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {innerContent}
    </button>
  );
}
