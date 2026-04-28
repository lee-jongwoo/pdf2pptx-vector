import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function runCommand(
  command: string,
  args: string[]
): Promise<{ stdout: string; stderr: string }> {
  try {
    return await execFileAsync(command, args, { encoding: "utf8" });
  } catch (error) {
    const details = error as Error & { stderr?: string; stdout?: string };
    const stderr = details.stderr ? `\n${details.stderr.trim()}` : "";
    const stdout = details.stdout ? `\n${details.stdout.trim()}` : "";
    throw new Error(`${command} failed.${stderr}${stdout}`);
  }
}
