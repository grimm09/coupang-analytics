export type AugustCategoryDiagnosisTone = "strength" | "stable" | "opportunity" | "risk" | "warning";

export type AugustCategoryComparisonRow = {
  name: string;
  personalOrders: number;
  platformOrders: number;
  revenueCny: number;
  grossMargin: number;
  lossRate: number;
  diagnosis: string;
  diagnosisTone: AugustCategoryDiagnosisTone;
};

export const augustCategoryAnalysis = {
  month: "2026年8月",
  personalSummary: {
    orders: 2076,
    revenueCny: 223399.95121900001,
    units: 4834,
    grossProfitCny: 62555.660564999998,
    grossMargin: 0.280016446842,
    lossRate: 0.104444013469,
  },
  platformSummary: {
    orders: 154875,
    revenueCny: 11779732.306670999154,
    units: 400297,
    grossProfitCny: 2775906.257340999786,
    grossMargin: 0.2356510475,
    lossRate: 0.066596027458,
  },
  categories: [
    {
      name: "居家百货",
      personalOrders: 1227,
      platformOrders: 54861,
      revenueCny: 117528.297414000001,
      grossMargin: 0.293868,
      lossRate: 0.061737,
      diagnosis: "核心优势",
      diagnosisTone: "strength",
    },
    {
      name: "电子电器",
      personalOrders: 405,
      platformOrders: 60145,
      revenueCny: 65500.066179000001,
      grossMargin: 0.235972,
      lossRate: 0.201086,
      diagnosis: "规模增长·控退损",
      diagnosisTone: "stable",
    },
    {
      name: "医药保健",
      personalOrders: 260,
      platformOrders: 8095,
      revenueCny: 25276.738299000001,
      grossMargin: 0.333917,
      lossRate: 0.055347,
      diagnosis: "高毛利·可放量",
      diagnosisTone: "strength",
    },
    {
      name: "服饰",
      personalOrders: 135,
      platformOrders: 12466,
      revenueCny: 10531.506072,
      grossMargin: 0.261543,
      lossRate: 0.103006,
      diagnosis: "规模收缩·质量稳",
      diagnosisTone: "stable",
    },
    {
      name: "美容个护",
      personalOrders: 17,
      platformOrders: 9906,
      revenueCny: 1339.851216,
      grossMargin: 0.396935,
      lossRate: 0.037029,
      diagnosis: "平台机会",
      diagnosisTone: "opportunity",
    },
    {
      name: "钟表珠宝",
      personalOrders: 16,
      platformOrders: 1730,
      revenueCny: 1270.63017,
      grossMargin: 0.223539,
      lossRate: 0.109374,
      diagnosis: "低毛利",
      diagnosisTone: "warning",
    },
    {
      name: "鞋类",
      personalOrders: 12,
      platformOrders: 5132,
      revenueCny: 1544.256626,
      grossMargin: 0.394929,
      lossRate: 0.003,
      diagnosis: "平台机会",
      diagnosisTone: "opportunity",
    },
    {
      name: "包类",
      personalOrders: 4,
      platformOrders: 1929,
      revenueCny: 408.605243,
      grossMargin: 0.355371,
      lossRate: 0.069469,
      diagnosis: "小体量稳健",
      diagnosisTone: "stable",
    },
  ] satisfies readonly AugustCategoryComparisonRow[],
} as const;

export const augustCategoryRows = augustCategoryAnalysis.categories.map((item) => ({
  ...item,
  personalOrderShare: item.personalOrders / augustCategoryAnalysis.personalSummary.orders,
  platformOrderShare: item.platformOrders / augustCategoryAnalysis.platformSummary.orders,
  orderShareGap:
    item.personalOrders / augustCategoryAnalysis.personalSummary.orders -
    item.platformOrders / augustCategoryAnalysis.platformSummary.orders,
}));
