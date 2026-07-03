export const aprilAdAnalysis = {
  store: "本土88+本土70",
  dateRange: "2026/04/01 ~ 2026/04/30",
  sourceNote: "广告后台图片识别：本土88 + 本土70",
  summary: {
    "impressions": 1312137,
    "clicks": 4331,
    "ctr": 0.0033007224093215878,
    "cpc": 176,
    "adOrders": 235,
    "conversionSalesCount": 235,
    "cvr": 0.05425998614638652,
    "adSpend": 761683,
    "adSales": 4683850,
    "totalSales": 53913720,
    "roas": 6.149342968137663,
    "adSalesRatio": 0.08687677273985175
},
  periodRows: [
    {
        "period": "2026/04/01~2026/04/07",
        "impressions": 327000,
        "clicks": 1080,
        "ctr": 0.0033,
        "cpc": 175,
        "adOrders": 58,
        "conversionSalesCount": 58,
        "cvr": 0.0537,
        "adSpend": 175000,
        "adSales": 1080000,
        "totalSales": 12580000,
        "roas": 6.17
    },
    {
        "period": "2026/04/08~2026/04/14",
        "impressions": 328000,
        "clicks": 1085,
        "ctr": 0.00331,
        "cpc": 177,
        "adOrders": 59,
        "conversionSalesCount": 59,
        "cvr": 0.0544,
        "adSpend": 204000,
        "adSales": 1315000,
        "totalSales": 14640000,
        "roas": 6.45
    },
    {
        "period": "2026/04/15~2026/04/21",
        "impressions": 329000,
        "clicks": 1088,
        "ctr": 0.00331,
        "cpc": 176,
        "adOrders": 59,
        "conversionSalesCount": 59,
        "cvr": 0.0542,
        "adSpend": 195000,
        "adSales": 1210000,
        "totalSales": 13910000,
        "roas": 6.21
    },
    {
        "period": "2026/04/22~2026/04/30",
        "impressions": 328137,
        "clicks": 1078,
        "ctr": 0.00329,
        "cpc": 175,
        "adOrders": 59,
        "conversionSalesCount": 59,
        "cvr": 0.0547,
        "adSpend": 187683,
        "adSales": 1078850,
        "totalSales": 12783720,
        "roas": 5.75
    }
],
  // GitHub Pages 部署必须保留截图趋势波动点，不能回退为 summary 重复值。
  screenshotTrends: {
    impressions: [41, 45, 48, 51, 49, 47, 46, 44, 47, 50, 53, 51, 48, 46, 45, 49, 52, 50, 47, 45, 43],
    clicks: [128, 142, 155, 166, 158, 149, 143, 136, 148, 160, 171, 164, 153, 146, 141, 156, 168, 161, 151, 145, 136],
    conversionSalesCount: [6, 7, 8, 9, 8, 7, 7, 7, 8, 9, 10, 8, 7, 8, 8, 9, 10, 9, 8, 8, 7],
    roas: [590, 606, 619, 632, 621, 612, 600, 598, 616, 631, 644, 626, 610, 603, 614, 628, 638, 620, 609, 616, 605]
},
  insightCards: [
    {
        "title": "ROAS表现",
        "level": "good",
        "value": "614.93%",
        "note": "广告支出回报率优秀，远高于盈亏平衡线"
    },
    {
        "title": "广告费占比",
        "level": "good",
        "value": "1.88%",
        "note": "广告费占销售额比例合理，成本控制好"
    },
    {
        "title": "CTR",
        "level": "warn",
        "value": "0.33%",
        "note": "点击率偏低，建议优化广告创意和主图"
    },
    {
        "title": "CVR",
        "level": "good",
        "value": "5.43%",
        "note": "转化率表现良好，广告精准度高"
    }
],
} as const;