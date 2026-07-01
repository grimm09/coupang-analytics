export type MonthMetric = {
  label: string;
  december: number;
  january: number;
  diff: number;
  mom: number;
  kind: "money" | "count" | "percent" | "loss";
  suffix?: string;
};

export const monthCompare = {
  monthA: "2025-12",
  monthB: "2026-01",
  monthALabel: "12月",
  monthBLabel: "1月",
  warning: "整体KPI当前展示个人产品口径；品类图表使用品类文件自身口径。",
  personalKpis: [
    { label: "收入合计", december: 226_237, january: 183_570, diff: -42_668, mom: -0.1886, kind: "money" },
    { label: "有效订单量", december: 2_495, january: 2_186, diff: -309, mom: -0.1238, kind: "count", suffix: "单" },
    { label: "商品销量", december: 6_279, january: 5_580, diff: -699, mom: -0.1113, kind: "count", suffix: "件" },
    { label: "毛利润", december: 35_273, january: 27_807, diff: -7_466, mom: -0.2117, kind: "money" },
    { label: "毛利率", december: 0.1559, january: 0.1515, diff: -0.0044, mom: -0.0044, kind: "percent", suffix: "pp" },
    { label: "退损率", december: 0.1431, january: 0.1621, diff: 0.019, mom: 0.019, kind: "loss", suffix: "pp" },
  ] satisfies MonthMetric[],
  personalCost: [
    { label: "退损率", december: 14.31, january: 16.21, status: "退损率上升" },
    { label: "物流成本占比", december: 29.67, january: 30.9, status: "物流成本上升" },
    { label: "采购成本占比", december: 23.7, january: 20.7, status: "采购占比下降" },
    { label: "广告花费占比", december: 0.47, january: 0.89, status: "广告效率需复盘" },
    { label: "毛利率", december: 15.59, january: 15.15, status: "毛利率下降" },
  ],
  platformCategory: [
    { name: "电子电器", december: 4_556_305, january: 410_661, mom: -0.9099 },
    { name: "居家百货", december: 3_251_286, january: 1_338_571, mom: -0.5883 },
    { name: "服饰", december: 1_549_515, january: 323_674, mom: -0.7911 },
    { name: "美容个护", december: 925_901, january: 457_184, mom: -0.5062 },
    { name: "医药保健", december: 974_085, january: 604_905, mom: -0.379 },
  ],
  personalCategory: [
    { name: "居家百货", december: 57_980, january: 72_266, mom: 0.2464 },
    { name: "美容个护", december: 41_783, january: 22_848, mom: -0.4532 },
    { name: "服饰", december: 43_873, january: 38_141, mom: -0.1306 },
    { name: "电子电器", december: 36_648, january: 20_273, mom: -0.4468 },
    { name: "包类", december: 16_835, january: 8_976, mom: -0.4668 },
  ],
  growthProducts: [
    { id: "1322886", name: "SL-电加热男女保暖手套", site: "本土88", december: 0, january: 20_690, diff: 20_690, status: "亏损增长" },
    { id: "1331782", name: "1秒墙体除霉", site: "本土88", december: 0, january: 7_505, diff: 7_505, status: "新增增长" },
    { id: "1327609", name: "JC-多功能除霉喷雾", site: "本土88", december: 0, january: 6_383, diff: 6_383, status: "新增增长" },
    { id: "1292626", name: "JL-纳米镀膜剂套装", site: "本土88", december: 1_267, january: 7_611, diff: 6_344, status: "增长" },
    { id: "1262993", name: "草本精华滋养修护洗发", site: "本土100", december: 101, january: 5_984, diff: 5_883, status: "增长" },
  ],
  declineProducts: [
    { id: "1285941", name: "JC-祛斑嫩肤胶原蛋白撕拉面膜", site: "本土88", december: 12_335, january: 2_720, diff: -9_615, status: "重点复盘" },
    { id: "1308417", name: "HFH-速热大火力凹面电磁炉", site: "本土88", december: 9_580, january: 0, diff: -9_580, status: "疑似断货/下架" },
    { id: "1322886", name: "SL-电加热男女保暖手套", site: "本土100", december: 6_115, january: 0, diff: -6_115, status: "疑似断货/下架" },
    { id: "1275048", name: "水晶植萃精油染发剂", site: "本土100", december: 6_041, january: 338, diff: -5_703, status: "重点复盘" },
    { id: "1041768", name: "HFH-男士内裤-FBA", site: "本土88", december: 5_033, january: 0, diff: -5_033, status: "疑似断货/下架" },
  ],
  conclusions: [
    "个人产品1月收入下降18.86%，毛利润下降21.17%。",
    "退损率从14.31%升至16.21%，需要优先复盘退损来源。",
    "居家百货收入逆势增长24.64%，但利润质量仍需关注。",
    "新增增长产品中存在亏损增长，需单独标红复盘。",
  ],
} as const;

