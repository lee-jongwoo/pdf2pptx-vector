# pdf2pptx-vector

Convert a presentation PDF into a PowerPoint deck with one full-slide SVG per PDF page.

This tool is meant for decks exported from apps like Keynote. It does not reconstruct editable PowerPoint objects and does not rasterize slides by default.

## Requirements

- macOS
- Node.js
- `pdf2svg`
- `pdfinfo` from Poppler

With Homebrew:

```bash
brew install node pdf2svg poppler
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
