// Extract text from PDF
export async function extractTextFromPDF(file: File): Promise<string[][]> {
  const buffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: buffer }).promise;
  const allRows: string[][] = [];
  const threshold = 5; // Adjust this if rows aren’t grouping correctly

  for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
    const page = await pdf.getPage(pageIndex);
    const textContent = await page.getTextContent();
    const items = textContent.items as any[];

    const rows: Map<number, any[]> = new Map();
    for (const item of items) {
      const y = item.transform[5];
      let found = false;
      for (const [key] of rows) {
        if (Math.abs(key - y) < threshold) {
          rows.get(key)!.push(item);
          found = true;
          break;
        }
      }
      if (!found) rows.set(y, [item]);
    }

    const sortedRows = Array.from(rows).sort((a, b) => b[0] - a[0]);
    for (const [_, rowItems] of sortedRows) {
      rowItems.sort((a, b) => a.transform[4] - b.transform[4]);
      const rowText = rowItems.map((item) => item.str.trim());
      if (rowText.length > 0) allRows.push(rowText);
    }
  }

  console.log("Extracted rows from PDF:", allRows); // Check extracted text
  if (allRows.length === 0) throw new Error("No text content found in the PDF");
  return allRows;
}

// Parse table data
function parseTableData(data: string[][]): string[][] {
  if (data.length < 1) return [["adaCode", "price"]];
  const result: string[][] = [["adaCode", "price"]];

  const adaKeywords = ["ada", "code", "procedure", "cdt"];
  const priceKeywords = ["fee", "price", "allowance", "rate", "amount"];

  let headerRowIndex = -1;
  for (let i = 0; i < data.length; i++) {
    const row = data[i].map((cell) => cell.toLowerCase().trim());
    if (
      row.some((cell) => adaKeywords.some((kw) => cell.includes(kw))) &&
      row.some((cell) => priceKeywords.some((kw) => cell.includes(kw)))
    ) {
      headerRowIndex = i;
      break;
    }
  }
  console.log("Header row index:", headerRowIndex);

  let adaCodeCol = -1;
  let priceCol = -1;

  if (headerRowIndex !== -1) {
    const headers = data[headerRowIndex].map((h) => h.toLowerCase().trim());
    for (let i = 0; i < headers.length; i++) {
      if (adaKeywords.some((kw) => headers[i].includes(kw))) adaCodeCol = i;
      if (priceKeywords.some((kw) => headers[i].includes(kw))) priceCol = i;
    }
  }

  if (adaCodeCol === -1 || priceCol === -1) {
    const colScores: { adaCode: number; price: number }[] = Array(
      data[0].length,
    ).fill({ adaCode: 0, price: 0 });
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[row].length; col++) {
        const cell = data[row][col].trim();
        if (/D\d{4}/.test(cell)) colScores[col].adaCode++;
        if (isPriceCell(cell)) colScores[col].price++;
      }
    }
    adaCodeCol = colScores.findIndex(
      (s) => s.adaCode === Math.max(...colScores.map((s) => s.adaCode)),
    );
    priceCol = colScores.findIndex(
      (s) => s.price === Math.max(...colScores.map((s) => s.price)),
    );
  }
  console.log("ADA code column:", adaCodeCol, "Price column:", priceCol);

  const startRow = headerRowIndex !== -1 ? headerRowIndex + 1 : 0;
  for (let row = startRow; row < data.length; row++) {
    if (data[row].length <= adaCodeCol || data[row].length <= priceCol)
      continue;
    const adaCode = data[row][adaCodeCol].trim();
    const priceStr = data[row][priceCol].trim();

    if (/D\d{4}/.test(adaCode)) {
      const price = normalizePrice(priceStr);
      result.push([adaCode, price]);
    }
  }

  console.log("Parsed data:", result); // Check final output
  return result;
}

function isPriceCell(cell: string): boolean {
  const trimmed = cell.trim();
  if (trimmed.startsWith("$")) {
    const num = trimmed.slice(1).replace(/,/g, "");
    return !isNaN(parseFloat(num));
  }
  return !isNaN(parseFloat(trimmed.replace(/,/g, "")));
}

function normalizePrice(priceStr: string): string {
  const trimmed = priceStr.trim().toLowerCase();
  if (
    trimmed.includes("%") ||
    trimmed.includes("discount") ||
    trimmed.includes("no")
  ) {
    return "0";
  }
  const cleaned = trimmed.replace(/[\$,]/g, "");
  return cleaned === "" || isNaN(parseFloat(cleaned)) ? "0" : cleaned;
}
