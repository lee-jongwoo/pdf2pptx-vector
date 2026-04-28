import { access, mkdtemp, rm, writeFile } from "fs/promises";
import { constants } from "fs";
import { join } from "path";
import { tmpdir } from "os";

import { runCommand } from "./process";

export interface DoctorResult {
  name: string;
  ok: boolean;
  message: string;
}

async function checkExecutable(path: string): Promise<boolean> {
  try {
    await access(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

export async function runDoctor(): Promise<DoctorResult[]> {
  const results: DoctorResult[] = [];

  const pdf2svgPath = await findCommand("pdf2svg");
  results.push({
    name: "pdf2svg",
    ok: Boolean(pdf2svgPath),
    message: pdf2svgPath || "not found in PATH"
  });

  const pdfinfoPath = await findCommand("pdfinfo");
  results.push({
    name: "pdfinfo",
    ok: Boolean(pdfinfoPath),
    message: pdfinfoPath || "not found in PATH"
  });

  let tempDir: string | undefined;
  try {
    tempDir = await mkdtemp(join(tmpdir(), "pdf2pptx-doctor-"));
    const probe = join(tempDir, "probe.txt");
    await writeFile(probe, "ok", "utf8");
    results.push({
      name: "temp directory",
      ok: true,
      message: tempDir
    });
  } catch (error) {
    results.push({
      name: "temp directory",
      ok: false,
      message: error instanceof Error ? error.message : String(error)
    });
  } finally {
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
  }

  return results;
}

export async function findCommand(command: string): Promise<string | null> {
  try {
    const result = await runCommand("which", [command]);
    const candidate = result.stdout.trim();
    if (!candidate) {
      return null;
    }

    return (await checkExecutable(candidate)) ? candidate : null;
  } catch {
    return null;
  }
}
