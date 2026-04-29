# pdf2pptx-vector

Convert a presentation PDF into a PowerPoint deck with one full-slide SVG per PDF page.

This tool is meant for decks exported from apps like Keynote. It does not reconstruct editable PowerPoint objects and does not rasterize slides by default.

## Install

with Homebrew

```bash
brew tap lee-jongwoo/pdf2pptx-vector
brew install pdf2pptx-vector
```

with npm

```bash
npm install -g pdf2pptx-vector
```

## Usage

```bash
pdf2pptx input.pdf -o output.pptx
```

If `-o` is omitted, the output is written next to the input PDF with a `.pptx` extension.

```bash
pdf2pptx input.pdf
```

Check the machine setup:

```bash
pdf2pptx doctor
```

## Development

```bash
npm install
npm test
node dist/cli.js doctor
```

## Distribution

See [HOMEBREW.md](HOMEBREW.md) for Homebrew packaging and release steps.
