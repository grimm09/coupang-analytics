import type { AdPeriodRow } from "./ad-analysis";

export type AugustAdStoreKey = "all" | "88" | "70" | "329";
export type AugustAdTrendMetric = "impressions" | "clicks" | "conversionSalesCount" | "roas";

export type AugustAdSummary = {
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  adOrders: number;
  conversionSalesCount: number;
  cvr: number;
  adSpend: number;
  adSales: number;
  totalSales: number;
  roas: number;
  adSalesRatio: number;
};

export type AugustAdStoreData = {
  key: AugustAdStoreKey;
  label: string;
  summary: AugustAdSummary;
  periodRows: AdPeriodRow[];
};

export const augustAdStores: Record<AugustAdStoreKey, AugustAdStoreData> = {
  all: {
    key: "all",
    label: "三店整体",
    summary: { impressions: 1373858, clicks: 15481, ctr: 0.0112682679, cpc: 142, adOrders: 399, conversionSalesCount: 400, cvr: 0.0257735288, adSpend: 2209814, adSales: 11234390, totalSales: 57792250, roas: 5.0838622617, adSalesRatio: 0.1943926738 },
    periodRows: [
  { period: "08/01–08/01", impressions: 0, clicks: 0, ctr: 0.0000000000, cpc: 0, adOrders: 0, conversionSalesCount: 0, cvr: 0.0000000000, adSpend: 0, adSales: 0, totalSales: 1371780, roas: 0.0000000000 },
  { period: "08/02–08/08", impressions: 178487, clicks: 1565, ctr: 0.0087681456, cpc: 186, adOrders: 62, conversionSalesCount: 62, cvr: 0.0396166134, adSpend: 291771, adSales: 1813720, totalSales: 14101860, roas: 6.2162449318 },
  { period: "08/09–08/15", impressions: 333115, clicks: 3569, ctr: 0.0107140177, cpc: 109, adOrders: 52, conversionSalesCount: 52, cvr: 0.0145699075, adSpend: 389757, adSales: 1565950, totalSales: 12398170, roas: 4.0177597837 },
  { period: "08/16–08/22", impressions: 390931, clicks: 4947, ctr: 0.0126544070, cpc: 132, adOrders: 143, conversionSalesCount: 143, cvr: 0.0289064079, adSpend: 655875, adSales: 3917530, totalSales: 15305350, roas: 5.9729826568 },
  { period: "08/23–08/29", impressions: 429162, clicks: 4894, ctr: 0.0114036191, cpc: 152, adOrders: 128, conversionSalesCount: 129, cvr: 0.0261544749, adSpend: 745753, adSales: 3523890, totalSales: 11881560, roas: 4.7252776724 },
  { period: "08/30–08/31", impressions: 42163, clicks: 506, ctr: 0.0120010436, cpc: 250, adOrders: 14, conversionSalesCount: 14, cvr: 0.0276679842, adSpend: 126658, adSales: 413300, totalSales: 2733530, roas: 3.2631180028 },
    ],
  },
  "88": {
    key: "88",
    label: "本土88",
    summary: { impressions: 139242, clicks: 1105, ctr: 0.0079358240, cpc: 164, adOrders: 23, conversionSalesCount: 23, cvr: 0.0208144796, adSpend: 181675, adSales: 831940, totalSales: 20204580, roas: 4.5792761800, adSalesRatio: 0.0411758126 },
    periodRows: [
  { period: "08/01–08/01", impressions: 0, clicks: 0, ctr: 0.0000000000, cpc: 0, adOrders: 0, conversionSalesCount: 0, cvr: 0.0000000000, adSpend: 0, adSales: 0, totalSales: 680190, roas: 0.0000000000 },
  { period: "08/02–08/08", impressions: 0, clicks: 0, ctr: 0.0000000000, cpc: 0, adOrders: 0, conversionSalesCount: 0, cvr: 0.0000000000, adSpend: 0, adSales: 0, totalSales: 4730330, roas: 0.0000000000 },
  { period: "08/09–08/15", impressions: 61599, clicks: 373, ctr: 0.0060552931, cpc: 13, adOrders: 1, conversionSalesCount: 1, cvr: 0.0026809651, adSpend: 5206, adSales: 28000, totalSales: 5023250, roas: 5.3784095275 },
  { period: "08/16–08/22", impressions: 41992, clicks: 379, ctr: 0.0090255287, cpc: 217, adOrders: 10, conversionSalesCount: 10, cvr: 0.0263852243, adSpend: 82398, adSales: 379000, totalSales: 4313330, roas: 4.5996262045 },
  { period: "08/23–08/29", impressions: 32010, clicks: 343, ctr: 0.0107154014, cpc: 271, adOrders: 12, conversionSalesCount: 12, cvr: 0.0349854227, adSpend: 93241, adSales: 424940, totalSales: 4146360, roas: 4.5574371789 },
  { period: "08/30–08/31", impressions: 3641, clicks: 10, ctr: 0.0027464982, cpc: 83, adOrders: 0, conversionSalesCount: 0, cvr: 0.0000000000, adSpend: 830, adSales: 0, totalSales: 1311120, roas: 0.0000000000 },
    ],
  },
  "70": {
    key: "70",
    label: "本土70",
    summary: { impressions: 684881, clicks: 9118, ctr: 0.0133132617, cpc: 96, adOrders: 155, conversionSalesCount: 156, cvr: 0.0169993420, adSpend: 877983, adSales: 3995720, totalSales: 19154250, roas: 4.5510220585, adSalesRatio: 0.2086074892 },
    periodRows: [
  { period: "08/01–08/01", impressions: 0, clicks: 0, ctr: 0.0000000000, cpc: 0, adOrders: 0, conversionSalesCount: 0, cvr: 0.0000000000, adSpend: 0, adSales: 0, totalSales: 538990, roas: 0.0000000000 },
  { period: "08/02–08/08", impressions: 94010, clicks: 1185, ctr: 0.0126050420, cpc: 179, adOrders: 48, conversionSalesCount: 48, cvr: 0.0405063291, adSpend: 213109, adSales: 1356220, totalSales: 6402640, roas: 6.3639733657 },
  { period: "08/09–08/15", impressions: 147980, clicks: 2173, ctr: 0.0146844168, cpc: 108, adOrders: 33, conversionSalesCount: 33, cvr: 0.0151863783, adSpend: 234835, adSales: 859950, totalSales: 4059050, roas: 3.6619328465 },
  { period: "08/16–08/22", impressions: 220592, clicks: 2884, ctr: 0.0130739102, cpc: 73, adOrders: 45, conversionSalesCount: 45, cvr: 0.0156033287, adSpend: 211048, adSales: 1029630, totalSales: 4803780, roas: 4.8786531974 },
  { period: "08/23–08/29", impressions: 221823, clicks: 2870, ctr: 0.0129382436, cpc: 76, adOrders: 29, conversionSalesCount: 30, cvr: 0.0101045296, adSpend: 218342, adSales: 749920, totalSales: 2884500, roas: 3.4346117559 },
  { period: "08/30–08/31", impressions: 476, clicks: 6, ctr: 0.0126050420, cpc: 108, adOrders: 0, conversionSalesCount: 0, cvr: 0.0000000000, adSpend: 649, adSales: 0, totalSales: 465290, roas: 0.0000000000 },
    ],
  },
  "329": {
    key: "329",
    label: "跨境329",
    summary: { impressions: 549735, clicks: 5258, ctr: 0.0095646084, cpc: 218, adOrders: 221, conversionSalesCount: 221, cvr: 0.0420311906, adSpend: 1150156, adSales: 6406730, totalSales: 18433420, roas: 5.5703139400, adSalesRatio: 0.3475605720 },
    periodRows: [
  { period: "08/01–08/01", impressions: 0, clicks: 0, ctr: 0.0000000000, cpc: 0, adOrders: 0, conversionSalesCount: 0, cvr: 0.0000000000, adSpend: 0, adSales: 0, totalSales: 152600, roas: 0.0000000000 },
  { period: "08/02–08/08", impressions: 84477, clicks: 380, ctr: 0.0044982658, cpc: 207, adOrders: 14, conversionSalesCount: 14, cvr: 0.0368421053, adSpend: 78662, adSales: 457500, totalSales: 2968890, roas: 5.8160229844 },
  { period: "08/09–08/15", impressions: 123536, clicks: 1023, ctr: 0.0082809869, cpc: 146, adOrders: 18, conversionSalesCount: 18, cvr: 0.0175953079, adSpend: 149716, adSales: 678000, totalSales: 3315870, roas: 4.5285741003 },
  { period: "08/16–08/22", impressions: 128347, clicks: 1684, ctr: 0.0131206807, cpc: 215, adOrders: 88, conversionSalesCount: 88, cvr: 0.0522565321, adSpend: 362429, adSales: 2508900, totalSales: 6188240, roas: 6.9224592955 },
  { period: "08/23–08/29", impressions: 175329, clicks: 1681, ctr: 0.0095876894, cpc: 258, adOrders: 87, conversionSalesCount: 87, cvr: 0.0517549078, adSpend: 434170, adSales: 2349030, totalSales: 4850700, roas: 5.4103922427 },
  { period: "08/30–08/31", impressions: 38046, clicks: 490, ctr: 0.0128791463, cpc: 255, adOrders: 14, conversionSalesCount: 14, cvr: 0.0285714286, adSpend: 125179, adSales: 413300, totalSales: 957120, roas: 3.3016720057 },
    ],
  },
};

