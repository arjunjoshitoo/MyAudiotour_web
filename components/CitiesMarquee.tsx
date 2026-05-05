const cities = [
  "Delhi",
  "Jaipur",
  "Mumbai",
  "Agra",
  "Varanasi",
  "Udaipur",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Mysore",
  "Amritsar",
  "Jodhpur",
  "Hampi",
  "Pondicherry",
  "Ahmedabad",
  "Lucknow",
  "Bhopal",
  "Goa",
  "Kochi",
  "Pushkar",
];

const Dot = () => (
  <span className="inline-block w-2 h-2 rounded-full bg-brand-saffron mx-6 flex-shrink-0 self-center" />
);

export default function CitiesMarquee() {
  const items = [...cities, ...cities]; // duplicate for seamless loop

  return (
    <section id="cities" className="py-6 bg-brand-bg border-y border-brand-muted overflow-hidden">
      <div className="marquee-track">
        {items.map((city, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span className="font-serif font-bold text-2xl md:text-3xl text-brand-ink/80 whitespace-nowrap">
              {city}
            </span>
            <Dot />
          </span>
        ))}
      </div>
    </section>
  );
}
