const TAX_RATE = 0.1;
const STORAGE_KEY = "mfb-saving-calculator-plan-settings";

let plans = [
  {
    id: "opay-spend-save",
    bank: "OPay",
    bankKey: "opay",
    name: "Spend & Save",
    type: "tiered-compound",
    headline: "15% up to ₦80k, then 5%",
    source: "Plan rate details provided for this calculator",
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
    type: "balance-threshold-compound",
    headline: "15% up to ₦80k balance, 5% above",
    source: "Plan rate details provided for this calculator",
    verified: true,
    taxApplies: true,
    balanceRules: [
      { maxBalance: 80000, rate: 0.15, label: "Balances of ₦80,000 and below at 15% p.a." },
      { maxBalance: Infinity, rate: 0.05, label: "Balances above ₦80,000 at 5% p.a. on the full balance" },
    ],
    note: "Interest is calculated daily, paid on the first day of the next month, and reduced by 10% withholding tax. The provided rate wording applies 15% only up to a total balance of ₦80,000; above that threshold, the full balance uses 5%.",
  },
  {
    id: "opay-safebox",
    bank: "OPay",
    bankKey: "opay",
    name: "SafeBox",
    type: "tiered-compound",
    headline: "15% up to ₦300k, then 6%",
    source: "Plan rate details provided for this calculator",
    verified: true,
    taxApplies: true,
    tiers: [
      { upTo: 300000, rate: 0.15, label: "First ₦300,000 at 15% p.a." },
      { upTo: Infinity, rate: 0.06, label: "Remaining balance at 6% p.a." },
    ],
    note: "Lock periods can be monthly, quarterly, or annually. Withdrawal windows can be monthly, quarterly, or annual; quarterly window breaks carry a 2.5% fee.",
  },
  {
    id: "opay-fixed",
    bank: "OPay",
    bankKey: "opay",
    name: "Fixed Savings",
    type: "fixed",
    headline: "15%-18% by duration",
    source: "Plan rate details provided for this calculator",
    verified: true,
    taxApplies: true,
    fixedRates: [
      { min: 7, max: 60, rate: 0.15, label: "7-60 days at 15% p.a." },
      { min: 61, max: 180, rate: 0.16, label: "61-180 days at 16% p.a." },
      { min: 181, max: 364, rate: 0.17, label: "181-364 days at 17% p.a." },
      {
        min: 365,
        max: 1000,
        rate: 0.18,
        label: "365-1000 days at up to 18% p.a.",
        tiers: [
          { upTo: 300000, rate: 0.18, label: "First ₦300,000 at 18% p.a." },
          { upTo: Infinity, rate: 0.09, label: "Remaining balance at 9% p.a." },
        ],
      },
    ],
    note: "Interest is prorated by duration and reduced by 10% withholding tax. For the 365-1000 day example provided, the first ₦300,000 earns 18% while the balance earns 9%.",
  },
  {
    id: "palmpay-cashbox",
    bank: "PalmPay",
    bankKey: "palmpay",
    name: "CashBox",
    type: "tiered-compound",
    headline: "20%, 16%, then 8%",
    source: "Plan rate details provided for this calculator",
    verified: true,
    taxApplies: true,
    tiers: [
      { upTo: 10000, rate: 0.2, label: "First ₦10,000 at 20% p.a." },
      { upTo: 100000, rate: 0.16, label: "₦10,001-₦100,000 at 16% p.a." },
      { upTo: Infinity, rate: 0.08, label: "Remaining balance at 8% p.a." },
    ],
    note: "Interest credited is post-tax, and amounts below ₦0.01 are not credited.",
  },
  {
    id: "palmpay-safebox",
    bank: "PalmPay",
    bankKey: "palmpay",
    name: "SafeBox",
    type: "tiered-compound",
    headline: "16% up to ₦300k, then 6%",
    source: "Plan rate details provided for this calculator",
    verified: true,
    taxApplies: true,
    tiers: [
      { upTo: 300000, rate: 0.16, label: "First ₦300,000 at 16% p.a." },
      { upTo: Infinity, rate: 0.06, label: "Remaining balance at 6% p.a." },
    ],
    note: "Credited interest is post-tax.",
  },
  {
    id: "palmpay-fixed",
    bank: "PalmPay",
    bankKey: "palmpay",
    name: "Fixed Savings",
    type: "fixed",
    headline: "10%-20% by duration",
    source: "Plan rate details provided for this calculator",
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
    type: "tiered-compound",
    headline: "20%, 16%, then 8%",
    source: "Plan rate details provided for this calculator",
    verified: true,
    taxApplies: true,
    tiers: [
      { upTo: 10000, rate: 0.2, label: "First ₦10,000 at 20% p.a." },
      { upTo: 100000, rate: 0.16, label: "₦10,001-₦100,000 at 16% p.a." },
      { upTo: Infinity, rate: 0.08, label: "Remaining balance at 8% p.a." },
    ],
    note: "Interest credited is post-tax, and no interest is added if the credited amount is below 0.01.",
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

const defaultPlans = plans.map(clonePlan);

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
const rateSettingsForm = document.querySelector("#rateSettingsForm");
const settingsPlanSelect = document.querySelector("#settingsPlanSelect");
const settingsBankInput = document.querySelector("#settingsBankInput");
const settingsPlanNameInput = document.querySelector("#settingsPlanNameInput");
const settingsModelSelect = document.querySelector("#settingsModelSelect");
const settingsTaxInput = document.querySelector("#settingsTaxInput");
const settingsVerifiedInput = document.querySelector("#settingsVerifiedInput");
const settingsSourceInput = document.querySelector("#settingsSourceInput");
const settingsNoteInput = document.querySelector("#settingsNoteInput");
const tierEditor = document.querySelector("#tierEditor");
const addTierButton = document.querySelector("#addTierButton");
const newPlanButton = document.querySelector("#newPlanButton");
const resetPlanButton = document.querySelector("#resetPlanButton");
const settingsStatus = document.querySelector("#settingsStatus");

let state = {
  amount: 500000,
  term: 365,
  view: "net",
  bank: "all",
  selectedPlanId: "palmpay-fixed",
  settingsPlanId: "palmpay-cashbox",
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

function clonePlan(plan) {
  return {
    ...plan,
    tiers: plan.tiers?.map((tier) => ({ ...tier })),
    fixedRates: plan.fixedRates?.map((rate) => ({ ...rate })),
  };
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseAmount(value) {
  return Math.max(0, Number(String(value).replace(/[^\d.]/g, "")) || 0);
}

function formatInputAmount(value) {
  return new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(value);
}

function formatPercent(rate) {
  return `${Number((rate * 100).toFixed(2))}%`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeStoredPlan(plan) {
  const normalized = clonePlan(plan);
  if (normalized.tiers) {
    normalized.tiers = normalized.tiers.map((tier) => ({
      ...tier,
      upTo: tier.upTo === null ? Infinity : Number(tier.upTo),
      rate: Number(tier.rate),
    }));
  }
  if (normalized.fixedRates) {
    normalized.fixedRates = normalized.fixedRates.map((rate) => ({ ...rate, rate: Number(rate.rate) }));
  }
  return normalized;
}

function preparePlanForStorage(plan) {
  const stored = clonePlan(plan);
  if (stored.tiers) {
    stored.tiers = stored.tiers.map((tier) => ({
      ...tier,
      upTo: Number.isFinite(tier.upTo) ? tier.upTo : null,
    }));
  }
  return stored;
}

function savePlansToStorage() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      plans: plans.map(preparePlanForStorage),
      savedAt: new Date().toISOString(),
    }),
  );
}

function mergeNewBuiltInRates() {
  plans = plans.map((plan) => {
    const builtInPlan = defaultPlans.find((item) => item.id === plan.id);
    if (!builtInPlan) return plan;
    if (plan.type === "placeholder" && builtInPlan.type !== "placeholder") return clonePlan(builtInPlan);
    return plan;
  });
}

function loadPlansFromStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (Array.isArray(saved.plans)) {
      plans = saved.plans.map(normalizeStoredPlan);
      mergeNewBuiltInRates();
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function getTierLabel(tiers, index) {
  const tier = tiers[index];
  const previousLimit = index === 0 ? 0 : tiers[index - 1].upTo;
  const rateText = `${formatPercent(tier.rate)} p.a.`;

  if (!Number.isFinite(tier.upTo)) return `Above ${wholeCurrency.format(previousLimit)} at ${rateText}`;
  if (index === 0) return `First ${wholeCurrency.format(tier.upTo)} at ${rateText}`;
  return `${wholeCurrency.format(previousLimit + 1)}-${wholeCurrency.format(tier.upTo)} at ${rateText}`;
}

function applyTierLabels(tiers) {
  return tiers.map((tier, index) => ({ ...tier, label: getTierLabel(tiers, index) }));
}

function generateHeadline(plan) {
  if (plan.type === "flat-compound") return `${formatPercent(plan.rate)} p.a.`;
  if (!plan.tiers?.length) return "Rate needed";

  const rates = plan.tiers.map((tier) => formatPercent(tier.rate));
  if (plan.tiers.length === 1) return `${rates[0]} p.a.`;
  if (plan.tiers.length === 2 && Number.isFinite(plan.tiers[0].upTo)) {
    return `${rates[0]} up to ${wholeCurrency.format(plan.tiers[0].upTo)}, then ${rates[1]}`;
  }
  return `${rates.slice(0, -1).join(", ")}, then ${rates.at(-1)}`;
}

function setSettingsStatus(message) {
  settingsStatus.textContent = message;
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

function calculateBalanceThreshold(plan, amount, days) {
  const rule = plan.balanceRules.find((item) => amount <= item.maxBalance) || plan.balanceRules[plan.balanceRules.length - 1];
  const grossInterest = dailyCompoundInterest(amount, rule.rate, days);
  return finalize(plan, amount, days, grossInterest, [{ amount, rate: rule.rate, grossInterest, label: rule.label }]);
}

function calculateFixed(plan, amount, days) {
  const bracket = plan.fixedRates.find((rate) => days >= rate.min && days <= rate.max) || plan.fixedRates[plan.fixedRates.length - 1];

  if (bracket.tiers?.length) {
    let previousLimit = 0;
    const pieces = [];

    for (const tier of bracket.tiers) {
      const limit = tier.upTo;
      const tierAmount = Math.max(0, Math.min(amount, limit) - previousLimit);
      if (tierAmount > 0) {
        const grossInterest = tierAmount * tier.rate * (days / 365);
        pieces.push({ ...tier, amount: tierAmount, grossInterest });
      }
      previousLimit = limit;
      if (amount <= limit) break;
    }

    const grossInterest = pieces.reduce((sum, piece) => sum + piece.grossInterest, 0);
    return finalize(plan, amount, days, grossInterest, pieces);
  }

  const grossInterest = amount * bracket.rate * (days / 365);
  return finalize(plan, amount, days, grossInterest, [{ amount, rate: bracket.rate, grossInterest, label: bracket.label }]);
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
    weeklyNet: netInterest / Math.max(days / 7, 1),
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
      weeklyNet: 0,
      monthlyNet: 0,
      yearlyNet: 0,
      pieces: [],
    };
  }

  if (plan.type === "tiered-compound") return calculateTiered(plan, amount, days);
  if (plan.type === "flat-compound") return calculateFlat(plan, amount, days);
  if (plan.type === "balance-threshold-compound") return calculateBalanceThreshold(plan, amount, days);
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
      const dayValue = result.available ? currency.format(result.dailyNet) : "Pending";
      const weekValue = result.available ? currency.format(result.weeklyNet) : "Pending";

      return `
        <article class="${cardClass}" tabindex="0" role="button" data-plan-id="${plan.id}" aria-pressed="${isActive}">
          <div class="card-top">
            <div>
              <div class="bank">${escapeHTML(plan.bank)}</div>
              <h3>${escapeHTML(plan.name)}</h3>
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
          <div class="earn-rate">
            <div><span>Per day</span><strong>${dayValue}</strong></div>
            <div><span>Per week</span><strong>${weekValue}</strong></div>
          </div>
          <div class="rate-line">${escapeHTML(rate)} · ${escapeHTML(plan.headline)}</div>
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
        <div class="bank">${escapeHTML(plan.bank)}</div>
        <h2>${escapeHTML(plan.name)}</h2>
      </div>
      <p class="large-number">Rate needed</p>
      <div class="break-list">
        <div class="break-row"><span>Principal</span><strong>${wholeCurrency.format(state.amount)}</strong></div>
        <div class="break-row"><span>Term</span><strong>${state.term} days</strong></div>
        <div class="break-row"><span>Source status</span><strong>${escapeHTML(plan.source)}</strong></div>
      </div>
      <p class="rate-line">${escapeHTML(plan.note)}</p>
    `;
    return;
  }

  const tierMarkup = result.pieces
    .map(
      (piece) => `
        <li>
          ${escapeHTML(piece.label)}<br />
          ${wholeCurrency.format(piece.amount)} produced ${currency.format(piece.grossInterest)} gross interest
        </li>
      `,
    )
    .join("");

  breakdown.innerHTML = `
    <div>
      <div class="bank">${escapeHTML(plan.bank)}</div>
      <h2>${escapeHTML(plan.name)}</h2>
    </div>
    <p class="large-number">${currency.format(result.maturity)}</p>
    <div class="break-list">
      <div class="break-row"><span>Principal</span><strong>${currency.format(result.amount)}</strong></div>
      <div class="break-row"><span>Gross interest</span><strong>${currency.format(result.grossInterest)}</strong></div>
      <div class="break-row"><span>Withholding tax</span><strong>${currency.format(result.tax)}</strong></div>
      <div class="break-row"><span>Net interest</span><strong>${currency.format(result.netInterest)}</strong></div>
      <div class="break-row"><span>Daily net estimate</span><strong>${currency.format(result.dailyNet)}</strong></div>
      <div class="break-row"><span>Weekly net estimate</span><strong>${currency.format(result.weeklyNet)}</strong></div>
      <div class="break-row"><span>Monthly net estimate</span><strong>${currency.format(result.monthlyNet)}</strong></div>
      <div class="break-row"><span>Annualized net estimate</span><strong>${currency.format(result.yearlyNet)}</strong></div>
    </div>
    <ul class="tier-list">${tierMarkup}</ul>
    <p class="rate-line">${escapeHTML(plan.note)} Source: ${escapeHTML(plan.source)}.</p>
  `;
}

