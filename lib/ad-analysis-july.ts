import type { AdPeriodRow } from "./ad-analysis";

export type JulyAdStoreKey = "all" | "88" | "70" | "329";
export type JulyAdTrendMetric = "impressions" | "clicks" | "conversionSalesCount" | "roas";

export type JulyAdSummary = {
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

export type JulyAdStoreData = {
  key: JulyAdStoreKey;
  label: string;
  summary: JulyAdSummary;
  periodRows: AdPeriodRow[];
};

const overallPeriods: AdPeriodRow[] = [
  { period: "07/01–07/04", impressions: 131_431, clicks: 321, ctr: .0024423462, cpc: 388, adOrders: 18, conversionSalesCount: 18, cvr: .0560747664, adSpend: 124_445, adSales: 412_170, totalSales: 8_531_370, roas: 3.3120655711 },
  { period: "07/05–07/11", impressions: 430_935, clicks: 2_244, ctr: .0052072818, cpc: 283, adOrders: 114, conversionSalesCount: 115, cvr: .0508021390, adSpend: 634_002, adSales: 2_459_510, totalSales: 21_569_440, roas: 3.8793410746 },
  { period: "07/12–07/18", impressions: 456_621, clicks: 3_047, ctr: .0066729301, cpc: 216, adOrders: 149, conversionSalesCount: 154, cvr: .0489005579, adSpend: 658_463, adSales: 3_586_180, totalSales: 18_651_040, roas: 5.4462893131 },
  { period: "07/19–07/25", impressions: 418_404, clicks: 2_796, ctr: .0066825365, cpc: 162, adOrders: 110, conversionSalesCount: 112, cvr: .0393419170, adSpend: 451_842, adSales: 2_249_310, totalSales: 14_803_010, roas: 4.9780896862 },
  { period: "07/26–07/31", impressions: 7_168, clicks: 28, ctr: .00390625, cpc: 266, adOrders: 1, conversionSalesCount: 1, cvr: .0357142857, adSpend: 7_455, adSales: 18_490, totalSales: 6_954_340, roas: 2.4802146211 },
];

const store88Periods: AdPeriodRow[] = [
  { period: "07/01–07/04", impressions: 39_114, clicks: 126, ctr: .0032, cpc: 426, adOrders: 11, conversionSalesCount: 11, cvr: .0873, adSpend: 53_697, adSales: 276_520, totalSales: 4_412_480, roas: 5.1496 },
  { period: "07/05–07/11", impressions: 177_999, clicks: 1_295, ctr: .0073, cpc: 196, adOrders: 67, conversionSalesCount: 68, cvr: .0517, adSpend: 254_534, adSales: 1_377_140, totalSales: 11_274_560, roas: 5.4104 },
  { period: "07/12–07/18", impressions: 289_161, clicks: 1_826, ctr: .0063, cpc: 175, adOrders: 90, conversionSalesCount: 91, cvr: .0493, adSpend: 320_870, adSales: 1_759_370, totalSales: 8_737_720, roas: 5.4831 },
  { period: "07/19–07/25", impressions: 147_253, clicks: 996, ctr: .0068, cpc: 198, adOrders: 72, conversionSalesCount: 73, cvr: .0723, adSpend: 197_883, adSales: 1_261_060, totalSales: 8_013_060, roas: 6.3728 },
  { period: "07/26–07/31", impressions: 7_168, clicks: 28, ctr: .0039, cpc: 266, adOrders: 1, conversionSalesCount: 1, cvr: .0357, adSpend: 7_455, adSales: 18_490, totalSales: 4_087_900, roas: 2.4802 },
];

const store70Periods: AdPeriodRow[] = [
  { period: "07/01–07/04", impressions: 51_216, clicks: 79, ctr: .0015, cpc: 383, adOrders: 1, conversionSalesCount: 1, cvr: .0127, adSpend: 30_273, adSales: 21_500, totalSales: 3_012_770, roas: .7102 },
  { period: "07/05–07/11", impressions: 118_722, clicks: 439, ctr: .0037, cpc: 335, adOrders: 19, conversionSalesCount: 19, cvr: .0433, adSpend: 147_464, adSales: 533_730, totalSales: 5_552_430, roas: 3.6194 },
  { period: "07/12–07/18", impressions: 60_110, clicks: 531, ctr: .0088, cpc: 257, adOrders: 23, conversionSalesCount: 23, cvr: .0433, adSpend: 136_816, adSales: 715_870, totalSales: 6_335_460, roas: 5.2324 },
  { period: "07/19–07/25", impressions: 202_812, clicks: 1_391, ctr: .0069, cpc: 129, adOrders: 33, conversionSalesCount: 34, cvr: .0237, adSpend: 180_406, adSales: 852_850, totalSales: 5_049_980, roas: 4.7274 },
  { period: "07/26–07/31", impressions: 0, clicks: 0, ctr: 0, cpc: 0, adOrders: 0, conversionSalesCount: 0, cvr: 0, adSpend: 0, adSales: 0, totalSales: 1_942_160, roas: 0 },
];

const store329Periods: AdPeriodRow[] = [
  { period: "07/01–07/04", impressions: 41_101, clicks: 116, ctr: .0028, cpc: 348, adOrders: 6, conversionSalesCount: 6, cvr: .0517, adSpend: 40_475, adSales: 114_150, totalSales: 1_106_120, roas: 2.8203 },
  { period: "07/05–07/11", impressions: 134_214, clicks: 510, ctr: .0038, cpc: 454, adOrders: 28, conversionSalesCount: 28, cvr: .0549, adSpend: 232_004, adSales: 548_640, totalSales: 4_742_450, roas: 2.3648 },
  { period: "07/12–07/18", impressions: 107_350, clicks: 690, ctr: .0064, cpc: 290, adOrders: 36, conversionSalesCount: 40, cvr: .0522, adSpend: 200_777, adSales: 1_110_940, totalSales: 3_577_860, roas: 5.5332 },
  { period: "07/19–07/25", impressions: 68_339, clicks: 409, ctr: .0060, cpc: 179, adOrders: 5, conversionSalesCount: 5, cvr: .0122, adSpend: 73_553, adSales: 135_400, totalSales: 1_739_970, roas: 1.8408 },
  { period: "07/26–07/31", impressions: 0, clicks: 0, ctr: 0, cpc: 0, adOrders: 0, conversionSalesCount: 0, cvr: 0, adSpend: 0, adSales: 0, totalSales: 924_280, roas: 0 },
];

export const julyAdStores: Record<JulyAdStoreKey, JulyAdStoreData> = {
  all: {
    key: "all",
    label: "三店整体",
    summary: { impressions: 1_444_559, clicks: 8_436, ctr: .0058398445, cpc: 222, adOrders: 392, conversionSalesCount: 400, cvr: .0464675202, adSpend: 1_876_207, adSales: 8_725_660, totalSales: 70_509_200, roas: 4.6506915282, adSalesRatio: .1237520777 },
    periodRows: overallPeriods,
  },
  "88": {
    key: "88",
    label: "本土88",
    summary: { impressions: 660_695, clicks: 4_271, ctr: .0064644049, cpc: 195, adOrders: 241, conversionSalesCount: 244, cvr: .0564270663, adSpend: 834_439, adSales: 4_692_580, totalSales: 36_525_720, roas: 5.6236345617, adSalesRatio: .1284733059 },
    periodRows: store88Periods,
  },
  "70": {
    key: "70",
    label: "本土70",
    summary: { impressions: 432_860, clicks: 2_440, ctr: .0056369265, cpc: 202, adOrders: 76, conversionSalesCount: 77, cvr: .0311475410, adSpend: 494_959, adSales: 2_123_950, totalSales: 21_892_800, roas: 4.2911635105, adSalesRatio: .0970159139 },
    periodRows: store70Periods,
  },
  "329": {
    key: "329",
    label: "跨境329",
    summary: { impressions: 351_004, clicks: 1_725, ctr: .0049144739, cpc: 316, adOrders: 75, conversionSalesCount: 79, cvr: .0434782609, adSpend: 546_809, adSales: 1_909_130, totalSales: 12_090_680, roas: 3.4914019338, adSalesRatio: .1579009617 },
    periodRows: store329Periods,
  },
};

export const julyAdStoreOrder = ["88", "70", "329"] as const;

export const julyAdStoreColors: Record<(typeof julyAdStoreOrder)[number], string> = {
  "88": "#7655f6",
  "70": "#13b9c4",
  "329": "#f49a18",
};

export const julyAdContribution = {
  orders: { "88": 61.47959184, "70": 19.38775510, "329": 19.13265306 },
  spend: { "88": 44.47478343, "70": 26.38083111, "329": 29.14438546 },
  adSales: { "88": 53.77908376, "70": 24.34142518, "329": 21.87949106 },
};

export const julyAdScreenshotTrends: Record<(typeof julyAdStoreOrder)[number], Record<JulyAdTrendMetric, number[]>> = {
  "88": {
    impressions: [1, 8, 15, 14, 30, 20, 23, 27, 12, 55, 36, 44, 41, 39, 30, 29, 17, 20, 27, 24, 1, 0, 2, 3, 0],
    clicks: [2, 5, 10, 22, 17, 19, 18, 20, 36, 24, 27, 28, 27, 20, 19, 13, 19, 20, 1, 0, 2, 0, 0, 0, 0],
    conversionSalesCount: [0, 1, 0, 3, 2, 4, 2, 1, 1, 4, 3, 5, 4, 3, 2, 4, 3, 5, 1, 0, 1, 0, 0, 0, 0],
    roas: [0, 8, 3, 5, 6, 8, 3, 2, 6, 3, 5, 4, 4, 3, 3, 4, 5, 15, 1, 6, 0, 0, 0, 0, 0],
  },
  "70": {
    impressions: [0, 0, 35, 12, 15, 18, 22, 8, 1, 3, 15, 5, 8, 6, 65, 31, 36, 10, 0, 0, 0, 0, 0, 0, 0],
    clicks: [0, 0, 50, 42, 48, 44, 58, 18, 23, 62, 30, 45, 83, 96, 88, 75, 190, 218, 110, 113, 0, 0, 0, 0, 0],
    conversionSalesCount: [0, 0, 1, 0, 2, 3, 0, 0, 1, 8, 0, 2, 1, 4, 3, 5, 3, 12, 7, 4, 0, 0, 0, 0, 0],
    roas: [0, 0, 2, 1, 4, 2, 7, 0, 3, 8, 0, 5, 3, 4, 3, 5, 9, 7, 6, 4, 0, 0, 0, 0, 0],
  },
  "329": {
    impressions: [4, 13, 14, 11, 24, 26, 18, 20, 14, 13, 27, 14, 10, 8, 12, 9, 17, 15, 18, 16, 0, 0, 0, 0, 0],
    clicks: [3, 20, 32, 45, 90, 95, 65, 72, 86, 39, 49, 52, 145, 91, 89, 116, 108, 106, 72, 45, 0, 0, 0, 0, 0],
    conversionSalesCount: [0, 1, 2, 2, 5, 2, 6, 2, 1, 2, 3, 4, 9, 10, 5, 6, 2, 0, 3, 0, 0, 0, 0, 0, 0],
    roas: [0, 4, 5, 2, 4, 1, 4, 1, 1, 4, 3, 8, 7, 5, 8, 0, 3, 0, 2, 0, 0, 0, 0, 0, 0],
  },
};

export const julyAdInsights = [
  { key: "all" as const, title: "三店整体投产", value: "465.07%", note: "每投入 ₩1，带来约 ₩4.65 广告转化销售额。", level: "overall" },
  { key: "88" as const, title: "本土88", value: "562.36%", note: "贡献 61.48% 广告订单，规模和效率最高。", level: "purple" },
  { key: "70" as const, title: "本土70", value: "429.12%", note: "投产稳定，月末停止广告投放。", level: "cyan" },
  { key: "329" as const, title: "跨境329", value: "349.14%", note: "花费占比高于销售贡献，需要优化结构。", level: "orange" },
] as const;

export const julyAdHeader = {
  store: "本土88 + 本土70 + 跨境329",
  dateRange: "2026/07/01–2026/07/31",
  sourceNote: "数据来自广告后台截图",
} as const;
