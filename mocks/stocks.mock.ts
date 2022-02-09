import { StockData } from 'interfaces/StockData';

export const STOCKS: StockData[] = [
  {
    canonical_url: '/stocks/ca/banks/tsx-ry/royal-bank-of-canada-shares',
    company_id: '1592FD9F-BF5B-469D-B8F3-D33379E0C0DE',
    id: 109809,
    info: {
      data: {
        description:
          'Royal Bank of Canada operates as a diversified financial service company worldwide',
      },
    },
    name: 'Royal Bank of Canada',
    score: {
      data: {
        future: 1,
        health: 6,
        income: 5,
        management: 0,
        misc: 0,
        past: 4,
        sentence: 'Flawless balance sheet established dividend payer.',
        total: 18,
        value: 2,
      },
    },
    unique_symbol: 'TSX:RY',
  },
  {
    id: 21835,
    company_id: '424EB65E-8C34-42BF-A107-61F93D4E9E6D',
    name: 'Microsoft',
    unique_symbol: 'NasdaqGS:MSFT',
    canonical_url: '/stocks/us/software/nasdaq-msft/microsoft',
    info: {
      data: {
        description:
          'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
      },
    },
    score: {
      data: {
        value: 3,
        income: 4,
        health: 6,
        past: 6,
        future: 3,
        management: 0,
        misc: 0,
        total: 22,
        sentence:
          'Outstanding track record with flawless balance sheet and pays a dividend.',
      },
    },
  },
  {
    id: 32307,
    company_id: '08830E11-EECD-4A85-982D-B0AE1DFD6F7A',
    name: 'NVIDIA',
    unique_symbol: 'NasdaqGS:NVDA',
    canonical_url: '/stocks/us/semiconductors/nasdaq-nvda/nvidia',
    info: {
      data: {
        description:
          'NVIDIA Corporation operates as a visual computing company worldwide.',
      },
    },
    score: {
      data: {
        value: 0,
        income: 0,
        health: 6,
        past: 6,
        future: 4,
        management: 0,
        misc: 0,
        total: 16,
        sentence: 'Flawless balance sheet with outstanding track record.',
      },
    },
  },
  {
    id: 658776,
    company_id: '6BF23710-7472-4CDD-BA10-00575A451825',
    name: 'JPMorgan Chase',
    unique_symbol: 'NYSE:JPM',
    canonical_url: '/stocks/us/banks/nyse-jpm/jpmorgan-chase',
    info: {
      data: {
        description:
          'JPMorgan Chase & Co. operates as a financial services company worldwide.',
      },
    },
    score: {
      data: {
        value: 4,
        income: 5,
        health: 6,
        past: 5,
        future: 0,
        management: 0,
        misc: 0,
        total: 20,
        sentence:
          'Flawless balance sheet with solid track record and pays a dividend.',
      },
    },
  },
];
