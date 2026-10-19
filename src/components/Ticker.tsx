import { focusAreas } from "@/constants";

export default function Ticker() {
  // The list appears twice so the track can loop seamlessly
  const items = [...focusAreas, ...focusAreas];

  return (
    <div aria-label="Focus areas" className="tp overflow-hidden bg-primary py-[18px]">
      <ul className="tp-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <li
            key={i}
            aria-hidden={i >= focusAreas.length || undefined}
            className="flex items-center gap-10 pr-10"
          >
            <span className="tp-black text-[15px] uppercase tracking-[0.14em] text-warm">
              {item}
            </span>
            <span className="text-mint" aria-hidden="true">
              ◆
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
