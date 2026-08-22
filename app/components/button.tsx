import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "compact";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  size?: ButtonSize;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  variant?: ButtonVariant;
}

export function Button({
  children,
  className,
  disabled,
  href,
  rel,
  size = "default",
  target,
  type = "button",
  variant = "primary",
  ...buttonProps
}: ButtonProps) {
  const classes = [buttonBaseClasses, buttonSizeClasses[size], buttonVariantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  if (href && !disabled) {
    return (
      <a className={classes} href={href} rel={rel} target={target}>
        {children}
      </a>
    );
  }

  return (
    <button {...buttonProps} className={classes} disabled={disabled} type={type}>
      {children}
    </button>
  );
}

const buttonBaseClasses =
  "inline-flex appearance-none items-center justify-center border-0 text-center font-medium leading-[1.2] no-underline cursor-pointer transition-[background-color,box-shadow,color] duration-150 hover:shadow-[0_8px_18px_rgb(57_13_103/18%)] active:shadow-[0_2px_6px_rgb(57_13_103/16%)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-brand-text disabled:cursor-not-allowed disabled:opacity-[0.55] disabled:shadow-none";

const buttonSizeClasses = {
  default: "min-h-[72px] w-full rounded-full px-8 py-4 text-[clamp(20px,2vw,28px)]",
  compact: "min-h-11 w-auto min-w-32 rounded-2xl px-[22px] py-2 text-lg",
} as const;

const buttonVariantClasses = {
  primary:
    "rounded-full bg-brand-button text-white hover:bg-brand-button-hover active:bg-brand-button-active",
  secondary:
    "rounded-2xl bg-brand-secondary text-brand-button hover:bg-brand-secondary-hover active:bg-brand-secondary-active",
} as const;
