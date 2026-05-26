export const metadata = {
  title: "Terms of Service | Mortgage Affordability Calculator",
  description: "Terms of service for Mortgage Affordability Calculator.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "2rem 1.5rem", fontFamily: "'DM Mono', monospace", color: "#1a1a1a", background: "#faf8f4", minHeight: "100vh" }}>
      <p style={{ fontSize: "12px", marginBottom: "1.5rem" }}>
        <a href="/" style={{ color: "#b45309", textDecoration: "none" }}>&#8592; Back to Mortgage Affordability Calculator</a>
      </p>

      <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", marginBottom: ".5rem" }}>Terms of Service</h1>
      <p style={{ fontSize: "12px", color: "#888", marginBottom: "2rem" }}>Last updated: May 19, 2026</p>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Acceptance of terms</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          By using Mortgage Affordability Calculator at mortgageaffordabilityestimator.com, you agree to these Terms of Service. If you do not agree, please do not use the site.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Description of service</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          Mortgage Affordability Calculator is a free online tool that estimates home affordability and monthly mortgage payments based on user-provided inputs. All calculations are performed within the user's browser. This site is not affiliated with any lender, bank, real estate agency, or government mortgage program.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>No financial advice</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          Nothing on this site constitutes financial, mortgage, legal, or professional advice. Results are estimates based on simplified assumptions including fixed interest rates, fixed loan terms, and the 28% front-end DTI guideline. Actual mortgage qualification, rates, and monthly payments vary by lender, borrower credit profile, loan type, location, and many other factors.
        </p>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444", marginTop: ".75rem" }}>
          You should not make home-buying decisions based solely on this tool. Always consult a licensed mortgage professional, real estate agent, or financial advisor before purchasing a home or applying for a mortgage.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Accuracy of results</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          We make reasonable efforts to keep the calculations accurate, but we cannot guarantee results reflect current interest rates, tax rates, insurance costs, or lender requirements. Results are for planning and educational purposes only.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Disclaimer of warranties and limitation of liability</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          This site is provided "as is" without warranties of any kind. To the fullest extent permitted by law, MoneyWise Calculators shall not be liable for any financial loss, mortgage-related decisions, or other damages arising from use of or reliance on this tool.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Third-party services and advertising</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          This site displays advertisements through Google AdSense and uses Google Analytics for traffic measurement. Your interaction with these services is governed by Google's own terms and privacy policies.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Changes to these terms</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of updated terms.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: ".75rem" }}>Contact</h2>
        <p style={{ fontSize: "13px", lineHeight: "1.8", color: "#444" }}>
          For questions about these terms, contact us through{" "}
          <a href="https://moneywisecalculator.com" style={{ color: "#b45309" }}>MoneyWise Calculator</a>.
        </p>
      </section>

      <p style={{ fontSize: "12px", color: "#aaa", borderTop: "1px solid #e0dbd3", paddingTop: "1.5rem" }}>
        &copy; 2026 MoneyWise Calculators &middot; <a href="/privacy" style={{ color: "#aaa" }}>Privacy Policy</a>
      </p>
    </main>
  );
}
