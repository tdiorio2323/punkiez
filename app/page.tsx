'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const menuItems = [
    { label: 'INSTAGRAM', href: 'https://www.instagram.com/punkiez__/', external: true },
    { label: 'TELEGRAM', href: 'https://t.me/+mx113PockSVjNzgx', external: true },
    { label: 'MENU', href: '#', external: false },
    { label: 'WHOLESALE', href: '#', external: false },
    { label: 'CONTACT', href: 'https://ptwdym158.org/punkiez', external: true },
  ];

  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    let x = Math.random() * (window.innerWidth - 128);
    let y = Math.random() * (window.innerHeight - 128);
    let dx = 4 + Math.random() * 3; // velocity x (faster)
    let dy = 4 + Math.random() * 3; // velocity y (faster)

    const animate = () => {
      const iconSize = icon.offsetWidth;

      // Update position
      x += dx;
      y += dy;

      // Bounce off walls
      if (x + iconSize >= window.innerWidth || x <= 0) {
        dx = -dx;
        x = x <= 0 ? 0 : window.innerWidth - iconSize;
      }
      if (y + iconSize >= window.innerHeight || y <= 0) {
        dy = -dy;
        y = y <= 0 ? 0 : window.innerHeight - iconSize;
      }

      // Use transform for better performance
      icon.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <main className="relative">
      {/* Bouncing P Icon */}
      <div ref={iconRef} className="bouncing-icon">
        <img
          src="/p-icon.png"
          alt=""
          className="w-24 h-24 md:w-32 md:h-32"
        />
      </div>

      <div className="glass w-full rounded-3xl p-8 md:p-10
                max-w-[420px] sm:max-w-[520px] md:max-w-[640px] lg:max-w-[720px]
                shadow-2xl">
        <div className="flex flex-col items-center gap-5">
          {/* Wordmark Logo */}
          <img
            src="/punkiez-logo.png"
            alt="PUNKIEZ"
            className="w-[260px] md:w-[320px] h-auto breathing-logo"
          />

          {/* Title */}
          <h1 className="text-xl font-extrabold tracking-[0.2em] text-center">
            OFFICIAL PUNKIEZ
          </h1>

          {/* Menu Buttons */}
          <div className="w-full space-y-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={`Go to ${item.label}`}
                className="menu-btn block w-full rounded-xl border-2 border-black text-center font-bold py-3.5 transition"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Become a Rep Button */}
          <a
            href="#"
            aria-label="Become a PUNKIEZ Representative"
            className="telegram-btn mt-4 block w-full rounded-xl py-3.5 text-center font-bold text-white
                       shadow-lg hover:shadow-xl transition-all"
          >
            BECOME A REP
          </a>
        </div>
      </div>

      {/* Anchor sections for navigation */}
      <div className="hidden">
        <section id="shop" />
        <section id="flavors" />
        <section id="locations" />
        <section id="about" />
        <section id="contact" />
      </div>
    </main>
  );
}
