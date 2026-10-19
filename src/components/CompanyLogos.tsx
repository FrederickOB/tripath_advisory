import { useClients } from "@/hooks/useSanityData";
import { sanityImage } from "@/lib/image";

export const CompanyLogos = () => {
  const { data: clients } = useClients();
  if (!clients || clients.length === 0) return null;

  // Repeat short lists so the marquee track is always wider than the screen
  const repeats = Math.max(1, Math.ceil(10 / clients.length));
  const half = Array.from({ length: repeats }, () => clients).flat();
  const track = [...half, ...half];

  return (
    <section aria-label="Clients and partners" className="tp overflow-hidden pb-8 pt-14">
      <p className="tp-kicker mb-7 text-center">Trusted by clients and partners</p>
      <div className="tp-fade-x">
        <ul
          className="tp-marquee tp-marquee--pausable items-center"
          style={{ "--tp-marquee-duration": "34s" } as React.CSSProperties}
        >
          {track.map((client, i) => (
            <li
              key={`${client._id}-${i}`}
              aria-hidden={i >= clients.length || undefined}
              className="flex shrink-0 items-center pr-[72px]"
            >
              {client.logo?.url ? (
                <img
                  src={sanityImage(client.logo.url, 320)}
                  alt={i < clients.length ? client.name : ""}
                  loading="lazy"
                  className="h-11 w-auto max-w-[160px] object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span className="tp-black text-xl text-[#9aa4a8]">{client.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
