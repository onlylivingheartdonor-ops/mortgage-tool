export const metadata = {
  title: "Mortgage Affordability Calculator | Know Exactly How Much House You Can Afford",
  description: "Calculate how much house you can afford and what your monthly mortgage payment will be. Includes full PITI breakdown, DTI analysis, PMI guidance, and an amortization schedule.",
  
  alternates: {
    canonical: "https:/https://www.mortgageaffordabilityestimator.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "Mortgage Affordability Calculator | Know Exactly How Much House You Can Afford",
    description: "Calculate how much house you can afford and what your monthly mortgage payment will be. Includes full PITI breakdown, DTI analysis, PMI guidance, and an amortization schedule.",
    url: "https://www.mortgageaffordabilityestimator.com",                 // ← MUST CHANGE
    siteName: "Moneywise Calculators",             // ← Change
    images: [
      {
        url: "https://https://www.mortgageaffordabilityestimator.com/og-image.png", // ← MUST CHANGE
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
    description: "Calculate how much house you can afford and what your monthly mortgage payment will be. Includes full PITI breakdown, DTI analysis, PMI guidance, and an amortization schedule.",
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

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
