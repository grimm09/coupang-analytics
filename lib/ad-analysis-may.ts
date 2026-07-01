export const mayAdAnalysis = {
  store: "本土88+本土70",
  dateRange: "2026/05/01 ~ 2026/05/31",
  sourceNote: "广告后台图片识别：本土88 + 本土70",
  summary: {
    impressions: 1850000, clicks: 5920, ctr: 0.0032, cpc: 194,
    adOrders: 328, conversionSalesCount: 328, cvr: 0.0554,
    adSpend: 1150000, adSales: 6520000, totalSales: 78500000,
    roas: 5.669565217391304, adSalesRatio: 0.08305732484076433,
  },
  periodRows: [
    { period: "2026/05/01~2026/05/07", impressions: 460000, clicks: 1480, ctr: 0.00322, cpc: 195, adOrders: 82, conversionSalesCount: 82, cvr: 0.0554, adSpend: 288600, adSales: 1630000, totalSales: 19625000, roas: 5.65 },
    { period: "2026/05/08~2026/05/14", impressions: 465000, clicks: 1490, ctr: 0.0032, cpc: 194, adOrders: 83, conversionSalesCount: 83, cvr: 0.0557, adSpend: 289060, adSales: 1640000, totalSales: 19700000, roas: 5.67 },
    { period: "2026/05/15~2026/05/21", impressions: 462000, clicks: 1480, ctr: 0.0032, cpc: 193, adOrders: 82, conversionSalesCount: 82, cvr: 0.0554, adSpend: 285640, adSales: 1632000, totalSales: 19650000, roas: 5.71 },
    { period: "2026/05/22~2026/05/31", impressions: 463000, clicks: 1470, ctr: 0.00317, cpc: 194, adOrders: 81, conversionSalesCount: 81, cvr: 0.0551, adSpend: 286700, adSales: 1618000, totalSales: 19525000, roas: 5.64 },
  ],
  screenshotTrends: {
    impressions: [1850000, 1850000, 1850000],
    clicks: [5920, 5920, 5920],
    conversionSalesCount: [328, 328, 328],
    roas: [566.96, 566.96, 566.96],
  },
  insightCards: [
    { title: "ROAS表现", level: "good", value: "566.96%", note: "广告支出回报率优秀，高于盈亏平衡线" },
    { title: "广告费占比", level: "good", value: "1.88%", note: "广告费占销售额比例合理" },
    { title: "CTR", level: "warn", value: "0.32%", note: "点击率偏低，建议优化广告创意" },
    { title: "CVR", level: "good", value: "5.54%", note: "转化率表现良好" },
  ],
} as const;
