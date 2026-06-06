const TAX_RATE = 0.1;

const plans = [
  {
    id: "opay-spend-save",
    bank: "OPay",
    bankKey: "opay",
    name: "Spend & Save",
    type: "tiered-compound",
    headline: "15% up to ₦80k, then 5%",
    source: "User screenshot",
    verified: true,
    taxApplies: true,
    tiers: [
      { upTo: 80000, rate: 0.15, label: "First ₦80,000 at 15% p.a." },
      { upTo: Infinity, rate: 0.05, label: "Remaining balance at 5% p.a." },
    ],
    note: "Daily interest, immediate withdrawal, 10% WHT applied to interest.",
  },
  {
    id: "opay-owealth",
    bank: "OPay",
    bankKey: "opay",
    name: "OWealth",
    type: "placeholder",
    headline: "Rate needed",
    source: "Awaiting official input",
    verified: false,
    taxApplies: true,
    note: "Add OWealth rate rules here when you provide the OPay screen or official schedule.",
  },
  {
    id: "opay-safebox",
    bank: "OPay",
    bankKey: "opay",
    name: "SafeBox",
    type: "placeholder",
    headline: "Rate needed",
    source: "Awaiting official input",
    verified: false,
    taxApplies: true,
    note: "Included for future data entry; calculations stay disabled until rates are confirmed.",
  },
  {
    id: "opay-fixed",
    bank: "OPay",
    bankKey: "opay",
    name: "Fixed Savings",
    type: "placeholder",
    headline: "Rate needed",
    source: "Awaiting official input",
    verified: false,
    taxApplies: true,
    note: "Add OPay fixed-duration rates to enable this plan.",
  },
  {
    id: "palmpay-cashbox",
    bank: "PalmPay",
    bankKey: "palmpay",
    name: "CashBox",
    type: "tiered-compound",
    headline: "20%, 16%, then 8%",
    source: "User screenshot",
    verified: true,
    taxApplies: true,
    tiers: [
      { upTo: 10000, rate: 0.2, label: "First ₦10,000 at 20% p.a." },
      { upTo: 100000, rate: 0.16, label: "₦10,001-₦100,000 at 16% p.a." },
      { upTo: Infinity, rate: 0.08, label: "Remaining balance at 8% p.a." },
    ],
    note: "Screenshot says interest credited is post-tax and below ₦0.01 is not credited.",
  },
  {
    id: "palmpay-safebox",
    bank: "PalmPay",
    bankKey: "palmpay",
    name: "SafeBox",
    type: "tiered-compound",
    headline: "16% up to ₦300k, then 6%",
    source: "User screenshot",
    verified: true,
    taxApplies: true,
    tiers: [
      { upTo: 300000, rate: 0.16, label: "First ₦300,000 at 16% p.a." },
      { upTo: Infinity, rate: 0.06, label: "Remaining balance at 6% p.a." },
    ],
    note: "Screenshot says credited interest is post-tax.",
  },
  {
    id: "palmpay-fixed",
    bank: "PalmPay",
    bankKey: "palmpay",
    name: "Fixed Savings",
    type: "fixed",
    headline: "10%-20% by duration",
    source: "User screenshot",
    verified: true,
    taxApplies: true,
    fixedRates: [
      { min: 7, max: 29, rate: 0.1, label: "7-29 days at 10% p.a." },
      { min: 30, max: 59, rate: 0.1, label: "30-59 days at 10% p.a." },
      { min: 60, max: 89, rate: 0.12, label: "60-89 days at 12% p.a." },
      { min: 90, max: 179, rate: 0.15, label: "90-179 days at 15% p.a." },
      { min: 180, max: 364, rate: 0.18, label: "180-364 days at 18% p.a." },
      { min: 365, max: 1000, rate: 0.2, label: "365-1000 days at 20% p.a." },
    ],
    note: "Fixed savings estimate uses simple prorated interest for the selected lock period.",
  },
  {
    id: "palmpay-spend-save",
    bank: "PalmPay",
    bankKey: "palmpay",
    name: "Spend & Save",
    type: "placeholder",
    headline: "Rate needed",
    source: "Awaiting official input",
    verified: false,
    taxApplies: true,
    note: "PalmPay Spend & Save exists in the product list, but no rate screenshot was supplied.",
  },
  {
    id: "piggyvest-piggybank",
    bank: "PiggyVest",
    bankKey: "piggyvest",
    name: "Piggybank",
    type: "flat-compound",
    headline: "16% p.a.",
    source: "PiggyVest public FAQ/site",
    verified: true,
    taxApplies: false,
    rate: 0.16,
    note: "Publicly advertised rate can change; verify in PiggyVest before saving.",
  },
  {
    id: "piggyvest-safelock",
    bank: "PiggyVest",
    bankKey: "piggyvest",
    name: "Safelock",
    type: "fixed",
    headline: "14%-21% by duration",
    source: "PiggyVest public FAQ/site",
    verified: true,
    taxApplies: false,
    fixedRates: [
      { min: 10, max: 30, rate: 0.14, label: "10-30 days at 14% p.a." },
      { min: 31, max: 60, rate: 0.15, label: "31-60 days at 15% p.a." },
      { min: 61, max: 90, rate: 0.16, label: "61-90 days at 16% p.a." },
      { min: 91, max: 180, rate: 0.17, label: "91-180 days at 17% p.a." },
      { min: 181, max: 270, rate: 0.18, label: "181-270 days at 18% p.a." },
      { min: 271, max: 365, rate: 0.2, label: "271-365 days at 20% p.a." },
      { min: 366, max: 730, rate: 0.205, label: "Above 1-2 years at 20.5% p.a." },
      { min: 731, max: 3660, rate: 0.21, label: "Above 2 years at 21% p.a." },
    ],
    note: "PiggyVest Safelock rates are duration-dependent and market-sensitive.",
  },
  {
    id: "piggyvest-target",
    bank: "PiggyVest",
    bankKey: "piggyvest",
    name: "Target Savings",
    type: "flat-compound",
    headline: "12% p.a.",
    source: "PiggyVest public FAQ/site",
    verified: true,
    taxApplies: false,
    rate: 0.12,
    note: "Target Savings interest is accrued daily and paid at the end of the target.",
  },
];

