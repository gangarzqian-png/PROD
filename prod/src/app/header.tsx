"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="hr-gradient" />
      <header className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="group flex items-center gap-2">
          <div
            className={`relative h-9 w-24 sm:h-10 sm:w-28 transition-transform duration-200 ${
              scrolled ? "scale-90" : "scale-100"
            }`}
          >
            <Image src="/prod-logo.svg" alt="Prod" fill className="object-contain" priority />
          </div>
          <span className="sr-only">Prod</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2 text-sm">
          <NavLink href="/timeline" label="タイムライン" />
          <NavLink href="/crews" label="クルー" />
          <NavLink href="/recruits" label="募集要項" />
          <NavLink href="/meet" label="Meet" />
          <NavLink href="/me" label="マイページ" />
        </nav>
      </header>
      <div className="hr-gradient" />
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-md hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
    >
      {label}
    </Link>
  );
}