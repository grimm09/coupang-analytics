import type { AdPeriodRow } from "./ad-analysis";

export const juneAdAnalysis: {
  store: string;
  month: string;
  dateRange: string;
  sourceNote: string;
  summary: Record<string, number>;
  periodRows: AdPeriodRow[];
  screenshotTrends: Record<string, number[]>;
  topCampaigns: Record<string, string | number>[];
  storeBreakdown: Record<string, string | number>[];
  insightCards: { title: string; level: string; value: string; note: string }[];
} = {
  "store": "本土88 + 本土70 + 跨境329",
  "month": "2026年6月",
  "dateRange": "2026/06/01 ~ 2026/06/30",
  "sourceNote": "6月广告清洗数据：本土88、本土70、跨境329；本土70周度总销售额和活动明细不完整，趋势图为截图视觉估算+周度插值。",
  "summary": { "impressions": 595112.0, "clicks": 2633.0, "adOrders": 213.0, "conversionSalesCount": 213.0, "adSpend": 1018941.0, "adSales": 5596080.0, "totalSales": 108747860.0, "ctr": 0.004424377260078775, "cpc": 386.98860615267756, "cvr": 0.08089631598936574, "roas": 5.4920549865006905, "adSalesRatio": 0.05145921951935422 },
  "periodRows": [
    { "period": "2026/06/01~06/06", "impressions": 54298.0, "clicks": 135.0, "adOrders": 5.0, "conversionSalesCount": 5.0, "adSpend": 46400.0, "adSales": 215330.0, "totalSales": 12585720.0, "ctr": 0.0024862794209731484, "cpc": 343.7037037037037, "cvr": 0.037037037037037035, "roas": 4.64073275862069 },
    { "period": "2026/06/07~06/13", "impressions": 133616.0, "clicks": 648.0, "adOrders": 59.0, "conversionSalesCount": 59.0, "adSpend": 299260.0, "adSales": 1414210.0, "totalSales": 12288010.0, "ctr": 0.004849718596575261, "cpc": 461.820987654321, "cvr": 0.09104938271604938, "roas": 4.725690035420705 },
    { "period": "2026/06/14~06/20", "impressions": 87389.0, "clicks": 672.0, "adOrders": 67.0, "conversionSalesCount": 67.0, "adSpend": 205489.0, "adSales": 1947040.0, "totalSales": 17453330.0, "ctr": 0.007689755003490142, "cpc": 305.7872023809524, "cvr": 0.09970238095238096, "roas": 9.475154387826112 },
    { "period": "2026/06/21~06/27", "impressions": 161863.0, "clicks": 653.0, "adOrders": 51.0, "conversionSalesCount": 51.0, "adSpend": 264223.0, "adSales": 1405470.0, "totalSales": 10717860.0, "ctr": 0.004034275899989497, "cpc": 404.6294027565084, "cvr": 0.0781010719754977, "roas": 5.319256839866325 },
    { "period": "2026/06/28~06/30", "impressions": 21178.0, "clicks": 103.0, "adOrders": 11.0, "conversionSalesCount": 11.0, "adSpend": 60569.0, "adSales": 249030.0, "totalSales": 4130680.0, "ctr": 0.004863537633393144, "cpc": 588.0485436893204, "cvr": 0.10679611650485436, "roas": 4.111509187868381 }
  ],
  "screenshotTrends": {
    "impressions": [5280.0, 7470.0, 9160.0, 10960.0, 11850.0, 13640.0, 19000.0, 24000.0, 27000.0, 25000.0, 22500.0, 21000.0, 19500.0, 12100.0, 14700.0, 17300.0, 14750.0, 13350.0, 11900.0, 10600.0, 13800.0],
    "clicks": [18.0, 24.0, 32.0, 36.0, 40.0, 45.0, 70.0, 95.0, 105.0, 98.0, 90.0, 82.0, 75.0, 71.0, 91.0, 107.0, 86.0, 78.0, 68.0, 60.0, 55.0],
    "conversionSalesCount": [0.0, 2.0, 3.0, 3.0, 4.0, 4.0, 6.0, 9.0, 11.0, 9.0, 8.0, 8.0, 8.0, 7.0, 9.0, 11.0, 9.0, 8.0, 6.0, 6.0, 4.0],
    "roas": [193.33, 263.33, 323.33, 353.33, 366.67, 370.0, 266.67, 293.33, 306.67, 310.0, 310.0, 300.0, 293.33, 416.67, 500.0, 600.0, 573.33, 533.33, 493.33, 450.0, 366.67]
  },
  "topCampaigns": [
    { "store": "跨境329", "name": "1119007-S 41a B/all...", "impressions": 96674.0, "clicks": 693.0, "adSpend": 243293.0, "adSales": 2206650.0, "roas": 9.0699, "conversionSalesCount": 10.0 },
    { "store": "本土70", "name": "13597722 REED CAS...", "impressions": 192209.0, "clicks": 980.0, "adSpend": 365883.0, "adSales": 1945240.0, "roas": 5.316599999999999, "conversionSalesCount": 74.0 },
    { "store": "跨境329", "name": "1361442-AFRERE SE...", "impressions": 86100.0, "clicks": 269.0, "adSpend": 150415.0, "adSales": 536600.0, "roas": 3.5675, "conversionSalesCount": 24.0 },
    { "store": "本土88", "name": "1151276-RAS+BM...", "impressions": 5164.0, "clicks": 46.0, "adSpend": 35653.0, "adSales": 221300.0, "roas": 6.2071000000000005, "conversionSalesCount": 9.0 },
    { "store": "本土70", "name": "1359772-S WEED BIA...", "impressions": 38408.0, "clicks": 81.0, "adSpend": 29409.0, "adSales": 143000.0, "roas": 4.8625, "conversionSalesCount": 6.0 },
    { "store": "本土70", "name": "1119007-S Maes B/all...", "impressions": 30801.0, "clicks": 102.0, "adSpend": 50839.0, "adSales": 107800.0, "roas": 2.1204, "conversionSalesCount": 4.0 },
    { "store": "本土88", "name": "1355562-服饰韩文...", "impressions": 29091.0, "clicks": 30.0, "adSpend": 27990.0, "adSales": 83930.0, "roas": 2.9986, "conversionSalesCount": 3.0 },
    { "store": "本土70", "name": "1337203-AKERALRE...", "impressions": 26288.0, "clicks": 98.0, "adSpend": 19695.0, "adSales": 62600.0, "roas": 3.1785, "conversionSalesCount": 4.0 }
  ],
  "storeBreakdown": [
    { "store": "本土88", "impressions": 67980.0, "clicks": 242.0, "conversionSalesCount": 22.0, "adSpend": 105734.0, "adSales": 492890.0, "totalSales": 44985010.0, "roas": 4.6616 },
    { "store": "本土70", "impressions": 328977.0, "clicks": 1400.0, "conversionSalesCount": 93.0, "adSpend": 508883.0, "adSales": 2310240.0, "totalSales": 51572260.0, "roas": 4.5398000000000005 },
    { "store": "跨境329", "impressions": 198155.0, "clicks": 991.0, "conversionSalesCount": 98.0, "adSpend": 404324.0, "adSales": 2792950.0, "totalSales": 12190590.0, "roas": 6.9077 }
  ],
  "insightCards": [
    { "title": "三店ROAS", "level": "good", "value": "549.21%", "note": "按三店广告转化销售额 / 广告费回算。" },
    { "title": "本土70周度缺口", "level": "warn", "value": "周度不完整", "note": "本土70周度总销售额为空，周度曝光/点击/花费低于月度汇总，不作为完整趋势依据。" },
    { "title": "广告活动完整度", "level": "warn", "value": "88:5/12 · 70:5/14 · 329:5/6", "note": "活动名称存在截图截断，仅展示可见活动。" },
    { "title": "零广告销售周", "level": "warn", "value": "88周2 / 329周1", "note": "广告花费为0但有总销售额，按自然销售或未投广告周标记。" }
  ]
};
