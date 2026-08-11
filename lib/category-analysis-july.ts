export type JulyCategoryDiagnosisTone = "strength" | "stable" | "opportunity" | "risk" | "warning";

export type JulyCategoryComparisonRow = {
  name: string;
  personalOrders: number;
  platformOrders: number;
  revenueCny: number;
  grossMargin: number;
  lossRate: number;
  diagnosis: string;
  diagnosisTone: JulyCategoryDiagnosisTone;
};

export const julyCategoryAnalysis = {
  month: "2026年7月",
  personalSummary: {
    orders: 2_836,
    revenueCny: 243_902.052308,
    units: 7_134,
    grossProfitCny: 59_019.691243,
    grossMargin: 0.2419811177663639,
    lossRate: 0.08641807897697897,
  },
  platformSummary: {
    orders: 84_763,
    revenueCny: 7_504_327.055911,
    units: 246_661,
    grossProfitCny: 1_799_387.235941,
    grossMargin: 0.23977995928677717,
    lossRate: 0.10722247750732132,
  },
  categories: [
    {
      name: "居家百货",
      personalOrders: 1_940,
      platformOrders: 43_703,
      revenueCny: 147_653.137016,
      grossMargin: 0.240079,
      lossRate: 0.05718,
      diagnosis: "核心优势",
      diagnosisTone: "strength",
    },
    {
      name: "服饰",
      personalOrders: 438,
      platformOrders: 6_787,
      revenueCny: 40_704.529409,
      grossMargin: 0.247024,
      lossRate: 0.132575,
      diagnosis: "优势·控退损",
      diagnosisTone: "stable",
    },
    {
      name: "电子电器",
      personalOrders: 332,
      platformOrders: 8_346,
      revenueCny: 40_839.258583,
      grossMargin: 0.241232,
      lossRate: 0.138203,
      diagnosis: "控退损",
      diagnosisTone: "stable",
    },
    {
      name: "医药保健",
      personalOrders: 63,
      platformOrders: 5_589,
      revenueCny: 7_766.74937,
      grossMargin: 0.215482,
      lossRate: 0.140005,
      diagnosis: "重点优化",
      diagnosisTone: "risk",
    },
    {
      name: "美容个护",
      personalOrders: 23,
      platformOrders: 12_919,
      revenueCny: 1_803.537955,
      grossMargin: 0.342543,
      lossRate: 0.030623,
      diagnosis: "平台机会",
      diagnosisTone: "opportunity",
    },
    {
      name: "鞋类",
      personalOrders: 18,
      platformOrders: 2_404,
      revenueCny: 2_632.472729,
      grossMargin: 0.295833,
      lossRate: 0.108269,
      diagnosis: "平台机会",
      diagnosisTone: "opportunity",
    },
    {
      name: "钟表珠宝",
      personalOrders: 10,
      platformOrders: 1_107,
      revenueCny: 981.936128,
      grossMargin: 0.18972,
      lossRate: 0.105757,
      diagnosis: "低毛利",
      diagnosisTone: "warning",
    },
    {
      name: "包类",
      personalOrders: 9,
      platformOrders: 1_080,
      revenueCny: 1_303.921288,
      grossMargin: 0.270008,
      lossRate: 0.040448,
      diagnosis: "小体量稳健",
      diagnosisTone: "stable",
    },
    {
      name: "母婴玩具",
      personalOrders: 3,
      platformOrders: 2_828,
      revenueCny: 216.50983,
      grossMargin: 0.258655,
      lossRate: 0.046002,
      diagnosis: "平台机会",
      diagnosisTone: "opportunity",
    },
  ] satisfies readonly JulyCategoryComparisonRow[],
} as const;

export const julyCategoryRows = julyCategoryAnalysis.categories.map((item) => ({
  ...item,
  personalOrderShare: item.personalOrders / julyCategoryAnalysis.personalSummary.orders,
  platformOrderShare: item.platformOrders / julyCategoryAnalysis.platformSummary.orders,
  orderShareGap:
    item.personalOrders / julyCategoryAnalysis.personalSummary.orders -
    item.platformOrders / julyCategoryAnalysis.platformSummary.orders,
}));
