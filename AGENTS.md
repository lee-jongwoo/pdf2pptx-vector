Project:
CLI tool converting PDF slides into PPTX using SVG.

Constraints:
- No editable reconstruction
- No rasterization by default
- Keep MVP small
- Prefer simple code

Stack:
- TypeScript
- Node
- PptxGenJS
- pdf2svg

Rules:
- Separate CLI / conversion / PPTX logic
- Clean temp files
- Clear errors
- No silent failures

Done criteria:
- Build passes
- Basic test run works
- One manual conversion tested
- Summary included