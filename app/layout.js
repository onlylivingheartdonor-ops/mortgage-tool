export const metadata = {
  title: "Mortgage Affordability Calculator | Know Exactly How Much House You Can Afford",
  description: "Calculate how much house you can afford and what your monthly mortgage payment will be. Includes full PITI breakdown, DTI analysis, PMI guidance, and an amortization schedule.",

  alternates: {
    canonical: "https://www.mortgageaffordabilityestimator.com",
  },

  openGraph: {
    title: "Mortgage Affordability Calculator | Know Exactly How Much House You Can Afford",
    description: "Calculate how much house you can afford and what your monthly mortgage payment will be. Includes full PITI breakdown, DTI analysis, PMI guidance, and an amortization schedule.",
    url: "https://www.mortgageaffordabilityestimator.com",
    siteName: "Mortgage Affordability Estimator",
    images: [
      {
        url: "https://www.mortgageaffordabilityestimator.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mortgage Affordability Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mortgage Affordability Calculator | Know Exactly How Much House You Can Afford",
    description: "Calculate how much house you can afford and what your monthly mortgage payment will be. Includes PITI breakdown, DTI analysis, and amortization schedule.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Mortgage Affordability Calculator",
              description: "Free tool to calculate how much house you can afford and what your monthly mortgage payment will be. Includes PITI breakdown, DTI analysis, PMI guidance, and amortization schedule.",
              url: "https://www.mortgageaffordabilityestimator.com",
              applicationCategory: "FinanceApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              author: {
                "@type": "Organization",
                name: "MoneyWise Calculators",
                url: "https://moneywisecalculator.com"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