function getEditableTiers(plan) {
  if (plan.tiers?.length) return plan.tiers;
  if (plan.type === "flat-compound" && Number.isFinite(plan.rate)) {
    return [{ upTo: Infinity, rate: plan.rate, label: `${formatPercent(plan.rate)} p.a. on full balance` }];
  }
  return [
    { upTo: 10000, rate: 0.2, label: "First ₦10,000 at 20% p.a." },
    { upTo: 100000, rate: 0.16, label: "₦10,001-₦100,000 at 16% p.a." },
    { upTo: Infinity, rate: 0.08, label: "Above ₦100,000 at 8% p.a." },
  ];
}

function renderSettingsPlanOptions() {
  const currentPlanId = settingsPlanSelect.value || state.settingsPlanId;
  settingsPlanSelect.innerHTML = plans
    .map((plan) => `<option value="${plan.id}">${escapeHTML(plan.bank)} · ${escapeHTML(plan.name)}</option>`)
    .join("");

  const nextPlanId = plans.some((plan) => plan.id === currentPlanId) ? currentPlanId : plans[0].id;
  settingsPlanSelect.value = nextPlanId;
  state.settingsPlanId = nextPlanId;
}

function renderTierRows(tiers) {
  tierEditor.innerHTML = tiers
    .map((tier, index) => {
      const isAboveTier = !Number.isFinite(tier.upTo);
      const amountValue = isAboveTier ? "" : formatInputAmount(tier.upTo || 0);
      const amountLabel = isAboveTier ? "Ceiling amount (blank = above final range)" : "Ceiling amount";
      const removeDisabled = tiers.length === 1 ? "disabled" : "";

      return `
        <div class="tier-row" data-tier-row>
          <label>
            <span>${amountLabel}</span>
            <input data-tier-limit type="text" inputmode="numeric" value="${escapeHTML(amountValue)}" placeholder="Leave blank for above" />
          </label>
          <label>
            <span>Annual rate (%)</span>
            <input data-tier-rate type="number" min="0" step="0.01" value="${Number((tier.rate * 100).toFixed(2))}" />
          </label>
          <button class="secondary-button compact-button remove-tier" type="button" ${removeDisabled}>Remove</button>
        </div>
      `;
    })
    .join("");
}

