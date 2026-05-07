import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "Tours",
    links: [
      { label: "View All Cities →", href: "/tours" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy.html" },
      { label: "Terms of Service", href: "/terms-of-service.html" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-white/10">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Image src="/Assets/Logo.png" alt="MyAudioTour logo" width={192} height={192} className="w-48 h-auto mb-4" />
            <p className="font-sans text-sm text-white/40 leading-relaxed max-w-[200px]">
              Free GPS audio guides for India&apos;s greatest landmarks.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-brand-saffron transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-brand-saffron transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Download badges */}
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-white/30 mb-4">
              Download the App
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://apps.apple.com/us/app/myaudiotour-travel-guide/id6756263024"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80 inline-block"
              >
                <Image src="/SVGs/Apple.svg" alt="Download on the App Store" width={120} height={40} />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.audiotour"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80 inline-block"
              >
                <Image src="/SVGs/Google.svg" alt="Get it on Google Play" width={135} height={40} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans text-xs font-semibold tracking-[0.18em] uppercase text-white/30 mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-white/55 hover:text-white transition-colors"
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8">
          <p className="font-sans text-xs text-white/25">
            © 2025 MyAudiotour
          </p>
          <p className="font-sans text-xs text-white/20">
            audiotour.app
          </p>
        </div>
      </div>
    </footer>
  );
}
