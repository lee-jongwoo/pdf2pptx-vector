import { dirname, extname, join, resolve } from "path";

import { UserError } from "./errors";

export type ParsedArgs =
  | { command: "doctor" }
  | { command: "help" }
  | { command: "convert"; inputPath: string; outputPath: string };

export function parseArgs(args: string[]): ParsedArgs {
  if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
    return { command: "help" };
  }

  if (args[0] === "doctor") {
    if (args.length > 1) {
      throw new UserError("The doctor command does not accept extra arguments.");
    }
    return { command: "doctor" };
  }

  let input: string | undefined;
  let output: string | undefined;

  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];

    if (value === "-o" || value === "--output") {
      output = args[index + 1];
      if (!output || output.startsWith("-")) {
        throw new UserError("Missing value for -o/--output.");
      }
      index += 1;
      continue;
    }

    if (value.startsWith("-")) {
      throw new UserError(`Unknown option: ${value}`);
    }

    if (input) {
      throw new UserError("Only one input PDF can be converted at a time.");
    }
    input = value;
  }

  if (!input) {
    throw new UserError("Missing input PDF path.");
  }

  return {
    command: "convert",
    inputPath: resolve(input),
    outputPath: resolve(output || defaultOutputPath(input))
  };
}

export function defaultOutputPath(inputPath: string): string {
  const extension = extname(inputPath);
  const base = extension ? inputPath.slice(0, -extension.length) : inputPath;
  return join(dirname(inputPath), `${base.split(/[\\/]/).pop() || "output"}.pptx`);
}

export function helpText(): string {
  return [
    "Usage:",
    "  pdf2pptx input.pdf -o output.pptx",
    "  pdf2pptx input.pdf",
    "  pdf2pptx doctor",
    "",
    "Converts each PDF page to SVG and places it as a full-slide PPTX image."
  ].join("\n");
}
