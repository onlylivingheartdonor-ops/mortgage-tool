export const metadata = {
  title: "Privacy Policy | Mortgage Affordability Calculator",
  description: "Privacy policy for Mortgage Affordability Calculator. Learn how we handle data, cookies, and third-party services including Google AdSense and Google Analytics.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'DM Mono', monospace", color: "#1a1a1a", background: "#faf8f4", minHeight: "100vh" }}>
      <p style={{ fontSize: "12px", marginBottom: "1.5rem" }}>
        <a href="/" style={{ color: "#b45309", textDecoration: "none" }}>&#8592; Back to Mortgage Affordability Calculator</a>
      </p>

      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", marginBottom: ".5rem" }}>Privacy Policy</h1>
      <p style={{ fontSize: "12px", color: "#888", marginBottom: "2rem" }}>Last updated: May 19, 2026</p>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>About this site</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          Mortgage Affordability Calculator (mortgageaffordabilityestimator.com) is a free tool that helps prospective homebuyers estimate how much house they can afford and calculate monthly mortgage payments. It is operated by MoneyWise Calculators, a network of free online financial tools. This privacy policy explains what information is collected when you use this site, how it is used, and your rights regarding that information.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Information we do not collect</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          We do not collect, store, or transmit any financial figures or personal information you enter into this tool. All calculations are performed entirely within your browser. Nothing you enter is sent to our servers, stored in a database, or shared with any third party. We do not require you to create an account or provide any personal information to use this tool.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Cookies</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          This site uses cookies for the following purposes:
        </p>
        <ul style={{ fontSize: "13px", lineHeight: "1.9", color: "#444", paddingLeft: "1.5rem", marginTop: ".75rem" }}>
          <li><strong>Analytics cookies</strong> -- placed by Google Analytics to help us understand how visitors use the site. This data is aggregated and anonymous.</li>
          <li><strong>Advertising cookies</strong> -- placed by Google AdSense to serve relevant advertisements. These cookies may track your browsing across websites.</li>
        </ul>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444", marginTop: ".75rem" }}>
          You can control or disable cookies through your browser settings.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Google AdSense</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          This site displays advertisements served by Google AdSense. You may opt out of personalized advertising at{" "}
          <a href="https://www.google.com/settings/ads" style={{ color: "#b45309" }} target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          For more information, visit{" "}
          <a href="https://policies.google.com/technologies/partner-sites" style={{ color: "#b45309" }} target="_blank" rel="noopener noreferrer">How Google uses information from sites that use our services</a>.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Google Analytics</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          This site uses Google Analytics for anonymous traffic measurement. You can opt out by installing the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" style={{ color: "#b45309" }} target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Third-party links</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          This site contains links to other websites in the MoneyWise Calculators network. We are not responsible for the privacy practices of those sites.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Changes to this policy</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          We may update this policy from time to time. Changes will be posted on this page with an updated date.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Contact</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          For privacy-related questions, contact us through{" "}
          <a href="https://moneywisecalculator.com" style={{ color: "#b45309" }}>MoneyWise Calculator</a>.
        </p>
      </section>

      <p style={{ fontSize: "12px", color: "#aaa", borderTop: "1px solid #e0dbd3", paddingTop: "1.5rem" }}>
        &copy; 2026 MoneyWise Calculators &middot; <a href="/terms" style={{ color: "#aaa" }}>Terms of Service</a>
      </p>
    </main>
  );
}