function readTierRows() {
  return [...tierEditor.querySelectorAll("[data-tier-row]")].map((row) => {
    const limitInput = row.querySelector("[data-tier-limit]");
    const rateInput = row.querySelector("[data-tier-rate]");
    const limitValue = limitInput.value.trim();

    return {
      upTo: limitValue ? parseAmount(limitValue) : Infinity,
      rate: Number(rateInput.value) / 100,
    };
  });
}

function normalizeTierRows(model) {
  const rows = readTierRows();
  const tiers = [];

  for (const [index, row] of rows.entries()) {
    if (!Number.isFinite(row.rate) || row.rate <= 0) {
      throw new Error("Each range needs an annual rate above 0%.");
    }

    if (model === "flat-compound") {
      return [{ upTo: Infinity, rate: row.rate }];
    }

    if (!Number.isFinite(row.upTo) && index !== rows.length - 1) {
      throw new Error("Only the final range can have a blank ceiling.");
    }

    if (Number.isFinite(row.upTo) && row.upTo <= 0) {
      throw new Error("Range ceilings must be greater than ₦0.");
    }

    const previous = tiers.at(-1);
    if (previous && Number.isFinite(row.upTo) && row.upTo <= previous.upTo) {
      throw new Error("Each ceiling must be higher than the range before it.");
    }

    tiers.push(row);
  }

  if (!tiers.length) throw new Error("Add at least one rate range.");
  if (Number.isFinite(tiers.at(-1).upTo)) {
    tiers.push({ upTo: Infinity, rate: tiers.at(-1).rate });
  }

  return tiers;
}

