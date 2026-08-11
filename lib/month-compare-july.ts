export type JulyCompareMetricKind = "count" | "money" | "percent" | "loss";

export type JulyCompareMetric = {
  label: string;
  june: number;
  july: number;
  kind: JulyCompareMetricKind;
};

export type JulyCompareProduct = {
  id: string;
  name: string;
  stores: string;
  juneOrders: number;
  julyOrders: number;
  grossMargin: number;
  lossRate: number;
  diagnosis: string;
  tone: "good" | "growth" | "warning" | "danger";
};

export type JulyCompareStore = {
  store: string;
  juneOrders: number;
  julyOrders: number;
  juneRevenue: number;
  julyRevenue: number;
  juneGrossMargin: number;
  julyGrossMargin: number;
  juneLossRate: number;
  julyLossRate: number;
};

export const julyMonthComparison = {
  monthA: "2026-06",
  monthB: "2026-07",
  monthALabel: "6月",
  monthBLabel: "7月",
  metrics: [
    { label: "有效订单量", june: 3_727, july: 2_836, kind: "count" },
    { label: "销售额", june: 365_229.260773, july: 243_902.052308, kind: "money" },
    { label: "商品销量", june: 10_494, july: 7_134, kind: "count" },
    { label: "毛利润", june: 94_621.581276, july: 59_019.691243, kind: "money" },
    { label: "毛利率", june: 0.2590744813, july: 0.2419811178, kind: "percent" },
    { label: "退损率", june: 0.0912672927, july: 0.0864180790, kind: "loss" },
  ] satisfies readonly JulyCompareMetric[],
  products: [
    {
      id: "1355562",
      name: "JC-德国进口强力防水补漏喷剂",
      stores: "本土88/本土70",
      juneOrders: 179,
      julyOrders: 385,
      grossMargin: 0.116712976,
      lossRate: 0.0316,
      diagnosis: "增量低毛利",
      tone: "warning",
    },
    {
      id: "1285133",
      name: "HFH-【事半功倍】高硬度磨刀石",
      stores: "本土88/本土70/跨境329",
      juneOrders: 0,
      julyOrders: 243,
      grossMargin: 0.343810882,
      lossRate: 0.035350611,
      diagnosis: "优质贡献",
      tone: "good",
    },
    {
      id: "1278316",
      name: "HFH-【双层收腹】薄款蕾丝无痕塑身收腹裤",
      stores: "本土88/本土70",
      juneOrders: 256,
      julyOrders: 175,
      grossMargin: 0.150194351,
      lossRate: 0.1323,
      diagnosis: "重点复盘",
      tone: "danger",
    },
    {
      id: "1362682",
      name: "SL-防紫外线护脖防晒太阳能风扇帽",
      stores: "本土70/跨境329",
      juneOrders: 0,
      julyOrders: 155,
      grossMargin: 0.304765144,
      lossRate: 0.118863006,
      diagnosis: "增长·控退损",
      tone: "growth",
    },
    {
      id: "1335862",
      name: "JS-高清智能监控迷你摄像头",
      stores: "本土88",
      juneOrders: 96,
      julyOrders: 102,
      grossMargin: 0.213886813,
      lossRate: 0.1168,
      diagnosis: "优化退损",
      tone: "warning",
    },
  ] satisfies readonly JulyCompareProduct[],
  categories: [
    { name: "居家百货", june: 187_253.700168, july: 147_653.137016 },
    { name: "电子电器", june: 91_828.459418, july: 40_839.258583 },
    { name: "服饰", june: 47_549.726014, july: 40_704.529409 },
    { name: "医药保健", june: 29_568.450985, july: 7_766.74937 },
    { name: "美容个护", june: 1_436.630067, july: 1_803.537955 },
  ],
  advertising: [
    { label: "曝光量", june: 595_112, july: 1_444_559, kind: "count" },
    { label: "点击量", june: 2_633, july: 8_436, kind: "count" },
    { label: "广告订单", june: 213, july: 392, kind: "count" },
    { label: "广告费", june: 1_018_941, july: 1_876_207, kind: "krw" },
    { label: "广告转化销售额", june: 5_596_080, july: 8_725_660, kind: "krw" },
    { label: "ROAS", june: 5.4920549865, july: 4.6507, kind: "roas" },
  ],
  stores: [
    {
      store: "本土88",
      juneOrders: 1_720,
      julyOrders: 1_468,
      juneRevenue: 150_232.642789,
      julyRevenue: 121_220.48152,
      juneGrossMargin: 0.225009697,
      julyGrossMargin: 0.201862814,
      juneLossRate: 0.099243862,
      julyLossRate: 0.09047171,
    },
    {
      store: "本土70",
      juneOrders: 1_554,
      julyOrders: 791,
      juneRevenue: 172_879.031103,
      julyRevenue: 72_346.478029,
      juneGrossMargin: 0.257546921,
      julyGrossMargin: 0.232114988,
      juneLossRate: 0.093922822,
      julyLossRate: 0.088097485,
    },
    {
      store: "跨境329",
      juneOrders: 393,
      julyOrders: 489,
      juneRevenue: 35_929.545905,
      julyRevenue: 41_282.017986,
      juneGrossMargin: 0.424470746,
      julyGrossMargin: 0.374989181,
      juneLossRate: 0.030665232,
      julyLossRate: 0.051120835,
    },
    {
      store: "跨境296",
      juneOrders: 29,
      julyOrders: 45,
      juneRevenue: 2_915.57742,
      julyRevenue: 5_099.615249,
      juneGrossMargin: 0.172803775,
      julyGrossMargin: 0.27596622,
      juneLossRate: 0.130918832,
      julyLossRate: 0.154350476,
    },
    {
      store: "跨境295",
      juneOrders: 31,
      julyOrders: 43,
      juneRevenue: 3_272.463556,
      julyRevenue: 3_953.459524,
      juneGrossMargin: 0.164540809,
      julyGrossMargin: 0.219921358,
      juneLossRate: 0.185819327,
      julyLossRate: 0.159169051,
    },
  ] satisfies readonly JulyCompareStore[],
  insights: [
    { title: "整体规模回落", note: "订单与销售额同步下降，先稳住核心出单产品。", tone: "purple" },
    { title: "居家百货仍是核心品类", note: "规模下降但仍贡献六成以上个人销售额。", tone: "teal" },
    { title: "广告规模扩大，ROAS回落", note: "曝光和订单增长，投产效率下降84.14pp。", tone: "orange" },
    { title: "跨境329利润质量领先", note: "订单逆势增长，毛利率保持三店最高。", tone: "green" },
  ],
  sourceNote: "经营数据来自6月、7月个人平台产品与个人品类Excel；广告数据来自三店广告后台截图清洗结果。",
} as const;
