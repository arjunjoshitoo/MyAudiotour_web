import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MyAudioTour: Free GPS Audio Guide & Self-Guided Tour App for India",
    template: "%s | MyAudioTour",
  },
  description:
    "Discover immersive, GPS-triggered audio guides at 1,000+ landmarks across 70+ Indian cities. From the Taj Mahal to hidden gems in Jaipur, Varanasi & Delhi — your iPhone becomes the ultimate self-guided tour companion. Free on the App Store.",
  
  keywords: [
    // Brand (both spellings — App Store uses lowercase 't')
    "MyAudioTour",
    "MyAudiotour",
    "MyAudioTour app",
    "MyAudiotour Travel Guide",
    "audiotour app",
    // Primary intent
    "audio guide India",
    "audio tour app India",
    "GPS audio tour",
    "location based audio tour",
    "self guided tour app",
    "self guided walking tour India",
    "self guided adventures",
    "free audio guide app",
    "immersive audio guide",
    // Travel & tourism
    "India travel app",
    "India tourism app",
    "India sightseeing app",
    "tourist guide app India",
    "heritage walk India",
    "monument audio guide",
    "hidden gems India",
    // Landmark long-tail
    "Taj Mahal audio guide",
    "Red Fort audio tour",
    "Hawa Mahal guide",
    "Amber Fort audio tour",
    "Qutub Minar audio guide",
    "Mysore Palace audio tour",
    // City long-tail
    "Delhi audio tour",
    "Jaipur audio guide",
    "Agra walking tour",
    "Varanasi audio guide",
    "Mumbai heritage walk",
    // Platform — App Store listing is iPhone-only
    "iPhone travel guide app",
    "audio guide app iPhone",
    "iPhone audio tour app",
  ],
  
  itunes: {
    appId: "6756263024",
  },
  
  appLinks: {
    ios: {
      url: "https://apps.apple.com/us/app/myaudiotour-travel-guide/id6756263024",
      app_store_id: "6756263024",
      app_name: "MyAudiotour: Travel Guide",
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${inter.variable} font-sans antialiased bg-brand-bg text-brand-ink`}
      >
        <Script
          id="ld-json-app"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "MyAudiotour: Travel Guide",
              alternateName: ["MyAudioTour", "MyAudioTour app"],
              operatingSystem: "iOS 15.1",
              applicationCategory: "TravelApplication",
              downloadUrl:
                "https://apps.apple.com/us/app/myaudiotour-travel-guide/id6756263024",
              installUrl:
                "https://apps.apple.com/us/app/myaudiotour-travel-guide/id6756263024",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                ratingCount: "1",
              },
              author: {
                "@type": "Person",
                name: "Navaldeep Singh",
              },
              description:
                "Location-based audio tour app with GPS-triggered audio guides for 1,000+ landmarks across 70+ Indian cities. Free, self-guided, and built for travelers.",
            }),
          }}
        />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