function populateSettings(planId) {
  const plan = plans.find((item) => item.id === planId) || plans[0];
  const supportedModel = plan.type === "flat-compound" ? "flat-compound" : "tiered-compound";

  state.settingsPlanId = plan.id;
  settingsPlanSelect.value = plan.id;
  settingsBankInput.value = plan.bank;
  settingsPlanNameInput.value = plan.name;
  settingsModelSelect.value = supportedModel;
  settingsTaxInput.checked = plan.taxApplies;
  settingsVerifiedInput.checked = plan.type !== "placeholder" && plan.verified;
  settingsSourceInput.value = plan.source || "Custom rate settings";
  settingsNoteInput.value = plan.note || "";
  renderTierRows(getEditableTiers(plan));
}

function saveSelectedPlanSettings() {
  const plan = plans.find((item) => item.id === state.settingsPlanId);
  if (!plan) return;

  const model = settingsModelSelect.value;
  const tiers = normalizeTierRows(model);
  const bank = settingsBankInput.value.trim() || plan.bank;
  const name = settingsPlanNameInput.value.trim() || plan.name;

  plan.bank = bank;
  plan.bankKey = slugify(bank) || plan.bankKey;
  plan.name = name;
  plan.type = model;
  plan.verified = settingsVerifiedInput.checked;
  plan.taxApplies = settingsTaxInput.checked;
  plan.source = settingsSourceInput.value.trim() || "Custom rate settings";
  plan.note = settingsNoteInput.value.trim() || "Rates were customized in the calculator settings.";

  if (model === "flat-compound") {
    plan.rate = tiers[0].rate;
    delete plan.tiers;
  } else {
    plan.tiers = applyTierLabels(tiers);
    delete plan.rate;
  }

  plan.headline = generateHeadline(plan);
  savePlansToStorage();
  state.selectedPlanId = plan.id;
  render();
  populateSettings(plan.id);
  setSettingsStatus(`${plan.bank} ${plan.name} rate settings applied.`);
}

