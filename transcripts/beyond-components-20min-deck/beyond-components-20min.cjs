const pptxgen = require("pptxgenjs");
const {
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require("./layout");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "Infoxicator";
pptx.subject = "Beyond Components - 20 minute talk";
pptx.title = "Beyond Components";
pptx.lang = "en-GB";
pptx.theme = {
  headFontFace: "Georgia",
  bodyFontFace: "Arial",
  lang: "en-GB",
};

const W = 13.333;
const H = 7.5;
const COLORS = {
  paper: "F5EFE4",
  ink: "1C1917",
  muted: "5F5A54",
  sand: "E7D9C7",
  orange: "D76B31",
  blue: "2E6787",
  teal: "0E7774",
  gold: "A9832B",
  white: "FFFDFC",
  line: "CDBEAC",
};

function addBg(slide, opts = {}) {
  slide.background = { color: opts.bg || COLORS.paper };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: W,
    h: 0.18,
    line: { color: opts.bar || COLORS.orange, transparency: 100 },
    fill: { color: opts.bar || COLORS.orange },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 11.8,
    y: 0.32,
    w: 1.1,
    h: 0.12,
    line: { color: COLORS.blue, transparency: 100 },
    fill: { color: COLORS.blue },
    radius: 0.03,
  });
}

function addPageNumber(slide, num) {
  slide.addText(String(num).padStart(2, "0"), {
    x: 12.45,
    y: 7.02,
    w: 0.5,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 9,
    color: COLORS.muted,
    align: "right",
    margin: 0,
  });
}

function addEyebrow(slide, text, color = COLORS.blue) {
  slide.addText(text.toUpperCase(), {
    x: 0.72,
    y: 0.48,
    w: 3.5,
    h: 0.25,
    fontFace: "Arial",
    fontSize: 9,
    bold: true,
    color,
    charSpace: 1.2,
    margin: 0,
  });
}

function addTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.72,
    y: 0.88,
    w: 7.6,
    h: subtitle ? 0.76 : 0.98,
    fontFace: "Georgia",
    fontSize: 24,
    bold: true,
    color: COLORS.ink,
    margin: 0,
    valign: "mid",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.74,
      y: 1.72,
      w: 7.6,
      h: 0.45,
      fontFace: "Arial",
      fontSize: 12,
      color: COLORS.muted,
      margin: 0,
    });
  }
}

function addFooterTag(slide, text) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.72,
    y: 6.82,
    w: 2.45,
    h: 0.34,
    rectRadius: 0.05,
    line: { color: COLORS.line, transparency: 100 },
    fill: { color: COLORS.white },
  });
  slide.addText(text, {
    x: 0.9,
    y: 6.92,
    w: 2.0,
    h: 0.14,
    fontFace: "Arial",
    fontSize: 8,
    color: COLORS.muted,
    margin: 0,
  });
}

function addCard(slide, x, y, w, h, title, body, accent = COLORS.orange) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.05,
    line: { color: COLORS.line, pt: 1 },
    fill: { color: COLORS.white },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x,
    y,
    w: 0.14,
    h,
    line: { color: accent, transparency: 100 },
    fill: { color: accent },
  });
  slide.addText(title, {
    x: x + 0.26,
    y: y + 0.2,
    w: w - 0.42,
    h: 0.34,
    fontFace: "Georgia",
    fontSize: 14,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addText(body, {
    x: x + 0.26,
    y: y + 0.62,
    w: w - 0.42,
    h: h - 0.8,
    fontFace: "Arial",
    fontSize: 11,
    color: COLORS.muted,
    margin: 0,
    valign: "top",
  });
}

function addPill(slide, x, y, w, text, fill, color = COLORS.ink) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.32,
    rectRadius: 0.08,
    line: { color: fill, transparency: 100 },
    fill: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.08,
    y: y + 0.08,
    w: w - 0.16,
    h: 0.12,
    fontFace: "Arial",
    fontSize: 8.5,
    bold: true,
    color,
    align: "center",
    margin: 0,
  });
}

