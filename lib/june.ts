export const juneOverview = {
  "month": "2026年6月",
  "personal": {
    "orders": 3727.0,
    "revenueCny": 365229.260773,
    "sellerOrderAmount": 443038.773384,
    "lossRate": 0.09126729265462022,
    "logisticsShare": 0.26267207328885556,
    "purchaseShare": 0.21386353008705677,
    "advertisingShare": 0.012866858104561278,
    "commissionShare": 0.09655785451133016,
    "vatShare": 0.06369708869645917,
    "grossProfit": 94621.581276,
    "grossMargin": 0.2590744812607167,
    "units": 10494.0
  },
  "platform": {
    "orders": 233206.0,
    "revenueCny": 16916223.380338,
    "sellerOrderAmount": 23629735.784653,
    "lossRate": 0.07168533880236395,
    "logisticsShare": 0.2324143864570701,
    "purchaseShare": 0.24057867010258677,
    "advertisingShare": 0.04772331352252867,
    "commissionShare": 0.09583446414365143,
    "vatShare": 0.07601338992275164,
    "storeCostShare": 0.010760142544674951,
    "grossProfit": 3496436.740915,
    "grossMargin": 0.2066913318831534,
    "units": 527607.0
  },
  "personalCategories": [
    { "name": "居家百货", "value": 187253.700168 },
    { "name": "电子电器", "value": 91828.459418 },
    { "name": "服饰", "value": 47549.726014 },
    { "name": "医药保健", "value": 29568.450985 },
    { "name": "鞋类", "value": 3732.467479 },
    { "name": "钟表珠宝", "value": 2046.824857 },
    { "name": "包类", "value": 1639.953387 },
    { "name": "美容个护", "value": 1436.630067 },
    { "name": "母婴玩具", "value": 173.048398 }
  ],
  "platformCategories": [
    { "name": "电子电器", "value": 6594056.201457 },
    { "name": "居家百货", "value": 6149951.851563 },
    { "name": "服饰", "value": 1755150.970341 },
    { "name": "鞋类", "value": 741642.162799 },
    { "name": "医药保健", "value": 677311.547559 },
    { "name": "美容个护", "value": 464893.41175 },
    { "name": "包类", "value": 273486.8877 },
    { "name": "钟表珠宝", "value": 225524.243537 },
    { "name": "母婴玩具", "value": 34206.103632 }
  ],
  "advertising": {
    "source": "6月广告清洗数据：本土88 + 本土70 + 跨境329；本土70周度总销售额和活动明细不完整，趋势图为截图视觉估算+周度插值。",
    "store": "本土88+本土70+跨境329",
    "period": "2026/06/01 ~ 2026/06/30",
    "totalSalesKrw": 108747860,
    "adSalesKrw": 5596080,
    "adSpendKrw": 1018941,
    "impressions": 595112,
    "clicks": 2633,
    "ctr": 0.004424377260078775,
    "cpcKrw": 386.98860615267756,
    "adOrders": 213,
    "conversions": 213,
    "cvr": 0.08089631598936574,
    "roas": 549.205498650069,
    "adSalesRatio": 0.05145921951935422
  }
} as const;

export const juneCustomerPriceCny =
  juneOverview.personal.revenueCny / juneOverview.personal.orders;
