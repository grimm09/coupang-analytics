import type { Store } from "./types";

export const stores: Store[] = [
  {
    id: "local-88",
    name: "Coupang 本土88",
    shortName: "本土88",
    status: "active",
    availableFrom: 1,
    metrics: [
      { month: 1, totalSales: 29906910, adSales: 1019910, adSpend: 189590, impressions: 610919, clicks: 1021, conversions: 52, roas: 537.96 },
      { month: 2, totalSales: 31448850, adSales: 770390, adSpend: 221357, impressions: 681018, clicks: 977, conversions: 42, roas: 348.03 },
      { month: 3, totalSales: 55166850, adSales: 3692730, adSpend: 976918, impressions: 2481386, clicks: 3648, conversions: 198, roas: 378.0 },
      { month: 4, totalSales: 37491430, adSales: 2122920, adSpend: 407381, impressions: 1009090, clicks: 2466, conversions: 115, roas: 521.11 },
      { month: 5, totalSales: 57934200, adSales: 5327360, adSpend: 1474351, impressions: 1170749, clicks: 4422, conversions: 287, roas: 361.34 }
    ]
  },
  {
    id: "local-70",
    name: "Coupang 本土70",
    shortName: "本土70",
    status: "active",
    availableFrom: 3,
    metrics: [
      { month: 3, totalSales: 10013630, adSales: 1781860, adSpend: 376675, impressions: 1003083, clicks: 2692, conversions: 70, roas: 473.05 },
      { month: 4, totalSales: 16422290, adSales: 2560930, adSpend: 354302, impressions: 303047, clicks: 1865, conversions: 120, roas: 722.81 },
      { month: 5, totalSales: 29268650, adSales: 3687760, adSpend: 852082, impressions: 862605, clicks: 4041, conversions: 213, roas: 432.79 }
    ]
  }
];

export const storeRegistry = new Map(stores.map((store) => [store.id, store]));

export const sourceNotes = {
  sales: "来自各月店铺整体广告截图",
  products: "经营分析 Excel 当前为空表，等待有效明细",
};
