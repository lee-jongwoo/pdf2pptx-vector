import { runCommand } from "./process";
import { UserError } from "./errors";

export interface PdfInfo {
  pageCount: number;
  widthPoints: number;
  heightPoints: number;
}

export function parsePdfInfo(output: string): PdfInfo {
  const pagesMatch = output.match(/^Pages:\s+(\d+)/m);
  const pageSizeMatch = output.match(
    /^(?:Page size|Page\s+\d+\s+size):\s+([\d.]+)\s+x\s+([\d.]+)\s+pts/m
  );

  if (!pagesMatch) {
    throw new UserError("Could not detect PDF page count from pdfinfo output.");
  }

  if (!pageSizeMatch) {
    throw new UserError("Could not detect PDF page size from pdfinfo output.");
  }

  const pageCount = Number(pagesMatch[1]);
  const widthPoints = Number(pageSizeMatch[1]);
  const heightPoints = Number(pageSizeMatch[2]);

  if (!Number.isInteger(pageCount) || pageCount < 1) {
    throw new UserError("PDF must contain at least one page.");
  }

  if (!Number.isFinite(widthPoints) || !Number.isFinite(heightPoints)) {
    throw new UserError("PDF page size is invalid.");
  }

  return { pageCount, widthPoints, heightPoints };
}

export async function readPdfInfo(pdfPath: string): Promise<PdfInfo> {
  const result = await runCommand("pdfinfo", ["-f", "1", "-l", "1", pdfPath]);
  return parsePdfInfo(result.stdout);
}