function addCustomPlan() {
  const id = `custom-${Date.now()}`;
  const customPlan = {
    id,
    bank: "New MFB",
    bankKey: "new-mfb",
    name: "Custom Savings",
    type: "tiered-compound",
    headline: "20%, 16%, then 8%",
    source: settingsSourceInput.value.trim() || "Custom rate settings",
    verified: true,
    taxApplies: true,
    tiers: applyTierLabels([
      { upTo: 10000, rate: 0.2 },
      { upTo: 100000, rate: 0.16 },
      { upTo: Infinity, rate: 0.08 },
    ]),
    note: "Custom amount-tiered rates can be edited in Rate Settings.",
  };

  plans.push(customPlan);
  state.settingsPlanId = id;
  state.selectedPlanId = id;
  savePlansToStorage();
  render();
  populateSettings(id);
  setSettingsStatus("New custom MFB plan added with editable example tiers.");
}

function resetSelectedPlan() {
  const planIndex = plans.findIndex((plan) => plan.id === state.settingsPlanId);
  if (planIndex === -1) return;

  const defaultPlan = defaultPlans.find((plan) => plan.id === state.settingsPlanId);
  if (defaultPlan) {
    plans[planIndex] = clonePlan(defaultPlan);
    state.selectedPlanId = defaultPlan.id;
    savePlansToStorage();
    render();
    populateSettings(defaultPlan.id);
    setSettingsStatus(`${defaultPlan.bank} ${defaultPlan.name} reset to the built-in rates.`);
    return;
  }

  const removed = plans.splice(planIndex, 1)[0];
  state.settingsPlanId = plans[0].id;
  state.selectedPlanId = plans[0].id;
  savePlansToStorage();
  render();
  populateSettings(state.settingsPlanId);
  setSettingsStatus(`${removed.bank} ${removed.name} removed from custom plans.`);
}

