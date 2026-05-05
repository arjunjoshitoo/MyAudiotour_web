"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        menuOpen ? "bg-white shadow-sm" : scrolled ? "bg-brand-bg border-b border-brand-muted shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1500px] mx-auto px-6 flex justify-between h-16 items-center my-[13px]">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button
            className="flex flex-col gap-1.5 p-2 -ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-brand-ink transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-brand-ink transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-brand-ink transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-48">
              <Image src="/Assets/logo.png" alt="MyAudioTour logo" fill className="object-contain" />
            </div>
          </Link>
        </div>

        {/* Right: App store badges */}
        <div className="flex items-center gap-3">
          <a
            href="https://apps.apple.com/us/app/myaudiotour-travel-guide/id6756263024"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Image src="/SVGs/Apple.svg" alt="Download on the App Store" width={120} height={40} />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.audiotour"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Image src="/SVGs/Google.svg" alt="Get it on Google Play" width={135} height={40} />
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="px-48 overflow-hidden">
          <div className="px-6 py-6 flex flex-col gap-5">
            <Link
              href="/"
              className="font-sans text-xl font-medium translate-y-0 transition-transform duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tours"
              className="font-sans text-xl font-medium translate-y-0 transition-transform duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Tours
            </Link>
            <Link
              href="/about"
              className="font-sans text-xl font-medium"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
