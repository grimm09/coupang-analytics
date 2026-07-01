export type CategoryAnalysisItem = {
  name: string;
  orders: number;
  revenue: number;
  sellerAmount: number;
  lossRate: number;
  logisticsShare: number;
  purchaseShare: number;
  adShare: number;
  commissionShare: number;
  settlementFeeShare: number;
  vatShare: number;
  eventFeeShare: number;
  storeCostShare: number;
  grossProfit: number;
  grossMargin: number;
  units: number;
};

export type CategoryAnalysisDataset = {
  summary: Omit<CategoryAnalysisItem, "name" | "settlementFeeShare" | "eventFeeShare" | "storeCostShare">;
  categories: CategoryAnalysisItem[];
};

export const categoryPalette: Record<string, string> = {
  居家百货: "#5470C6",
  美容个护: "#91CC75",
  服饰: "#FAC858",
  电子电器: "#EE6666",
  医药保健: "#73C0DE",
  包类: "#3BA272",
  鞋类: "#FC8452",
  母婴玩具: "#9A60B4",
  母婴: "#9A60B4",
  钟表珠宝: "#EA7CCC",
};

export const januaryCategoryAnalysis: {
  month: string;
  personal: CategoryAnalysisDataset;
  platform: CategoryAnalysisDataset;
} = {
  "month": "2026年1月",
  "personal": {
    "summary": {
      "orders": 2186,
      "revenue": 183569.793903,
      "sellerAmount": 221420.629979,
      "lossRate": 0.1621328366,
      "logisticsShare": 0.3089892331,
      "purchaseShare": 0.2069938043,
      "adShare": 0.0089156448,
      "commissionShare": 0.0939111527,
      "vatShare": 0.0675793036,
      "grossProfit": 27806.789806,
      "grossMargin": 0.1514780249,
      "units": 5580
    },
    "categories": [
      {
        "name": "居家百货",
        "orders": 1086,
        "revenue": 72266.10371,
        "sellerAmount": 88303.975201,
        "lossRate": 0.1070446258,
        "logisticsShare": 0.3856019754,
        "purchaseShare": 0.1484687765,
        "adShare": 0.0160210791,
        "commissionShare": 0.0981998928,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0702801365,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 12602.017102,
        "grossMargin": 0.1743835139,
        "units": 3096
      },
      {
        "name": "美容个护",
        "orders": 337,
        "revenue": 22848.343245,
        "sellerAmount": 27452.468611,
        "lossRate": 0.0826460557,
        "logisticsShare": 0.4023355173,
        "purchaseShare": 0.1269685057,
        "adShare": 0.0098696123,
        "commissionShare": 0.0993421159,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0713049691,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 4741.790334,
        "grossMargin": 0.2075332239,
        "units": 1033
      },
      {
        "name": "服饰",
        "orders": 307,
        "revenue": 38141.481858,
        "sellerAmount": 44762.56086,
        "lossRate": 0.3289210933,
        "logisticsShare": 0.1963016932,
        "purchaseShare": 0.2841903217,
        "adShare": 0.0066425794,
        "commissionShare": 0.0834650447,
        "settlementFeeShare": 0.0,
        "vatShare": 0.067146096,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 1271.376562,
        "grossMargin": 0.0333331717,
        "units": 551
      },
      {
        "name": "电子电器",
        "orders": 154,
        "revenue": 20272.596138,
        "sellerAmount": 24068.9223,
        "lossRate": 0.129821828,
        "logisticsShare": 0.2069574598,
        "purchaseShare": 0.3210481754,
        "adShare": 0.0,
        "commissionShare": 0.0845659141,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0713056194,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 3776.805002,
        "grossMargin": 0.1863010034,
        "units": 265
      },
      {
        "name": "医药保健",
        "orders": 112,
        "revenue": 10174.603465,
        "sellerAmount": 12385.589607,
        "lossRate": 0.1491304478,
        "logisticsShare": 0.3226701671,
        "purchaseShare": 0.1920133799,
        "adShare": 0.0,
        "commissionShare": 0.1034164078,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0709057496,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 1646.900467,
        "grossMargin": 0.1618638478,
        "units": 379
      },
      {
        "name": "包类",
        "orders": 89,
        "revenue": 8975.788626,
        "sellerAmount": 11419.293192,
        "lossRate": 0.1125119776,
        "logisticsShare": 0.2318236197,
        "purchaseShare": 0.2445790661,
        "adShare": 0.0,
        "commissionShare": 0.1019386452,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0247922007,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 2552.305803,
        "grossMargin": 0.2843544907,
        "units": 101
      },
      {
        "name": "鞋类",
        "orders": 79,
        "revenue": 8979.623398,
        "sellerAmount": 10790.276681,
        "lossRate": 0.2533568479,
        "logisticsShare": 0.2308299997,
        "purchaseShare": 0.2720448166,
        "adShare": 0.0,
        "commissionShare": 0.0895792228,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0689653286,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 765.27749,
        "grossMargin": 0.0852237846,
        "units": 114
      },
      {
        "name": "母婴玩具",
        "orders": 14,
        "revenue": 1289.986256,
        "sellerAmount": 1524.210831,
        "lossRate": 0.123279253,
        "logisticsShare": 0.2639563006,
        "purchaseShare": 0.2582120534,
        "adShare": 0.0,
        "commissionShare": 0.1070157293,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0719999989,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 226.439885,
        "grossMargin": 0.1755366648,
        "units": 27
      },
      {
        "name": "钟表珠宝",
        "orders": 8,
        "revenue": 621.267207,
        "sellerAmount": 713.332696,
        "lossRate": 0.0,
        "logisticsShare": 0.3259913669,
        "purchaseShare": 0.1524464819,
        "adShare": 0.0,
        "commissionShare": 0.1053270755,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0558794052,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 223.877161,
        "grossMargin": 0.3603556706,
        "units": 14
      }
    ]
  },
  "platform": {
    "summary": {
      "orders": 40232,
      "revenue": 3295067.037808,
      "sellerAmount": 4051749.198997,
      "lossRate": 0.1255672158,
      "logisticsShare": 0.3308833962,
      "purchaseShare": 0.2126100938,
      "adShare": 0.0500893464,
      "commissionShare": 0.0940892006,
      "vatShare": 0.0241508103,
      "grossProfit": 535810.643286,
      "grossMargin": 0.162609937,
      "units": 121161
    },
    "categories": [
      {
        "name": "居家百货",
        "orders": 18560,
        "revenue": 1338571.402919,
        "sellerAmount": 1651462.605678,
        "lossRate": 0.1063377978,
        "logisticsShare": 0.3620911199,
        "purchaseShare": 0.1785510205,
        "adShare": 0.0508466253,
        "commissionShare": 0.0963878313,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0229497779,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 244738.809966,
        "grossMargin": 0.1828358274,
        "units": 54350
      },
      {
        "name": "医药保健",
        "orders": 6775,
        "revenue": 604905.063464,
        "sellerAmount": 751870.95792,
        "lossRate": 0.1226423403,
        "logisticsShare": 0.3442440634,
        "purchaseShare": 0.2412461208,
        "adShare": 0.0685692808,
        "commissionShare": 0.1014286677,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0239494045,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 59232.377998,
        "grossMargin": 0.0979201226,
        "units": 28413
      },
      {
        "name": "美容个护",
        "orders": 6289,
        "revenue": 457184.135374,
        "sellerAmount": 564284.550335,
        "lossRate": 0.0650991363,
        "logisticsShare": 0.381391926,
        "purchaseShare": 0.1528895572,
        "adShare": 0.0755084965,
        "commissionShare": 0.0967703074,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0203689078,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 95081.347583,
        "grossMargin": 0.2079716688,
        "units": 21525
      },
      {
        "name": "电子电器",
        "orders": 4012,
        "revenue": 410660.864134,
        "sellerAmount": 494824.004888,
        "lossRate": 0.1678712321,
        "logisticsShare": 0.2608291947,
        "purchaseShare": 0.2757935851,
        "adShare": 0.0255703445,
        "commissionShare": 0.073339619,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0214349663,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 71931.791529,
        "grossMargin": 0.1751610582,
        "units": 6004
      },
      {
        "name": "服饰",
        "orders": 3197,
        "revenue": 323674.432541,
        "sellerAmount": 395121.002114,
        "lossRate": 0.1889912563,
        "logisticsShare": 0.2431659958,
        "purchaseShare": 0.2672394273,
        "adShare": 0.0268508645,
        "commissionShare": 0.0953546678,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0335447517,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 46885.224406,
        "grossMargin": 0.1448530365,
        "units": 8730
      },
      {
        "name": "鞋类",
        "orders": 996,
        "revenue": 114551.933538,
        "sellerAmount": 138232.351521,
        "lossRate": 0.231327701,
        "logisticsShare": 0.2376008465,
        "purchaseShare": 0.2951930095,
        "adShare": 0.0073002717,
        "commissionShare": 0.0900892798,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0329067202,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 12094.641886,
        "grossMargin": 0.1055821714,
        "units": 1480
      },
      {
        "name": "包类",
        "orders": 224,
        "revenue": 27192.512934,
        "sellerAmount": 33829.304926,
        "lossRate": 0.271390737,
        "logisticsShare": 0.2070302996,
        "purchaseShare": 0.2936311925,
        "adShare": 0.0,
        "commissionShare": 0.0873395123,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0318567478,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 2957.226865,
        "grossMargin": 0.1087515108,
        "units": 277
      },
      {
        "name": "钟表珠宝",
        "orders": 100,
        "revenue": 9763.569956,
        "sellerAmount": 11608.841971,
        "lossRate": 0.2330693047,
        "logisticsShare": 0.2445181588,
        "purchaseShare": 0.1863836699,
        "adShare": 0.0,
        "commissionShare": 0.0855181003,
        "settlementFeeShare": 0.0,
        "vatShare": 0.0381436704,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 2073.460997,
        "grossMargin": 0.2123670959,
        "units": 243
      },
      {
        "name": "母婴玩具",
        "orders": 79,
        "revenue": 8563.122948,
        "sellerAmount": 10515.579644,
        "lossRate": 0.1399244992,
        "logisticsShare": 0.2269265561,
        "purchaseShare": 0.2751414425,
        "adShare": 0.0,
        "commissionShare": 0.1051300719,
        "settlementFeeShare": 0.0,
        "vatShare": 0.045646085,
        "eventFeeShare": 0.0,
        "storeCostShare": 0.0,
        "grossProfit": 1774.547489,
        "grossMargin": 0.2072313454,
        "units": 139
      }
    ]
  }
};
