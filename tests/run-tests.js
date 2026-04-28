const assert = require("assert");
const { parseArgs, defaultOutputPath } = require("../dist/args");
const { parsePdfInfo } = require("../dist/pdf");

assert.strictEqual(defaultOutputPath("deck.pdf"), "deck.pptx");
assert.strictEqual(defaultOutputPath("/tmp/deck.pdf"), "/tmp/deck.pptx");

assert.deepStrictEqual(parseArgs(["doctor"]), { command: "doctor" });

const parsed = parseArgs(["slides.pdf", "-o", "out.pptx"]);
assert.strictEqual(parsed.command, "convert");
assert.ok(parsed.inputPath.endsWith("slides.pdf"));
assert.ok(parsed.outputPath.endsWith("out.pptx"));

const info = parsePdfInfo([
  "Title:          Sample",
  "Pages:          2",
  "Page size:      1920 x 1080 pts"
].join("\n"));

assert.deepStrictEqual(info, {
  pageCount: 2,
  widthPoints: 1920,
  heightPoints: 1080
});

const pageSpecificInfo = parsePdfInfo([
  "Pages:           1",
  "Page    1 size:  612 x 792 pts (letter)"
].join("\n"));

assert.deepStrictEqual(pageSpecificInfo, {
  pageCount: 1,
  widthPoints: 612,
  heightPoints: 792
});

assert.throws(() => parseArgs(["slides.pdf", "--bad"]), /Unknown option/);
assert.throws(() => parsePdfInfo("Pages: 1"), /page size/);

console.log("All tests passed.");
