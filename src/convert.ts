import { access } from "fs/promises";
import { constants } from "fs";
import { dirname } from "path";

import { convertPdfPagesToSvg } from "./conversion";
import { UserError } from "./errors";
import { readPdfInfo } from "./pdf";
import { createPptxFromSvgs } from "./pptx";

export interface ConvertOptions {
  inputPath: string;
  outputPath: string;
}

export async function convertPdfToPptx(options: ConvertOptions): Promise<void> {
  await ensureReadableFile(options.inputPath);
  await ensureWritableDirectory(dirname(options.outputPath));

  const pdfInfo = await readPdfInfo(options.inputPath);
  const converted = await convertPdfPagesToSvg(options.inputPath, pdfInfo.pageCount);

  try {
    await createPptxFromSvgs(converted.svgPaths, pdfInfo, options.outputPath);
  } finally {
    await converted.cleanup();
  }
}

async function ensureReadableFile(path: string): Promise<void> {
  try {
    await access(path, constants.R_OK);
  } catch {
    throw new UserError(`Input PDF is not readable: ${path}`);
  }
}

async function ensureWritableDirectory(path: string): Promise<void> {
  try {
    await access(path, constants.W_OK);
  } catch {
    throw new UserError(`Output directory is not writable: ${path}`);
  }
}
