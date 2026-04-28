import PptxGenJS from "pptxgenjs";

import { PdfInfo } from "./pdf";

const POINTS_PER_INCH = 72;

export async function createPptxFromSvgs(
  svgPaths: string[],
  pdfInfo: PdfInfo,
  outputPath: string
): Promise<void> {
  const pptx = new PptxGenJS();
  const width = pdfInfo.widthPoints / POINTS_PER_INCH;
  const height = pdfInfo.heightPoints / POINTS_PER_INCH;

  pptx.author = "pdf2pptx-vector";
  pptx.company = "pdf2pptx-vector";
  pptx.subject = "Converted from PDF";
  pptx.title = "Converted PDF slides";
  pptx.defineLayout({ name: "PDF_PAGE", width, height });
  pptx.layout = "PDF_PAGE";

  for (const svgPath of svgPaths) {
    const slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addImage({ path: svgPath, x: 0, y: 0, w: width, h: height });
  }

  await pptx.writeFile({ fileName: outputPath });
}
