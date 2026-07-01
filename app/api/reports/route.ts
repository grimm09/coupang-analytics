import { NextResponse } from "next/server";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { storeRegistry } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as { storeId?: string };
  const store = body.storeId ? storeRegistry.get(body.storeId) : undefined;
  if (!store) return NextResponse.json({ error: "未知店铺" }, { status: 400 });

  const script = path.join(process.cwd(), "python", "generate_report.py");
  const tempDir = path.join(process.cwd(), ".reports");
  await fs.mkdir(tempDir, { recursive: true });
  const inputPath = path.join(tempDir, `${store.id}.json`);
  const outputPath = path.join(tempDir, `${store.id}.pdf`);
  await fs.writeFile(inputPath, JSON.stringify(store), "utf8");

  const bundledPython = process.env.USERPROFILE
    ? path.join(process.env.USERPROFILE, ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "python", "python.exe")
    : "python";
  const pythonBin = process.env.PYTHON_BIN || bundledPython;
  await new Promise<void>((resolve, reject) => {
    const child = spawn(pythonBin, [script, inputPath, outputPath], { windowsHide: true });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += String(chunk); });
    child.on("error", reject);
    child.on("close", (code) => code === 0 ? resolve() : reject(new Error(stderr || `Python exited ${code}`)));
  }).catch((error: unknown) => {
    throw new Error(error instanceof Error ? error.message : "报告生成失败");
  });

  const pdf = await fs.readFile(outputPath);
  return new NextResponse(pdf, { headers: { "content-type": "application/pdf", "content-disposition": `attachment; filename="${store.id}-2026-01-05.pdf"` } });
}
