"use client"

import { useState } from "react"

function fmt(n) { return "$" + Math.round(n).toLocaleString("en-US") }
function fmtDec(n) { return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }

function monthlyPayment(principal, annualRate, years) {
  if (annualRate === 0) return principal / (years * 12)
  const r = annualRate / 100 / 12
  const n = years * 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

function maxAffordable(grossMonthly, rate, years, downPct, tax, insurance, hoa) {
  const r = rate / 100 / 12
  const n = years * 12
  const maxPITI = grossMonthly * 0.28
  const maxPI   = maxPITI - tax - insurance - hoa
  if (maxPI <= 0) return 0
  if (r === 0) return maxPI * n / (1 - downPct / 100)
  const loanFactor = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const maxLoan = maxPI / loanFactor
  return maxLoan / (1 - downPct / 100)
}

function getDTIZone(dti) {
  if (dti <= 28) return { label: "Excellent", color: "#166534", bg: "#eaf5ee" }
  if (dti <= 36) return { label: "Good",      color: "#2d6a4f", bg: "#f0faf4" }
  if (dti <= 43) return { label: "Acceptable", color: "#b45309", bg: "#fefce8" }
  return              { label: "High risk",   color: "#b91c1c", bg: "#fff8f8" }
}

function buildAmort(principal, annualRate, years) {
  const r   = annualRate / 100 / 12
  const n   = years * 12
  const pmt = monthlyPayment(principal, annualRate, years)
  let bal   = principal
  const rows = []
  let totalInt = 0
  for (let mo = 1; mo <= n; mo++) {
    const intPart  = bal * r
    const prinPart = pmt - intPart
    bal -= prinPart
    totalInt += intPart
    if (mo <= 24 || mo % 12 === 0) {
      rows.push({ mo, int: intPart, prin: prinPart, bal: Math.max(bal, 0), totalInt })
    }
  }
  return rows
}

export default function MortgageCalculator() {
  const [mode, setMode] = useState("afford")

  const [grossIncome, setGrossIncome] = useState("85000")
  const [otherDebts,  setOtherDebts]  = useState("500")
  const [downPct,     setDownPct]     = useState(20)
  const [propTax,     setPropTax]     = useState("300")
  const [insurance,   setInsurance]   = useState("100")
  const [hoa,         setHoa]         = useState("0")

  const [homePrice,   setHomePrice]   = useState("350000")
  const [downPayment, setDownPayment] = useState("70000")
  const [propTax2,    setPropTax2]    = useState("300")
  const [insurance2,  setInsurance2]  = useState("100")
  const [hoa2,        setHoa2]        = useState("0")
  const [pmi,         setPmi]         = useState("0")

  const [rate,      setRate]      = useState("7.0")
  const [years,     setYears]     = useState(30)
  const [showAmort, setShowAmort] = useState(false)

  const r  = parseFloat(rate) || 0
  const yr = years

  const monthlyGross = (parseFloat(grossIncome) || 0) / 12
  const monthlyDebts = parseFloat(otherDebts) || 0
  const taxMo        = parseFloat(propTax) || 0
  const insMo        = parseFloat(insurance) || 0
  const hoaMo        = parseFloat(hoa) || 0

  const maxPrice  = maxAffordable(monthlyGross, r, yr, downPct, taxMo, insMo, hoaMo)
  const downAmt   = maxPrice * downPct / 100
  const maxLoan   = maxPrice - downAmt
  const maxPI     = maxPrice > 0 ? monthlyPayment(maxLoan, r, yr) : 0
  const maxPITI   = maxPI + taxMo + insMo + hoaMo
  const frontDTI  = monthlyGross > 0 ? (maxPITI / monthlyGross) * 100 : 0
  const backDTI   = monthlyGross > 0 ? ((maxPITI + monthlyDebts) / monthlyGross) * 100 : 0
  const dtiZone   = getDTIZone(frontDTI)

  const hp      = parseFloat(homePrice) || 0
  const dp      = parseFloat(downPayment) || 0
  const loan    = Math.max(hp - dp, 0)
  const dp2Pct  = hp > 0 ? (dp / hp) * 100 : 0
  const tax2    = parseFloat(propTax2) || 0
  const ins2    = parseFloat(insurance2) || 0
  const hoa2v   = parseFloat(hoa2) || 0
  const pmi2    = parseFloat(pmi) || 0
  const pi      = loan > 0 ? monthlyPayment(loan, r, yr) : 0
  const total   = pi + tax2 + ins2 + hoa2v + pmi2
  const totalInterest = loan > 0 ? (pi * yr * 12) - loan : 0
  const frontDTI2 = monthlyGross > 0 ? (total / monthlyGross) * 100 : 0
  const dtiZone2  = getDTIZone(frontDTI2)
  const amortRows = loan > 0 && r > 0 ? buildAmort(loan, r, yr) : []

  return (
    <div className="mtg-card">
      <div className="mtg-tabs">
        <button className={"mtg-tab" + (mode === "afford" ? " on" : "")} onClick={() => setMode("afford")}>
          How much can I afford?
        </button>
        <button className={"mtg-tab" + (mode === "payment" ? " on" : "")} onClick={() => setMode("payment")}>
          What is my monthly payment?
        </button>
      </div>

      {/* SHARED INPUTS */}
      <div className="mtg-field-row">
        <div>
          <label className="mtg-field-label" htmlFor="rate">Interest rate</label>
          <div className="mtg-input-wrap">
            <input id="rate" className="mtg-input no-prefix" type="number" min="0" step="0.05" placeholder="7.0"
              value={rate} onChange={e => setRate(e.target.value)} />
            <span className="mtg-suffix">%</span>
          </div>
          <p className="mtg-field-hint">Current 30-yr fixed average ~7%</p>
        </div>
        <div>
          <div className="mtg-range-row" style={{ marginBottom: 0 }}>
            <div className="mtg-range-header">
              <label className="mtg-range-label" htmlFor="years">Loan term</label>
              <span className="mtg-range-val">{years} yrs</span>
            </div>
            <input id="years" type="range" min="10" max="30" step="5" className="mtg-range"
              value={years} onChange={e => setYears(Number(e.target.value))} />
            <div className="mtg-dti-markers" style={{ marginTop: ".25rem" }}>
              <span>10</span><span>15</span><span>20</span><span>25</span><span>30</span>
            </div>
          </div>
        </div>
      </div>

      {mode === "afford" ? (
        <>
          <div className="mtg-field-row">
            <div>
              <label className="mtg-field-label" htmlFor="income">Annual gross income</label>
              <div className="mtg-input-wrap">
                <span className="mtg-prefix">$</span>
                <input id="income" className="mtg-input" type="number" min="0" placeholder="85000"
                  value={grossIncome} onChange={e => setGrossIncome(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mtg-field-label" htmlFor="debts">Other monthly debts</label>
              <div className="mtg-input-wrap">
                <span className="mtg-prefix">$</span>
                <input id="debts" className="mtg-input" type="number" min="0" placeholder="500"
                  value={otherDebts} onChange={e => setOtherDebts(e.target.value)} />
              </div>
              <p className="mtg-field-hint">Car, student loans, credit cards</p>
            </div>
          </div>

          <div className="mtg-range-row">
            <div className="mtg-range-header">
              <label className="mtg-range-label">Down payment</label>
              <span className="mtg-range-val">{downPct}%</span>
            </div>
            <input type="range" min="3" max="40" step="1" className="mtg-range"
              value={downPct} onChange={e => setDownPct(Number(e.target.value))} />
            <div className="mtg-dti-markers">
              <span>3%</span><span>10%</span><span>20%</span><span>30%</span><span>40%</span>
            </div>
          </div>

          <div className="mtg-field-row-3">
            <div>
              <label className="mtg-field-label" htmlFor="ptax">Property tax /mo</label>
              <div className="mtg-input-wrap">
                <span className="mtg-prefix">$</span>
                <input id="ptax" className="mtg-input" type="number" min="0" placeholder="300"
                  value={propTax} onChange={e => setPropTax(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mtg-field-label" htmlFor="ins">Home insurance /mo</label>
              <div className="mtg-input-wrap">
                <span className="mtg-prefix">$</span>
                <input id="ins" className="mtg-input" type="number" min="0" placeholder="100"
                  value={insurance} onChange={e => setInsurance(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mtg-field-label" htmlFor="hoa">HOA fees /mo</label>
              <div className="mtg-input-wrap">
                <span className="mtg-prefix">$</span>
                <input id="hoa" className="mtg-input" type="number" min="0" placeholder="0"
                  value={hoa} onChange={e => setHoa(e.target.value)} />
              </div>
            </div>
          </div>

          {maxPrice > 0 && (
            <>
              <div className="mtg-result-hero">
                <p className="mtg-result-eyebrow">Maximum affordable home price</p>
                <p className="mtg-result-val">{fmt(maxPrice)}</p>
                <p className="mtg-result-sub">
                  {downPct}% down ({fmt(downAmt)}) &middot; Loan: {fmt(maxLoan)} &middot; {yr}-year term at {rate}%
                </p>
              </div>

              <div className="mtg-result-grid">
                <div className="mtg-result-cell">
                  <p className="mtg-result-cell-label">Max P&amp;I payment</p>
                  <p className="mtg-result-cell-val amber">{fmtDec(maxPI)}</p>
                </div>
                <div className="mtg-result-cell">
                  <p className="mtg-result-cell-label">Total PITI payment</p>
                  <p className="mtg-result-cell-val amber">{fmtDec(maxPITI)}</p>
                </div>
                <div className="mtg-result-cell">
                  <p className="mtg-result-cell-label">Back-end DTI</p>
                  <p className={"mtg-result-cell-val " + (backDTI <= 36 ? "green" : backDTI <= 43 ? "amber" : "red")}>
                    {backDTI.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="mtg-dti-section">
                <div className="mtg-dti-label">
                  <span>Front-end DTI (housing costs / gross income)</span>
                  <span style={{ color: dtiZone.color }}>{frontDTI.toFixed(1)}% - {dtiZone.label}</span>
                </div>
                <div className="mtg-dti-track">
                  <div className="mtg-dti-fill" style={{ width: Math.min(frontDTI / 50 * 100, 100) + "%", background: dtiZone.color }} />
                </div>
                <div className="mtg-dti-markers">
                  <span>0%</span><span>28% ideal</span><span>36%</span><span>43% max</span><span>50%</span>
                </div>
              </div>

              {backDTI > 43 && (
                <div className="mtg-warn">
                  Your back-end DTI of {backDTI.toFixed(1)}% (including other debts) exceeds the 43% threshold most lenders use. You may have difficulty qualifying at this price. Consider paying down existing debts or increasing your down payment.
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div className="mtg-field-row">
            <div>
              <label className="mtg-field-label" htmlFor="hp">Home price</label>
              <div className="mtg-input-wrap">
                <span className="mtg-prefix">$</span>
                <input id="hp" className="mtg-input" type="number" min="0" placeholder="350000"
                  value={homePrice} onChange={e => setHomePrice(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mtg-field-label" htmlFor="dp">Down payment</label>
              <div className="mtg-input-wrap">
                <span className="mtg-prefix">$</span>
                <input id="dp" className="mtg-input" type="number" min="0" placeholder="70000"
                  value={downPayment} onChange={e => setDownPayment(e.target.value)} />
              </div>
              <p className="mtg-field-hint">
                {dp2Pct > 0 ? dp2Pct.toFixed(1) + "% of home price" : ""}
                {dp2Pct > 0 && dp2Pct < 20 ? " - PMI likely required" : ""}
              </p>
            </div>
          </div>

          <div className="mtg-field-row-3">
            <div>
              <label className="mtg-field-label" htmlFor="ptax2">Property tax /mo</label>
              <div className="mtg-input-wrap">
                <span className="mtg-prefix">$</span>
                <input id="ptax2" className="mtg-input" type="number" min="0" placeholder="300"
                  value={propTax2} onChange={e => setPropTax2(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mtg-field-label" htmlFor="ins2">Home insurance /mo</label>
              <div className="mtg-input-wrap">
                <span className="mtg-prefix">$</span>
                <input id="ins2" className="mtg-input" type="number" min="0" placeholder="100"
                  value={insurance2} onChange={e => setInsurance2(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="mtg-field-label" htmlFor="pmi2">PMI /mo</label>
              <div className="mtg-input-wrap">
                <span className="mtg-prefix">$</span>
                <input id="pmi2" className="mtg-input" type="number" min="0" placeholder="0"
                  value={pmi} onChange={e => setPmi(e.target.value)} />
              </div>
              <p className="mtg-field-hint">Required if down &lt; 20%</p>
            </div>
          </div>

          {dp2Pct < 20 && dp2Pct > 0 && parseFloat(pmi) === 0 && (
            <div className="mtg-warn">
              Your down payment is {dp2Pct.toFixed(1)}% - below 20%. Most lenders require PMI (typically 0.5-1.5% of loan annually). Add your estimated PMI above for a more accurate payment.
            </div>
          )}

          {loan > 0 && (
            <>
              <div className="mtg-result-hero">
                <p className="mtg-result-eyebrow">Total monthly payment</p>
                <p className="mtg-result-val">{fmtDec(total)}</p>
                <p className="mtg-result-sub">
                  Loan: {fmt(loan)} &middot; {yr}-year term &middot; {rate}% rate
                  {monthlyGross > 0 ? " \u00b7 " + frontDTI2.toFixed(1) + "% of gross monthly income" : ""}
                </p>
              </div>

              <div className="mtg-payment-breakdown">
                <p className="mtg-payment-title">Monthly payment breakdown</p>
                <div className="mtg-payment-rows">
                  {[
                    { label: "Principal & Interest", val: pi },
                    { label: "Property Tax",         val: tax2 },
                    { label: "Home Insurance",       val: ins2 },
                    ...(hoa2v > 0 ? [{ label: "HOA Fees", val: hoa2v }] : []),
                    ...(pmi2  > 0 ? [{ label: "PMI",      val: pmi2  }] : []),
                    { label: "Total", val: total, isTotal: true },
                  ].map((row, i) => (
                    <div className="mtg-payment-row" key={i}>
                      <span className="mtg-payment-row-label">{row.label}</span>
                      <span className={"mtg-payment-row-val" + (row.isTotal ? " total" : "")}>{fmtDec(row.val)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mtg-result-grid" style={{ marginBottom: "1rem" }}>
                <div className="mtg-result-cell">
                  <p className="mtg-result-cell-label">Total interest paid</p>
                  <p className="mtg-result-cell-val red">{fmt(totalInterest)}</p>
                </div>
                <div className="mtg-result-cell">
                  <p className="mtg-result-cell-label">Total cost of loan</p>
                  <p className="mtg-result-cell-val">{fmt(loan + totalInterest)}</p>
                </div>
                <div className="mtg-result-cell">
                  <p className="mtg-result-cell-label">Front-end DTI</p>
                  <p className={"mtg-result-cell-val " + (frontDTI2 <= 28 ? "green" : frontDTI2 <= 36 ? "amber" : "red")}>
                    {monthlyGross > 0 ? frontDTI2.toFixed(1) + "%" : "-"}
                  </p>
                </div>
              </div>

              {amortRows.length > 0 && (
                <>
                  <span className="mtg-amort-toggle" onClick={() => setShowAmort(s => !s)}>
                    {showAmort ? "Hide" : "Show"} amortization schedule
                  </span>
                  <div className={"mtg-amort" + (showAmort ? " show" : "")}>
                    <table className="mtg-amort-table">
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Principal</th>
                          <th>Interest</th>
                          <th>Total interest</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortRows.map((row, i) => (
                          <tr key={i}>
                            <td>{row.mo}</td>
                            <td>{fmtDec(row.prin)}</td>
                            <td>{fmtDec(row.int)}</td>
                            <td>{fmt(row.totalInt)}</td>
                            <td>{row.bal < 1 ? "-" : fmt(row.bal)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
