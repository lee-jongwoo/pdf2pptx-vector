#!/usr/bin/env node
import { parseArgs, helpText } from "./args";
import { convertPdfToPptx } from "./convert";
import { errorMessage } from "./errors";
import { runDoctor } from "./doctor";

async function main(): Promise<void> {
  const parsed = parseArgs(process.argv.slice(2));

  if (parsed.command === "help") {
    console.log(helpText());
    return;
  }

  if (parsed.command === "doctor") {
    const results = await runDoctor();
    for (const result of results) {
      console.log(`${result.ok ? "OK" : "FAIL"} ${result.name}: ${result.message}`);
    }

    if (results.some((result) => !result.ok)) {
      process.exitCode = 1;
    }
    return;
  }

  await convertPdfToPptx({
    inputPath: parsed.inputPath,
    outputPath: parsed.outputPath
  });
  console.log(`Wrote ${parsed.outputPath}`);
}

main().catch((error) => {
  console.error(`Error: ${errorMessage(error)}`);
  process.exitCode = 1;
});
