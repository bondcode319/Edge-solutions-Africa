"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { platformLayers } from "@/content/platform";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { trackEvent } from "@/lib/analytics";

/**
 * Interactive architecture explorer.
 *
 * Implemented as an ARIA tablist with roving focus: arrow keys move between
 * layers, Home and End jump to the ends. Every panel is rendered in the DOM and
 * only the inactive ones are hidden, so the content is still reachable if
 * JavaScript fails to load.
 */
export function PlatformArchitecture() {
  const [activeId, setActiveId] = useState(platformLayers[0]!.id);
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (id: string) => {
    setActiveId(id);
    trackEvent("architecture_layer_selected", { layer: id });
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = (index + 1) % platformLayers.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = (index - 1 + platformLayers.length) % platformLayers.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = platformLayers.length - 1;
    }

    const target = platformLayers[next]!;
    select(target.id);
    tabRefs.current[target.id]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Platform layers"
        className="flex flex-col gap-2"
      >
        {platformLayers.map((layer, index) => {
          const selected = layer.id === activeId;
          return (
            <div key={layer.id} className="relative">
              <button
                ref={(node) => {
                  tabRefs.current[layer.id] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${layer.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${layer.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(layer.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  "w-full rounded-card border p-4 text-left transition-[border-color,background-color,box-shadow] duration-[--duration-base] ease-[--ease-out-soft]",
                  selected
                    ? "border-emerald bg-white shadow-[var(--shadow-card)]"
                    : "border-softgrey bg-white/60 hover:border-slate/30 hover:bg-white",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold",
                      selected
                        ? "bg-emerald text-white"
                        : "bg-softgrey text-slate-700",
                    )}
                  >
                    {layer.index}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-navy">{layer.name}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate">
                      {layer.summary}
                    </span>
                  </span>
                  <Icon
                    name="ChevronRight"
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-[--duration-base]",
                      selected ? "text-emerald-600" : "text-slate/50",
                    )}
                  />
                </span>
              </button>

              {index < platformLayers.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="mx-auto block h-2 w-px bg-softgrey"
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div>
        {platformLayers.map((layer) => (
          <div
            key={layer.id}
            role="tabpanel"
            id={`${baseId}-panel-${layer.id}`}
            aria-labelledby={`${baseId}-tab-${layer.id}`}
            hidden={layer.id !== activeId}
            tabIndex={0}
            className="rounded-panel border border-softgrey bg-white p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600">
              Layer {layer.index}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-navy">
              {layer.name}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-700">{layer.purpose}</p>

            <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-slate">
              Examples
            </h4>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {layer.examples.map((example) => (
                <li key={example} className="flex items-start gap-2 text-sm text-slate-700">
                  <Icon name="Check" className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {example}
                </li>
              ))}
            </ul>

            {layer.connectsTo ? (
              <div className="mt-7 rounded-card border border-cyan-600/25 bg-cyan-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-600">
                  Connects to the next layer
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{layer.connectsTo}</p>
              </div>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-3 border-t border-softgrey pt-5">
              {layer.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:underline"
                >
                  {link.label}
                  <Icon name="ArrowRight" className="size-4" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
