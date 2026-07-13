type LogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
};

const SIZES = {
  sm: { h: 40, w: 60 },
  md: { h: 56, w: 84 },
  lg: { h: 180, w: 270 },
};


export function Logo({ size = "md", showText = true }: LogoProps) {
  const { h, w } = SIZES[size];

  const srcLight = showText ? "/verykit-marca.svg" : "/verykit-icon.svg";
  const srcDark = showText ? "/verykit-marca-dark.svg" : "/verykit-icon-dark.svg";

  return (
    <span className="inline-flex items-center gap-1" aria-label="VeryKit">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={srcLight}
        alt="VeryKit"
        width={w}
        height={h}
        className="block dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={srcDark}
        alt="VeryKit"
        width={w}
        height={h}
        className="hidden dark:block"
      />
      <span className="sr-only">VeryKit</span>
    </span>
  );
}

