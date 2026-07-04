/**
 * A lightweight, zero-dependency CSV parser tailored for FinPilot bank statements.
 * Expected CSV Headers: Date, Description, Amount, Type
 */
export interface ParsedTransaction {
  date: Date;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
}

export function parseBankCSV(csvText: string): ParsedTransaction[] {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length < 2) throw new Error("CSV file is empty or missing headers.");

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  
  // Validate required headers
  const required = ["date", "description", "amount", "type"];
  const missing = required.filter((req) => !headers.includes(req));
  
  if (missing.length > 0) {
    throw new Error(`Invalid CSV format. Missing columns: ${missing.join(", ")}`);
  }

  const results: ParsedTransaction[] = [];

  // Parse rows (skipping header)
  for (let i = 1; i < lines.length; i++) {
    // Simple split (assumes no commas inside quoted strings for this MVP)
    const values = lines[i].split(",").map((val) => val.trim());
    
    const rawDate = values[headers.indexOf("date")];
    const rawDesc = values[headers.indexOf("description")];
    const rawAmount = parseFloat(values[headers.indexOf("amount")]);
    const rawType = values[headers.indexOf("type")].toUpperCase();

    if (!rawDate || isNaN(rawAmount) || !["INCOME", "EXPENSE"].includes(rawType)) {
      console.warn(`Skipping invalid row ${i + 1}:`, lines[i]);
      continue;
    }

    results.push({
      date: new Date(rawDate),
      description: rawDesc,
      amount: Math.abs(rawAmount),
      type: rawType as "INCOME" | "EXPENSE",
    });
  }

  return results;
}