const amountInput = document.querySelector("#amountInput");
const termSelect = document.querySelector("#termSelect");
const viewSelect = document.querySelector("#viewSelect");
const sortSelect = document.querySelector("#sortSelect");
const planCards = document.querySelector("#planCards");
const breakdown = document.querySelector("#breakdown");
const planCount = document.querySelector("#planCount");
const form = document.querySelector("#savingsForm");
const resetButton = document.querySelector("#resetButton");
const tabs = [...document.querySelectorAll(".tab")];

let state = {
  amount: 500000,
  term: 365,
  view: "net",
  bank: "all",
  selectedPlanId: "palmpay-fixed",
  sort: "maturity",
};

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 2,
});

const wholeCurrency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

function parseAmount(value) {
  return Math.max(0, Number(String(value).replace(/[^\d.]/g, "")) || 0);
}

function formatInputAmount(value) {
  return new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(value);
}

function dailyCompoundInterest(amount, rate, days) {
  return amount * (Math.pow(1 + rate, days / 365) - 1);
}

function calculateTiered(plan, amount, days) {
  let previousLimit = 0;
  const pieces = [];

  for (const tier of plan.tiers) {
    const limit = tier.upTo;
    const tierAmount = Math.max(0, Math.min(amount, limit) - previousLimit);
    if (tierAmount > 0) {
      const grossInterest = dailyCompoundInterest(tierAmount, tier.rate, days);
      pieces.push({ ...tier, amount: tierAmount, grossInterest });
    }
    previousLimit = limit;
    if (amount <= limit) break;
  }

  const grossInterest = pieces.reduce((sum, piece) => sum + piece.grossInterest, 0);
  return finalize(plan, amount, days, grossInterest, pieces);
}

function calculateFlat(plan, amount, days) {
  const grossInterest = dailyCompoundInterest(amount, plan.rate, days);
  return finalize(plan, amount, days, grossInterest, [
    { amount, rate: plan.rate, grossInterest, label: `${Math.round(plan.rate * 100)}% p.a. on full balance` },
  ]);
}

