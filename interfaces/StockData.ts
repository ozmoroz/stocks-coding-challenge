/** Info returned from Stocks API for a single stock. */
export interface StockData {
    // Comments are sample data for Royal Bank of Canada
    canonical_url: string; // "/stocks/ca/banks/tsx-ry/royal-bank-of-canada-shares"
    company_id: string; // "1592FD9F-BF5B-469D-B8F3-D33379E0C0DE"
    id: number; // 109809;
    info: {
      data: {
        description: string; // "Royal Bank of Canada operates as a diversified financial service company worldwide"
      };
    };
    name: string; // "Royal Bank of Canada"
    score: {
      data: {
        future: number; // 1
        health: number; // 6
        income: number; // 5
        management: number; // 0
        misc: number; // 0
        past: number; // 4
        sentence: string; // "Flawless balance sheet established dividend payer."
        total: number; // 18
        value: number; // 2
      };
    };
    unique_symbol: string; // "TSX:RY"
  }