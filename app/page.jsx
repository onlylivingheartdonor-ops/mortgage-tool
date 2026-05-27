import MortgageCalculator from "./MortgageCalculator"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .mtg-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .mtg-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .mtg-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .mtg-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .mtg-title em { font-style: italic; color: #b45309; }
  .mtg-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .mtg-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }
  .mtg-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .mtg-nav a { color: #b45309; text-decoration: none; }
  .mtg-nav a:hover { text-decoration: underline; }
  .mtg-tabs { display: flex; gap: .5rem; margin-bottom: 1.5rem; }
  .mtg-tab { flex: 1; padding: .65rem 1rem; border: 1px solid #e0dbd3; border-radius: 2px; font-family: 'DM Mono', monospace; font-size: 12px; color: #555; cursor: pointer; background: none; transition: all .15s; text-align: center; }
  .mtg-tab.on { border-color: #b45309; background: #fefce8; color: #b45309; }
  .mtg-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .mtg-field-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .mtg-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .mtg-field-hint { font-size: 12px; color: #888; margin-top: .3rem; line-height: 1.5; }
  .mtg-input-wrap { position: relative; }
  .mtg-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .mtg-suffix { position: absolute; right: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .mtg-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .mtg-input.no-prefix { padding-left: 0; }
  .mtg-input:focus { border-color: #b45309; }
  .mtg-range-row { margin-bottom: 1.25rem; }
  .mtg-range-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: .4rem; }
  .mtg-range-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; }
  .mtg-range-val { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #b45309; }
  .mtg-range { width: 100%; accent-color: #b45309; height: 4px; cursor: pointer; }
  .mtg-result-hero { background: #fffbeb; border: 1px solid #fde68a; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; text-align: center; }
  .mtg-result-eyebrow { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #92400e; margin-bottom: .3rem; }
  .mtg-result-val { font-family: 'DM Serif Display', serif; font-size: 3.5rem; color: #92400e; line-height: 1; }
  .mtg-result-sub { font-size: 12px; color: #78350f; margin-top: .5rem; line-height: 1.6; opacity: .8; }
  .mtg-result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .mtg-result-cell { background: #fff; padding: 1rem 1.1rem; }
  .mtg-result-cell-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .mtg-result-cell-val { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #1a1a1a; }
  .mtg-result-cell-val.amber { color: #b45309; }
  .mtg-result-cell-val.red { color: #b91c1c; }
  .mtg-result-cell-val.green { color: #166534; }
  .mtg-dti-section { margin-bottom: 1.5rem; }
  .mtg-dti-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .5rem; display: flex; justify-content: space-between; }
  .mtg-dti-track { height: 8px; background: #e0dbd3; border-radius: 4px; overflow: hidden; margin-bottom: .4rem; position: relative; }
  .mtg-dti-fill { height: 100%; border-radius: 4px; transition: width .5s, background .5s; }
  .mtg-dti-markers { display: flex; justify-content: space-between; font-size: 10px; color: #aaa; }
  .mtg-payment-breakdown { border: 1.5px dashed #fde68a; border-radius: 4px; padding: 1.25rem; margin-bottom: 1rem; }
  .mtg-payment-title { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #b45309; margin-bottom: .75rem; }
  .mtg-payment-rows { display: flex; flex-direction: column; gap: .4rem; }
  .mtg-payment-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; padding: .4rem 0; border-bottom: 1px solid #fef9c3; }
  .mtg-payment-row:last-child { border-bottom: none; font-weight: 500; }
  .mtg-payment-row-label { color: #555; }
  .mtg-payment-row-val { color: #1a1a1a; font-family: 'DM Serif Display', serif; font-size: 1rem; }
  .mtg-payment-row-val.total { color: #b45309; font-size: 1.2rem; }
  .mtg-amort-toggle { font-size: 12px; color: #b45309; cursor: pointer; text-decoration: underline; margin-bottom: .75rem; display: inline-block; }
  .mtg-amort { display: none; overflow-x: auto; }
  .mtg-amort.show { display: block; }
  .mtg-amort-table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 420px; }
  .mtg-amort-table th { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; text-align: left; padding: .4rem .5rem; border-bottom: 1px solid #e0dbd3; }
  .mtg-amort-table td { padding: .4rem .5rem; border-bottom: 1px solid #f5f3ef; color: #444; }
  .mtg-amort-table tr:last-child td { color: #b45309; font-weight: 500; }
  .mtg-warn { font-size: 12px; color: #b91c1c; padding: .9rem 1rem; background: #fff8f8; border: 1px solid #fcd4d4; border-radius: 3px; margin-bottom: 1rem; line-height: 1.6; }
  .mtg-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .mtg-info-item { padding: .75rem; border-left: 2px solid #fde68a; }
  .mtg-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .mtg-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .mtg-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .mtg-prose p:last-child { margin-bottom: 0; }
  .mtg-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .mtg-prose ul li { margin-bottom: .3rem; }
  .mtg-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .mtg-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .mtg-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .mtg-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .mtg-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .mtg-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fde68a; line-height: 1; margin-bottom: .4rem; }
  .mtg-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .mtg-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .mtg-realworld { background: #fefce8; border: 1px solid #fde68a; border-radius: 4px; padding: 1.25rem; margin-bottom: 1.5rem; }
  .mtg-realworld-title { font-size: 13px; font-weight: 600; color: #92400e; margin-bottom: .5rem; }
  .mtg-realworld-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: .75rem; }
  .mtg-realworld-cell { background: #fff; border-radius: 3px; padding: .9rem 1rem; }
  .mtg-realworld-cell-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .2rem; }
  .mtg-realworld-cell-val { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #b45309; }
  .mtg-realworld-cell-sub { font-size: 11px; color: #888; margin-top: .2rem; }
  .mtg-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .mtg-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .mtg-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .mtg-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .mtg-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .mtg-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .mtg-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .mtg-field-row, .mtg-field-row-3 { grid-template-columns: 1fr; }
    .mtg-result-grid { grid-template-columns: 1fr; }
    .mtg-info-grid, .mtg-tip-grid, .mtg-realworld-row { grid-template-columns: 1fr; }
    .mtg-tabs { flex-direction: column; }
  }
`

const FAQ = [
  {
    q: "How much house can I afford on my salary?",
    a: "The standard rule of thumb is that your total housing costs — principal, interest, property tax, insurance, and HOA fees — should not exceed 28% of your gross monthly income. This is called the front-end debt-to-income ratio. On an $85,000 annual salary ($7,083/month), this means a maximum housing payment of about $1,983/month. At current rates (around 7%), that supports a home price in the $250,000-$280,000 range depending on your down payment and local property taxes. Use the affordability tab above to calculate your specific number."
  },
  {
    q: "What is PITI and why does it matter?",
    a: "PITI stands for Principal, Interest, Taxes, and Insurance — the four components of a complete mortgage payment. Many online calculators show only principal and interest, which understates your real monthly cost by hundreds of dollars. On a $300,000 home, property tax and insurance alone can add $400-$600 per month to your payment. Always calculate PITI, not just P&I, when evaluating affordability."
  },
  {
    q: "What is DTI and what do lenders look for?",
    a: "DTI stands for debt-to-income ratio. Front-end DTI is your housing costs divided by your gross monthly income — most lenders want this below 28%. Back-end DTI adds all your monthly debt payments (car loans, credit cards, student loans) to housing costs — lenders typically cap this at 43%, though some programs allow up to 50% with compensating factors like excellent credit or large cash reserves. A lower DTI gives you more loan options and better rates."
  },
  {
    q: "How much do I need for a down payment?",
    a: "The minimum down payment depends on the loan type. Conventional loans require as little as 3%, FHA loans require 3.5%, and VA loans (for eligible veterans) require 0%. However, putting less than 20% down on a conventional loan typically requires private mortgage insurance (PMI), which adds 0.5-1.5% of the loan amount annually to your payment. A 20% down payment eliminates PMI and lowers your monthly payment significantly. It also gives you immediate equity and reduces your loan amount."
  },
  {
    q: "Should I choose a 15-year or 30-year mortgage?",
    a: "A 30-year mortgage has a lower monthly payment, giving you more cash flow flexibility. A 15-year mortgage typically has a rate 0.5-0.75% lower and dramatically reduces total interest paid — but the monthly payment is significantly higher. If you can comfortably afford the 15-year payment while maintaining an emergency fund and retirement contributions, the long-term savings are substantial. If the higher payment would strain your budget, a 30-year mortgage with occasional extra principal payments offers a middle path."
  },
  {
    q: "What credit score do I need to get a mortgage?",
    a: "The minimum credit score varies by loan type. FHA loans are available with scores as low as 580 (with 3.5% down) or even 500 (with 10% down). Conventional loans typically require a minimum of 620. However, your score dramatically affects your interest rate — the difference between a 680 and a 760 score can mean 0.5-1% higher rate, which on a $300,000 mortgage translates to $100+ more per month and over $36,000 more in total interest over 30 years. Improving your score before applying is one of the most valuable things you can do."
  }
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="mtg-wrap">

        <p className="mtg-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <div className="mtg-header">
          <p className="mtg-eyebrow">Home Buying</p>
          <h1 className="mtg-title">Mortgage<br /><em>Affordability Calculator</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to calculate how much house you can afford and what your monthly mortgage payment will be. Includes full PITI breakdown (principal, interest, taxes, insurance), DTI analysis, PMI guidance, and an amortization schedule.
        </p>

        <MortgageCalculator />

        {/* HOW IT WORKS */}
        <div className="mtg-card">
          <p className="mtg-section-title">How this calculator works</p>
          <div className="mtg-prose">
            <p>The affordability tab uses the 28% front-end DTI rule — a standard used by most lenders — to calculate the maximum home price your income can support. It takes your gross monthly income, subtracts estimated property tax, insurance, and HOA fees, and calculates the maximum principal and interest payment that keeps your housing costs at or below 28% of income. That payment is then used to back-calculate the maximum loan and home price.</p>
            <p>The monthly payment tab works in the other direction: given a specific home price and down payment, it calculates your exact principal and interest using the standard amortization formula, then adds the other monthly costs to show your true total payment. The amortization schedule shows exactly how each payment splits between principal and interest over the life of the loan.</p>
            <p>Both tabs use the same interest rate and loan term so you can switch between them freely to explore different scenarios.</p>
          </div>
          <div className="mtg-info-grid">
            <div className="mtg-info-item">
              <p className="mtg-info-title">Front-end vs back-end DTI</p>
              <p className="mtg-info-body">Front-end DTI is housing costs divided by gross income — lenders want this below 28%. Back-end DTI adds all monthly debts — lenders typically cap this at 43%, though some programs allow up to 50% with compensating factors.</p>
            </div>
            <div className="mtg-info-item">
              <p className="mtg-info-title">PITI explained</p>
              <p className="mtg-info-body">PITI stands for Principal, Interest, Taxes, and Insurance — the four components of a true mortgage payment. Many calculators show only P&I, which understates the real monthly cost by hundreds of dollars.</p>
            </div>
            <div className="mtg-info-item">
              <p className="mtg-info-title">PMI</p>
              <p className="mtg-info-body">Private Mortgage Insurance is required by most lenders when the down payment is below 20%. It typically costs 0.5-1.5% of the loan annually and is cancelled automatically once you reach 20% equity.</p>
            </div>
            <div className="mtg-info-item">
              <p className="mtg-info-title">The 28% rule as a starting point</p>
              <p className="mtg-info-body">The 28% guideline is a conservative ceiling, not a target. Many financial advisors suggest keeping housing costs at 25% or below to maintain financial flexibility for savings, emergencies, and other goals.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="mtg-card">
          <p className="mtg-section-title">Why understanding affordability before you shop matters</p>
          <div className="mtg-prose">
            <p>Most homebuyers start their search by browsing listings, then work backward to figure out what they can afford. This sequence creates a problem: once you have fallen in love with a home, the financial analysis feels like an obstacle rather than a guide. Starting with a clear affordability number reverses that dynamic and puts you in a much stronger position.</p>
            <p>Lenders will often approve borrowers for more than they can comfortably afford. A pre-approval letter reflects what the bank is willing to lend — not what leaves you with financial breathing room for maintenance, emergencies, property tax increases, and the inevitable costs of homeownership that do not show up in a mortgage payment. The gap between what the bank will lend and what you can actually afford is where financial stress lives.</p>
            <p>The total interest figure in the payment calculator is often the most clarifying number on this page. On a $300,000 loan at 7% over 30 years, total interest paid exceeds $418,000 — meaning you pay well over twice the loan amount by the end. This does not mean buying is wrong, but it changes how you think about extra principal payments, shorter loan terms, and the real cost of trading up to a more expensive home.</p>
          </div>
        </div>

        {/* REAL-WORLD EXAMPLE */}
        <div className="mtg-realworld">
          <p className="mtg-realworld-title">📊 Real-world example: Two buyers, same income, different outcomes</p>
          <div className="mtg-realworld-row">
            <div className="mtg-realworld-cell">
              <p className="mtg-realworld-cell-label">Buyer A: 20% down, 760 credit score</p>
              <p className="mtg-realworld-cell-val">$350,000 home</p>
              <p className="mtg-realworld-cell-sub">$70k down · $2,188/month · $418k total interest</p>
            </div>
            <div className="mtg-realworld-cell">
              <p className="mtg-realworld-cell-label">Buyer B: 5% down, 660 credit score</p>
              <p className="mtg-realworld-cell-val">$350,000 home</p>
              <p className="mtg-realworld-cell-sub">$17.5k down · $2,950/month + PMI · $487k total interest</p>
            </div>
          </div>
          <p style={{ fontSize: "12px", color: "#78350f", marginTop: ".75rem" }}>
            Buyer B pays <strong>$762 more per month</strong> and <strong>$69,000 more in total interest</strong> — for the exact same house. The difference? Down payment amount and credit score. Every percentage point in down payment and every 20 points in credit score directly affect what you can afford.
          </p>
        </div>

        {/* TIPS */}
        <div className="mtg-card">
          <p className="mtg-section-title">How to strengthen your mortgage position</p>
          <div className="mtg-tip-grid">
            <div>
              <p className="mtg-tip-num">01</p>
              <p className="mtg-tip-title">Improve your credit score first</p>
              <p className="mtg-tip-body">Your interest rate is primarily determined by your credit score. The difference between a 680 and 760 score can be 0.5-1% in rate — on a $300,000 mortgage, that is $100+ per month and over $36,000 over the life of the loan. Spending 6-12 months improving your score before applying is often the highest-return move available.</p>
            </div>
            <div>
              <p className="mtg-tip-num">02</p>
              <p className="mtg-tip-title">Pay down existing debt before applying</p>
              <p className="mtg-tip-body">Every dollar of monthly debt payment reduces the mortgage you can qualify for by roughly $12-15 in loan amount. Paying off a $300/month car loan before applying can increase your qualifying mortgage by $40,000+, depending on your lender and rate.</p>
            </div>
            <div>
              <p className="mtg-tip-num">03</p>
              <p className="mtg-tip-title">Shop multiple lenders</p>
              <p className="mtg-tip-body">Rate offers for the same borrower can vary by 0.5% or more between lenders. Getting quotes from at least three lenders takes a few hours and can save tens of thousands of dollars. Multiple credit inquiries within a 45-day window count as a single inquiry for scoring purposes.</p>
            </div>
            <div>
              <p className="mtg-tip-num">04</p>
              <p className="mtg-tip-title">Consider a 15-year term</p>
              <p className="mtg-tip-body">A 15-year mortgage typically carries a rate 0.5-0.75% lower than a 30-year, and total interest paid is dramatically less. The monthly payment is higher, but if the 28% rule still holds at the shorter term, the long-term savings are substantial.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mtg-card">
          <p className="mtg-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="mtg-faq-item" key={i}>
              <p className="mtg-faq-q">{item.q}</p>
              <p className="mtg-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED TOOLS */}
        <div className="mtg-card">
          <p className="mtg-section-title">Related tools</p>
          <p className="mtg-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="mtg-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="mtg-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="mtg-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Results assume a fixed interest rate and fixed monthly payment for the full repayment period. Actual mortgage terms, rates, and qualification requirements vary by lender. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="mtg-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}