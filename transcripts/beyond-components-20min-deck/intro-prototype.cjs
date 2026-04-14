const pptxgen = require("pptxgenjs");
const {
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require("./layout");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "Infoxicator";
pptx.subject = "Beyond Components - intro prototype";
pptx.title = "Beyond Components Intro Prototype";
pptx.lang = "en-GB";
pptx.theme = {
  headFontFace: "Georgia",
  bodyFontFace: "Arial",
  lang: "en-GB",
};

const W = 13.333;
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
  paleBlue: "D8E6EE",
  paleOrange: "F2D4C2",
  paleTeal: "D8ECE9",
  paleGold: "E8E0B8",
};

function addBg(slide, bar = COLORS.orange) {
  slide.background = { color: COLORS.paper };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.18,
    line: { color: bar, transparency: 100 },
    fill: { color: bar },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 11.8,
    y: 0.32,
    w: 1.1,
    h: 0.12,
    line: { color: COLORS.blue, transparency: 100 },
    fill: { color: COLORS.blue },
  });
}

function addEyebrow(slide, text, color = COLORS.blue) {
  slide.addText(text.toUpperCase(), {
    x: 0.72,
    y: 0.48,
    w: 4,
    h: 0.22,
    fontFace: "Arial",
    fontSize: 9,
    bold: true,
    charSpace: 1.2,
    color,
    margin: 0,
  });
}

function addTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.72,
    y: 0.92,
    w: 8.4,
    h: 0.72,
    fontFace: "Georgia",
    fontSize: 24,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.74,
      y: 1.84,
      w: 8.2,
      h: 0.3,
      fontFace: "Arial",
      fontSize: 11.5,
      color: COLORS.muted,
      margin: 0,
    });
  }
}

function addFooterTag(slide, text) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.72,
    y: 6.82,
    w: 2.8,
    h: 0.34,
    rectRadius: 0.05,
    line: { color: COLORS.line, transparency: 100 },
    fill: { color: COLORS.white },
  });
  slide.addText(text, {
    x: 0.9,
    y: 6.92,
    w: 2.45,
    h: 0.12,
    fontFace: "Arial",
    fontSize: 8,
    color: COLORS.muted,
    margin: 0,
  });
}

