import { Button } from "./button";

export interface NavbarLink {
  href: string;
  label: string;
}

interface NavbarProps {
  links?: readonly NavbarLink[];
  loginHref?: string;
  loginLabel?: string;
}

const defaultLinks: readonly NavbarLink[] = [
  { href: "/", label: "HOME" },
  { href: "/about-us", label: "ABOUT US" },
  { href: "#events", label: "EVENTS" },
  { href: "#contact", label: "CONTACT" },
];

export function Navbar({
  links = defaultLinks,
  loginHref = "/login",
  loginLabel = "login",
}: NavbarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="flex min-h-17.5 w-full items-center justify-between gap-8 rounded-3xl border-2 border-brand-button bg-white px-7 py-3 text-brand-button shadow-[0_3px_10px_rgb(57_13_103/8%)] max-[760px]:gap-3 max-[760px]:px-3.5 max-[760px]:pl-5"
    >
      <div className="flex min-w-0 items-center gap-[clamp(24px,4vw,64px)]">
        <a
          aria-label="WiCSM home"
          className="flex h-12 w-14.5 items-center justify-center rounded-[10px] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-text"
          href="/"
        >
          <img
            className="block h-12 w-14.5 object-contain"
            alt=""
            height="48"
            src="/favicon.svg"
            width="58"
          />
        </a>
        <div className="flex items-center gap-[clamp(24px,4vw,64px)] max-[760px]:hidden">
          {links.map((item) => (
            <a
              className="rounded-lg px-2 py-2.5 text-[clamp(16px,1.5vw,20px)] font-semibold leading-[1.2] text-brand-button no-underline transition-colors duration-150 hover:bg-brand-secondary hover:text-brand-text focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand-text"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <Button href={loginHref} size="compact" variant="secondary">
        {loginLabel}
      </Button>
    </nav>
  );
}
