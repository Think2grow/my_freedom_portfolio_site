import Papa from 'papaparse';

// In-memory cache with TTL
interface CacheEntry {
  data: any[];
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Sheet IDs from environment or defaults
const PORTFOLIO_SHEET_ID = import.meta.env.SHEET_PORTFOLIO_ID || '1Nh1PhHEyzk1G7XWFpRG5ivXfWumgyNzxyKxw68gKbtQ';
const PORTFOLIO_GID = import.meta.env.SHEET_PORTFOLIO_GID || '0';
const ETF_SHEET_ID = import.meta.env.SHEET_ETF_ID || '1irkOwYS3phsSBpeHMq1xt6XyfTcMQEBuZdPfOsh0SOw';
const ETF_GID = import.meta.env.SHEET_ETF_GID || '0';

/**
 * Fetch and parse CSV from Google Sheets using gviz export
 */
async function fetchSheetData(sheetId: string, gid: string, cacheKey: string): Promise<any[]> {
  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Build CSV export URL
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();

    // Parse CSV
    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim()
    });

    if (parsed.errors.length > 0) {
      console.error('CSV parsing errors:', parsed.errors);
    }

    const data = parsed.data as any[];

    // Update cache
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    console.error(`Error fetching sheet ${cacheKey}:`, error);
    throw error;
  }
}

/**
 * Fetch Portfolio List data (Sheet 1)
 */
export async function fetchPortfolioRows(): Promise<any[]> {
  return fetchSheetData(PORTFOLIO_SHEET_ID, PORTFOLIO_GID, 'portfolio');
}

/**
 * Fetch Weekly ETF List data (Sheet 2)
 */
export async function fetchEtfRows(): Promise<any[]> {
  return fetchSheetData(ETF_SHEET_ID, ETF_GID, 'etf');
}
