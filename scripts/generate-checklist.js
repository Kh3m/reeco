/**
 * Generates the lead-magnet PDF: "7 Customer Journey Gaps Costing Businesses
 * Revenue" — on-brand black/gold. Output: public/reeco-customer-journey-checklist.pdf
 *
 * Run: npm run generate:checklist
 * The copy is a starter the owner can refine; re-run after editing.
 */
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const BLACK = "#000000";
const GOLD = "#D4AF37";
const WHITE = "#FFFFFF";
const GRAY = "#C7C7CC";
const FAINT = "#8B8B94";

const OUT = path.join(
  __dirname,
  "..",
  "public",
  "reeco-customer-journey-checklist.pdf",
);

const GAPS = [
  {
    title: "No welcome flow",
    body: "A subscriber or first-time buyer is never more engaged than right after they opt in — yet most brands send nothing, or a single generic receipt. The first 48 hours set the tone for the entire relationship.",
    check:
      "Do new contacts get a 3–5 email welcome sequence that sets expectations and makes a clear first (or repeat) offer?",
  },
  {
    title: "A silent post-purchase experience",
    body: "After the sale, communication usually stops — no onboarding, no “how to get the most from it,” no reassurance. Buyers disengage, and a one-time sale never becomes a second one.",
    check:
      "Does every purchase trigger a post-purchase sequence (thank you, how-to, what’s next)?",
  },
  {
    title: "No abandoned-checkout or browse recovery",
    body: "Most people who add to cart or browse a key page don’t buy on the first visit. With no reminder, that intent — and the revenue attached to it — is simply lost.",
    check:
      "Are abandoned-cart and browse-abandonment reminders live, and are you measuring what they recover?",
  },
  {
    title: "Treating every customer the same",
    body: "Blasting one message to your whole list ignores where each person is in their journey. New leads, loyal buyers, and lapsed customers all need different messages.",
    check:
      "Is your audience segmented by behavior and lifecycle stage — not just one big list?",
  },
  {
    title: "No replenishment or repeat-purchase prompts",
    body: "For consumable or recurring products, customers run out and forget to reorder. Without a timely, well-timed nudge, they quietly drift to a competitor.",
    check:
      "Do you remind customers to repurchase at the right interval for your product?",
  },
  {
    title: "Ignoring at-risk and lapsed customers",
    body: "Winning a new customer costs far more than keeping one. Yet customers who haven’t bought in a while are usually left to churn in silence.",
    check:
      "Is there a winback flow for customers who’ve gone quiet — before they’re gone for good?",
  },
  {
    title: "Flying blind on retention",
    body: "If you only measure acquisition (traffic, CPC, conversion rate), you can’t see the leaks after the sale. Retention and lifetime value are where durable, compounding growth actually lives.",
    check:
      "Do you track repeat-purchase rate, retention, and customer lifetime value — not just first-order metrics?",
  },
];

const doc = new PDFDocument({
  size: "A4",
  margin: 64,
  info: {
    Title: "7 Customer Journey Gaps Costing Businesses Revenue",
    Author: "ReeCo",
  },
});
doc.pipe(fs.createWriteStream(OUT));

const W = doc.page.width;
const H = doc.page.height;
const M = 64;
const CW = W - M * 2;

function paintBackground() {
  doc.save();
  doc.rect(0, 0, W, H).fill(BLACK);
  doc.restore();
}
doc.on("pageAdded", paintBackground);
paintBackground(); // first page

function wordmark(y) {
  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor(WHITE)
    .text("Ree", M, y, { continued: true })
    .fillColor(GOLD)
    .text("Co");
}

// --- Cover ---------------------------------------------------------------
wordmark(72);

doc.y = 230;
doc
  .font("Helvetica-Bold")
  .fontSize(11)
  .fillColor(GOLD)
  .text("THE CHECKLIST", M, doc.y, { characterSpacing: 3 });

doc.moveDown(0.6);
doc
  .font("Helvetica-Bold")
  .fontSize(33)
  .fillColor(WHITE)
  .text("7 Customer Journey Gaps Costing Businesses Revenue", { lineGap: 4 });

doc.moveDown(1);
doc
  .font("Helvetica")
  .fontSize(13)
  .fillColor(GRAY)
  .text(
    "Most businesses don’t have a traffic problem — they have a customer journey problem. These are the seven gaps where revenue quietly leaks out after the click, and a quick check for each.",
    { lineGap: 3, width: CW - 40 },
  );

doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor(FAINT)
  .text("ReeCo  ·  Customer Journeys · Retention · Growth", M, H - 80, {
    width: CW,
  });

// --- Gaps ----------------------------------------------------------------
doc.addPage();
doc.y = 80;

GAPS.forEach((gap, i) => {
  // Keep an item from splitting awkwardly across pages.
  if (doc.y > H - 170) {
    doc.addPage();
    doc.y = 80;
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(GOLD)
    .text(String(i + 1).padStart(2, "0"), M, doc.y);

  doc
    .font("Helvetica-Bold")
    .fontSize(17)
    .fillColor(WHITE)
    .text(gap.title, M, doc.y - 2);

  doc.moveDown(0.35);
  doc
    .font("Helvetica")
    .fontSize(11.5)
    .fillColor(GRAY)
    .text(gap.body, { lineGap: 2, width: CW });

  doc.moveDown(0.4);
  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor(GOLD)
    .text("QUICK CHECK", { continued: true, characterSpacing: 1.5 })
    .font("Helvetica")
    .fontSize(11)
    .fillColor(WHITE)
    .text("   " + gap.check, { lineGap: 2, width: CW });

  doc.moveDown(1.3);
});

// --- Closing CTA ---------------------------------------------------------
if (doc.y > H - 220) {
  doc.addPage();
  doc.y = 80;
}
doc.moveDown(0.5);
doc.save();
doc
  .rect(M, doc.y, CW, 2)
  .fill(GOLD)
  .restore();
doc.moveDown(1.2);
doc
  .font("Helvetica-Bold")
  .fontSize(20)
  .fillColor(WHITE)
  .text("Found a few gaps?", M, doc.y);
doc.moveDown(0.4);
doc
  .font("Helvetica")
  .fontSize(12)
  .fillColor(GRAY)
  .text(
    "That’s where the revenue is. ReeCo helps businesses map the full customer journey, close the leaks, and build systems that turn first-time buyers into long-term customers. For more strategy on customer journeys, retention, and growth, join the ReeCo newsletter.",
    { lineGap: 3, width: CW },
  );

doc.end();

doc.on("end", () => {
  const { size } = fs.statSync(OUT);
  console.log(`Wrote ${OUT} (${Math.round(size / 1024)} KB)`);
});
