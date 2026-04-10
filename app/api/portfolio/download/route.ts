import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import {
  PORTFOLIO_CATEGORIES,
  type PortfolioCategoryKey,
} from "@/features/projects/data/portfolio-download.data";

function parseCategories(raw: string | null): PortfolioCategoryKey[] {
  if (!raw) return PORTFOLIO_CATEGORIES.map((c) => c.key);

  const requested = raw
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean) as PortfolioCategoryKey[];

  const allowed = new Set(PORTFOLIO_CATEGORIES.map((c) => c.key));
  const filtered = requested.filter((k) => allowed.has(k));

  return filtered.length ? filtered : PORTFOLIO_CATEGORIES.map((c) => c.key);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const categories = parseCategories(searchParams.get("categories"));

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const page = pdf.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  // Header
  page.drawText("Node Solution — Portfolio (Demo Template)", {
    x: 50,
    y: height - 70,
    size: 18,
    font: bold,
    color: rgb(0.1, 0.12, 0.14),
  });

  page.drawText("Selected Categories:", {
    x: 50,
    y: height - 110,
    size: 12,
    font: bold,
    color: rgb(0.2, 0.25, 0.3),
  });

  const categoryLabels = categories.map((k) => {
    const found = PORTFOLIO_CATEGORIES.find((c) => c.key === k);
    return found?.title ?? k;
  });

  let y = height - 135;
  for (const label of categoryLabels) {
    page.drawText(`• ${label}`, {
      x: 60,
      y,
      size: 11,
      font,
      color: rgb(0.2, 0.25, 0.3),
    });
    y -= 18;
  }

  // Body placeholder sections
  let sectionY = y - 10;

  for (const label of categoryLabels) {
    if (sectionY < 140) {
      sectionY = height - 80;
      pdf.addPage([595.28, 841.89]);
    }

    const p = pdf.getPages()[pdf.getPageCount() - 1];

    p.drawText(label, {
      x: 50,
      y: sectionY,
      size: 14,
      font: bold,
      color: rgb(0.07, 0.12, 0.16),
    });

    p.drawText(
      "Demo content: Replace this section with real projects from CMS.",
      {
        x: 50,
        y: sectionY - 22,
        size: 11,
        font,
        color: rgb(0.25, 0.3, 0.35),
      }
    );

    // Fake “project blocks”
    const blockY = sectionY - 60;
    p.drawRectangle({
      x: 50,
      y: blockY - 110,
      width: width - 100,
      height: 110,
      borderWidth: 1,
      borderColor: rgb(0.8, 0.84, 0.88),
      color: rgb(0.97, 0.98, 0.99),
    });

    p.drawText("Project Title Placeholder", {
      x: 65,
      y: blockY - 30,
      size: 12,
      font: bold,
      color: rgb(0.1, 0.12, 0.14),
    });

    p.drawText("Short description placeholder for this category.", {
      x: 65,
      y: blockY - 52,
      size: 10,
      font,
      color: rgb(0.25, 0.3, 0.35),
    });

    sectionY -= 170;
  }

const bytes = await pdf.save();

return new NextResponse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="NodeSolution-Portfolio.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}