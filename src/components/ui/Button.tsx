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

// ALTERAÇÃO AQUI: Mudado de font-bold para font-semibold
const baseStyles =
  "group inline-flex items-center justify-center font-sans font-semibold rounded-full border-2 border-transparent active:scale-95 transition-all duration-300";

const variants: Record<Variant, string> = {
  // Primary: Vidro estável (sem mudança de cor no hover)
  primary: 
    "bg-ice-grey/60 text-slate-deep " +
    "backdrop-blur-md " +                 
    "border border-white/40 " +           
    "shadow-[inset_0_0_15px_rgba(255,255,255,0.4)]", 

  // Secondary: Sólido estável
  secondary: "bg-slate-deep text-ice-light shadow-md",
  
  // Outline: Borda estável
  outline: "border-2 border-lobster-red text-lobster-red",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2 text-sm",
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
  const [organicStyle, setOrganicStyle] = useState<{ transitionDuration: string; transitionTimingFunction: string }>({
    transitionDuration: "400ms",
    transitionTimingFunction: "ease-out"
  });

  const handleMouseEnter = () => {
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