function finalizeSlide(slide) {
  const num = Array.isArray(pptx._slides) ? pptx._slides.indexOf(slide) + 1 : 0;
  addPageNumber(slide, num);
  warnIfSlideHasOverlaps(slide, pptx);
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

function addTitleSlide() {
  const slide = pptx.addSlide();
  addBg(slide);
  slide.addShape(pptx.ShapeType.rect, {
    x: 8.75,
    y: 0.84,
    w: 3.5,
    h: 5.2,
    line: { color: COLORS.sand, transparency: 100 },
    fill: { color: COLORS.sand },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.2,
    y: 1.25,
    w: 2.6,
    h: 0.24,
    line: { color: COLORS.orange, transparency: 100 },
    fill: { color: COLORS.orange },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.2,
    y: 1.74,
    w: 1.9,
    h: 0.24,
    line: { color: COLORS.blue, transparency: 100 },
    fill: { color: COLORS.blue },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.2,
    y: 2.23,
    w: 2.25,
    h: 0.24,
    line: { color: COLORS.teal, transparency: 100 },
    fill: { color: COLORS.teal },
  });
  addEyebrow(slide, "AI interface design");
  slide.addText("Beyond\nComponents", {
    x: 0.72,
    y: 1.22,
    w: 5.2,
    h: 1.95,
    fontFace: "Georgia",
    fontSize: 28,
    bold: true,
    color: COLORS.ink,
    margin: 0,
    breakLine: false,
  });
  slide.addText("Choosing how much UI an LLM should generate", {
    x: 0.76,
    y: 3.55,
    w: 5.6,
    h: 0.5,
    fontFace: "Arial",
    fontSize: 15,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addText("Ruben Casas", {
    x: 0.76,
    y: 5.28,
    w: 2.0,
    h: 0.25,
    fontFace: "Georgia",
    fontSize: 13,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addText("20-minute conference version", {
    x: 0.76,
    y: 5.62,
    w: 3.0,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 10.5,
    color: COLORS.muted,
    margin: 0,
  });
  addFooterTag(slide, "Framework, not taxonomy");
  finalizeSlide(slide);
}

function addTimelineSlide() {
  const slide = pptx.addSlide();
  addBg(slide);
  addEyebrow(slide, "Hook");
  addTitle(slide, "Two prompts changed my mental model");

  addCard(
    slide,
    0.82,
    2.15,
    3.95,
    2.25,
    "2023",
    'Prompt: "Build a loading component."\n\nImpressive because it compiled.',
    COLORS.blue
  );
  addCard(
    slide,
    4.95,
    2.15,
    3.95,
    2.25,
    "2025",
    'Prompt: "Build a search bar."\n\nImpressive because I shipped it.',
    COLORS.orange
  );
  slide.addShape(pptx.ShapeType.line, {
    x: 4.26,
    y: 3.26,
    w: 0.46,
    h: 0,
    line: { color: COLORS.gold, pt: 2.5, endArrowType: "triangle" },
  });
  slide.addText(
    "If models can already write UI this well,\nwhy are we still surrounding them with mostly static interfaces?",
    {
      x: 0.84,
      y: 4.9,
      w: 8.7,
      h: 1.1,
      fontFace: "Georgia",
      fontSize: 20,
      bold: true,
      color: COLORS.ink,
      margin: 0,
      valign: "mid",
    }
  );
  addPill(slide, 10.3, 2.18, 2.1, "capability shift", COLORS.sand);
  addPill(slide, 10.3, 2.62, 1.76, "faster output", "F2D4C2");
  addPill(slide, 10.3, 3.06, 2.42, "lower UI cost", "D8E6EE");
  addPill(slide, 10.3, 3.5, 2.0, "new design space", "D8ECE9");
  addFooterTag(slide, "Get to the thesis early");
  finalizeSlide(slide);
}

function addNewComputerSlide() {
  const slide = pptx.addSlide();
  addBg(slide, { bar: COLORS.blue });
  addEyebrow(slide, "Platform shift", COLORS.orange);
  addTitle(slide, "LLMs are a new computer");
  slide.addText("Most interaction with that computer still looks like the terminal era.", {
    x: 0.9,
    y: 2.12,
    w: 8.8,
    h: 0.6,
    fontFace: "Georgia",
    fontSize: 20,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  addCard(
    slide,
    0.9,
    2.9,
    3.65,
    2.3,
    "What we have now",
    "Mostly text in.\nMostly text out.\nA few fixed surfaces around it.",
    COLORS.blue
  );
  addCard(
    slide,
    4.86,
    2.9,
    3.65,
    2.3,
    "What is missing",
    "A real GUI layer for this new kind of computer.",
    COLORS.gold
  );
  addCard(
    slide,
    8.82,
    2.9,
    3.65,
    2.3,
    "Why it matters",
    "The intelligence improved faster than the presentation layer.",
    COLORS.orange
  );
  addFooterTag(slide, "We are still early in the GUI era");
  finalizeSlide(slide);
}

function addStatementSlide() {
  const slide = pptx.addSlide();
  addBg(slide, { bar: COLORS.blue });
  addEyebrow(slide, "Framing", COLORS.orange);
  slide.addText("The question is not chat or no chat.", {
    x: 0.9,
    y: 1.6,
    w: 9.6,
    h: 0.72,
    fontFace: "Georgia",
    fontSize: 22,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addText("The question is:", {
    x: 0.9,
    y: 2.6,
    w: 3.2,
    h: 0.45,
    fontFace: "Arial",
    fontSize: 14,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.9,
    y: 3.05,
    w: 8.65,
    h: 1.45,
    rectRadius: 0.08,
    line: { color: COLORS.orange, pt: 1.5 },
    fill: { color: COLORS.white },
  });
  slide.addText("What should the model render?", {
    x: 1.18,
    y: 3.46,
    w: 8.1,
    h: 0.5,
    fontFace: "Georgia",
    fontSize: 25,
    bold: true,
    color: COLORS.orange,
    align: "center",
    margin: 0,
  });
  addPill(slide, 10.12, 2.92, 1.1, "data", COLORS.sand);
  addPill(slide, 10.12, 3.36, 1.36, "layout", "D8E6EE");
  addPill(slide, 10.12, 3.8, 1.82, "interface", "D8ECE9");
  addFooterTag(slide, "Render data, structure, or UI");
  finalizeSlide(slide);
}

function addPatternsSlide() {
  const slide = pptx.addSlide();
  addBg(slide);
  addEyebrow(slide, "Where we are now");
  addTitle(slide, "Patterns are already emerging");
  addCard(
    slide,
    0.82,
    2.12,
    3.84,
    2.6,
    "AI inside products",
    "The host owns the interface and embeds the model into the app.\n\nCursor is the obvious pattern.",
    COLORS.blue
  );
  addCard(
    slide,
    4.74,
    2.12,
    3.84,
    2.6,
    "UI inside agents",
    "Products send interfaces into the model environment.\n\nMCP apps and similar approaches live here.",
    COLORS.gold
  );
  addCard(
    slide,
    8.66,
    2.12,
    3.84,
    2.6,
    "Early generative examples",
    "Known widgets.\nSchema-driven layouts.\nAnd now interfaces authored on demand.",
    COLORS.orange
  );
  slide.addShape(pptx.ShapeType.line, {
    x: 4.42,
    y: 3.42,
    w: 0.22,
    h: 0,
    line: { color: COLORS.line, pt: 1.5, endArrowType: "triangle" },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 8.34,
    y: 3.42,
    w: 0.22,
    h: 0,
    line: { color: COLORS.line, pt: 1.5, endArrowType: "triangle" },
  });
  addFooterTag(slide, "The field is already diverging");
  finalizeSlide(slide);
}

function addSpectrumSlide() {
  const slide = pptx.addSlide();
  addBg(slide, { bar: COLORS.teal });
  addEyebrow(slide, "Framework", COLORS.orange);
  addTitle(slide, "Three levels of AI-driven UI");
  const y = 2.65;
  const widths = [3.55, 3.55, 3.55];
  const xs = [0.82, 4.9, 8.98];
  const labels = [
    ["01", "Static\ncomponents", COLORS.blue],
    ["02", "Declarative\nUI", COLORS.gold],
    ["03", "Generative\nUI", COLORS.orange],
  ];
  labels.forEach(([num, title, accent], i) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: xs[i],
      y,
      w: widths[i],
      h: 2.35,
      rectRadius: 0.05,
      line: { color: COLORS.line, pt: 1 },
      fill: { color: COLORS.white },
    });
    slide.addText(num, {
      x: xs[i] + 0.25,
      y: y + 0.22,
      w: 0.6,
      h: 0.3,
      fontFace: "Arial",
      fontSize: 10,
      bold: true,
      color: accent,
      margin: 0,
    });
    slide.addText(title, {
      x: xs[i] + 0.25,
      y: y + 0.58,
      w: 2.8,
      h: 0.72,
      fontFace: "Georgia",
      fontSize: 18,
      bold: true,
      color: COLORS.ink,
      margin: 0,
    });
  });
  slide.addText("Model fills props", {
    x: 1.07,
    y: 4.1,
    w: 2.6,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 11,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addText("Model chooses structure", {
    x: 5.15,
    y: 4.1,
    w: 2.8,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 11,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addText("Model authors the interface", {
    x: 9.23,
    y: 4.1,
    w: 3.0,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 11,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 1.35,
    y: 5.56,
    w: 10.2,
    h: 0,
    line: { color: COLORS.line, pt: 3, endArrowType: "triangle" },
  });
  slide.addText("more constraints", {
    x: 1.18,
    y: 5.76,
    w: 1.6,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 9,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addText("more freedom", {
    x: 10.12,
    y: 5.76,
    w: 1.4,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 9,
    color: COLORS.muted,
    margin: 0,
    align: "right",
  });
  addFooterTag(slide, "A product decision spectrum");
  finalizeSlide(slide);
}

function addLevelSlide(opts) {
  const slide = pptx.addSlide();
  addBg(slide, { bar: opts.bar });
  addEyebrow(slide, opts.eyebrow, opts.bar);
  addTitle(slide, opts.title, opts.subtitle);

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.82,
    y: 2.42,
    w: 5.0,
    h: 3.3,
    rectRadius: 0.05,
    line: { color: COLORS.line, pt: 1 },
    fill: { color: COLORS.white },
  });
  slide.addText(opts.diagramLabels[0], {
    x: 1.15,
    y: 2.9,
    w: 1.1,
    h: 0.38,
    fontFace: "Arial",
    fontSize: 12,
    bold: true,
    color: COLORS.ink,
    align: "center",
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 3.34,
    w: 1.42,
    h: 0.82,
    rectRadius: 0.05,
    line: { color: opts.bar, transparency: 100 },
    fill: { color: opts.fill1 },
  });
  slide.addText(opts.diagramLabels[1], {
    x: 2.93,
    y: 2.9,
    w: 1.1,
    h: 0.38,
    fontFace: "Arial",
    fontSize: 12,
    bold: true,
    color: COLORS.ink,
    align: "center",
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 2.77,
    y: 3.34,
    w: 1.42,
    h: 0.82,
    rectRadius: 0.05,
    line: { color: COLORS.gold, transparency: 100 },
    fill: { color: opts.fill2 },
  });
  slide.addText(opts.diagramLabels[2], {
    x: 4.7,
    y: 2.9,
    w: 1.1,
    h: 0.38,
    fontFace: "Arial",
    fontSize: 12,
    bold: true,
    color: COLORS.ink,
    align: "center",
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 4.54,
    y: 3.34,
    w: 0.95,
    h: 0.82,
    rectRadius: 0.05,
    line: { color: COLORS.teal, transparency: 100 },
    fill: { color: opts.fill3 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 2.42,
    y: 3.75,
    w: 0.35,
    h: 0,
    line: { color: COLORS.line, pt: 1.5, endArrowType: "triangle" },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 4.19,
    y: 3.75,
    w: 0.35,
    h: 0,
    line: { color: COLORS.line, pt: 1.5, endArrowType: "triangle" },
  });
  slide.addText(opts.diagramNote, {
    x: 1.08,
    y: 4.72,
    w: 4.46,
    h: 0.55,
    fontFace: "Arial",
    fontSize: 11,
    color: COLORS.muted,
    align: "center",
    margin: 0,
  });

  addCard(slide, 6.18, 2.42, 2.95, 1.52, "What the model does", opts.modelDoes, opts.bar);
  addCard(slide, 9.42, 2.42, 3.08, 1.52, "Where it shines", opts.shines, COLORS.blue);
  addCard(slide, 6.18, 4.2, 6.32, 1.52, "Examples", opts.examples, COLORS.gold);

  addFooterTag(slide, opts.footer);
  finalizeSlide(slide);
}

function addDecisionSlide() {
  const slide = pptx.addSlide();
  addBg(slide, { bar: COLORS.gold });
  addEyebrow(slide, "Decision rule", COLORS.orange);
  addTitle(slide, "The tradeoff is freedom vs reliability");

  slide.addShape(pptx.ShapeType.line, {
    x: 1.1,
    y: 3.9,
    w: 10.7,
    h: 0,
    line: { color: COLORS.line, pt: 4, endArrowType: "triangle" },
  });
  slide.addText("Constrain the model more", {
    x: 1.05,
    y: 4.18,
    w: 2.2,
    h: 0.22,
    fontFace: "Arial",
    fontSize: 10,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addText("Give the model more room", {
    x: 9.35,
    y: 4.18,
    w: 2.35,
    h: 0.22,
    fontFace: "Arial",
    fontSize: 10,
    color: COLORS.muted,
    margin: 0,
    align: "right",
  });

  addPill(slide, 1.05, 3.15, 2.22, "repeated tasks", COLORS.sand);
  addPill(slide, 3.55, 3.15, 2.46, "trust-critical actions", "F2D4C2");
  addPill(slide, 6.4, 3.15, 2.06, "brand surfaces", "D8E6EE");
  addPill(slide, 8.82, 3.15, 1.96, "long-tail work", "D8ECE9");
  addPill(slide, 10.95, 3.15, 1.05, "exploration", "E8E0B8");

  addCard(
    slide,
    1.08,
    5.0,
    5.35,
    1.22,
    "Move left when",
    "The task is regulated, high-volume, accessibility-critical, or tightly bound to trust and brand.",
    COLORS.blue
  );
  addCard(
    slide,
    6.9,
    5.0,
    5.35,
    1.22,
    "Move right when",
    "The interface is exploratory, ephemeral, or too expensive to prebuild across the long tail.",
    COLORS.orange
  );
  addFooterTag(slide, "Freedom is a budget");
  finalizeSlide(slide);
}

function addDemoSlide() {
  const slide = pptx.addSlide();
  addBg(slide, { bar: COLORS.orange });
  addEyebrow(slide, "Demo");
  addTitle(slide, "One example of generative UI", "Use one clean demo. Do not split attention across two hosts.");

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.82,
    y: 2.32,
    w: 4.25,
    h: 3.75,
    rectRadius: 0.05,
    line: { color: COLORS.line, pt: 1 },
    fill: { color: COLORS.white },
  });
  slide.addText("Prompt", {
    x: 1.05,
    y: 2.58,
    w: 0.8,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 10,
    bold: true,
    color: COLORS.orange,
    margin: 0,
  });
  slide.addText('Show me the weather in Paris.\nMake it look like Windows 95.', {
    x: 1.05,
    y: 2.92,
    w: 3.7,
    h: 0.85,
    fontFace: "Arial",
    fontSize: 15,
    color: COLORS.ink,
    margin: 0,
  });
  addPill(slide, 1.05, 4.42, 1.28, "content", COLORS.sand);
  addPill(slide, 2.45, 4.42, 0.92, "tone", "D8E6EE");
  addPill(slide, 3.5, 4.42, 0.92, "style", "D8ECE9");

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.42,
    y: 2.32,
    w: 6.9,
    h: 3.75,
    rectRadius: 0.05,
    line: { color: "8A8A8A", pt: 1.2 },
    fill: { color: "D7D7D7" },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.42,
    y: 2.32,
    w: 6.9,
    h: 0.35,
    line: { color: "A0A0A0", transparency: 100 },
    fill: { color: "BEBEBE" },
  });
  slide.addText("Weather.exe", {
    x: 8.05,
    y: 2.4,
    w: 1.7,
    h: 0.12,
    fontFace: "Arial",
    fontSize: 8.5,
    color: "1A1A1A",
    align: "center",
    margin: 0,
  });
  slide.addText("PARIS  12°C  RAIN", {
    x: 5.86,
    y: 3.0,
    w: 5.6,
    h: 0.36,
    fontFace: "Arial",
    fontSize: 22,
    bold: true,
    color: "0D0D0D",
    margin: 0,
    align: "center",
  });
  slide.addText("Forgot your umbrella and your jacket.\nDamp, chilly, regretful.", {
    x: 6.0,
    y: 3.67,
    w: 5.25,
    h: 0.6,
    fontFace: "Arial",
    fontSize: 13,
    color: "222222",
    margin: 0,
    align: "center",
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 7.95,
    y: 4.82,
    w: 1.84,
    h: 0.42,
    line: { color: "5B5B5B", pt: 1 },
    fill: { color: "EFEFEF" },
  });
  slide.addText("OK", {
    x: 8.56,
    y: 4.95,
    w: 0.55,
    h: 0.12,
    fontFace: "Arial",
    fontSize: 10,
    color: "111111",
    align: "center",
    margin: 0,
  });

  slide.addText("The point is not the weather card.\nThe point is that the style is being authored, not selected.", {
    x: 0.9,
    y: 6.24,
    w: 11.35,
    h: 0.52,
    fontFace: "Georgia",
    fontSize: 16,
    bold: true,
    color: COLORS.ink,
    margin: 0,
    align: "center",
  });
  addFooterTag(slide, "Narrate the distinction, not the demo");
  finalizeSlide(slide);
}

function addUseCasesSlide() {
  const slide = pptx.addSlide();
  addBg(slide, { bar: COLORS.teal });
  addEyebrow(slide, "Application");
  addTitle(slide, "Good use cases for each level");
  addCard(
    slide,
    0.82,
    2.12,
    3.95,
    3.75,
    "Static components",
    "Payments\nSettings\nAccount management\nKnown dashboards\nInvoice summaries\nFlight status",
    COLORS.blue
  );
  addCard(
    slide,
    4.92,
    2.12,
    3.95,
    3.75,
    "Declarative UI",
    "Shopping assistants\nTravel booking flows\nSupport workflows\nInternal copilots\nBranded agent experiences",
    COLORS.gold
  );
  addCard(
    slide,
    9.02,
    2.12,
    3.48,
    3.75,
    "Generative UI",
    "Exploratory analysis\nIncident workspaces\nAd hoc ops panels\nDebugging tools\nTemporary collaboration surfaces",
    COLORS.orange
  );
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 2.2,
    y: 6.18,
    w: 8.95,
    h: 0.55,
    rectRadius: 0.08,
    line: { color: COLORS.orange, pt: 1.2 },
    fill: { color: COLORS.white },
  });
  slide.addText("Generative UI is strongest where the interface is ephemeral.", {
    x: 2.45,
    y: 6.35,
    w: 8.45,
    h: 0.18,
    fontFace: "Georgia",
    fontSize: 15,
    bold: true,
    color: COLORS.orange,
    align: "center",
    margin: 0,
  });
  addFooterTag(slide, "Match the pattern to the problem");
  finalizeSlide(slide);
}

function addBreaksSlide() {
  const slide = pptx.addSlide();
  addBg(slide);
  addEyebrow(slide, "Constraints", COLORS.orange);
  addTitle(slide, "Where full generation is the wrong tool");
  addCard(slide, 0.82, 2.12, 2.86, 1.7, "Brand consistency", "Recognition matters.\nStable language matters.", COLORS.orange);
  addCard(slide, 3.95, 2.12, 2.86, 1.7, "Accessibility", "You need guarantees,\nnot good intentions.", COLORS.blue);
  addCard(slide, 7.08, 2.12, 2.86, 1.7, "Trust-critical actions", "Checkout.\nIdentity.\nHealthcare.", COLORS.gold);
  addCard(slide, 10.21, 2.12, 2.3, 1.7, "High-volume flows", "Habit beats novelty.", COLORS.teal);
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.2,
    y: 4.45,
    w: 11.0,
    h: 1.35,
    rectRadius: 0.06,
    line: { color: COLORS.line, pt: 1 },
    fill: { color: COLORS.white },
  });
  slide.addText("The more a surface carries brand, trust, or accessibility obligations,\nthe more you should constrain the model.", {
    x: 1.58,
    y: 4.78,
    w: 10.2,
    h: 0.58,
    fontFace: "Georgia",
    fontSize: 18,
    bold: true,
    color: COLORS.ink,
    align: "center",
    margin: 0,
  });
  addFooterTag(slide, "The opportunity is real, not universal");
  finalizeSlide(slide);
}

function addFutureSlide() {
  const slide = pptx.addSlide();
  addBg(slide, { bar: COLORS.blue });
  addEyebrow(slide, "Forward-looking", COLORS.orange);
  addTitle(slide, "What generative UI might become");

  slide.addText("Jarvis is the obvious metaphor. Early TV filmed radio shows.\nWe are probably still translating old interface patterns into a new medium.", {
    x: 0.9,
    y: 2.02,
    w: 10.9,
    h: 0.48,
    fontFace: "Georgia",
    fontSize: 15,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });

  addCard(
    slide,
    0.82,
    2.62,
    3.78,
    2.9,
    "Ephemeral task interfaces",
    "Interfaces assembled for one task, one user, one moment, and then discarded.",
    COLORS.blue
  );
  addCard(
    slide,
    4.78,
    2.62,
    3.78,
    2.9,
    "Collaborative canvases",
    "Not just show me the result.\nWork with me on the artifact.\nExcalidraw MCP is a concrete example of the interface becoming a shared thinking surface.",
    COLORS.gold
  );
  addCard(
    slide,
    8.74,
    2.62,
    3.78,
    2.9,
    "Adaptive surfaces",
    "The same capability presents differently based on context, modality, device, or task stage.",
    COLORS.orange
  );

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.22,
    y: 5.9,
    w: 10.9,
    h: 0.72,
    rectRadius: 0.06,
    line: { color: COLORS.line, pt: 1 },
    fill: { color: COLORS.white },
  });
  slide.addText("Less fixed UI for intent capture. More adaptive UI for artifacts, collaboration, and control.", {
    x: 1.55,
    y: 6.15,
    w: 10.25,
    h: 0.2,
    fontFace: "Georgia",
    fontSize: 14,
    bold: true,
    color: COLORS.ink,
    align: "center",
    margin: 0,
  });
  addFooterTag(slide, "Not no UI. Different UI.");
  finalizeSlide(slide);
}

function addClosingSlide() {
  const slide = pptx.addSlide();
  addBg(slide, { bar: COLORS.gold });
  addEyebrow(slide, "Closing", COLORS.orange);
  addTitle(slide, "The future is not one UI pattern");
  slide.addText("Builders will become explicit about how much of the interface\nthey let the model control.", {
    x: 0.9,
    y: 2.08,
    w: 8.3,
    h: 0.7,
    fontFace: "Georgia",
    fontSize: 20,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 1.12,
    y: 4.08,
    w: 10.55,
    h: 0,
    line: { color: COLORS.line, pt: 3, endArrowType: "triangle" },
  });
  addPill(slide, 1.15, 3.35, 2.1, "static components", COLORS.sand);
  addPill(slide, 5.35, 3.35, 1.75, "declarative UI", "D8E6EE");
  addPill(slide, 9.55, 3.35, 1.9, "generative UI", "D8ECE9");
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 2.28,
    y: 5.05,
    w: 8.75,
    h: 1.05,
    rectRadius: 0.08,
    line: { color: COLORS.orange, pt: 1.3 },
    fill: { color: COLORS.white },
  });
  slide.addText("What is the highest-leverage layer I can safely let the model render?", {
    x: 2.62,
    y: 5.4,
    w: 8.05,
    h: 0.28,
    fontFace: "Georgia",
    fontSize: 18,
    bold: true,
    color: COLORS.orange,
    align: "center",
    margin: 0,
  });
  addFooterTag(slide, "Framework over hype");
  finalizeSlide(slide);
}

function addTakeawaySlide() {
  const slide = pptx.addSlide();
  addBg(slide, { bar: COLORS.orange });
  addEyebrow(slide, "Takeaway");
  slide.addText("Ask one question", {
    x: 0.92,
    y: 1.08,
    w: 3.2,
    h: 0.4,
    fontFace: "Arial",
    fontSize: 12,
    bold: true,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addText("What should the model render?", {
    x: 0.92,
    y: 1.62,
    w: 9.2,
    h: 0.85,
    fontFace: "Georgia",
    fontSize: 27,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  addCard(slide, 0.92, 3.12, 3.72, 1.8, "Data", "The model fills a fixed component.\nUse when reliability is the priority.", COLORS.blue);
  addCard(slide, 4.81, 3.12, 3.72, 1.8, "Structure", "The model chooses layout from constrained building blocks.", COLORS.gold);
  addCard(slide, 8.7, 3.12, 3.72, 1.8, "Interface", "The model authors the UI.\nUse when the surface is exploratory or ephemeral.", COLORS.orange);
  slide.addText("Choosing between those is becoming a core product decision.", {
    x: 1.66,
    y: 5.72,
    w: 10.0,
    h: 0.35,
    fontFace: "Georgia",
    fontSize: 17,
    bold: true,
    color: COLORS.ink,
    align: "center",
    margin: 0,
  });
  addFooterTag(slide, "Thank you");
  finalizeSlide(slide);
}

addTitleSlide();
addTimelineSlide();
addNewComputerSlide();
addStatementSlide();
addPatternsSlide();
addSpectrumSlide();
addLevelSlide({
  bar: COLORS.blue,
  eyebrow: "Level one",
  title: "Level 1: The model fills props",
  subtitle: "The component already exists. The model selects it and fills it.",
  diagramLabels: ["Agent", "Tool", "Widget"],
  diagramNote: "The model orchestrates. The UI is predefined.",
  modelDoes: "Selects a known widget and passes data or parameters into it.",
  shines: "Reliable, testable, fast, consistent, accessible.",
  examples: "Weather cards, order status, account summaries, known chart types, calendar previews.",
  fill1: "D8E6EE",
  fill2: "E8E0B8",
  fill3: "D8ECE9",
  footer: "Not less valuable because it is less magical",
});
addLevelSlide({
  bar: COLORS.gold,
  eyebrow: "Level two",
  title: "Level 2: The model chooses structure",
  subtitle: "The model generates a constrained representation of the interface.",
  diagramLabels: ["Agent", "Schema", "Renderer"],
  diagramNote: "Freedom inside rails you control.",
  modelDoes: "Produces JSON, schema, or layout descriptors that a renderer translates into real UI.",
  shines: "Adaptability with brand, spacing, accessibility, and component consistency intact.",
  examples: "Shopping assistants, booking flows, support workflows, internal copilots, branded agent experiences.",
  fill1: "F2D4C2",
  fill2: "E8E0B8",
  fill3: "D8E6EE",
  footer: "Likely the centre of gravity for many products",
});
addLevelSlide({
  bar: COLORS.orange,
  eyebrow: "Level three",
  title: "Level 3: The model authors the interface",
  subtitle: "The model produces the UI itself and a sandbox renders it.",
  diagramLabels: ["Agent", "UI code", "Sandbox"],
  diagramNote: "More capability. More risk. More design space.",
  modelDoes: "Generates HTML, CSS, JavaScript, React, or another UI runtime artifact.",
  shines: "Exploration, novelty, long-tail tasks, temporary interfaces, fast iteration on one-off surfaces.",
  examples: "Exploratory analysis, incident workspaces, debugging tools, ad hoc operational panels.",
  fill1: "F2D4C2",
  fill2: "D8ECE9",
  fill3: "D8E6EE",
  footer: "A legitimate option, not a default",
});
addDecisionSlide();
addDemoSlide();
addUseCasesSlide();
addBreaksSlide();
addFutureSlide();
addClosingSlide();
addTakeawaySlide();

pptx.writeFile({ fileName: "beyond-components-20min.pptx" });
