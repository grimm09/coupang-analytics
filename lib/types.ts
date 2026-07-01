export type MonthlyMetric = {
  month: number;
  totalSales: number;
  adSales: number;
  adSpend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
};

export type Store = {
  id: string;
  name: string;
  shortName: string;
  status: "active" | "planned";
  availableFrom: number;
  metrics: MonthlyMetric[];
};