export const monthCompareFebruary = {
  monthA: "2026-01",
  monthB: "2026-02",
  monthALabel: "1月",
  monthBLabel: "2月",
  warning: "整体KPI当前展示个人产品口径；品类图表使用品类文件自身口径。",
  personalKpis: [
    { label: "收入合计", december: 183_570, january: 121_013, diff: -62_557, mom: -0.3408, kind: "money" },
    { label: "有效订单量", december: 2_186, january: 1_321, diff: -865, mom: -0.3957, kind: "count", suffix: "单" },
    { label: "商品销量", december: 5_580, january: 3_162, diff: -2_418, mom: -0.4333, kind: "count", suffix: "件" },
    { label: "毛利润", december: 27_807, january: 29_064, diff: 1_257, mom: 0.0452, kind: "money" },
    { label: "毛利率", december: 0.1515, january: 0.2402, diff: 0.0887, mom: 0.0887, kind: "percent", suffix: "pp" },
    { label: "退损率", december: 0.1621, january: 0.0883, diff: -0.0739, mom: -0.0739, kind: "loss", suffix: "pp" },
  ] satisfies MonthMetric[],
  personalCost: [
    { label: "退损率", december: 16.21, january: 8.83, status: "退损率下降" },
    { label: "物流成本占比", december: 30.9, january: 28.03, status: "物流成本下降" },
    { label: "采购成本占比", december: 20.7, january: 21.58, status: "采购占比上升" },
    { label: "广告花费占比", december: 0.89, january: 0.92, status: "广告占比小幅上升" },
    { label: "毛利率", december: 15.15, january: 24.02, status: "毛利率上升" },
  ],
  platformCategory: [
    { name: "居家百货", december: 1_338_571, january: 1_145_642, mom: -0.1441 },
    { name: "电子电器", december: 410_661, january: 394_710, mom: -0.0388 },
    { name: "美容个护", december: 457_184, january: 364_815, mom: -0.2020 },
    { name: "医药保健", december: 604_905, january: 261_132, mom: -0.5683 },
    { name: "服饰", december: 323_674, january: 203_719, mom: -0.3706 },
  ],
  personalCategory: [
    { name: "居家百货", december: 72_266, january: 40_701, mom: -0.4368 },
    { name: "包类", december: 8_976, january: 22_440, mom: 1.4999 },
    { name: "服饰", december: 38_141, january: 19_488, mom: -0.4891 },
    { name: "电子电器", december: 20_273, january: 18_855, mom: -0.0699 },
    { name: "美容个护", december: 22_848, january: 12_319, mom: -0.4608 },
  ],
  growthProducts: [
    { id: "1336846", name: "HFH-【京都匠人精神】多层大容量单肩包", site: "本土88", december: 2_528.81501, january: 15_896.732425, diff: 13_367.917415, status: "重点增长" },
    { id: "1278316", name: "HFH-【双层收腹】薄款蕾丝无痕塑身收腹裤", site: "本土88", december: 461.808344, january: 7_193.825097, diff: 6_732.016753, status: "增长" },
    { id: "1332775", name: "SL-双翼加压塑型矫正背心", site: "本土88", december: 0, january: 5_453.155177, diff: 5_453.155177, status: "新增增长" },
    { id: "1184596", name: "HFH-【一瓶回春】抗皱童颜液", site: "本土88", december: 1_801.193518, january: 6_816.42413, diff: 5_015.230612, status: "增长" },
    { id: "1331782", name: "1秒墙体除霉", site: "本土88", december: 7_505.272803, january: 12_163.457524, diff: 4_658.184721, status: "增长" },
  ],
  declineProducts: [
    { id: "1322886", name: "SL-电加热男女保暖手套", site: "本土88", december: 20_690.072729, january: 847.896263, diff: -19_842.176466, status: "重点复盘" },
    { id: "1292626", name: "JL-纳米镀膜剂+喷头+毛巾+海绵套装", site: "本土88", december: 7_611.066075, january: 1_150.578895, diff: -6_460.48718, status: "重点复盘" },
    { id: "1327609", name: "JC-【无需擦拭】多功能除霉喷雾", site: "本土88", december: 6_383.070959, january: 0, diff: -6_383.070959, status: "疑似断货/下架" },
    { id: "1262993", name: "【头发越少效果越好】草本精华滋养修护洗发", site: "本土100", december: 5_984.044544, january: 0, diff: -5_984.044544, status: "疑似断货/下架" },
    { id: "1331722", name: "JC-磁吸固定三角沥水篮", site: "本土66", december: 5_300.38382, january: 0, diff: -5_300.38382, status: "疑似断货/下架" },
  ],
  conclusions: [
    "个人产品2月收入下降34.08%，但毛利润上升4.52%。",
    "退损率从16.21%降至8.83%，毛利率从15.15%升至24.02%。",
    "包类个人收入增长149.99%，是2月最明显的结构性亮点。",
    "电加热男女保暖手套2月收入大幅下滑，需要优先复盘季节性、库存和投放节奏。",
  ],
} as const;