function render() {
  amountInput.value = formatInputAmount(state.amount);
  termSelect.value = String(state.term);
  viewSelect.value = state.view;
  sortSelect.value = state.sort;
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.bank === state.bank));
  renderSettingsPlanOptions();
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
    settingsPlanId: state.settingsPlanId,
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

settingsPlanSelect.addEventListener("change", () => {
  populateSettings(settingsPlanSelect.value);
  setSettingsStatus("");
});

settingsModelSelect.addEventListener("change", () => {
  const tiers = readTierRows();
  renderTierRows(settingsModelSelect.value === "flat-compound" ? [tiers[0] || { upTo: Infinity, rate: 0.1 }] : tiers);
});

addTierButton.addEventListener("click", () => {
  const tiers = readTierRows();
  const finalOpenTierIndex = tiers.findIndex((tier) => !Number.isFinite(tier.upTo));
  const newTier = { upTo: "", rate: 0.1 };

  if (finalOpenTierIndex >= 0) {
    tiers.splice(finalOpenTierIndex, 0, newTier);
  } else {
    tiers.push(newTier);
  }

  renderTierRows(tiers);
  setSettingsStatus("Added a new editable range.");
});

tierEditor.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-tier");
  if (!removeButton) return;

  const row = removeButton.closest("[data-tier-row]");
  row.remove();
  setSettingsStatus("Range removed. Apply settings to update the calculator.");
});

rateSettingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  try {
    saveSelectedPlanSettings();
  } catch (error) {
    setSettingsStatus(error.message);
  }
});

newPlanButton.addEventListener("click", () => {
  addCustomPlan();
});

resetPlanButton.addEventListener("click", () => {
  resetSelectedPlan();
});

loadPlansFromStorage();
render();
populateSettings(state.settingsPlanId);
