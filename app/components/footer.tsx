interface FooterLink {
  href: string;
  icon?: string;
  label: string;
}

interface FooterProps {
  links?: readonly FooterLink[];
  socialLinks?: readonly FooterLink[];
}

const defaultSocialLinks: readonly FooterLink[] = [
  { href: "#", icon: "/instagram.svg", label: "Instagram" },
  { href: "#", icon: "/linkedin.svg", label: "LinkedIn" },
  { href: "#", icon: "/discord.svg", label: "Discord" },
  { href: "#", icon: "/email.svg", label: "Email" },
];

export function Footer({ socialLinks = defaultSocialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialIconSize: Record<string, string> = {
    Email: "size-7.5",
    Instagram: "size-6",
  };

  return (
    <footer className="min-h-104 bg-[linear-gradient(180deg,rgba(249,246,255,0.2)_0%,#9bceee_44.37%,#a9a7eb_80.91%)] px-[clamp(28px,3.5vw,45px)] pt-[clamp(64px,11.5vw,149px)] pb-6 text-white">
      <div className="mx-auto max-w-296">
        <div className="flex items-center justify-between gap-16 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-10">
          <div className="relative h-31 w-92.75 text-brand-button max-[480px]:h-23.25 max-[480px]:w-69.5">
            <img
              alt=""
              className="pointer-events-none absolute -top-4.5 -left-10.75 h-39.25 w-47.5 object-contain max-[480px]:-top-1 max-[480px]:-left-6 max-[480px]:h-26.5 max-[480px]:w-32"
              src="/favicon.svg"
              width="190"
            />
            <div className="absolute top-0 left-31 max-[480px]:left-23.5">
              <p className="m-0 text-footer-logo font-semibold leading-none max-[480px]:text-footer-logo-mobile">
                WiCSM
              </p>
              <p className="mt-0.5 mb-0 ml-2.5 w-53 text-footer-tagline font-medium leading-normal max-[480px]:ml-2 max-[480px]:w-40 max-[480px]:text-footer-tagline-mobile">
                Women in Computer Science, Statistics and Mathematics UTSC
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 h-0.75 bg-[#674b91]/19" />

        <div className="mt-4 flex items-end justify-between gap-8 max-[560px]:flex-col-reverse max-[560px]:items-start">
          <p className="m-0 text-xs font-semibold">
            WICSM @ {currentYear}. All rights reserved.
          </p>
          <div className="flex gap-4.5">
            {socialLinks.map((link) => (
              <a
                aria-label={link.label}
                className="flex size-9.5 items-center justify-center transition-opacity hover:opacity-75 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white"
                href={link.href}
                key={link.label}
              >
                {link.icon && (
                  <img
                    alt=""
                    className={`${socialIconSize[link.label] ?? "size-7"} brightness-0 invert`}
                    src={link.icon}
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