export const monthCompareMarch = {
  monthA: "2026-02",
  monthB: "2026-03",
  monthALabel: "2月",
  monthBLabel: "3月",
  warning: "整体KPI当前展示个人产品口径；品类图表使用品类文件自身口径。",
  personalKpis: [
    {
      label: "收入合计",
      december: 121012.630312,
      january: 227890.716977,
      kind: "money",
      diff: 106878.08666500001,
      mom: 0.8831977818302297
    },
    {
      label: "有效订单量",
      december: 1321,
      january: 2879,
      kind: "count",
      suffix: "单",
      diff: 1558,
      mom: 1.1794095382286147
    },
    {
      label: "商品销量",
      december: 3162,
      january: 8577,
      kind: "count",
      suffix: "件",
      diff: 5415,
      mom: 1.7125237191650853
    },
    {
      label: "毛利润",
      december: 29063.5827,
      january: 45135.826819,
      kind: "money",
      diff: 16072.244119000003,
      mom: 0.5530028518817125
    },
    {
      label: "毛利率",
      december: 0.24016982876140294,
      january: 0.19805908471276326,
      kind: "percent",
      suffix: "pp",
      diff: -0.04211074404863968,
      mom: -0.1753373613405648
    },
    {
      label: "退损率",
      december: 0.08827856120850434,
      january: 0.06008423920304721,
      kind: "loss",
      suffix: "pp",
      diff: -0.028194322005457136,
      mom: -0.31937903857387545
    }
  ] satisfies MonthMetric[],
  personalCost: [
    {
      label: "退损率",
      december: 8.83,
      january: 6.01,
      status: "退损率下降"
    },
    {
      label: "物流成本占比",
      december: 28.03,
      january: 32.82,
      status: "物流成本上升"
    },
    {
      label: "采购成本占比",
      december: 21.58,
      january: 21.63,
      status: "采购占比稳定"
    },
    {
      label: "广告花费占比",
      december: 0.92,
      january: 2.87,
      status: "广告占比上升"
    },
    {
      label: "毛利率",
      december: 24.02,
      january: 19.81,
      status: "毛利率下降"
    }
  ],
  platformCategory: [
    {
      name: "居家百货",
      december: 1145641.580594,
      january: 1158395.256138,
      mom: 0.011132343448452165
    },
    {
      name: "电子电器",
      december: 394710.281506,
      january: 541580.211148,
      mom: 0.37209552556275977
    },
    {
      name: "美容个护",
      december: 364814.504066,
      january: 416449.723004,
      mom: 0.14153828414853403
    },
    {
      name: "服饰",
      december: 203719.011663,
      january: 415301.079148,
      mom: 1.0385975553180444
    },
    {
      name: "鞋类",
      december: 77248.029316,
      january: 277499.706151,
      mom: 2.5923208476403534
    }
  ],
  personalCategory: [
    {
      name: "居家百货",
      december: 40701.277374,
      january: 141992.822872,
      mom: 2.4886576548259662
    },
    {
      name: "服饰",
      december: 19488.178987,
      january: 32796.278043,
      mom: 0.6828805844238934
    },
    {
      name: "电子电器",
      december: 18854.776677,
      january: 25239.133243,
      mom: 0.3386068514822536
    },
    {
      name: "美容个护",
      december: 12318.973914,
      january: 11653.852388,
      mom: -0.0539916336087146
    },
    {
      name: "医药保健",
      december: 1059.681113,
      january: 9983.439051,
      mom: 8.421172962813765
    }
  ],
  growthProducts: [
    {
      id: "1336306",
      name: "SL-速干自流平高弹抗裂修复胶",
      site: "本土127",
      december: 2250.388356,
      january: 23692.150492,
      diff: 21441.762136,
      status: "重点增长"
    },
    {
      id: "1278316",
      name: "HFH-【双层收腹】薄款蕾丝无痕塑身收腹裤",
      site: "本土88",
      december: 7193.825097,
      january: 20021.472694,
      diff: 12827.647597,
      status: "增长"
    },
    {
      id: "1331595",
      name: "HFH-鱼子酱多肽美发笔",
      site: "本土88",
      december: 0,
      january: 6645.286274,
      diff: 6645.286274,
      status: "新增增长"
    },
    {
      id: "1065364",
      name: "SL-【千果之王】低温烘焙夏威夷果中果",
      site: "本土88",
      december: 66.378701,
      january: 5804.384755,
      diff: 5738.006054,
      status: "增长"
    },
    {
      id: "1297980",
      name: "JS-5合1无甲醛两小时速干防水涂料",
      site: "本土88",
      december: 381.778943,
      january: 4593.477662,
      diff: 4211.698719,
      status: "增长"
    }
  ],
  declineProducts: [
    {
      id: "1336846",
      name: "HFH-【京都匠人精神】多层大容量单肩包",
      site: "本土88",
      december: 15896.732425,
      january: 626.858287,
      diff: -15269.874138,
      status: "重点复盘"
    },
    {
      id: "1009320",
      name: "X22082904Jc-镀铬不锈钢翻新自喷漆 ",
      site: "本土88",
      december: 4285.209507,
      january: 115.052407,
      diff: -4170.157099999999,
      status: "重点复盘"
    },
    {
      id: "1331782",
      name: "1秒墙体除霉",
      site: "本土88",
      december: 12163.457524,
      january: 8347.315164,
      diff: -3816.14236,
      status: "下滑"
    },
    {
      id: "1293481",
      name: "JL-交叉魔术贴厚底高帮女鞋",
      site: "本土88",
      december: 4663.019285,
      january: 976.829987,
      diff: -3686.1892980000002,
      status: "下滑"
    },
    {
      id: "1184596",
      name: "HFH-【一瓶回春】抗皱童颜液",
      site: "本土88",
      december: 6816.42413,
      january: 3167.251498,
      diff: -3649.1726320000002,
      status: "下滑"
    }
  ],
  conclusions: [
    "个人产品3月收入较2月增长88.32%，有效订单量增长117.94%。",
    "退损率从8.83%降至6.01%，但物流成本占比升至32.82%。",
    "居家百货继续贡献最大收入，3月个人收入达到¥14.2万。",
    "广告花费占比从0.92%升至2.87%，需要持续观察投放效率与毛利率变化。"
  ]
} as const;

