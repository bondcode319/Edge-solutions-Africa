"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNavigation, primaryCta, type NavItem } from "@/config/site";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

/**
 * Site header with desktop dropdown navigation and a mobile panel.
 *
 * Keyboard behaviour: dropdown triggers are buttons with aria-expanded, open on
 * click or Enter/Space, close on Escape (returning focus to the trigger) and on
 * focus or pointer leaving the group. Hover opens them too, but hover is never
 * the only way in.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Route change closes anything left open. Adjusting during render (rather
  // than in an effect) avoids a frame where the menu is open on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile panel is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Clicking outside the nav closes any open dropdown.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  const isActive = useCallback(
    (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)),
    [pathname],
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-surface transition-shadow duration-[--duration-base]",
        scrolled ? "border-line shadow-[var(--shadow-nav)]" : "border-transparent",
      )}
    >
      <div className="container-content flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo />

        <div ref={navRef} className="hidden lg:block">
          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              {mainNavigation.map((item) => (
                <DesktopNavItem
                  key={item.label}
                  item={item}
                  active={isActive(item.href)}
                  open={openMenu === item.label}
                  onOpen={() => setOpenMenu(item.label)}
                  onClose={() => setOpenMenu(null)}
                  onToggle={() =>
                    setOpenMenu((current) => (current === item.label ? null : item.label))
                  }
                />
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={primaryCta.href}
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => trackEvent("cta_click", { location: "header", label: primaryCta.label })}
          >
            {primaryCta.label}
          </ButtonLink>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-xs text-ink hover:bg-surface-muted lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            <Icon name={mobileOpen ? "X" : "Menu"} className="size-6" />
          </button>
        </div>
      </div>

      <MobileNavigation open={mobileOpen} isActive={isActive} onNavigate={() => setMobileOpen(false)} />
    </header>
  );
}

function DesktopNavItem({
  item,
  active,
  open,
  onOpen,
  onClose,
  onToggle,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const linkStyles = cn(
    "inline-flex min-h-10 items-center gap-1 rounded-xs px-3 text-[0.95rem] transition-colors duration-[--duration-base] ease-[--ease-standard]",
    active ? "font-medium text-brand" : "text-ink hover:text-brand",
  );

  if (!item.sections) {
    return (
      <li>
        <Link href={item.href} className={linkStyles} aria-current={active ? "page" : undefined}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) onClose();
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={linkStyles}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            onClose();
            triggerRef.current?.focus();
          }
        }}
      >
        {item.label}
        <Icon
          name="ChevronDown"
          className={cn(
            "size-4 transition-transform duration-[--duration-fast]",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-max -translate-x-1/2 pt-3 transition-[opacity,transform] duration-[--duration-base] ease-[--ease-standard]",
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
        hidden={!open}
      >
        <div className="flex gap-6 rounded-panel border border-line bg-surface p-6 shadow-[var(--shadow-panel)]">
          {item.sections.map((section) => (
            <div key={section.heading} className="w-[19rem]">
              <p className="eyebrow mb-3 text-muted">{section.heading}</p>
              <ul className="flex flex-col gap-1">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-xs px-3 py-2.5 transition-colors duration-[--duration-fast] hover:bg-surface-alt"
                    >
                      <span className="block text-sm font-medium text-ink">{link.label}</span>
                      {link.description ? (
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-soft">
                          {link.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {item.featured ? (
            <div className="w-[17rem] rounded-card bg-brand-900 p-5 text-white">
              <p className="font-display text-base font-normal">{item.featured.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-white/70">{item.featured.body}</p>
              <Link
                href={item.featured.href}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
              >
                {item.featured.cta}
                <Icon name="ArrowRight" className="size-3.5" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function MobileNavigation({
  open,
  isActive,
  onNavigate,
}: {
  open: boolean;
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  return (
    <div
      id="mobile-navigation"
      hidden={!open}
      className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-surface lg:hidden"
    >
      <nav aria-label="Main (mobile)" className="container-content py-4">
        <ul className="flex flex-col divide-y divide-line">
          {mainNavigation.map((item) => (
            <li key={item.label} className="py-1">
              {item.sections ? (
                <details className="group">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-2 text-base font-medium text-ink">
                    {item.label}
                    <Icon
                      name="ChevronDown"
                      className="size-5 text-muted transition-transform duration-[--duration-fast] group-open:rotate-180"
                    />
                  </summary>
                  <ul className="flex flex-col gap-1 pb-3 pl-1">
                    <li>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className="block rounded-xs px-2 py-2.5 text-sm font-medium text-brand"
                      >
                        {item.label} overview
                      </Link>
                    </li>
                    {item.sections.flatMap((section) =>
                      // The overview link above already covers the section entry
                      // that points at the same route.
                      section.links
                        .filter((link) => link.href !== item.href)
                        .map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onNavigate}
                            className="block rounded-xs px-2 py-2.5 text-sm text-muted-soft hover:bg-surface-alt"
                          >
                            {link.label}
                          </Link>
                        </li>
                      )),
                    )}
                  </ul>
                </details>
              ) : (
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 items-center text-base",
                    isActive(item.href) ? "text-brand" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <ButtonLink href={primaryCta.href} onClick={onNavigate} className="mt-5 w-full" size="lg">
          {primaryCta.label}
        </ButtonLink>
      </nav>
    </div>
  );
}