function addPageNumber(slide) {
  const num = Array.isArray(pptx._slides) ? pptx._slides.indexOf(slide) + 1 : 0;
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

function finalizeSlide(slide) {
  addPageNumber(slide);
  warnIfSlideHasOverlaps(slide, pptx);
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

function addChip(slide, x, y, w, text, fill, color = COLORS.ink) {
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

function addSlide1() {
  const slide = pptx.addSlide();
  addBg(slide, COLORS.orange);
  addEyebrow(slide, "Intro");
  addTitle(slide, "2022: the poor man's vibe coding", "Copy. Paste. Fix. Repeat.");

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.9,
    y: 2.2,
    w: 4.2,
    h: 3.2,
    rectRadius: 0.05,
    line: { color: COLORS.line, pt: 1 },
    fill: { color: COLORS.white },
  });
  slide.addText("ChatGPT", {
    x: 1.18,
    y: 2.48,
    w: 1.3,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 10,
    bold: true,
    color: COLORS.blue,
    margin: 0,
  });
  slide.addText('Prompt: "Build a component"', {
    x: 1.18,
    y: 2.86,
    w: 3.1,
    h: 0.25,
    fontFace: "Arial",
    fontSize: 13,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.16,
    y: 3.36,
    w: 3.56,
    h: 1.46,
    line: { color: COLORS.paleBlue, pt: 1 },
    fill: { color: "F8FBFD" },
  });
  slide.addText("<div className='loader' />\n\n.loader { ... }", {
    x: 1.38,
    y: 3.64,
    w: 2.9,
    h: 0.9,
    fontFace: "Courier New",
    fontSize: 14,
    color: COLORS.ink,
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.line, {
    x: 5.34,
    y: 3.82,
    w: 1.0,
    h: 0,
    line: { color: COLORS.gold, pt: 2.5, endArrowType: "triangle" },
  });
  addChip(slide, 5.58, 2.88, 0.86, "copy", COLORS.paleGold);
  addChip(slide, 5.58, 3.34, 0.86, "paste", COLORS.paleOrange);
  addChip(slide, 5.58, 3.8, 0.72, "fix", COLORS.paleBlue);
  addChip(slide, 5.58, 4.26, 1.02, "repeat", COLORS.paleTeal);

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.7,
    y: 2.2,
    w: 5.3,
    h: 3.2,
    rectRadius: 0.05,
    line: { color: COLORS.line, pt: 1 },
    fill: { color: COLORS.white },
  });
  slide.addText("Editor", {
    x: 6.98,
    y: 2.48,
    w: 1.0,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 10,
    bold: true,
    color: COLORS.orange,
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 6.96,
    y: 2.94,
    w: 4.78,
    h: 1.98,
    line: { color: "E2E8F0", pt: 1 },
    fill: { color: "FAFAFA" },
  });
  slide.addText("const Loader = () => {\n  // copied from chat\n  // patched by hand\n}", {
    x: 7.2,
    y: 3.26,
    w: 4.2,
    h: 1.2,
    fontFace: "Courier New",
    fontSize: 16,
    color: COLORS.ink,
    margin: 0,
  });

  slide.addText("Primitive, but exciting.", {
    x: 0.94,
    y: 5.88,
    w: 4.3,
    h: 0.26,
    fontFace: "Georgia",
    fontSize: 18,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  addFooterTag(slide, "Fast, amused tone");
  finalizeSlide(slide);
}

function addSlide2() {
  const slide = pptx.addSlide();
  addBg(slide, COLORS.orange);
  addEyebrow(slide, "Contrast");
  addTitle(slide, "2025: something changed", "Not just working UI. Good UI.");

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.92,
    y: 2.24,
    w: 3.0,
    h: 2.7,
    rectRadius: 0.05,
    line: { color: COLORS.line, pt: 1 },
    fill: { color: COLORS.white },
  });
  slide.addText("2022", {
    x: 1.18,
    y: 2.54,
    w: 1,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 10,
    bold: true,
    color: COLORS.blue,
    margin: 0,
  });
  slide.addText("This compiles.", {
    x: 1.18,
    y: 3.04,
    w: 2.1,
    h: 0.34,
    fontFace: "Georgia",
    fontSize: 20,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addText("Helpful.\nBut rough.", {
    x: 1.18,
    y: 3.78,
    w: 1.8,
    h: 0.6,
    fontFace: "Arial",
    fontSize: 13,
    color: COLORS.muted,
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.line, {
    x: 4.34,
    y: 3.62,
    w: 1.04,
    h: 0,
    line: { color: COLORS.gold, pt: 2.5, endArrowType: "triangle" },
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.72,
    y: 2.24,
    w: 6.2,
    h: 2.7,
    rectRadius: 0.05,
    line: { color: COLORS.line, pt: 1 },
    fill: { color: COLORS.white },
  });
  slide.addText("2025", {
    x: 5.98,
    y: 2.54,
    w: 1,
    h: 0.2,
    fontFace: "Arial",
    fontSize: 10,
    bold: true,
    color: COLORS.orange,
    margin: 0,
  });
  slide.addText("I can one-shot real UI.", {
    x: 5.98,
    y: 3.04,
    w: 2.9,
    h: 0.34,
    fontFace: "Georgia",
    fontSize: 20,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addText("Structured.\nElegant.\nUsable.", {
    x: 5.98,
    y: 3.72,
    w: 1.8,
    h: 0.85,
    fontFace: "Arial",
    fontSize: 13,
    color: COLORS.muted,
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.86,
    y: 2.92,
    w: 2.56,
    h: 1.56,
    rectRadius: 0.04,
    line: { color: COLORS.blue, pt: 1 },
    fill: { color: "F9FBFD" },
  });
  slide.addText("Search", {
    x: 9.08,
    y: 3.08,
    w: 0.72,
    h: 0.14,
    fontFace: "Arial",
    fontSize: 9,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.02,
    y: 3.56,
    w: 2.06,
    h: 0.36,
    rectRadius: 0.06,
    line: { color: COLORS.paleBlue, pt: 1 },
    fill: { color: COLORS.white },
  });
  slide.addText("build a search bar", {
    x: 9.24,
    y: 3.68,
    w: 1.62,
    h: 0.12,
    fontFace: "Arial",
    fontSize: 8.5,
    color: COLORS.ink,
    margin: 0,
  });

  addFooterTag(slide, "Acceleration slide");
  finalizeSlide(slide);
}

function addSlide3() {
  const slide = pptx.addSlide();
  addBg(slide, COLORS.blue);
  addEyebrow(slide, "Realization", COLORS.orange);

  slide.addText("LLMs are better at\nfront-end coding than me.", {
    x: 1.0,
    y: 1.58,
    w: 7.0,
    h: 1.6,
    fontFace: "Georgia",
    fontSize: 30,
    bold: true,
    color: COLORS.ink,
    margin: 0,
    breakLine: false,
  });
  slide.addText("And I don't mind it.", {
    x: 1.04,
    y: 4.34,
    w: 3.9,
    h: 0.34,
    fontFace: "Arial",
    fontSize: 16,
    bold: true,
    color: COLORS.orange,
    margin: 0,
  });
  slide.addText("Because if the model can produce interface code this well,\nthis fast, the question changes.", {
    x: 1.04,
    y: 5.0,
    w: 6.2,
    h: 0.64,
    fontFace: "Arial",
    fontSize: 14,
    color: COLORS.muted,
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 8.9,
    y: 1.36,
    w: 2.55,
    h: 4.7,
    line: { color: COLORS.sand, transparency: 100 },
    fill: { color: COLORS.sand },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.36,
    y: 2.0,
    w: 1.72,
    h: 0.18,
    line: { color: COLORS.orange, transparency: 100 },
    fill: { color: COLORS.orange },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.36,
    y: 2.44,
    w: 1.2,
    h: 0.18,
    line: { color: COLORS.blue, transparency: 100 },
    fill: { color: COLORS.blue },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.36,
    y: 2.88,
    w: 1.45,
    h: 0.18,
    line: { color: COLORS.teal, transparency: 100 },
    fill: { color: COLORS.teal },
  });

  addFooterTag(slide, "Pause after the first line");
  finalizeSlide(slide);
}

function addSlide4() {
  const slide = pptx.addSlide();
  addBg(slide, COLORS.orange);
  addEyebrow(slide, "Thesis");

  slide.addText("If models are this good,", {
    x: 0.94,
    y: 1.42,
    w: 5.4,
    h: 0.42,
    fontFace: "Georgia",
    fontSize: 26,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addText("why are interfaces still mostly static?", {
    x: 0.94,
    y: 2.0,
    w: 7.8,
    h: 0.42,
    fontFace: "Georgia",
    fontSize: 26,
    bold: true,
    color: COLORS.orange,
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.94,
    y: 3.08,
    w: 4.6,
    h: 1.18,
    rectRadius: 0.06,
    line: { color: COLORS.orange, pt: 1.3 },
    fill: { color: COLORS.white },
  });
  slide.addText("Where is the Jarvis moment?", {
    x: 1.22,
    y: 3.46,
    w: 4.04,
    h: 0.22,
    fontFace: "Georgia",
    fontSize: 17,
    bold: true,
    color: COLORS.orange,
    margin: 0,
    align: "center",
  });

  slide.addText("Where are the floating windows,\nthe dynamic surfaces, the interfaces that appear when you need them\nand disappear when you don't?", {
    x: 0.98,
    y: 4.9,
    w: 6.6,
    h: 0.9,
    fontFace: "Arial",
    fontSize: 15,
    color: COLORS.muted,
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.72,
    y: 2.2,
    w: 2.18,
    h: 1.02,
    rectRadius: 0.06,
    line: { color: COLORS.paleBlue, pt: 1 },
    fill: { color: COLORS.white, transparency: 3 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.92,
    y: 3.18,
    w: 2.1,
    h: 1.16,
    rectRadius: 0.06,
    line: { color: COLORS.paleOrange, pt: 1 },
    fill: { color: COLORS.white, transparency: 3 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.44,
    y: 4.52,
    w: 2.48,
    h: 1.34,
    rectRadius: 0.06,
    line: { color: COLORS.paleTeal, pt: 1 },
    fill: { color: COLORS.white, transparency: 3 },
  });
  slide.addText("floating panes /\ndynamic surfaces", {
    x: 8.36,
    y: 5.98,
    w: 3.0,
    h: 0.4,
    fontFace: "Arial",
    fontSize: 12,
    color: COLORS.muted,
    margin: 0,
    align: "center",
  });

  addFooterTag(slide, "Transition into the talk");
  finalizeSlide(slide);
}

addSlide1();
addSlide2();
addSlide3();
addSlide4();

pptx.writeFile({ fileName: "beyond-components-intro-prototype.pptx" });