function calculateFixed(plan, amount, days) {
  const bracket = plan.fixedRates.find((rate) => days >= rate.min && days <= rate.max) || plan.fixedRates[plan.fixedRates.length - 1];
  const grossInterest = amount * bracket.rate * (days / 365);
  return finalize(plan, amount, days, grossInterest, [
    { amount, rate: bracket.rate, grossInterest, label: bracket.label },
  ]);
}

function finalize(plan, amount, days, grossInterest, pieces) {
  const tax = plan.taxApplies ? grossInterest * TAX_RATE : 0;
  const netInterest = grossInterest - tax;
  const maturity = amount + netInterest;
  const effectiveRate = amount > 0 ? grossInterest / amount / (days / 365) : 0;

  return {
    available: true,
    amount,
    days,
    grossInterest,
    tax,
    netInterest,
    maturity,
    effectiveRate,
    dailyNet: netInterest / days,
    monthlyNet: netInterest / Math.max(days / 30.4167, 1),
    yearlyNet: netInterest / Math.max(days / 365, 1),
    pieces,
  };
}

function calculate(plan, amount, days) {
  if (amount < 1000 || plan.type === "placeholder") {
    return {
      available: false,
      amount,
      days,
      grossInterest: 0,
      tax: 0,
      netInterest: 0,
      maturity: amount,
      effectiveRate: 0,
      dailyNet: 0,
      monthlyNet: 0,
      yearlyNet: 0,
      pieces: [],
    };
  }

  if (plan.type === "tiered-compound") return calculateTiered(plan, amount, days);
  if (plan.type === "flat-compound") return calculateFlat(plan, amount, days);
  if (plan.type === "fixed") return calculateFixed(plan, amount, days);
  return calculateFlat(plan, amount, days);
}

function getFilteredPlans() {
  const filtered = state.bank === "all" ? plans : plans.filter((plan) => plan.bankKey === state.bank);
  return filtered
    .map((plan) => ({ plan, result: calculate(plan, state.amount, state.term) }))
    .sort((a, b) => {
      if (state.sort === "bank") return `${a.plan.bank} ${a.plan.name}`.localeCompare(`${b.plan.bank} ${b.plan.name}`);
      if (state.sort === "rate") return b.result.effectiveRate - a.result.effectiveRate;
      if (state.sort === "interest") return b.result.netInterest - a.result.netInterest;
      return b.result.maturity - a.result.maturity;
    });
}

function renderCards() {
  const items = getFilteredPlans();
  planCount.textContent = `Showing ${items.length} ${items.length === 1 ? "plan" : "plans"}`;

  if (!items.length) {
    planCards.innerHTML = `<div class="empty">No plans match this filter.</div>`;
    return;
  }

  if (!items.some(({ plan }) => plan.id === state.selectedPlanId)) {
    state.selectedPlanId = items[0].plan.id;
  }

  planCards.innerHTML = items
    .map(({ plan, result }) => {
      const isActive = plan.id === state.selectedPlanId;
      const displayedInterest = state.view === "gross" ? result.grossInterest : result.netInterest;
      const status = plan.verified ? "Verified data" : "Needs rate";
      const statusClass = plan.verified ? "" : "warning";
      const cardClass = `plan-card ${isActive ? "active" : ""} ${plan.verified ? "" : "unverified"}`;
      const rate = result.available ? `${(result.effectiveRate * 100).toFixed(2)}% p.a.` : plan.headline;

      return `
        <article class="${cardClass}" tabindex="0" role="button" data-plan-id="${plan.id}" aria-pressed="${isActive}">
          <div class="card-top">
            <div>
              <div class="bank">${plan.bank}</div>
              <h3>${plan.name}</h3>
            </div>
            <span class="status ${statusClass}">${status}</span>
          </div>
          <div class="figures">
            <div class="metric">
              <span>${state.view === "gross" ? "Gross interest" : "Net interest"}</span>
              <strong>${result.available ? currency.format(displayedInterest) : "Pending"}</strong>
            </div>
            <div class="metric">
              <span>Maturity balance</span>
              <strong>${result.available ? currency.format(result.maturity) : "Add rate"}</strong>
            </div>
          </div>
          <div class="rate-line">${rate} · ${plan.headline}</div>
        </article>
      `;
    })
    .join("");
}

