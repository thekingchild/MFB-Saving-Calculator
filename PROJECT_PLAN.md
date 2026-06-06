# MFB Savings Calculator Project Plan

## Purpose

This project is a browser-based calculator for comparing Nigerian fintech and MFB savings products. Users enter a savings amount and term, then compare estimated gross interest, withholding tax, net interest, and maturity balances across available plans.

## Current App Structure

- `index.html` contains the page layout, calculator controls, result areas, rate settings form, educational notes, and source notes.
- `styles.css` contains the visual system, responsive layout, plan cards, breakdown panel, and rate settings editor styles.
- `app.js` contains all plan data, calculation logic, filtering, sorting, rendering, and local customization behavior.

There is no build step or framework. The app can be served with:

```bash
python3 -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

## Data Flow

1. Plans live in the `plans` array in `app.js`.
2. User controls update the `state` object.
3. `calculate()` routes each plan to the correct calculation method.
4. `getFilteredPlans()` applies bank filters and sorting.
5. `renderCards()` shows plan summaries.
6. `renderBreakdown()` shows details for the selected plan.
7. The Rate Settings form updates the selected plan and saves the edited plan list in `localStorage`.

## Supported Plan Types

- `tiered-compound`: amount-based ranges, such as 20% p.a. up to ₦10,000, 16% p.a. from ₦10,001 to ₦100,000, and 8% p.a. above ₦100,000.
- `flat-compound`: one annual rate applied to the full balance.
- `fixed`: duration-based fixed savings rates.
- `placeholder`: a listed plan whose rates are not available yet.

## Rate Settings Behavior

The in-page Rate Settings panel lets users:

- Edit the MFB/provider name and plan name.
- Choose a tiered amount model or flat annual model.
- Add or remove amount ranges.
- Leave the final range ceiling blank to mean "above the previous range".
- Apply or remove 10% withholding tax.
- Mark rate data as available.
- Add a future MFB plan with editable starter tiers.
- Reset a built-in plan or remove a custom plan.

Custom changes are saved in the browser only. They do not rewrite `app.js`.

## Adding Future MFBs in Code

To add a new provider permanently, add a plan object to `plans` in `app.js` with:

- `id`: unique slug, such as `newbank-savings`
- `bank`: public provider name
- `bankKey`: lowercase filter key
- `name`: plan name
- `type`: calculation type
- `headline`: short rate summary
- `source`: public-facing source label
- `verified`: whether rates are available
- `taxApplies`: whether 10% withholding tax should apply
- `tiers`, `rate`, or `fixedRates`: depending on plan type
- `note`: public-facing calculation note

Use clear public wording. Avoid private phrases such as "your screenshot" or internal handoff notes.

## Agent Notes

Before changing calculations, check both the plan data shape and the rendering flow in `app.js`. Keep edits data-driven where possible so new MFBs can be added without redesigning the interface.

After UI or calculation changes, reload the local page and verify:

- Plan cards still render.
- Breakdown numbers update after amount, term, or view changes.
- Rate Settings can save a tiered plan.
- The final blank ceiling behaves as the "above final range" tier.
