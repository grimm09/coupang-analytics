export type AugustCompareMetricKind = "count" | "money" | "percent" | "loss";

export type AugustCompareMetric = {
  label: string;
  july: number;
  august: number;
  kind: AugustCompareMetricKind;
};

export type AugustCompareProduct = {
  id: string;
  name: string;
  stores: string;
  julyOrders: number;
  augustOrders: number;
  grossMargin: number;
  lossRate: number;
  diagnosis: string;
  tone: "good" | "growth" | "warning" | "danger";
};

export type AugustCompareStore = {
  store: string;
  julyOrders: number;
  augustOrders: number;
  julyRevenue: number;
  augustRevenue: number;
  julyGrossMargin: number;
  augustGrossMargin: number;
  julyLossRate: number;
  augustLossRate: number;
};

export const augustMonthComparison = {
  monthA: "2026-07",
  monthB: "2026-08",
  monthALabel: "7月",
  monthBLabel: "8月",
  metrics: [
    { label: "有效订单量", july: 2_836, august: 2_076, kind: "count" },
    { label: "销售额", july: 243_902.052308, august: 223_399.951219, kind: "money" },
    { label: "商品销量", july: 7_134, august: 4_834, kind: "count" },
    { label: "毛利润", july: 59_019.691243, august: 62_555.660565, kind: "money" },
    { label: "毛利率", july: 0.2419811178, august: 0.2800164468, kind: "percent" },
    { label: "退损率", july: 0.0864180790, august: 0.1044440135, kind: "loss" },
  ] satisfies readonly AugustCompareMetric[],
  products: [
    {
      id: "1350593",
      name: "高速钢六角柄木工锯钻头手电打孔五金开孔锯齿麻花钻镀钛木工钻头",
      stores: "本土70",
      julyOrders: 1,
      augustOrders: 327,
      grossMargin: 0.276323524433,
      lossRate: 0.0171,
      diagnosis: "增量低毛利",
      tone: "warning",
    },
    {
      id: "1339579",
      name: "【护踝防崴脚】关节加压腕袜保护套",
      stores: "跨境329",
      julyOrders: 0,
      augustOrders: 175,
      grossMargin: 0.458639534104,
      lossRate: 0.0375,
      diagnosis: "新增放量",
      tone: "growth",
    },
    {
      id: "1278316",
      name: "HFH-【双层收腹】薄款蕾丝无痕塑身收腹裤",
      stores: "本土88",
      julyOrders: 174,
      augustOrders: 95,
      grossMargin: 0.257512830841,
      lossRate: 0.0557,
      diagnosis: "规模回落",
      tone: "warning",
    },
    {
      id: "1329536",
      name: "JS-断电续航家用侦测摄像头",
      stores: "跨境329",
      julyOrders: 5,
      augustOrders: 90,
      grossMargin: 0.374499418606,
      lossRate: 0.1765,
      diagnosis: "增长·质量稳",
      tone: "growth",
    },
    {
      id: "1246354",
      name: "JL-【一人秒除15亩】全铜电机除草机",
      stores: "本土88",
      julyOrders: 29,
      augustOrders: 80,
      grossMargin: 0.243010897107,
      lossRate: 0.1456,
      diagnosis: "增量低毛利",
      tone: "warning",
    },
  ] satisfies readonly AugustCompareProduct[],
  categories: [
    { name: "居家百货", july: 147653.137015999993, august: 117528.297414000001 },
    { name: "电子电器", july: 40839.258583000003, august: 65500.066179000001 },
    { name: "医药保健", july: 7766.74937, august: 25276.738299000001 },
    { name: "服饰", july: 40704.529409000002, august: 10531.506072 },
    { name: "鞋类", july: 2632.472729, august: 1544.256626 },
  ],
  advertising: [
    { label: "曝光量", july: 1_444_559, august: 1_373_858, kind: "count" },
    { label: "点击量", july: 8_436, august: 15_481, kind: "count" },
    { label: "广告订单", july: 392, august: 399, kind: "count" },
    { label: "广告费", july: 1_876_207, august: 2_209_814, kind: "krw" },
    { label: "广告转化销售额", july: 8_725_660, august: 11_234_390, kind: "krw" },
    { label: "ROAS", july: 4.6507, august: 5.0839017651, kind: "roas" },
  ],
  stores: [
    {
      store: "本土88",
      julyOrders: 1468,
      augustOrders: 637,
      julyRevenue: 121220.481520000001,
      augustRevenue: 72173.44431200008,
      julyGrossMargin: 0.201862814148,
      augustGrossMargin: 0.238373473457,
      julyLossRate: 0.09118788376,
      augustLossRate: 0.132091228336,
    },
    {
      store: "本土70",
      julyOrders: 791,
      augustOrders: 678,
      julyRevenue: 72346.478029000005,
      augustRevenue: 66349.568969000014,
      julyGrossMargin: 0.232114987661,
      augustGrossMargin: 0.243424475305,
      julyLossRate: 0.08965187942,
      augustLossRate: 0.09208627077,
    },
    {
      store: "跨境329",
      julyOrders: 489,
      augustOrders: 585,
      julyRevenue: 41282.017985999999,
      augustRevenue: 64505.871468000012,
      julyGrossMargin: 0.374989181276,
      augustGrossMargin: 0.336908540299,
      julyLossRate: 0.051205327285,
      augustLossRate: 0.08650304209,
    },
    {
      store: "跨境296",
      julyOrders: 45,
      augustOrders: 149,
      julyRevenue: 5099.615249,
      augustRevenue: 17296.093008,
      julyGrossMargin: 0.275966219859,
      augustGrossMargin: 0.400958918109,
      julyLossRate: 0.155166827848,
      augustLossRate: 0.088147826681,
    },
    {
      store: "跨境295",
      julyOrders: 43,
      augustOrders: 27,
      julyRevenue: 3953.459524,
      augustRevenue: 3074.973462,
      julyGrossMargin: 0.21992135792,
      augustGrossMargin: 0.173242211545,
      julyLossRate: 0.160001526617,
      augustLossRate: 0.190199074982,
    },
  ] satisfies readonly AugustCompareStore[],
  insights: [
    { title: "规模回落、质量上升", note: "订单与销量下降，但毛利率28.00%创新高，毛利润逆势正增长。", tone: "purple" },
    { title: "居家百货仍是基本盘", note: "贡献过半销售额，电子电器成为第二大品类。", tone: "teal" },
    { title: "广告效率显著提升", note: "广告费+13.3%换来转化销售额+28.8%，ROAS提升36.56pp。", tone: "orange" },
    { title: "跨境329规模跃升", note: "订单489→585反超本土70，毛利率保持三店最高。", tone: "green" },
  ],
  sourceNote: "经营数据来自7月、8月个人平台产品与个人品类Excel；广告数据来自三店广告后台截图清洗结果。",
} as const;
