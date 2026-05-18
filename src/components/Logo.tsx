type LogoProps = {
  size?: number;
  className?: string;
};

export function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="28" height="28" rx="7" fill="var(--color-accent)" />
      <path
        d="M11 6.5 L7 21.5 M19 6.5 L15 21.5"
        stroke="var(--color-accent-fg)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span>
      orunov<span className="text-[var(--color-accent)]">.</span>studio
    </span>
  );
}