export const augustAdStoreOrder = ["88", "70", "329"] as const;

export const augustAdStoreColors: Record<(typeof augustAdStoreOrder)[number], string> = {
  "88": "#7655f6",
  "70": "#13b9c4",
  "329": "#f49a18",
};

export const augustAdContribution = {
  orders: { "88": 5.7644, "70": 38.8471, "329": 55.3885 },
  spend: { "88": 8.2213, "70": 39.7311, "329": 52.0476 },
  adSales: { "88": 7.4053, "70": 35.5669, "329": 57.0278 },
};

export const augustAdWeeklyTrends: Record<(typeof augustAdStoreOrder)[number], Record<AugustAdTrendMetric, number[]>> = {
  "88": {
    impressions: [0, 0, 61599, 41992, 32010, 3641],
    clicks: [0, 0, 373, 379, 343, 10],
    conversionSalesCount: [0, 0, 1, 10, 12, 0],
    roas: [0.0000, 0.0000, 5.3784, 4.5996, 4.5574, 0.0000],
  },
  "70": {
    impressions: [0, 94010, 147980, 220592, 221823, 476],
    clicks: [0, 1185, 2173, 2884, 2870, 6],
    conversionSalesCount: [0, 48, 33, 45, 30, 0],
    roas: [0.0000, 6.3640, 3.6619, 4.8787, 3.4346, 0.0000],
  },
  "329": {
    impressions: [0, 84477, 123536, 128347, 175329, 38046],
    clicks: [0, 380, 1023, 1684, 1681, 490],
    conversionSalesCount: [0, 14, 18, 88, 87, 14],
    roas: [0.0000, 5.8160, 4.5286, 6.9225, 5.4104, 3.3017],
  },
};

export const augustAdInsights = [
  { key: "all" as const, title: "三店整体投产", value: "508.39%", note: "每投入 ₩1，带来约 ₩5.08 广告转化销售额。", level: "overall" },
  { key: "88" as const, title: "本土88", value: "457.93%", note: "8月投放集中在后半月，规模收缩但效率稳定。", level: "purple" },
  { key: "70" as const, title: "本土70", value: "455.10%", note: "持续稳定投产，是广告订单的主要来源之一。", level: "cyan" },
  { key: "329" as const, title: "跨境329", value: "557.03%", note: "效率最高且订单贡献过半，兼顾规模与投产。", level: "orange" },
] as const;

export const augustAdHeader = {
  store: "本土88 + 本土70 + 跨境329",
  dateRange: "2026/08/01–2026/08/31",
  sourceNote: "数据来自广告后台截图",
} as const;
