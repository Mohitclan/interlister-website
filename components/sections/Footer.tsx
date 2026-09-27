import { LogoGlyph } from "@/components/visuals/DashboardMock";
import { appLinks, company, legalLinks, optionalLinks } from "@/lib/site";

type Link = { label: string; href: string };

export function Footer() {
  const resources: Link[] = [
    { label: "FAQ", href: "#faq" },
    ...(optionalLinks.docs ? [{ label: "Documentation", href: optionalLinks.docs }] : []),
    { label: "Contact us", href: legalLinks.contact },
    ...(company.contactEmail ? [{ label: company.contactEmail, href: `mailto:${company.contactEmail}` }] : []),
  ];
  const legal: Link[] = [
    { label: "Terms of Service", href: legalLinks.terms },
    { label: "Privacy Policy", href: legalLinks.privacy },
    { label: "Refund Policy", href: legalLinks.refund },
  ];

  const columns: { title: string; links: Link[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "Sign in", href: appLinks.login },
      ],
    },
    { title: "Resources", links: resources },
    { title: "Legal", links: legal },
  ];

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <a href="#top" className="inline-flex items-center gap-2.5 rounded-lg" aria-label="InterLister — back to top">
            <LogoGlyph className="size-8" />
            <span className="text-lg font-semibold tracking-tight">InterLister</span>
          </a>
          <p className="mt-4 max-w-xs text-sm text-muted">One workspace for your marketplace operations.</p>
          <p className="mt-3 max-w-xs text-sm text-faint">A product of {company.name}.</p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-sm font-medium">{c.title}</p>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="rounded text-sm text-muted transition-colors hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-faint sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {company.name}. InterLister is a product of {company.name}.</p>
          <p>Amazon, Flipkart and Meesho are trademarks of their respective owners. InterLister is not affiliated with them.</p>
        </div>
      </div>
    </footer>
  );
}
