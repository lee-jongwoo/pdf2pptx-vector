import { mkdir, mkdtemp, rm } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

import { runCommand } from "./process";

export async function convertPdfPagesToSvg(
  pdfPath: string,
  pageCount: number
): Promise<{ svgPaths: string[]; cleanup: () => Promise<void> }> {
  const tempDir = await mkdtemp(join(tmpdir(), "pdf2pptx-"));
  const svgDir = join(tempDir, "svg");
  await mkdir(svgDir);

  try {
    const svgPaths: string[] = [];
    for (let page = 1; page <= pageCount; page += 1) {
      const svgPath = join(svgDir, `page-${String(page).padStart(4, "0")}.svg`);
      await runCommand("pdf2svg", [pdfPath, svgPath, String(page)]);
      svgPaths.push(svgPath);
    }

    return {
      svgPaths,
      cleanup: () => rm(tempDir, { recursive: true, force: true })
    };
  } catch (error) {
    await rm(tempDir, { recursive: true, force: true });
    throw error;
  }
}
