"use client"

import { useState } from "react"
import { RELATED_LINKS as RELATED } from "./lib/links"

const css = `
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
  .mtg-dti-zone { font-size: 12px; margin-top: .4rem; }

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

  .mtg-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .mtg-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #fde68a; line-height: 1; margin-bottom: .4rem; }
  .mtg-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .mtg-tip-body { font-size: 12px; color: #888; line-height: 1.5; }

  .mtg-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .mtg-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .mtg-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .mtg-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .mtg-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .mtg-footer-links a { color: #888; text-decoration: underline; }

  @media (max-width: 600px) {
    .mtg-field-row, .mtg-field-row-3 { grid-template-columns: 1fr; }
    .mtg-result-grid { grid-template-columns: 1fr; }
    .mtg-info-grid, .mtg-tip-grid { grid-template-columns: 1fr; }
    .mtg-tabs { flex-direction: column; }
  }
`

function fmt(n) { return "$" + Math.round(n).toLocaleString("en-US") }
function fmtDec(n) { return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }

// Monthly payment formula
function monthlyPayment(principal, annualRate, years) {
  if (annualRate === 0) return principal / (years * 12)
  const r = annualRate / 100 / 12
  const n = years * 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

// Max home price from income (28% front-end DTI rule)
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

export default function Page() {
  const [mode, setMode]           = useState("afford")   // afford | payment

  // Affordability inputs
  const [grossIncome, setGrossIncome] = useState("85000")
  const [otherDebts,  setOtherDebts]  = useState("500")
  const [downPct,     setDownPct]     = useState(20)
  const [propTax,     setPropTax]     = useState("300")
  const [insurance,   setInsurance]   = useState("100")
  const [hoa,         setHoa]         = useState("0")

  // Payment inputs
  const [homePrice,   setHomePrice]   = useState("350000")
  const [downPayment, setDownPayment] = useState("70000")
  const [propTax2,    setPropTax2]    = useState("300")
  const [insurance2,  setInsurance2]  = useState("100")
  const [hoa2,        setHoa2]        = useState("0")
  const [pmi,         setPmi]         = useState("0")

  // Shared
  const [rate,  setRate]  = useState("7.0")
  const [years, setYears] = useState(30)
  const [showAmort, setShowAmort] = useState(false)

  const r  = parseFloat(rate)  || 0
  const yr = years

  // ── AFFORDABILITY MODE ──
  const monthlyGross = (parseFloat(grossIncome) || 0) / 12
  const monthlyDebts = parseFloat(otherDebts) || 0
  const taxMo        = parseFloat(propTax)    || 0
  const insMo        = parseFloat(insurance)  || 0
  const hoaMo        = parseFloat(hoa)        || 0

  const maxPrice     = maxAffordable(monthlyGross, r, yr, downPct, taxMo, insMo, hoaMo)
  const downAmt      = maxPrice * downPct / 100
  const maxLoan      = maxPrice - downAmt
  const maxPI        = maxPrice > 0 ? monthlyPayment(maxLoan, r, yr) : 0
  const maxPITI      = maxPI + taxMo + insMo + hoaMo
  const frontDTI     = monthlyGross > 0 ? (maxPITI / monthlyGross) * 100 : 0
  const backDTI      = monthlyGross > 0 ? ((maxPITI + monthlyDebts) / monthlyGross) * 100 : 0
  const dtiZone      = getDTIZone(frontDTI)

  // ── PAYMENT MODE ──
  const hp    = parseFloat(homePrice)   || 0
  const dp    = parseFloat(downPayment) || 0
  const loan  = Math.max(hp - dp, 0)
  const dp2Pct = hp > 0 ? (dp / hp) * 100 : 0
  const tax2  = parseFloat(propTax2)   || 0
  const ins2  = parseFloat(insurance2) || 0
  const hoa2v = parseFloat(hoa2)       || 0
  const pmi2  = parseFloat(pmi)        || 0
  const pi    = loan > 0 ? monthlyPayment(loan, r, yr) : 0
  const total = pi + tax2 + ins2 + hoa2v + pmi2
  const totalInterest = loan > 0 ? (pi * yr * 12) - loan : 0
  const frontDTI2 = monthlyGross > 0 ? (total / monthlyGross) * 100 : 0
  const dtiZone2  = getDTIZone(frontDTI2)
  const amortRows  = loan > 0 && r > 0 ? buildAmort(loan, r, yr) : []

  return (
    <>
      <style>{css}</style>
      <main className="mtg-wrap">

        <div className="mtg-header">
          <p className="mtg-eyebrow">Home Buying</p>
          <h1 className="mtg-title">Mortgage<br /><em>Affordability Calculator</em></h1>
        </div>

        <div className="mtg-card">
          <div className="mtg-tabs">
            <button className={"mtg-tab" + (mode === "afford" ? " on" : "")} onClick={() => setMode("afford")}>
              How much can I afford?
            </button>
            <button className={"mtg-tab" + (mode === "payment" ? " on" : "")} onClick={() => setMode("payment")}>
              What's my monthly payment?
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
                  <p className="mtg-field-hint">Combined household income before taxes</p>
                </div>
                <div>
                  <label className="mtg-field-label" htmlFor="debts">Monthly debt payments</label>
                  <div className="mtg-input-wrap">
                    <span className="mtg-prefix">$</span>
                    <input id="debts" className="mtg-input" type="number" min="0" placeholder="500"
                      value={otherDebts} onChange={e => setOtherDebts(e.target.value)} />
                  </div>
                  <p className="mtg-field-hint">Car payments, student loans, credit cards</p>
                </div>
              </div>

              <div className="mtg-range-row">
                <div className="mtg-range-header">
                  <label className="mtg-range-label">Down payment</label>
                  <span className="mtg-range-val">{downPct}%{maxPrice > 0 ? " — " + fmt(maxPrice * downPct / 100) : ""}</span>
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
                      Based on the 28% front-end DTI rule · {downPct}% down ({fmt(downAmt)}) · Loan: {fmt(maxLoan)}
                    </p>
                  </div>

                  <div className="mtg-result-grid">
                    <div className="mtg-result-cell">
                      <p className="mtg-result-cell-label">Monthly P&I</p>
                      <p className="mtg-result-cell-val amber">{fmtDec(maxPI)}</p>
                    </div>
                    <div className="mtg-result-cell">
                      <p className="mtg-result-cell-label">Total PITI</p>
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
                      <span>Front-end DTI (housing costs ÷ gross income)</span>
                      <span style={{ color: dtiZone.color }}>{frontDTI.toFixed(1)}% — {dtiZone.label}</span>
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
                  <p className="mtg-field-hint">{dp2Pct > 0 ? dp2Pct.toFixed(1) + "% of home price" : ""}{dp2Pct > 0 && dp2Pct < 20 ? " — PMI likely required" : ""}</p>
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
                  Your down payment is {dp2Pct.toFixed(1)}% — below 20%. Most lenders require PMI (typically 0.5–1.5% of loan annually). Add your estimated PMI above for a more accurate payment.
                </div>
              )}

              {loan > 0 && (
                <>
                  <div className="mtg-result-hero">
                    <p className="mtg-result-eyebrow">Total monthly payment</p>
                    <p className="mtg-result-val">{fmtDec(total)}</p>
                    <p className="mtg-result-sub">
                      Loan: {fmt(loan)} · {yr}-year term · {rate}% rate
                      {monthlyGross > 0 ? " · " + frontDTI2.toFixed(1) + "% of gross monthly income" : ""}
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
                        {monthlyGross > 0 ? frontDTI2.toFixed(1) + "%" : "—"}
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
                                <td>{row.bal < 1 ? "—" : fmt(row.bal)}</td>
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
              <p className="mtg-info-body">Front-end DTI is housing costs ÷ gross income — lenders want this below 28%. Back-end DTI adds all monthly debts — lenders typically cap this at 43%, though some programs allow up to 50% with compensating factors.</p>
            </div>
            <div className="mtg-info-item">
              <p className="mtg-info-title">PITI explained</p>
              <p className="mtg-info-body">PITI stands for Principal, Interest, Taxes, and Insurance — the four components of a true mortgage payment. Many calculators show only P&I, which understates the real monthly cost by hundreds of dollars.</p>
            </div>
            <div className="mtg-info-item">
              <p className="mtg-info-title">PMI</p>
              <p className="mtg-info-body">Private Mortgage Insurance is required by most lenders when the down payment is below 20%. It typically costs 0.5–1.5% of the loan annually and is cancelled automatically once you reach 20% equity.</p>
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
            <p>Most homebuyers start their search by browsing listings, then work backward to figure out what they can afford. This sequence creates a problem: once you've fallen in love with a home, the financial analysis feels like an obstacle rather than a guide. Starting with a clear affordability number reverses that dynamic and puts you in a much stronger negotiating position.</p>
            <p>Lenders will often approve borrowers for more than they can comfortably afford. A pre-approval letter reflects what the bank is willing to lend — not what leaves you with financial breathing room for maintenance, emergencies, property tax increases, and the inevitable costs of homeownership that don't show up in a mortgage payment. The gap between "what the bank will lend" and "what you can actually afford" is where financial stress lives.</p>
            <p>The total interest figure in the payment calculator is often the most clarifying number on this page. On a $300,000 loan at 7% over 30 years, total interest paid exceeds $418,000 — meaning you pay well over twice the loan amount by the end. This doesn't mean buying is wrong, but it changes how you think about extra principal payments, shorter loan terms, and the real cost of trading up to a more expensive home.</p>
          </div>
        </div>

        {/* TIPS */}
        <div className="mtg-card">
          <p className="mtg-section-title">How to strengthen your mortgage position</p>
          <div className="mtg-tip-grid">
            <div>
              <p className="mtg-tip-num">01</p>
              <p className="mtg-tip-title">Improve your credit score first</p>
              <p className="mtg-tip-body">Your interest rate is primarily determined by your credit score. The difference between a 680 and 760 score can be 0.5–1% in rate — on a $300,000 mortgage, that's $100+ per month and over $36,000 over the life of the loan. Spending 6–12 months improving your score before applying is often the highest-return move available.</p>
            </div>
            <div>
              <p className="mtg-tip-num">02</p>
              <p className="mtg-tip-title">Pay down existing debt before applying</p>
              <p className="mtg-tip-body">Every dollar of monthly debt payment reduces the mortgage you can qualify for by roughly $12–15 in loan amount. Paying off a $300/month car loan before applying can increase your qualifying mortgage by $40,000+, depending on your lender and rate.</p>
            </div>
            <div>
              <p className="mtg-tip-num">03</p>
              <p className="mtg-tip-title">Shop multiple lenders</p>
              <p className="mtg-tip-body">Rate offers for the same borrower can vary by 0.5% or more between lenders. Getting quotes from at least three lenders — including a credit union and an online lender — takes a few hours and can save tens of thousands of dollars over the life of the loan. Multiple credit inquiries within a 45-day window count as a single inquiry for scoring purposes.</p>
            </div>
            <div>
              <p className="mtg-tip-num">04</p>
              <p className="mtg-tip-title">Consider a 15-year term</p>
              <p className="mtg-tip-body">A 15-year mortgage typically carries a rate 0.5–0.75% lower than a 30-year, and the total interest paid is dramatically less. The monthly payment is higher, but if the 28% rule still holds at the shorter term, the long-term savings are substantial. Use the payment tab to compare both scenarios.</p>
            </div>
          </div>
        </div>

        {/* ========== MONEYWISE LINK — START ========== */}
        <div style={{ background: "#fff", border: "1px solid #e0dbd3", borderRadius: "4px", padding: "1rem 1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#888" }}>
            Looking for more free financial tools?{" "}
            <a href="https://moneywisecalculator.com" style={{ color: "#b45309", textDecoration: "underline" }}>
              Visit MoneyWiseCalculator.com
            </a>
          </p>
        </div>
        {/* ========== MONEYWISE LINK — END ========== */}

        {/* RELATED */}
        <div className="mtg-card">
          <p className="mtg-section-title">Related tools</p>
          <div className="mtg-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="mtg-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="mtg-disclaimer">
            This tool provides estimates for informational purposes only, and does not constitute financial advice. Results assume a fixed interest rate and fixed monthly payment for the full repayment period. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="mtg-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
