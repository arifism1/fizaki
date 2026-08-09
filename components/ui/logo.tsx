export interface LogoProps {
  variant?: "mark" | "icon" | "horizontal" | "wordmark" | "app-icon";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  alt?: string;
}

const SIZES = {
  sm: { mark: 24, icon: 32, horizontal: 120, wordmark: 160, "app-icon": 64 },
  md: { mark: 32, icon: 48, horizontal: 180, wordmark: 240, "app-icon": 96 },
  lg: { mark: 48, icon: 64, horizontal: 240, wordmark: 320, "app-icon": 128 },
  xl: { mark: 64, icon: 80, horizontal: 320, wordmark: 400, "app-icon": 192 },
};

const ASPECT_RATIOS = {
  mark: 1,
  icon: 1,
  horizontal: 240 / 64,
  wordmark: 320 / 80,
  "app-icon": 1,
};

export function Logo({
  variant = "mark",
  size = "md",
  className = "",
  alt = "fizaki logo",
}: LogoProps) {
  const width = SIZES[size][variant];
  const height = Math.round(width / ASPECT_RATIOS[variant]);

  return (
    <img
      src={`/logos/logo-${variant === "mark" ? "mark" : variant}.svg`}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

export function LogoMark({ size = "md", className = "" }: Omit<LogoProps, "variant">) {
  return <Logo variant="mark" size={size} className={className} />;
}

export function LogoHorizontal({ size = "md", className = "" }: Omit<LogoProps, "variant">) {
  return <Logo variant="horizontal" size={size} className={className} />;
}

export function LogoWordmark({ size = "md", className = "" }: Omit<LogoProps, "variant">) {
  return <Logo variant="wordmark" size={size} className={className} />;
}

export function LogoAppIcon({ size = "md", className = "" }: Omit<LogoProps, "variant">) {
  return <Logo variant="app-icon" size={size} className={className} />;
}
