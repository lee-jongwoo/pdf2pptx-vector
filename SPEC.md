# pdf2pptx-vector SPEC

Goal:
Create a macOS-friendly CLI tool that converts a presentation PDF into a PPTX file.

The output PPTX should have one slide per PDF page. Each slide should contain a full-slide SVG representation of the corresponding PDF page.

Primary use case:
User creates slides in Keynote → exports PDF → converts to PPTX for presentation.

Non-goals:
- No editable objects
- No animations
- No speaker notes
- No GUI
- Not for scanned PDFs

Platform:
- macOS
- Homebrew tools allowed

Dependency:
- `pdf2svg`

MVP behavior:
Command:
```bash
pdf2pptx input.pdf -o output.pptx
```

omitting the `-o` parameter will create `input.pptx` under the same directory.

Requirements:
- Detect page count
- Convert each page to SVG
- One slide per page
- Preserve aspect ratio
- Full-slide SVG
- Clear error messages

Doctor command:
```bash
pdf2pptx doctor
```

Checks:
- `pdf2svg` exists
- temp directory works