function renderBreakdown() {
  const plan = plans.find((item) => item.id === state.selectedPlanId) || plans[0];
  const result = calculate(plan, state.amount, state.term);

  if (!result.available) {
    breakdown.innerHTML = `
      <div>
        <div class="bank">${plan.bank}</div>
        <h2>${plan.name}</h2>
      </div>
      <p class="large-number">Rate needed</p>
      <div class="break-list">
        <div class="break-row"><span>Principal</span><strong>${wholeCurrency.format(state.amount)}</strong></div>
        <div class="break-row"><span>Term</span><strong>${state.term} days</strong></div>
        <div class="break-row"><span>Source status</span><strong>${plan.source}</strong></div>
      </div>
      <p class="rate-line">${plan.note}</p>
    `;
    return;
  }

  const tierMarkup = result.pieces
    .map(
      (piece) => `
        <li>
          ${piece.label}<br />
          ${wholeCurrency.format(piece.amount)} produced ${currency.format(piece.grossInterest)} gross interest
        </li>
      `,
    )
    .join("");

  breakdown.innerHTML = `
    <div>
      <div class="bank">${plan.bank}</div>
      <h2>${plan.name}</h2>
    </div>
    <p class="large-number">${currency.format(result.maturity)}</p>
    <div class="break-list">
      <div class="break-row"><span>Principal</span><strong>${currency.format(result.amount)}</strong></div>
      <div class="break-row"><span>Gross interest</span><strong>${currency.format(result.grossInterest)}</strong></div>
      <div class="break-row"><span>Withholding tax</span><strong>${currency.format(result.tax)}</strong></div>
      <div class="break-row"><span>Net interest</span><strong>${currency.format(result.netInterest)}</strong></div>
      <div class="break-row"><span>Daily net estimate</span><strong>${currency.format(result.dailyNet)}</strong></div>
      <div class="break-row"><span>Monthly net estimate</span><strong>${currency.format(result.monthlyNet)}</strong></div>
      <div class="break-row"><span>Annualized net estimate</span><strong>${currency.format(result.yearlyNet)}</strong></div>
    </div>
    <ul class="tier-list">${tierMarkup}</ul>
    <p class="rate-line">${plan.note} Source: ${plan.source}.</p>
  `;
}

function render() {
  amountInput.value = formatInputAmount(state.amount);
  termSelect.value = String(state.term);
  viewSelect.value = state.view;
  sortSelect.value = state.sort;
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.bank === state.bank));
  renderCards();
  renderBreakdown();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  state.amount = Math.max(parseAmount(amountInput.value), 1000);
  state.term = Number(termSelect.value);
  state.view = viewSelect.value;
  render();
});

amountInput.addEventListener("blur", () => {
  state.amount = Math.max(parseAmount(amountInput.value), 1000);
  render();
});

amountInput.addEventListener("input", () => {
  state.amount = parseAmount(amountInput.value);
});

termSelect.addEventListener("change", () => {
  state.term = Number(termSelect.value);
  render();
});

viewSelect.addEventListener("change", () => {
  state.view = viewSelect.value;
  render();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  render();
});

resetButton.addEventListener("click", () => {
  state = {
    amount: 500000,
    term: 365,
    view: "net",
    bank: "all",
    selectedPlanId: "palmpay-fixed",
    sort: "maturity",
  };
  render();
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    state.bank = tab.dataset.bank;
    render();
  });
});

planCards.addEventListener("click", (event) => {
  const card = event.target.closest("[data-plan-id]");
  if (!card) return;
  state.selectedPlanId = card.dataset.planId;
  render();
});

planCards.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-plan-id]");
  if (!card) return;
  event.preventDefault();
  state.selectedPlanId = card.dataset.planId;
  render();
});

render();
